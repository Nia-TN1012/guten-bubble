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

var presetCharaIcons = __webpack_require__(/*! ./json/preset-chara-icons.json */ "./js/json/preset-chara-icons.json");

var presetThemeColors = __webpack_require__(/*! ./json/preset-theme-colors.json */ "./js/json/preset-theme-colors.json");

var presetAnimations = __webpack_require__(/*! ./json/preset-animations.json */ "./js/json/preset-animations.json");

var presetCornerRadius = __webpack_require__(/*! ./json/preset-corner-radius.json */ "./js/json/preset-corner-radius.json");

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
    className: charaIconClass.join(' '),
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
    chara_icon_preset: {
      type: 'string',
      default: 'custom'
    },
    chara_icon_custom: {
      type: 'string',
      source: 'attribute',
      attribute: 'alt',
      selector: 'img',
      default: 'default/01-rose.png'
    },
    chara_name: {
      type: 'array',
      source: 'children',
      selector: '.chara-name'
    },
    content: {
      type: 'array',
      source: 'children',
      selector: '.content'
    },
    theme_color: {
      type: 'string',
      source: 'attribute',
      attribute: 'data-theme-color',
      selector: 'div',
      default: 'default'
    },
    chara_align: {
      type: 'string',
      source: 'attribute',
      attribute: 'data-chara-align',
      selector: 'div',
      default: 'left'
    },
    tail_type: {
      type: 'string',
      source: 'attribute',
      attribute: 'data-tail',
      selector: 'div',
      default: 'speak'
    },
    content_fontsize: {
      type: 'number',
      default: undefined
    },
    effect_shadow: {
      type: 'bool',
      default: true
    },
    effect_nega: {
      type: 'bool',
      default: false
    },
    effect_chara_radius: {
      type: 'string',
      default: 'square'
    },
    effect_bubble_radius: {
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
        chara_icon_preset = _props$attributes.chara_icon_preset,
        chara_icon_custom = _props$attributes.chara_icon_custom,
        chara_name = _props$attributes.chara_name,
        content = _props$attributes.content,
        theme_color = _props$attributes.theme_color,
        chara_align = _props$attributes.chara_align,
        tail_type = _props$attributes.tail_type,
        content_fontsize = _props$attributes.content_fontsize,
        effect_shadow = _props$attributes.effect_shadow,
        effect_nega = _props$attributes.effect_nega,
        effect_chara_radius = _props$attributes.effect_chara_radius,
        effect_bubble_radius = _props$attributes.effect_bubble_radius,
        animation = _props$attributes.animation,
        setAttributes = props.setAttributes;
    return [renderGutenBubble(wp.element.createElement(RichText, {
      tagName: "p",
      placeholder: __('Enter serif here ...', 'guten-bubble'),
      value: content,
      keepPlaceholderOnFocus: true,
      style: {
        fontSize: content_fontsize + 'px'
      },
      onChange: function onChange(value) {
        setAttributes({
          content: value
        });
      }
    }), {
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
    }), wp.element.createElement(InspectorControls, {
      className: className
    }, wp.element.createElement(PanelBody, {
      title: __('Character icon settings', 'guten-bubble')
    }, wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Character icon (preset)', 'guten-bubble')), wp.element.createElement("select", {
      value: chara_icon_preset,
      onChange: function onChange(event) {
        props.setAttributes({
          chara_icon_preset: event.target.value
        });
        event.preventDefault();
      }
    }, presetCharaIcons.map(function (element) {
      return wp.element.createElement("option", {
        value: element.value
      }, __(element.label, 'guten-bubble'));
    }))), wp.element.createElement("div", null, wp.element.createElement("label", {
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
      value: chara_icon_custom,
      onChange: function onChange(value) {
        return setAttributes({
          chara_icon_custom: value
        });
      }
    })), wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Character icon alignment', 'guten-bubble')), wp.element.createElement("select", {
      value: chara_align,
      onChange: function onChange(event) {
        props.setAttributes({
          chara_align: event.target.value
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
      value: chara_name,
      onChange: function onChange(value) {
        return setAttributes({
          chara_name: value
        });
      }
    }))), wp.element.createElement(PanelBody, {
      title: __('Speech bubble settings', 'guten-bubble')
    }, wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Theme color', 'guten-bubble')), wp.element.createElement("select", {
      value: theme_color,
      onChange: function onChange(event) {
        props.setAttributes({
          theme_color: event.target.value
        });
        event.preventDefault();
      }
    }, presetThemeColors.map(function (element) {
      return wp.element.createElement("option", {
        value: element.value
      }, __(element.label, 'guten-bubble'));
    }))), wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Speech bubble tail type', 'guten-bubble')), wp.element.createElement("select", {
      value: tail_type,
      onChange: function onChange(event) {
        props.setAttributes({
          tail_type: event.target.value
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
      value: content_fontsize,
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
      }],
      onChange: function onChange(value) {
        return setAttributes({
          content_fontsize: value
        });
      }
    }))), wp.element.createElement(PanelBody, {
      title: __('Effect settings', 'guten-bubble')
    }, wp.element.createElement("div", null, wp.element.createElement(ToggleControl, {
      label: __('Drop shadow', 'guten-bubble'),
      checked: effect_shadow,
      onChange: function onChange(value) {
        return setAttributes({
          effect_shadow: value
        });
      }
    })), wp.element.createElement("div", null, wp.element.createElement(ToggleControl, {
      label: __('Icon negation', 'guten-bubble'),
      checked: effect_nega,
      onChange: function onChange(value) {
        return setAttributes({
          effect_nega: value
        });
      }
    })), wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Character icon corner radius', 'guten-bubble')), wp.element.createElement("select", {
      value: effect_chara_radius,
      onChange: function onChange(event) {
        props.setAttributes({
          effect_chara_radius: event.target.value
        });
        event.preventDefault();
      }
    }, presetCornerRadius.chara.map(function (element) {
      return wp.element.createElement("option", {
        value: element.value
      }, __(element.label, 'guten-bubble'));
    }))), wp.element.createElement("div", null, wp.element.createElement("label", {
      style: {
        display: 'block'
      }
    }, __('Speech bubble corner radius', 'guten-bubble')), wp.element.createElement("select", {
      value: effect_bubble_radius,
      onChange: function onChange(event) {
        props.setAttributes({
          effect_bubble_radius: event.target.value
        });
        event.preventDefault();
      }
    }, presetCornerRadius.bubble.map(function (element) {
      return wp.element.createElement("option", {
        value: element.value
      }, __(element.label, 'guten-bubble'));
    })))), wp.element.createElement(PanelBody, {
      title: __('Animation', 'guten-bubble')
    }, wp.element.createElement("div", null, wp.element.createElement("select", {
      value: animation,
      onChange: function onChange(event) {
        props.setAttributes({
          animation: event.target.value
        });
        event.preventDefault();
      }
    }, presetAnimations.map(function (element) {
      return wp.element.createElement("option", {
        value: element.value
      }, __(element.label, 'guten-bubble'));
    })))))];
  },
  save: function save(props) {
    var _props$attributes2 = props.attributes,
        chara_icon_preset = _props$attributes2.chara_icon_preset,
        chara_icon_custom = _props$attributes2.chara_icon_custom,
        chara_name = _props$attributes2.chara_name,
        content = _props$attributes2.content,
        theme_color = _props$attributes2.theme_color,
        chara_align = _props$attributes2.chara_align,
        tail_type = _props$attributes2.tail_type,
        contentFontSize = _props$attributes2.contentFontSize,
        effect_shadow = _props$attributes2.effect_shadow,
        effect_nega = _props$attributes2.effect_nega,
        effect_chara_radius = _props$attributes2.effect_chara_radius,
        effect_bubble_radius = _props$attributes2.effect_bubble_radius,
        animation = _props$attributes2.animation;
    return renderGutenBubble(content, {
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
    });
  }
});

