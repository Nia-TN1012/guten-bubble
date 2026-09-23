import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import {
	BaseControl,
	FontSizePicker,
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	getAnimationOptions,
	getBubbleRadiusOptions,
	getCharaAlignOptions,
	getCharaIconPresetOptions,
	getCharaRadiusOptions,
	getFontSizeOptions,
	getTailTypeOptions,
	getThemeColorOptions,
} from './constants';
import { renderBubble, resolveCharaIcon } from './render';
import type { ChildrenValue, GutenBubbleAttributes } from './types';

/** Converts a `children` sourced value to plain text for text inputs. */
function childrenToText( value: ChildrenValue | string | undefined ): string {
	if ( value === undefined ) {
		return '';
	}
	if ( typeof value === 'string' ) {
		return value;
	}
	return value
		.map( ( node ) => {
			if ( typeof node === 'string' ) {
				return node;
			}
			return childrenToText( node.props.children as ChildrenValue | string | undefined );
		} )
		.join( '' );
}

export default function Edit( { attributes, setAttributes }: BlockEditProps< GutenBubbleAttributes > ) {
	const blockProps = useBlockProps();
	const fontSize = attributes.content_fontsize_v2 ?? undefined;

	// RichText still accepts `children` sourced values (with a deprecation notice),
	// and returns the same format from onChange.
	const content = (
		<RichText
			tagName="p"
			placeholder={ __( 'Enter serif here ...', 'guten-bubble' ) }
			value={ attributes.content as unknown as string }
			style={ fontSize !== undefined ? { fontSize } : {} }
			onChange={ ( value ) => setAttributes( { content: value } ) }
		/>
	);

	return (
		<>
			<div { ...blockProps }>
				{ renderBubble( {
					content,
					charaIcon: resolveCharaIcon( attributes.chara_icon_preset, attributes.chara_icon_custom ),
					charaAlign: attributes.chara_align,
					charaName: childrenToText( attributes.chara_name ),
					themeColor: attributes.theme_color,
					tailType: attributes.tail_type,
					fontSize,
					effectShadow: attributes.effect_shadow,
					effectNega: attributes.effect_nega,
					effectCharaRadius: attributes.effect_chara_radius,
					effectBubbleRadius: attributes.effect_bubble_radius,
					animation: attributes.animation,
				} ) }
			</div>
			<InspectorControls>
				<PanelBody title={ __( 'Character icon settings', 'guten-bubble' ) }>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Character icon (preset)', 'guten-bubble' ) }
						value={ attributes.chara_icon_preset }
						options={ getCharaIconPresetOptions() }
						onChange={ ( value ) => setAttributes( { chara_icon_preset: value } ) }
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Character icon (custom)', 'guten-bubble' ) }
						help={
							<>
								{ __( 'Enabled only when "Custom" is selected for the "Character icon (preset)".', 'guten-bubble' ) }
								<br />
								{ __( 'Specifies a image file in the \'/wp-content/uploads/guten-bubble/img/\' folder.', 'guten-bubble' ) }
							</>
						}
						placeholder={ __( 'Character icon file name', 'guten-bubble' ) }
						value={ attributes.chara_icon_custom }
						disabled={ attributes.chara_icon_preset !== 'custom' }
						onChange={ ( value ) => setAttributes( { chara_icon_custom: value } ) }
					/>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Character icon alignment', 'guten-bubble' ) }
						value={ attributes.chara_align }
						options={ getCharaAlignOptions() }
						onChange={ ( value ) => setAttributes( { chara_align: value } ) }
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Character name', 'guten-bubble' ) }
						placeholder={ __( 'Character name', 'guten-bubble' ) }
						value={ childrenToText( attributes.chara_name ) }
						onChange={ ( value ) => setAttributes( { chara_name: value } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Speech bubble settings', 'guten-bubble' ) }>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Theme color', 'guten-bubble' ) }
						value={ attributes.theme_color }
						options={ getThemeColorOptions() }
						onChange={ ( value ) => setAttributes( { theme_color: value } ) }
					/>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Speech bubble tail type', 'guten-bubble' ) }
						value={ attributes.tail_type }
						options={ getTailTypeOptions() }
						onChange={ ( value ) => setAttributes( { tail_type: value } ) }
					/>
					<BaseControl
						__nextHasNoMarginBottom
						label={ __( 'Speech bubble text font size', 'guten-bubble' ) }
					>
						<FontSizePicker
							__next40pxDefaultSize
							value={ fontSize }
							fontSizes={ getFontSizeOptions() }
							onChange={ ( value ) =>
								setAttributes( { content_fontsize_v2: value === undefined ? undefined : String( value ) } )
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={ __( 'Effect settings', 'guten-bubble' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Drop shadow', 'guten-bubble' ) }
						checked={ attributes.effect_shadow }
						onChange={ ( value ) => setAttributes( { effect_shadow: value } ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Icon negation', 'guten-bubble' ) }
						checked={ attributes.effect_nega }
						onChange={ ( value ) => setAttributes( { effect_nega: value } ) }
					/>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Character icon corner radius', 'guten-bubble' ) }
						value={ attributes.effect_chara_radius }
						options={ getCharaRadiusOptions() }
						onChange={ ( value ) => setAttributes( { effect_chara_radius: value } ) }
					/>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Speech bubble corner radius', 'guten-bubble' ) }
						value={ attributes.effect_bubble_radius }
						options={ getBubbleRadiusOptions() }
						onChange={ ( value ) => setAttributes( { effect_bubble_radius: value } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Animation', 'guten-bubble' ) }>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Animation', 'guten-bubble' ) }
						hideLabelFromVision
						value={ attributes.animation }
						options={ getAnimationOptions() }
						onChange={ ( value ) => setAttributes( { animation: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
