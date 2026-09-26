<?php
/*
Plugin Name: Guten-Bubble
Plugin URI: https://github.com/Nia-TN1012/guten-bubble/
Description: Displays a speech bubble like a chat conversation. 
Version: 1.0.1
Requires at least: 6.6
Requires PHP: 7.4
Author: Nia Tomonaka
Author URI: https://tech.nia-tn1012.com
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: guten-bubble
Domain Path: /languages

Copyright 2023-2026 Nia T.N. Tech Lab.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

defined( 'ABSPATH' ) || exit;

require_once( __DIR__.'/settings.php' );
require_once( __DIR__.'/chara-icons.php' );
require_once( __DIR__.'/vite-assets.php' );
require_once( __DIR__.'/options-page.php' );

class GutenBubble {

    const VERSION = '1.0.1';

    /** Script handle of the block. Shared by the current and legacy versions. */
    const SCRIPT_HANDLE = 'block-guten-bubble';

    /** Style handle of the block. */
    const STYLE_HANDLE = 'block-guten-bubble';

    /** Style handle of the settings page. */
    const ADMIN_STYLE_HANDLE = 'admin-guten-bubble';

    /** Vite entries (keys of dist/manifest.json). */
    const ENTRY_SCRIPT = 'guten-bubble/src/index.ts';
    const ENTRY_STYLE = 'guten-bubble/src/css/gutenbubble.scss';
    const ENTRY_ADMIN_STYLE = 'guten-bubble/src/css/admin-gutenbubble.scss';

    /** @var GutenBubbleOptionsPage */
    public $options_page;

    /** @var GutenBubbleViteAssets */
    private $vite_assets;

    /** @var string|false Hook suffix of the settings page. */
    private $options_page_hook = false;

    public function __construct() {
        $this->options_page = new GutenBubbleOptionsPage();
        $this->vite_assets = new GutenBubbleViteAssets( __FILE__ );
        new GutenBubbleSettings();
        new GutenBubbleCharaIcons();

        register_activation_hook( __FILE__, [$this, 'activation'] );

        add_action( 'enqueue_block_editor_assets', [$this, 'enqueue_block_editor_assets'] );

        // Fires on the front end and in the block editor (including the iframed editor canvas).
        add_action( 'enqueue_block_assets', [$this, 'enqueue_block_assets'] );

        add_action( 'admin_menu', [$this, 'add_menu_page'] );

        add_action( 'admin_enqueue_scripts', [$this, 'enqueue_admin_assets'] );

        add_action( 'admin_notices', [$this, 'show_build_notice'] );

        add_filter( 'plugin_action_links_'.plugin_basename( __FILE__ ), [$this, 'add_action_links'] );
    }

    /** Invoke when this plugin activates. */
    public function activation() {
        // Copy default character icon files. 
        $plugin_dir = plugin_dir_path( __FILE__ ).'img';
        $upload_dir = trailingslashit( wp_upload_dir()['basedir'] ).'guten-bubble/img/default';
        wp_mkdir_p( $upload_dir );
        foreach( GutenBubbleOptionsPage::$default_images as $default_img ) {
            if( !file_exists( $upload_dir.'/'.$default_img ) ) {
                copy( $plugin_dir.'/'.$default_img, $upload_dir.'/'.$default_img );
            }
        }
    }

    /** Returns true if the files built by Vite should be used. */
    private function use_vite_assets() {
        return !GutenBubbleSettings::use_legacy_block() && $this->vite_assets->is_built();
    }

    /** Enqueues the block script. Invoked on 'enqueue_block_editor_assets'. */
    public function enqueue_block_editor_assets() {
        if( $this->use_vite_assets() ) {
            wp_enqueue_script(
                self::SCRIPT_HANDLE,
                $this->vite_assets->get_url( self::ENTRY_SCRIPT ),
                ['react-jsx-runtime', 'wp-blocks', 'wp-block-editor', 'wp-components', 'wp-i18n'],
                $this->vite_assets->get_version( self::ENTRY_SCRIPT ),
                true
            );
            // Options of "Character icon (preset)" for the icons imported on the settings page.
            wp_add_inline_script(
                self::SCRIPT_HANDLE,
                'window.gutenBubble = '.wp_json_encode( [
                    'charaIcons' => GutenBubbleCharaIcons::get_preset_options(),
                ], JSON_HEX_TAG | JSON_HEX_AMP ).';',
                'before'
            );
        }
        else {
            wp_enqueue_script(
                self::SCRIPT_HANDLE,
                plugins_url( 'legacy/block_guten-bubble.min.js', __FILE__ ),
                ['wp-blocks', 'wp-editor', 'wp-i18n', 'wp-element', 'wp-components'],
                self::VERSION,
                true
            );
        }

        wp_set_script_translations( self::SCRIPT_HANDLE, 'guten-bubble', plugin_dir_path( __FILE__ ).'languages' );
    }

    /** Enqueues the block style. Invoked on 'enqueue_block_assets'. */
    public function enqueue_block_assets() {
        if( $this->use_vite_assets() ) {
            wp_enqueue_style(
                self::STYLE_HANDLE,
                $this->vite_assets->get_url( self::ENTRY_STYLE ),
                [],
                $this->vite_assets->get_version( self::ENTRY_STYLE )
            );
        }
        else {
            wp_enqueue_style( self::STYLE_HANDLE, plugins_url( 'legacy/css/gutenbubble.min.css', __FILE__ ), [], self::VERSION );
        }
    }

    /** Enqueues the assets of the settings page. Invoked on 'admin_enqueue_scripts'. */
    public function enqueue_admin_assets( $hook_suffix ) {
        if( $hook_suffix !== $this->options_page_hook ) {
            return;
        }
        // The settings page is not part of the block, and its markup is always the current one,
        // so the built style is used regardless of the legacy block option.
        if( $this->vite_assets->is_built() ) {
            wp_enqueue_style(
                self::ADMIN_STYLE_HANDLE,
                $this->vite_assets->get_url( self::ENTRY_ADMIN_STYLE ),
                [],
                $this->vite_assets->get_version( self::ENTRY_ADMIN_STYLE )
            );
        }
        else {
            wp_enqueue_style( self::ADMIN_STYLE_HANDLE, plugins_url( 'legacy/css/admin-gutenbubble.min.css', __FILE__ ), [], self::VERSION );
        }
        wp_enqueue_media();
        wp_enqueue_script( 'jquery-ui-sortable' );
    }

    /** Add settings page */
    public function add_menu_page() {
        load_plugin_textdomain( "guten-bubble-admin", false, basename( dirname( __FILE__ ) ).'/languages' );
        $this->options_page_hook = add_submenu_page( 'options-general.php', 'Guten-bubble', 'Guten-bubble', 'manage_options', GutenBubbleSettings::PAGE_SLUG, [$this->options_page, 'index'] );
    }

    /** Warns administrators when the files built by Vite are missing (e.g. not built yet in development). */
    public function show_build_notice() {
        if( GutenBubbleSettings::use_legacy_block() || $this->vite_assets->is_built() || !current_user_can( 'manage_options' ) ) {
            return;
        }
        ?>
        <div class="notice notice-warning">
            <p><?php esc_html_e( "Guten-bubble: The built files (dist/manifest.json) were not found, so the legacy block is used instead. Run 'yarn build' to build them.", "guten-bubble-admin" ) ?></p>
        </div>
        <?php
    }

    public function add_action_links( $links ) {
        load_plugin_textdomain( "guten-bubble-admin", false, basename( dirname( __FILE__ ) ).'/languages' );
        $links[] = '<a href="'.esc_url( get_admin_url( null, 'options-general.php?page='.GutenBubbleSettings::PAGE_SLUG ) ).'">'.__( "Settings", "guten-bubble-admin" ).'</a>';
        return $links;
    }
}

new GutenBubble();

?>