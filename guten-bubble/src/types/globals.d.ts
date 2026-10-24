/**
 * Data passed from PHP to the block editor with wp_add_inline_script()
 * (see GutenBubble::enqueue_block_editor_assets()).
 */
interface Window {
	gutenBubble?: {
		/**
		 * Imported icons, in the order set on the settings page.
		 * Icons with `preset: false` are not shown in "Character icon (preset)".
		 */
		charaIcons?: Array< { value: string; label: string; preset?: boolean } >;
	};
}
