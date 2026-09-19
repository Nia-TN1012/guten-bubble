import type { ReactNode } from 'react';

/** Base URL of character icon images (relative to the site root). */
const ICON_BASE_URL = '/wp-content/uploads/guten-bubble/img/';

export interface BubbleOptions {
	content: ReactNode;
	charaIcon: string;
	charaAlign: string;
	charaName: ReactNode;
	themeColor: string;
	tailType: string;
	/** CSS font size of the bubble text, or undefined to use the theme default. */
	fontSize: string | undefined;
	effectShadow: boolean;
	effectNega: boolean;
	effectCharaRadius: string;
	effectBubbleRadius: string;
	animation: string;
	/**
	 * Transforms the props of the root element.
	 * save() passes useBlockProps.save to add the generated block class name.
	 */
	getRootProps?: ( props: Record< string, unknown > ) => Record< string, unknown >;
}

/**
 * Renders the speech bubble markup.
 *
 * This is a plain function (not a component) on purpose: save() must return the
 * root <div> element itself, because WordPress applies the
 * `blocks.getSaveContent.extraProps` filters (e.g. the generated class name for
 * API version 1) to the props of the returned element.
 *
 * IMPORTANT: The output is compared with the saved post content by the block
 * validator. Class strings (including their leading spaces), element order and
 * attribute order must stay identical to renderGutenBubble() in
 * legacy/block_guten-bubble.js, otherwise existing blocks become invalid.
 * (Covered by __tests__/compatibility.test.ts.)
 */
export function renderBubble( {
	content,
	charaIcon,
	charaAlign,
	charaName,
	themeColor,
	tailType,
	fontSize,
	effectShadow,
	effectNega,
	effectCharaRadius,
	effectBubbleRadius,
	animation,
	getRootProps = ( props ) => props,
}: BubbleOptions ) {
	let charaIconClass = '';
	let tailClass = 'bubble-' + charaAlign + ' tail-' + tailType + '-' + charaAlign;
	let contentClass = 'content';
	if ( themeColor !== 'default' ) {
		tailClass += ' theme-color-' + themeColor;
		contentClass += ' theme-color-' + themeColor;
	}
	if ( effectShadow ) {
		charaIconClass += ' shadow';
		tailClass += ' shadow';
		contentClass += ' shadow';
	}
	if ( effectNega ) {
		charaIconClass += ' nega';
	}
	if ( effectCharaRadius !== 'square' ) {
		charaIconClass += ' ' + effectCharaRadius;
	}
	if ( effectBubbleRadius !== 'square' ) {
		contentClass += ' ' + effectBubbleRadius;
	}
	if ( animation !== 'none' ) {
		charaIconClass += ' ' + animation;
		tailClass += ' ' + animation;
		contentClass += ' ' + animation;
	}

	const rootProps = getRootProps( {
		className: 'cn-gutenbubble',
		'data-theme-color': themeColor,
		'data-chara-align': charaAlign,
		'data-tail': tailType,
		'data-animation': animation,
	} );

	return (
		<div { ...rootProps }>
			<div className={ 'chara-' + charaAlign }>
				<div className="chara-icon">
					<img
						className={ charaIconClass }
						src={ ICON_BASE_URL + charaIcon }
						alt={ charaIcon }
					/>
				</div>
				<div className="chara-name">{ charaName }</div>
			</div>
			<div className={ tailClass }>
				<div
					className={ contentClass }
					style={ fontSize !== undefined ? { fontSize } : undefined }
				>
					{ content }
				</div>
			</div>
		</div>
	);
}

/** Resolves the icon file path from the preset and custom attributes. */
export function resolveCharaIcon( preset: string, custom: string ): string {
	return preset !== 'custom' ? preset : custom;
}
