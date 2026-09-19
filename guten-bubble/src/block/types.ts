/**
 * Value of an attribute sourced with `source: 'children'`.
 *
 * Kept for backward compatibility with blocks saved by ver. 0.9.x or earlier.
 * Each item is either a text node or a WPElement-like object.
 */
export type ChildrenValue = Array< string | { type: string; props: Record< string, unknown > } >;

/** Attributes shared by the current block and all deprecated versions. */
export type GutenBubbleBaseAttributes = {
	chara_icon_preset: string;
	chara_icon_custom: string;
	chara_name?: ChildrenValue | string;
	content?: ChildrenValue | string;
	theme_color: string;
	chara_align: string;
	tail_type: string;
	effect_shadow: boolean;
	effect_nega: boolean;
	effect_chara_radius: string;
	effect_bubble_radius: string;
	animation: string;
};

/** Attributes of the current block (ver. 0.9.1 or later). */
export type GutenBubbleAttributes = GutenBubbleBaseAttributes & {
	content_fontsize_v2?: string;
};

/** Attributes of ver. 0.8.1 to ver. 0.9.0. */
export type GutenBubbleV1Attributes = GutenBubbleBaseAttributes & {
	content_fontsize?: number;
};
