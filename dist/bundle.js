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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class EventManager {
    constructor() {
        this.ons = [];
        this.onlys = [];
        this.onlysEventRemoved = [];
        this.eventList = [];
    }
    getEventCode(eventName) {
        let eventCode = this.eventList.indexOf(eventName);
        if (eventCode === -1) {
            this.eventList.push(eventName);
            return this.eventList.length - 1;
        }
        else {
            return eventCode;
        }
    }
    on(eventName, eventHandler) {
        const eventCode = this.getEventCode(eventName);
        if (this.ons[eventCode] === undefined) {
            this.ons[eventCode] = [];
        }
        this.ons[eventCode].push(eventHandler);
    }
    only(eventName, eventHandler, eventRemoveHandler) {
        // only one event can be triggered
        // later-registered event will replace the early one
        const eventCode = this.getEventCode(eventName);
        this.onlys[eventCode] = eventHandler;
        if (this.onlysEventRemoved[eventCode]) {
            this.onlysEventRemoved[eventCode].call(null);
        }
        this.onlysEventRemoved[eventCode] = eventRemoveHandler;
    }
    hasOnly(eventName) {
        const eventCode = this.getEventCode(eventName);
        return typeof this.onlys[eventCode] === 'function';
    }
    trigger(eventName, ...args) {
        let eventsInvolved = 0;
        const eventCode = this.getEventCode(eventName);
        if (this.ons[eventCode]) {
            for (const eventFunction of this.ons[eventCode]) {
                eventFunction.call(null, ...args);
            }
            eventsInvolved += this.ons[eventCode].length;
        }
        if (this.onlys[eventCode]) {
            this.onlys[eventCode].call(null, ...args);
            eventsInvolved += 1;
        }
        // console.log(`Trigger event ${eventName} with ${args}, ${this.ons[eventCode].length} handler(s) involved.`);
        return eventsInvolved;
    }
    removeOn(eventName, eventHandler) {
        // return the number of eventHandler functions removed
        const eventCode = this.getEventCode(eventName);
        if (this.ons[eventCode] === undefined || this.ons[eventCode].length === 0) {
            return 0;
        }
        const oldLength = this.ons[eventCode].length;
        this.ons[eventCode] = this.ons[eventCode].filter(func => func !== eventHandler);
        const newLength = this.ons[eventCode].length;
        return oldLength - newLength;
    }
    removeOnly(eventName) {
        const eventCode = this.getEventCode(eventName);
        this.onlys[eventCode] = null;
        if (this.onlysEventRemoved[eventCode]) {
            this.onlysEventRemoved[eventCode].call(null);
            this.onlysEventRemoved[eventCode] = null;
        }
    }
}
const eventManager = new EventManager;
exports.default = eventManager;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Matrix2D {
    // Transformation:
    // 
    //     a  c  e       x          ax + cy + e
    //   ( b  d  f ) * ( y )  =>  ( bx + dy + f )
    //     0  0  1       1               1
    // 
    // 
    constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
    }
    static parse(str) {
        if (str.length === 0) {
            return new Matrix2D();
        }
        const l = str.indexOf('(');
        const r = str.indexOf(')');
        if (l === -1 || r === -1) {
            throw new Error('matrix string parsing error: can\'t find bracket.\n' + str);
        }
        const s = str.slice(l + 1, r);
        const args = s.split(',').map(v => parseFloat(v));
        if (args.length !== 6) {
            throw new Error('matrix string parsing error: expect 6 elements.\n' + s);
        }
        return new Matrix2D(...args);
    }
    static translate(x = 0, y = 0) {
        return new Matrix2D(1, 0, 0, 1, x, y);
    }
    static scale(x = 1, y = x) {
        return new Matrix2D(x, 0, 0, y, 0, 0);
    }
    translate(x = 0, y = 0) {
        // mutate
        return this.leftMultiply(Matrix2D.translate(x, y));
    }
    translated(x = 0, y = 0) {
        // not mutate
        return this.leftMultiplied(Matrix2D.translate(x, y));
    }
    scale(x = 1, y = x) {
        return this.leftMultiply(Matrix2D.scale(x, y));
    }
    leftMultiplied(mat) {
        // not mutate
        return new Matrix2D(mat.a * this.a + mat.c * this.b, mat.b * this.a + mat.d * this.b, mat.a * this.c + mat.c * this.d, mat.b * this.c + mat.d * this.d, mat.a * this.e + mat.c * this.f + mat.e, mat.b * this.e + mat.d * this.f + mat.f);
    }
    leftMultiply(mat) {
        // mutate
        [this.a, this.b, this.c, this.d, this.e, this.f] = [
            mat.a * this.a + mat.c * this.b,
            mat.b * this.a + mat.d * this.b,
            mat.a * this.c + mat.c * this.d,
            mat.b * this.c + mat.d * this.d,
            mat.a * this.e + mat.c * this.f + mat.e,
            mat.b * this.e + mat.d * this.f + mat.f
        ];
        return this;
    }
    toString() {
        return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`;
    }
}
exports.default = Matrix2D;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const Matrix2D_1 = __webpack_require__(2);
const eventManager_1 = __webpack_require__(1);
class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.mouseStartX = 0;
        this.mouseStartY = 0;
        this.state = {
            transform: props.transform ? props.transform : new Matrix2D_1.default(),
            tempTransform: null,
        };
    }
    mouseDownHandler(event) {
        if (event.button !== 0) {
            return;
        }
        this.mouseStartX = event.clientX;
        this.mouseStartY = event.clientY;
        eventManager_1.default.only('dragElement', (event) => this.mouseMoveHandler(event), () => {
            if (this.state.tempTransform) {
                this.setState({
                    transform: this.state.tempTransform,
                    tempTransform: null,
                });
            }
        });
    }
    mouseMoveHandler(event) {
        this.setState({
            tempTransform: this.state.transform.translated(event.clientX - this.mouseStartX, event.clientY - this.mouseStartY),
        });
    }
    render() {
        return (React.createElement("g", { style: { cursor: "move" }, transform: this.state.tempTransform ?
                this.state.tempTransform.toString() :
                this.state.transform.toString(), onMouseDown: (event) => this.mouseDownHandler(event) }, this.props.children));
    }
}
exports.default = Draggable;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const eventManager_1 = __webpack_require__(1);
class FunctionComponent extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            frame: 0,
        };
        eventManager_1.default.on(this.props.triggeredEvent, () => {
            this.setState({
                frame: this.state.frame + 1,
            });
        });
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return this.props.calcComponent(this.state.frame);
    }
}
exports.default = FunctionComponent;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const eventManager_1 = __webpack_require__(1);
class StopMotion extends React.Component {
    constructor(props) {
        super(props);
        this.frameCount = 0;
        // with loopFrame set
        // frameCount goes in (-Inf, loopFrame)
        // frameSeries[i] < 0 means the ith frame will only be drawn once
        // props.frame should be set negative if above effect is required
        this._isMounted = false;
        if (props.frameSeries.length !== props.children.length) {
            throw new Error('StopMotion Error: the length of frameSeries and the number of children must be same.\n');
        }
        let firstFrame = this.props.startFrame | 0;
        while (this.props.loopFrame && firstFrame >= this.props.loopFrame) {
            firstFrame -= this.props.loopFrame;
        }
        this.state = {
            frame: firstFrame,
        };
        eventManager_1.default.on(this.props.triggeredEvent, () => {
            if (this._isMounted) {
                this.frameCount++;
                if (this.props.loopFrame && this.frameCount >= this.props.loopFrame) {
                    this.frameCount -= this.props.loopFrame;
                }
                this.setState({
                    frame: this.frameCount,
                });
            }
        });
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const l = this.props.frameSeries.length;
        for (let i = 1; i < l; i++) {
            if (this.state.frame < this.props.frameSeries[i]) {
                return this.props.children[i - 1];
            }
        }
        return this.props.children[l - 1];
    }
}
exports.default = StopMotion;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const getSvgComponent_1 = __webpack_require__(9);
class SvgFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: 0,
            children: null,
        };
        getSvgComponent_1.default(props.svgUrl).then(res => this.setState({
            children: res,
        }));
    }
    componentWillReceiveProps(newProps) {
        if (newProps.svgUrl !== this.props.svgUrl) {
            getSvgComponent_1.default(newProps.svgUrl).then(res => this.setState({
                children: res,
            }));
        }
    }
    render() {
        const props = {};
        if (this.props.transform) {
            props.transform = this.props.transform.toString();
        }
        if (this.props.style) {
            props.style = this.props.style;
        }
        if (this.state.children) {
            return (React.createElement("g", Object.assign({}, props), this.state.children));
        }
        else {
            return null;
        }
    }
}
exports.default = SvgFile;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SoundsManager {
    constructor() {
        // soundsCount = 0;
        this.soundsList = [{
                name: '30',
                node: new Audio('../sounds/30.mp3'),
            }, {
                name: '17',
                node: new Audio('../sounds/17.mp3'),
            }, {
                name: '22',
                node: new Audio('../sounds/22.mp3'),
            }];
    }
    play(nameOrIndex) {
        if (typeof nameOrIndex === 'number') {
            this.soundsList[nameOrIndex].node.currentTime = 0;
            this.soundsList[nameOrIndex].node.play();
            return;
        }
        for (const sound of this.soundsList) {
            if (sound.name === name) {
                sound.node.currentTime = 0;
                sound.node.play();
                return;
            }
        }
    }
}
const soundsManager = new SoundsManager();
exports.default = soundsManager;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
function parseSvg(svgContent) {
    function svgToComponent(dom) {
        const props = {};
        for (let attr of Array.from(dom.attributes)) {
            let newAttr;
            // react-dom.development.js:894 
            // Warning: Invalid DOM property `fill-rule`. Did you mean `fillRule`?
            // Maybe it's a bug
            // update: not a bug, a react element is not a html element
            if (attr.nodeName.includes('-')) {
                // convert '-' to lower camel case
                const nameParts = attr.nodeName.split('-');
                newAttr = nameParts.map((namePart, i) => {
                    if (i === 0) {
                        return namePart;
                    }
                    else {
                        return Array.prototype.map.call(namePart, (letter, i) => {
                            if (i === 0) {
                                return letter.toUpperCase();
                            }
                            else {
                                return letter;
                            }
                        }).join('');
                    }
                }).join('');
            }
            else {
                newAttr = attr.nodeName;
            }
            props[newAttr] = attr.nodeValue;
        }
        const children = [];
        for (const child of Array.from(dom.children)) {
            children.push(svgToComponent(child));
        }
        const newComponent = React.createElement(dom.nodeName, props, ...children);
        return newComponent;
    }
    const domParser = new DOMParser();
    const parsedDom = domParser.parseFromString(svgContent, 'image/svg+xml');
    const svgDom = parsedDom.children[0];
    if (svgDom && svgDom.nodeName === 'svg') {
        if (svgDom.childElementCount === 0) {
            return [];
        }
        else {
            return Array.from(svgDom.children, child => svgToComponent(child));
        }
    }
    else {
        throw new Error(`parse svg error, "svg" element expected, ${svgDom ? svgDom.nodeName : 'empty element'} instead.`);
    }
}
function fetchText(url) {
    return fetch(url).then(res => res.text());
}
const cache = new Map();
function fetchSvgToElement(url) {
    if (cache.has(url)) {
        return Promise.resolve(cache.get(url));
    }
    else {
        return fetchText(url).then(res => {
            cache.set(url, parseSvg(res));
            return cache.get(url);
        });
    }
}
exports.default = fetchSvgToElement;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ReactDOM = __webpack_require__(8);
const StopMotion_1 = __webpack_require__(5);
const SvgFile_1 = __webpack_require__(6);
const Draggable_1 = __webpack_require__(3);
const FunctionComponent_1 = __webpack_require__(4);
const Matrix2D_1 = __webpack_require__(2);
const eventManager_1 = __webpack_require__(1);
const soundManager_1 = __webpack_require__(7);
function linearP(curve, x) {
    const l = curve.length;
    for (let i = 0; i < l - 1; i++) {
        if (curve[i].x < curve[i + 1].x) {
            // pass
        }
        else {
            curve.sort((a, b) => b.x - a.x);
            break;
        }
    }
    for (let i = 0; i < l - 1; i++) {
        if (curve[i].x <= x && x <= curve[i + 1].x) {
            return (curve[i + 1].y - curve[i].y) / (curve[i + 1].x - curve[i].x) * (x - curve[i].x) + curve[i].y;
        }
    }
    throw new Error('x not in curve range');
}
let scale = 1.3;
const w = 629;
const h = 449;
class SvgRoot extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props.children);
    }
    mouseDownHandler(event) {
    }
    mouseMoveHandler(event) {
        eventManager_1.default.trigger('dragElement', event);
    }
    mouseUpOrLeaveHandler(event) {
        eventManager_1.default.removeOnly('dragElement');
    }
    render() {
        const s = this.props.scale | 1;
        const w = this.props.width;
        const h = this.props.height;
        return (React.createElement("svg", { width: w * s, height: h * s, 
            // Drag elements related events
            onMouseMove: (event) => this.mouseMoveHandler(event), onMouseUp: (event) => this.mouseUpOrLeaveHandler(event), onMouseLeave: (event) => this.mouseUpOrLeaveHandler(event) },
            React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.scale(s) }, this.props.children)));
    }
}
ReactDOM.render(React.createElement(SvgRoot, { width: w, height: h },
    React.createElement(SvgFile_1.default, { svgUrl: "./shapes/1.svg" }),
    React.createElement(SvgFile_1.default, { svgUrl: "./shapes/2.svg", transform: Matrix2D_1.default.translate(448) }),
    React.createElement(Draggable_1.default, null,
        React.createElement(StopMotion_1.default, { frameSeries: [0, 21, 22, 23, 24, 25, 26, 27, 28, 29], loopFrame: 200, triggeredEvent: "newFrame" },
            null,
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/5.svg", transform: Matrix2D_1.default.translate(590, 61) }),
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/6.svg", transform: Matrix2D_1.default.translate(571, 37) }),
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/5.svg", transform: Matrix2D_1.default.translate(551, 43) }),
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/6.svg", transform: Matrix2D_1.default.translate(536, 33) }),
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/5.svg", transform: Matrix2D_1.default.translate(516, 35) }),
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/6.svg", transform: Matrix2D_1.default.translate(499, 25) }),
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/5.svg", transform: Matrix2D_1.default.translate(478, 20) }),
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/6.svg", transform: Matrix2D_1.default.translate(458, 11) }),
            null)),
    React.createElement(SvgFile_1.default, { svgUrl: "./shapes/8.svg", transform: Matrix2D_1.default.translate(440, 1) }),
    React.createElement(SvgFile_1.default, { style: { opacity: 0.9 }, svgUrl: "./shapes/9.svg", transform: Matrix2D_1.default.translate(420) }),
    React.createElement(SvgFile_1.default, { transform: Matrix2D_1.default.translate(420, 93), svgUrl: "./shapes/10.svg" }),
    React.createElement(SvgFile_1.default, { transform: Matrix2D_1.default.translate(442, 43), svgUrl: "./shapes/98.svg" }),
    React.createElement(SvgFile_1.default, { transform: Matrix2D_1.default.translate(200, -1), svgUrl: "./shapes/102.svg" }),
    React.createElement("g", { transform: Matrix2D_1.default.translate(203, 177).toString(), onClick: () => eventManager_1.default.trigger('clickPusheen'), style: { cursor: "pointer" } },
        React.createElement(StopMotion_1.default, { frameSeries: [0, 1, 2], loopFrame: 3, triggeredEvent: "clickPusheen" },
            React.createElement(StopMotion_1.default, { frameSeries: [-2, -1, 0, 1], loopFrame: 2, startFrame: -2, triggeredEvent: "newFrame", key: "face_1" },
                React.createElement(SvgFile_1.default, { svgUrl: "./shapes/11.svg" }),
                React.createElement(SvgFile_1.default, { svgUrl: "./shapes/12.svg" }),
                React.createElement(SvgFile_1.default, { svgUrl: "./shapes/13.svg" }),
                React.createElement(SvgFile_1.default, { svgUrl: "./shapes/14.svg" })),
            React.createElement(StopMotion_1.default, { frameSeries: [0, 1], loopFrame: 2, triggeredEvent: "newFrame", key: "face_2" },
                React.createElement(SvgFile_1.default, { svgUrl: "./shapes/19.svg" }),
                React.createElement(SvgFile_1.default, { svgUrl: "./shapes/20.svg" })),
            React.createElement(StopMotion_1.default, { frameSeries: [-2, -1, 0, 1], loopFrame: 2, startFrame: -2, triggeredEvent: "newFrame", key: "face_3" },
                React.createElement(SvgFile_1.default, { svgUrl: "./shapes/24.svg" }),
                React.createElement(SvgFile_1.default, { svgUrl: "./shapes/25.svg" }),
                React.createElement(SvgFile_1.default, { svgUrl: "./shapes/26.svg" }),
                React.createElement(SvgFile_1.default, { svgUrl: "./shapes/27.svg" })))),
    React.createElement(FunctionComponent_1.default, { triggeredEvent: "newFrame", calcComponent: (frame) => {
            const loopFrame = 250;
            while (frame >= loopFrame) {
                frame -= loopFrame;
            }
            const points = [{
                    x: 0, y: 0
                }, {
                    x: 20, y: 0
                }, {
                    x: 40, y: 130
                }, {
                    x: 50, y: 130
                }, {
                    x: 70, y: 0
                }, {
                    x: 250, y: 0
                }];
            const offset = linearP(points, frame);
            return React.createElement(SvgFile_1.default, { svgUrl: "./shapes/129.svg", transform: Matrix2D_1.default.translate(640, 145).translated(-offset) });
        } }),
    React.createElement(FunctionComponent_1.default, { triggeredEvent: "newFrame", calcComponent: (frame) => {
            const loopFrame = 220;
            while (frame >= loopFrame) {
                frame -= loopFrame;
            }
            const points = [{
                    x: 0, y: 0
                }, {
                    x: 10, y: 0
                }, {
                    x: 30, y: 70
                }, {
                    x: 40, y: 70
                }, {
                    x: 60, y: 0
                }, {
                    x: 220, y: 0
                }];
            const offset = linearP(points, frame);
            return React.createElement(SvgFile_1.default, { svgUrl: "./shapes/125.svg", transform: Matrix2D_1.default.translate(90, 450).translated(0, -offset) });
        } }),
    React.createElement(FunctionComponent_1.default, { triggeredEvent: "newFrame", calcComponent: (frame) => {
            const loopFrame = 250;
            while (frame >= loopFrame) {
                frame -= loopFrame;
            }
            const points = [{
                    x: 0, y: 0
                }, {
                    x: 60, y: 0
                }, {
                    x: 90, y: 48
                }, {
                    x: 105, y: 48
                }, {
                    x: 130, y: 0
                }, {
                    x: 250, y: 0
                }];
            const offset = linearP(points, frame);
            return React.createElement(SvgFile_1.default, { svgUrl: "./shapes/127.svg", transform: Matrix2D_1.default.translate(29, 50).translated(0, -offset) });
        } }),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(50, 218) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/33.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(6, 222) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/35.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(16, 230) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/37.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(59, 112) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/39.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(527, 286) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/47.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(0, 175) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/49.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(16, 230) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/51.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(26, 230) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/53.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(35, 158) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/55.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(0, 208) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/57.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(24, 94) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/59.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(10, 100) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/61.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(6, 80) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/63.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(473, 294) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/65.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(8, 89) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/67.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(13, 53) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/69.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(459, 277) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/71.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(510, 272) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/73.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(455, 262) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/75.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(491, 298) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/77.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(448, 298) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/79.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(451, 289) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/81.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(479, 247) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/83.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(472, 282) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/85.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(485, 293) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/87.svg", transform: Matrix2D_1.default.translate(1, 1), style: { opacity: 0.7 } }),
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/88.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(444, 285) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/90.svg", transform: Matrix2D_1.default.translate(2, 2), style: { opacity: 0.7 } }),
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/91.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(450, 288) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/93.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(460, 270) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/95.svg", transform: Matrix2D_1.default.translate(1, 1), style: { opacity: 0.7 } }),
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/96.svg" })),
    React.createElement(SvgFile_1.default, { style: { pointerEvents: 'none' }, svgUrl: "./shapes/99.svg", transform: Matrix2D_1.default.translate(-1, 35) }),
    React.createElement(SvgFile_1.default, { style: { pointerEvents: 'none' }, transform: Matrix2D_1.default.translate(444, 258), svgUrl: "./shapes/101.svg" }),
    React.createElement(SvgFile_1.default, { svgUrl: "./shapes/100.svg", transform: Matrix2D_1.default.translate(70, 51) }),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(-26, 93) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/103.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(27, 111) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/105.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(98, 107) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/110.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(434, 36) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/108.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(582, 36) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/108.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(227, 24) },
        React.createElement(StopMotion_1.default, { frameSeries: [0, 1], loopFrame: 2, triggeredEvent: "newFrame" },
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/113.svg" }),
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/114.svg" }))),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(233, 6) },
        React.createElement(StopMotion_1.default, { frameSeries: [0, 1], loopFrame: 2, triggeredEvent: "newFrame" },
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/113.svg" }),
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/114.svg" }))),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(-40, -145) },
        React.createElement(StopMotion_1.default, { frameSeries: [0, 1], loopFrame: 2, triggeredEvent: "newFrame" },
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/119.svg" }),
            React.createElement(SvgFile_1.default, { svgUrl: "./shapes/120.svg" }))),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(481, 405) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/116.svg" })),
    React.createElement(Draggable_1.default, { transform: Matrix2D_1.default.translate(139, 80) },
        React.createElement(SvgFile_1.default, { svgUrl: "./shapes/122.svg" }))), document.getElementById('app'));
let frame = 0;
const c = setInterval(() => {
    eventManager_1.default.trigger('newFrame', frame);
    frame++;
}, 200);
let pusheenSound = 0;
eventManager_1.default.on('clickPusheen', () => {
    pusheenSound++;
    if (pusheenSound >= 3) {
        pusheenSound -= 3;
    }
    soundManager_1.default.play(pusheenSound);
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map