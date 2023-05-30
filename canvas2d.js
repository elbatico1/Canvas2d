/**
 *  Copyright 2011 Fabio Fantini

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
/**
 * Canvas2d - Javascipt library
 * version v1.3.2
 */
const Canvas2d = {
    'globalId': 1,
    'container': {
        'id': 0,
        'width': 0,
        'height': 0,
        'element': null
    },
    'fakeCtx': null,
    wn: null
};
/**
 * Stage - Main element
 * @type constructor Stage
 * @description Instance an HTML DIV element that act as the main container
 * @property {div DOMElement} conatainer div element
 * @property {Point} size Point; Point, Array, Number
 * @property {Point} position Point; Point, Array, Number
 * @property {Point} scale Point; Point, Array, Number
 * @property {number} alpha opacity value in range 0-1
 * @property {boolean} visible object visibility
 * @property {number} rotation rotation expressed in degrees
 * @property {string} className object class name
 * @property {number} id object indentifier
 * @property {string} name object name
 * @property {array} children all the nested Layer elements
 * @property {date} date object creation date
 * @property {boolean} enableEvent enable/disable event listener
 * @property {string} agent navigator user agent
 * @param {div Element} container div element
 * @param {Point} size Point; Point, Array, Number
 * @param {boolean} enableevent event listener true false
 * @example var myStage=new Canvas2d.Stage('container',[800,520],true);
 * @returns {Stage Element} this Stage
 * @see link
 * @link text
 */
