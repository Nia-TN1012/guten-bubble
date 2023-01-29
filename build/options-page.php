<?php

defined( 'ABSPATH' ) || exit;

class GutenBubbleOptionsPage {

    public static $default_images = [
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

    public function index() {

       if( isset( $_POST['selected-icon-url'] ) ) {
           $result = $this->import_chara_icon_file( $_POST['selected-icon-url'] );
       }
    ?>
        <div class="wrap">
            <h1><?= __( "Guten-bubble settings", "guten-bubble-admin" ) ?></h1>

            <?php if( !function_exists( 'register_block_type' ) ): ?>
            <div class="notice notice-warning">
                <p><b><?= __( "NOTICE: To use the Guten-bubble plugin, required WordPress 5.0 or later.", "guten-bubble-admin" ) ?></b></p>
            </div>
            <?php endif ?>

            <div id="cngb-nedia-upload">
                <h2><?= __( "Import character icon image from media library", "guten-bubble-admin" ) ?></h2>
                <?php if( isset( $result ) ): ?>
                <div class="notice notice-<?= @$result['success'] ? 'success' : 'error' ?> is-dismissible">
                    <p><?= esc_html( @$result['message'] ) ?></p>
                    <button type="button" class="notice-dismiss">
                        <span class="screen-reader-text">Dismiss this notice.</span>
                    </button>
                </div>
                <?php endif ?>
                <form method="post" id="cngb-chara-icon-upload">
                    <table class="form-table">
                        <tbody>
                            <tr>
                                <th>
                                    <?= __( "Select character icon image", "guten-bubble-admin" ) ?>
                                </th>
                                <td>
                                    <button id="media-upload" type="button" class="button button-default"
                                        data-title="<?= __( "Choose Image", "guten-bubble-admin" ) ?>">
                                        <?= __( "Select from media library", "guten-bubble-admin" ) ?>
                                    </button>
                                    <input id="selected-icon-url" name="selected-icon-url" type="hidden" value=""/>
                                </td>
                            </tr>
                            <tr>
                                <td id="selected-icon"></td>
                                <td id="selected-icon-name"></td>
                            </tr>
                        </tbody>
                    </table>
                    <button id="chara-icon-upload" type="submit" class="button button-primary"><?= __( "Import", "guten-bubble-admin" ) ?></button>
                </form>
                <br/>
                <div class="cngb-remarks">
                    <h3><?= __( "Remarks", "guten-bubble-admin" ) ?></h3>
                    <ul>
                        <li><?= __( "Select the image in the WordPress media library and import it into the image folder of Guten-bubble.", "guten-bubble-admin" ) ?></li>
                        <li><?= __( "The recommended image size is 120px x 120px or more.", "guten-bubble-admin" ) ?></li>
                        <li><?= __( "Imported icon images are not deleted even if they are deleted from the media library.", "guten-bubble-admin" ) ?></li>
                    </ul>
                </div>
                <div class="cngb-remarks-warning">
                    <h3><?= __( "Attention", "guten-bubble-admin" ) ?></h3>
                    <ul>
                        <li><?= __( "If there is an image file of the same name in the import destination, it will be overwritten.", "guten-bubble-admin" ) ?></li>
                    </ul>
                </div>
                <br/>

                <div class="cngb-thumbnail-view">
                    <?php
                        $upload_dir = trailingslashit( wp_upload_dir()['basedir'] ).'guten-bubble/img';
                        $upload_url = trailingslashit( wp_upload_dir()['baseurl'] ).'guten-bubble/img';
                        $icon_images = [];
                        foreach( glob( "{$upload_dir}/{*.jpg,*.jpeg,*.jpe,*.gif,*.png,*.bmp,*.tif,*.tiff,*.ico}", GLOB_BRACE ) as $image ) {
                            $icon_images[] = basename( $image ); 
                        }
                    ?>
                    <h3 class="cngb-thumbnail-head-d"><?= __( "Default character icon list", "guten-bubble-admin" ) ?></h3>
                    <ul class="cngb-thumbnail-list">
                    <?php foreach( static::$default_images as $icon_image ): ?>
                        <li class="cngb-thumbnail">
                            <img src="<?= "{$upload_url}/default/{$icon_image}" ?>" alt="<?= $icon_image ?>" /><br/>
                            <span><?= $icon_image ?></span>
                        </li>
                    <?php endforeach ?>
                    </ul>
                    <h3 class="cngb-thumbnail-head-i"><?= __( "Imported character icon list", "guten-bubble-admin" ) ?></h3>
                    <ul class="cngb-thumbnail-list">
                    <?php foreach( $icon_images as $icon_image ): ?>
                        <li class="cngb-thumbnail">
                            <img src="<?= "{$upload_url}/{$icon_image}" ?>" alt="<?= $icon_image ?>" /><br/>
                            <span><?= $icon_image ?></span>
                        </li>
                    <?php endforeach ?>
                    </ul>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            jQuery( document ).ready( function () {
                var custom_uploader = wp.media({
                    title: jQuery( '#media-upload' ).attr( 'data-title' ),
                    library: {type: 'image'},
                    button: {text: jQuery( '#media-upload' ).attr( 'data-title' )},
                    multiple: false
                });
        
                jQuery( '#media-upload' ).on( 'click', function( e ) {
                    e.preventDefault();
                    custom_uploader.open();
                });
                
                custom_uploader.on( 'select', function () {
                    var images = custom_uploader.state().get( 'selection' );
        
                    images.each( function( file ) {
                        var media = file.toJSON();
                        var img = jQuery( '<img>' ).attr( 'src', media.url ).attr( 'alt', media.filename ).attr( 'width', '120px' ).attr( 'height', '120px' );
                        jQuery( '#selected-icon' ).html( img );
                        var name = jQuery('<p>').html( media.filename );
                        jQuery( '#selected-icon-name' ).html( name );
                        jQuery( '#selected-icon-url' ).val( media.url );
                    });
                });

            });
        </script>
    <?php }

    private function import_chara_icon_file( $icon_url ) {
        $upload_url = trailingslashit( wp_upload_dir()['baseurl'] );
        $upload_dir = trailingslashit( wp_upload_dir()['basedir'] );
        $icon_path = str_replace( $upload_url, $upload_dir, $icon_url );
        // To prevent directory traversal, if "../" is mixed in the URL, it returns an error.
        if( strpos( $icon_url, "../" ) !== false || strpos( $icon_url, $upload_url ) !== 0 ) {
            return [
                'success' => false,
                'message' => sprintf( __( "ERROR: The selected image URL is invalid. ('%s')", "guten-bubble-admin" ), $icon_url )
            ];
        }
        if( !file_exists( $icon_path ) ) {
            return [
                'success' => false,
                'message' => sprintf( __( "ERROR: '%s' does not exist or the file path is invalid.", "guten-bubble-admin" ), basename( $icon_path ) )
            ];
        }
        if( !copy( $icon_path, $upload_dir."guten-bubble/img/".basename( $icon_path ) ) ) {
            return [
                'success' => false,
                'message' => sprintf( __( "ERROR: Failed to import '%s'.", "guten-bubble-admin" ), basename( $icon_path ) )
            ];
        }
        return [
            'success' => true,
            'message' => sprintf( __( "Info: '%s' is imported.", "guten-bubble-admin" ), basename( $icon_path ) )
        ];
    }
}

?>
