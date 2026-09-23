import type { BlockAttribute } from '@wordpress/blocks';
import type {
	GutenBubbleAttributes,
	GutenBubbleBaseAttributes,
	GutenBubbleV1Attributes,
} from './types';

/*
 * IMPORTANT: These definitions must stay identical to legacy/block_guten-bubble.js.
 * Changing a source, selector or default breaks parsing of existing posts.
 */

type AttributeDefinitions< T > = { [ K in keyof T ]-?: BlockAttribute };

/** Attributes shared by the current block and all deprecated versions. */
export const baseAttributes = {
	chara_icon_preset: {
		type: 'string',
		default: 'custom',
	},
	chara_icon_custom: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img',
		default: 'default/01-rose.png',
	},
	chara_name: {
		type: 'array',
		source: 'children',
		selector: '.chara-name',
	},
	content: {
		type: 'array',
		source: 'children',
		selector: '.content',
	},
	theme_color: {
		type: 'string',
		source: 'attribute',
		attribute: 'data-theme-color',
		selector: 'div',
		default: 'default',
	},
	chara_align: {
		type: 'string',
		source: 'attribute',
		attribute: 'data-chara-align',
		selector: 'div',
		default: 'left',
	},
	tail_type: {
		type: 'string',
		source: 'attribute',
		attribute: 'data-tail',
		selector: 'div',
		default: 'speak',
	},
	// 'bool' is not a valid attribute type, so WordPress skips type validation
	// for these attributes. Kept as is to preserve the legacy parsing behavior.
	effect_shadow: {
		type: 'bool',
		default: true,
	},
	effect_nega: {
		type: 'bool',
		default: false,
	},
	effect_chara_radius: {
		type: 'string',
		default: 'square',
	},
	effect_bubble_radius: {
		type: 'string',
		default: 'square',
	},
	animation: {
		type: 'string',
		source: 'attribute',
		attribute: 'data-animation',
		selector: 'div',
		default: 'none',
	},
} as unknown as AttributeDefinitions< GutenBubbleBaseAttributes >;

/** Attributes of the current block (ver. 0.9.1 or later). */
export const attributes: AttributeDefinitions< GutenBubbleAttributes > = {
	...baseAttributes,
	content_fontsize_v2: {
		type: 'string',
		default: undefined,
	},
};

/** Attributes of ver. 0.8.1 to ver. 0.9.0. */
export const attributesV1: AttributeDefinitions< GutenBubbleV1Attributes > = {
	...baseAttributes,
	content_fontsize: {
		type: 'number',
		default: undefined,
	},
};