/***/ }),

/***/ "./js/json/preset-animations.json":
/*!****************************************!*\
  !*** ./js/json/preset-animations.json ***!
  \****************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, default */
/***/ (function(module) {

module.exports = [{"value":"none","label":"None"},{"value":"spin","label":"Spin"},{"value":"spin-rev","label":"Spin (Reverse)"},{"value":"pendulum","label":"Pendulum"},{"value":"snake","label":"Snake"},{"value":"bound","label":"Bound"}];

/***/ }),

/***/ "./js/json/preset-chara-icons.json":
/*!*****************************************!*\
  !*** ./js/json/preset-chara-icons.json ***!
  \*****************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, default */
/***/ (function(module) {

module.exports = [{"value":"custom","label":"Custom"},{"value":"default/01-rose.png","label":"Rose"},{"value":"default/02-orange.png","label":"Orange"},{"value":"default/03-lemon.png","label":"Lemon"},{"value":"default/04-lime.png","label":"Lime"},{"value":"default/05-viridian.png","label":"Viridian"},{"value":"default/06-sky.png","label":"Sky Blue"},{"value":"default/07-imperial.png","label":"Imperial Blue"},{"value":"default/08-lavendar.png","label":"Lavendar"},{"value":"default/09-monotone.png","label":"Monotone"},{"value":"default/10-espresso.png","label":"Espresso"}];

/***/ }),

