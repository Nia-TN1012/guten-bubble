import type { BlockDeprecation } from '@wordpress/blocks';
import type { ReactNode } from 'react';
import { attributesV1 } from './attributes';
import { renderBubble, resolveCharaIcon } from './render';
import type { GutenBubbleAttributes, GutenBubbleV1Attributes } from './types';

/**
 * ver. 0.8.1 to ver. 0.9.0: `content_fontsize` (number, px) was upgraded to
 * `content_fontsize_v2` (CSS size string) in ver. 0.9.1.
 */
const v1: BlockDeprecation< GutenBubbleAttributes, GutenBubbleV1Attributes > = {
	// Saved by the legacy block (API version 1), whose root element gets the
	// generated class name without useBlockProps.save(). Without this, the entry
	// would inherit API version 3 from the block type.
	apiVersion: 1,
	attributes: attributesV1,
	migrate( attributes ) {
		const { content_fontsize: contentFontSize, ...rest } = attributes;
		return {
			...rest,
			content_fontsize_v2:
				contentFontSize !== undefined && contentFontSize > 0 ? contentFontSize + 'px' : undefined,
		};
	},
	save( { attributes } ) {
		const contentFontSize = attributes.content_fontsize;
		return renderBubble( {
			content: attributes.content as ReactNode,
			charaIcon: resolveCharaIcon( attributes.chara_icon_preset, attributes.chara_icon_custom ),
			charaAlign: attributes.chara_align,
			charaName: attributes.chara_name as ReactNode,
			themeColor: attributes.theme_color,
			tailType: attributes.tail_type,
			fontSize: contentFontSize !== undefined && contentFontSize > 0 ? contentFontSize + 'px' : undefined,
			effectShadow: attributes.effect_shadow,
			effectNega: attributes.effect_nega,
			effectCharaRadius: attributes.effect_chara_radius,
			effectBubbleRadius: attributes.effect_bubble_radius,
			animation: attributes.animation,
		} );
	},
};

// Newest first, as recommended by the Block API.
const deprecated = [ v1 ] as unknown as BlockDeprecation< GutenBubbleAttributes >[];

export default deprecated;
