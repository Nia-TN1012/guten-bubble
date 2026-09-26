/**
 * Data passed from PHP to the block editor with wp_add_inline_script()
 * (see GutenBubble::enqueue_block_editor_assets()).
 */
interface Window {
	gutenBubble?: {
		/** Options of "Character icon (preset)" for the imported icons, in the order set on the settings page. */
		charaIcons?: Array< { value: string; label: string } >;
	};
}
