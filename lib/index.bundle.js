(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("preact"));
	else if(typeof define === 'function' && define.amd)
		define(["preact"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("preact")) : factory(root["preact"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = __webpack_require__(0);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description preact-scroll-container
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// 滚动速度基准值
var SPEED = 1000;

var ScrollContainer = function (_Component) {
	_inherits(ScrollContainer, _Component);

	function ScrollContainer(props) {
		_classCallCheck(this, ScrollContainer);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.handleTouchEnd = _this.handleTouchEnd.bind(_this);

		// x 标记
		_this.startX = 0; // 点击时 x 位置
		_this.endX = 0; // x 结束位置
		_this.diffX = 0; // x 变化量

		// 时间标记
		_this.startTimer = 0; // 记录刚开始点击的时候
		_this.endTimer = 0; // 结束时间
		_this.diffTimer = 0; // 时间变化量

		// 是否开启到边界回弹效果
		_this.soft = _this.props.soft || false;

		// 是否能移动
		_this.moving = true;

		// 容器元素
		_this.DOM = null;

		// 当前显示多少页码 从0开始
		_this.currentPage = +_this.props.currentPage || 0;
		_this.totalPage = +_this.props.totalPage || 0;

		_this.currentTransform = _this.currentPage * document.body.clientWidth * -1; // 当前偏移量
		return _this;
	}

	ScrollContainer.prototype.componentDidMount = function componentDidMount() {
		this.updateTransform();
	};

	/**
  * @description 更新定位
  */


	ScrollContainer.prototype.updateTransform = function updateTransform() {
		// 第一个元素为滚动元素
		var dom = this.DOM.children[0];

		this.setTransition(dom, 0).setTransform(dom, this.currentTransform);
	};

	ScrollContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
		var currentPage = props.currentPage,
		    totalPage = props.totalPage;

		var isChange = false;

		if (currentPage != this.props.currentPage) {
			isChange = true;

			this.currentPage = currentPage;
			this.currentTransform = this.currentPage * document.body.clientWidth * -1; // 当前偏移量
		}

		if (totalPage != this.props.totalPage) {
			isChange = true;

			this.totalPage = totalPage;
		}

		if (isChange) {
			this.updateTransform();
		}
	};

	ScrollContainer.prototype.handleTouchStart = function handleTouchStart(ev) {
		var dom = ev.currentTarget.children[0];

		this.startX = ev.changedTouches[0].pageX;
		this.diffX = 0;

		this.startTimer = Date.now();
		this.diffTimer = 0;

		// 关闭 动画效果
		this.setTransition(dom, 0);
	};

	ScrollContainer.prototype.handleTouchMove = function handleTouchMove(ev) {
		// 认定容器第一个元素为滚动元素
		var dom = ev.currentTarget.children[0];

		this.endX = ev.changedTouches[0].pageX;
		this.diffX = this.endX - this.startX;

		// 当处于第一页往右滑动或者最后一页往左滑动时
		if (this.currentPage == 0 && this.diffX > 0 || this.currentPage == this.totalPage - 1 && this.diffX < 0) {
			this.diffX = this.diffX / 2;
			// 不可移动
			this.moving = false;
		} else {
			// 标记可移动
			this.moving = true;
			// 阻止冒泡
			ev.stopPropagation();
		}

		// 如果能移动 或则 允许弹性效果
		if (this.moving || this.soft) {
			this.setTransform(dom, this.diffX + this.currentTransform);
		}

		// 阻止默认行为
		ev.preventDefault();
		return false;
	};

	ScrollContainer.prototype.handleTouchEnd = function handleTouchEnd(ev) {
		if (this.moving) {
			ev.stopPropagation();
		}

		if (this.moving || this.soft) {
			var dom = ev.currentTarget.children[0];
			var halfScreen = document.body.clientWidth / 2;

			this.endX = ev.changedTouches[0].pageX;
			this.diffX = this.endX - this.startX;

			this.endTimer = Date.now();
			this.diffTimer = this.endTimer - this.startTimer;

			// 偏移量大于10才进行切换
			if (Math.abs(this.diffX) > 10) {
				if (this.diffTimer > 5000) {
					if (this.diffX < -1 * halfScreen) {
						this.currentPage = this.currentPage - 1 < 0 ? 0 : this.currentPage - 1;
					} else if (this.diffX > halfScreen) {
						this.currentPage = this.currentPage + 1 >= this.totalPage ? this.totalPage - 1 : this.currentPage + 1;
					}
				} else {
					if (this.diffX / this.diffTimer > 0.1) {
						this.currentPage = this.currentPage - 1 < 0 ? 0 : this.currentPage - 1;
					} else if (this.diffX / this.diffTimer < -0.1) {
						this.currentPage = this.currentPage + 1 >= this.totalPage ? this.totalPage - 1 : this.currentPage + 1;
					}
				}

				this.slider(this.currentPage, this.diffX / this.diffTimer, dom);
			}
		}
	};

	ScrollContainer.prototype.slider = function slider(num, diff, dom) {
		// 速度计算
		var tempSpeed = Math.abs(Math.abs(parseInt(SPEED * diff)) - .5);

		tempSpeed = tempSpeed > 300 ? 300 : tempSpeed;

		// 位置计算
		var finalX = num * document.body.clientWidth * -1;

		if (finalX !== this.currentTransform) {
			this.props.onChange && this.props.onChange(this.currentPage);
		}

		this.setTransition(dom, tempSpeed) // 滚动动画控制
		.setTransform(dom, finalX); // 滚动偏移量控制

		// 缓存偏移
		this.currentTransform = finalX;
	};

	ScrollContainer.prototype.setTransition = function setTransition(dom, speed) {
		dom.style.webkitTransition = "-webkit-transform " + speed + "ms ease-in";
		dom.style.transition = "transform " + speed + "ms ease-in";

		return this;
	};

	ScrollContainer.prototype.setTransform = function setTransform(dom, distance) {
		dom.style.webkitTransform = "translate3D(" + distance + "px,0,0)";
		dom.style.transform = "translate3D(" + distance + "px,0,0)";

		return this;
	};

	ScrollContainer.prototype.render = function render(_ref, state) {
		var _this2 = this;

		var children = _ref.children,
		    props = _objectWithoutProperties(_ref, ["children"]);

		return (0, _preact.h)(
			"div",
			_extends({}, props, {
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEnd,
				ref: function ref(_ref2) {
					_this2.DOM = _ref2;
				} }),
			children
		);
	};

	return ScrollContainer;
}(_preact.Component);

exports.default = ScrollContainer;

/***/ })
/******/ ]);
});