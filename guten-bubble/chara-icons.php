<?php

defined( 'ABSPATH' ) || exit;

/**
 * Character icon images imported into the uploads folder, and their labels and order.
 *
 * The labels and order are stored as a list in the option, in display order:
 *     [ ['file' => 'nia.png', 'label' => 'Nia'], ['file' => 'tmp.png', 'label' => ''], ... ]
 * An empty label means that the file name is displayed instead.
 */
class GutenBubbleCharaIcons {

    /** Option name in the wp_options table. */
    const OPTION_NAME = 'guten_bubble_chara_icons';

    /** Option group used by settings_fields(). */
    const OPTION_GROUP = 'guten_bubble_chara_icons';

    /** Extensions of files treated as icon images. */
    const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'jpe', 'gif', 'png', 'bmp', 'tif', 'tiff', 'ico'];

    public function __construct() {
        add_action( 'admin_init', [$this, 'register'] );
    }

    /** Returns the absolute path of the icon image folder (without a trailing slash). */
    public static function get_dir() {
        return trailingslashit( wp_upload_dir()['basedir'] ).'guten-bubble/img';
    }

    /** Returns the URL of the icon image folder (without a trailing slash). */
    public static function get_url() {
        return trailingslashit( wp_upload_dir()['baseurl'] ).'guten-bubble/img';
    }

    /** Returns true if the file name has an extension of an icon image. */
    public static function is_image_file_name( $file ) {
        return in_array( strtolower( pathinfo( $file, PATHINFO_EXTENSION ) ), self::IMAGE_EXTENSIONS, true );
    }

    /**
     * Returns the file names of the imported icon images, sorted by name.
     * Only files directly in the icon image folder are included (not the default icons in 'default/').
     *
     * @return string[]
     */
    public static function get_imported_files() {
        $dir = self::get_dir();
        $names = is_dir( $dir ) ? scandir( $dir ) : false;
        if( $names === false ) {
            return [];
        }
        $files = [];
        foreach( $names as $name ) {
            if( self::is_image_file_name( $name ) && is_file( $dir.'/'.$name ) ) {
                $files[] = $name;
            }
        }
        return $files;
    }

    /**
     * Returns the imported icon images with their labels, in display order.
     * Images without an entry in the option (e.g. uploaded via FTP) are appended in file name order.
     *
     * @return array[] List of ['file' => string, 'label' => string].
     */
    public static function get_entries() {
        $files = self::get_imported_files();
        $entries = self::normalize_entries( get_option( self::OPTION_NAME, [] ), $files );
        $listed = array_flip( array_column( $entries, 'file' ) );
        foreach( $files as $file ) {
            if( !isset( $listed[$file] ) ) {
                $entries[] = ['file' => $file, 'label' => ''];
            }
        }
        return $entries;
    }

    /**
     * Returns the options of "Character icon (preset)" in the block editor.
     *
     * @return array[] List of ['value' => file name, 'label' => label or file name].
     */
    public static function get_preset_options() {
        $options = [];
        foreach( self::get_entries() as $entry ) {
            $options[] = [
                'value' => $entry['file'],
                'label' => $entry['label'] !== '' ? $entry['label'] : $entry['file'],
            ];
        }
        return $options;
    }

    /**
     * Adds or updates the entry of an imported icon image. Invoked after the file is copied.
     * A file that was already there (overwritten) keeps its position, and keeps its label if the given label is empty.
     * A new file is appended to the end.
     *
     * @param string $file     File name.
     * @param string $label    Label.
     * @param bool   $existed  True if the file already existed before the import.
     */
    public static function upsert_entry( $file, $label, $existed ) {
        $label = sanitize_text_field( $label );
        $entries = self::get_entries();
        if( $existed ) {
            foreach( $entries as &$entry ) {
                if( $entry['file'] === $file && $label !== '' ) {
                    $entry['label'] = $label;
                }
            }
            unset( $entry );
        }
        else {
            // get_entries() places files without an entry in file name order; move the new one to the end.
            $entries = array_values( array_filter( $entries, function( $entry ) use ( $file ) {
                return $entry['file'] !== $file;
            } ) );
            $entries[] = ['file' => $file, 'label' => $label];
        }
        self::save_entries( $entries );
    }

    /** Removes the entry of an imported icon image. */
    public static function remove_entry( $file ) {
        $entries = array_filter( self::get_entries(), function( $entry ) use ( $file ) {
            return $entry['file'] !== $file;
        } );
        self::save_entries( array_values( $entries ) );
    }

    /**
     * Creates the option without autoloading if it does not exist,
     * because it is used only in the block editor and on the settings page.
     */
    public static function ensure_option() {
        add_option( self::OPTION_NAME, [], '', false );
    }

    private static function save_entries( $entries ) {
        self::ensure_option();
        update_option( self::OPTION_NAME, $entries, false );
    }

    /**
     * Normalizes a list of entries: drops entries of files that do not exist and duplicates,
     * and sanitizes the labels.
     *
     * @param mixed    $entries Stored or submitted list of entries.
     * @param string[] $files   File names of the imported icon images.
     * @return array[]
     */
    private static function normalize_entries( $entries, $files ) {
        if( !is_array( $entries ) ) {
            return [];
        }
        $exists = array_flip( $files );
        $normalized = [];
        $seen = [];
        foreach( $entries as $entry ) {
            if( !is_array( $entry ) || !isset( $entry['file'] ) || !is_string( $entry['file'] ) ) {
                continue;
            }
            $file = $entry['file'];
            if( !isset( $exists[$file] ) || isset( $seen[$file] ) ) {
                continue;
            }
            $seen[$file] = true;
            $label = isset( $entry['label'] ) && is_string( $entry['label'] ) ? sanitize_text_field( $entry['label'] ) : '';
            $normalized[] = ['file' => $file, 'label' => $label];
        }
        return $normalized;
    }

    /** Registers the setting. Invoked on 'admin_init'. */
    public function register() {
        register_setting( self::OPTION_GROUP, self::OPTION_NAME, [
            'type' => 'array',
            'default' => [],
            'sanitize_callback' => [$this, 'sanitize'],
        ] );
    }

    /**
     * Sanitizes the option. Invoked on every update of the option.
     *
     * @param mixed $input Either a list of entries (when saved by this class),
     *                     or ['file' => string[], 'label' => string[]] (when submitted from the settings page).
     * @return array[] List of entries.
     */
    public function sanitize( $input ) {
        if( is_array( $input ) && isset( $input['file'] ) && is_array( $input['file'] ) ) {
            $labels = isset( $input['label'] ) && is_array( $input['label'] ) ? array_values( $input['label'] ) : [];
            $entries = [];
            foreach( array_values( $input['file'] ) as $index => $file ) {
                $entries[] = [
                    'file' => $file,
                    'label' => isset( $labels[$index] ) ? $labels[$index] : '',
                ];
            }
            $input = $entries;
        }
        return self::normalize_entries( $input, self::get_imported_files() );
    }
}
