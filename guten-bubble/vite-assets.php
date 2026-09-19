<?php

defined( 'ABSPATH' ) || exit;

/**
 * Resolves the files built by Vite from dist/manifest.json.
 */
class GutenBubbleViteAssets {

    /** Directory of the build output. */
    const DIST_DIR = 'dist';

    /** @var array|null Parsed manifest, or null if it has not been loaded yet. */
    private $manifest = null;

    /** @var string Absolute path of the plugin directory (with a trailing slash). */
    private $plugin_dir;

    /** @var string Main plugin file, used to build URLs. */
    private $plugin_file;

    public function __construct( $plugin_file ) {
        $this->plugin_file = $plugin_file;
        $this->plugin_dir = plugin_dir_path( $plugin_file );
    }

    /** Returns true if the build output exists. */
    public function is_built() {
        return !empty( $this->get_manifest() );
    }

    /**
     * Returns the URL of the file built from the given entry.
     *
     * @param string $entry Source path of the entry, as used as the key of manifest.json
     *                      (e.g. 'guten-bubble/src/index.ts').
     * @return string|null URL, or null if the entry was not found.
     */
    public function get_url( $entry ) {
        $file = $this->get_file( $entry );
        return $file === null ? null : plugins_url( self::DIST_DIR.'/'.$file, $this->plugin_file );
    }

    /**
     * Returns a version string of the built file for cache busting.
     *
     * @param string $entry Source path of the entry.
     * @return string|null Modification time of the file, or null if the entry was not found.
     */
    public function get_version( $entry ) {
        $file = $this->get_file( $entry );
        if( $file === null ) {
            return null;
        }
        $path = $this->plugin_dir.self::DIST_DIR.'/'.$file;
        return file_exists( $path ) ? (string)filemtime( $path ) : null;
    }

    private function get_file( $entry ) {
        $manifest = $this->get_manifest();
        return isset( $manifest[$entry]['file'] ) ? $manifest[$entry]['file'] : null;
    }

    private function get_manifest() {
        if( $this->manifest === null ) {
            $this->manifest = [];
            $path = $this->plugin_dir.self::DIST_DIR.'/manifest.json';
            if( is_readable( $path ) ) {
                $manifest = json_decode( file_get_contents( $path ), true );
                if( is_array( $manifest ) ) {
                    $this->manifest = $manifest;
                }
            }
        }
        return $this->manifest;
    }
}
