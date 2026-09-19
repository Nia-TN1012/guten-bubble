import type { BlockConfiguration } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { attributes } from './attributes';
import deprecated from './deprecated';
import Edit from './edit';
import save from './save';
import type { GutenBubbleAttributes } from './types';

/** Block name. Must match legacy/block_guten-bubble.js. */
export const name = 'chronoir-net/guten-bubble';

/**
 * Block settings.
 *
 * NOTE: The category and (absence of) `supports` must match
 * legacy/block_guten-bubble.js; `supports` affects the saved markup.
 */
export const settings = {
	apiVersion: 3,
	title: 'Guten-Bubble',
	icon: 'admin-comments',
	category: 'widgets',
	description: __( 'Displays a speech bubble like a chat conversation.', 'guten-bubble' ),
	keywords: [ __( 'speech', 'guten-bubble' ), __( 'bubble', 'guten-bubble' ), __( 'chara', 'guten-bubble' ) ],
	attributes,
	deprecated,
	edit: Edit,
	save,
} satisfies Omit< BlockConfiguration< GutenBubbleAttributes >, 'name' >;