Canvas2d.Stage = function(container, p, enableevent) {
    this.enabledEvent = enableevent === false ? enableevent : true;
    this.className = "Stage";
    this.visible = true;
    this.date = new Date();
    this.name = "Stage_" + this.date.getTime().toString();
    this.indexCount = 0;
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    if (typeof p === 'string') {
        let body=document.body;
        let html=body.parentNode;
        body.style.margin=html.style.margin='0';
        body.style.padding=html.style.padding='0';
        html.style.height='100%';
        if (p === 'full') {
            body.style.height='100%';
        }else{
            let result = p.replace(/\s/g, "").toLowerCase();
            let ra = result.split(',');
            // console.log(result,ra);
            body.style.width=ra[0];
            body.style.height=ra[1];
        }
        this.size = new Canvas2d.Point([body.clientWidth,body.clientHeight]);
    }else{
        this.size = new Canvas2d.Point(p);
    }
    this.container.style.width = this.size.x + 'px';
    this.container.style.height = this.size.y + 'px';
    this.container.style.position = 'absolute';
    this.container.style.margin = '0 auto';
    this.container.onmousedown = function() {
        //return false;
    };
    Canvas2d.container.id = container;
    Canvas2d.container.width = this.size.x;
    Canvas2d.container.height = this.size.y;
    Canvas2d.container.element = this.container;
    this.fakeCanvas = document.createElement('canvas');
    this.fakeCanvas.width = this.size.x;
    this.fakeCanvas.height = this.size.y;
    this.fakeCtx = this.fakeCanvas.getContext("2d");
    Canvas2d.fakeCtx = this.fakeCtx;
    this.position = new Canvas2d.Point();
    this.scale = new Canvas2d.Point(1);
    this.alpha = 1;
    this.rotation = 0;
    this.id = container;
    this.index = 0;
    this.children = [];
    this.evtListeners = {};
    var agent = navigator.userAgent.toLowerCase();
    this.agent = agent;
    if (this.enabledEvent) {
        if ("ontouchstart" in window) {
            this._functestmobile();
        } else {
            this._functest();
        }
    }
    Canvas2d.wn = new Date().getTime();
    this.wn = Canvas2d.wn;
    window.fire = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
    window.cancelFire = (function(id) {
        return window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || function(id) {
            window.clearTimeout(id);
        };
    })();
    window[Canvas2d.wn + 'rqanim'] = {
        time: 0,
        timeInterval: 0,
        startTime: 0,
        lastTime: 0,
        frame: 0,
        animating: false,
        loop: [],
        prId: 0,
        whipe: function() {
            this.stop();
            this.reset();
            this.loop = [];
            window.cancelFire(window.fire);
        },
        getLoop: function() {
            return this.loop;
        },
        getTime: function() {
            return this.time;
        },
        getFps: function() {
            return this.timeInterval > 0 ? 1000 / this.timeInterval : 0;
        },
        getFrame: function() {
            return this.frame;
        },
        getTimeInterval: function() {
            return this.timeInterval;
        },
        _animationLoop: function() {
            if (this.animating) {
                var that = this;
                this.frame++;
                var date = new Date();
                var thisTime = date.getTime();
                this.timeInterval = thisTime - this.lastTime;
                this.time += this.timeInterval;
                this.lastTime = thisTime;
                for (let i = 0; i < this.loop.length; i++) {
                    var illo = this.loop[i];
                    illo.func.apply(illo.target, [illo.target]);
                }
                window.fire(function() {
                    that._animationLoop();
                });
            }
        },
        start: function() {
            if (!this.animating && this.loop.length > 0) {
                var date = new Date();
                this.startTime = date.getTime();
                this.lastTime = this.startTime;
                this.animating = true;
                this._animationLoop();
            }
        },
        reset: function() {
            this.time = 0;
            this.timeInterval = 0;
            this.startTime = 0;
            this.lastTime = 0;
            this.frame = 0;
            var date = new Date();
            this.startTime = date.getTime();
            this.lastTime = this.startTime;
        },
        stop: function() {
            this.animating = false;
        },
        addLoop: function(target, func) {
            var id = true;
            if (target.className === 'DisplayObjects') {
                id = target.parent.parent.wn === Canvas2d.wn ? true : false;
            } else if (target.className === 'Layer') {
                id = target.parent.wn === Canvas2d.wn ? true : false;
            } else if (target.className === 'Stage') {
                id = target.wn === Canvas2d.wn ? true : false;
            }
            if (!this.isChild(target) && id) {
                this.prId++;
                this.start();
                target.PRID = this.prId;
                this.loop.push({
                    target: target,
                    func: func,
                    id: this.prId
                });
            }
            return this.prId;
        },
        isChild: function(target) {
            var id = false;
            for (let i = 0; i < this.loop.length; i++) {
                if (this.loop[i].target === target) {
                    id = true;
                    break;
                }
            }
            return id;
        },
        removeLoop: function(target) {
            var id = -1;
            for (let i = 0; i < this.loop.length; i++) {
                if (this.loop[i].id === target.PRID) {
                    id = i;
                    break;
                }
            }
            if (id > -1) {
                this.loop.splice(id, 1);
            }
            if (this.loop.length === 0) {
                this.stop();
            }
        },
        _init: function() {
            var date = new Date();
            this.startTime = date.getTime();
            this.lastTime = this.startTime;
            this.animating = true;
            this._animationLoop();
        }
    };
};
Canvas2d.Stage.prototype = {
    /**
     *enableEvt - Stage - enable detection events in stage.
     * @type method Stage
     * @description enable detection events in stage
     * @example mystage.disableEvt();
     * @returns {void} enableEvt none
     */
    enableEvt: function() {
        if ("ontouchstart" in window) {
            this._functestmobile();
        } else {
            this._functest();
        }
        this.enabledEvent = true;
    },
    /**
     *disableEvt - Stage - disable detection events in stage.
     * @type method Stage
     * @description disable detection events in stage
     * @example mystage.disableEvt();
     * @returns {void} enableEvt none
     * @see text
     * @link text
     */
    disableEvt: function() {
        if ("ontouchstart" in window) {
            this.container.removeEventListener('touchmove', this._evtData[0], false);
            this.container.removeEventListener('touchstart', this._evtData[0], false);
            this.container.removeEventListener('touchend', this._evtData[0], false);
        } else {
            this.container.removeEventListener('mousemove', this._evtData[0], false);
            this.container.removeEventListener('mousedown', this._evtData[0], false);
            this.container.removeEventListener('mouseup', this._evtData[0], false);
            this.container.removeEventListener('click', this._evtData[0], false);
            this.container.removeEventListener('mouseover', this._evtData[1], false);
            this.container.removeEventListener('mouseout', this._evtData[1], false);
        }
        this.enabledEvent = false;
    },
    /**
     * addLoop - Stage - set the main function for animation.
     * @type method Stage
     * @description add a function to the animation cicle
     * @param {element object} target element of interest
     * @param {function} func function to be excecuted
     * @example mystage.addLoop(my object,myFunction);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    addLoop: function(target, func) {
        window[Canvas2d.wn + 'rqanim'].addLoop(target, func);
    },
    /**
     *removeLoop - Stage - set the main function for animation.
     * @type method Stage
     * @description remove a function to the animation cicle
     * @param {element object} target element of interest
     * @example mystage.removeLoop(my object);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    removeLoop: function(target) {
        window[Canvas2d.wn + 'rqanim'].removeLoop(target);
    },
    /**
     * start - Stage - start the animation cicle
     * @type method Stage
     * @description start the animation cicle
     * @example stage.start();
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    start: function() {
        window[Canvas2d.wn + 'rqanim'].start();
    },
    /**
     * reset - -Stage - reset the animation cicle
     * @type method Stage
     * @description reset the animation cicle
     * @example stage.reset();
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    reset: function() {
        window[Canvas2d.wn + 'rqanim'].reset();
    },
    /**
     * stop - Stage - stop the animation cicle
     * @type method Stage
     * @description reset di animation cicle
     * @example stage.stop();
     * @returns {undefined} non none
     * @see text
     * @link text
     */
    stop: function() {
        window[Canvas2d.wn + 'rqanim'].animating = false;
    },
    /**
     * getFrame - Stage - get the current increasing number of frame fired
     * @type method Stage
     * @description get the current increasing number of frame fired.
     * @example stage.getFrame();
     * @returns {number} frame number of frame executed
     * @see text
     * @link text
     */
    getFrame: function() {
        return window[Canvas2d.wn + 'rqanim'].getFrame();
    },
    /**
     * getTime - Stage - get the current increasing number of millisecond
     * @type method Stage
     * @description get the current increasing number of millisecond
     * @example stage.getTime();
     * @returns {number} time millisecons
     * @see text
     * @link text
     */
    getTime: function() {
        return window[Canvas2d.wn + 'rqanim'].getTime();
    },
    /**
     *getFps - Stage - get the current number of frame per seconds
     * @type method Stage
     * @description get the current number of frame per seconds
     * @example stage.getFps();
     * @returns {number} fps frame per seconds
     * @see text
     * @link text
     */
    getFps: function() {
        return window[Canvas2d.wn + 'rqanim'].getFps();
    },
    /**
     * getTimeInterval - Stage - get the actual delay in millisecond between cicle loops
     * @type method Stage
     * @description get the actual delay in millisecond between cicle loops
     * @example stage.getTimeInterval();
     * @returns {number} float milliseconds
     * @see text
     * @link text
     */
    getTimeInterval: function() {
        return window[Canvas2d.wn + 'rqanim'].getTimeInterval();
    },
    /**
     * getLoopList - Stage - get a list of all the element in the loop cicle
     * @type method Stage
     * @description get a list of all the element in the loop cicle
     * @example stage.getLoopList();
     * @returns {array} loop element list
     * @see text
     * @link text
     */
    getLoopList: function() {
        return window[Canvas2d.wn + 'rqanim'].loop;
    },
    /**
     * isAnimating - Stage - get a true/false value indicating the activiti of the animation cicle loop
     * @type method Stage
     * @description get a true/false value indicating the activiti of the animation cicle loop
     * @example stage.isAnimating();
     * @returns {boolean} animating true/false
     * @see text
     * @link text
     */
    isAnimating: function() {
        return window[Canvas2d.wn + 'rqanim'].animating;
    },
    /**
     *getDataURL - Stage - take a screen shot of stage
     * @type method Stage
     * @description take a screen shot of stage
     * @param {string} type a type of image image/jpeg-png
     * @param {number} quality a value rapresenting the quality of the returned image in range 0-10
     * @example image.src=stage.getDataURL('image/png',8);
     * @returns {image data} data image
     * @see text
     * @link text
     */
    getDataURL: function(type, quality) {
        var t = type ? type : 'image/jpeg';
        var q = quality ? quality : 5;
        this.fakeCtx.save();
        this.draw(this.fakeCtx);
        this.fakeCtx.restore();
        var data = this.fakeCanvas.toDataURL(t, q);
        this.fakeCtx.clearRect(0, 0, this.size.x, this.size.y);
        var img = document.createElement('img');
        img.src = data;
        return img;
    },
    /**
     * addEvent - Stage - add an event into the listening cicle
     * @type method Stage
     * @description add an event into the listening cicle
     * @param {event string} type event listener type
     * @param {function} func function to be call
     * @example myObject.addEvent('click',myFunction);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    addEvent: function(type, func) {
        if (type in this.evtListeners) {
            this.evtListeners[type].func.push(func);
        } else {
            this.evtListeners[type] = {
                'func': [func]
            };
        }
    },
    /**
     *removeEvent - Stage - remove a preexistent event from the listening cicle
     * @type method Stage
     * @description remove a preexistence event from the listening cicle
     * @param {event string} type event listener type
     * @param {function} func function to be call
     * @example myObject.removeEvent('click');
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    removeEvent: function(type, func) {
        if (type in this.evtListeners) {
            for (let i = 0; i < this.evtListeners[type].func.length; i++) {
                if (this.evtListeners[type].func[i] === func) {
                    this.evtListeners[type].func.splice(i, 1);
                    break;
                }
            }
            if (this.evtListeners[type].func.length === 0) {
                delete this.evtListeners[type];
            }
        }
    },
    /**
     * add - Stage - add an element into the list of nested objects
     * @type method Stage
     * @description add an element into the list of nested objects
     * @param {element object} child Layer
     * @example stage.add(Layer);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    add: function(...child) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i].parent || arguments[i].className === 'DisplayObjects') {
                    return;
                }
                arguments[i].parent = this;
                arguments[i].index = this.indexCount;
                this._setContainer(arguments[i], this);
                this.children.push(arguments[i]);
                this.indexCount++;
            }
            this._orderCanvases();
        }else{
            if (arguments[0].parent || arguments[0].className === 'DisplayObjects') {
                return;
            }
            arguments[0].parent = this;
            arguments[0].index = this.indexCount;
            this._setContainer(arguments[0], this);
            this.children.push(arguments[0]);
            this.indexCount++;
            this._orderCanvases();
        }
    },
    /**
     * remove - Stage - remove a preexistence object from the nested objects
     * @type method Stage
     * @description remove a preexistence object from the nested objects
     * @param {element object} child Layer
     * @example stage.remove(Layer);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    remove: function(child) {
        if (child.parent !== this) {
            return;
        }
        child.parent = undefined;
        this.children.splice(child.index, 1);
        this.container.removeChild(child.canvas);
        this.indexCount--;
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].index = i;
        }
        this._orderCanvases();
    },
    /**
     * zOrder - Stage - change the order of a nested Layer object passing either a index number or a string 'top' or 'bottom'
     * @type method Stage
     * @description change the order of a nested Layer object passing either a index number or a string 'top' or 'bottom'
     * @param {element object} child Layer
     * @param {number string} n index
     * @example stage.zOrder(Layer,'top');
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    zOrder: function(child, n) {
        if (child.parent !== this) {
            return;
        }
        if (typeof n === 'string') {
            var len = this.children.length;
            var el = n === 'top' ? len - 1 : n === 'bottom' ? 0 : len - 1;
            this.children.splice(child.index, 1);
            this.children.splice(el, 0, child);
            for (let i = 0; i < len; i++) {
                this.children[i].index = i;
            }
            this._orderCanvases();
        } else {
            if (n in this.children) {
                this.children.splice(child.index, 1);
                this.children.splice(n, 0, child);
                for (let i = 0; i < this.children.length; i++) {
                    this.children[i].index = i;
                }
                this._orderCanvases();
            }
        }
    },
    /**
     * getAlignement - Stage - get position relative to the Stage dimension
     * @type method Stage
     * @description get a position relative to Stage dimension passing a string base coordinate or a number ranging from 0 to 8; top-left 0, top-center 1, top-right 2, left 3, center 4, right 5, bottom-left 6, bottom-center 7, and bottom-right 8;
     * @param {number string} args number or string value
     * @example myObject.getAlignement('center' || 4);
     * @returns {array} position [x,y] in Array form
     * @see text
     * @link text
     */
    getAlignement: function(args){
        switch(args){
        case 0:
        case 'top-left':
            return [0,0];
            break
        case 1:
        case 'top-center':
            return [this.size.x/2,0];
            break
        case 2:
        case 'top-right':
            return [this.size.x,0];
            break
        case 3:
        case 'left':
            return [0,this.size.y/2];
            break;
        case 4:
        case 'center':
            return [this.size.x/2,this.size.y/2];
            break;
        case 5:
        case 'right':
            return [this.size.x,0];
            break;
        case 6:
        case 'bottom-left':
            return [0,this.size.y];
            break;
        case 7:
        case 'bottom-center':
            return [this.size.x/2,this.size.y];
            break;
        case 8:
        case 'bottom-right':
            return [this.size.x,this.size.y];
            break;
        default:
            break;
        }
    },
    _setContainer: function(child, parent) {
        // child.width = parent.width;
        // child.height = parent.height;
        child.size.set(parent.size);
        child.stage = parent.container;
        child.canvas.width = parent.size.x;
        child.canvas.height = parent.size.y;
        child.ctx = child.canvas.getContext('2d');
    },
    /**
     *_orderCanvases - Stage - internal function - reorder the canvases (Layer) elements.
     */
    _orderCanvases: function() {
        var that = this;

        function _childRecursion(child) {
            for (let i = 0; i < child.length; i++) {
                if (child[i].className === "Layer") {
                    that.container.appendChild(child[i].canvas);
                } else {
                    _childRecursion(child[i].children);
                }
            }
        }
        _childRecursion(this.children);
    },
    /**
     * resize - Stage - Manage resizing of Stage and recurively all his children
     * @type method Stage
     * @description Manage resizing of Stage and recurively all his children
     * @param {Point} new size; Point, Array, Number
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    resize: function(p) {
        this.container.style.width = w + "px";
        this.container.style.height = h + "px";
        this.size.set(p);
        for (let i = 0; i < this.children.length; i++) {
            this._setContainer(this.children[i], this);
        }
    },
    _functestmobile: function() {
        this.container.addEventListener('touchmove', _testhandlermobile, false);
        this.container.addEventListener('touchstart', _testhandlermobile, false);
        this.container.addEventListener('touchend', _testhandlermobile, false);
        var that = this,
            i, evt, c, sp, ob, tfound = false,
            m, target, ptarget, offx, offy, poffx, poffy;
        var isgstart, isgend, isgchange, radius, angle, scale, dstart, ddrag, dstop, m2, ttarget, pttarget;
        var mouse = {
            'touchstart': null,
            'touchend': null,
            'touchmove': null,
            'gestureend': null,
            'dragstop': false,
            'click': false
        };

        function _testhandlermobile(e) {
            e.preventDefault();
            mouse.touchend = false;
            mouse.click = false;
            mouse.dragstop = false;
            mouse.gestureend = false;
            mouse.touchmove = e.type === 'touchmove' ? true : false;
            if (e.type === 'touchstart') {
                mouse.touchstart = true;
            } else if (mouse.touchstart && e.type === 'touchend') {
                mouse.touchstart = false;
                mouse.touchend = true;
                mouse.click = true;
                isgstart = false;
                isgchange = false;
                ddrag = false;
                dstart = false;
                scale = 1;
                angle = 0;
                radius = 0;
            }
            if (mouse.touchmove && _tLen(e)) {
                if (target) {
                    if (that._testdetect(e.touches[0], target) && that._testdetect(e.touches[1], target)) {
                        ttarget = target;
                        pttarget = ptarget;
                    } else {
                        ttarget = pttarget = false;
                    }
                } else {
                    ttarget = pttarget = false;
                }

                isgstart = isgchange ? false : true;
                isgend = true;
            } else if (mouse.touchmove && target) {
                dstart = ddrag ? false : true;
                dstop = true;
            }
            if (isgstart) {
                isgchange = true;
            }

            if (dstart && target) {
                ddrag = true;
            }
            if (!dstart && !ddrag && dstop && mouse.touchend) {
                mouse.dragstop = true;
                dstop = false;
            }
            if (pttarget || ttarget) {
                if (isgstart && pttarget) {
                    _gestureShandler(e, pttarget, e);
                } else if (isgchange && pttarget) {
                    _gesturehandler(e, pttarget, e);
                }
                if (isgstart && ttarget) {
                    _gestureShandler(e, ttarget, e);
                } else if (isgchange && ttarget) {
                    _gesturehandler(e, ttarget, e);
                }
            }
            if (isgstart) {
                _gestureShandler(e, that, e);
            } else if (isgchange) {
                _gesturehandler(e, that, e);
            } else if (isgend) {
                _teststagehandler(testTouch(e), 'gestureend', e);
            }

            if (!isgstart && !isgchange && isgend && mouse.touchend) {
                mouse.gestureend = true;
                isgend = false;
            }

            if (dstart && ptarget) {
                var mp = that._parentOffset(testTouch(e), ptarget.parent);
                poffx = mp.ox - (ptarget.position.x);
                poffy = mp.oy - (ptarget.position.y);
                _dragShandler(e, ptarget, mp);
            } else if (ddrag && ptarget) {
                _draghandler(testTouch(e), ptarget, e, poffx, poffy);
            }
            if (dstart && target) {
                var mt = that._parentOffset(testTouch(e), target.parent);
                offx = mt.ox - (target.position.x);
                offy = mt.oy - (target.position.y);
                _dragShandler(e, target, mt);
            } else if (ddrag && target) {
                _draghandler(testTouch(e), target, e, offx, offy);
            }
            for (var o in mouse) {
                if (mouse[o]) {
                    switch (o) {
                        case 'touchend':
                            _handler(testTouch(e), o, 'mouseup', e);
                            break;
                        case 'touchstart':
                            _handler(testTouch(e), o, 'mousedown', e);
                            break;
                        case 'touchmove':
                            _handler(testTouch(e), o, 'mousemove', e);
                            break;
                        default:
                            _handler(testTouch(e), o, 'none', e);
                            break;
                    }
                }
            }
        }
        this._evtData = [_testhandlermobile];

        function _tLen(e) {
            if (e.type !== 'touchend') {
                if (e.touches.length === 2) {
                    return true;
                }
            }
            return false;
        }

        function _teststagehandler(e, evnt, opt) {
            if (evnt in that.evtListeners) {
                m = that._parentOffset(e, that);
                for (evt = 0; evt < that.evtListeners[evnt].func.length; evt++) {
                    that.evtListeners[evnt].func[evt].apply(that, [{
                        'target': that,
                        'mouse': m,
                        'type': evnt,
                        'event': opt
                    }]);
                }
            }
        }

        function _gesturehandler(e, target, opt) {
            if ('gesturechange' in target.evtListeners) {
                var p = target === that ? that : target.parent;
                var m1, m2;
                m1 = that._parentOffset(e.touches[0], p);
                m2 = that._parentOffset(e.touches[1], p);
                var a, r, s, a2;
                r = Math.sqrt(Math.pow(m1.x - m2.x, 2) + Math.pow(m1.y - m2.y, 2));
                a = Math.atan2(m1.y - m2.y, m1.x - m2.x);
                s = scale * (r / radius);
                a2 = a - angle;
                m1['mouse2'] = m2;
                m1['scale'] = s;
                m1['angle'] = a2;
                for (evt = 0; evt < target.evtListeners['gesturechange'].func.length; evt++) {
                    target.evtListeners['gesturechange'].func[evt].apply(ob, [{
                        'target': target,
                        'mouse': m1,
                        'type': 'gesturechange',
                        'event': e
                    }]);
                }
            }
        }

        function _gestureShandler(e, target, opt) {
            var p = target === that ? that : target.parent;
            var m1, m2;
            m1 = that._parentOffset(e.touches[0], p);
            m2 = that._parentOffset(e.touches[1], p);
            radius = Math.sqrt(Math.pow(m1.x - m2.x, 2) + Math.pow(m1.y - m2.y, 2));
            angle = Math.atan2(m1.y - m2.y, m1.x - m2.x) - target.rotation;
            scale = (target.scale.x + target.scale.y) / 2;
            if ('gesturestart' in target.evtListeners) {
                m1['mouse2'] = m2;
                m1['scale'] = scale;
                m1['angle'] = angle;
                for (evt = 0; evt < target.evtListeners['gesturestart'].func.length; evt++) {
                    target.evtListeners['gesturestart'].func[evt].apply(ob, [{
                        'target': target,
                        'mouse': m1,
                        'type': 'gesturestart',
                        'event': e
                    }]);
                }
            }
        }

        function _dragShandler(e, target, m) {
            if ('dragstart' in target.evtListeners) {
                for (evt = 0; evt < target.evtListeners['dragstart'].func.length; evt++) {
                    target.evtListeners['dragstart'].func[evt].apply(ob, [{
                        'target': target,
                        'mouse': m,
                        'type': 'dragstart',
                        'event': e
                    }]);
                }
            }
        }

        function _draghandler(e, target, opt, offx, offy) {
            if ('drag' in target.evtListeners) {
                var m = that._parentOffset(e, target.parent);
                var x, y;
                x = m.ox - offx;
                y = m.oy - offy;
                m.ox = x;
                m.oy = y; //m.offx=m.ox-offx;m.offy=m.oy-offy;
                for (evt = 0; evt < target.evtListeners['drag'].func.length; evt++) {
                    target.evtListeners['drag'].func[evt].apply(ob, [{
                        'target': target,
                        'mouse': m,
                        'type': 'drag',
                        'event': opt
                    }]);
                }
            }
        }

        function testTouch(e) {
            var touches = {
                'pageX': 0,
                'pageY': 0
            };
            if (e.touches && e.touches.length > 0) {
                touches = e.touches[0];
            } else if (e.changedTouches && e.changedTouches.length > 0) {
                touches = e.changedTouches[0];
            }
            return touches;
        }

        function _handler(e, evnt, evnt2, opt, off) {
            for (i = that.children.length - 1; i > -1; i--) {
                sp = that.children[i];
                if (sp.visible && sp.enabledEvent) {
                    for (c = sp.children.length - 1; c > -1; c--) {
                        ob = sp.children[c];
                        if (ob.visible && ob.enabledEvent) {
                            var m = that._testdetect(e, ob);
                            if (m) {
                                if (evnt in ob.evtListeners) {
                                    for (evt = 0; evt < ob.evtListeners[evnt].func.length; evt++) {
                                        ob.evtListeners[evnt].func[evt].apply(ob, [{
                                            'target': ob,
                                            'mouse': m,
                                            'type': evnt,
                                            'event': opt
                                        }]);
                                    }
                                }
                                if (evnt2 in ob.evtListeners) {
                                    for (evt = 0; evt < ob.evtListeners[evnt2].func.length; evt++) {
                                        ob.evtListeners[evnt2].func[evt].apply(ob, [{
                                            'target': ob,
                                            'mouse': m,
                                            'type': evnt2,
                                            'event': opt
                                        }]);
                                    }
                                }
                                target = ob;
                                tfound = true;
                                break;
                            }
                        }
                        target = tfound = false;
                    }
                    if (tfound && m) {
                        var m2 = that._testdetect(e, sp);
                        if (evnt in sp.evtListeners) {
                            for (evt = 0; evt < sp.evtListeners[evnt].func.length; evt++) {
                                sp.evtListeners[evnt].func[evt].apply(sp, [{
                                    'target': sp,
                                    'mouse': m2,
                                    'type': evnt,
                                    'event': opt
                                }]);
                            }
                        }
                        if (evnt2 in sp.evtListeners) {
                            for (evt = 0; evt < sp.evtListeners[evnt2].func.length; evt++) {
                                sp.evtListeners[evnt2].func[evt].apply(sp, [{
                                    'target': sp,
                                    'mouse': m2,
                                    'type': evnt2,
                                    'event': opt
                                }]);
                            }
                        }
                        ptarget = sp;
                        m = m2 = false;
                        break;
                    }
                    ptarget = false;
                }
            }
        }
    },
    _functest: function() {
        this.container.addEventListener('mousemove', _testhandler, false);
        this.container.addEventListener('mousedown', _testhandler, false);
        this.container.addEventListener('mouseup', _testhandler, false);
        this.container.addEventListener('click', _testhandler, false);
        this.container.addEventListener('mouseover', _resethandler, false);
        this.container.addEventListener('mouseout', _resethandler, false);
        var mouse = {
            'mouseup': false,
            'mousedown': false,
            'mousemove': false,
            'click': false,
            'mouseover': false,
            'mouseout': false,
            'dragstart': false,
            'drag': false,
            'dragstop': false
        };
        var isover, isout, over, out, dstart, ddrag, dstop, target, lasttarget, ptarget, plasttarget, pover, pout, pisout, pisover;
        var offx = 0,
            offy = 0,
            poffx, poffy;

        function _resethandler(e) {
            if (e.type === 'mouseout' && lasttarget) {
                _outhandler(e, lasttarget);
            }
            if (e.type === 'mouseout' && ptarget) {
                _outhandler(e, plasttarget);
            }
            isover = isout = over = out = dstart = ddrag = dstop = target = lasttarget = ptarget = plasttarget = pover = pout = pisover = pisout = false;
            mouse = {
                'mouseup': false,
                'mousedown': false,
                'mousemove': false,
                'click': false,
                'mouseover': false,
                'mouseout': false,
                'dragstart': false,
                'drag': false,
                'dragstop': false
            };
        }

        function _testhandler(e) {
            e.preventDefault();
            _teststagehandler(e);
            mouse.click = false;
            mouse.mouseup = false;
            mouse.dragstop = false;
            mouse.dragstart = false;
            mouse.mousemove = e.type === 'mousemove' ? true : false;
            _testoverout(e);
            _testoveroutP(e);
            if (e.type === 'mousedown') {
                mouse.mousedown = true;
            } else if (e.type === 'mouseup' && mouse.mousedown) {
                mouse.mousedown = false;
                mouse.click = true;
                mouse.mouseup = true;
                ddrag = false;
                dstart = false;
            }
            if (mouse.mousemove && mouse.mousedown && target) {
                dstart = ddrag ? false : true;
                dstop = true;
            }
            if (dstart && target) {
                ddrag = true;
            }
            if (!dstart && !ddrag && dstop && mouse.mouseup) {
                mouse.dragstop = true;
                mouse.drag = false;
                dstop = false;
                mouse.click = false;
            }
            if (_testdrag(e) || _testdragP(e)) {
                for (var o in mouse) {
                    if (mouse[o]) {
                        _handler(e, o);
                    }
                }
            }
        }
        this._evtData = [_testhandler, _resethandler];

        function _testdragP(e) {
            if (dstart && ptarget) {
                var mp = that._parentOffset(e, ptarget.parent);
                poffx = mp.ox - (ptarget.position.x);
                poffy = mp.oy - (ptarget.position.y);
                _dragShandler(e, ptarget, mp);
            } else if (ddrag && ptarget) {
                _draghandler(e, ptarget, poffx, poffy);
            } else {
                return true;
            }
            return false;
        }

        function _testdrag(e) {
            if (dstart && target) {
                var mt = that._parentOffset(e, target.parent);
                offx = mt.ox - (target.position.x);
                offy = mt.oy - (target.position.y);
                _dragShandler(e, target, mt);
            } else if (ddrag && target) {
                _draghandler(e, target, offx, offy);
            } else {
                return true;
            }
            return false;
        }

        function _testoveroutP(e) {
            pover = ptarget ? true : false;
            pout = plasttarget ? plasttarget === ptarget ? false : true : false;
            if (pout) {
                if (!pisout) {
                    pisout = true;
                    _outhandler(e, plasttarget);
                    pisover = false;
                }
            } else if (pover) {
                if (!pisover) {
                    pisover = true;
                    _overhandler(e, ptarget);
                    pisout = false;
                }
            }
            plasttarget = pover ? ptarget : plasttarget;
        }

        function _testoverout(e) {
            over = target ? true : false;
            out = lasttarget ? lasttarget === target ? false : true : false;
            if (out) {
                if (!isout) {
                    isout = true;
                    _outhandler(e, lasttarget);
                    isover = false;
                }
            } else if (over) {
                if (!isover) {
                    isover = true;
                    _overhandler(e, target);
                    isout = false;
                }
            }
            lasttarget = over ? target : lasttarget;
        }
        var that = this,
            i, evt, c, sp, ob, tfound = false,
            m;

        function _teststagehandler(e) {
            if (e.type in that.evtListeners) {
                m = that._parentOffset(e, that);
                for (evt = 0; evt < that.evtListeners[e.type].func.length; evt++) {
                    that.evtListeners[e.type].func[evt].apply(that, [{
                        'target': that,
                        'mouse': m,
                        'type': e.type,
                        'event': e
                    }]);
                }
            }
        }

        function _overhandler(e, target) {
            if ('mouseover' in target.evtListeners) {
                m = that._parentOffset(e, target.parent);
                for (evt = 0; evt < target.evtListeners['mouseover'].func.length; evt++) {
                    target.evtListeners['mouseover'].func[evt].apply(ob, [{
                        'target': target,
                        'mouse': m,
                        'type': 'mouseover',
                        'event': e
                    }]);
                }
            }
        }

        function _outhandler(e, target) {
            if (target && 'mouseout' in target.evtListeners) {
                m = that._parentOffset(e, target.parent);
                for (evt = 0; evt < target.evtListeners['mouseout'].func.length; evt++) {
                    target.evtListeners['mouseout'].func[evt].apply(ob, [{
                        'target': target,
                        'mouse': m,
                        'type': 'mouseout',
                        'event': e
                    }]);
                }
            }
        }

        function _dragShandler(e, target, m) {
            if ('dragstart' in target.evtListeners) {
                for (evt = 0; evt < target.evtListeners['dragstart'].func.length; evt++) {
                    target.evtListeners['dragstart'].func[evt].apply(ob, [{
                        'target': target,
                        'mouse': m,
                        'type': 'dragstart',
                        'event': e
                    }]);
                }
            }
        }

        function _draghandler(e, target, offx, offy) {
            if ('drag' in target.evtListeners) {
                var m = that._parentOffset(e, target.parent);
                var x, y;
                x = m.ox - offx;
                y = m.oy - offy;
                m.ox = x;
                m.oy = y; //m.offx=m.ox-offx;m.offy=m.oy-offy;
                for (evt = 0; evt < target.evtListeners['drag'].func.length; evt++) {
                    target.evtListeners['drag'].func[evt].apply(ob, [{
                        'target': target,
                        'mouse': m,
                        'type': 'drag',
                        'event': e
                    }]);
                }
            }
        }

        function _handler(e, evnt, off) {
            for (i = that.children.length - 1; i > -1; i--) {
                sp = that.children[i];
                if (sp.visible && sp.enabledEvent) {

                    for (c = sp.children.length - 1; c > -1; c--) {
                        ob = sp.children[c];
                        if (ob.visible && ob.enabledEvent) {
                            m = that._testdetect(e, ob);
                            if (m) {
                                if (evnt in ob.evtListeners) {
                                    for (evt = 0; evt < ob.evtListeners[evnt].func.length; evt++) {
                                        ob.evtListeners[evnt].func[evt].apply(ob, [{
                                            'target': ob,
                                            'mouse': m,
                                            'type': evnt,
                                            'event': e
                                        }]);
                                    }
                                }
                                target = ob;
                                tfound = true;
                                break;
                            }
                        }
                        target = tfound = false;
                    }
                    if (tfound && m) {
                        if (evnt in sp.evtListeners) {
                            for (evt = 0; evt < sp.evtListeners[evnt].func.length; evt++) {
                                sp.evtListeners[evnt].func[evt].apply(sp, [{
                                    'target': sp,
                                    'mouse': m,
                                    'type': evnt,
                                    'event': e
                                }]);
                            }
                        }
                        ptarget = sp;
                        m = false;
                        break;
                    }
                    ptarget = false;
                }
            }
        }
    },
    _testdetect: function(e, child) {
        var g, x, y, a, r, cos, sin, x1, y1, b = this.container.getBoundingClientRect();
        x = e.pageX - (Math.floor(b.left) + window.pageXOffset);
        y = e.pageY - (Math.floor(b.top) + window.pageYOffset);
        g = child.parent._global();
        x1 = child.className === 'Layer' ? x / g.scaleX : x;
        y1 = child.className === 'Layer' ? y / g.scaleY : y;
        r = Math.sqrt(Math.pow(x1 - g.x, 2) + Math.pow(y1 - g.y, 2));
        a = Math.atan2(y - g.y, x - g.x) - g.rotation;
        cos = Math.cos(a) * r;
        sin = Math.sin(a) * r;
        this.fakeCtx.save();
        this.fakeCtx.translate(g.x, g.y);
        this.fakeCtx.scale(g.scaleX, g.scaleY);
        this.fakeCtx.rotate(g.rotation);
        child.draw(this.fakeCtx, true);
        this.fakeCtx.restore();
        if (this.fakeCtx.isPointInPath(x, y)) {
            return {
                'x': x,
                'y': y,
                'ox': cos,
                'oy': sin,
                'gx': g.x,
                'gy': g.y,
                'scaleX': g.scaleX,
                'scaleY': g.scaleY,
                'rotation': g.rotation
            };
        } else {
            return false;
        }
    },
    _parentOffset: function(e, child) {
        var g, x, y, r, a, cos, sin, x1, y1, b = this.container.getBoundingClientRect();
        g = child._global();
        x = e.pageX - (Math.floor(b.left) + window.pageXOffset);
        y = e.pageY - (Math.floor(b.top) + window.pageYOffset);
        x1 = child.className === 'Layer' ? x / g.scaleX : x;
        y1 = child.className === 'Layer' ? y / g.scaleY : y;
        r = Math.sqrt(Math.pow(x1 - g.x, 2) + Math.pow(y1 - g.y, 2));
        a = Math.atan2(y - g.y, x - g.x) - g.rotation;
        cos = Math.cos(a) * r;
        sin = Math.sin(a) * r;
        return {
            'x': x,
            'y': y,
            'ox': cos,
            'oy': sin,
            'gx': g.x,
            'gy': g.y,
            'scaleX': g.scaleX,
            'scaleY': g.scaleY,
            'rotation': g.rotation
        };
    },
    _global: function() {
        return {
            'x': this.position.x,
            'y': this.position.y,
            'scaleX': this.scale.x,
            'scaleY': this.scale.y,
            'rotation': this.rotation,
            'alpha': this.alpha,
            'visible': this.visible
        };
    },
    /**
     * clear - Stage - clear the stage from all objects
     * @type method Stage
     * @description clear the stage from all objects
     * @example stage.clear();
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    clear: function() {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].clear();
        }
    },
    /**
     *draw - Stage - draw all the elements object nested in Stage
     * @type method Stage
     * @description draw all the elements object nested in Stage
     * @param {context 2d} ctx NOT REQUIRED
     * @example stage.draw();
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    draw: function(ctx) {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].draw(ctx);
        }
    }
};
/**
 * Layer - container for all type of DisplayObjects
 * @type constructor Layer
 * @description container for all type of DisplayObjects
 * @property {point} size Point; Point, Array, Number
 * @property {point} scale Point; Point, Array, Number
 * @property {Point} position Point; Point, Array, Number
 * @property {number} alpha opacity value in range 0-1
 * @property {number} rotation expressed in degrees
 * @property {boolean} visible object visibility 
 * @property {string} className object class name 
 * @property {number} id object indentifier 
 * @property {string} name object name 
 * @property {array} children all the nested elements
 * @property {date} date object creation date 
 * @property {object element} parent parent child
 * @property {string} blending layer type
 * @param {string} name object name 
 * @param {boolean} enableevent enable/disable event listeners; default true
 * @example var myObject= new Canvas2d.Layer('name optional');
 * @returns {Layer Element} this Layer
 * @see text
 * @link text
 */
Canvas2d.Layer = function(name, enableevent) {
    this.enabledEvent = enableevent === false ? enableevent : true;
    this.visible = true;
    this.name = name ? name : '';
    this.id = "layer_" + (Canvas2d.globalId++).toString() + "_" + this.name;
    var globalContainer = Canvas2d.container;
    // this.width = globalContainer.width;
    // this.height = globalContainer.height;
    this.size = new Canvas2d.Point(globalContainer.width,globalContainer.height);
    var container = document.createElement('canvas');
    container.width = this.size.x;
    container.height = this.size.y;
    container.id = this.id;
    container.style.position = 'absolute';
    container.style.top = '0px';
    container.style.left = '0px';
    this.canvas = container;
    this.ctx = container.getContext('2d');
    this.stage = globalContainer.element;
    this.className = "Layer";
    this.indexCount = 0;
    this.date = new Date();
    this.children = [];
    this.index = 0;
    this.parent = null;
    this.alpha = 1;
    this.rotation = 0;
    this.evtListeners = {};
    this.position = new Canvas2d.Point();
    this.scale = new Canvas2d.Point(1);
    this.blending="source-over"
};

// function _setContainer(child, parent) {
//     child.width = parent.width;
//     child.height = parent.height;
//     child.stage = parent.container;
//     child.canvas.width = parent.width;
//     child.canvas.height = parent.height;
//     child.ctx = child.canvas.getContext('2d');
// }
Canvas2d.Layer.prototype = {
    /**
     * addEvent - Layer - add an event into the listening cicle
     * @type method Layer
     * @description add an event into the listening cicle
     * @param {event string} type event listener type
     * @param {function} func function to be call
     * @example myObject.addEvent('click',myFunction);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    addEvent: function(type, func) {
        if (type in this.evtListeners) {
            this.evtListeners[type].func.push(func);
        } else {
            this.evtListeners[type] = {
                'func': [func]
            };
        }
    },
    /**
     * removeEvent - Layer - remove a preexistent event from the listening cicle
     * @type method Layer
     * @description remove a preexistence event from the listening cicle
     * @param {event string} type event listener type
     * @param {type} func function to be remove
     * @example myObject.removeEvent('click');
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    removeEvent: function(type, func) {
        if (type in this.evtListeners) {
            for (let i = 0; i < this.evtListeners[type].func.length; i++) {
                if (this.evtListeners[type].func[i] === func) {
                    this.evtListeners[type].func.splice(i, 1);
                    break;
                }
            }
            if (this.evtListeners[type].func.length === 0) {
                delete this.evtListeners[type];
            }
        }
    },
    /**
     * add - Layer - add an element into the list of nested objects
     * @type method Layer
     * @description add an element into the list of nested objects
     * @param {element object} child Layer
     * @example layer.add(DisplayObjects);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    add: function(...child) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i].parent || arguments[i].className !== 'DisplayObjects') {
                    return;
                }
                arguments[i].parent = this;
                arguments[i].index = this.indexCount;
                this.indexCount++;
                this.children.push(arguments[i]);
            }
        }else{
            if (arguments[0].parent || arguments[0].className !== 'DisplayObjects') {
                return;
            }
            arguments[0].parent = this;
            arguments[0].index = this.indexCount;
            this.indexCount++;
            this.children.push(arguments[0]);
        }
    },
    /**
     * remove - Layer - remove a preexistence object from the nested objects
     * @type method Layer
     * @description remove a preexistence object from the nested objects
     * @param {element object} displayObjects children's layer
     * @example layer.remove(DisplayObjects);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    remove: function(child) {
        if (child.parent !== this) {
            return;
        }
        child.parent = undefined;
        this.children.splice(child.index, 1);
        this.indexCount--;
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].index = i;
        }
    },
    /**
     * getBound - Layer -
     * @type method Layer
     * @description get the bounding box of all contained children
     * @example var myValue= layer.getBound(); result in {width:value,height:value}
     * @returns {object} bounds width and height
     * @see text
     * @link text
     */
    getBound: function() {
        var ax = [],
            ay = [],
            aw = [],
            ah = [];
        for (let i = 0; i < this.children.length; i++) {
            ax.push(this.children[i].position.x + this.children[i].size.x);
            ay.push(this.children[i].position.y + this.children[i].size.y);
        }

        function compareNumbers(a, b) {
            return a - b;
        }
        ax.sort(compareNumbers);
        ay.sort(compareNumbers);
        return {
            width: ax[ax.length - 1],
            height: ay[ay.length - 1]
        };
    },
    /**
     * zOrder - Layer - change the order of a nested DisplayObjects passing either a index number or a string 'top' or 'bottom'
     * @type method Layer
     * @description change the order of a nested DisplayObjects passing either a index number or a string 'top' or 'bottom'
     * @param {number string} n index
     * @example layer.zOrder('top');
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    zOrder: function(n) {
        if (typeof n === 'string') {
            var len = this.parent.children.length;
            var el = n === 'top' ? len - 1 : n === 'bottom' ? 0 : len - 1;
            this.parent.children.splice(this.index, 1);
            this.parent.children.splice(el, 0, this);
            for (let i = 0; i < len; i++) {
                this.parent.children[i].index = i;
            }
            this.parent._orderCanvases();
        } else {
            if (n in this.parent.children) {
                this.parent.children.splice(this.index, 1);
                this.parent.children.splice(n, 0, this);
                for (let i = 0; i < this.parent.children.length; i++) {
                    this.parent.children[i].index = i;
                }
                this.parent._orderCanvases();
            }
        }
    },
    /**
     * clear - Layer - clear the layer from all objects
     * @type method Layer
     * @description clear the layer from all nested objects
     * @example layer.clear();
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    clear: function() {
        this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    },
    _global: function() {
        var g = this.parent._global(),
            cos, sin;
        if (this.parent.rotation !== 0) {
            // var a = Math.atan2(this.y, this.x) + this.parent.rotation;
            var a = this.position.angle() + this.parent.rotation;
            // var r = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
            var r = this.position.length();
            cos = r * Math.cos(a);
            sin = r * Math.sin(a);
        } else {
            cos = this.position.x;
            sin = this.position.y;
        }
        return {
            'x': g.x + cos,
            'y': g.y + sin,
            'scaleX': g.scaleX * this.scale.x,
            'scaleY': g.scaleY * this.scale.y,
            'rotation': g.rotation + this.rotation,
            'alpha': g.alpha < 1 ? this.alpha * g.alpha : this.alpha,
            'visible': g.visible ? this.visible : false
        };
    },
    /**
     * clone - Layer - clone a Layer object returning a new one
     * @type method Layer
     * @description clone a Layer object returning a new one
     * @example var newObject=layer.clone();
     * @returns {element object} newElement Layer
     * @see text
     * @link text
     */
    clone: function() {
        var e = new Canvas2d.Layer();
        for (let i = 0; i < this.children.length; i++) {
            var c = this.children[i].clone(this.children[i].name);
            e.add(c);
        }
        return e;
    },
    /**
     *draw - Layer - draw all the elements object nested in Layer
     * @type method Layer
     * @description draw all the elements object nested in Layer
     * @param {context 2d} ctx NOT REQUIRED
     * @example layer.draw();
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    draw: function(ctx) {
        if (!this.visible) {
            this.clear();
            return;
        }
        var c = ctx ? ctx : this.ctx;
        if (!ctx) {
            this.clear();
        }
        var g = this._global();
        c.save();
        c.globalCompositeOperation=this.blending;
        c.translate(g.x, g.y);
        c.scale(g.scaleX, g.scaleY);
        c.rotate(g.rotation);
        c.globalAlpha = g.alpha;
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].draw(c);
        }
        c.restore();
    },
    /**
     *blend - Layer - Set blending canvas mode
     * @type method Layer
     * @description blending type setting for all Layer's nested elements
     * @param {number} n index Array blending methods
     * @example layer.blend(number);
     * @returns {param} layer blending=type;
     * @see text
     * @link text
     */
    blend: function(n){
        var blend=[
/**
* This is the default setting and draws new shapes on top of the existing canvas content.
*/
"source-over",
/**
* The new shape is drawn only where both the new shape and the destination canvas overlap. Everything else is made transparent.
*/
"source-in",
/**
* The new shape is drawn where it doesn't overlap the existing canvas content.
*/
"source-out",
/**
* The new shape is only drawn where it overlaps the existing canvas content.
*/
"source-atop",
/**
* New shapes are drawn behind the existing canvas content.
*/
"destination-over",
/**
* The existing canvas content is kept where both the new shape and existing canvas content overlap. Everything else is made transparent.
*/
"destination-in",
/**
* The existing content is kept where it doesn't overlap the new shape.
*/
"destination-out",
/**
* The existing canvas is only kept where it overlaps the new shape. The new shape is drawn behind the canvas content.
*/
"destination-atop",
/**
* Where both shapes overlap the color is determined by adding color values.
*/
"lighter",
/**
* Only the new shape is shown.
*/
"copy",
/**
* Shapes are made transparent where both overlap and drawn normal everywhere else.
*/
"xor",
/**
* The pixels of the top layer are multiplied with the corresponding pixel of the bottom layer. A darker picture is the result.
*/
"multiply",
/**
* The pixels are inverted, multiplied, and inverted again. A lighter picture is the result (opposite of multiply)
*/
"screen",
/**
* A combination of multiply and screen. Dark parts on the base layer become darker, and light parts become lighter.
*/
"overlay",
/**
* Retains the darkest pixels of both layers.
*/
"darken",
/**
* Retains the lightest pixels of both layers.
*/
"lighten",
/**
* Divides the bottom layer by the inverted top layer.
*/
"color-dodge",
/**
* Divides the inverted bottom layer by the top layer, and then inverts the result.
*/
"color-burn",
/**
* A combination of multiply and screen like overlay, but with top and bottom layer swapped.
*/
"hard-light",
/**
* A softer version of hard-light. Pure black or white does not result in pure black or white.
*/
"soft-light",
/**
* Subtracts the bottom layer from the top layer or the other way round to always get a positive value.
*/
"difference",
/**
* Like difference, but with lower contrast.
*/
"exclusion",
/**
* Preserves the luma and chroma of the bottom layer, while adopting the hue of the top layer.
*/
"hue",
/**
* Preserves the luma and hue of the bottom layer, while adopting the chroma of the top layer.
*/
"saturation",
/**
* Preserves the luma of the bottom layer, while adopting the hue and chroma of the top layer.
*/
"color",
/**
* Preserves the hue and chroma of the bottom layer, while adopting the luma of the top layer.
*/
"luminosity"];
        return this.blending=blend[n];
    }
};
/**
 * DisplayObjects - object constructor of all shapes, texts, images and clips
 * @type constructor DisplayObjects
 * @description object constructor of all shapes, texts, images and clips
 * @property {point} object Size; Point, Array, Number
 * @property {Point} object Position; Point, Array, Number
 * @property {Point} object Pivot; Point, Array, Number
 * @property {point} object Scale; Point, Array, Number
 * @property {number} alpha opacity value in range 0-1
 * @property {number} rotation rotation expressed in degrees
 * @property {boolean} visible object visibility
 * @property {string} className object class name
 * @property {number} id object indentifier
 * @property {string} name object name
 * @property {array} children all the nested elements
 * @property {date} date object creation date
 * @property {object element} parent child parent
 * @property {Color} clr Color Object; Contaning Color's methods
 * @param {string} name object name
 * @param {boolean} enableevent enable/disable event listeners; default true
 * @example var myObject= new Canvas2d.DisplayObjects('name optional');
 * @returns {DisplayObjects Element} this DisplayObjects
 * @see text
 * @link text
 */
Canvas2d.DisplayObjects = function(name, enableevent) {
    this.enabledEvent = enableevent === false ? enableevent : true;
    this.visible = true;
    this.className = "DisplayObjects";
    this.evtListeners = {};
    this.parent = null;
    this.name = name ? name : '';
    this.id = "displayObjects_" + (Canvas2d.globalId++).toString() + "_" + this.name;
    this.index = 0;
    this.type = '';
    this.size = new Canvas2d.Point();
    this.scale = new Canvas2d.Point(1);
    this.rotation = 0;
    this.alpha = 1;
    this.lineAlpha = 1;
    this.color = null;
    this.lineColor = null;
    this.lineWidth = 1;
    this.lineCap = 'butt';
    this.lineJoin = 'miter';
    this.lineMiter = 10;
    this.backUpImage = null;
    this.imageData = null;
    this.imageCrop = {
        dw: -1,
        dh: -1,
        dx: 0,
        dy: 0
    };
    this.doneimage = false;
    this.currentFilter = null;
    this.clr = new Canvas2d.Colors();
    this.position = null;
    this.pivot = new Canvas2d.Point();
};
Canvas2d.DisplayObjects.prototype = {
    txt: '',
    close: true,
    fontStyle: null,
    fontSize: 10,
    fontType: 'Verdana',
    fontWeight: 'normal',
    align: 'center',
    baseLine: 'alphabetic',
    backGround: null,
    paddingLeft: 0,
    paddingTop: 0,
    source: null,
    loadComplete: false,
    isLoading: false,
    image: null,
    frameList: null,
    currentFrame: 0,
    shadow: null,
    lineShadow: null,
    gradient: null,
    lineGradient: null,
    _alignList: {
        'start': 'start',
        'end': 'end',
        'left': 'left',
        'right': 'right',
        'center': 'center'
    },
    _baseList: {
        'top': 'top',
        'hanging': 'hanging',
        'middle': 'middle',
        'alphabetic': 'alphabetic',
        'ideographic': 'ideographic',
        'bottom': 'bottom'
    },
    _capList: {
        'butt': 'butt',
        'round': 'round',
        'square': 'square'
    },
    _joinList: {
        'bevel': 'bevel',
        'round': 'round',
        'miter': 'miter'
    },
    /**
     * addEvent - DisplayObjects - add an event into the listening cicle
     * @type method DisplayObjects
     * @description add an event into the listening cicle
     * @param {event string} type event listener type
     * @param {function} func function to be called
     * @example myObject.addEvent('click',myFunction);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    addEvent: function(type, func) {
        if (type in this.evtListeners) {
            this.evtListeners[type].func.push(func);
        } else {
            this.evtListeners[type] = {
                'func': [func]
            };
        }
    },
    /**
     * removeEvent - DisplayObjects - remove a preexistent event from the listening cicle
     * @type method DisplayObjects
     * @description remove a preexistence event from the listening cicle
     * @param {event string} type event listener type
     * @param {type} func function to be remove
     * @example myObject.removeEvent('click', myFunc);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    removeEvent: function(type, func) {
        if (type in this.evtListeners) {
            for (let i = 0; i < this.evtListeners[type].func.length; i++) {
                if (this.evtListeners[type].func[i] === func) {
                    this.evtListeners[type].func.splice(i, 1);
                    break;
                }
            }
            if (this.evtListeners[type].func.length === 0) {
                delete this.evtListeners[type];
            }
        }
    },
    /**
     * zOrder - DisplayObjects - change the order of a nested DisplayObjects type passing either a index number or a string 'top' or 'bottom'
     * @type method DisplayObjects
     * @description change the order of a nested DisplayObjects type passing either a index number or a string 'top' or 'bottom'
     * @param {number string} n index
     * @example myObject.zOrder('top');
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    zOrder: function(n) {
        if (typeof n === 'string') {
            var len = this.parent.children.length;
            var el = n === 'top' ? len - 1 : n === 'bottom' ? 0 : len - 1;
            this.parent.children.splice(this.index, 1);
            this.parent.children.splice(el, 0, this);
            for (let i = 0; i < len; i++) {
                this.parent.children[i].index = i;
            }
        } else {
            if (n in this.parent.children) {
                this.parent.children.splice(this.index, 1);
                this.parent.children.splice(n, 0, this);
                for (let i = 0; i < this.parent.children.length; i++) {
                    this.parent.children[i].index = i;
                }
            }
        }
    },
    /**
     * setPivot - DisplayObjects - set the object origin point
     * @type method DisplayObjects
     * @description set the object origin point passing a string base coordinate or a number ranging from 0 to 8; top-left 0, top-center 1, top-right 2, left 3, center 4, right 5, bottom-left 6, bottom-center 7, and bottom-right 8;
     * @param {number string} args number or string value
     * @example myObject.setPivot('center' || 4);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    setPivot: function(args){
        switch(args){
        case 0:
        case 'top-left':
            this.pivot.set(0);
            break;
        case 1:
        case 'top-center':
            this.pivot.set([-(this.size.x/2),0]);
            break;
        case 2:
        case 'top-right':
            this.pivot.set([-(this.size.x),0]);
            break;
        case 3:
        case 'left':
            this.pivot.set([0,-(this.size.y/2)]);
            break;
        case 4:
        case 'center':
            this.pivot.set([-(this.size.x/2),-(this.size.y/2)]);
            break;
        case 5:
        case 'right':
            this.pivot.set([-(this.size.x),-(this.size.y/2)]);
            break;
        case 6:
        case 'bottom-left':
            this.pivot.set([0,-(this.size.y)]);
            break;
        case 7:
        case 'bottom-center':
            this.pivot.set([-(this.size.x/2),-(this.size.y)]);
            break;
        case 8:
        case 'bottom-right':
            this.pivot.set([-(this.size.x),-(this.size.y)]);
            break;
        default:
            break;
        }
    },
    /**
     * getColor - DisplayObjects - get the current object's fill color as requested format
     * @type method DisplayObjects
     * @description get the current object's fill color as requested format
     * @param {string} type request format
     * @example myObjects.getColor('rgb');
     * @returns {mixed} string color value; hex, name, array, string; rgb, hsl, hsv
     * @see text
     * @link text
     */
    getColor: function(type) {
        return this.clr._parseGetColor(this.color, type);
    },
    /**
     * getLineColor - DisplayObjects - get the current object's line color as requested format
     * @type method DisplayObjects
     * @description get the current object's line color as requested format
     * @param {string} type request format
     * @example myObjects.getLineColor('rgb');
     * @returns {mixed} string color value; hex, name, array, string; rgb, hsl, hsv
     * @see text
     * @link text
     */
    getLineColor: function(type) {
        return this.clr._parseGetColor(this.lineColor, type);
    },
    
    /**
     * cacheAsBitmap - DisplayObjects - render an object as image
     * @type method DisplayObjects
     * @description render an object as an image replacing the origin object
     * @example myObject.cacheAsBitmap();
     * @returns {void} none none
     * @see text
     * @link text
     */
    cacheAsBitmap: function() {
        var types = {
            polygon: "polygon",
            shape: "shape",
            text: "text",
            rect: "rect",
            rectround: "rectround",
            line: "line",
            circle: "circle"
        };
        if (this.type in types) {} else {
            console.log("wrong type ", this.type);
            return;
        }
        var fc = document.createElement("canvas"),
            ox = this.position.x,
            oy = this.position.y,
            or = this.rotation;
        var img = new Image();
        fc.width = this.size.x + this.lineWidth * 2;
        fc.height = this.size.y + this.lineWidth * 2;
        var xc = fc.getContext("2d");
        if (this.type === "polygon" || this.type === "shape") {
            ox = this.position.x - this.size.x / 2;
            oy = this.position.y - this.size.y / 2;
            this.position.x = Math.abs(this._coord.x[0]) + this.lineWidth;
            this.position.y = Math.abs(this._coord.y[0]) + this.lineWidth;
        } else {
            this.position.x = 0;
            this.position.y = 0;
        }
        this.rotation = 0;
        this.draw(xc);
        var data = fc.toDataURL("image/png", 10);
        img.src = data;
        this.img(0, 0, img, true);
        this.position.x = ox;
        this.position.y = oy;
        this.rotation = or;
    },
    /**
     * clone - DisplayObjects - clone this DisplayObjects
     * @type method DisplayObjects
     * @description clone this DisplayObjects and let pass a second argument as {key:value} to overide properties
     * @param {object this} n this DisplayObjects
     * @param {object} key value properties to overide OPTIONAL
     * @example var newObject=this.clone(this,{name:new name,...});
     * @returns {object this} new DisplayObjects
     * @see text
     * @link text
     */
    clone: function(n) {
        var c = new Canvas2d.DisplayObjects();
        var ts = Object.prototype.toString;
        for (var o in this) {
            // console.log(this[o]);
            if (ts.call(this[o]) !== "[object Function]") {
                switch (o) {
                    case "id":
                        break;
                    case "parent":
                        break;
                    case "name":
                        break;
                    default:
                        if (ts.call(this[o]) === "[object Object]") {
                            var no = {};
                            for (var t in this[o]) {
                                no[t] = this[o][t];
                            }
                            c[o] = no;
                        } else {
                            c[o] = this[o];
                        }
                        break;
                }
            }
        }
        if (arguments.length === 2) {
            let args=arguments[1]
            for (let o in args) {
                c[o]=args[o];
            }
        }
        return c;
    },
    /**
     * rect - DisplayObjects - create a rectangle
     * @type constructor rect DisplayObjects
     * @description create a rectangle
     * @param {point} position LOCAL object coordinate; Point, Array, Number
     * @param {point} object Size; Point, Array, Number
     * @param {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {mixed} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} linewidth weight of line
     * @example myObject.rect([0,0],point,'rgb(255,230,120)','hsl(230,100%,50%)',2);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    rect: function(p, size, color, linecolor, linewidth) {
        this.type = 'rect';
        this.position = new Canvas2d.Point(p);
        this.size.set(size);
        this._setStyle(color, linecolor, linewidth);
    },
    /**
     * rectRound - DisplayObjects - create a rectangle with rounded corner
     * @type constructor rectRound DisplayObjects
     * @description create a rectangle width rounded corner
     * @param {point} position LOCAL object coordinate; Point, Array, Number
     * @param {point} object Size; Point, Array, Number
     * @param {number} radius radius of corners
     * @param {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {mixed} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} linewidth weight of line
     * @example myObject.rectRound([0,0],p,10,'rgb(255,230,120)','hsl(230,100%,50%)',2);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    rectRound: function(p, size, radius, color, linecolor, linewidth) {
        this.type = 'rectround';
        this.position = new Canvas2d.Point(p);
        this.size.set(size);
        this.radius = radius ? radius : 0;
        this._setStyle(color, linecolor, linewidth);
    },
    /**
     * polygon - DisplayObjects - create a polygon
     * @type constructor polygon DisplayObjects
     * @description create a polygon
     * @param {point} position LOCAL object coordinate; Point, Array, Number
     * @param {array} points a collection of two points coordinates [[x,y],..]
     * @param {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {mixed} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} linewidth weight of line
     * @param {boolean} close close/leave open the shape
     * @example myObject.polygon(p,[[0,0],[50,100],[-50,100]],'red','blue',true);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    polygon: function(p, points, color, linecolor, linewidth, close) {
        this.type = 'polygon';
        this.close = close === false ? close : true;
        this.position = new Canvas2d.Point(p);
        this.points = points ? points : [];
        this._setStyle(color, linecolor, linewidth);
        let bx=by=ax=ay=0;
        for (let i = 0; i < this.points.length; i++) {
            bx=bx>=this.points[i][0]?this.points[i][0]:bx;
            by=by>=this.points[i][1]?this.points[i][1]:by;
            ax=ax<=this.points[i][0]?this.points[i][0]:ax;
            ay=ay<=this.points[i][1]?this.points[i][1]:ay;
        }
        this.size.set([Math.sqrt(Math.pow(bx - ax,2)),Math.sqrt(Math.pow(by - ay,2))]);
    },
    /**
     * shape - DisplayObjects - create a shape
     * @type constructor shape DisplayObjects
     * @description create a shape
     * @param {point} position LOCAL object coordinate; Point, Array, Number
     * @param {array} obj a collection of objects key-value; [{moveTo:[..]},{lineTo:[..]},{quadraticCurveTo:[....]},{bezierCurveTo:[....]},{arcTo:[...]}]
     * @param {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {mixed} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} linewidth weight of line
     * @param {boolean} close close/leave open the shape
     * @example myObject.shape(0,0,[{moveTo:[0,0]},{lineTo:[100,100]},{quadraticCurveTo:[50,50,10,10]},..],'red','blue',true);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    shape: function(p, obj, color, linecolor, linewidth, close) {
        this.type = 'shape';
        this.close = close === false ? close : true;
        this.position = new Canvas2d.Point(p);
        this.obj = obj ? obj : [];
        this._setStyle(color, linecolor, linewidth);
        let bx=by=ax=ay=0;
        for (let i = 0; i < this.obj.length; i++) {
            for (var o in this.obj[i]) {
                var obj = this.obj[i][o];
                switch (o) {
                    case 'm':
                    case 'moveTo':
                        bx=bx>=obj[0]?obj[0]:bx;
                        by=by>=obj[1]?obj[1]:by;
                        ax=ax<=obj[0]?obj[0]:ax;
                        ay=ay<=obj[1]?obj[1]:ay;
                        break;
                    case 'l':
                    case 'lineTo':
                        bx=bx>=obj[0]?obj[0]:bx;
                        by=by>=obj[1]?obj[1]:by;
                        ax=ax<=obj[0]?obj[0]:ax;
                        ay=ay<=obj[1]?obj[1]:ay;
                        break;
                    case 'q':
                    case 'quadraticCurveTo':
                        bx=bx>=obj[0]?obj[0]:bx;
                        by=by>=obj[1]?obj[1]:by;
                        ax=ax<=obj[0]?obj[0]:ax;
                        ay=ay<=obj[1]?obj[1]:ay;
                        bx=bx>=obj[2]?obj[2]:bx;
                        by=by>=obj[3]?obj[3]:by;
                        ax=ax<=obj[2]?obj[2]:ax;
                        ay=ay<=obj[3]?obj[3]:ay;
                        break;
                    case 'c':
                    case 'bezierCurveTo':
                        bx=bx>=obj[4]?obj[4]:bx;
                        by=by>=obj[5]?obj[5]:by;
                        ax=ax<=obj[4]?obj[4]:ax;
                        ay=ay<=obj[5]?obj[5]:ay;
                        break;
                    case 'a':
                    case 'arcTo':
                        bx=bx>=obj[2]?obj[2]:bx;
                        by=by>=obj[3]?obj[3]:by;
                        ax=ax<=obj[2]?obj[2]:ax;
                        ay=ay<=obj[3]?obj[3]:ay;
                        break;
                    default:
                        break;
                }
            }
        }
        this.size.set([Math.sqrt(Math.pow(bx - ax,2)),Math.sqrt(Math.pow(by - ay,2))]);
    },
    /**
     * line - DisplayObjects - creatye a line
     * @type constructor line DisplayObjects
     * @description create a line
     * @property {array} points contain two array corresponding to the coordinates x,y of [x0,y0],[x1,y1]
     * @param {point} position LOCAL object coordinate; Point, Array, Number
     * @param {point} Start Local Position; Point, Array, Number
     * @param {point} End Local Position; Point, Array, Number
     * @param {type} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} linewidth weight of line
     * @param {type} lineCap style of edge of line; butt, round, square; default butt
     * @param {type} lineJoin style of joining lines; bevel, round, miter; default miter
     * @param {number} lineMiter amount of exiding weight of line
     * @example myObject.line(p,[-10,0],[10,0],'blue',2,'round','miter',10);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    line: function(p, start, end, linecolor, linewidth, lineCap, lineJoin, lineMiter) {
        this.type = 'line';
        this.position = new Canvas2d.Point(p);
        this.start = new Canvas2d.Point(start);
        this.end = new Canvas2d.Point(end);
        this.points = [
            [this.start.x,this.start.y],
            [this.end.x,this.end.y]
        ];
        this.size.set([Math.sqrt(Math.pow(this.start.x - this.end.x,2)),Math.sqrt(Math.pow(this.start.y - this.end.y,2))]);
        this.len = this.start.distance(this.end);
        this._setStyle(null, linecolor, linewidth, lineCap, lineJoin, lineMiter);
    },
    /**
     * circle - DisplayObjects - create a crcle
     * @type constructor circle DisplayObjects
     * @description create a circle
     * @param {point} position LOCAL object coordinate; Point, Array, Number
     * @param {number} radius radius width
     * @param {radians} startAngle starting point angle in degrees
     * @param {radians} endAngle ending point angle in degrees
     * @param {color} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {color} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} linewidth weight of line
     * @example myObject.circle(p,50,0,Math.PI*2,[0,0,0],[255,255,255],2);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    circle: function(p, radius, startAngle, endAngle, color, linecolor, linewidth) {
        this.type = 'circle';
        this.position = new Canvas2d.Point(p);
        this.size.set(radius*2);
        this.width = radius? radius * 2 : 0;
        this.height = radius? radius * 2 : 0;
        this.radius = radius ? radius : 0;
        this.startAngle = startAngle ? startAngle : 0;
        this.endAngle = endAngle ? endAngle : 0;
        this._setStyle(color, linecolor, linewidth);
    },
    /**
     * text - DisplayObjects - create a text field
     * @type constructor text DisplayObjects
     * @description create a text field
     * @param {string} txt the text to use for text field
     * @param {point} position LOCAL object coordinate; Point, Array, Number
     * @param {string} fontweigth style of weight text field; normal, bold, italic, bold italic; default normal
     * @param {number} fontsize the size of font
     * @param {string} font the font-family type to use for the text fiel; default Verdana, multiple value are allowed
     * @param {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {object} background an object rapresenting the style of the twxt field background; {color:..,linecolor:..,linewidth:..}
     * @param {string} align the horizontal alignment of the text field; start, end, left, right, center; default left
     * @param {string} baseLine the vertical alignment of text field; top, hanging, middle, alphabetic, ideographic, bottom; default alphabetic
     * @example myObject.text('testo da inserire',[0,0],'normal',18,'Verdana,Helvetica,Sans-serife',{color:'red'},'center','bottom');
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    text: function(txt, p, fontweigth, fontsize, font, color, background, align, baseLine) {
        this.type = 'text';
        this.position = new Canvas2d.Point(p);
        var ctx = Canvas2d.fakeCtx;
        // this.height = fontsize ? fontsize : 10;
        this.txt = txt ? txt : '';
        this.backGround = background ? background : null;
        this._setFont(fontweigth, fontsize, font, align, baseLine);
        this._setStyle(color);
        ctx.font = this.fontStyle;
        ctx.textAlign = this.align;
        ctx.textBaseline = this.baseLine;
        var txtMatrix = ctx.measureText(txt);
        this.size.set([txtMatrix.actualBoundingBoxRight+txtMatrix.actualBoundingBoxLeft,txtMatrix.actualBoundingBoxAscent+txtMatrix.actualBoundingBoxDescent]);
        delete ctx;
    },
    /**
     * img - DisplayObjects - create an image
     * @type constructor img DisplayObjects
     * @description create an image
     * @param {point} position LOCAL object coordinate; Point, Array, Number
     * @param {mixed} source img DOM Element or string url
     * @param {boolean} show determin if manage directly or automatically the process of loading
     * @param {mixed} color color applied to the background value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} paddingleft left right amount of border
     * @param {number} paddingtop top bottom amount of border
     * @param {object} crop an object list of point for display just a section of the image; {dx:0,dy:0,dw:100,dh:100}
     * @example myObject.img([0,0],'images/myimage.jpg',true,'black',10,10,{dx:0,dy:0,dw:100,dh:100});
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    img: function(p, source, show, color, paddingleft, paddingtop, crop) {
        this.type = 'img';
        this.position = new Canvas2d.Point(p);
        this.paddingLeft = paddingleft ? paddingleft : 0;
        this.paddingTop = paddingtop ? paddingtop : 0;
        this._setStyle(color);
        this.setCrop(crop);
        this.source = source ? source : null;
        if (show) {
            this.loadImage(this.source, null, null, show);
        }
    },
    /**
     * clip - DisplayObjects - create a clip
     * @type constructor clip DisplayObjects
     * @description create a clip
     * @param {point} position LOCAL object coordinate; Point, Array, Number
     * @param {mixed} source img DOM Element or string url
     * @param {array} framelist a list of object that specified the sequence of image to cut;[{x,..,y:..,map:{x:..,y:..,width:..,height:..},...]
     * @param {type} show determin if manage directly or automatically the process of loading
     * @example myObject.clip(p,'images/myimage.png',[{x,..,y:..,map:{x:..,y:..,width:..,height:..},...],true);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    clip: function(p, source, framelist, show) {
        this.type = 'clip';
        this.position = new Canvas2d.Point(p);
        this.source = source ? source : null;
        this.frameList = framelist ? framelist : this.frameList;
        if (show) {
            this.loadImage(this.source, null, null, show);
        }
    },
    /**
     * TO ELIMINATE NOT USED INTERNALLY
     * restore - DisplayObjects - restore the original image
     * @type method DisplayObjects
     * @description restore the original image
     * @example myObject.restore();
     * @returns {undefined} doneimage booleane
     * @see text
     * @link text
     */
    restore: function() {
        this.doneimage = false;
    },
    /**
     * setCrop - DisplayObjects - crop the image or clip
     * @type method DisplayObjects
     * @description crop the image or clip
     * @param {object} args an object list of point for display just a section of the image; {dx:0,dy:0,dw:100,dh:100}
     * @example myObject.setCrop({dx:0,dy:0,dw:100,dh:100});
     * @returns {unresolved} none none
     * @see text
     * @link text
     */
    setCrop: function(args) {
        if (!args) {
            return;
        }
        for (var i in this.imageCrop) {
            this.imageCrop[i] = args[i] ? args[i] : this.imageCrop[i];
        }
        this.size.set([this.imageCrop.dw,this.imageCrop.dh]);
        this.doneimage = false;
    },
    roulette: function(stator, rotor, rotorOffset, multyplier, step, rType) {
        var step = (step / 360) * (Math.PI * 2),
            x, y, theta = 0,
            i = 0,
            p = [];
        var R = stator * multyplier;
        var r = rotor * multyplier;
        var d = rotorOffset * multyplier;
        while (i <= 360 / step * rotor) {
            if (rType === 'Epicycloid') {
                x = (R + r) * Math.cos(theta) - r * Math.cos((R + r) / r * theta);
                y = (R + r) * Math.sin(theta) - r * Math.sin((R + r) / r * theta);
            }
            if (rType === 'Epitrochoid') {
                x = (R + r) * Math.cos(theta) - d * Math.cos((R + r) / r * theta);
                y = (R + r) * Math.sin(theta) - d * Math.sin((R + r) / r * theta);
            }
            if (rType === 'Hypocycloid') {
                x = (R - r) * Math.cos(theta) + r * Math.cos((R - r) / r * theta);
                y = (R - r) * Math.sin(theta) - r * Math.sin((R - r) / r * theta);
            }
            if (rType === 'Hypotrochoid') {
                x = (R - r) * Math.cos(theta) + d * Math.cos((R - r) / r * theta);
                y = (R - r) * Math.sin(theta) - d * Math.sin((R - r) / r * theta);
            }
            theta += step;
            i++;
            p.push([x, y]);
        }
        return p;
    },
    /**
     * filter - displayObjects - apply a filter to the image
     * @type method filter
     * @description apply a filter to the image
     * @param {string} type the filter type; hsl, invert, grayscale, pixelated
     * @param {array} args list of rgb color [...,...,...]
     * @example myObject.filter('hsl',[250,100,50]);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    filter: function(type, args) {
        if (this.backUpImage) {
            this.imageData = this.backUpImage;
        }
        var c = document.createElement("canvas");
        c.width = this.size.x;
        c.height = this.size.y;
        var cx = c.getContext("2d");
        cx.drawImage(this.imageData, 0, 0, this.size.x, this.size.y);
        var data = cx.getImageData(0, 0, this.size.x, this.size.y);
        switch (type) {
            case "invert":
                data = this._filterInvert(data);
                this.currentFilter = "invert";
                break;
            case "grayscale":
                data = this._filterGrayscale(data);
                this.currentFilter = "grayscale";
                break;
            case "hsl":
                data = this._filterHsl(data, args);
                this.currentFilter = "hsl";
                break;
            case "pixelated":
                data = this._filterPixelated(data, args, c);
                this.currentFilter = "pixelated";
                break;
            case "cut":
                var range = args[1];
                args = args.length === 4 ? args : this.clr._fromStringToArrayRgb(args[0]);
                data = this._filterCut(data, args, range);
                this.currentFilter = "cut";
                break;
            default:
                this.currentFilter = null;
                break;
        }
        cx.putImageData(data, 0, 0);
        this.imageData = c;
        this.parent.draw();
    },
    _filterPixelated: function(data, args, c) {
        var d = data.data;
        var value = args ? args[0] < 2 ? 2 : args[0] : 2;
        for (var y = 0; y < c.height; y += value) {
            for (var x = 0; x < c.width; x += value) {
                var r = d[((c.width * y) + x) * 4];
                var g = d[((c.width * y) + x) * 4 + 1];
                var b = d[((c.width * y) + x) * 4 + 2];
                for (var n = 0; n < value; n++) {
                    for (var m = 0; m < value; m++) {
                        if (x + m < c.width) {
                            d[((c.width * (y + n)) + (x + m)) * 4] = r;
                            d[((c.width * (y + n)) + (x + m)) * 4 + 1] = g;
                            d[((c.width * (y + n)) + (x + m)) * 4 + 2] = b;
                        }
                    }
                }
            }
        }
        return data;
    },
    _filterGrayscale: function(data) {
        var d = data.data;
        for (let i = 0; i < d.length; i += 4) {
            var br = 0.34 * d[i] + 0.5 * d[i + 1] + 0.16 * d[i + 2];
            d[i] = br; //red
            d[i + 1] = br; //green
            d[i + 2] = br; //blue
        }
        return data;
    },
    _filterInvert: function(data) {
        var d = data.data;
        for (let i = 0; i < d.length; i += 4) {
            d[i] = 255 - d[i]; //red
            d[i + 1] = 255 - d[i + 1]; //green
            d[i + 2] = 255 - d[i + 2]; //blue
        }
        return data;
    },
    _filterCut: function(data, args, r) {
        var d = data.data,
            t = 0;

        function raise(a, b, c) {
            //return (c >= a - b) && (c <= a + b) ? true : false;
            return (c >= a - b) && (c <= a + b) ? Math.floor(255 * Math.abs((a - c) / r)) : 255;
        }
        for (let i = 0; i < d.length; i += 4) {
            //d[i + 3] = (d[i] + d[i + 1] + d[i + 2]) >= (args * 3) ? 0 : d[i + 3]; //alpha
            //d[i + 3] = raise(d[i], r, args[0]) && raise(d[i + 1], r, args[1]) && raise(d[i + 2], r, args[2]) ? 0 : d[i + 3]; //alpha
            t = raise(d[i], r, args[0]) + raise(d[i + 1], r, args[1]) + raise(d[i + 2], r, args[2]);
            d[i + 3] = Math.floor(t / 3);
        }
        return data;
    },
    _filterHsl: function(data, args) {
        var d = data.data;
        for (let i = 0; i < d.length; i += 4) {
            var hsl = this.clr._rgbToHsl([d[i], d[i + 1], d[i + 2]]);
            var h = (hsl[0]+args[0])%360;
            var s = (hsl[1]+args[1])%360;
            var l = (hsl[2]+args[2])%360;
            var rgb = this.clr._hslToRgb([h, s, l]);
            // console.log(rgb);
            d[i] = rgb[0]; //red
            d[i + 1] = rgb[1]; //green
            d[i + 2] = rgb[2]; //blue
        }
        return data;
    },
    /**
     * loadImage - DisplayObjects - manage the loading process of images
     * @type method loadImage
     * @description manage the loading process of images
     * @param {mixed} source img DOM Element or string url
     * @param {function} progressaction the function to execute during the progress loading
     * @param {function} completeaction the function to execute when the loading is completed
     * @param {boolean} show determin if show the loaded image just after the completed process
     * @example myObject.loadImage(myObject.source,progress function, complete function,true);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    loadImage: function(source, progressaction, completeaction, show) {
        this._progressEvent = progressaction;
        this._completeEvent = completeaction;
        this.source = source ? source : this.source;
        if (typeof this.source === 'object') {
            this.image = this.source;
            this.size.set([this.image.width,this.image.height])
            // this.width = this.image.width;
            // this.height = this.image.height;
            this.isLoading = false;
            this.loadComplete = true;
            if (this.type === 'clip') {
                this._setFrames(show);
            } else {
                if (this._completeEvent) {
                    this._completeEvent.apply(this, [this]);
                }
                if (show && this.parent) {
                    this.draw(this.parent.ctx);
                }
            }
        } else {
            this._load(show);
        }
    },
    _load: function(show) {
        var nav = navigator.userAgent.toLowerCase();
        var b = /msie\s\d+\.\d+/;
        // console.log(b.test(nav));
        if (b.test(nav)) {
            var img = new Image();
            img['caller'] = this;
            img['show'] = show;
            this._loadStart();
            img.addEventListener("load", this._loadComplete, false);
            img.src = this.source;
        } else {
            var request = new XMLHttpRequest();
            request['caller'] = this;
            request['show'] = show;
            request.onloadstart = this._loadStart;
            request.onprogress = this._loadProgress;
            request.onload = this._loadComplete;
            request.open("GET", this.source, true);
            request.overrideMimeType('text/plain; charset=x-user-defined');
            request.send(null);
        }
    },
    _loadStart: function() {
        this.loadComplete = false;
        // console.log('load start');
    },
    _loadProgress: function(e) {
        // console.log('load progress');
        if (this.caller._progressEvent) {
            this.caller._progressEvent.apply(this.caller, [e]);
        }
        this.caller.isLoading = true;
        this.caller.loadComplete = false;
    },
    _loadComplete: function(e) {
        // console.log('load complete');
        var nav = navigator.userAgent.toLowerCase();
        var b = /msie\s\d+\.\d+/;
        if (b.test(nav)) {
            this.caller.image = this;
            this.caller.width = this.caller.image.width;
            this.caller.height = this.caller.image.height;
            this.caller.isLoading = false;
            this.caller.loadComplete = true;
            if (this.caller.type === 'clip') {
                this.caller._setFrames(this.show);
            } else {
                if (this.caller._completeEvent) {
                    this.caller._completeEvent.apply(this.caller, [this.caller]);
                }
                if (this.show && this.caller.parent) {
                    this.caller.draw(this.caller.parent.ctx);
                }
            }
        } else {
            this.caller._base64Encode(this.responseText, this.caller, this.show);
        }

    },
    // This encoding function is from Philippe Tenenhaus's example at http://www.philten.com/us-xmlhttprequest-image/
    _base64Encode: function(inputStr, caller, show) {
        // console.log('base 64');
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var outputStr = "";
        var i = 0;

        while (i < inputStr.length) {
            //all three "& 0xff" added below are there to fix a known bug 
            //with bytes returned by xhr.responseText
            var byte1 = inputStr.charCodeAt(i++) & 0xff;
            var byte2 = inputStr.charCodeAt(i++) & 0xff;
            var byte3 = inputStr.charCodeAt(i++) & 0xff;

            var enc1 = byte1 >> 2;
            var enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);

            var enc3, enc4;
            if (isNaN(byte2)) {
                enc3 = enc4 = 64;
            } else {
                enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
                if (isNaN(byte3)) {
                    enc4 = 64;
                } else {
                    enc4 = byte3 & 63;
                }
            }
            outputStr += b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
            var ok = i < inputStr.length ? false : true;
            stop(ok);
        }

        function stop(ok) {
            if (ok) {
                var img = new Image();
                img.onload = function() {
                    caller.image = img;
                    caller.size.set([caller.image.width,caller.image.height]);
                    caller.isLoading = false;
                    caller.loadComplete = true;
                    if (caller.type === 'clip') {
                        caller._setFrames(show);
                    } else {
                        if (caller._completeEvent) {
                            caller._completeEvent.apply(caller, [caller]);
                        }
                        if (show && caller.parent) {
                            caller.draw(caller.parent.ctx);
                        }
                    }
                };
                var type = caller.source.split('.');
                var t = type[type.length - 1] === 'jpg' ? 'jpeg' : type[type.length - 1];
                img.src = "data:image/" + t + ";base64," + outputStr;
            }
        }
    },
    /**
     *_setFrames - DisplayObjects INTERNAL ONLY
     * @param {boolean} show dethermin if the image as to be shown as soon as ready
     */
    _setFrames: function(show) {
        if (!this.frameList || this.type !== 'clip') {
            return;
        }
        var c = document.createElement('canvas');
        var ctx, i, data;
        var that = this;

        function lo() {
            that.frameList[this.indice].data = this;
            if (this.indice === that.frameList.length - 1) {
                if (that._completeEvent) {
                    that._completeEvent.apply(that, [that]);
                }
                if (show && that.parent) {
                    that.draw(that.parent.ctx);
                }
            }
        }
        for (i = 0; i < this.frameList.length; i++) {
            c.width = this.frameList[i].map.width;
            c.height = this.frameList[i].map.height;
            this.width = this.frameList[i].map.width;
            this.height = this.frameList[i].map.height;
            ctx = c.getContext('2d');
            ctx.drawImage(this.image, this.frameList[i].map.x, this.frameList[i].map.y, c.width, c.height, 0, 0, c.width, c.height);
            data = c.toDataURL('image/png');
            var image = new Image();
            image['indice'] = i;
            image.onload = lo;
            image.src = data;
            ctx.clearRect(0, 0, c.width, c.height);
        }
    },
    /**
     *_setStyle - DisplayObjects INTERNAL ONLY - set the constructor style
     * @param {color} color { a color as array rgb hex string or name }
     * @param linecolor { a color as array rgb or hex string or name }
     * @param linewidth { the width of the stroke }
     * @param linecap { string - 'butt' or 'round' or 'square' - default 'butt' }
     * @param linejoin {strin - 'bevel' or 'round' or 'miter' - default 'miter' }
     * @param miterlimit { number - default 10 }
     */
    _setStyle: function(color, linecolor, linewidth, linecap, linejoin, miterlimit) {
        this.color = this.clr._parseC(color);
        this.lineColor = this.clr._parseC(linecolor);
        this.lineCap = (this._capList[linecap]) ? linecap : 'butt';
        this.lineJoin = (this._joinList[linejoin]) ? linejoin : 'miter';
        this.lineWidth = (linewidth) ? linewidth : 1.0;
        this.lineMiter = parseInt(miterlimit) ? parseInt(miterlimit) : 10;
    },
    /**
     *_setLineStyle - DisplayObjects INTERNAL ONLY - set the line style when drawning
     * @param {context} ctx
     */
    _setLineStyle: function(ctx) {
        if (this.lineGradient) {
            if (this.lineShadow) {
                ctx.save();
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = this.lineCap;
                ctx.lineJoin = this.lineJoin;
                ctx.miterLimit = this.lineMiter;
                ctx.shadowColor = this.clr._parseC(this.lineShadow.color);
                ctx.shadowOffsetX = this.lineShadow.offsetX;
                ctx.shadowOffsetY = this.lineShadow.offsetY;
                ctx.shadowBlur = this.lineShadow.blur;
                this._setLineGradient(ctx);
                ctx.restore();
            } else {
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = this.lineCap;
                ctx.lineJoin = this.lineJoin;
                ctx.miterLimit = this.lineMiter;
                this._setLineGradient(ctx);
            }
        } else {
            if (this.lineShadow) {
                ctx.save();
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = this.lineCap;
                ctx.lineJoin = this.lineJoin;
                ctx.miterLimit = this.lineMiter;
                ctx.shadowColor = this.clr._parseC(this.lineShadow.color);
                ctx.shadowOffsetX = this.lineShadow.offsetX;
                ctx.shadowOffsetY = this.lineShadow.offsetY;
                ctx.shadowBlur = this.lineShadow.blur;
                if (this.lineColor) {
                    ctx.globalAlpha = this._g.lineAlpha;
                    ctx.strokeStyle = this.clr._parseC(this.lineColor);
                    ctx.stroke();
                }
                ctx.restore();
            } else {
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = this.lineCap;
                ctx.lineJoin = this.lineJoin;
                ctx.miterLimit = this.lineMiter;
                if (this.lineColor) {
                    ctx.globalAlpha = this._g.lineAlpha;
                    ctx.strokeStyle = this.clr._parseC(this.lineColor);
                    ctx.stroke();
                }
            }
        }
    },
    /**
     *_setFillStyle - DisplayObjects INTERNAL ONLY - set the fill style when drawning
     * @param {context} ctx
     */
    _setFillStyle: function(ctx) {
        if (this.gradient) {
            if (this.shadow) {
                ctx.save();
                ctx.shadowColor = this.clr._parseC(this.shadow.color);
                ctx.shadowOffsetX = this.shadow.offsetX;
                ctx.shadowOffsetY = this.shadow.offsetY;
                ctx.shadowBlur = this.shadow.blur;
                this._setGradient(ctx);
                ctx.restore();
            } else {
                this._setGradient(ctx);
            }

        } else {
            if (this.shadow) {
                ctx.save();
                ctx.shadowColor = this.clr._parseC(this.shadow.color);
                ctx.shadowOffsetX = this.shadow.offsetX;
                ctx.shadowOffsetY = this.shadow.offsetY;
                ctx.shadowBlur = this.shadow.blur;
                if (this.color) {
                    ctx.fillStyle = this.clr._parseC(this.color);
                    ctx.fill();
                }
                ctx.restore();
            } else {
                if (this.color) {
                    ctx.fillStyle = this.clr._parseC(this.color);
                    ctx.fill();
                }
            }
        }
    },
    /**
     *_setFont - DisplayObjects INTERNAL ONLY - set the constructor text fonts properties
     * @param fontweight { string - font weigth 'bold', 'italic', 'normal' etc.. - default 'normal' }
     * @param fontsize { number - font width in pixel - default 10 }
     * @param font { string - type font - default 'Verdana'}
     * @param align { string - 'start' or 'end' or 'left' or 'right' or 'center' - default 'start' }
     * @param base { string - 'top' or 'hanging' or 'middle' or 'alphabetic' or 'ideographic' or 'bottom' - default 'alphabetic' }
     */
    _setFont: function(fontweight, fontsize, font, align, base) {
        this.fontWeight = fontweight ? fontweight : this.fontWeight;
        this.fontStyle = this.fontWeight + ' ' + fontsize + 'px ' + font;
        this.fontType = font;
        this.fontSize = fontsize;
        this.align = (this._alignList[align]) ? align : 'center';
        this.baseLine = (this._baseList[base]) ? base : 'alphabetic';
    },
    /**
     *_setShadow - DisplayObjects INTERNAL ONLY - set the fill shadow style when drawning
     * @param {context} ctx
     */
    _setShadow: function(ctx) {
        if (this.shadow) {
            ctx.shadowColor = this.clr._parseC(this.shadow.color);
            ctx.shadowOffsetX = this.shadow.offsetX;
            ctx.shadowOffsetY = this.shadow.offsetY;
            ctx.shadowBlur = this.shadow.blur;
        }
    },
    /**
     *_setLineShadow - DisplayObjects INTERNAL ONLY - set the stroke shadow style when drawning
     * @param {context} ctx
     */
    _setLineShadow: function(ctx) {
        if (this.lineShadow) {
            ctx.shadowColor = this.clr._parseC(this.lineShadow.color);
            ctx.shadowOffsetX = this.lineShadow.offsetX;
            ctx.shadowOffsetY = this.lineShadow.offsetY;
            ctx.shadowBlur = this.lineShadow.blur;
        }
    },
    /**
     *_setGradient - DisplayObjects INTERNAL ONLY - set the fill gradient style when drawning
     * @example var linearGradient={'offset':[0,1],'color':[color,color],'type':'linear','coord':{'x0':0,'y0':0,'x1':30,'y1':30}};
     *var radialGradient={'offset':[0,1],'color':[color,color],'type':'radial','coord':{'x0':0,'y0':0,'r0':0,'x1':30,'y1':30,'r1':15}};
     *all REQUIRED
     *linear: two array with 'offset' number [0,1] and 'color' [color,color],
     *an object 'coord' { x0 y0 - stating point, x1 y1 - ending point }
     *for radial 'coord' { x0 y0 r0- stating point and radius, x1 y1 r1 - ending point and radius }
     * @param {context} ctx
     */
    _setGradient: function(ctx) {
        var gradient;
        var g = this.gradient;
        if (g.type === 'linear') {
            gradient = ctx.createLinearGradient(g.coord[0], g.coord[1], g.coord[2], g.coord[3]);
        } else if (g.type === 'radial') {
            gradient = ctx.createRadialGradient(g.coord[0], g.coord[1], g.coord[2], g.coord[3], g.coord[4], g.coord[5]);
        }
        for (let i = 0; i < g.color.length; i++) {
            gradient.addColorStop(g.offset[i], this.clr._parseC(g.color[i]));
        }
        ctx.fillStyle = gradient;
        ctx.fill();
    },
    /**
     *_setLineGradient - DisplayObjects INTERNAL ONLY - set the stroke gradient style when drawning
     * @example var linearGradient={'offset':[0,1],'color':[color,color],'type':'linear','coord':{'x0':0,'y0':0,'x1':30,'y1':30}};
     *var radialGradient={'offset':[0,1],'color':[color,color],'type':'radial','coord':{'x0':0,'y0':0,'r0':0,'x1':30,'y1':30,'r1':15}};
     *all REQUIRED
     *linear: two array with 'offset' number [0,1] and 'color' [color,color],
     *an object 'coord' { x0 y0 - stating point, x1 y1 - ending point }
     *for radial 'coord' { x0 y0 r0- stating point and radius, x1 y1 r1 - ending point and radius }
     * @param {context} ctx
     */
    _setLineGradient: function(ctx) {
        var gradient;
        var g = this.lineGradient;
        if (g.type === 'linear') {
            gradient = ctx.createLinearGradient(g.coord[0], g.coord[1], g.coord[2], g.coord[3]);
        } else if (g.type === 'radial') {
            gradient = ctx.createRadialGradient(g.coord[0], g.coord[1], g.coord[2], g.coord[3], g.coord[4], g.coord[5]);
        }
        for (let i = 0; i < g.color.length; i++) {
            gradient.addColorStop(g.offset[i], this.clr._parseC(g.color[i]));
        }
        ctx.stokeStyle = gradient;
        ctx.stroke();
    },
    /**
     *_drawRect - DisplayObjects INTERNAL ONLY -
     * @param {context} ctx
     * @param {context} buffer
     */
    _drawRect: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        ctx.rect(this.pivot.x, this.pivot.y, this.size.x, this.size.y);
        ctx.closePath();
        if (!buffer) {
            this._setFillStyle(ctx);
            this._setLineStyle(ctx);
        }
        ctx.restore();
        if (this.mask) {
            ctx.clip();
        }
    },
    /**
     *_drawRoundRect - DisplayObjects INTERNAL ONLY -
     * @param {context} ctx
     * @param {context} buffer
     */
    _drawRoundRect: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        ctx.moveTo(this.pivot.x+this.radius,this.pivot.y);
        ctx.lineTo(this.pivot.x+(this.size.x-this.radius),this.pivot.y);
        ctx.quadraticCurveTo(this.pivot.x+this.size.x,this.pivot.y,this.pivot.x+this.size.x,this.pivot.y+this.radius);
        ctx.lineTo(this.pivot.x+this.size.x,this.pivot.y+(this.size.y-this.radius));
        ctx.quadraticCurveTo(this.pivot.x+this.size.x,this.pivot.y+this.size.y,this.pivot.x+(this.size.x-this.radius),this.pivot.y+this.size.y);
        ctx.lineTo(this.pivot.x+this.radius,this.pivot.y+this.size.y);
        ctx.quadraticCurveTo(this.pivot.x,this.pivot.y+this.size.y,this.pivot.x,this.pivot.y+(this.size.y-this.radius));
        ctx.lineTo(this.pivot.x,this.pivot.y+this.radius);
        ctx.quadraticCurveTo(this.pivot.x,this.pivot.y,this.pivot.x+this.radius,this.pivot.y);
        ctx.closePath();
        if (!buffer) {
            this._setFillStyle(ctx);
            this._setLineStyle(ctx);
        }
        ctx.restore();
        if (this.mask) {
            ctx.clip();
        }
    },
    /**
     *_drawPolygon - DisplayObjects INTERNAL ONLY -
     * @param {context} ctx
     * @param {context} buffer
     */
    _drawPolygon: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        let bx=by=ax=ay=0;
        for (let i = 0; i < this.points.length; i++) {
            if (i === 0) {
                ctx.moveTo(this.pivot.x + this.points[i][0], this.pivot.y + this.points[i][1]);
            } else {
                ctx.lineTo(this.points[i][0] + this.pivot.x, this.points[i][1] + this.pivot.y);
            }
            bx=bx>=this.points[i][0]?this.points[i][0]:bx;
            by=by>=this.points[i][1]?this.points[i][1]:by;
            ax=ax<=this.points[i][0]?this.points[i][0]:ax;
            ay=ay<=this.points[i][1]?this.points[i][1]:ay;
        }
        if (this.close) {
            ctx.closePath();
        }
        if (!buffer) {
            this._setFillStyle(ctx);
            this._setLineStyle(ctx);
            this.size.set([Math.sqrt(Math.pow(bx - ax,2)),Math.sqrt(Math.pow(by - ay,2))]);
        }
        ctx.restore();
        if (this.mask) {
            ctx.clip();
        }
    },
    /**
     *_drawShape - DisplayObjects INTERNAL ONLY -
     * @param {context} ctx
     * @param {context} buffer
     */
    _drawShape: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        let bx=by=ax=ay=0;
        for (let i = 0; i < this.obj.length; i++) {
            for (var o in this.obj[i]) {
                var obj = this.obj[i][o];
                switch (o) {
                    case 'm':
                    case 'moveTo':
                        ctx.moveTo(this.pivot.x + obj[0], this.pivot.y + obj[1]);
                        bx=bx>=obj[0]?obj[0]:bx;
                        by=by>=obj[1]?obj[1]:by;
                        ax=ax<=obj[0]?obj[0]:ax;
                        ay=ay<=obj[1]?obj[1]:ay;
                        break;
                    case 'l':
                    case 'lineTo':
                        ctx.lineTo(this.pivot.x + obj[0], this.pivot.y + obj[1]);
                        bx=bx>=obj[0]?obj[0]:bx;
                        by=by>=obj[1]?obj[1]:by;
                        ax=ax<=obj[0]?obj[0]:ax;
                        ay=ay<=obj[1]?obj[1]:ay;
                        break;
                    case 'q':
                    case 'quadraticCurveTo':
                        ctx.quadraticCurveTo(this.pivot.x + obj[0], this.pivot.y + obj[1], this.pivot.x + obj[2], this.pivot.y + obj[3]);
                        bx=bx>=obj[0]?obj[0]:bx;
                        by=by>=obj[1]?obj[1]:by;
                        ax=ax<=obj[0]?obj[0]:ax;
                        ay=ay<=obj[1]?obj[1]:ay;
                        bx=bx>=obj[2]?obj[2]:bx;
                        by=by>=obj[3]?obj[3]:by;
                        ax=ax<=obj[2]?obj[2]:ax;
                        ay=ay<=obj[3]?obj[3]:ay;
                        break;
                    case 'c':
                    case 'bezierCurveTo':
                        ctx.bezierCurveTo(this.pivot.x + obj[0], this.pivot.y + obj[1], this.pivot.x + obj[2], this.pivot.y + obj[3], this.pivot.x + obj[4], this.pivot.y + obj[5]);
                        bx=bx>=obj[4]?obj[4]:bx;
                        by=by>=obj[5]?obj[5]:by;
                        ax=ax<=obj[4]?obj[4]:ax;
                        ay=ay<=obj[5]?obj[5]:ay;
                        break;
                    case 'a':
                    case 'arcTo':
                        console.log(o);
                        ctx.arcTo(this.pivot.x + obj[0], this.pivot.y + obj[1], this.pivot.x + obj[2], this.pivot.y + obj[3], obj[4]);
                        bx=bx>=obj[2]?obj[2]:bx;
                        by=by>=obj[3]?obj[3]:by;
                        ax=ax<=obj[2]?obj[2]:ax;
                        ay=ay<=obj[3]?obj[3]:ay;
                        break;
                    default:
                        break;
                }
            }
        }
        if (this.close) {
            ctx.closePath();
        }
        if (!buffer) {
            this._setFillStyle(ctx);
            this._setLineStyle(ctx);
            this.size.set([Math.sqrt(Math.pow(bx - ax,2)),Math.sqrt(Math.pow(by - ay,2))]);
        }
        ctx.restore();
        if (this.mask) {
            ctx.clip();
        }
    },
    /**
     *_drawLine - DisplayObjects INTERNAL ONLY -
     * @param {context} ctx
     * @param {context} buffer
     */
    _drawLine: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.closePath();
        this._setLineStyle(ctx);
        this.size.set([Math.sqrt(Math.pow(this.start.x - this.end.x,2)),Math.sqrt(Math.pow(this.start.y - this.end.y,2))]);
        this.len = this.start.distance(this.end);
        ctx.restore();
    },
    /**
     *_drawCircle - DisplayObjects INTERNAL ONLY -
     * @param {context} ctx
     * @param {context} buffer
     */
    _drawCircle: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        ctx.arc(this.pivot.x, this.pivot.y, this.radius, this.startAngle, this.endAngle, false);
        ctx.closePath();
        if (!buffer) {
            this._setFillStyle(ctx);
            this._setLineStyle(ctx);
        }
        ctx.restore();
        if (this.mask) {
            ctx.clip();
        }
        this.size.set(this.radius*2);
    },
    /**
     *_drawText - DisplayObjects INTERNAL ONLY -
     * @param {context} ctx
     * @param {context} buffer
     */
    _drawText: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        this.fontStyle = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontType;
        ctx.font = this.fontStyle;
        ctx.textAlign = this.align;
        ctx.textBaseline = this.baseLine;

        // var offsetY = this.height / 7;
        // var offsetX = 0;
        // switch (this.baseLine) {
        //     case 'top':
        //         offsetY = -(this.height / 7);
        //         break;
        //     case 'hanging':
        //         offsetY = -(this.height / 7);
        //         break;
        //     case 'middle':
        //         offsetY = (this.height / 7) * 3.5;
        //         break;
        //     case 'alphabetic':
        //         offsetY = (this.height / 7) * 5.8;
        //         break;
        //     case 'ideographic':
        //         offsetY = this.height;
        //         break;
        //     case 'bottom':
        //         offsetY = this.height;
        //         break;
        //     default:
        //         offsetY = 0;
        //         break;
        // }
        // Canvas2d.fakeCtx.font=this.fontStyle;
        // Canvas2d.fakeCtx.textAlign=this.align;
        // Canvas2d.fakeCtx.textBaseline=this.baseLine;
        // Canvas2d.fakeCtx.fillText(this.txt, this.pivot.x, this.pivot.y);
        let txtMatrix = ctx.measureText(this.txt);
        this.size.set([txtMatrix.actualBoundingBoxRight+txtMatrix.actualBoundingBoxLeft,txtMatrix.actualBoundingBoxAscent+txtMatrix.actualBoundingBoxDescent]);
        let offsetX=0,offsetY=0,yrate=this.size.y/12;
        if (this.align === 'center') {
            offsetX = this.size.divide(2,true).x;
        } else if (this.align === 'right' || this.align === 'end') {
            offsetX = this.size.x;
        }
        if (this.baseLine === 'hanging') {
            offsetY=this.size.y/(yrate*2);
        }else if (this.baseLine === 'middle') {
            offsetY=this.size.y/2;
        }else if (this.baseLine === 'alphabetic') {
            offsetY=this.size.y-(yrate*3);
        }else if (this.baseLine === 'ideographic') {
            offsetY=this.size.y-(yrate);
        }else if (this.baseLine === 'bottom') {
            offsetY=this.size.y;
        }else if (this.baseLine === 'top') {
            offsetY=-(yrate);
        }
        ctx.beginPath();
        ctx.rect((this.pivot.x - offsetX)- this.paddingLeft, (this.pivot.y - offsetY) - this.paddingTop, this.size.x + (this.paddingLeft * 2), this.size.y + (this.paddingTop * 2));
        // ctx.strokeStyle = this.clr._parseC('red');
        //             ctx.stroke();
        ctx.closePath();
        if (this.backGround) {
            if (!buffer) {
                if (this.backGround.color) {
                    ctx.fillStyle = this.clr._parseC(this.backGround.color);
                    ctx.fill();
                }
                if (this.backGround.lineColor) {
                    ctx.lineWidth = this.backGround.lineWidth ? this.backGround.lineWidth : 2;
                    ctx.strokeStyle = this.clr._parseC(this.backGround.lineColor);
                    ctx.stroke();
                }
            } else {
                ctx.fill();
            }
        }
        
        
        if (!buffer) {
            ctx.beginPath();
            if (this.color) {
                if (this.gradient) {
                    ctx.save();
                    if (this.shadow) {
                        this._setShadow(ctx);
                    }
                    this._setGradient(ctx);
                    ctx.fillText(this.txt, this.pivot.x, this.pivot.y);
                    ctx.restore();
                } else {
                    ctx.save();
                    if (this.shadow) {
                        this._setShadow(ctx);
                    }
                    ctx.fillStyle = this.clr._parseC(this.color);
                    ctx.fillText(this.txt, this.pivot.x, this.pivot.y);
                    ctx.restore();
                }
            }
            if (this.lineColor) {
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = this.lineCap;
                ctx.lineJoin = this.lineJoin;
                ctx.miterLimit = this.lineMiter;

                if (this.lineGradient) {
                    ctx.save();
                    if (this.lineShadow) {
                        this._setLineShadow(ctx);
                    }
                    this._setLineGradient(ctx);
                    ctx.strokeText(this.txt, this.pivot.x, this.pivot.y);
                    ctx.restore();
                } else {
                    ctx.save();
                    if (this.lineShadow) {
                        this._setLineShadow(ctx);
                    }
                    ctx.strokeStyle = this.clr._parseC(this.lineColor);
                    ctx.strokeText(this.txt, this.pivot.x, this.pivot.y);
                    ctx.restore();
                }
            }
            ctx.closePath();
        }
        ctx.restore();
        if (this.mask) {
            ctx.clip();
        }
    },
    /**
     *_drawImage - DisplayObjects INTERNAL ONLY -
     * @param {context} ctx
     * @param {context} buffer
     */
    _drawImage: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;

        if (this.loadComplete && this.image) {
            this.size.x = this.imageCrop.dw === -1 ? this.size.x : this.imageCrop.dw;
            this.size.y = this.imageCrop.dh === -1 ? this.size.y : this.imageCrop.dh;
            // this.size.set([w,h]);
            ctx.beginPath();
            ctx.rect(this.pivot.x - (this.paddingLeft), this.pivot.y - (this.paddingTop), this.size.x + (this.paddingLeft * 2), this.size.y + (this.paddingTop * 2));
            ctx.closePath();
            if (!buffer) {

                this._setFillStyle(ctx);
                this._setLineStyle(ctx);
                this._setShadow(ctx);
                ctx.beginPath();
                if (!this.doneimage) {
                    this.doneimage = true;
                    this.currentFilter = null;
                    var c = document.createElement("canvas");
                    c.width = this.size.x;
                    c.height = this.size.y;
                    var cx = c.getContext("2d");
                    cx.drawImage(this.image, this.imageCrop.dx, this.imageCrop.dy, this.size.x, this.size.y, 0, 0, this.size.x, this.size.y);
                    this.imageData = c;
                    this.backUpImage = c;

                }
                ctx.drawImage(this.imageData, this.pivot.x, this.pivot.y, this.size.x, this.size.y);
                ctx.closePath();
            }
        }
        ctx.restore();
    },
    /**
     *_drawClip - DisplayObjects INTERNAL ONLY -
     * @param {context} ctx
     * @param {context} buffer
     */
    _drawClip: function(ctx, buffer) {
        if (!this.frameList) {
            return;
        }
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        if (this.loadComplete && this.image && this.frameList[this.currentFrame].data) {
            ctx.beginPath();
            ctx.rect(this.pivot.x, this.pivot.y, this.frameList[this.currentFrame].map.width, this.frameList[this.currentFrame].map.height);
            this.size.set([this.frameList[this.currentFrame].map.width, this.frameList[this.currentFrame].map.height])
            ctx.closePath();
            if (!buffer) {
                this._setFillStyle(ctx);
                this._setLineStyle(ctx);
                this._setShadow(ctx);
                ctx.beginPath();
                ctx.drawImage(this.frameList[this.currentFrame].data, this.pivot.x + this.frameList[this.currentFrame].x, this.pivot.y + this.frameList[this.currentFrame].y);
                ctx.closePath();
            }
        }
        ctx.restore();
    },
    _global: function() {
        var g = this.parent._global();
        return {
            'x': this.position.x,
            'y': this.position.y,
            'scaleX': this.scale.x,
            'scaleY': this.scale.y,
            'rotation': g.rotation + this.rotation,
            'alpha': g.alpha < 1 ? this.alpha * g.alpha : this.alpha,
            'lineAlpha': g.alpha < 1 ? this.lineAlpha * g.alpha : this.lineAlpha,
            'visible': g.visible ? this.visible : false
        };
    },
    /**
     *draw - DisplayObjects - INTERNAL ONLY call instead myObject.parent.draw();
     * @type method DisplayObjects
     * @description INTERNAL ONLY call instead myObject.parent.draw();
     * @param {context 2d} ctx NOT REQUIRED
     * @param {boolean} buffer INTERNAL ONLY
     * @example myObject.parent.draw();
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    draw: function(ctx, buffer) {
        this._g = this._global();
        if (!this._g.visible) {
            return;
        }
        switch (this.type) {
            case "rect":
                this._drawRect(ctx, buffer);
                break;
            case "rectround":
                this._drawRoundRect(ctx, buffer);
                break;
            case "polygon":
                this._drawPolygon(ctx, buffer);
                break;
            case "shape":
                this._drawShape(ctx, buffer);
                break;
            case "line":
                this._drawLine(ctx, buffer);
                break;
            case "circle":
                this._drawCircle(ctx, buffer);
                break;
            case "text":
                this._drawText(ctx, buffer);
                break;
            case "img":
                this._drawImage(ctx, buffer);
                break;
            case "clip":
                this._drawClip(ctx, buffer);
                break;
            default:
                console.log("default displayObject");
                break;
        }
    }
};
/**
 * Point - container for vector operations
 * @type constructor Point
 * @description container for all type of DisplayObjects
 * @param {Point} x y vector, Point, Array, Number;
 * @example var p= new Canvas2d.Point(p);
 * @returns {Point Element} this
 * @see text
 * @link text
 */
