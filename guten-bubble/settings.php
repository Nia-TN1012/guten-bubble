<?php

defined( 'ABSPATH' ) || exit;

/**
 * Plugin options stored with the Settings API.
 */
class GutenBubbleSettings {

    /** Option group used by settings_fields(). */
    const OPTION_GROUP = 'guten_bubble_settings';

    /** Option name in the wp_options table. */
    const OPTION_NAME = 'guten_bubble_options';

    /** Slug of the settings page, used by do_settings_sections(). */
    const PAGE_SLUG = 'guten-bubble-options';

    /** Default values of the options. */
    const DEFAULTS = [
        // Loads the scripts and styles in the legacy folder instead of the ones built by Vite.
        'use_legacy_block' => false,
    ];

    public function __construct() {
        add_action( 'admin_init', [$this, 'register'] );
    }

    /** Returns true if the legacy block is enabled. */
    public static function use_legacy_block() {
        return (bool)self::get_options()['use_legacy_block'];
    }

    /** Returns the options merged with the default values. */
    public static function get_options() {
        $options = get_option( self::OPTION_NAME, [] );
        return array_merge( self::DEFAULTS, is_array( $options ) ? $options : [] );
    }

    /** Registers the setting, section and fields. Invoked on 'admin_init'. */
    public function register() {
        register_setting( self::OPTION_GROUP, self::OPTION_NAME, [
            'type' => 'object',
            'default' => self::DEFAULTS,
            'sanitize_callback' => [$this, 'sanitize'],
        ] );

        add_settings_section(
            'guten_bubble_block',
            esc_html__( "Block settings", "guten-bubble-admin" ),
            '__return_false',
            self::PAGE_SLUG
        );

        add_settings_field(
            'use_legacy_block',
            esc_html__( "Use legacy block", "guten-bubble-admin" ),
            [$this, 'render_use_legacy_block_field'],
            self::PAGE_SLUG,
            'guten_bubble_block',
            ['label_for' => 'guten-bubble-use-legacy-block']
        );
    }

    /**
     * Sanitizes the submitted options.
     *
     * @param mixed $input Submitted value.
     * @return array Sanitized options.
     */
    public function sanitize( $input ) {
        $input = is_array( $input ) ? $input : [];
        return [
            'use_legacy_block' => !empty( $input['use_legacy_block'] ),
        ];
    }

    public function render_use_legacy_block_field() {
        ?>
        <input type="checkbox" id="guten-bubble-use-legacy-block"
            name="<?= esc_attr( self::OPTION_NAME ) ?>[use_legacy_block]" value="1"
            <?php checked( self::use_legacy_block() ) ?> />
        <label for="guten-bubble-use-legacy-block"><?php esc_html_e( "Use the legacy version (ver. 0.9.x) of the Guten-bubble block", "guten-bubble-admin" ) ?></label>
        <p class="description"><?php esc_html_e( "Enable this only if you have a problem with the current version. Blocks created with either version can be edited with the other.", "guten-bubble-admin" ) ?></p>
        <?php
    }
}