/***/ "./js/json/preset-corner-radius.json":
/*!*******************************************!*\
  !*** ./js/json/preset-corner-radius.json ***!
  \*******************************************/
/*! exports provided: chara, bubble, default */
/***/ (function(module) {

module.exports = {"chara":[{"value":"square","label":"Square"},{"value":"corner-r1","label":"Corner radius Lv.1"},{"value":"corner-r2","label":"Corner radius Lv.2"},{"value":"corner-r3","label":"Corner radius Lv.3"},{"value":"corner-r4","label":"Corner radius Lv.4"},{"value":"corner-r5","label":"Corner radius Lv.5"},{"value":"corner-round","label":"Rounded"}],"bubble":[{"value":"square","label":"Square"},{"value":"corner-r1","label":"Corner radius Lv.1"},{"value":"corner-r2","label":"Corner radius Lv.2"},{"value":"corner-r3","label":"Corner radius Lv.3"},{"value":"corner-r4","label":"Corner radius Lv.4"},{"value":"corner-r5","label":"Corner radius Lv.5"}]};

/***/ }),

/***/ "./js/json/preset-theme-colors.json":
/*!******************************************!*\
  !*** ./js/json/preset-theme-colors.json ***!
  \******************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, default */
/***/ (function(module) {

module.exports = [{"value":"default","label":"Default"},{"value":"rose","label":"Rose"},{"value":"rose-fill","label":"Rose (fill-color)"},{"value":"orange","label":"Orange"},{"value":"orange-fill","label":"Orange (fill-color)"},{"value":"lemon","label":"Lemon"},{"value":"lemon-fill","label":"Lemon (fill-color)"},{"value":"lime","label":"Lime"},{"value":"lime-fill","label":"Lime (fill-color)"},{"value":"viridian","label":"Viridian"},{"value":"viridian-fill","label":"Viridian (fill-color)"},{"value":"sky","label":"Sky Blue"},{"value":"sky-fill","label":"Sky Blue (fill-color)"},{"value":"imperial","label":"Imperial Blue"},{"value":"imperial-fill","label":"Imperial Blue (fill-color)"},{"value":"lavendar","label":"Lavendar"},{"value":"lavendar-fill","label":"Lavendar (fill-color)"},{"value":"monotone","label":"Monotone"},{"value":"monotone-fill","label":"Monotone (fill-color)"},{"value":"espresso","label":"Espresso"},{"value":"espresso-fill","label":"Espresso (fill-color)"},{"value":"success","label":"Bootstrap like (Success)"},{"value":"info","label":"Bootstrap like (Info)"},{"value":"warning","label":"Bootstrap like (Warning)"},{"value":"danger","label":"Bootstrap like (Danger)"}];

/***/ })

/******/ });