Canvas2d.Point=function(p){
    this.x = 0;
    this.y = 0;
    if(this.isPoint(p)){
        this.x = p.x;
        this.y = p.y;
    }else if(p instanceof Array){
        this.x = p[0];
        this.y = p[1];
    }else if(typeof p === "number"){
        this.x = p;
        this.y = p;
    }
    return this;
};
Canvas2d.Point.prototype={
    /**
     * setX - Point - set x coordinate.
     * @type method Point
     * @description set x coordinate
     * @param {number} x horizontal coordinate
     * @example p.setX(x);
     * @returns {Point} this
 * @see text
 * @link text
     */
    setX: function(x) {
        this.x = x;
        return this;
    },
    /**
     * setY - Point - set y coordinate.
     * @type method Point
     * @description set y coordinate
     * @param {number} y horizontal coordinate
     * @example p.setY(y);
     * @returns {Point} this element
     */
    setY: function(y) {
        this.y = y;
        return this;
    },
    /**
     * set - Point - set x and y coordinates.
     * @type method Point
     * @description set x and y coordinates
     * @param {Point} x y vector, Point, Array, Number;
     * @example p.set(x,y);
     * @returns {Point} this
     */
    set: function(p) {
        if(this.isPoint(p)){
            this.x = p.x;
            this.y = p.y;
        }else if(p instanceof Array){
            this.x = p[0];
            this.y = p[1];
        }else if(typeof p === "number"){
            this.x = p;
            this.y = p;
        }
        return this;
    },
    random: function(max,round) {
        this.x = Math.random() * max;
        this.y = Math.random() * max;
        if (round !== null) {
            this.round(round);
        }
        return this;
    },
    /**
     * getPoint - Point - get a specific Point Element.
     * @type method Point
     * @description get a specific Point Element
     * @param {Point} p Point Element
     * @example p.getPoint(Point);
     * @returns {Point} this
     */
    getPoint: function (p) {
        return (p instanceof Canvas2d.Point)? p : new Canvas2d.Point();
    },
    /**
     * isPoint - Point - evaluate if is a Point.
     * @type method Point
     * @description evaluate if is a Point
     * @param {Point} p Point Element
     * @example p.isPoint(Point);
     * @returns {boolean} true or false
     */
    isPoint: function (p) {
        return (p instanceof Canvas2d.Point)? true : false;
    },
    /**
     * isEqual - Point - compare two Points for equality.
     * @type method Point
     * @description compare two Points for equality
     * @param {Point} p Point Element
     * @example p.isEqual(Point);
     * @returns {boolean} true or false
     */
    isEqual: function(p) {
        return (p.x === this.x && p.y === this.y);
    },
    /**
     * add - Point - add two Points.
     * @type method Point
     * @description add two Points
     * @param {Point} x y vector, Point, Array, Number;
     * @example p.add(Point,Point);
     * @returns {Point} this
     */
    add: function(p,n) {
        if(this.isPoint(p)){
            if (n) {return new Canvas2d.Point([this.x+p.x,this.y+p.y]);}
            this.x += p.x;
            this.y += p.y;
        }else if(p instanceof Array){
            if (n) {return new Canvas2d.Point([this.x+p[0],this.y+p[1]]);}
            this.x += p[0];
            this.y += p[1];
        }else if(typeof p === "number"){
            if (n) {return new Canvas2d.Point([this.x+p,this.y+p]);}
            this.x += p;
            this.y += p;
        }
        return this;
    },
    /**
     * subtract - Point - subtract two Points.
     * @type method Point
     * @description subtract two Points
     * @param {Point} x y vector, Point, Array, Number;
     * @example p.subtract(Point,Point);
     * @returns {Point} this
     */
    subtract: function(p,n) {
        if(this.isPoint(p)){
            if (n) {return new Canvas2d.Point([this.x-p.x,this.y-p.y]);}
            this.x -= p.x;
            this.y -= p.y;
        }else if(p instanceof Array){
            if (n) {return new Canvas2d.Point([this.x-p[0],this.y-p[1]]);}
            this.x -= p[0];
            this.y -= p[1];
        }else if(typeof p === "number"){
            if (n) {return new Canvas2d.Point([this.x-p,this.y-p]);}
            this.x -= p;
            this.y -= p;
        }
        return this;
    },
    /**
     * multiply - Point - multiply two Points.
     * @type method Point
     * @description multiply two Points
     * @param {Point} x y vector, Point, Array, Number;
     * @example p.multiply(Point,Point);
     * @returns {Point} this
     */
    multiply: function(p,n) {
        if(this.isPoint(p)){
            if (n) {return new Canvas2d.Point([this.x*p.x,this.y*p.y]);}
            this.x *= p.x;
            this.y *= p.y;
        }else if(p instanceof Array){
            if (n) {return new Canvas2d.Point([this.x*p[0],this.y*p[1]]);}
            this.x *= p[0];
            this.y *= p[1];
        }else if(typeof p === "number"){
            if (n) {return new Canvas2d.Point([this.x*p,this.y*p]);}
            this.x *= p;
            this.y *= p;
        }
        return this;
    },
    /**
     * divide - Point - divide two Points.
     * @type method Point
     * @description divide two Points
     * @param {Point} x y vector, Point, Array, Number;
     * @example p.divide(Point,Point);
     * @returns {Point} this
     */
    divide: function(p,n) {
        if(this.isPoint(p)){
            if (n) {return new Canvas2d.Point([this.x/p.x,this.y/p.y]);}
            this.x /= p.x;
            this.y /= p.y;
        }else if(p instanceof Array){
            if (n) {return new Canvas2d.Point([this.x/p[0],this.y/p[1]]);}
            this.x /= p[0];
            this.y /= p[1];
        }else if(typeof p === "number"){
            if (n) {return new Canvas2d.Point([this.x/p,this.y/p]);}
            this.x /= p;
            this.y /= p;
        }
        return this;
    },
    /**
     * length - Point - length between two points.
     * @type method Point
     * @description length between two points
     * @example p.length();
     * @returns {Number} length
     */
    length: function() {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    },
    /**
     * lengthSqrt - Point - lengthSqrt between two points.
     * @type method Point
     * @description lengthSqrt between two points
     * @example p.lengthSqrt();
     * @returns {Number} lengthSqrt
     */
    lengthSqrt: function() {
        return Math.pow(this.x,2) + Math.pow(this.y,2);
    },
    /**
     * normalize - Point - normalize vector.
     * @type method Point
     * @description normalize vector
     * @example p.normalize();
     * @returns {Point} this
     */
    normalize: function() {
        var length = this.length();
        if (length === 0) {
            this.x = 1;
            this.y = 0;
        } else {
            this.divide([length, length]);
        }
        return this;
    },
    /**
     * angle - Point - angle of a given Point.
     * @type method Point
     * @description angle of a given Point
     * @example p.angle();
     * @returns {Number} angle
     */
    angle: function () {
        return Math.atan2(this.y,this.x);
    },
    /**
     * angleCross - Point - angleCross between two points.
     * @type method Point
     * @description angleCross between two points
     * @param {Point} p Point Element
     * @example p.angleCross(p);
     * @returns {Number} angleCross
     */
    angleCross: function (p) {
        return Math.atan2(p.y-this.y,p.x-this.x);
    },
    /**
     * distance - Point - distance between two points.
     * @type method Point
     * @description distance between two points
     * @param {Point} p Point Element
     * @example p.distance(p);
     * @returns {Number} distance
     */
    distance: function (p) {
        return Math.sqrt(Math.pow(this.x - p.x,2) + Math.pow(this.y - p.y,2));
    },
    /**
     * dot - Point - dot product between two points.
     * @type method Point
     * @description dot product between two points
     * @param {Point} p Point Element
     * @example p.dot(p);
     * @returns {Number} dot
     */
    dot: function(p) {
        return (p.x * this.x) + (p.y * this.y);
    },
    /**
     * cross - Point - cross product between two points.
     * @type method Point
     * @description cross product between two points
     * @param {Point} p Point Element
     * @example p.cross(p);
     * @returns {Number} cross
     */
    cross: function(p) {
        return ((this.x * p.y) - (this.y * p.x));
    },
    /**
     * abs - Point - abs convert Point to positive.
     * @type method Point
     * @description abs convert Point to positive
     * @example p.abs();
     * @returns {Point} this
     */
    abs: function() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    },
    /**
     * getQuadrant - Point - getQuadrant as 0,1,2,3.
     * @type method Point
     * @description getQuadrant as 0,1,2,3
     * @example p.getQuadrant();
     * @returns {Number} getQuadrant
     */
    getQuadrant: function() {
        return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
    },
    _precision: [1,10,100,1000,10000,100000,1000000,10000000,100000000,1000000000,10000000000],
    /**
     * round - Point - round a Point to a specific degree of precision.
     * @type method Point
     * @description round a Point to a specific degree of precision
     * @param {number} n Array Index
     * @example p.round(n); n > 0 < 10
     * @returns {Point} this
     */
    round: function(n) {
        if (n === 0) {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this;
        }
        n = n || 2;
        var p = this._precision[n];
        this.x = ((0.5 + (this.x * p)) << 0) / p;
        this.y = ((0.5 + (this.y * p)) << 0) / p;
        return this;
    },
    /**
     * toRad - Point - toRad convert degrees angle to radians.
     * @type method Point
     * @description toRad convert degrees angle to radians
     * @param {number} deg 0 to 360
     * @example p.toRad(deg);
     * @returns {Number} toRad
     */
    toRad: function(deg) {
        return deg * 180 / Math.PI;
    },
    /**
     * toDeg - Point - toDeg convert radians angle to degree.
     * @type method Point
     * @description toDeg convert radians angle to degree
     * @param {number} deg 0 to 360
     * @example p.toDeg(deg);
     * @returns {Number} toDeg
     */
    toDeg: function(rad) {
        return rad / Math.PI * 180;
    },
    /**
     * rotate - Point - rotate vecotr to radians.
     * @type method Point
     * @description rotate vecotr to radians
     * @param {number} rad 0 to PI*2
     * @example p.rotate(Math.PI/2);
     * @returns {Point} this
     */
    rotate: function (a) {
        this.x = (this.x * Math.cos(a)) - (this.y * Math.sin(a));
        this.y = (this.x * Math.sin(a)) + (this.y * Math.cos(a));
        return this;
    }
};
/**
 * Tweener - Canvas2d prototype
 * @type constructor Tweener
 * @description create a tweener object that animate a certain property through time
 * @property {array} children list of nested objects
 * @property {object element} parent parent child
 * @example var myTween=new Canvas2d.Tweener();
 * @returns {void} Tweener current tweening object
 * @see text
 * @link text
 */
