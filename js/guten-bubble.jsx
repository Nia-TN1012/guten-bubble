const { __ } = wp.i18n;
const {
    RichText,
    InspectorControls
} = wp.editor;
const {
    PanelBody, 
    TextControl, 
    ToggleControl, 
    FontSizePicker 
} = wp.components;

const presetCharaIcons = require( './json/preset-chara-icons.json' );
const presetThemeColors = require( './json/preset-theme-colors.json' );
const presetAnimations = require( './json/preset-animations.json' );
const presetCornerRadius = require( './json/preset-corner-radius.json' );

const renderGutenBubble = ( elContent, gbprops ) => {
    const charaIconClass = [];
    const tailClass = [
        'bubble-' + gbprops.charaAlign,
        'tail-' + gbprops.tailType  + '-' + gbprops.charaAlign,
    ];
    const contentClass = [ 'content' ];
    const contentStyle = {};
    if( gbprops.themeColor !== 'default' ) {
        tailClass.push( 'theme-color-' + gbprops.themeColor );
        contentClass.push( 'theme-color-' + gbprops.themeColor );
    }
    if( gbprops.effectShadow ) {
        charaIconClass.push( 'shadow' );
        tailClass.push( 'shadow' );
        contentClass.push( 'shadow' );
    }
    if( gbprops.effectNega ) {
        charaIconClass.push( 'nega' );
    }
    if( gbprops.effectCharaRadius !== 'square' ) {
        charaIconClass.push( gbprops.effectCharaRadius );
    }
    if( gbprops.effectBubbleRadius !== 'square' ) {
        contentClass.push( gbprops.effectBubbleRadius );
    }
    if( gbprops.animation !== 'none' ) {
        charaIconClass.push( gbprops.animation );
    }
    if( gbprops.contentFontSize !== undefined && gbprops.contentFontSize > 0 ) {
        contentStyle['fontSize'] = gbprops.contentFontSize + 'px';
    }

    return (
        <div className='cn-gutenbubble' 
            data-theme-color={ gbprops.themeColor }
            data-chara-align={ gbprops.charaAlign }
            data-tail={ gbprops.tailType }
            data-animation={ gbprops.animation }>
            <div className={ 'chara-' + gbprops.charaAlign }>
                <div className='chara-icon'>
                    <img className={ charaIconClass.join( ' ' ) }
                            src={ '/wp-content/uploads/guten-bubble/img/' + gbprops.charaIcon }
                            alt={ gbprops.charaIcon }/>
                </div>
                <div className='chara-name'>{ gbprops.charaName }</div>
            </div>
            <div className={ tailClass.join( ' ' ) }>
                <div className={ contentClass.join( ' ' ) } style={ contentStyle }>
                    { elContent }
                </div>
            </div>
        </div>
    );
}

