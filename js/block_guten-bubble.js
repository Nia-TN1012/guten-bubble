( function( blocks, editor, i18n, element, components ) {
    var el = element.createElement;
    var __ = i18n.__;
    var RichText = editor.RichText;
    var InspectorControls = editor.InspectorControls;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var FontSizePicker = components.FontSizePicker;

    // Outputs HTML code of speech bubble display.
    var renderGutenBubble = function(
        elContent,
        charaIcon,
        charaAlign,
        charaName,
        themeColor,
        tailType,
        contentFontSize,
        effectShadow,
        effectNega,
        effectCharaRadius,
        effectBubbleRadius,
        animation ) {
        var dataAttributes = {
            className: 'cn-gutenbubble',
            'data-theme-color': themeColor,
            'data-chara-align': charaAlign,
            'data-tail': tailType,
            'data-animation': animation,
        };
        var charaIconClass = '';
        var tailClass = 'bubble-' + charaAlign + ' tail-' + tailType + '-' + charaAlign;
        var contentClass = 'content';
        if( themeColor !== 'default' ) {
            tailClass += ' theme-color-' + themeColor;
            contentClass += ' theme-color-' + themeColor;
        }
        if( effectShadow ) {
            charaIconClass += ' shadow';
            tailClass += ' shadow';
            contentClass += ' shadow';
        }
        if( effectNega ) {
            charaIconClass += ' nega';
        }
        if( effectCharaRadius !== 'square' ) {
            charaIconClass += ' ' + effectCharaRadius;
        }
        if( effectBubbleRadius !== 'square' ) {
            contentClass += ' ' + effectBubbleRadius;
        }
        if( animation !== 'none' ) {
            charaIconClass += ' ' + animation;
            tailClass += ' ' + animation;
            contentClass += ' ' + animation;
        }
        var contentAttributes = {
            className: contentClass
        };
        if( contentFontSize !== undefined && contentFontSize > 0 ) {
            contentAttributes['style'] = { fontSize: contentFontSize + 'px' };
        }

        return el( 'div', dataAttributes,
            el( 'div', { className: 'chara-' + charaAlign },
                el( 'div', { className: 'chara-icon' },
                    el( 'img',
                        {
                            className: charaIconClass,
                            src: '/wp-content/uploads/guten-bubble/img/' + charaIcon,
                            alt: charaIcon,
                        },
                    )
                ),
                el( 'div', { className: 'chara-name' }, charaName )
            ),
            el( 'div', { className: tailClass },
                el( 'div', contentAttributes, elContent )
            )
        );
    };
    
    // Block registration
    blocks.registerBlockType( 'chronoir-net/guten-bubble', {
        title: 'Guten-Bubble',
        icon: 'admin-comments',
        category: 'widgets',
        description: __( 'Displays a speech bubble like a chat conversation.', 'guten-bubble' ),
        keywords: [ __( 'speech', 'guten-bubble' ), __( 'bubble', 'guten-bubble' ), __( 'chara', 'guten-bubble' ) ],
        attributes: {
            chara_icon_preset: {
                type: 'string',
                default: 'custom',
            },
            chara_icon_custom: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
                selector: 'img',
                default: '01-rose.png',
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
            content_fontsize: {
                type: 'number',
                default: undefined,
            },
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
            }
        },
        edit: function( props ) {
            var charaIconPreset = props.attributes.chara_icon_preset,
                charaIconCustom = props.attributes.chara_icon_custom,
                charaName = props.attributes.chara_name,
                contentText = props.attributes.content,
                themeColor = props.attributes.theme_color,
                charaAlign = props.attributes.chara_align,
                tailType = props.attributes.tail_type,
                contentFontSize = props.attributes.content_fontsize,
                effectShadow = props.attributes.effect_shadow,
                effectNega = props.attributes.effect_nega,
                effectCharaRadius = props.attributes.effect_chara_radius,
                effectBubbleRadius = props.attributes.effect_bubble_radius,
                animation = props.attributes.animation;

            // --- For Editor Block ---
            // Content
            var elContent = el( RichText, {
                tagName: 'p',
                placeholder: __( 'Enter serif here ...', 'guten-bubble' ),
                value: contentText,
                keepPlaceholderOnFocus: true,
                style: { fontSize: contentFontSize + 'px' },
                onChange: function( value ) {
                    props.setAttributes( { content: value } );
                }
            });
            
            // --- For Inspecter Block ---
            // Chara Settings
            // Chara Icon Preset
            var elCharaIconPreset = el( 'div', {},
                el( 'label', { style: { display: 'block' } }, __( 'Character icon (preset)', 'guten-bubble' ) ),
                el( 'select', { value: charaIconPreset, onChange: function( event ) {
                    var selected = event.target.querySelector( 'option:checked' );
                    props.setAttributes( { chara_icon_preset: selected.value } );
                    event.preventDefault();
                } },
                    el( 'option', { value: 'custom' }, __( 'Custom', 'guten-bubble' ) ),
                    el( 'option', { value: 'default/01-rose.png' }, __( 'Rose', 'guten-bubble' ) ),
                    el( 'option', { value: 'default/02-orange.png' }, __( 'Orange', 'guten-bubble' ) ),
                    el( 'option', { value: 'default/03-lemon.png' }, __( 'Lemon', 'guten-bubble' ) ),
                    el( 'option', { value: 'default/04-lime.png' }, __( 'Lime', 'guten-bubble' ) ),
                    el( 'option', { value: 'default/05-viridian.png' }, __( 'Viridian', 'guten-bubble' ) ),
                    el( 'option', { value: 'default/06-sky.png' }, __( 'Sky Blue', 'guten-bubble' ) ),
                    el( 'option', { value: 'default/07-imperial.png' }, __( 'Imperial Blue', 'guten-bubble' ) ),
                    el( 'option', { value: 'default/08-lavendar.png' }, __( 'Lavendar', 'guten-bubble' ) ),
                    el( 'option', { value: 'default/09-monotone.png' }, __( 'Monotone', 'guten-bubble' ) ),
                    el( 'option', { value: 'default/10-espresso.png' }, __( 'Espresso', 'guten-bubble' ) ),
                ),
            );
            // Chara Icon Custom
            var elCharaIconCustom = el( 'div', {},
                el( 'label', { style: { display: 'block' } }, __( 'Character icon (custom)', 'guten-bubble' ) ),
                el( 'small', { style: { display: 'block' } }, __( 'Enabled only when "Custom" is selected for the "Character icon (preset)".', 'guten-bubble' ) ),
                el( 'small', { style: { display: 'block' } }, __( 'Specifies a image file in the \'/wp-content/uploads/guten-bubble/img/\' folder.', 'guten-bubble' ) ),
                el( TextControl, {
                    placeholder: __( 'Character icon file name', 'guten-bubble' ),
                    value: charaIconCustom,
                    onChange: function( value ) {
                        props.setAttributes( { chara_icon_custom: value } );
                    }
                })
            );
            // Chara Icon Alignment
            var elCharaAlign = el( 'div', {},
                el( 'label', { style: { display: 'block' } }, __( 'Character icon alignment', 'guten-bubble' ) ),
                el( 'select', { value: charaAlign, onChange: function( event ) {
                    var selected = event.target.querySelector( 'option:checked' );
                    props.setAttributes( { chara_align: selected.value } );
                    event.preventDefault();
                } },
                    el( 'option', { value: 'left' }, __( 'Left', 'guten-bubble' ) ),
                    el( 'option', { value: 'right' }, __( 'Right', 'guten-bubble' ) ),
                )
            );
            // Chara Name
            var elCharaName = el( 'div', {},
                el( 'label', { style: { display: 'block' } }, __( 'Character name', 'guten-bubble' ) ),
                el( TextControl, {
                    placeholder: __( 'Character name', 'guten-bubble' ),
                    value: charaName,
                    onChange: function( value ) {
                        props.setAttributes( { chara_name: value } );
                    }
                })
            );
            var charaIcon = charaIconPreset !== 'custom' ? charaIconPreset : charaIconCustom;

            // Content Settings
            var elThemeColor = el( 'div', {},
                el( 'label', { style: { display: 'block' } }, __( 'Theme color', 'guten-bubble' ) ),
                el( 'select', { value: themeColor, onChange: function( event ) {
                    var selected = event.target.querySelector( 'option:checked' );
                    props.setAttributes( { theme_color: selected.value } );
                    event.preventDefault();
                } },
                    el( 'option', { value: 'default' }, __( 'Default', 'guten-bubble' ) ),
                    el( 'option', { value: 'rose' }, __( 'Rose', 'guten-bubble' ) ),
                    el( 'option', { value: 'rose-fill' }, __( 'Rose (fill-color)', 'guten-bubble' ) ),
                    el( 'option', { value: 'orange' }, __( 'Orange', 'guten-bubble' ) ),
                    el( 'option', { value: 'orange-fill' }, __( 'Orange (fill-color)', 'guten-bubble' ) ),
                    el( 'option', { value: 'lemon' }, __( 'Lemon', 'guten-bubble' ) ),
                    el( 'option', { value: 'lemon-fill' }, __( 'Lemon (fill-color)', 'guten-bubble' ) ),
                    el( 'option', { value: 'lime' }, __( 'Lime', 'guten-bubble' ) ),
                    el( 'option', { value: 'lime-fill' }, __( 'Lime (fill-color)', 'guten-bubble' ) ),
                    el( 'option', { value: 'viridian' }, __( 'Viridian', 'guten-bubble' ) ),
                    el( 'option', { value: 'viridian-fill' }, __( 'Viridian (fill-color)', 'guten-bubble' ) ),
                    el( 'option', { value: 'sky' }, __( 'Sky Blue', 'guten-bubble' ) ),
                    el( 'option', { value: 'sky-fill' }, __( 'Sky Blue (fill-color)', 'guten-bubble' ) ),
                    el( 'option', { value: 'imperial' }, __( 'Imperial Blue', 'guten-bubble' ) ),
                    el( 'option', { value: 'imperial-fill' }, __( 'Imperial Blue (fill-color)', 'guten-bubble' ) ),
                    el( 'option', { value: 'lavendar' }, __( 'Lavendar', 'guten-bubble' ) ),
                    el( 'option', { value: 'lavendar-fill' }, __( 'Lavendar (fill-color)', 'guten-bubble' ) ),
                    el( 'option', { value: 'monotone' }, __( 'Monotone', 'guten-bubble' ) ),
                    el( 'option', { value: 'monotone-fill' }, __( 'Monotone (fill-color)', 'guten-bubble' ) ),
                    el( 'option', { value: 'espresso' }, __( 'Espresso', 'guten-bubble' ) ),
                    el( 'option', { value: 'espresso-fill' }, __( 'Espresso (fill-color)', 'guten-bubble' ) ),
                    el( 'option', { value: 'success' }, __( 'Bootstrap like (Success)', 'guten-bubble' ) ),
                    el( 'option', { value: 'info' }, __( 'Bootstrap like (Info)', 'guten-bubble' ) ),
                    el( 'option', { value: 'warning' }, __( 'Bootstrap like (Warning)', 'guten-bubble' ) ),
                    el( 'option', { value: 'danger' }, __( 'Bootstrap like (Danger)', 'guten-bubble' ) ),
                )
            );
            // Bubble Tail Type
            var elTailType = el( 'div', {},
                el( 'label', { style: { display: 'block' } }, __( 'Speech bubble tail type', 'guten-bubble' ) ),
                el( 'select', { value: tailType, onChange: function( event ) {
                    var selected = event.target.querySelector( 'option:checked' );
                    props.setAttributes( { tail_type: selected.value } );
                    event.preventDefault();
                } },
                    el( 'option', { value: 'speak' }, __( 'Speaking', 'guten-bubble' ) ),
                    el( 'option', { value: 'think' }, __( 'Thinking', 'guten-bubble' ) ),
                )
            );
            // Content Font Size
            var elContentFontSize = el( 'div', {},
                el( 'label', { style: { display: 'block' } }, __( 'Speech bubble text font size', 'guten-bubble' ) ),
                el( FontSizePicker, {
                    value: contentFontSize,
                    fallbackFontSize: 12,
                    fontSizes: [
                        // 0.625rem
                        {
                            name: __( 'Extra Small', 'guten-bubble' ),
                            slug: 'xsmall',
                            size: 10,
                        },
                        // 0.75rem
                        {
                            name: __( 'Small', 'guten-bubble' ),
                            slug: 'small',
                            size: 12,
                        },
                        // 1rem
                        {
                            name: __( 'Middle', 'guten-bubble' ),
                            slug: 'middle',
                            size: 16,
                        },
                        // 1.5rem
                        {
                            name: __( 'Large', 'guten-bubble' ),
                            slug: 'large',
                            size: 24,
                        },
                        // 2rem
                        {
                            name: __( 'Extra Large', 'guten-bubble' ),
                            slug: 'xlarge',
                            size: 32,
                        }
                    ],
                    onChange: function( value ) {
                        console.log( value );
                        props.setAttributes( { content_fontsize: value } );
                    }
                })
            );

            // Effect Settings
            // Drop Shadow
            var elEffectShadow = el( ToggleControl, {
                label: __( 'Drop shadow', 'guten-bubble' ),
                checked: effectShadow,
                onChange: function( value ) {
                    props.setAttributes( { effect_shadow: value } );
                }
            });
            // Icon Negate
            var elEffectNega = el( ToggleControl, {
                label: __( 'Icon negation', 'guten-bubble' ),
                checked: effectNega,
                onChange: function( value ) {
                    props.setAttributes( { effect_nega: value } );
                }
            });
            // Chara Icon Corner Raduis
            var elEffectCharaRadius = el( 'div', {},
                el( 'label', { style: { display: 'block' } }, __( 'Character icon corner radius', 'guten-bubble' ) ),
                el( 'select', { value: effectCharaRadius, onChange: function( event ) {
                    var selected = event.target.querySelector( 'option:checked' );
                    props.setAttributes( { effect_chara_radius: selected.value } );
                    event.preventDefault();
                } },
                    el( 'option', { value: 'square' }, __( 'Square', 'guten-bubble' ) ),
                    el( 'option', { value: 'corner-r1' }, __( 'Corner radius Lv.1', 'guten-bubble' ) ),
                    el( 'option', { value: 'corner-r2' }, __( 'Corner radius Lv.2', 'guten-bubble' ) ),
                    el( 'option', { value: 'corner-r3' }, __( 'Corner radius Lv.3', 'guten-bubble' ) ),
                    el( 'option', { value: 'corner-r4' }, __( 'Corner radius Lv.4', 'guten-bubble' ) ),
                    el( 'option', { value: 'corner-r5' }, __( 'Corner radius Lv.5', 'guten-bubble' ) ),
                    el( 'option', { value: 'corner-round' }, __( 'Rounded', 'guten-bubble' ) ),
                )
            );
            // Bubble Corner Raduis
            var elEffectBubbleRadius = el( 'div', {},
                el( 'label', { style: { display: 'block' } }, __( 'Speech bubble corner radius', 'guten-bubble' ) ),
                el( 'select', { value: effectBubbleRadius, onChange: function( event ) {
                    var selected = event.target.querySelector( 'option:checked' );
                    props.setAttributes( { effect_bubble_radius: selected.value } );
                    event.preventDefault();
                } },
                    el( 'option', { value: 'square' }, __( 'Square', 'guten-bubble' ) ),
                    el( 'option', { value: 'corner-r1' }, __( 'Corner radius Lv.1', 'guten-bubble' ) ),
                    el( 'option', { value: 'corner-r2' }, __( 'Corner radius Lv.2', 'guten-bubble' ) ),
                    el( 'option', { value: 'corner-r3' }, __( 'Corner radius Lv.3', 'guten-bubble' ) ),
                    el( 'option', { value: 'corner-r4' }, __( 'Corner radius Lv.4', 'guten-bubble' ) ),
                    el( 'option', { value: 'corner-r5' }, __( 'Corner radius Lv.5', 'guten-bubble' ) ),
                )
            );

            // Animation Settings
            var elAnimation = el( 'select', { value: animation, onChange: function( event ) {
                var selected = event.target.querySelector( 'option:checked' );
                props.setAttributes( { animation: selected.value } );
                event.preventDefault();
            } },
                el( 'option', { value: 'none' }, __( 'None', 'guten-bubble' ) ),
                el( 'option', { value: 'spin' }, __( 'Spin', 'guten-bubble' ) ),
				el( 'option', { value: 'spin-rev' }, __( 'Spin (Reverse)', 'guten-bubble' ) ),
				el( 'option', { value: 'pendulum' }, __( 'Pendulum', 'guten-bubble' ) ),
                el( 'option', { value: 'snake' }, __( 'Snake', 'guten-bubble' ) ),
				el( 'option', { value: 'bound' }, __( 'Bound', 'guten-bubble' ) ),
            );

            return [
				renderGutenBubble(
                    elContent,
                    charaIcon,
                    charaAlign,
                    charaName,
                    themeColor,
                    tailType,
                    contentFontSize,
                    effectShadow,
                    effectNega,
                    effectCharaRadius,
                    effectBubbleRadius,
                    animation
                ),
                el( InspectorControls, { className: props.className },
                    el( PanelBody, { title: __( 'Character icon settings', 'guten-bubble' ) },
                        elCharaIconPreset,
                        elCharaIconCustom,
                        elCharaAlign,
                        elCharaName,
                    ),
                    el( PanelBody, { title: __( 'Speech bubble settings', 'guten-bubble' ) },
                        elThemeColor,
                        elTailType,
                        elContentFontSize,
                    ),
					el( PanelBody, { title: __( 'Effect settings', 'guten-bubble' ) },
						elEffectShadow,
                        elEffectNega,
                        elEffectCharaRadius,
                        elEffectBubbleRadius,
					),
					el( PanelBody, { title: __( 'Animation', 'guten-bubble' ) },
						elAnimation,
                    ),
				)
			];
        },
        save: function( props ) {
            var contentText = props.attributes.content,
                charaIcon = props.attributes.chara_icon_preset,
				charaName = props.attributes.chara_name,
				themeColor = props.attributes.theme_color,
                charaAlign = props.attributes.chara_align,
                tailType = props.attributes.tail_type,
                contentFontSize = props.attributes.content_fontsize,
                effectShadow = props.attributes.effect_shadow,
                effectNega = props.attributes.effect_nega,
                effectCharaRadius = props.attributes.effect_chara_radius,
                effectBubbleRadius = props.attributes.effect_bubble_radius,
                animation = props.attributes.animation;
            
            if( charaIcon === 'custom' ) {
                charaIcon = props.attributes.chara_icon_custom;
			}

            return renderGutenBubble(
                contentText,
                charaIcon,
                charaAlign,
                charaName,
                themeColor,
                tailType,
                contentFontSize,
                effectShadow,
                effectNega,
                effectCharaRadius,
                effectBubbleRadius,
                animation
            );
        },
    } );
}(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
    window.wp.element,
    window.wp.components,
) );