Canvas2d.Tweener = function() {
    this.className = 'Tweener';
    this.children = {};
    this._tempChildren = {};
    this.charList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '"', '\'', ',', ':', ';', '(', ')', '[', ']', '{', '}', '*', '@', '.', '!', '?', '\\', '/', '<', '>', '#', '+', '-', '_', '=', '^', 'ì', 'è', 'é', 'ò', 'à', 'ù', '&', '$', '£', '|', '∞', '°', 'ç'];
    this.clr = new Canvas2d.Colors();
};
Canvas2d.Tweener.prototype = {
    /**
     * getFrame - Tweener - get the current increasing number of frame fired
     * @type method Tweener
     * @description get the current increasing number of frame fired.
     * @example myTween.getFrame();
     * @returns {number} frame number of frame executed
     * @see text
     * @link text
     */
    getFrame: function() {
        return window[Canvas2d.wn + 'rqanim'].getFrame();
    },
    /**
     * getTime - Tweener - get the current increasing number of millisecond
     * @type method Tweener
     * @description get the current increasing number of millisecond
     * @example myTween.getTime();
     * @returns {number} time millisecons
     * @see text
     * @link text
     */
    getTime: function() {
        return window[Canvas2d.wn + 'rqanim'].getTime();
    },
    /**
     *getFps - Tweener - get the current number of frame per seconds
     * @type method Tweener
     * @description get the current number of frame per seconds
     * @example myTween.getFps();
     * @returns {number} fps frame per seconds
     * @see text
     * @link text
     */
    getFps: function() {
        return window[Canvas2d.wn + 'rqanim'].getFps();
    },
    /**
     * getTimeInterval - Tweener - get the actual delay in millisecond between cicle loops
     * @type method Tweener
     * @description get the actual delay in millisecond between cicle loops
     * @example myTween.getTimeInterval();
     * @returns {number} float milliseconds
     * @see text
     * @link text
     */
    getTimeInterval: function() {
        return window[Canvas2d.wn + 'rqanim'].getTimeInterval();
    },
    /**
     * addTweener - Tweener - Add an objects with parameter to be transitioned
     * @type method Tweener
     * @description add an objects with parameters to be translated in time
     * @param {object} o a Layer or DisplayObjects element
     * @param {object} args a list of parameter
     * @example myTween.addTweener(myObject,{params:values,...,duration:milliseconds,ease:easeType});
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    addTweener: function(o, args) {
        if (o.parent === null || o.parent === undefined) {
            console.log(typeof o.parent, 'provide a nested object');
            return;
        }
        var twnobj = {};
        var properties = ['rotation', 'lineWidth', 'fontSize', 'radius', 'startAngle', 'endAngle'];
        var x, colorReq, r, g, b, rqAlpha, rqlineAlpha, alpha, lineAlpha, colorSrc, data = args.data ? args.data : null;
        var delay = args['delay'] ? args['delay'] : 0;
        var ease = args['ease'] ? args['ease'] : 'easeNone';
        var duration = args['duration'] ? args['duration'] : 1000;
        for (var i in args) {
            for (var n = 0; n < properties.length; n++) {
                if (i === properties[n]) {
                    x = (args[i] > o[i]) ? args[i] - o[i] : -(o[i] - args[i]);
                    twnobj[i] = {
                        ease: ease,
                        to: x,
                        ct: 0,
                        d: duration,
                        from: o[i],
                        prop: i,
                        request: args[i],
                        target: o
                    };
                }
            }
        }
        if ('pivot' in args) {
            var x,y;
            if (o.pivot.isPoint(args['pivot'])) {
                x=args['pivot'].x;
                y=args['pivot'].y;
            }else if(args['pivot'] instanceof Array){
                x = args['pivot'][0];
                y = args['pivot'][1];
            }else if(typeof args['pivot'] === "number"){
                x = args['pivot'];
                y = args['pivot'];
            }
            twnobj['point'] = {
                ease: ease,
                tox: (x>o.pivot.x?x-o.pivot.x:-(o.pivot.x-x)),
                toy: (y>o.pivot.y?y-o.pivot.y:-(o.pivot.y-y)),
                ct: 0,
                d: duration,
                fromx: o.pivot.x,
                fromy: o.pivot.y,
                prop: 'pivot',
                request: 'pivot',
                target: o
            };
        }
        if ('size' in args) {
            var x,y;
            if (o.size.isPoint(args['size'])) {
                x=args['size'].x;
                y=args['size'].y;
            }else if(args['size'] instanceof Array){
                x = args['size'][0];
                y = args['size'][1];
            }else if(typeof args['size'] === "number"){
                x = args['size'];
                y = args['size'];
            }
            twnobj['point'] = {
                ease: ease,
                tox: (x>o.size.x?x-o.size.x:-(o.size.x-x)),
                toy: (y>o.size.y?y-o.size.y:-(o.size.y-y)),
                ct: 0,
                d: duration,
                fromx: o.size.x,
                fromy: o.size.y,
                prop: 'size',
                request: 'size',
                target: o
            };
        }
        if ('scale' in args) {console.log(args);
            var x,y;
            if (o.scale.isPoint(args['scale'])) {
                x=args['scale'].x;
                y=args['scale'].y;
            }else if(args['scale'] instanceof Array){
                x = args['scale'][0];
                y = args['scale'][1];
            }else if(typeof args['scale'] === "number"){
                x = args['scale'];
                y = args['scale'];
            }
            twnobj['point'] = {
                ease: ease,
                tox: (x>o.scale.x?x-o.scale.x:-(o.scale.x-x)),
                toy: (y>o.scale.y?y-o.scale.y:-(o.scale.y-y)),
                ct: 0,
                d: duration,
                fromx: o.scale.x,
                fromy: o.scale.y,
                prop: 'scale',
                request: 'scale',
                target: o
            };
        }
        if ('position' in args) {
            var x,y;
            if (o.position.isPoint(args['position'])) {
                x=args['position'].x;
                y=args['position'].y;
            }else if(args['position'] instanceof Array){
                x = args['position'][0];
                y = args['position'][1];
            }else if(typeof args['position'] === "number"){
                x = args['position'];
                y = args['position'];
            }
            twnobj['point'] = {
                ease: ease,
                tox: (x>o.position.x?x-o.position.x:-(o.position.x-x)),
                toy: (y>o.position.y?y-o.position.y:-(o.position.y-y)),
                ct: 0,
                d: duration,
                fromx: o.position.x,
                fromy: o.position.y,
                prop: 'position',
                request: 'position',
                target: o
            };
        }
        if ('obj' in args) {
            if (!o['obj']) {
                return;
            }
            twnobj['obj'] = {
                ease: ease,
                to: [],
                ct: 0,
                d: duration,
                from: [],
                prop: 'obj',
                subprop: [],
                index: [],
                request: [],
                target: o
            };
            for (var io in args['obj']) {

                for (var obje in args['obj'][io]) {
                    for (var ele = 0; ele < args['obj'][io][obje].length; ele++) {
                        twnobj['obj'].index.push(parseInt(io));
                        twnobj['obj'].request.push(args['obj'][io][obje][ele]);
                        twnobj['obj'].from.push(o['obj'][io][obje][ele]);
                        x = (args['obj'][io][obje][ele] > o['obj'][io][obje][ele]) ? args['obj'][io][obje][ele] - o['obj'][io][obje][ele] : -(o['obj'][io][obje][ele] - args['obj'][io][obje][ele]);
                        twnobj['obj'].to.push(x);
                        twnobj['obj'].subprop.push(obje);
                    }
                }
            }
        }
        if ('txt' in args) {
            if (o['txt'] === '')
                return;
            args.txt = args.txt !== '' ? args.txt : 'cutFwd';
            r = [];
            var d = [];
            g = o['txt'];
            for (i = 0; i < this.charList.length; i++) {
                d.push(this.charList[i]);
            }
            d = this._shuffle(d);
            for (i = 0; i < g.length; i++) {
                for (x = 0; x < d.length; x++) {
                    if (g.charAt(i) === d[x]) {
                        r.push(x);
                        break;
                    }
                }
            }
            twnobj['txt'] = {
                ease: ease,
                to: g.length,
                ct: 0,
                d: duration,
                from: 0,
                prop: 'txt',
                subprop: r,
                request: '',
                target: o,
                text: o.txt,
                type: args.txt,
                charlist: d
            };
            o._prevTxt = o.txt;
            o.txt = '';
        }
        if ('shadow' in args) {
            if (!o['shadow']) {
                return;
            }
            twnobj['shadow'] = {
                ease: ease,
                to: [],
                ct: 0,
                d: duration,
                from: [],
                prop: 'shadow',
                subprop: [],
                request: [],
                target: o
            };
            for (var io in args['shadow']) {
                if (io === "color") {
                    colorReq = this.clr._fromStringToArrayRgb(args['shadow'][io]);
                    colorSrc = this.clr._fromStringToArrayRgb(o['shadow'][io]);
                    r = colorReq[0] - colorSrc[0];
                    g = colorReq[1] - colorSrc[1];
                    b = colorReq[2] - colorSrc[2];

                    twnobj['shadow'].to.push([r, g, b]);
                    twnobj['shadow'].from.push([colorSrc[0], colorSrc[1], colorSrc[2]]);
                    twnobj['shadow'].subprop.push(io);
                    twnobj['shadow'].request.push(args['shadow'][io]);
                } else {
                    x = (args['shadow'][io] > o['shadow'][io]) ? args['shadow'][io] - o['shadow'][io] : -(o['shadow'][io] - args['shadow'][io]);
                    twnobj['shadow'].to.push(x);
                    twnobj['shadow'].from.push(o['shadow'][io]);
                    twnobj['shadow'].subprop.push(io);
                    twnobj['shadow'].request.push(args['shadow'][io]);
                }
            }
        }
        if ('lineShadow' in args) {
            if (!o['lineShadow']) {
                return;
            }
            twnobj['lineShadow'] = {
                ease: ease,
                to: [],
                ct: 0,
                d: duration,
                from: [],
                prop: 'lineShadow',
                subprop: [],
                request: [],
                target: o
            };
            for (var oi in args['lineShadow']) {
                if (oi === "color") {
                    colorReq = this.clr._fromStringToArrayRgb(args['lineShadow'][oi]);
                    colorSrc = this.clr._fromStringToArrayRgb(o['lineShadow'][oi]);
                    r = colorReq[0] - colorSrc[0];
                    g = colorReq[1] - colorSrc[1];
                    b = colorReq[2] - colorSrc[2];

                    twnobj['lineShadow'].to.push([r, g, b]);
                    twnobj['lineShadow'].from.push([colorSrc[0], colorSrc[1], colorSrc[2]]);
                    twnobj['lineShadow'].subprop.push(oi);
                    twnobj['lineShadow'].request.push(args['lineShadow'][oi]);
                } else {
                    x = (args['lineShadow'][oi] > o['lineShadow'][oi]) ? args['lineShadow'][oi] - o['lineShadow'][oi] : -(o['lineShadow'][oi] - args['lineShadow'][oi]);
                    twnobj['lineShadow'].to.push(x);
                    twnobj['lineShadow'].from.push(o['lineShadow'][oi]);
                    twnobj['lineShadow'].subprop.push(oi);
                    twnobj['lineShadow'].request.push(args['lineShadow'][oi]);
                }
            }
        }
        if ('color' in args) {
            colorReq = this.clr._fromStringToArrayRgb(args['color']);
            colorSrc = this.clr._fromStringToArrayRgb(o.color);
            r = colorReq[0] - colorSrc[0];
            g = colorReq[1] - colorSrc[1];
            b = colorReq[2] - colorSrc[2];
            twnobj['rgb'] = {
                ease: ease,
                tor: r,
                tog: g,
                tob: b,
                ct: 0,
                d: duration,
                fromr: colorSrc[0],
                fromg: colorSrc[1],
                fromb: colorSrc[2],
                prop: 'color',
                request: colorReq,
                target: o
            };
        }
        if ('lineColor' in args) {
            colorReq = this.clr._fromStringToArrayRgb(args['lineColor']);
            colorSrc = this.clr._fromStringToArrayRgb(o.lineColor);
            r = colorReq[0] - colorSrc[0];
            g = colorReq[1] - colorSrc[1];
            b = colorReq[2] - colorSrc[2];
            twnobj['rgbl'] = {
                ease: ease,
                tor: r,
                tog: g,
                tob: b,
                ct: 0,
                d: duration,
                fromr: colorSrc[0],
                fromg: colorSrc[1],
                fromb: colorSrc[2],
                prop: 'lineColor',
                request: colorReq,
                target: o
            };
        }
        if ('alpha' in args) {
            rqAlpha = args['alpha'];
            alpha = rqAlpha - o.alpha;
            twnobj['alpha'] = {
                ease: ease,
                to: alpha,
                ct: 0,
                d: duration,
                from: o.alpha,
                prop: 'alpha',
                request: rqAlpha,
                target: o
            };
        }
        if ('lineAlpha' in args) {
            rqAlpha = (args['lineAlpha'] > 1) ? args['lineAlpha'] / 100 : args['lineAlpha'];
            lineAlpha = rqAlpha - o.lineAlpha;
            twnobj['lineAlpha'] = {
                ease: ease,
                to: lineAlpha,
                ct: 0,
                d: duration,
                from: o.lineAlpha,
                prop: 'lineAlpha',
                request: rqlineAlpha,
                target: o
            };
        }
        var onStart = args['onStart'] ? args['onStart'] : null;
        var onTween = args['onTween'] ? args['onTween'] : null;
        var onEnd = args['onEnd'] ? args['onEnd'] : null;

        twnobj.state = {
            start: true,
            tweening: false,
            end: false,
            onStart: onStart,
            onTween: onTween,
            onEnd: onEnd,
            target: o,
            duration: duration,
            delay: delay,
            data: data
        };

        if (delay > 0) {
            this._delayFun(this.children, twnobj, o.id, delay);
        } else {
            this._startFun(this.children, twnobj, o.id);
        }
    },
    _delayFun: function(c, o, id, d) {
        var that = this;
        setTimeout(function() {
            that._startFun(c, o, id);
        }, d);
    },
    _startFun: function(c, o, id) {
        c[id] = o;
        window[Canvas2d.wn + 'rqanim'].addLoop(this, this._callTween);
        window[Canvas2d.wn + 'rqanim'].start();
    },
    /**
     * removeTweener - Tweener - remove an object from the animation cicle list
     * @type method Tweener
     * @description remove an object from the animation cicle list
     * @param {object element} child a target Layer or DisplayObjects element
     * @example myTween.removeTweener(myObject);
     * @returns {undefined} none none
     * @see text
     * @link text
     */
    removeTweener: function(child) {
        if (child.id in this._tempChildren) {
            delete this._tempChildren[child.id];
        }
        if (child.id in this.children) {
            this.children[child.id].state.end = true;
        }
    },
    _shuffle: function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },
    _callTween: function(that) {
        var tree = {},
            n, obj;
        for (var o in that.children) {
            if (that.children[o].state.start) {
                that._states(that.children[o].state);
                that.children[o].state.start = false;
            } else {
                if (that.children[o].state.end) {
                    that.children[o].state.tweening = false;
                    obj = that.children[o].state;
                    delete that.children[o];

                    that._states(obj);
                    for (n in that.children) {}
                    if (!that.children[o] && !that.children[n]) {
                        window[Canvas2d.wn + 'rqanim'].removeLoop(that);
                    }
                    continue;
                } else {
                    that.children[o].state.tweening = true;
                }
            }
            // console.log(that.children[o].state);
            that._states(that.children[o].state);
            for (var oo in that.children[o]) {
                if (oo !== 'state') {
                    var ct = window[Canvas2d.wn + 'rqanim'].getTimeInterval();
                    if (oo === 'rgb' || oo === 'rgbl') {
                        that.children[o][oo].ct += ct;
                        that._tweenColor(that.children[o][oo], that.children[o].state);
                    } else if (oo === 'shadow' || oo === 'lineShadow') {
                        that.children[o][oo].ct += ct;
                        that._tweenS(that.children[o][oo], that.children[o].state);
                    } else if (oo === 'obj') {
                        that.children[o][oo].ct += ct;
                        that._tweenO(that.children[o][oo], that.children[o].state);
                    } else if (oo === 'txt') {
                        that.children[o][oo].ct += ct;
                        that._tweenT(that.children[o][oo], that.children[o].state);
                    } else if (oo === 'point') {
                        that.children[o][oo].ct += ct;
                        that._tweenP(that.children[o][oo], that.children[o].state);
                    } else {
                        that.children[o][oo].ct += ct;
                        that._tween(that.children[o][oo], that.children[o].state);
                    }
                }
            }
            if (that.children[o].state.target.className === 'DisplayObjects') {
                tree[that.children[o].state.target.parent.id] = that.children[o].state.target.parent;
            } else {
                tree[that.children[o].state.target.id] = that.children[o].state.target;
            }

        }
        for (var t in tree) {
            tree[t].draw();
        }

    },
    _tweenColor: function(args, ctrl) {
        if ((args['ct'] / args['d']) >= 1) {
            args['ct'] = 1;
            args['d'] = 1;
            ctrl.end = true;
        }
        var r, g, b;
        r = this[args.ease](args['ct'], args['fromr'], args['tor'], args['d']);
        g = this[args.ease](args['ct'], args['fromg'], args['tog'], args['d']);
        b = this[args.ease](args['ct'], args['fromb'], args['tob'], args['d']);
        args['target'][args['prop']] = 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
    },
    _tweenP: function(args, ctrl) {
        if ((args['ct'] / args['d']) >= 1) {
            args['ct'] = 1;
            args['d'] = 1;
            ctrl.end = true;
        }
        var x,y;
        x = this[args.ease](args['ct'], args['fromx'], args['tox'], args['d']);
        y = this[args.ease](args['ct'], args['fromy'], args['toy'], args['d']);
        args['target'][args['prop']].set([x,y]); 
    },
    _tween: function(args, ctrl) {
        if ((args['ct'] / args['d']) >= 1) {
            args['ct'] = 1;
            args['d'] = 1;
            ctrl.end = true;
        }
        var n;
        n = this[args.ease](args['ct'], args['from'], args['to'], args['d']);
        args['target'][args['prop']] = n;
    },
    _tweenS: function(args, ctrl) {
        if ((args['ct'] / args['d']) >= 1) {
            args['ct'] = 1;
            args['d'] = 1;
            ctrl.end = true;
        }
        for (var o = 0; o < args['to'].length; o++) {
            if (args['subprop'][o] === "color") {
                var r, g, b;
                r = this[args.ease](args['ct'], args['from'][o][0], args['to'][o][0], args['d']);
                g = this[args.ease](args['ct'], args['from'][o][1], args['to'][o][1], args['d']);
                b = this[args.ease](args['ct'], args['from'][o][2], args['to'][o][2], args['d']);
                args['target'][args['prop']][args['subprop'][o]] = 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
            } else {
                var n;
                n = this[args.ease](args['ct'], args['from'][o], args['to'][o], args['d']);
                args['target'][args['prop']][args['subprop'][o]] = n;
            }
        }
    },
    _tweenO: function(args, ctrl) {
        if ((args['ct'] / args['d']) >= 1) {
            args['ct'] = 1;
            args['d'] = 1;
            ctrl.end = true;
        }
        for (var o = 0; o < args['to'].length; o++) {
            var n;
            n = this[args.ease](args.ct, args.from[o], args.to[o], args.d);
            args.target[args.prop][args.index[o]][args.subprop[o]][o] = n;
        }
    },
    _tweenT: function(args, ctrl) {
        if ((args['ct'] / args['d']) >= 1) {
            args['ct'] = 1;
            args['d'] = 1;
            ctrl.end = true;
        }
        var n;

        switch (args.type) {
            case 'cutFwd':
                n = Math.floor(this[args.ease](args['ct'], args['from'], args['to'], args['d']));
                args['target'][args['prop']] = args.text.substr(0, n);
                break;
            case 'cutBack':
                n = Math.floor(this[args.ease](args['ct'], args['from'], args['to'], args['d']));
                args['target'][args['prop']] = args.text.substr(0, args.to - n);
                break;
            case 'matrix':
                for (let i = 0; i < args.subprop.length; i++) {
                    n = Math.floor(this[args.ease](args['ct'], 0, args.subprop[i], args['d']));
                    n = n > this.charList.length - 1 ? n - this.charList.length : n;
                    args.request += args.charlist[n];
                }
                args['target'][args['prop']] = args.text = args.request;
                args.request = '';
                break;
            default:
                break;
        }

    },
    _states: function(ctrl) {
        for (var o in ctrl) {
            switch (o) {
                case 'start':
                    if (ctrl[o] === true && ctrl['onStart']) {
                        ctrl['onStart'].apply(ctrl['target'], [ctrl]);
                    }
                    break;
                case 'tweening':
                    if (ctrl[o] === true && ctrl['onTween']) {
                        ctrl['onTween'].apply(ctrl['target'], [ctrl]);
                    }
                    break;
                case 'end':
                    if (ctrl[o] === true && ctrl['onEnd']) {
                        ctrl['onEnd'].apply(ctrl['target'], [ctrl]);
                    }
                    break;
                default:
                    break;
            }
        }

    },
    //////////////////////////////////////////////
    //Equations - From Caurina Tweener
    //
    //author Zeh Fernando, Nate Chatellier
    //v1.0.2
    //Open source under the BSD License.
    //Copyright © 2001 Robert Penner
    //
    //http://code.google.com/p/tweener/
    /////////////////////////////////////////////
    /**
     * easeNone
     * @type static method Tweener
     * @description Easing equation function for a simple linear tweening, with no easing.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeNone: function(t, b, c, d, p_params) {
        return c * t / d + b;
    },
    /**
     * easeSine
     * @type static method Tweener
     * @description Easing equation function for a simple sine's curve tweening, with no easing.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeSine: function(t, b, c, d, p_params) {
        return b + c * (Math.sin((Math.PI / d) * t));
    },
    /**
     * easeInQuad
     * @type static method Tweener
     * @description Easing equation function for a quadratic (t^2) easing in: accelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInQuad: function(t, b, c, d, p_params) {
        return c * (t /= d) * t + b;
    },
    /**
     * easeOutQuad
     * @type static method Tweener
     * @description Easing equation function for a quadratic (t^2) easing out: decelerating to zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutQuad: function(t, b, c, d, p_params) {
        return -c * (t /= d) * (t - 2) + b;
    },
    /**
     * easeInOutQuad
     * @type static method Tweener
     * @description Easing equation function for a quadratic (t^2) easing in/out: acceleration until halfway, then deceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInOutQuad: function(t, b, c, d, p_params) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    /**
     * easeOutInQuad
     * @type static method Tweener
     * @description Easing equation function for a quadratic (t^2) easing out/in: deceleration until halfway, then acceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutInQuad: function(t, b, c, d, p_params) {
        if (t < d / 2)
            return this.easeOutQuad(t * 2, b, c / 2, d, p_params);
        return this.easeInQuad((t * 2) - d, b + c / 2, c / 2, d, p_params);
    },
    /**
     * easeInCubic
     * @type static method Tweener
     * @description Easing equation function for a cubic (t^3) easing in: accelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInCubic: function(t, b, c, d, p_params) {
        return c * (t /= d) * t * t + b;
    },
    /**
     * easeOutCubic
     * @type static method Tweener
     * @description Easing equation function for a cubic (t^3) easing out: decelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutCubic: function(t, b, c, d, p_params) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    /**
     * easeInOutCubic
     * @type static method Tweener
     * @description Easing equation function for a cubic (t^3) easing in/out: acceleration until halfway, then deceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInOutCubic: function(t, b, c, d, p_params) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    /**
     * easeOutInCubic
     * @type static method Tweener
     * @description Easing equation function for a cubic (t^3) easing out/in: deceleration until halfway, then acceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutInCubic: function(t, b, c, d, p_params) {
        if (t < d / 2)
            return this.easeOutCubic(t * 2, b, c / 2, d, p_params);
        return this.easeInCubic((t * 2) - d, b + c / 2, c / 2, d, p_params);
    },
    /**
     * easeInQuart
     * @type static method Tweener
     * @description Easing equation function for a quartic (t^4) easing in: accelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInQuart: function(t, b, c, d, p_params) {
        return c * (t /= d) * t * t * t + b;
    },
    /**
     * easeOutQuart
     * @type static method Tweener
     * @description Easing equation function for a quartic (t^4) easing out: decelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutQuart: function(t, b, c, d, p_params) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    /**
     * easeInOutQuart
     * @type static method Tweener
     * @description Easing equation function for a quartic (t^4) easing in/out: acceleration until halfway, then deceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInOutQuart: function(t, b, c, d, p_params) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    /**
     * easeOutInQuart
     * @type static method Tweener
     * @description Easing equation function for a quartic (t^4) easing out/in: deceleration until halfway, then acceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutInQuart: function(t, b, c, d, p_params) {
        if (t < d / 2)
            return this.easeOutQuart(t * 2, b, c / 2, d, p_params);
        return this.easeInQuart((t * 2) - d, b + c / 2, c / 2, d, p_params);
    },
    /**
     * easeInQuint
     * @type static method Tweener
     * @description Easing equation function for a quintic (t^5) easing in: accelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInQuint: function(t, b, c, d, p_params) {
        return c * (t /= d) * t * t * t * t + b;
    },
    /**
     * easeOutQuint
     * @type static method Tweener
     * @description Easing equation function for a quintic (t^5) easing out: decelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutQuint: function(t, b, c, d, p_params) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    /**
     * easeInOutQuint
     * @type static method Tweener
     * @description Easing equation function for a quintic (t^5) easing in/out: acceleration until halfway, then deceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInOutQuint: function(t, b, c, d, p_params) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    /**
     * easeOutInQuint
     * @type static method Tweener
     * @description Easing equation function for a quintic (t^5) easing out/in: deceleration until halfway, then acceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutInQuint: function(t, b, c, d, p_params) {
        if (t < d / 2)
            return this.easeOutQuint(t * 2, b, c / 2, d, p_params);
        return this.easeInQuint((t * 2) - d, b + c / 2, c / 2, d, p_params);
    },
    /**
     * easeInSine
     * @type static method Tweener
     * @description Easing equation function for a sinusoidal (sin(t)) easing in: accelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInSine: function(t, b, c, d, p_params) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    /**
     * easeOutSine
     * @type static method Tweener
     * @description Easing equation function for a sinusoidal (sin(t)) easing out: decelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutSine: function(t, b, c, d, p_params) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    /**
     * easeInOutSine
     * @type static method Tweener
     * @description Easing equation function for a sinusoidal (sin(t)) easing in/out: acceleration until halfway, then deceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInOutSine: function(t, b, c, d, p_params) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    /**
     * easeOutInSine
     * @type static method Tweener
     * @description Easing equation function for a sinusoidal (sin(t)) easing out/in: deceleration until halfway, then acceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutInSine: function(t, b, c, d, p_params) {
        if (t < d / 2)
            return this.easeOutSine(t * 2, b, c / 2, d, p_params);
        return this.easeInSine((t * 2) - d, b + c / 2, c / 2, d, p_params);
    },
    /**
     * easeInExpo
     * @type static method Tweener
     * @description Easing equation function for an exponential (2^t) easing in: accelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInExpo: function(t, b, c, d, p_params) {
        return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b - c * 0.001;
    },
    /**
     * easeOutExpo
     * @type static method Tweener
     * @description Easing equation function for an exponential (2^t) easing out: decelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutExpo: function(t, b, c, d, p_params) {
        return (t === d) ? b + c : c * 1.001 * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    /**
     * easeInOutExpo
     * @type static method Tweener
     * @description Easing equation function for an exponential (2^t) easing in/out: acceleration until halfway, then deceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInOutExpo: function(t, b, c, d, p_params) {
        if (t === 0)
            return b;
        if (t === d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b - c * 0.0005;
        return c / 2 * 1.0005 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    /**
     * easeOutInExpo
     * @type static method Tweener
     * @description Easing equation function for an exponential (2^t) easing out/in: deceleration until halfway, then acceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutInExpo: function(t, b, c, d, p_params) {
        if (t < d / 2)
            return this.easeOutExpo(t * 2, b, c / 2, d, p_params);
        return this.easeInExpo((t * 2) - d, b + c / 2, c / 2, d, p_params);
    },
    /**
     * easeInCirc
     * @type static method Tweener
     * @description Easing equation function for a circular (sqrt(1-t^2)) easing in: accelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInCirc: function(t, b, c, d, p_params) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    /**
     * easeOutCirc
     * @type static method Tweener
     * @description Easing equation function for a circular (sqrt(1-t^2)) easing out: decelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutCirc: function(t, b, c, d, p_params) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    /**
     * easeInOutCirc
     * @type static method Tweener
     * @description Easing equation function for a circular (sqrt(1-t^2)) easing in/out: acceleration until halfway, then deceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInOutCirc: function(t, b, c, d, p_params) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    /**
     * easeOutInCirc
     * @type static method Tweener
     * @description Easing equation function for a circular (sqrt(1-t^2)) easing out/in: deceleration until halfway, then acceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutInCirc: function(t, b, c, d, p_params) {
        if (t < d / 2)
            return this.easeOutCirc(t * 2, b, c / 2, d, p_params);
        return this.easeInCirc((t * 2) - d, b + c / 2, c / 2, d, p_params);
    },
    /**
     * easeInElastic
     * @type static method Tweener
     * @description Easing equation function for an elastic (exponentially decaying sine wave) easing in: accelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @opt {data} a Amplitude.
     * @opt {data} p Period.
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInElastic: function(t, b, c, d, p_params) {
        if (t === 0)
            return b;
        if ((t /= d) === 1)
            return b + c;
        var p = !(p_params) || isNaN(p_params.period) ? d * .3 : p_params.period;
        var s;
        var a = !(p_params) || isNaN(p_params.amplitude) ? 0 : p_params.amplitude;
        if (!(a) || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    /**
     * easeOutElastic
     * @type static method Tweener
     * @description Easing equation function for an elastic (exponentially decaying sine wave) easing out: decelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @opt {data} a Amplitude.
     * @opt {data} p Period.
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutElastic: function(t, b, c, d, p_params) {
        if (t === 0)
            return b;
        if ((t /= d) === 1)
            return b + c;
        var p = !(p_params) || isNaN(p_params.period) ? d * .3 : p_params.period;
        var s;
        var a = !(p_params) || isNaN(p_params.amplitude) ? 0 : p_params.amplitude;
        if (!(a) || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    /**
     * easeInOutElastic
     * @type static method Tweener
     * @description Easing equation function for an elastic (exponentially decaying sine wave) easing in/out: acceleration until halfway, then deceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @opt {data} a Amplitude.
     * @opt {data} p Period.
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInOutElastic: function(t, b, c, d, p_params) {
        if (t === 0)
            return b;
        if ((t /= d / 2) === 2)
            return b + c;
        var p = !(p_params) || isNaN(p_params.period) ? d * (.3 * 1.5) : p_params.period;
        var s;
        var a = !(p_params) || isNaN(p_params.amplitude) ? 0 : p_params.amplitude;
        if (!(a) || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1)
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    /**
     * easeOutInElastic
     * @type static method Tweener
     * @description Easing equation function for an elastic (exponentially decaying sine wave) easing out/in: deceleration until halfway, then acceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @opt {data} a Amplitude.
     * @opt {data} p Period.
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutInElastic: function(t, b, c, d, p_params) {
        if (t < d / 2)
            return this.easeOutElastic(t * 2, b, c / 2, d, p_params);
        return this.easeInElastic((t * 2) - d, b + c / 2, c / 2, d, p_params);
    },
    /**
     * easeInBack
     * @type static method Tweener
     * @description Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing in: accelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @opt {data} s Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInBack: function(t, b, c, d, p_params) {
        var s = !(p_params) || isNaN(p_params.overshoot) ? 1.70158 : p_params.overshoot;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    /**
     * easeOutBack
     * @type static method Tweener
     * @description Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing out: decelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @opt {data} s Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutBack: function(t, b, c, d, p_params) {
        var s = !(p_params) || isNaN(p_params.overshoot) ? 1.70158 : p_params.overshoot;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    /**
     * easeInOutBack
     * @type static method Tweener
     * @description Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing in/out: acceleration until halfway, then deceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @opt {data} s Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInOutBack: function(t, b, c, d, p_params) {
        var s = !(p_params) || isNaN(p_params.overshoot) ? 1.70158 : p_params.overshoot;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    /**
     * easeOutInBack
     * @type static method Tweener
     * @description Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing out/in: deceleration until halfway, then acceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @opt {data} s Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutInBack: function(t, b, c, d, p_params) {
        if (t < d / 2)
            return this.easeOutBack(t * 2, b, c / 2, d, p_params);
        return this.easeInBack((t * 2) - d, b + c / 2, c / 2, d, p_params);
    },
    /**
     * easeInBounce
     * @type static method Tweener
     * @description Easing equation function for a bounce (exponentially decaying parabolic bounce) easing in: accelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInBounce: function(t, b, c, d, p_params) {
        return c - this.easeOutBounce(d - t, 0, c, d) + b;
    },
    /**
     * easeOutBounce
     * @type static method Tweener
     * @description Easing equation function for a bounce (exponentially decaying parabolic bounce) easing out: decelerating from zero velocity.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutBounce: function(t, b, c, d, p_params) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    /**
     * easeInOutBounce
     * @type static method Tweener
     * @description Easing equation function for a bounce (exponentially decaying parabolic bounce) easing in/out: acceleration until halfway, then deceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeInOutBounce: function(t, b, c, d, p_params) {
        if (t < d / 2)
            return this.easeInBounce(t * 2, 0, c, d) * .5 + b;
        else
            return this.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    },
    /**
     * easeOutInBounce
     * @type static method Tweener
     * @description Easing equation function for a bounce (exponentially decaying parabolic bounce) easing out/in: deceleration until halfway, then acceleration.
     * @param {number} t Current time (in frames or seconds).
     * @param {number} b Starting value.
     * @param {number} c Change needed in value.
     * @param {number} d Expected easing duration (in frames or seconds).
     * @param {null} p_params null object
     * @returns {number} n The correct value.
     * @see link
     * @link http://code.google.com/p/tweener/
     */
    easeOutInBounce: function(t, b, c, d, p_params) {
        if (t < d / 2)
            return this.easeOutBounce(t * 2, b, c / 2, d, p_params);
        return this.easeInBounce((t * 2) - d, b + c / 2, c / 2, d, p_params);
    }
};
/**
 * Colors
 * @type object Colors
 * @description an object containing methods for manage and translate various type of color formats
 * @example var myValue= Colors.methods(params);
 * @returns {none} none none
 * @link text
 * @see text
 */
