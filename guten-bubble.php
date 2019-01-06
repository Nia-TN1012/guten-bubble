<?php
/*
Plugin Name: Guten-Bubble
Plugin URI: https://github.com/Nia-TN1012/guten-bubble/
Description: Displays a speech bubble like a chat conversation. 
Version: 0.6.1
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

class GutenBubble {
    public function __construct() {
        register_activation_hook( __FILE__, [$this, 'activation'] );

        add_action( 'enqueue_block_editor_assets', [$this, 'add_cunstom_block_to_block_editor'] );

        add_action( 'init', [$this, 'GutenBubble::add_css_style'] );
    }
    public function activation() {
        $plugin_dir = plugin_dir_path( __FILE__ ).'img';
        $upload_dir = trailingslashit( wp_upload_dir()['basedir'] ).'guten-bubble/img';
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
            '09-monotone.png'
        ];
        foreach( $default_imgs as $default_img ) {
            copy( $plugin_dir.'/'.$default_img, $upload_dir.'/'.$default_img );
        }
    }
    public function add_cunstom_block_to_block_editor() {
        if( !function_exists( 'register_block_type' ) ) {
            return;
        }
        
        wp_enqueue_script( 'block-guten-bubble', plugins_url( 'js/block_guten-bubble.min.js', __FILE__ ), ['wp-blocks', 'wp-editor', 'wp-i18n', 'wp-element', 'wp-components'], "", true );
    
        // WordPress 5.0〜
        if( function_exists( 'wp_set_script_translations' ) ) {
            wp_set_script_translations( 'block-guten-bubble', 'guten-bubble', plugin_dir_path( __FILE__ ).'languages' );
        }
    }
    public function add_css_style() {
        wp_enqueue_style( 'block-guten-bubble', plugins_url( 'css/gutenbubble.min.css', __FILE__ ) );
    }
}

new GutenBubble();

?>
