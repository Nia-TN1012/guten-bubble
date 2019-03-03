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
        charaIconPreset: {
            type: 'string',
            default: 'custom',
        },
        charaIconCustom: {
            type: 'string',
            source: 'attribute',
            attribute: 'alt',
            selector: 'img',
            default: 'default/01-rose.png',
        },
        charaName: {
            type: 'array',
            source: 'children',
            selector: '.chara-name',
        },
        contentText: {
            type: 'array',
            source: 'children',
            selector: '.content',
        },
        themeColor: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-theme-color',
            selector: 'div',
            default: 'default',
        },
        charaAlign: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-chara-align',
            selector: 'div',
            default: 'left',
        },
        tailType: {
            type: 'string',
            source: 'attribute',
            attribute: 'data-tail',
            selector: 'div',
            default: 'speak',
        },
        contentFontSize: {
            type: 'number',
            default: undefined,
        },
        effectShadow: {
            type: 'bool',
            default: false,
        },
        effectNega: {
            type: 'bool',
            default: false,
        },
        effectCharaRadius: {
            type: 'string',
            default: 'square',
        },
        effectBubbleRadius: {
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
                charaIconPreset,
                charaIconCustom,
                charaName,
                contentText,
                themeColor,
                charaAlign,
                tailType,
                contentFontSize,
                effectShadow,
                effectNega,
                effectCharaRadius,
                effectBubbleRadius,
                animation
            },
            setAttributes,
        } = props;

        return [
            renderGutenBubble( (
                    <RichText
                        tagName="p"
                        placeholder={ __( 'Enter serif here ...', 'guten-bubble' ) }
                        value={ contentText }
                        keepPlaceholderOnFocus={ true }
                        style={ { fontSize: contentFontSize + 'px' } }
                        onChange={
                            ( value ) => {
                                setAttributes( { contentText: value } );
                            }
                        }
                    />
                ),
                {
                    charaIcon: charaIconPreset !== 'custom' ? charaIconPreset : charaIconCustom,
                    charaAlign: charaAlign,
                    charaName: charaName,
                    themeColor: themeColor,
                    tailType: tailType,
                    contentFontSize: contentFontSize,
                    effectShadow: effectShadow,
                    effectNega: effectNega,
                    effectCharaRadius: effectCharaRadius,
                    effectBubbleRadius: effectBubbleRadius,
                    animation: animation
                }
            ),
            (
                <InspectorControls className={ className }>
                    <PanelBody title={ __( 'Character icon settings', 'guten-bubble' ) }>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Character icon (preset)', 'guten-bubble' ) }</label>
                            <select value={ charaIconPreset } onChange={
                                ( event ) => {
                                    props.setAttributes( { charaIconPreset: event.target.value } );
                                    event.preventDefault();
                                }
                            }>
                                <option value="custom">{ __( 'Custom', 'guten-bubble' ) }</option>
                                <option value="default/01-rose.png">{ __( 'Rose', 'guten-bubble' ) }</option>
                                <option value="default/02-orange.png">{ __( 'Lemon', 'guten-bubble' ) }</option>
                                <option value="default/03-lemon.png">{ __( 'Lime', 'guten-bubble' ) }</option>
                                <option value="default/04-lime.png">{ __( 'Viridian', 'guten-bubble' ) }</option>
                                <option value="default/05-viridian.png">{ __( 'Sky Blue', 'guten-bubble' ) }</option>
                                <option value="default/06-sky.png">{ __( 'Imperial Blue', 'guten-bubble' ) }</option>
                                <option value="default/07-imperial.png">{ __( 'Lavendar', 'guten-bubble' ) }</option>
                                <option value="default/08-lavendar.png">{ __( 'Monotone', 'guten-bubble' ) }</option>
                                <option value="default/09-monotone.png">{ __( 'Espresso', 'guten-bubble' ) }</option>
                                <option value="default/10-espresso.png">{ __( 'Espresso', 'guten-bubble' ) }</option>
                            </select>
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Character icon (custom)', 'guten-bubble' ) }</label>
                            <small style={ { display: 'block' } }>{ __( 'Enabled only when "Custom" is selected for the "Character icon (preset)".', 'guten-bubble' ) }</small>
                            <small style={ { display: 'block' } }>{ __( 'Specifies a image file in the \'/wp-content/uploads/guten-bubble/img/\' folder.', 'guten-bubble' ) }</small>
                            <TextControl
                                placeholder={ __( 'Character icon file name', 'guten-bubble' ) }
                                value={ charaIconCustom }
                                onChange={ ( value ) => setAttributes( { charaIconCustom: value } ) }
                            />
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Character icon alignment', 'guten-bubble' ) }</label>
                            <select value={ charaAlign } onChange={
                                ( event ) => {
                                    props.setAttributes( { charaAlign: event.target.value } );
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
                                value={ charaName }
                                onChange={ ( value ) => setAttributes( { charaName: value } ) }
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={ __( 'Speech bubble settings', 'guten-bubble' ) }>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Theme color', 'guten-bubble' ) }</label>
                            <select value={ themeColor } onChange={
                                ( event ) => {
                                    props.setAttributes( { themeColor: event.target.value } );
                                    event.preventDefault();
                                }
                            }>
                                <option value="default">{ __( 'Default', 'guten-bubble' ) }</option>
                                <option value="rose">{ __( 'Rose', 'guten-bubble' ) }</option>
                                <option value="rose-fill">{ __( 'Rose (fill-color)', 'guten-bubble' ) }</option>
                                <option value="orange">{ __( 'Orange', 'guten-bubble' ) }</option>
                                <option value="orange-fill">{ __( 'Orange (fill-color)', 'guten-bubble' ) }</option>
                                <option value="lemon">{ __( 'Lemon', 'guten-bubble' ) }</option>
                                <option value="lemon-fill">{ __( 'Lemon (fill-color)', 'guten-bubble' ) }</option>
                                <option value="lime">{ __( 'Lime', 'guten-bubble' ) }</option>
                                <option value="lime-fill">{ __( 'Lime (fill-color)', 'guten-bubble' ) }</option>
                                <option value="viridian">{ __( 'Viridian', 'guten-bubble' ) }</option>
                                <option value="viridian-fill">{ __( 'Viridian (fill-color)', 'guten-bubble' ) }</option>
                                <option value="sky">{ __( 'Sky Blue', 'guten-bubble' ) }</option>
                                <option value="sky-fill">{ __( 'Sky Blue (fill-color)', 'guten-bubble' ) }</option>
                                <option value="imperial">{ __( 'Imperial Blue', 'guten-bubble' ) }</option>
                                <option value="imperial-fill">{ __( 'Imperial Blue (fill-color)', 'guten-bubble' ) }</option>
                                <option value="lavendar">{ __( 'Lavendar', 'guten-bubble' ) }</option>
                                <option value="lavendar-fill">{ __( 'Lavendar (fill-color)', 'guten-bubble' ) }</option>
                                <option value="monotone">{ __( 'Monotone', 'guten-bubble' ) }</option>
                                <option value="monotone-fill">{ __( 'Monotone (fill-color)', 'guten-bubble' ) }</option>
                                <option value="espresso">{ __( 'Espresso', 'guten-bubble' ) }</option>
                                <option value="espresso-fill">{ __( 'Espresso (fill-color)', 'guten-bubble' ) }</option>
                                <option value="success">{ __( 'Bootstrap like (Success)', 'guten-bubble' ) }</option>
                                <option value="info">{ __( 'Bootstrap like (Info)', 'guten-bubble' ) }</option>
                                <option value="warning">{ __( 'Bootstrap like (Warning)', 'guten-bubble' ) }</option>
                                <option value="danger">{ __( 'Bootstrap like (Danger)', 'guten-bubble' ) }</option>
                            </select>
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Speech bubble tail type', 'guten-bubble' ) }</label>
                            <select value={ tailType } onChange={
                                ( event ) => {
                                    props.setAttributes( { tailType: event.target.value } );
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
                                value={ contentFontSize }
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
                                onChange={ ( value ) => setAttributes( { contentFontSize: value } ) }
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={ __( 'Effect settings', 'guten-bubble' ) }>
                        <div>
                            <ToggleControl
                                label={ __( 'Drop shadow', 'guten-bubble' ) }
                                checked={ effectShadow }
                                onChange={ ( value ) => setAttributes( { effectShadow: value } ) }
                            />
                        </div>
                        <div>
                            <ToggleControl
                                label={ __( 'Icon negation', 'guten-bubble' ) }
                                checked={ effectNega }
                                onChange={ ( value ) => setAttributes( { effectNega: value } ) }
                            />
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Character icon corner radius', 'guten-bubble' ) }</label>
                            <select value={ effectCharaRadius } onChange={
                                ( event ) => {
                                    props.setAttributes( { effectCharaRadius: event.target.value } );
                                    event.preventDefault();
                                }
                            }>
                                <option value="square">{ __( 'Square', 'guten-bubble' ) }</option>
                                <option value="corner-r1">{ __( 'Corner radius Lv.1', 'guten-bubble' ) }</option>
                                <option value="corner-r2">{ __( 'Corner radius Lv.2', 'guten-bubble' ) }</option>
                                <option value="corner-r3">{ __( 'Corner radius Lv.3', 'guten-bubble' ) }</option>
                                <option value="corner-r4">{ __( 'Corner radius Lv.4', 'guten-bubble' ) }</option>
                                <option value="corner-r5">{ __( 'Corner radius Lv.5', 'guten-bubble' ) }</option>
                                <option value="corner-round">{ __( 'Rounded', 'guten-bubble' ) }</option>
                            </select>
                        </div>
                        <div>
                            <label style={ { display: 'block' } }>{ __( 'Speech bubble corner radius', 'guten-bubble' ) }</label>
                            <select value={ effectBubbleRadius } onChange={
                                ( event ) => {
                                    props.setAttributes( { effectBubbleRadius: event.target.value } );
                                    event.preventDefault();
                                }
                            }>
                                <option value="square">{ __( 'Square', 'guten-bubble' ) }</option>
                                <option value="corner-r1">{ __( 'Corner radius Lv.1', 'guten-bubble' ) }</option>
                                <option value="corner-r2">{ __( 'Corner radius Lv.2', 'guten-bubble' ) }</option>
                                <option value="corner-r3">{ __( 'Corner radius Lv.3', 'guten-bubble' ) }</option>
                                <option value="corner-r4">{ __( 'Corner radius Lv.4', 'guten-bubble' ) }</option>
                                <option value="corner-r5">{ __( 'Corner radius Lv.5', 'guten-bubble' ) }</option>
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
                                <option value="none">{ __( 'None', 'guten-bubble' ) }</option>
                                <option value="spin">{ __( 'Spin', 'guten-bubble' ) }</option>
                                <option value="spin-rev">{ __( 'Spin (Reverse)', 'guten-bubble' ) }</option>
                                <option value="pendulum">{ __( 'Pendulum', 'guten-bubble' ) }</option>
                                <option value="snake">{ __( 'Snake', 'guten-bubble' ) }</option>
                                <option value="bound">{ __( 'Bound', 'guten-bubble' ) }</option>
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
                charaIconPreset,
                charaIconCustom,
                charaName,
                contentText,
                themeColor,
                charaAlign,
                tailType,
                contentFontSize,
                effectShadow,
                effectNega,
                effectCharaRadius,
                effectBubbleRadius,
                animation
            },
        } = props;
        
        return renderGutenBubble(
            contentText,
            {
                charaIcon: charaIconPreset !== 'custom' ? charaIconPreset : charaIconCustom,
                charaAlign: charaAlign,
                charaName: charaName,
                themeColor: themeColor,
                tailType: tailType,
                contentFontSize: contentFontSize,
                effectShadow: effectShadow,
                effectNega: effectNega,
                effectCharaRadius: effectCharaRadius,
                effectBubbleRadius: effectBubbleRadius,
                animation: animation
            }
        );
    },
};
