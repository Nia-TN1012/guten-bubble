<?php
/*
Plugin Name: Guten-Bubble
Plugin URI: https://github.com/Nia-TN1012/guten-bubble/
Description: Displays a speech bubble like a chat conversation. 
Version: 0.8.1
Author: Chronoir.net
Author URI: https://chronoir.net/
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: guten-bubble
Domain Path: /languages

Copyright 2019 Chronoir.net (email: nia1012-tmnk@outlook.jp)

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

require_once( __DIR__.'/options-page.php' );

class GutenBubble {

    public $options_page;

    public function __construct() {
        register_activation_hook( __FILE__, [$this, 'activation'] );

        add_action( 'enqueue_block_editor_assets', [$this, 'add_cunstom_block_to_block_editor'] );

        add_action( 'init', [$this, 'GutenBubble::add_css_style'] );

        add_action( 'admin_menu', [$this, 'add_menu_page'] );

        add_filter( 'plugin_action_links_'.plugin_basename( __FILE__ ), [$this, 'add_action_links'] );
    }

    /** Invoke when this plugin activates. */
    public function activation() {
        // Copy default character icon files. 
        $plugin_dir = plugin_dir_path( __FILE__ ).'img';
        $upload_dir = trailingslashit( wp_upload_dir()['basedir'] ).'guten-bubble/img/default';
        wp_mkdir_p( $upload_dir );
        $default_imgs = [
            '01-rose.png',
            '02-orange.png',
            '03-lemon.png',
            '04-lime.png',
            '05-viridian.png',
            '06-sky.png',
            '07-imperial.png',
            '08-lavendar.png',
            '09-monotone.png',
            '10-espresso.png'
        ];
        foreach( $default_imgs as $default_img ) {
            if( !file_exists( $upload_dir.'/'.$default_img ) ) {
                copy( $plugin_dir.'/'.$default_img, $upload_dir.'/'.$default_img );
            }
        }
    }

    /** Invoke when enqueue block edtior assets. */
    public function add_cunstom_block_to_block_editor() {
        if( !function_exists( 'register_block_type' ) ) {
            return;
        }
        
        wp_enqueue_script( 'block-guten-bubble', plugins_url( 'js/block_guten-bubble.min.js', __FILE__ ), ['wp-blocks', 'wp-editor', 'wp-i18n', 'wp-element', 'wp-components'], "", true );
    
        if( function_exists( 'wp_set_script_translations' ) ) {
            wp_set_script_translations( 'block-guten-bubble', 'guten-bubble', plugin_dir_path( __FILE__ ).'languages' );
        }
    }

    /** Add Guten-bubble's CSS style */
    public function add_css_style() {
        wp_enqueue_style( 'block-guten-bubble', plugins_url( 'css/gutenbubble.min.css', __FILE__ ) );
    }

    /** Add settings page */
    public function add_menu_page() {
        wp_enqueue_style( 'admin-guten-bubble', plugins_url( 'css/admin-gutenbubble.min.css', __FILE__ ) );
        load_plugin_textdomain( "guten-bubble-admin", false, basename( dirname( __FILE__ ) ).'/languages' );
        wp_enqueue_media();
        $options_page = new GutenBubbleOptionsPage();
        add_submenu_page( 'options-general.php', 'Guten-bubble', 'Guten-bubble', 'manage_options', 'guten-bubble-options', [&$options_page, 'index'] );
    }

    public function add_action_links( $links ) {
        load_plugin_textdomain( "guten-bubble-admin", false, basename( dirname( __FILE__ ) ).'/languages' );
        $links[] = '<a href="'.esc_url( get_admin_url( null, 'options-general.php?page=guten-bubble-options' ) ).'">'.__( "Settings", "guten-bubble-admin" ).'</a>';
        return $links;
    }
}

new GutenBubble();

?>
