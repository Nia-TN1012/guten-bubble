export default {
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
        content_fontsize: {
            type: 'number',
            default: undefined,
        },
        effect_shadow: {
            type: 'bool',
            default: false,
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
    },
    migrate( attributes, innnerBlock ) {
        return {
            charaIconPreset: attributes.chara_icon_preset,
            charaIconCustom: attributes.chara_icon_custom,
            charaName: attributes.chara_name,
            contentText: attributes.content,
            themeColor: attributes.theme_color,
            charaAlign: attributes.chara_align,
            tailType: attributes.tail_type,
            contentFontSize: attributes.content_fontsize,
            effectShadow: attributes.effect_shadow,
            effectNega: attributes.effect_nega,
            effectCharaRadius: attributes.effect_chara_radius,
            effectBubbleRadius: attributes.effect_bubble_radius,
            animation: attributes.animation
        };
    },
    save( props ) {
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

            var el = wp.element.createElement;

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
}