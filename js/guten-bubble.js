/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_guten_bubble_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/guten-bubble.jsx */ "./js/guten-bubble.jsx");

var registerBlockType = wp.blocks.registerBlockType;
registerBlockType(_js_guten_bubble_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].name, _js_guten_bubble_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./js/guten-bubble.jsx":
/*!*****************************!*\
  !*** ./js/guten-bubble.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __ = wp.i18n.__;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    InspectorControls = _wp$editor.InspectorControls;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    TextControl = _wp$components.TextControl,
    ToggleControl = _wp$components.ToggleControl,
    FontSizePicker = _wp$components.FontSizePicker;

var renderGutenBubble = function renderGutenBubble(elContent, gbprops) {
  var charaIconClass = [];
  var tailClass = ['bubble-' + gbprops.charaAlign, 'tail-' + gbprops.tailType + '-' + gbprops.charaAlign];
  var contentClass = ['content'];
  var contentStyle = {};

  if (gbprops.themeColor !== 'default') {
    tailClass.push('theme-color-' + gbprops.themeColor);
    contentClass.push('theme-color-' + gbprops.themeColor);
  }

  if (gbprops.effectShadow) {
    charaIconClass.push('shadow');
    tailClass.push('shadow');
    contentClass.push('shadow');
  }

  if (gbprops.effectNega) {
    charaIconClass.push('nega');
  }

  if (gbprops.effectCharaRadius !== 'square') {
    charaIconClass.push(gbprops.effectCharaRadius);
  }

  if (gbprops.effectBubbleRadius !== 'square') {
    contentClass.push(gbprops.effectBubbleRadius);
  }

  if (gbprops.animation !== 'none') {
    charaIconClass.push(gbprops.animation);
  }

  if (gbprops.contentFontSize !== undefined && gbprops.contentFontSize > 0) {
    contentStyle['fontSize'] = gbprops.contentFontSize + 'px';
  }

  return wp.element.createElement("div", {
    className: 'cn-gutenbubble',
    "data-theme-color": gbprops.themeColor,
    "data-chara-align": gbprops.charaAlign,
    "data-tail": gbprops.tailType,
    "data-animation": gbprops.animation
  }, wp.element.createElement("div", {
    className: 'chara-' + gbprops.charaAlign
  }, wp.element.createElement("div", {
    className: 'chara-icon'
  }, wp.element.createElement("img", {
    className: charaIconClass,
    src: '/wp-content/uploads/guten-bubble/img/' + gbprops.charaIcon,
    alt: gbprops.charaIcon
  })), wp.element.createElement("div", {
    className: 'chara-name'
  }, gbprops.charaName)), wp.element.createElement("div", {
    className: tailClass.join(' ')
  }, wp.element.createElement("div", {
    className: contentClass.join(' '),
    style: contentStyle
  }, elContent)));
};

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'chronoir-net/guten-bubble',
  title: 'Guten-Bubble',
  icon: 'admin-comments',
  category: 'widgets',
  description: __('Displays a speech bubble like a chat conversation.', 'guten-bubble'),
  keywords: [__('speech', 'guten-bubble'), __('bubble', 'guten-bubble'), __('chara', 'guten-bubble')],
  attributes: {
    charaIconPreset: {
      type: 'string',
      default: 'custom'
    },
    charaIconCustom: {
      type: 'string',
      source: 'attribute',
      attribute: 'alt',
      selector: 'img',
      default: 'default/01-rose.png'
    },
    charaName: {
      type: 'array',
      source: 'children',
      selector: '.chara-name'
    },
    contentText: {
      type: 'array',
      source: 'children',
      selector: '.content'
    },
    themeColor: {
      type: 'string',
      source: 'attribute',
      attribute: 'data-theme-color',
      selector: 'div',
      default: 'default'
    },
    charaAlign: {
      type: 'string',
      source: 'attribute',
      attribute: 'data-chara-align',
      selector: 'div',
      default: 'left'
    },
    tailType: {
      type: 'string',
      source: 'attribute',
      attribute: 'data-tail',
      selector: 'div',
      default: 'speak'
    },
    contentFontSize: {
      type: 'number',
      default: undefined
    },
    effectShadow: {
      type: 'bool',
      default: false
    },
    effectNega: {
      type: 'bool',
      default: false
    },
    effectCharaRadius: {
      type: 'string',
      default: 'square'
    },
    effectBubbleRadius: {
      type: 'string',
      default: 'square'
    },
    animation: {
      type: 'string',
      source: 'attribute',
      attribute: 'data-animation',
      selector: 'div',
      default: 'none'
    }
  },
  edit: function edit(props) {
    var className = props.className,
        _props$attributes = props.attributes,
        charaIconPreset = _props$attributes.charaIconPreset,
        charaIconCustom = _props$attributes.charaIconCustom,
        charaName = _props$attributes.charaName,
        contentText = _props$attributes.contentText,
        themeColor = _props$attributes.themeColor,
        charaAlign = _props$attributes.charaAlign,
        tailType = _props$attributes.tailType,
        contentFontSize = _props$attributes.contentFontSize,
        effectShadow = _props$attributes.effectShadow,
        effectNega = _props$attributes.effectNega,
        effectCharaRadius = _props$attributes.effectCharaRadius,
        effectBubbleRadius = _props$attributes.effectBubbleRadius,
        animation = _props$attributes.animation,
        setAttributes = props.setAttributes;
    return [renderGutenBubble(wp.element.createElement(RichText, {
      tagName: "p",
      placeholder: __('Enter serif here ...', 'guten-bubble'),
      value: contentText,
      keepPlaceholderOnFocus: true,
      style: {
        fontSize: contentFontSize + 'px'
      },
      onChange: function onChange(value) {
        setAttributes({
          contentText: value
        });
      }
    }), {
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
    }), wp.element.createElement(InspectorControls, {
      className: className
    }, wp.element.createElement(PanelBody, {
      title: __('Character icon settings', 'guten-bubble')
    }, wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Character icon (preset)', 'guten-bubble')), wp.element.createElement("select", {
      value: charaIconPreset,
      onChange: function onChange(event) {
        var _event$target$querySe = event.target.querySelector('option:checked'),
            selected = _event$target$querySe.selected;

        props.setAttributes({
          charaIconPreset: selected.value
        });
        event.preventDefault();
      }
    }, wp.element.createElement("option", {
      value: "custom"
    }, __('Custom', 'guten-bubble')), wp.element.createElement("option", {
      value: "default/01-rose.png"
    }, __('Rose', 'guten-bubble')), wp.element.createElement("option", {
      value: "default/02-orange.png"
    }, __('Lemon', 'guten-bubble')), wp.element.createElement("option", {
      value: "default/03-lemon.png"
    }, __('Lime', 'guten-bubble')), wp.element.createElement("option", {
      value: "default/04-lime.png"
    }, __('Viridian', 'guten-bubble')), wp.element.createElement("option", {
      value: "default/05-viridian.png"
    }, __('Sky Blue', 'guten-bubble')), wp.element.createElement("option", {
      value: "default/06-sky.png"
    }, __('Imperial Blue', 'guten-bubble')), wp.element.createElement("option", {
      value: "default/07-imperial.png"
    }, __('Lavendar', 'guten-bubble')), wp.element.createElement("option", {
      value: "default/08-lavendar.png"
    }, __('Monotone', 'guten-bubble')), wp.element.createElement("option", {
      value: "default/09-monotone.png"
    }, __('Espresso', 'guten-bubble')), wp.element.createElement("option", {
      value: "default/10-espresso.png"
    }, __('Espresso', 'guten-bubble')))), wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Character icon (custom)', 'guten-bubble')), wp.element.createElement("small", {
      style: {
        display: 'block'
      }
    }, __('Enabled only when "Custom" is selected for the "Character icon (preset)".', 'guten-bubble')), wp.element.createElement("small", {
      style: {
        display: 'block'
      }
    }, __('Specifies a image file in the \'/wp-content/uploads/guten-bubble/img/\' folder.', 'guten-bubble')), wp.element.createElement(TextControl, {
      placeholder: __('Character icon file name', 'guten-bubble'),
      value: charaIconCustom,
      onChange: function onChange(value) {
        return setAttributes({
          charaIconCustom: value
        });
      }
    })), wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Character icon alignment', 'guten-bubble')), wp.element.createElement("select", {
      value: charaAlign,
      onChange: function onChange(event) {
        var _event$target$querySe2 = event.target.querySelector('option:checked'),
            selected = _event$target$querySe2.selected;

        props.setAttributes({
          charaAlign: selected.value
        });
        event.preventDefault();
      }
    }, wp.element.createElement("option", {
      value: "left"
    }, __('Left', 'guten-bubble')), wp.element.createElement("option", {
      value: "right"
    }, __('Right', 'guten-bubble')))), wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Character name', 'guten-bubble')), wp.element.createElement(TextControl, {
      placeholder: __('Character name', 'guten-bubble'),
      value: charaName,
      onChange: function onChange(value) {
        return setAttributes({
          charaName: value
        });
      }
    }))), wp.element.createElement(PanelBody, {
      title: __('Speech bubble settings', 'guten-bubble')
    }, wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Theme color', 'guten-bubble')), wp.element.createElement("select", {
      value: themeColor,
      onChange: function onChange(event) {
        var _event$target$querySe3 = event.target.querySelector('option:checked'),
            selected = _event$target$querySe3.selected;

        props.setAttributes({
          themeColor: selected.value
        });
        event.preventDefault();
      }
    }, wp.element.createElement("option", {
      value: "default"
    }, __('Default', 'guten-bubble')), wp.element.createElement("option", {
      value: "rose"
    }, __('Rose', 'guten-bubble')), wp.element.createElement("option", {
      value: "rose-fill"
    }, __('Rose (fill-color)', 'guten-bubble')), wp.element.createElement("option", {
      value: "orange"
    }, __('Orange', 'guten-bubble')), wp.element.createElement("option", {
      value: "orange-fill"
    }, __('Orange (fill-color)', 'guten-bubble')), wp.element.createElement("option", {
      value: "lemon"
    }, __('Lemon', 'guten-bubble')), wp.element.createElement("option", {
      value: "lemon-fill"
    }, __('Lemon (fill-color)', 'guten-bubble')), wp.element.createElement("option", {
      value: "lime"
    }, __('Lime', 'guten-bubble')), wp.element.createElement("option", {
      value: "lime-fill"
    }, __('Lime (fill-color)', 'guten-bubble')), wp.element.createElement("option", {
      value: "viridian"
    }, __('Viridian', 'guten-bubble')), wp.element.createElement("option", {
      value: "viridian-fill"
    }, __('Viridian (fill-color)', 'guten-bubble')), wp.element.createElement("option", {
      value: "sky"
    }, __('Sky Blue', 'guten-bubble')), wp.element.createElement("option", {
      value: "sky-fill"
    }, __('Sky Blue (fill-color)', 'guten-bubble')), wp.element.createElement("option", {
      value: "imperial"
    }, __('Imperial Blue', 'guten-bubble')), wp.element.createElement("option", {
      value: "imperial-fill"
    }, __('Imperial Blue (fill-color)', 'guten-bubble')), wp.element.createElement("option", {
      value: "lavendar"
    }, __('Lavendar', 'guten-bubble')), wp.element.createElement("option", {
      value: "lavendar-fill"
    }, __('Lavendar (fill-color)', 'guten-bubble')), wp.element.createElement("option", {
      value: "monotone"
    }, __('Monotone', 'guten-bubble')), wp.element.createElement("option", {
      value: "monotone-fill"
    }, __('Monotone (fill-color)', 'guten-bubble')), wp.element.createElement("option", {
      value: "espresso"
    }, __('Espresso', 'guten-bubble')), wp.element.createElement("option", {
      value: "espresso-fill"
    }, __('Espresso (fill-color)', 'guten-bubble')), wp.element.createElement("option", {
      value: "success"
    }, __('Bootstrap like (Success)', 'guten-bubble')), wp.element.createElement("option", {
      value: "info"
    }, __('Bootstrap like (Info)', 'guten-bubble')), wp.element.createElement("option", {
      value: "warning"
    }, __('Bootstrap like (Warning)', 'guten-bubble')), wp.element.createElement("option", {
      value: "danger"
    }, __('Bootstrap like (Danger)', 'guten-bubble')))), wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Speech bubble tail type', 'guten-bubble')), wp.element.createElement("select", {
      value: tailType,
      onChange: function onChange(event) {
        var _event$target$querySe4 = event.target.querySelector('option:checked'),
            selected = _event$target$querySe4.selected;

        props.setAttributes({
          tailType: selected.value
        });
        event.preventDefault();
      }
    }, wp.element.createElement("option", {
      value: "speak"
    }, __('Speaking', 'guten-bubble')), wp.element.createElement("option", {
      value: "think"
    }, __('Thinking', 'guten-bubble')))), wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Speech bubble text font size', 'guten-bubble')), wp.element.createElement(FontSizePicker, {
      value: contentFontSize,
      fallbackFontSize: "12",
      fontSizes: [// 0.625rem
      {
        name: __('Extra Small', 'guten-bubble'),
        slug: 'xsmall',
        size: 10
      }, // 0.75rem
      {
        name: __('Small', 'guten-bubble'),
        slug: 'small',
        size: 12
      }, // 1rem
      {
        name: __('Middle', 'guten-bubble'),
        slug: 'middle',
        size: 16
      }, // 1.5rem
      {
        name: __('Large', 'guten-bubble'),
        slug: 'large',
        size: 24
      }, // 2rem
      {
        name: __('Extra Large', 'guten-bubble'),
        slug: 'xlarge',
        size: 32
      }]
    }))), wp.element.createElement(PanelBody, {
      title: __('Effect settings', 'guten-bubble')
    }, wp.element.createElement("div", null, wp.element.createElement(ToggleControl, {
      label: __('Drop shadow', 'guten-bubble'),
      checked: effectShadow,
      onChange: function onChange(value) {
        return setAttributes({
          effectShadow: value
        });
      }
    })), wp.element.createElement("div", null, wp.element.createElement(ToggleControl, {
      label: __('Icon negation', 'guten-bubble'),
      checked: effectNega,
      onChange: function onChange(value) {
        return setAttributes({
          effectNega: value
        });
      }
    })), wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Character icon corner radius', 'guten-bubble')), wp.element.createElement("select", {
      value: effectCharaRadius,
      onChange: function onChange(event) {
        var _event$target$querySe5 = event.target.querySelector('option:checked'),
            selected = _event$target$querySe5.selected;

        props.setAttributes({
          effectCharaRadius: selected.value
        });
        event.preventDefault();
      }
    }, wp.element.createElement("option", {
      value: "square"
    }, __('Square', 'guten-bubble')), wp.element.createElement("option", {
      value: "corner-r1"
    }, __('Corner radius Lv.1', 'guten-bubble')), wp.element.createElement("option", {
      value: "corner-r2"
    }, __('Corner radius Lv.2', 'guten-bubble')), wp.element.createElement("option", {
      value: "corner-r3"
    }, __('Corner radius Lv.3', 'guten-bubble')), wp.element.createElement("option", {
      value: "corner-r4"
    }, __('Corner radius Lv.4', 'guten-bubble')), wp.element.createElement("option", {
      value: "corner-r5"
    }, __('Corner radius Lv.5', 'guten-bubble')), wp.element.createElement("option", {
      value: "corner-round"
    }, __('Rounded', 'guten-bubble')))), wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Speech bubble corner radius', 'guten-bubble')), wp.element.createElement("select", {
      value: effectBubbleRadius,
      onChange: function onChange(event) {
        var _event$target$querySe6 = event.target.querySelector('option:checked'),
            selected = _event$target$querySe6.selected;

        props.setAttributes({
          effectBubbleRadius: selected.value
        });
        event.preventDefault();
      }
    }, wp.element.createElement("option", {
      value: "square"
    }, __('Square', 'guten-bubble')), wp.element.createElement("option", {
      value: "corner-r1"
    }, __('Corner radius Lv.1', 'guten-bubble')), wp.element.createElement("option", {
      value: "corner-r2"
    }, __('Corner radius Lv.2', 'guten-bubble')), wp.element.createElement("option", {
      value: "corner-r3"
    }, __('Corner radius Lv.3', 'guten-bubble')), wp.element.createElement("option", {
      value: "corner-r4"
    }, __('Corner radius Lv.4', 'guten-bubble')), wp.element.createElement("option", {
      value: "corner-r5"
    }, __('Corner radius Lv.5', 'guten-bubble'))))), wp.element.createElement(PanelBody, {
      title: __('Animation', 'guten-bubble')
    }, wp.element.createElement("div", null, wp.element.createElement("select", {
      value: animation,
      onChange: function onChange(event) {
        var _event$target$querySe7 = event.target.querySelector('option:checked'),
            selected = _event$target$querySe7.selected;

        props.setAttributes({
          animation: selected.value
        });
        event.preventDefault();
      }
    }, wp.element.createElement("option", {
      value: "none"
    }, __('None', 'guten-bubble')), wp.element.createElement("option", {
      value: "spin"
    }, __('Spin', 'guten-bubble')), wp.element.createElement("option", {
      value: "spin-rev"
    }, __('Spin (Reverse)', 'guten-bubble')), wp.element.createElement("option", {
      value: "pendulum"
    }, __('Pendulum', 'guten-bubble')), wp.element.createElement("option", {
      value: "snake"
    }, __('Snake', 'guten-bubble')), wp.element.createElement("option", {
      value: "bound"
    }, __('Bound', 'guten-bubble'))))))];
  },
  save: function save(props) {
    var _props$attributes2 = props.attributes,
        charaIconPreset = _props$attributes2.charaIconPreset,
        charaIconCustom = _props$attributes2.charaIconCustom,
        charaName = _props$attributes2.charaName,
        contentText = _props$attributes2.contentText,
        themeColor = _props$attributes2.themeColor,
        charaAlign = _props$attributes2.charaAlign,
        tailType = _props$attributes2.tailType,
        contentFontSize = _props$attributes2.contentFontSize,
        effectShadow = _props$attributes2.effectShadow,
        effectNega = _props$attributes2.effectNega,
        effectCharaRadius = _props$attributes2.effectCharaRadius,
        effectBubbleRadius = _props$attributes2.effectBubbleRadius,
        animation = _props$attributes2.animation;
    return renderGutenBubble(contentText, {
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
    });
  }
});

/***/ })

/******/ });