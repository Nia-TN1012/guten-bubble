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

    /** Nonce action of the icon import form. */
    const IMPORT_NONCE_ACTION = 'guten_bubble_import_chara_icon';

    /** Nonce action of the icon delete form. */
    const DELETE_NONCE_ACTION = 'guten_bubble_delete_chara_icon';

    public function index() {

       if( !current_user_can( 'manage_options' ) ) {
           return;
       }

       if( isset( $_POST['selected-icon-url'] ) ) {
           check_admin_referer( self::IMPORT_NONCE_ACTION );
           $label = isset( $_POST['chara-icon-label'] ) ? wp_unslash( $_POST['chara-icon-label'] ) : '';
           $import_result = $this->import_chara_icon_file( esc_url_raw( wp_unslash( $_POST['selected-icon-url'] ) ), is_string( $label ) ? $label : '' );
       }
       if( isset( $_POST['delete-icon'] ) ) {
           check_admin_referer( self::DELETE_NONCE_ACTION );
           $delete_result = $this->delete_chara_icon_file( wp_unslash( $_POST['delete-icon'] ) );
       }

       GutenBubbleCharaIcons::ensure_option();
       $upload_url = GutenBubbleCharaIcons::get_url();
       $icon_entries = GutenBubbleCharaIcons::get_entries();
    ?>
        <div class="wrap">
            <h1><?= __( "Guten-bubble settings", "guten-bubble-admin" ) ?></h1>

            <?php if( !function_exists( 'register_block_type' ) ): ?>
            <div class="notice notice-warning">
                <p><b><?= __( "NOTICE: To use the Guten-bubble plugin, required WordPress 5.0 or later.", "guten-bubble-admin" ) ?></b></p>
            </div>
            <?php endif ?>

            <form method="post" action="options.php">
                <?php
                    settings_fields( GutenBubbleSettings::OPTION_GROUP );
                    do_settings_sections( GutenBubbleSettings::PAGE_SLUG );
                    submit_button();
                ?>
            </form>

            <div id="cngb-nedia-upload">
                <h2><?= __( "Import character icon image from media library", "guten-bubble-admin" ) ?></h2>
                <?php if( isset( $import_result ) ) { $this->render_result_notice( $import_result ); } ?>
                <form method="post" id="cngb-chara-icon-upload">
                    <?php wp_nonce_field( self::IMPORT_NONCE_ACTION ) ?>
                    <table class="form-table">
                        <tbody>
                            <tr>
                                <th>
                                    <?= __( "Select character icon image", "guten-bubble-admin" ) ?>
                                </th>
                                <td>
                                    <button id="media-upload" type="button" class="button button-default"
                                        data-title="<?= esc_attr__( "Choose Image", "guten-bubble-admin" ) ?>">
                                        <?= __( "Select from media library", "guten-bubble-admin" ) ?>
                                    </button>
                                    <input id="selected-icon-url" name="selected-icon-url" type="hidden" value=""/>
                                </td>
                            </tr>
                            <tr>
                                <td id="selected-icon"></td>
                                <td id="selected-icon-name"></td>
                            </tr>
                            <tr>
                                <th>
                                    <label for="chara-icon-label"><?= __( "Label", "guten-bubble-admin" ) ?></label>
                                </th>
                                <td>
                                    <input id="chara-icon-label" name="chara-icon-label" type="text" class="regular-text" value=""/>
                                    <p class="description"><?= __( "Text displayed in \"Character icon (preset)\" of the block. If it is empty, the file name is displayed.", "guten-bubble-admin" ) ?></p>
                                </td>
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
                        <li><?= __( "Imported icon images can be selected in \"Character icon (preset)\" of the block, in the order of the imported character icon list. To use them, \"Use legacy block\" must be disabled.", "guten-bubble-admin" ) ?></li>
                        <li><?= __( "Deleting an imported icon image does not delete the original image in the media library.", "guten-bubble-admin" ) ?></li>
                    </ul>
                </div>
                <div class="cngb-remarks-warning">
                    <h3><?= __( "Attention", "guten-bubble-admin" ) ?></h3>
                    <ul>
                        <li><?= __( "If there is an image file of the same name in the import destination, it will be overwritten.", "guten-bubble-admin" ) ?></li>
                        <li><?= __( "When an imported icon image is deleted, the character icon is no longer displayed in the blocks that use it.", "guten-bubble-admin" ) ?></li>
                    </ul>
                </div>
                <br/>

                <?php if( isset( $delete_result ) ) { $this->render_result_notice( $delete_result ); } ?>
                <!-- Delete buttons in the list refer to this form with their 'form' attribute, since forms cannot be nested. -->
                <form method="post" id="cngb-chara-icon-delete">
                    <?php wp_nonce_field( self::DELETE_NONCE_ACTION ) ?>
                </form>

                <div class="cngb-thumbnail-view">
                    <p class="description"><?= __( "Click an icon image to preview it.", "guten-bubble-admin" ) ?></p>
                    <!-- Accordions: the default list is collapsed and the imported list is expanded by default. -->
                    <details class="cngb-accordion">
                    <summary class="cngb-thumbnail-head-d"><?= __( "Default character icon list", "guten-bubble-admin" ) ?></summary>
                    <table class="widefat striped cngb-icon-table">
                        <thead>
                            <tr>
                                <th scope="col" class="cngb-icon-col-image"><?= __( "Image", "guten-bubble-admin" ) ?></th>
                                <th scope="col"><?= __( "File name", "guten-bubble-admin" ) ?></th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php foreach( static::$default_images as $icon_image ): ?>
                            <tr>
                                <td class="cngb-icon-col-image"><?php $this->render_icon_image( "{$upload_url}/default/{$icon_image}", $icon_image ) ?></td>
                                <td class="cngb-icon-file-name"><?= esc_html( $icon_image ) ?></td>
                            </tr>
                        <?php endforeach ?>
                        </tbody>
                    </table>
                    </details>
                    <details class="cngb-accordion" open>
                    <summary class="cngb-thumbnail-head-i"><?= __( "Imported character icon list", "guten-bubble-admin" ) ?></summary>
                    <form method="post" action="options.php" id="cngb-chara-icon-labels">
                        <?php settings_fields( GutenBubbleCharaIcons::OPTION_GROUP ) ?>
                        <?php if( empty( $icon_entries ) ): ?>
                        <p class="cngb-thumbnail-empty"><?= __( "No character icon images have been imported.", "guten-bubble-admin" ) ?></p>
                        <?php else: ?>
                        <p class="description"><?= __( "Drag the icons (or use the arrow buttons) to change the order, then save.", "guten-bubble-admin" ) ?></p>
                        <table class="widefat striped cngb-icon-table">
                            <thead>
                                <tr>
                                    <th scope="col" class="cngb-icon-col-handle"><span class="screen-reader-text"><?= __( "Order", "guten-bubble-admin" ) ?></span></th>
                                    <th scope="col" class="cngb-icon-col-image"><?= __( "Image", "guten-bubble-admin" ) ?></th>
                                    <th scope="col"><?= __( "File name", "guten-bubble-admin" ) ?></th>
                                    <th scope="col"><?= __( "Label", "guten-bubble-admin" ) ?></th>
                                    <th scope="col" class="cngb-icon-col-actions"><?= __( "Actions", "guten-bubble-admin" ) ?></th>
                                </tr>
                            </thead>
                            <tbody class="cngb-sortable"
                                data-unsaved-message="<?= esc_attr__( "Unsaved changes to the labels and order will be lost.", "guten-bubble-admin" ) ?>">
                            <?php foreach( $icon_entries as $index => $entry ): ?>
                                <?php $file = $entry['file']; $label_id = 'cngb-chara-icon-label-'.$index; ?>
                                <tr class="cngb-sortable-item">
                                    <td class="cngb-icon-col-handle">
                                        <span class="cngb-sort-handle dashicons dashicons-move" aria-hidden="true" title="<?= esc_attr__( "Drag to change the order", "guten-bubble-admin" ) ?>"></span>
                                    </td>
                                    <td class="cngb-icon-col-image"><?php $this->render_icon_image( "{$upload_url}/{$file}", $file ) ?></td>
                                    <td class="cngb-icon-file-name">
                                        <?= esc_html( $file ) ?>
                                        <input type="hidden" name="<?= esc_attr( GutenBubbleCharaIcons::OPTION_NAME ) ?>[file][]" value="<?= esc_attr( $file ) ?>" />
                                    </td>
                                    <td>
                                        <label class="screen-reader-text" for="<?= esc_attr( $label_id ) ?>"><?= esc_html( sprintf( __( "Label of '%s'", "guten-bubble-admin" ), $file ) ) ?></label>
                                        <input type="text" id="<?= esc_attr( $label_id ) ?>" class="regular-text cngb-label-input"
                                            name="<?= esc_attr( GutenBubbleCharaIcons::OPTION_NAME ) ?>[label][]"
                                            value="<?= esc_attr( $entry['label'] ) ?>" placeholder="<?= esc_attr( $file ) ?>" />
                                    </td>
                                    <td class="cngb-icon-col-actions">
                                        <button type="button" class="button cngb-move-prev">
                                            <span class="dashicons dashicons-arrow-up-alt2" aria-hidden="true"></span>
                                            <span class="screen-reader-text"><?= esc_html( sprintf( __( "Move '%s' up", "guten-bubble-admin" ), $file ) ) ?></span>
                                        </button>
                                        <button type="button" class="button cngb-move-next">
                                            <span class="dashicons dashicons-arrow-down-alt2" aria-hidden="true"></span>
                                            <span class="screen-reader-text"><?= esc_html( sprintf( __( "Move '%s' down", "guten-bubble-admin" ), $file ) ) ?></span>
                                        </button>
                                        <button type="submit" form="cngb-chara-icon-delete" name="delete-icon" value="<?= esc_attr( $file ) ?>"
                                            class="button button-link-delete cngb-delete-icon"
                                            data-confirm="<?= esc_attr( sprintf( __( "Delete '%s'? The character icon will no longer be displayed in the blocks that use it. This cannot be undone.", "guten-bubble-admin" ), $file ) ) ?>">
                                            <span aria-hidden="true"><?= __( "Delete", "guten-bubble-admin" ) ?></span>
                                            <span class="screen-reader-text"><?= esc_html( sprintf( __( "Delete '%s'", "guten-bubble-admin" ), $file ) ) ?></span>
                                        </button>
                                    </td>
                                </tr>
                            <?php endforeach ?>
                            </tbody>
                        </table>
                        <?php submit_button( __( "Save labels and order", "guten-bubble-admin" ), "primary", "cngb-save-chara-icons" ) ?>
                        <?php endif ?>
                    </form>
                    </details>
                </div>
            </div>

            <!-- Popup for the image preview. Inline styles keep it usable with the legacy style sheet. -->
            <dialog id="cngb-preview-dialog" class="cngb-preview-dialog" aria-labelledby="cngb-preview-title">
                <h2 id="cngb-preview-title" class="cngb-preview-title"></h2>
                <div class="cngb-preview-image">
                    <img src="" alt="" style="max-width: min( 80vw, 640px ); max-height: 60vh;" />
                </div>
                <p class="cngb-preview-size"></p>
                <form method="dialog">
                    <button type="submit" class="button"><?= __( "Close", "guten-bubble-admin" ) ?></button>
                </form>
            </dialog>
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
                        var name = jQuery( '<p>' ).text( media.filename );
                        jQuery( '#selected-icon-name' ).html( name );
                        jQuery( '#selected-icon-url' ).val( media.url );
                    });
                });

                // Imported character icon list: labels, order and deletion.
                var $list = jQuery( '.cngb-sortable' );
                var unsaved = false;

                if( jQuery.fn.sortable ) {
                    $list.sortable( {
                        items: '.cngb-sortable-item',
                        handle: '.cngb-sort-handle',
                        axis: 'y',
                        placeholder: 'cngb-sortable-placeholder',
                        // Keep the column widths of the dragged row.
                        helper: function( e, $row ) {
                            var $cells = $row.children();
                            var $helper = $row.clone();
                            $helper.children().each( function( i ) {
                                jQuery( this ).width( $cells.eq( i ).width() );
                            } );
                            return $helper;
                        },
                        start: function( e, ui ) {
                            ui.placeholder.html( '<td colspan="' + ui.item.children().length + '"></td>' ).height( ui.item.outerHeight() );
                        },
                        update: function() {
                            unsaved = true;
                        }
                    } );
                }

                $list.on( 'click', '.cngb-move-prev, .cngb-move-next', function() {
                    var $item = jQuery( this ).closest( '.cngb-sortable-item' );
                    var isPrev = jQuery( this ).hasClass( 'cngb-move-prev' );
                    var $sibling = isPrev ? $item.prev( '.cngb-sortable-item' ) : $item.next( '.cngb-sortable-item' );
                    // Nothing to do at the top or bottom of the list.
                    if( !$sibling.length ) {
                        return;
                    }
                    if( isPrev ) {
                        $item.insertBefore( $sibling );
                    }
                    else {
                        $item.insertAfter( $sibling );
                    }
                    unsaved = true;
                    jQuery( this ).trigger( 'focus' );
                });

                $list.on( 'input', '.cngb-label-input', function() {
                    unsaved = true;
                });

                // Image preview popup
                var dialog = document.getElementById( 'cngb-preview-dialog' );
                var $dialogImg = jQuery( dialog ).find( 'img' );
                $dialogImg.on( 'load', function() {
                    jQuery( dialog ).find( '.cngb-preview-size' ).text( this.naturalWidth + ' × ' + this.naturalHeight + ' px' );
                });
                jQuery( '.cngb-thumbnail-view' ).on( 'click', '.cngb-preview-icon', function() {
                    var name = jQuery( this ).attr( 'data-name' );
                    jQuery( dialog ).find( '.cngb-preview-title' ).text( name );
                    jQuery( dialog ).find( '.cngb-preview-size' ).text( '' );
                    $dialogImg.attr( 'alt', name ).attr( 'src', jQuery( this ).attr( 'data-src' ) );
                    dialog.showModal();
                });
                // Close when the backdrop (outside the dialog box) is clicked.
                // The target is also the dialog itself for clicks on its padding, so check the position.
                jQuery( dialog ).on( 'click', function( e ) {
                    var rect = dialog.getBoundingClientRect();
                    var inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
                    if( e.target === dialog && !inside ) {
                        dialog.close();
                    }
                });

                $list.on( 'click', '.cngb-delete-icon', function( e ) {
                    var message = jQuery( this ).attr( 'data-confirm' );
                    if( unsaved ) {
                        message += '\n\n' + $list.attr( 'data-unsaved-message' );
                    }
                    if( !window.confirm( message ) ) {
                        e.preventDefault();
                    }
                });
            });
        </script>
    <?php }

    /**
     * Outputs the thumbnail of an icon image in the lists, as a button that opens the preview popup.
     * The size attributes of the image also apply with the legacy style sheet.
     */
    private function render_icon_image( $url, $file ) {
        ?>
        <button type="button" class="button-link cngb-preview-icon" data-src="<?= esc_url( $url ) ?>" data-name="<?= esc_attr( $file ) ?>"
            aria-label="<?= esc_attr( sprintf( __( "Preview '%s'", "guten-bubble-admin" ), $file ) ) ?>" aria-haspopup="dialog">
            <img class="cngb-icon-image" src="<?= esc_url( $url ) ?>" alt="" width="60" height="60" loading="lazy" />
        </button>
        <?php
    }

    /**
     * Outputs a notice of the result of importing or deleting an icon image.
     *
     * @param array $result ['success' => bool, 'message' => string].
     */
    private function render_result_notice( $result ) {
        ?>
        <div class="notice notice-<?= !empty( $result['success'] ) ? 'success' : 'error' ?> is-dismissible">
            <p><?= esc_html( isset( $result['message'] ) ? $result['message'] : '' ) ?></p>
            <?php /* The dismiss button is added by WordPress (wp-admin/js/common.js). */ ?>
        </div>
        <?php
    }

    private function import_chara_icon_file( $icon_url, $label ) {
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
        if( !GutenBubbleCharaIcons::is_image_file_name( $icon_path ) ) {
            return [
                'success' => false,
                'message' => sprintf( __( "ERROR: '%s' is not an image file.", "guten-bubble-admin" ), basename( $icon_path ) )
            ];
        }
        if( !file_exists( $icon_path ) ) {
            return [
                'success' => false,
                'message' => sprintf( __( "ERROR: '%s' does not exist or the file path is invalid.", "guten-bubble-admin" ), basename( $icon_path ) )
            ];
        }
        $existed = file_exists( $upload_dir."guten-bubble/img/".basename( $icon_path ) );
        if( !copy( $icon_path, $upload_dir."guten-bubble/img/".basename( $icon_path ) ) ) {
            return [
                'success' => false,
                'message' => sprintf( __( "ERROR: Failed to import '%s'.", "guten-bubble-admin" ), basename( $icon_path ) )
            ];
        }
        GutenBubbleCharaIcons::upsert_entry( basename( $icon_path ), $label, $existed );
        return [
            'success' => true,
            'message' => sprintf( __( "Info: '%s' is imported.", "guten-bubble-admin" ), basename( $icon_path ) )
        ];
    }

    private function delete_chara_icon_file( $file ) {
        // Only the imported icon images can be deleted. Checking against the list also prevents directory traversal.
        if( !is_string( $file ) || !in_array( $file, GutenBubbleCharaIcons::get_imported_files(), true ) ) {
            return [
                'success' => false,
                'message' => sprintf( __( "ERROR: '%s' does not exist or the file path is invalid.", "guten-bubble-admin" ), is_string( $file ) ? $file : '' )
            ];
        }
        $path = GutenBubbleCharaIcons::get_dir().'/'.$file;
        wp_delete_file( $path );
        if( file_exists( $path ) ) {
            return [
                'success' => false,
                'message' => sprintf( __( "ERROR: Failed to delete '%s'.", "guten-bubble-admin" ), $file )
            ];
        }
        GutenBubbleCharaIcons::remove_entry( $file );
        return [
            'success' => true,
            'message' => sprintf( __( "Info: '%s' is deleted.", "guten-bubble-admin" ), $file )
        ];
    }
}

?>