Canvas2d.Colors = function(){
    return this;
}
Canvas2d.Colors.prototype = {
    /**
     * randomRgb - Colors - return a random rgb array value in range [0,255]
     * @type static method Colors
     * @description return a random rgb array value in range [0,255]
     * @param {string} type string that represent the desired returned format value; string or array; default string
     * @example var myValue= Colors.randomRgb('array');
     * @returns {mixed} rgb in string or array format; 'rgb(n, n, n)' or [r, g, b]
     * @link https://www.w3.org/TR/css-color-3/
     * @see text
     */
    randomRgb: function(type) {
        var t = type ? type : 'string';
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);
        if (t === 'array') {
            return [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)];
        } else {
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        }
    },
    /**
     * invert - Colors - return an inverted rgb array
     * @type static method Colors
     * @description return an inverted rgb array color
     * @param {color} color to be inverted; any color format
     * @example var myValue= Colors.invert([12,23,34]);
     * @returns {mixed} rgb in string format; 'rgb(n, n, n)'
     * @link https://www.w3.org/TR/css-color-3/
     * @see text
     */
    invert: function(color) {
        let c = this._fromStringToArrayRgb(color);
        return 'rgb('+(255 - c[0])+','+(255 - c[1])+','+(255 - c[2])+')';
    },
    /**
     * complementary - Colors - return a complementary rgb array color
     * @type static method Colors
     * @description return a complementary rgb array color
     * @param {color} color to be parsed; any color format
     * @example var myValue= Colors.complementary([12,23,34]);
     * @returns {mixed} rgb in string format; 'rgb(n, n, n)'
     * @link https://www.w3.org/TR/css-color-3/
     * @see text
     */
    complementary: function(color) {
        let c = this._fromStringToArrayRgb(color),b;
        b = this._rgbToHsv(c);
        c = this._hsvToRgb([this._hueShift(b[0],180.0),b[1],b[2]]);
        return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
    },
    ///////////
    ///internal - if color is an RGB Array return an RGB Formatted String
    ///////////
    _parseC: function(color) {
        if (typeof color === 'string') {
            if (color.indexOf('hsv') > -1) {
                return this._fromStringToArrayRgb(color);
            }else{
                return color;
            }
        }else if (color instanceof Array) {
            return this._fromArrayToStringRgb(color);
        }else if(!color){
            return color;
        }
    },
    ////////////
    ///internal - return an RGB String formatted color From an RGB Array
    ////////////
    _fromArrayToStringRgb: function(color) {
        let a=av='';
        if (color.length > 3) {a='a';av=','+color[3];}
        return 'rgb'+a+'('+color[0]+','+color[1]+','+color[2]+av+')';
    },
    ///////////
    //internal - return an RGB Array from a String formatted color
    ///////////
    _fromStringToArrayRgb: function(color) {
        if (!color) {
            return [0, 0, 0];
        }
        if (typeof color === 'string') {
            var result = color.replace(/\s/g, "").toLowerCase();
            var re, ar;
            if (result.indexOf('rgb') > -1) {
                re = /[rgba\(\)]/g;
                ar = result.replace(re, '').split(',');
                return [parseInt(ar[0]), parseInt(ar[1]), parseInt(ar[2])];
            } else if (result.indexOf('#') > -1) {
                var hex = this._hexToRgb(result);
                return hex;
            } else if (result.indexOf('hsl') > -1) {
                re = /[hsla\(%?\)]/g;
                ar = result.replace(re, '').split(',');
                var hsl = this._hslToRgb(ar);
                return hsl;
            } else if (result.indexOf('hsv') > -1) {
                re = /[hsva\(%?\)]/g;
                ar = result.replace(re, '').split(',');
                var hsv = this._hsvToRgb(ar);
                return hsv;
            } else if (result in this.namedColor) {
                ar = this.namedColor[result][1];
                return ar;
            } else {
                return [0, 0, 0];
            }
        } else if (color instanceof Array) {
            return color;
        } else {
            throw 'You are attempting to translate an INVALID color: ' + color;
        }
    },
    //////////
    //internal - return color as type - 'hex' 'rgb' 'hsl' 'hsv' 'name'
    //////////
    _parseGetColor: function(color, type) {
        if (!color) {
            return 'rgb(0,0,0)';
        }
        type=type?type:'rgb';
        if (typeof color === 'string') {
            if (getType(color,type,this) === type) {
                return color;
            }else{
                let c=this._fromStringToArrayRgb(color);
                return toTarget(c,type,this);
            }
        }else{
            return toTarget(color,type);
        }
        function getType(c,type,that) {
            let result = c.replace(/\s/g, "").toLowerCase();
            if (result.indexOf('rgb') > -1) {
                return 'rgb';
            } else if (result.indexOf('#') > -1) {
                return 'hex';
            } else if (result.indexOf('hsl') > -1) {
                return 'hsl';
            } else if (result.indexOf('hsv') > -1) {
                return 'hsv';
            } else if (result in that.namedColor) {
                return 'name';
            } else {
                return false;
            }
        }
        function toTarget(r,type,that){
            switch (type) {
                case 'hex':
                    return that._rgbToHex(r);
                    break;
                case 'rgb':
                    return 'rgb('+r[0]+','+r[1]+','+r[2]+')';
                    break;
                case 'hsl':
                    r = that._rgbToHsl(r);
                    return 'hsl(' + r[0] + ',' + r[1] + '%,' + r[2] + '%)';
                    break;
                case 'hsv':
                    r = that._rgbToHsv(r);
                    return 'hsv(' + r[0] + ',' + r[1] + '%,' + r[2] + '%)';
                    break;
                case 'name':
                    function approx(a, b, c) {
                        let low=(b-c)<=0?0:b-c;
                        let high=(b+c)>=255?255:b+c;
                        return (a<=high&&a>=low) ? true : false;
                    }
                    let ap = 5;
                    return iterNamed(ap,r,that.namedColor);
                    function iterNamed(ap,r,that){
                        for (var i in that) {
                            if (approx(that[i][1][0], r[0], ap) && approx(that[i][1][1], r[1], ap) && approx(that[i][1][2], r[2], ap)) {
                                return i;
                            }
                        }
                        ap+=5;
                        return iterNamed(ap,r,that);
                    }
                    break;
                case 'array':
                    return c;
                    break;
                default:
                    return c;
                    break;
            }
        }
    },
    ///////////
    //internal ONLY - convert an array RGB to an array HSL
    ///////////
    _rgbToHsl: function(color){
        let r=color[0],g=color[1],b=color[2];
        r/=255;
        g/=255;
        b/=255;
        let h=s=d=c=0;
        let mx=Math.max(r,g,b);
        let mn=Math.min(r,g,b);
        let l=(mx+mn)/2;
        if (mx === mn){
            h=s=0;
        }else{
            d=mx-mn;
            if (l>0.5){
                s=d/(2-mx-mn);
            }
            else{
                s=d/(mx+mn);
            }
            if (mx === r){
                c=0
                if (g<b){
                    c=6;
                }
                h = (g - b) / d + c;
            }else if(mx === g){
                h = (b - r) / d + 2;
            }else if (mx === b){
                h = (r - g) / d + 4;
            }
            h/=6;
        }
        return [this._rod2(h*360),this._rod2(s*100),this._rod2(l*100)]
    },
    ///////////
    //internal ONLY - convert an array RGB to an array HSV
    ///////////
    _rgbToHsv: function(color){
        let r=color[0],g=color[1],b=color[2];
        r/=255;
        g/=255;
        b/=255;
        let mx=Math.max(r,g,b);
        let mn=Math.min(r,g,b);
        let v=mx;
        let d=mx-mn;
        let s=d/mx;
        if (mx==0){
            s=0;
        }
        if (mx==mn){
            h=0;
        }
        else{
            if (r===mx){
                h=(g - b) / d;
                if (g < b){
                    h=(g - b) / d +6;
                }
            }
            if (g===mx){
                h = (b - r) / d + 2;
            }
            if (b===mx){
                h = (r - g) / d + 4;
            }
            h/=6;
        }
        return [this._rod2(h*360),this._rod2(s*100),this._rod2(v*100)];
    },
    ///////////
    //internal ONLY - convert an array HSL to an array RGB
    ///////////
    _hslToRgb: function(color){
        let h=color[0],s=color[1],l=color[2];
        h/=360;
        s/=100;
        l/=100;
        if (s === 0){
            r=g=b=l;
        }
        else{
            if (l < 0.5){
                q=l* (1 + s);
            }
            else{
                q=l + s - l * s;
            }
            p = 2 * l - q;
            r = this._hue2rgb(p, q, h + 1 / 3);
            g = this._hue2rgb(p, q, h);
            b = this._hue2rgb(p, q, h - 1 / 3);
        }
        return [this._rod(r*255),this._rod(g*255),this._rod(b*255)];
    },
    ///////////
    //internal ONLY - convert an array HSV to an array RGB
    ///////////
    _hsvToRgb: function(color){
        let h=color[0],s=color[1],v=color[2];
        h /= 360;
        s /= 100;
        v /= 100;
        let r=g=b=0;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        if ((i % 6) ===0){
            r = v;
            g = t;
            b = p;
        }
        if ((i % 6) ===1){
            r = q;
            g = v;
            b = p;
        }
        if ((i % 6) ===2){
            r = p;
            g = v;
            b = t;
        }
        if ((i % 6) ===3){
            r = p;
            g = q;
            b = v;
        }
        if ((i % 6) ===4){
            r = t;
            g = p;
            b = v;
        }
        if ((i % 6) ===5){
            r = v;
            g = p;
            b = q;
        }
        return [this._rod(r*255),this._rod(g*255),this._rod(b*255)];
    },
    ///////////
    //internal ONLY - convert a string HEX to an array RGB
    ///////////
    _hexToRgb: function(color){
        return [this._toR(color), this._toG(color), this._toB(color)];
    },
    ///////////
    //internal ONLY - convert an array RGB to a string HEX
    ///////////
    _rgbToHex: function(color){
        return "#" + this._toHex(color[0]) + this._toHex(color[1]) + this._toHex(color[2]);
    },
    ///////////
    //internal ONLY - to do
    ///////////
    _nameToRgb: function(color){
        console.log(color);
    },
    ///////////
    //internal ONLY - useful to rgb to hex convertion
    ///////////
    _toHex: function(N) {
        if (N === null)
            return "00";
        N = parseInt(N);
        if (N === 0 || isNaN(N))
            return "00";
        N = Math.max(0, N);
        N = Math.min(N, 255);
        N = Math.round(N);
        return "0123456789ABCDEF".charAt((N - N % 16) / 16) + "0123456789ABCDEF".charAt(N % 16);
    },
    _toR: function(h) {
        return parseInt((this._cutHex(h)).substring(0, 2), 16);
    },
    _toG: function(h) {
        return parseInt((this._cutHex(h)).substring(2, 4), 16);
    },
    _toB: function(h) {
        return parseInt((this._cutHex(h)).substring(4, 6), 16);
    },
    _cutHex: function(h) {
        return (h.charAt(0) === "#") ? h.substring(1, 7) : h;
    },
    ///////////
    //internal ONLY - useful to rgb to hsl and hsv convertion
    ///////////
    _rod: function(no){
        return parseInt(Math.floor(no/1) + Math.floor((no%1)/0.5)/1);
    },
    _rod2: function(no){
        return Math.round(no,2);
    },
    ///////////
    //internal ONLY - useful to hsl and hsv to rgb convertion
    ///////////
    _hue2rgb: function(p,q,t){
        if (t < 0){
            t += 1;
        }
        if (t > 1){
            t -= 1;
        }
        if (t < 1 / 6){
            return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2){
            return q;
        }
        if (t < 2 / 3){
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    },
    /////////
    //internal ONLY - useful for getting complementary color
    /////////
    _hueShift: function(h, s) {
        h += s;
        while (h >= 360.0) {
            h -= 360.0;
        }
        while (h < 0.0) {
            h += 360.0;
        }
        return h;
    },
    /**
     * namedColor - Colors -
     * @type object Colors
     * @description an object containing all the color's name accordingly to the specification css; name:[hex value, array rgb]
     * @example var myValue= Colors.namedColor('azure'); resulting in ["#f0ffff", [240, 255, 255]]
     * @returns {undefined} none none
     * @link https://www.w3.org/TR/css-color-3/
     * @see text
     */
    namedColor: { //147 colors
        "aliceblue": ["#f0f8ff", [240, 248, 255]],
        "antiquewhite": ["#faebd7", [250, 235, 215]],
        "aqua": ["#00ffff", [0, 255, 255]],
        "aquamarine": ["#7fffd4", [127, 255, 212]],
        "azure": ["#f0ffff", [240, 255, 255]],
        "beige": ["#f5f5dc", [245, 245, 220]],
        "bisque": ["#ffe4c4", [255, 228, 196]],
        "black": ["#000000", [0, 0, 0]],
        "blanchedalmond": ["#ffebcd", [255, 235, 205]],
        "blue": ["#0000ff", [0, 0, 255]],
        "blueviolet": ["#8a2be2", [138, 43, 226]],
        "brown": ["#a52a2a", [165, 42, 42]],
        "burlywood": ["#deb887", [222, 184, 135]],
        "cadetblue": ["#5f9ea0", [95, 158, 160]],
        "chartreuse": ["#7fff00", [127, 255, 0]],
        "chocolate": ["#d2691e", [210, 105, 30]],
        "coral": ["#ff7f50", [255, 127, 80]],
        "cornflowerblue": ["#6495ed", [100, 149, 237]],
        "cornsilk": ["#fff8dc", [255, 248, 220]],
        "crimson": ["#dc143c", [220, 20, 60]],
        "cyan": ["#00ffff", [0, 255, 255]],
        "darkblue": ["#00008b", [0, 0, 139]],
        "darkcyan": ["#008b8b", [0, 139, 139]],
        "darkgoldenrod": ["#b8860b", [184, 134, 11]],
        "darkgray": ["#a9a9a9", [169, 169, 169]],
        "darkgreen": ["#006400", [0, 100, 0]],
        "darkgrey": ["#a9a9a9", [169, 169, 169]],
        "darkkhaki": ["#bdb76b", [189, 183, 107]],
        "darkmagenta": ["#8b008b", [139, 0, 139]],
        "darkolivegreen": ["#556b2f", [85, 107, 47]],
        "darkorange": ["#ff8c00", [255, 140, 0]],
        "darkorchid": ["#9932cc", [153, 50, 204]],
        "darkred": ["#8b0000", [139, 0, 0]],
        "darksalmon": ["#e9967a", [233, 150, 122]],
        "darkseagreen": ["#8fbc8f", [143, 188, 143]],
        "darkslateblue": ["#483d8b", [72, 61, 139]],
        "darkslategray": ["#2f4f4f", [47, 79, 79]],
        "darkslategrey": ["#2f4f4f", [47, 79, 79]],
        "darkturquoise": ["#00ced1", [0, 206, 209]],
        "darkviolet": ["#9400d3", [148, 0, 211]],
        "deeppink": ["#ff1493", [255, 20, 147]],
        "deepskyblue": ["#00bfff", [0, 191, 255]],
        "dimgray": ["#696969", [105, 105, 105]],
        "dimgrey": ["#696969", [105, 105, 105]],
        "dodgerblue": ["#1e90ff", [30, 144, 255]],
        "firebrick": ["#b22222", [178, 34, 34]],
        "floralwhite": ["#fffaf0", [255, 250, 240]],
        "forestgreen": ["#228b22", [34, 139, 34]],
        "fuchsia": ["#ff00ff", [255, 0, 255]],
        "gainsboro": ["#dcdcdc", [220, 220, 220]],
        "ghostwhite": ["#f8f8ff", [248, 248, 255]],
        "gold": ["#ffd700", [255, 215, 0]],
        "goldenrod": ["#daa520", [218, 165, 32]],
        "gray": ["#808080", [128, 128, 128]],
        "green": ["#008000", [0, 128, 0]],
        "greenyellow": ["#adff2f", [173, 255, 47]],
        "grey": ["#808080", [128, 128, 128]],
        "honeydew": ["#f0fff0", [240, 255, 240]],
        "hotpink": ["#ff69b4", [255, 105, 180]],
        "indianred": ["#cd5c5c", [205, 92, 92]],
        "indigo": ["#4b0082", [75, 0, 130]],
        "ivory": ["#fffff0", [255, 255, 240]],
        "khaki": ["#f0e68c", [240, 230, 140]],
        "lavender": ["#e6e6fa", [230, 230, 250]],
        "lavenderblush": ["#fff0f5", [255, 240, 245]],
        "lawngreen": ["#7cfc00", [124, 252, 0]],
        "lemonchiffon": ["#fffacd", [255, 250, 205]],
        "lightblue": ["#add8e6", [173, 216, 230]],
        "lightcoral": ["#f08080", [240, 128, 128]],
        "lightcyan": ["#e0ffff", [224, 255, 255]],
        "lightgoldenrodyellow": ["#fafad2", [250, 250, 210]],
        "lightgray": ["#d3d3d3", [211, 211, 211]],
        "lightgreen": ["#90ee90", [144, 238, 144]],
        "lightgrey": ["#d3d3d3", [211, 211, 211]],
        "lightpink": ["#ffb6c1", [255, 182, 193]],
        "lightsalmon": ["#ffa07a", [255, 160, 122]],
        "lightseagreen": ["#20b2aa", [32, 178, 170]],
        "lightskyblue": ["#87cefa", [135, 206, 250]],
        "lightslategray": ["#778899", [119, 136, 153]],
        "lightslategrey": ["#778899", [119, 136, 153]],
        "lightsteelblue": ["#b0c4de", [176, 196, 222]],
        "lightyellow": ["#ffffe0", [255, 255, 224]],
        "lime": ["#00ff00", [0, 255, 0]],
        "limegreen": ["#32cd32", [50, 205, 50]],
        "linen": ["#faf0e6", [250, 240, 230]],
        "magenta": ["#ff00ff", [255, 0, 255]],
        "maroon": ["#800000", [128, 0, 0]],
        "mediumaquamarine": ["#66cdaa", [102, 205, 170]],
        "mediumblue": ["#0000cd", [0, 0, 205]],
        "mediumorchid": ["#ba55d3", [186, 85, 211]],
        "mediumpurple": ["#9370db", [147, 112, 219]],
        "mediumseagreen": ["#3cb371", [60, 179, 113]],
        "mediumslateblue": ["#7b68ee", [123, 104, 238]],
        "mediumspringgreen": ["#00fa9a", [0, 250, 154]],
        "mediumturquoise": ["#48d1cc", [72, 209, 204]],
        "mediumvioletred": ["#c71585", [199, 21, 133]],
        "midnightblue": ["#191970", [25, 25, 112]],
        "mintcream": ["#f5fffa", [245, 255, 250]],
        "mistyrose": ["#ffe4e1", [255, 228, 225]],
        "moccasin": ["#ffe4b5", [255, 228, 181]],
        "navajowhite": ["#ffdead", [255, 222, 173]],
        "navy": ["#000080", [0, 0, 128]],
        "oldlace": ["#fdf5e6", [253, 245, 230]],
        "olive": ["#808000", [128, 128, 0]],
        "olivedrab": ["#6b8e23", [107, 142, 35]],
        "orange": ["#ffa500", [255, 165, 0]],
        "orangered": ["#ff4500", [255, 69, 0]],
        "orchid": ["#da70d6", [218, 112, 214]],
        "palegoldenrod": ["#eee8aa", [238, 232, 170]],
        "palegreen": ["#98fb98", [152, 251, 152]],
        "paleturquoise": ["#afeeee", [175, 238, 238]],
        "palevioletred": ["#db7093", [219, 112, 147]],
        "papayawhip": ["#ffefd5", [255, 239, 213]],
        "peachpuff": ["#ffdab9", [255, 218, 185]],
        "peru": ["#cd853f", [205, 133, 63]],
        "pink": ["#ffc0cb", [255, 192, 203]],
        "plum": ["#dda0dd", [221, 160, 221]],
        "powderblue": ["#b0e0e6", [176, 224, 230]],
        "purple": ["#800080", [128, 0, 128]],
        "red": ["#ff0000", [255, 0, 0]],
        "rosybrown": ["#bc8f8f", [188, 143, 143]],
        "royalblue": ["#4169e1", [65, 105, 225]],
        "saddlebrown": ["#8b4513", [139, 69, 19]],
        "salmon": ["#fa8072", [250, 128, 114]],
        "sandybrown": ["#f4a460", [244, 164, 96]],
        "seagreen": ["#2e8b57", [46, 139, 87]],
        "seashell": ["#fff5ee", [255, 245, 238]],
        "sienna": ["#a0522d", [160, 82, 45]],
        "silver": ["#c0c0c0", [192, 192, 192]],
        "skyblue": ["#87ceeb", [135, 206, 235]],
        "slateblue": ["#6a5acd", [106, 90, 205]],
        "slategray": ["#708090", [112, 128, 144]],
        "slategrey": ["#708090", [112, 128, 144]],
        "snow": ["#fffafa", [255, 250, 250]],
        "springgreen": ["#00ff7f", [0, 255, 127]],
        "steelblue": ["#4682b4", [70, 130, 180]],
        "tan": ["#d2b48c", [210, 180, 140]],
        "teal": ["#008080", [0, 128, 128]],
        "thistle": ["#d8bfd8", [216, 191, 216]],
        "tomato": ["#ff6347", [255, 99, 71]],
        "turquoise": ["#40e0d0", [64, 224, 208]],
        "violet": ["#ee82ee", [238, 130, 238]],
        "wheat": ["#f5deb3", [245, 222, 179]],
        "white": ["#ffffff", [255, 255, 255]],
        "whitesmoke": ["#f5f5f5", [245, 245, 245]],
        "yellow": ["#ffff00", [255, 255, 0]],
        "yellowgreen": ["#9acd32", [154, 205, 50]]
    }
};