export default {
    name: 'chronoir-net/guten-bubble',
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
    edit: ( props ) => {
        const {
            className,
			attributes: {
                chara_icon_preset,
                chara_icon_custom,
                chara_name,
                content,
                theme_color,
                chara_align,
                tail_type,
                content_fontsize,
                effect_shadow,
                effect_nega,
                effect_chara_radius,
                effect_bubble_radius,
                animation
            },
            setAttributes,
        } = props;

        return [
            renderGutenBubble( (
                    <RichText
                        tagName="p"
                        placeholder={ __( 'Enter serif here ...', 'guten-bubble' ) }
                        value={ content }
                        keepPlaceholderOnFocus={ true }
                        style={ { fontSize: content_fontsize + 'px' } }
                        onChange={
                            ( value ) => {
                                setAttributes( { content: value } );
                            }
                        }
                    />
                ),
                {
                    charaIcon: chara_icon_preset !== 'custom' ? chara_icon_preset : chara_icon_custom,
                    charaAlign: chara_align,
                    charaName: chara_name,
                    themeColor: theme_color,
                    tailType: tail_type,
                    contentFontSize: content_fontsize,
                    effectShadow: effect_shadow,
                    effectNega: effect_nega,
                    effectCharaRadius: effect_chara_radius,
                    effectBubbleRadius: effect_bubble_radius,
                    animation: animation
                }
            ),
            (
                <InspectorControls className={ className }>
                    <PanelBody title={ __( 'Character icon settings', 'guten-bubble' ) }>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Character icon (preset)', 'guten-bubble' ) }</label>
                            <select value={ chara_icon_preset } onChange={
                                ( event ) => {
                                    props.setAttributes( { chara_icon_preset: event.target.value } );
                                    event.preventDefault();
                                }
                            }>
                                {
                                    presetCharaIcons.map(
                                        element => <option value={ element.value }>{ __( element.label, 'guten-bubble' ) }</option>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Character icon (custom)', 'guten-bubble' ) }</label>
                            <small style={ { display: 'block' } }>{ __( 'Enabled only when "Custom" is selected for the "Character icon (preset)".', 'guten-bubble' ) }</small>
                            <small style={ { display: 'block' } }>{ __( 'Specifies a image file in the \'/wp-content/uploads/guten-bubble/img/\' folder.', 'guten-bubble' ) }</small>
                            <TextControl
                                placeholder={ __( 'Character icon file name', 'guten-bubble' ) }
                                value={ chara_icon_custom }
                                onChange={ ( value ) => setAttributes( { chara_icon_custom: value } ) }
                            />
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Character icon alignment', 'guten-bubble' ) }</label>
                            <select value={ chara_align } onChange={
                                ( event ) => {
                                    props.setAttributes( { chara_align: event.target.value } );
                                    event.preventDefault();
                                }
                            }>
                                <option value="left">{ __( 'Left', 'guten-bubble' ) }</option>
                                <option value="right">{ __( 'Right', 'guten-bubble' ) }</option>
                            </select>
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Character name', 'guten-bubble' ) }</label>
                            <TextControl
                                placeholder={ __( 'Character name', 'guten-bubble' ) }
                                value={ chara_name }
                                onChange={ ( value ) => setAttributes( { chara_name: value } ) }
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={ __( 'Speech bubble settings', 'guten-bubble' ) }>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Theme color', 'guten-bubble' ) }</label>
                            <select value={ theme_color } onChange={
                                ( event ) => {
                                    props.setAttributes( { theme_color: event.target.value } );
                                    event.preventDefault();
                                }
                            }>
                                {
                                    presetThemeColors.map(
                                        element => <option value={ element.value }>{ __( element.label, 'guten-bubble' ) }</option>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Speech bubble tail type', 'guten-bubble' ) }</label>
                            <select value={ tail_type } onChange={
                                ( event ) => {
                                    props.setAttributes( { tail_type: event.target.value } );
                                    event.preventDefault();
                                }
                            }>
                                <option value="speak">{ __( 'Speaking', 'guten-bubble' ) }</option>
                                <option value="think">{ __( 'Thinking', 'guten-bubble' ) }</option>
                            </select>
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Speech bubble text font size', 'guten-bubble' ) }</label>
                            <FontSizePicker
                                value={ content_fontsize }
                                fallbackFontSize="12"
                                fontSizes={[
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
                                ]}
                                onChange={ ( value ) => setAttributes( { content_fontsize: value } ) }
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={ __( 'Effect settings', 'guten-bubble' ) }>
                        <div>
                            <ToggleControl
                                label={ __( 'Drop shadow', 'guten-bubble' ) }
                                checked={ effect_shadow }
                                onChange={ ( value ) => setAttributes( { effect_shadow: value } ) }
                            />
                        </div>
                        <div>
                            <ToggleControl
                                label={ __( 'Icon negation', 'guten-bubble' ) }
                                checked={ effect_nega }
                                onChange={ ( value ) => setAttributes( { effect_nega: value } ) }
                            />
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Character icon corner radius', 'guten-bubble' ) }</label>
                            <select value={ effect_chara_radius } onChange={
                                ( event ) => {
                                    props.setAttributes( { effect_chara_radius: event.target.value } );
                                    event.preventDefault();
                                }
                            }>
                                {
                                    presetCornerRadius.chara.map(
                                        element => <option value={ element.value }>{ __( element.label, 'guten-bubble' ) }</option>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Speech bubble corner radius', 'guten-bubble' ) }</label>
                            <select value={ effect_bubble_radius } onChange={
                                ( event ) => {
                                    props.setAttributes( { effect_bubble_radius: event.target.value } );
                                    event.preventDefault();
                                }
                            }>
                                {
                                    presetCornerRadius.bubble.map(
                                        element => <option value={ element.value }>{ __( element.label, 'guten-bubble' ) }</option>
                                    )
                                }
                            </select>
                        </div>
                    </PanelBody>
                    <PanelBody title={ __( 'Animation', 'guten-bubble' ) }>
                        <div>
                            <select value={ animation } onChange={
                                ( event ) => {
                                    props.setAttributes( { animation: event.target.value } );
                                    event.preventDefault();
                                }
                            }>
                                {
                                    presetAnimations.map(
                                        element => <option value={ element.value }>{ __( element.label, 'guten-bubble' ) }</option>
                                    )
                                }
                            </select>
                        </div>
                    </PanelBody>
                </InspectorControls>
            )
        ];
    },
    save: ( props ) => {
        const {
			attributes: {
                chara_icon_preset,
                chara_icon_custom,
                chara_name,
                content,
                theme_color,
                chara_align,
                tail_type,
                contentFontSize,
                effect_shadow,
                effect_nega,
                effect_chara_radius,
                effect_bubble_radius,
                animation
            },
        } = props;
        
        return renderGutenBubble(
            content,
            {
                charaIcon: chara_icon_preset !== 'custom' ? chara_icon_preset : chara_icon_custom,
                charaAlign: chara_align,
                charaName: chara_name,
                themeColor: theme_color,
                tailType: tail_type,
                contentFontSize: contentFontSize,
                effectShadow: effect_shadow,
                effectNega: effect_nega,
                effectCharaRadius: effect_chara_radius,
                effectBubbleRadius: effect_bubble_radius,
                animation: animation
            }
        );
    },
};
