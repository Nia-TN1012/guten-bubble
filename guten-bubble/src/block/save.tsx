import { useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';
import type { ReactNode } from 'react';
import { renderBubble, resolveCharaIcon } from './render';
import type { GutenBubbleAttributes } from './types';

/**
 * Outputs the HTML of the speech bubble.
 *
 * The legacy block (API version 1) got the generated class name
 * (`wp-block-chronoir-net-guten-bubble`) added to its root element automatically.
 * With API version 3 this is done by useBlockProps.save(), which applies the same
 * filters, so the saved markup stays identical.
 */
export default function save( { attributes }: BlockSaveProps< GutenBubbleAttributes > ) {
	return renderBubble( {
		content: attributes.content as ReactNode,
		charaIcon: resolveCharaIcon( attributes.chara_icon_preset, attributes.chara_icon_custom ),
		charaAlign: attributes.chara_align,
		charaName: attributes.chara_name as ReactNode,
		themeColor: attributes.theme_color,
		tailType: attributes.tail_type,
		// Legacy checks with `!= undefined`, so null is treated as unset as well.
		fontSize: attributes.content_fontsize_v2 ?? undefined,
		effectShadow: attributes.effect_shadow,
		effectNega: attributes.effect_nega,
		effectCharaRadius: attributes.effect_chara_radius,
		effectBubbleRadius: attributes.effect_bubble_radius,
		animation: attributes.animation,
		getRootProps: useBlockProps.save,
	} );
}
