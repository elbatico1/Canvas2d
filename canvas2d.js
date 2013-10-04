/**
 * Canvas2d JavaScript Library v1.0
 * http://www.somethinglikethis.it/canvas2d/
 * Copyright 2012, Fabio Fantini
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Aug 20 2012
 *
 * Copyright (C) 2011 - 2012 by Fabio Fantini
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
///////////////////////////////////////////////////////////////
//Global Object
//globalId  - sequence of unique id number for all the objects
//evtType   - list of all events type assigned
//evtList   - method of evtType to take track of all events type
//container - global container - div element -
//////////////////////////////////////////////////////////////
var Canvas2d = {
    'globalId': 1,
    'container': {'id': 0, 'width': 0, 'height': 0, 'element': null},
    'fakeCtx': null
};
/**
 * Stage
 * @type constructor Stage
 * @description create the first instance of Stage
 * @property {div DOMElement} container div element that will contained all the canvas's elements
 * @property {number} width Stage width
 * @property {number} height Stage height
 * @property {number} x orizontal coordinate
 * @property {number} y vertical coordinate
 * @property {number} alpha opacity value in range 0-1
 * @property {number} scaleX orizontal scale
 * @property {number} scaleY vertival scale
 * @property {number} rotation rotation expressed in degrees
 * @property {boolean} visible visibility of the object
 * @property {string} className class name of the object
 * @property {number} id indentifier of the objet
 * @property {string} name name of the object
 * @property {array} children all the nested elements
 * @property {date} date the creation date of the object
 * @property {boolean} enableEvent enable/disable event listener
 * @property {string} agent navigator user agent
 * @param {div Element} container div element
 * @param {number} width stage width
 * @param {number} height stage height
 * @param {boolean} enableevent listen to events
 * @example var myStage=new Canvas2d.Stage('container',800,520,true);
 * @returns {Stage Element} Stage it self
 * @see link
 * @link text
 */
Canvas2d.Stage = function(container, width, height, enableevent) {
    this.enabledEvent = enableevent === false ? enableevent : true;
    this.className = "Stage";
    this.visible = true;
    this.date = new Date();
    this.name = "Stage_" + this.date.getTime().toString();
    this.indexCount = 0;
    this.container = document.getElementById(container);
    this.container.style.width = width + 'px';
    this.container.style.height = height + 'px';
    this.container.style.position = 'absolute';
    this.container.onmousedown = function() {
        return false;
    };
    Canvas2d.container.id = container;
    Canvas2d.container.width = width;
    Canvas2d.container.height = height;
    Canvas2d.container.element = this.container;
    this.fakeCanvas = document.createElement('canvas');
    this.fakeCanvas.width = width;
    this.fakeCanvas.height = height;
    this.fakeCtx = this.fakeCanvas.getContext("2d");
    Canvas2d.fakeCtx = this.fakeCtx;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.alpha = 1;
    this.scaleX = 1;
    this.scaleY = 1;
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
    if (!window.fire) {
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
        window.rqanim = {
            time: 0,
            timeInterval: 0,
            startTime: 0,
            lastTime: 0,
            frame: 0,
            animating: false,
            loop: [],
            prId: 0,
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
                    for (var i = 0; i < that.loop.length; i++) {
                        var illo = this.loop[i];
                        illo.func.apply(illo.target, [illo.target]);
                    }
                    window.fire(function() {
                        that._animationLoop();
                    });
                }
            },
            start: function() {
                if (!this.animating) {
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
                this.prId++;
                if (!this.isChild(target)) {
                    this.start();
                    this.loop.push({'target': target, 'func': func, 'id': this.prId});
                }
                return this.prId;
            },
            isChild: function(target) {
                var id = -1;
                for (var i = 0; i < this.loop.length; i++) {
                    if (this.loop[i].target === target) {
                        id = i;
                        break;
                    }
                }
                return id > -1 ? true : false;
            },
            removeLoop: function(target) {
                var id = -1;
                for (var i = 0; i < this.loop.length; i++) {
                    if (this.loop[i].target === target) {
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
    } else {

    }
};
Canvas2d.Stage.prototype = {
    /**
     *enableEvt - Stage - enable detection events in stage.
     * @type method Stage
     *@description enable detection events in stage
     *@example mystage.disableEvt();
     *@returns {void} enableEvt none
     */
    enableEvt: function() {
        if (!this.enabledEvent) {
            if (this.enabledEvent) {
                if ("ontouchstart" in window) {
                    this._functestmobile();
                } else {
                    this._functest();
                }
            }
            this.enabledEvent = true;
        }

    },
    /**
     *disableEvt - Stage - disable detection events in stage.
     * @type method Stage
     *@description disable detection events in stage
     *@example mystage.disableEvt();
     *@returns {void} enableEvt none
     *@see text
     *@link text
     */
    disableEvt: function() {
        if (this.enabledEvent) {
            if (this.enabledEvent) {
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
            }
            this.enabledEvent = false;
        }
    },
    /**
     * addLoop - Stage - set the main function for animation.
     * @type method Stage
     * @description add a function to the animation cicle
     * @param {element object} target element of interest
     * @param {function} func function to be excecuted
     * @example mystage.addLoop(my object,myFunction);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    addLoop: function(target, func) {
        window.rqanim.addLoop(target, func);
    },
    /**
     *removeLoop - Stage - set the main function for animation.
     * @type method Stage
     *@description remove a function to the animation cicle
     *@param {element object} target element of interest
     *@example mystage.removeLoop(my object);
     *@returns {undefined} none none
     *@see text
     *@link text
     */
    removeLoop: function(target) {
        window.rqanim.removeLoop(target);
    },
    /**
     * start - Stage - start the animation cicle
     * @type method Stage
     * @description start the animation cicle
     * @example stage.start();
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    start: function() {
        window.rqanim.start();
    },
    /**
     * reset - -Stage - reset the animation cicle
     * @type method Stage
     * @description reset the animation cicle
     * @example stage.reset();
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    reset: function() {
        window.rqanim.reset();
    },
    /**
     * stop - Stage - stop the animation cicle
     * @type method Stage
     * @description reset di animation cicle
     * @example stage.stop();
     * @returns {undefined} non none
     *@see text
     *@link text
     */
    stop: function() {
        window.rqanim.animating = false;
    },
    /**
     * getFrame - Stage - get the current increasing number of frame fired
     * @type method Stage
     * @description get the current increasing number of frame fired.
     * @example stage.getFrame();
     * @returns {number} frame number of frame executed
     *@see text
     *@link text
     */
    getFrame: function() {
        return window.rqanim.getFrame();
    },
    /**
     * getTime - Stage - get the current increasing number of millisecond
     * @type method Stage
     * @description get the current increasing number of millisecond
     * @example stage.getTime();
     * @returns {number} time millisecons
     *@see text
     *@link text
     */
    getTime: function() {
        return window.rqanim.getTime();
    },
    /**
     *getFps - Stage - get the current number of frame per seconds
     * @type method Stage
     *@description get the current number of frame per seconds
     *@example stage.getFps();
     *@returns {number} fps frame per seconds
     *@see text
     *@link text
     */
    getFps: function() {
        return window.rqanim.getFps();
    },
    /**
     * getTimeInterval - Stage - get the actual delay in millisecond between cicle loops
     * @type method Stage
     * @description get the actual delay in millisecond between cicle loops
     * @example stage.getTimeInterval();
     * @returns {number} float milliseconds
     *@see text
     *@link text
     */
    getTimeInterval: function() {
        return window.rqanim.getTimeInterval();
    },
    /**
     * getLoopList - Stage - get a list of all the element in the loop cicle
     * @type method Stage
     * @description get a list of all the element in the loop cicle
     * @example stage.getLoopList();
     * @returns {array} loop element list
     *@see text
     *@link text
     */
    getLoopList: function() {
        return window.rqanim.loop;
    },
    /**
     * isAnimating - Stage - get a true/false value indicating the activiti of the animation cicle loop
     * @type method Stage
     * @description get a true/false value indicating the activiti of the animation cicle loop
     * @example stage.isAnimating();
     * @returns {boolean} animating true/false
     *@see text
     *@link text
     */
    isAnimating: function() {
        return window.rqanim.animating;
    },
    /**
     *getDataURL - Stage - take a screen shot of stage
     * @type method Stage
     *@description take a screen shot of stage
     *@param {string} type a type of image image/jpeg-png
     *@param {number} quality a value rapresenting the quality of the returned image in range 0-10
     *@example image.src=stage.getDataURL('image/png',8);
     *@returns {image data} data image
     *@see text
     *@link text
     */
    getDataURL: function(type, quality) {
        var t = type ? type : 'image/jpeg';
        var q = quality ? quality : 5;
        this.fakeCtx.save();
        this.draw(this.fakeCtx);
        this.fakeCtx.restore();
        var data = this.fakeCanvas.toDataURL(t, q);
        this.fakeCtx.clearRect(0, 0, this.width, this.height);
        return data;
    },
    /**
     * addEvent - Stage - add an event into the listening cicle
     * @type method Stage
     * @description add an event into the listening cicle
     * @param {event string} type event listener type
     * @param {function} func function to be call
     * @example myObject.addEvent('click',myFunction);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    addEvent: function(type, func) {
        if (type in this.evtListeners) {
            this.evtListeners[type].func.push(func);
        } else {
            this.evtListeners[type] = {'func': [func]};
        }
    },
    /**
     *removeEvent - Stage - remove a preexistent event from the listening cicle
     *@type method Stage
     *@description remove a preexistence event from the listening cicle
     * @param {event string} type event listener type
     * @param {function} func function to be call
     *@example myObject.removeEvent('click');
     *@returns {undefined} none none
     *@see text
     *@link text
     */
    removeEvent: function(type, func) {
        if (type in this.evtListeners) {
            for (var i = 0; i < this.evtListeners[type].func.length; i++) {
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
     * @param {element object} child Sprite
     * @example stage.add(Sprite);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    add: function(child) {
        if (child.parent || child.className === "DisplayObjects") {
            return;
        }
        child.index = this.indexCount;
        child.parent = this;
        this._setContainer(child,this);
        this.children.push(child);
        this.indexCount++;
        this._orderCanvases();
    },
    /**
     * remove - Stage - remove a preexistence object from the nested objects
     * @type method Stage
     * @description remove a preexistence object from the nested objects
     * @param {element object} child Sprite
     * @example stage.remove(Sprite);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    remove: function(child) {
        if (child.parent !== this) {
            return;
        }
        child.parent = undefined;
        this.children.splice(child.index, 1);
        this.container.removeChild(child.canvas);
        this.indexCount--;
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].index = i;
        }
        this._orderCanvases();
    },
    /**
     * zOrder - Stage - change the order of a nested Sprite object passing either a index number or a string 'top' or 'bottom'
     * @type method Stage
     * @description change the order of a nested Sprite object passing either a index number or a string 'top' or 'bottom'
     * @param {element object} child Sprite
     * @param {number string} n index
     * @example stage.zOrder(Sprite,'top');
     * @returns {undefined} none none
     *@see text
     *@link text
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
            for (var i = 0; i < len; i++) {
                this.children[i].index = i;
            }
            this._orderCanvases();
        } else {
            if (n in this.children) {
                this.children.splice(child.index, 1);
                this.children.splice(n, 0, child);
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].index = i;
                }
                this._orderCanvases();
            }
        }
    },
    _setContainer:function(child,parent){
        child.width=parent.width;
        child.height=parent.height;
        child.stage=parent.container;
        child.canvas.width=parent.width;
        child.canvas.height=parent.height;
        child.ctx=child.canvas.getContext('2d');
    },
    /**
     *_orderCanvases - Stage - internal function - reorder the canvases (Sprite) elements.
     */
    _orderCanvases: function() {
        var that = this;
        function _childRecursion(child) {
            for (var i = 0; i < child.length; i++) {
                if (child[i].className === "Sprite") {
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
     * @param {number} w new stage width
     * @param {number} h new stage height
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    resize: function(w, h) {
        this.container.style.width = w + "px";
        this.container.style.height = h + "px";
        this.width = w;
        this.height = h;
        for (var i = 0; i < this.children.length; i++) {
            this._setContainer(this.children[i],this);
        }
    },
    _functestmobile: function() {
        this.container.addEventListener('touchmove', _testhandlermobile, false);
        this.container.addEventListener('touchstart', _testhandlermobile, false);
        this.container.addEventListener('touchend', _testhandlermobile, false);
        var that = this, i, evt, c, sp, ob, tfound = false, m, target, ptarget, offx, offy, poffx, poffy;
        var isgstart, isgend, isgchange, radius, angle, scale, dstart, ddrag, dstop, m2, ttarget, pttarget;
        var mouse = {'touchstart': null, 'touchend': null, 'touchmove': null, 'gestureend': null, 'dragstop': false, 'click': false};
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
                poffx = mp.ox - (ptarget.x);
                poffy = mp.oy - (ptarget.y);
                _dragShandler(e, ptarget, mp);
            } else if (ddrag && ptarget) {
                _draghandler(testTouch(e), ptarget, e, poffx, poffy);
            }
            if (dstart && target) {
                var mt = that._parentOffset(testTouch(e), target.parent);
                offx = mt.ox - (target.x);
                offy = mt.oy - (target.y);
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
                    that.evtListeners[evnt].func[evt].apply(that, [{'target': that, 'mouse': m, 'type': evnt, 'event': opt}]);
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
                    target.evtListeners['gesturechange'].func[evt].apply(ob, [{'target': target, 'mouse': m1, 'type': 'gesturechange', 'event': e}]);
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
            scale = (target.scaleX + target.scaleY) / 2;
            if ('gesturestart' in target.evtListeners) {
                m1['mouse2'] = m2;
                m1['scale'] = scale;
                m1['angle'] = angle;
                for (evt = 0; evt < target.evtListeners['gesturestart'].func.length; evt++) {
                    target.evtListeners['gesturestart'].func[evt].apply(ob, [{'target': target, 'mouse': m1, 'type': 'gesturestart', 'event': e}]);
                }
            }
        }
        function _dragShandler(e, target, m) {
            if ('dragstart' in target.evtListeners) {
                for (evt = 0; evt < target.evtListeners['dragstart'].func.length; evt++) {
                    target.evtListeners['dragstart'].func[evt].apply(ob, [{'target': target, 'mouse': m, 'type': 'dragstart', 'event': e}]);
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
                m.oy = y;//m.offx=m.ox-offx;m.offy=m.oy-offy;
                for (evt = 0; evt < target.evtListeners['drag'].func.length; evt++) {
                    target.evtListeners['drag'].func[evt].apply(ob, [{'target': target, 'mouse': m, 'type': 'drag', 'event': opt}]);
                }
            }
        }
        function testTouch(e) {
            var touches = {'pageX': 0, 'pageY': 0};
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
                                        ob.evtListeners[evnt].func[evt].apply(ob, [{'target': ob, 'mouse': m, 'type': evnt, 'event': opt}]);
                                    }
                                }
                                if (evnt2 in ob.evtListeners) {
                                    for (evt = 0; evt < ob.evtListeners[evnt2].func.length; evt++) {
                                        ob.evtListeners[evnt2].func[evt].apply(ob, [{'target': ob, 'mouse': m, 'type': evnt2, 'event': opt}]);
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
                                sp.evtListeners[evnt].func[evt].apply(sp, [{'target': sp, 'mouse': m2, 'type': evnt, 'event': opt}]);
                            }
                        }
                        if (evnt2 in sp.evtListeners) {
                            for (evt = 0; evt < sp.evtListeners[evnt2].func.length; evt++) {
                                sp.evtListeners[evnt2].func[evt].apply(sp, [{'target': sp, 'mouse': m2, 'type': evnt2, 'event': opt}]);
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
        var mouse = {'mouseup': false, 'mousedown': false, 'mousemove': false, 'click': false, 'mouseover': false, 'mouseout': false, 'dragstart': false, 'drag': false, 'dragstop': false};
        var isover, isout, over, out, dstart, ddrag, dstop, target, lasttarget, ptarget, plasttarget, pover, pout, pisout, pisover;
        var offx = 0, offy = 0, poffx, poffy;
        function _resethandler(e) {
            if (e.type === 'mouseout' && lasttarget) {
                _outhandler(e, lasttarget);
            }
            if (e.type === 'mouseout' && ptarget) {
                _outhandler(e, plasttarget);
            }
            isover = isout = over = out = dstart = ddrag = dstop = target = lasttarget = ptarget = plasttarget = pover = pout = pisover = pisout = false;
            mouse = {'mouseup': false, 'mousedown': false, 'mousemove': false, 'click': false, 'mouseover': false, 'mouseout': false, 'dragstart': false, 'drag': false, 'dragstop': false};
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
                poffx = mp.ox - (ptarget.x);
                poffy = mp.oy - (ptarget.y);
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
                offx = mt.ox - (target.x);
                offy = mt.oy - (target.y);
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
        var that = this, i, evt, c, sp, ob, tfound = false, m;
        function _teststagehandler(e) {
            if (e.type in that.evtListeners) {
                m = that._parentOffset(e, that);
                for (evt = 0; evt < that.evtListeners[e.type].func.length; evt++) {
                    that.evtListeners[e.type].func[evt].apply(that, [{'target': that, 'mouse': m, 'type': e.type, 'event': e}]);
                }
            }
        }
        function _overhandler(e, target) {
            if ('mouseover' in target.evtListeners) {
                m = that._parentOffset(e, target.parent);
                for (evt = 0; evt < target.evtListeners['mouseover'].func.length; evt++) {
                    target.evtListeners['mouseover'].func[evt].apply(ob, [{'target': target, 'mouse': m, 'type': 'mouseover', 'event': e}]);
                }
            }
        }
        function _outhandler(e, target) {
            if (target && 'mouseout' in target.evtListeners) {
                m = that._parentOffset(e, target.parent);
                for (evt = 0; evt < target.evtListeners['mouseout'].func.length; evt++) {
                    target.evtListeners['mouseout'].func[evt].apply(ob, [{'target': target, 'mouse': m, 'type': 'mouseout', 'event': e}]);
                }
            }
        }
        function _dragShandler(e, target, m) {
            if ('dragstart' in target.evtListeners) {
                for (evt = 0; evt < target.evtListeners['dragstart'].func.length; evt++) {
                    target.evtListeners['dragstart'].func[evt].apply(ob, [{'target': target, 'mouse': m, 'type': 'dragstart', 'event': e}]);
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
                m.oy = y;//m.offx=m.ox-offx;m.offy=m.oy-offy;
                for (evt = 0; evt < target.evtListeners['drag'].func.length; evt++) {
                    target.evtListeners['drag'].func[evt].apply(ob, [{'target': target, 'mouse': m, 'type': 'drag', 'event': e}]);
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
                                        ob.evtListeners[evnt].func[evt].apply(ob, [{'target': ob, 'mouse': m, 'type': evnt, 'event': e}]);
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
                                sp.evtListeners[evnt].func[evt].apply(sp, [{'target': sp, 'mouse': m, 'type': evnt, 'event': e}]);
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
        x1 = child.className === 'Sprite' ? x / g.scaleX : x;
        y1 = child.className === 'Sprite' ? y / g.scaleY : y;
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
            return {'x': x, 'y': y, 'ox': cos, 'oy': sin, 'gx': g.x, 'gy': g.y, 'scaleX': g.scaleX, 'scaleY': g.scaleY, 'rotation': g.rotation};
        } else {
            return false;
        }
    },
    _parentOffset: function(e, child) {
        var g, x, y, r, a, cos, sin, x1, y1, b = this.container.getBoundingClientRect();
        g = child._global();
        x = e.pageX - (Math.floor(b.left) + window.pageXOffset);
        y = e.pageY - (Math.floor(b.top) + window.pageYOffset);
        x1 = child.className === 'Sprite' ? x / g.scaleX : x;
        y1 = child.className === 'Sprite' ? y / g.scaleY : y;
        r = Math.sqrt(Math.pow(x1 - g.x, 2) + Math.pow(y1 - g.y, 2));
        a = Math.atan2(y - g.y, x - g.x) - g.rotation;
        cos = Math.cos(a) * r;
        sin = Math.sin(a) * r;
        return {'x': x, 'y': y, 'ox': cos, 'oy': sin, 'gx': g.x, 'gy': g.y, 'scaleX': g.scaleX, 'scaleY': g.scaleY, 'rotation': g.rotation};
    },
    _global: function() {
        return {
            'x': this.x,
            'y': this.y,
            'scaleX': this.scaleX,
            'scaleY': this.scaleY,
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
     *@see text
     *@link text
     */
    clear: function() {
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].clear();
        }
    },
    /**
     *draw - Stage - draw all the elements object nested in Stage
     *@type method Stage
     *@description draw all the elements object nested in Stage
     *@param {context 2d} ctx NOT REQUIRED
     *@example stage.draw();
     *@returns {undefined} none none
     *@see text
     *@link text
     */
    draw: function(ctx) {
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].draw(ctx);
        }
    }
};
/**
 * Sprite - container for all type of DisplayObjects
 * @type constructor Sprite
 * @description container for all type of DisplayObjects
 * @property {number} width Stage width
 * @property {number} height Stage height
 * @property {number} x orizontal coordinate
 * @property {number} y vertical coordinate
 * @property {number} alpha opacity value in range 0-1
 * @property {number} scaleX orizontal scale
 * @property {number} scaleY vertival scale
 * @property {number} rotation rotation expressed in degrees
 * @property {boolean} visible visibility of the object
 * @property {string} className class name of the object
 * @property {number} id indentifier of the objet
 * @property {string} name name of the object
 * @property {array} children all the nested elements
 * @property {date} date the creation date of the object
 * @property {object element} parent parent child
 * @param {string} name name of the object
 * @param {boolean} enableevent enable/disable event listeners; default true
 * @example var myObject= new Canvas2d.Sprite('name optional');
 * @returns {Sprite Element} Sprite it self
 *@see text
 *@link text
 */
Canvas2d.Sprite = function(name, enableevent) {
    this.enabledEvent = enableevent === false ? enableevent : true;
    this.visible = true;
    this.name = name ? name : '';
    this.id = "sprite_" + (Canvas2d.globalId++).toString() + "_" + this.name;
    var globalContainer = Canvas2d.container;
    this.width = globalContainer.width;
    this.height = globalContainer.height;
    var container = document.createElement('canvas');
    container.width = this.width;
    container.height = this.height;
    container.id = this.id;
    container.style.position = 'absolute';
    container.style.top = '0px';
    container.style.left = '0px';
    this.canvas = container;
    this.ctx = container.getContext('2d');
    this.stage = globalContainer.element;
    this.className = "Sprite";
    this.indexCount = 0;
    this.date = new Date();
    this.children = [];
    this.index = 0;
    this.parent = null;
    this.x = 0;
    this.y = 0;
    this.alpha = 1;
    this.scaleX = 1;
    this.scaleY = 1;
    this.rotation = 0;
    this.evtListeners = {};
};
function _setContainer(child,parent){
    child.width=parent.width;
    child.height=parent.height;
    child.stage=parent.container;
    child.canvas.width=parent.width;
    child.canvas.height=parent.height;
    child.ctx=child.canvas.getContext('2d');
}
Canvas2d.Sprite.prototype = {
    /**
     * addEvent - Sprite - add an event into the listening cicle
     * @type method Sprite
     * @description add an event into the listening cicle
     * @param {event string} type event listener type
     * @param {function} func function to be call
     * @example myObject.addEvent('click',myFunction);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    addEvent: function(type, func) {
        if (type in this.evtListeners) {
            this.evtListeners[type].func.push(func);
        } else {
            this.evtListeners[type] = {'func': [func]};
        }
    },
    /**
     * removeEvent - Sprite - remove a preexistent event from the listening cicle
     * @type method Sprite
     * @description remove a preexistence event from the listening cicle
     * @param {event string} type event listener type
     * @param {type} func function to be remove
     * @example myObject.removeEvent('click');
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    removeEvent: function(type, func) {
        if (type in this.evtListeners) {
            for (var i = 0; i < this.evtListeners[type].func.length; i++) {
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
     * add - Sprite - add an element into the list of nested objects
     * @type method Sprite
     * @description add an element into the list of nested objects
     * @param {element object} child Sprite
     * @example sprite.add(DisplayObjects);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    add: function(child) {
        if (child.parent || child.className !== 'DisplayObjects') {
            return;
        }
        child.parent = this;
        child.index = this.indexCount;
        this.indexCount++;
        this.children.push(child);
    },
    /**
     * remove - Sprite - remove a preexistence object from the nested objects
     * @type method Sprite
     * @description remove a preexistence object from the nested objects
     * @param {element object} child Sprite
     * @example sprite.remove(DisplayObjects);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    remove: function(child) {
        if (child.parent !== this) {
            return;
        }
        child.parent = undefined;
        this.children.splice(child.index, 1);
        this.indexCount--;
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].index = i;
        }
    },
    /**
     * getBound - Sprite -
     * @type method Sprite
     * @description get the actual measure based on all the childrens object
     * @example var myValue= sprite.getBound(); result in {width:value,height:value}
     * @returns {object} bounds width and hwight
     * @see text
     * @link text
     */
    getBound: function(){
        var ax=[],ay=[],aw=[],ah=[];
        for (var i = 0; i < this.children.length; i++) {
            ax.push(this.children[i].x+this.children[i].width);
            ay.push(this.children[i].y+this.children[i].height);
        }
        function compareNumbers(a, b) {
            return a - b;
        }
        ax.sort(compareNumbers);
        ay.sort(compareNumbers);
        return {width:ax[ax.length-1],height:ay[ay.length-1]};
    },
    /**
     * zOrder - Sprite - change the order of a nested DisplayObjects passing either a index number or a string 'top' or 'bottom'
     * @type method Sprite
     * @description change the order of a nested DisplayObjects passing either a index number or a string 'top' or 'bottom'
     * @param {number string} n index
     * @example sprite.zOrder('top');
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    zOrder: function(n) {
        if (typeof n === 'string') {
            var len = this.parent.children.length;
            var el = n === 'top' ? len - 1 : n === 'bottom' ? 0 : len - 1;
            this.parent.children.splice(this.index, 1);
            this.parent.children.splice(el, 0, this);
            for (var i = 0; i < len; i++) {
                this.parent.children[i].index = i;
            }
            this.parent._orderCanvases();
        } else {
            if (n in this.parent.children) {
                this.parent.children.splice(this.index, 1);
                this.parent.children.splice(n, 0, this);
                for (var i = 0; i < this.parent.children.length; i++) {
                    this.parent.children[i].index = i;
                }
                this.parent._orderCanvases();
            }
        }
    },
    /**
     * clear - Stage - clear the stage from all objects
     * @type method Stage
     * @description clear the stage from all objects
     * @example stage.clear();
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    clear: function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },
    _global: function() {
        var g = this.parent._global(), cos, sin;
        if (this.parent.rotation !== 0) {
            var a = Math.atan2(this.y, this.x) + this.parent.rotation;
            var r = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
            cos = r * Math.cos(a);
            sin = r * Math.sin(a);
        } else {
            cos = this.x;
            sin = this.y;
        }
        return {
            'x': g.x + cos,
            'y': g.y + sin,
            'scaleX': g.scaleX * this.scaleX,
            'scaleY': g.scaleY * this.scaleY,
            'rotation': g.rotation + this.rotation,
            'alpha': g.alpha < 1 ? this.alpha * g.alpha : this.alpha,
            'visible': g.visible ? this.visible : false
        };
    },
    /**
     * clone - Sprite - clone a Sprite object returning a new one
     * @type method Sprite
     * @description clone a Sprite object returning a new one
     * @example var newObject=sprite.clone();
     * @returns {element object} newElement Sprite
     *@see text
     *@link text
     */
    clone: function() {
        var e = new Canvas2d.Sprite();
        for (var i = 0; i < this.children.length; i++) {
            var c = this.children[i].clone(this.children[i].name);
            e.add(c);
        }
        return e;
    },
    /**
     *draw - Sprite - draw all the elements object nested in Sprite
     *@type method Sprite
     *@description draw all the elements object nested in Sprite
     *@param {context 2d} ctx NOT REQUIRED
     *@example sprite.draw();
     *@returns {undefined} none none
     *@see text
     *@link text
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
        c.translate(g.x, g.y);
        c.scale(g.scaleX, g.scaleY);
        c.rotate(g.rotation);
        c.globalAlpha = g.alpha;
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].draw(c);
        }
        c.restore();
    }
};
/**
 * DisplayObjects - object constructor of all shapes, texts, images and clips
 * @type constructor DisplayObjects
 * @description object constructor of all shapes, texts, images and clips
 * @property {number} width Stage width
 * @property {number} height Stage height
 * @property {number} x orizontal coordinate
 * @property {number} y vertical coordinate
 * @property {number} alpha opacity value in range 0-1
 * @property {number} scaleX orizontal scale
 * @property {number} scaleY vertival scale
 * @property {number} rotation rotation expressed in degrees
 * @property {boolean} visible visibility of the object
 * @property {string} className class name of the object
 * @property {number} id indentifier of the objet
 * @property {string} name name of the object
 * @property {array} children all the nested elements
 * @property {date} date the creation date of the object
 * @property {object element} parent parent child
 * @param {string} name name of the object
 * @param {boolean} enableevent enable/disable event listeners; default true
 * @example var myObject= new Canvas2d.DisplayObjects('name optional');
 * @returns {DisplayObjects Element} DisplayObjects it self
 *@see text
 *@link text
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
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.localX = 0;
    this.localY = 0;
    this.scaleX = 1;
    this.scaleY = 1;
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
    this.imageCrop = {dw: -1, dh: -1, dx: 0, dy: 0};
    this.doneimage = false;
    this.currentFilter = null;
};
Canvas2d.DisplayObjects.prototype = {
    txt: '',
    close: true,
    fontStyle: null,
    fontSize: 10,
    fontType: 'Verdana',
    fontWeigth: 'normal',
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
    _alignList: {'start': 'start', 'end': 'end', 'left': 'left', 'right': 'right', 'center': 'center'},
    _baseList: {'top': 'top', 'hanging': 'hanging', 'middle': 'middle', 'alphabetic': 'alphabetic', 'ideographic': 'ideographic', 'bottom': 'bottom'},
    _capList: {'butt': 'butt', 'round': 'round', 'square': 'square'},
    _joinList: {'bevel': 'bevel', 'round': 'round', 'miter': 'miter'},
    /**
     * addEvent - DisplayObjects - add an event into the listening cicle
     * @type method DisplayObjects
     * @description add an event into the listening cicle
     * @param {event string} type event listener type
     * @param {function} func function to be call
     * @example myObject.addEvent('click',myFunction);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    addEvent: function(type, func) {
        if (type in this.evtListeners) {
            this.evtListeners[type].func.push(func);
        } else {
            this.evtListeners[type] = {'func': [func]};
        }
    },
    /**
     * removeEvent - DisplayObjects - remove a preexistent event from the listening cicle
     * @type method DisplayObjects
     * @description remove a preexistence event from the listening cicle
     * @param {event string} type event listener type
     * @param {type} func function to be remove
     * @example myObject.removeEvent('click');
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    removeEvent: function(type, func) {
        if (type in this.evtListeners) {
            for (var i = 0; i < this.evtListeners[type].func.length; i++) {
                if (this.evtListeners[type].func[i] === func) {
                    this.evtListeners[type].func.splice(i, 1);
                    break;
                }
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
     *@see text
     *@link text
     */
    zOrder: function(n) {
        if (typeof n === 'string') {
            var len = this.parent.children.length;
            var el = n === 'top' ? len - 1 : n === 'bottom' ? 0 : len - 1;
            this.parent.children.splice(this.index, 1);
            this.parent.children.splice(el, 0, this);
            for (var i = 0; i < len; i++) {
                this.parent.children[i].index = i;
            }
        } else {
            if (n in this.parent.children) {
                this.parent.children.splice(this.index, 1);
                this.parent.children.splice(n, 0, this);
                for (var i = 0; i < this.parent.children.length; i++) {
                    this.parent.children[i].index = i;
                }
            }
        }
    },
    /**
     * getColor - DisplayObjects - get the current object's fill color as requested format
     * @type method DisplayObjects
     * @description get the current object's fill color as requested format
     * @param {string} type request format
     * @example myObjects.getColor('rgb');
     * @returns {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     *@see text
     *@link text
     */
    getColor: function(type) {
        var t = type ? type : 'rgb';
        return this._parseGetColor(this.color, t);
    },
    /**
     * getLineColor - DisplayObjects - get the current object's line color as requested format
     * @type method DisplayObjects
     * @description get the current object's line color as requested format
     * @param {string} type request format
     * @example myObjects.getLineColor('rgb');
     * @returns {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     *@see text
     *@link text
     */
    getLineColor: function(type) {
        var t = type ? type : 'rgb';
        return this._parseGetColor(this.lineColor, t);
    },
//////////
//internal - switch the current color and return always an array rgb value
    _parseColor: function(color) {
        if (!color) {
            console.log(color, ' isn\'t a valid value.');
            return undefined;
        }
        if (typeof color === 'string') {
            var result = color.replace(/\s/g, "").toLowerCase();
            var re, ar;
            if (result.indexOf('rgb') > -1) {
                return result;
            } else if (result.indexOf('#') > -1) {
                var hex = Colors.Rgb(result);
                return 'rgb(' + hex[0] + ',' + hex[1] + ',' + hex[2] + ')';
            } else if (result.indexOf('hsl') > -1) {
                re = /[hsla\(\)]/g;
                ar = result.replace(re, '').split(',');
                var hsl = Colors.HslToRgb(parseFloat(ar[0]) / 360, parseFloat(ar[1]) / 100, parseFloat(ar[2]) / 100);
                return 'rgb(' + hsl[0] + ',' + hsl[1] + ',' + hsl[2] + ')';
            } else if (result.indexOf('hsv') > -1) {
                re = /[hsv\(\)]/g;
                ar = result.replace(re, '').split(',');
                var hsv = Colors.HsvToRgb(parseInt(ar[1]), parseInt(ar[2]), parseInt(ar[3]));
                return 'rgb(' + hsv[0] + ',' + hsv[1] + ',' + hsv[2] + ')';
            } else if (result in Colors.namedColor) {
                ar = Colors.namedColor[result][1];
                return 'rgb(' + ar[0] + ',' + ar[1] + ',' + ar[2] + ')';
            } else {
                console.log(color, ' isn\'t a valid value.');
                return 'rgb(0,0,0)';
            }
        } else {
            return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
        }
    },
//////////
//internal - switch the current color and return what specified as type - 'hex' 'rgb' 'hsl' 'hsv' 'name'
    _parseGetColor: function(color, type) {
        if (!color) {
            console.log(color, ' isn\'t a valid value.');
            return 'rgb(0,0,0)';
        }
        var co = this._parseColor(color);
        var re = /[rgbhslva\(\)]/g;
        var arc = co.replace(re, '').split(',');
        var ar = [parseInt(arc[0]), parseInt(arc[1]), parseInt(arc[2])];
        var r, cl = ar;
        switch (type) {
            case 'hex':
                cl = Colors.Hex(cl);
                break;
            case 'rgb':
                cl = co;
                break;
            case 'hsl':
                r = Colors.RgbToHsl(ar[0], ar[1], ar[2]);
                cl = 'hsl(' + r[0] * 360 + ',' + r[1] * 100 + '%,' + r[2] * 100 + '%)';
                break;
            case 'hsv':
                r = Colors.RgbToHsv(ar[0], ar[1], ar[2]);
                cl = 'hsv(' + r[0] * 360 + ',' + r[1] * 100 + '%,' + r[2] * 100 + '%)';
                break;
            case 'name':
                function approx(a, b, c) {
                    var d = (b - c <= a && b + c >= a) ? true : false;
                    return d;
                }
                var ap = 2;
                for (var i in Colors.namedColor) {
                    if (approx(Colors.namedColor[i][1][0], cl[0], ap) && approx(Colors.namedColor[i][1][1], cl[1], ap) && approx(Colors.namedColor[i][1][2], cl[2], ap)) {
                        cl = i;
                        break;
                    }
                }
                break;
            case 'array':
                cl = ar;
                break;
            default:
                cl = co;
                break;
        }
        return cl;
    },
    /**
     * cacheAsBitmap - DisplayObjects - render an object as image
     * @type method DisplayObjects
     * @description render an object as an image replacing the origin object
     * @example myObject.cacheAsBitmap();
     * @returns {void} none none
     *@see text
     *@link text
     */
    cacheAsBitmap: function() {
        var types = {polygon: "polygon", shape: "shape", text: "text", rect: "rect", rectround: "rectround", line: "line", circle: "circle"};
        if (this.type in types) {
        } else {
            console.log("wrong type ", this.type);
            return;
        }
        var fc = document.createElement("canvas"), ox = this.x, oy = this.y, or = this.rotation;
        var img = new Image();
        fc.width = this.width + this.lineWidth * 2;
        fc.height = this.height + this.lineWidth * 2;
        var xc = fc.getContext("2d");
        if (this.type === "polygon" || this.type === "shape") {
            ox = this.x - this.width / 2;
            oy = this.y - this.height / 2;
            this.x = Math.abs(this._coord.x[0]) + this.lineWidth;
            this.y = Math.abs(this._coord.y[0]) + this.lineWidth;
        } else {
            this.x = 0;
            this.y = 0;
        }
        this.rotation = 0;
        this.draw(xc);
        var data = fc.toDataURL("image/png", 10);
        img.src = data;
        this.img(0, 0, img, true);
        this.x = ox;
        this.y = oy;
        this.rotation = or;
    },
    /**
     * clone - DisplayObjects - clone a DisplayObjects element returning a new one
     * @type method DisplayObjects
     * @description clone a DisplayObjects element returning a new one
     * @param {object element} n DisplayObjects type element
     * @example var newObject=displayObject.clone(object);
     * @returns {element object} newElement DisplayObjects
     *@see text
     *@link text
     */
    clone: function(n) {
        var c = new Canvas2d.DisplayObjects(n);
        var ts = Object.prototype.toString;
        for (var o in this) {
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
        return c;
    },
    /**
     * rect - DisplayObjects - create a rectangle
     * @type constructor rect
     * @description create a rectangle
     * @param {number} x LOCAL orizontal coordinate
     * @param {number} y LOCAL vertical coordinate
     * @param {number} width object width
     * @param {number} height object height
     * @param {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {mixed} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} linewidth weight of line
     * @example myObject.rect(0,0,100,100,'rgb(255,230,120)','hsl(230,100%,50%)',2);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    rect: function(x, y, width, height, color, linecolor, linewidth) {
        this.type = 'rect';
        this.x = this.localX = x;
        this.y = this.localY = y;
        this.width = width;
        this.height = height;
        this._setStyle(color, linecolor, linewidth);
    },
    /**
     * rectRound - DisplayObjects - create a rectangle with rounded corner
     * @type constructor rectRound
     * @description create a rectangle width rounded corner
     * @param {number} x LOCAL orizontal coordinate
     * @param {number} y LOCAL vertical coordinate
     * @param {number} radius radius of corners
     * @param {number} width object width
     * @param {number} height object height
     * @param {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {mixed} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} linewidth weight of line
     * @example myObject.rectRound(0,0,100,100,10,'rgb(255,230,120)','hsl(230,100%,50%)',2);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    rectRound: function(x, y, width, height, radius, color, linecolor, linewidth) {
        this.type = 'rectround';
        this.x = this.localX = x;
        this.y = this.localY = y;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this._setStyle(color, linecolor, linewidth);
    },
    /**
     * polygon - DisplayObjects - create a polygon
     * @type constructor polygon
     * @description create a polygon
     * @param {number} x LOCAL orizontal coordinate
     * @param {number} y LOCAL vertical coordinate
     * @param {array} points a collection of two points coordinates [[x,y],..]
     * @param {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {mixed} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} linewidth weight of line
     * @param {boolean} close close/leave open the shape
     * @example myObject.polygon(0,0,[[0,0],[50,100],[-50,100]],'red','blue',true);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    polygon: function(x, y, points, color, linecolor, linewidth, close) {
        this.type = 'polygon';
        this.close = close === false ? close : true;
        this.x = this.localX = x;
        this.y = this.localY = y;
        this.points = points;
        this._setStyle(color, linecolor, linewidth);
        var pX = [], pY = [];
        for (var i = 0; i < this.points.length; i++) {
            pX.push(this.points[i][0] + this.localX);
            pY.push(this.points[i][1] + this.localY);
        }
        function compareNumbers(a, b) {
            return a - b;
        }
        pX.sort(compareNumbers);
        pY.sort(compareNumbers);
        function sum(a, b) {
            if (a > 0) {
                return b - a;
            } else {
                if (b < 0) {
                    return Math.abs(a + b);
                } else {
                    return Math.abs(a) + b;
                }
            }
        }
        this.width = sum(pX[0], pX[pX.length - 1]);
        this.height = sum(pY[0], pY[pY.length - 1]);
        this._coord = {x: pX, y: pY};
    },
    /**
     * shape - DisplayObjects - create a shape
     * @type constructor shape
     * @description create a shape
     * @param {number} x LOCAL orizontal coordinate
     * @param {number} y LOCAL vertical coordinate
     * @param {array} obj a collection of objects key-value; [{moveTo:[..]},{lineTo:[..]},{quadraticCurveTo:[....]},{bezierCurveTo:[....]},{arcTo:[...]}]
     * @param {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {mixed} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} linewidth weight of line
     * @param {boolean} close close/leave open the shape
     * @example myObject.shape(0,0,[{moveTo:[0,0]},{lineTo:[100,100]},{quadraticCurveTo:[50,50,10,10]},..],'red','blue',true);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    shape: function(x, y, obj, color, linecolor, linewidth, close) {
        this.type = 'shape';
        this.close = close === false ? close : true;
        this.x = this.localX = x;
        this.y = this.localY = y;
        this.obj = obj;
        this._setStyle(color, linecolor, linewidth);
        var pX = [], pY = [];
        for (var i = 0; i < this.obj.length; i++) {
            for (var o in this.obj[i]) {
                var obj1 = this.obj[i][o];
                switch (o) {
                    case 'moveTo':
                        pX.push(this.localX + obj1[0]);
                        pY.push(this.localY + obj1[1]);
                        break;
                    case 'lineTo':
                        pX.push(this.localX + obj1[0]);
                        pY.push(this.localY + obj1[1]);
                        break;
                    case 'quadraticCurveTo':
                        pX.push(this.localX + obj1[0]);
                        pY.push(this.localY + obj1[1]);
                        pX.push(this.localX + obj1[2]);
                        pY.push(this.localY + obj1[3]);
                        break;
                    case 'bezierCurveTo':
                        pX.push(this.localX + obj1[0]);
                        pY.push(this.localY + obj1[1]);
                        pX.push(this.localX + obj1[2]);
                        pY.push(this.localY + obj1[3]);
                        pX.push(this.localX + obj1[4]);
                        pY.push(this.localY + obj1[5]);
                        break;
                    case 'arcTo':
                        pX.push(this.localX + obj1[0]);
                        pY.push(this.localY + obj1[1]);
                        pX.push(this.localX + obj1[2]);
                        pY.push(this.localY + obj1[3]);
                        break;
                    default:
                        break;
                }
            }
        }
        function compareNumbers(a, b) {
            return a - b;
        }
        pX.sort(compareNumbers);
        pY.sort(compareNumbers);
        function sum(a, b) {
            if (a > 0) {
                return b - a;
            } else {
                if (b < 0) {
                    return Math.abs(a + b);
                } else {
                    return Math.abs(a) + b;
                }
            }
        }
        ;
        this.width = sum(pX[0], pX[pX.length - 1]);
        this.height = sum(pY[0], pY[pY.length - 1]);
        this._coord = {x: pX, y: pY};
    },
    /**
     * line - DisplayObjects - creatye a line
     * @type constructor line
     * @description create a line
     * @property {array} points contain two array corresponding to the coordinates x,y of [x0,y0],[x1,y1]
     * @param {number} x LOCAL orizontal coordinate
     * @param {number} y LOCAL vertical coordinate
     * @param {number} x0 starting orizontal coordinate
     * @param {number} y0 starting vertical coordinate
     * @param {number} x1 ending orizontal coordinate
     * @param {number} y1 ending vertical coordinate
     * @param {type} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} linewidth weight of line
     * @param {type} lineCap style of edge of line; butt, round, square; default butt
     * @param {type} lineJoin style of joining lines; bevel, round, miter; default miter
     * @param {number} lineMiter amount of exiding weight of line
     * @example myObject.line(0,0,-10,0,10,0,'blue',2,'round','miter',10);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    line: function(x, y, x0, y0, x1, y1, linecolor, linewidth, lineCap, lineJoin, lineMiter) {
        this.type = 'line';
        this.x = this.localX = x;
        this.y = this.localY = y;
        this.points = [[x0, y0], [x1, y1]];
        var pX = [], pY = [];
        for (var i = 0; i < this.points.length; i++) {
            pX.push(this.points[i][0] + this.localX);
            pY.push(this.points[i][1] + this.localY);
        }
        function compareNumbers(a, b) {
            return a - b;
        }
        pX.sort(compareNumbers);
        pY.sort(compareNumbers);
        this.width = sum(pX[0], pX[pX.length - 1]);
        this.height = sum(pY[0], pY[pY.length - 1]);
        function sum(a, b) {
            if (a > 0) {
                return b - a;
            } else {
                if (b < 0) {
                    return Math.abs(a + b);
                } else {
                    return Math.abs(a) + b;
                }
            }
        }
        this._coord = {x: pX, y: pY};
        this.len = Math.sqrt(Math.pow(x0 + x1, 2) + Math.pow(y0 + y1, 2));
        this._setStyle(null, linecolor, linewidth, lineCap, lineJoin, lineMiter);
    },
    /**
     * circle - DisplayObjects - create a crcle
     * @type constructor circle
     * @description create a circle
     * @param {type} x LOCAL orizontal coordinate
     * @param {type} y LOCAL vertical coordinate
     * @param {type} radius radius width
     * @param {type} startAngle starting point angle in degrees
     * @param {type} endAngle ending point angle in degrees
     * @param {type} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {type} linecolor color value; hex, name, array, string; rgb, hsl, hsv
     * @param {type} linewidth weight of line
     * @example myObject.circle(0,0,50,0,Math.PI*2,[0,0,0],[255,255,255],2);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    circle: function(x, y, radius, startAngle, endAngle, color, linecolor, linewidth) {
        this.type = 'circle';
        this.x = this.localX = x;
        this.y = this.localY = y;
        this.width = radius * 2;
        this.height = radius * 2;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this._setStyle(color, linecolor, linewidth);
    },
    /**
     * text - DisplayObjects - create a text field
     * @type constructor text
     * @description create a text field
     * @param {string} txt the text to use for text field
     * @param {number} x LOCAL orizontal coordinate
     * @param {number} y LOCAL vertical coordinate
     * @param {string} fontweigth style of weight text field; normal, bold, italic, bold italic; default normal
     * @param {number} fontsize the size of font
     * @param {string} font the font-family type to use for the text fiel; default Verdana, multiple value are allowed
     * @param {mixed} color color value; hex, name, array, string; rgb, hsl, hsv
     * @param {object} background an object rapresenting the style of the twxt field background; {color:..,linecolor:..,linewidth:..}
     * @param {string} align the orizontal alignment of the text field; start, end, left, right, center; default left
     * @param {string} baseline the vertical alignment of text field; top, hanging, middle, alphabetic, ideographic, bottom; default alphabetic
     * @example myObject.text('testo da inserire',0,0,'normal',18,'Verdana,Helvetica,Sans-serife',{color:'red'},'center','bottom');
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    text: function(txt, x, y, fontweigth, fontsize, font, color, background, align, baseline) {
        this.type = 'text';
        this.x = this.localX = x;
        this.y = this.localY = y;
        var ctx = Canvas2d.fakeCtx;
        this.height = fontsize ? fontsize : 10;
        this.txt = txt ? txt : '';
        this.backGround = background ? background : null;
        this._setFont(fontweigth, fontsize, font, align, baseline);
        this._setStyle(color);
        ctx.font = this.fontStyle;
        ctx.textAlign = this.align;
        ctx.textBaseline = this.baseLine;
        this.width = ctx.measureText(txt).width;
    },
    /**
     * img - DisplayObjects - create an image
     * @type constructor img
     * @description create an image
     * @param {number} x LOCAL orizontal coordinate
     * @param {number} y LOCAL vertical coordinate
     * @param {mixed} source img DOM Element or string url
     * @param {boolean} show determin if manage directly or automatically the process of loading
     * @param {mixed} color color applied to the background value; hex, name, array, string; rgb, hsl, hsv
     * @param {number} paddingleft left right amount of border
     * @param {number} paddingtop top bottom amount of border
     * @param {object} crop an object list of point for display just a section of the image; {dx:0,dy:0,dw:100,dh:100}
     * @example myObject.img(0,0,'images/myimage.jpg',true,'black',10,10,{dx:0,dy:0,dw:100,dh:100});
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    img: function(x, y, source, show, color, paddingleft, paddingtop, crop) {
        this.type = 'img';
        this.x = this.localX = x;
        this.y = this.localY = y;
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
     * @type constructor clip
     * @description create a clip
     * @param {number} x LOCAL orizontal coordinate
     * @param {number} y LOCAL vertical coordinate
     * @param {mixed} source img DOM Element or string url
     * @param {array} framelist a list of object that specified the sequence of image to cut;[{x,..,y:..,map:{x:..,y:..,width:..,height:..},...]
     * @param {type} show determin if manage directly or automatically the process of loading
     * @example myObject.clip(0,0,'images/myimage.png',[{x,..,y:..,map:{x:..,y:..,width:..,height:..},...],true);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    clip: function(x, y, source, framelist, show) {
        this.type = 'clip';
        this.x = this.localX = x;
        this.y = this.localY = y;
        this.source = source ? source : null;
        this.frameList = framelist ? framelist : this.frameList;
        if (show) {
            this.loadImage(this.source, null, null, show);
        }
    },
    /**
     * restore - DisplayObjects - restore the original image
     * @type method DisplayObjects
     * @description restore the original image
     * @example myObject.restore();
     * @returns {undefined} doneimage booleane
     *@see text
     *@link text
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
     *@see text
     *@link text
     */
    setCrop: function(args) {
        if (!args) {
            return;
        }
        for (var i in this.imageCrop) {
            this.imageCrop[i] = args[i] ? args[i] : this.imageCrop[i];
        }
        this.doneimage = false;
    },
    /**
     * filter - displayObjects - apply a filter to the image
     * @type method filter
     * @description apply a filter to the image
     * @param {string} type the filter type; hsl, invert, grayscale, pixelated
     * @param {array} args list of rgb color [...,...,...]
     * @example myObject.filter('hsl',[250,100,50]);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    filter: function(type, args) {
        if (this.backUpImage) {
            this.imageData = this.backUpImage;
        }
        var c = document.createElement("canvas");
        c.width = this.width;
        c.height = this.height;
        var cx = c.getContext("2d");
        cx.drawImage(this.imageData, 0, 0, this.width, this.height);
        var data = cx.getImageData(0, 0, this.width, this.height);
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
        var value = args ? args[0] : 2;
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
        for (var i = 0; i < d.length; i += 4) {
            var br = 0.34 * d[i] + 0.5 * d[i + 1] + 0.16 * d[i + 2];
            d[i] = br; //red
            d[i + 1] = br; //green
            d[i + 2] = br; //blue
        }
        return data;
    },
    _filterInvert: function(data) {
        var d = data.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] = 255 - d[i]; //red
            d[i + 1] = 255 - d[i + 1]; //green
            d[i + 2] = 255 - d[i + 2]; //blue
        }
        return data;
    },
    _filterHsl: function(data, args) {
        var d = data.data;
        for (var i = 0; i < d.length; i += 4) {
            var hsl = Colors.RgbToHsl(d[i], d[i + 1], d[i + 2]);
            var h = hsl[0] + (args[0] / 100) <= 0 ? 0 : hsl[0] + (args[0] / 100) >= 120 ? 120 : hsl[0] + (args[0] / 100);
            var s = hsl[1] + (args[1] / 100) <= 0 ? 0 : hsl[1] + (args[1] / 100) >= 100 ? 100 : hsl[1] + (args[1] / 100);
            var l = hsl[2] + (args[2] / 100) <= 0 ? 0 : hsl[2] + (args[2] / 100) >= 100 ? 100 : hsl[2] + (args[2] / 100);
            var rgb = Colors.HslToRgb(h, s, l);
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
     *@see text
     *@link text
     */
    loadImage: function(source, progressaction, completeaction, show) {
        this._progressEvent = progressaction;
        this._completeEvent = completeaction;
        this.source = source ? source : this.source;
        if (typeof this.source === 'object') {
            this.image = this.source;
            this.width = this.image.width;
            this.height = this.image.height;
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
    },
    _loadProgress: function(e) {
        if (this.caller._progressEvent) {
            this.caller._progressEvent.apply(this.caller, [e]);
        }
        this.caller.isLoading = true;
        this.caller.loadComplete = false;
    },
    _loadComplete: function(e) {
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
    _base64Encode: function(inputStr, caller, show)
    {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var outputStr = "";
        var i = 0;

        while (i < inputStr.length)
        {
//all three "& 0xff" added below are there to fix a known bug 
//with bytes returned by xhr.responseText
            var byte1 = inputStr.charCodeAt(i++) & 0xff;
            var byte2 = inputStr.charCodeAt(i++) & 0xff;
            var byte3 = inputStr.charCodeAt(i++) & 0xff;

            var enc1 = byte1 >> 2;
            var enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);

            var enc3, enc4;
            if (isNaN(byte2))
            {
                enc3 = enc4 = 64;
            }
            else
            {
                enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
                if (isNaN(byte3))
                {
                    enc4 = 64;
                }
                else
                {
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
                    caller.width = caller.image.width;
                    caller.height = caller.image.height;
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
     *@param {boolean} show dethermin if the image as to be shown as soon as ready
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
     *@param {color} color { a color as array rgb hex string or name }
     *@param linecolor { a color as array rgb or hex string or name }
     *@param linewidth { the width of the stroke }
     *@param linecap { string - 'butt' or 'round' or 'square' - default 'butt' }
     *@param linejoin {strin - 'bevel' or 'round' or 'miter' - default 'miter' }
     *@param miterlimit { number - default 10 }
     */
    _setStyle: function(color, linecolor, linewidth, linecap, linejoin, miterlimit) {
        this.color = color;
        this.lineColor = linecolor;
        this.lineCap = (this._capList[linecap]) ? linecap : 'butt';
        this.lineJoin = (this._joinList[linejoin]) ? linejoin : 'miter';
        this.lineWidth = (linewidth) ? linewidth : 1.0;
        this.lineMiter = parseInt(miterlimit) ? parseInt(miterlimit) : 10;
    },
    /**
     *_setLineStyle - DisplayObjects INTERNAL ONLY - set the line style when drawning
     *@param {context} ctx
     */
    _setLineStyle: function(ctx) {
        if (this.lineGradient) {
            if (this.lineShadow) {
                ctx.save();
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = this.lineCap;
                ctx.lineJoin = this.lineJoin;
                ctx.miterLimit = this.lineMiter;
                ctx.shadowColor = this.lineShadow.color;
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
                ctx.shadowColor = this.lineShadow.color;
                ctx.shadowOffsetX = this.lineShadow.offsetX;
                ctx.shadowOffsetY = this.lineShadow.offsetY;
                ctx.shadowBlur = this.lineShadow.blur;
                if (this.lineColor) {
                    ctx.globalAlpha = this._g.lineAlpha;
                    ctx.strokeStyle = this.lineColor;
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
                    ctx.strokeStyle = this.lineColor;
                    ctx.stroke();
                }
            }
        }
    },
    /**
     *_setFillStyle - DisplayObjects INTERNAL ONLY - set the fill style when drawning
     *@param {context} ctx
     */
    _setFillStyle: function(ctx) {
        if (this.gradient) {
            if (this.shadow) {
                ctx.save();
                ctx.shadowColor = this.shadow.color;
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
                ctx.shadowColor = this.shadow.color;
                ctx.shadowOffsetX = this.shadow.offsetX;
                ctx.shadowOffsetY = this.shadow.offsetY;
                ctx.shadowBlur = this.shadow.blur;
                if (this.color) {
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
                ctx.restore();
            } else {
                if (this.color) {
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
            }
        }
    },
    /**
     *_setFont - DisplayObjects INTERNAL ONLY - set the constructor text fonts properties
     *@param fontweight { string - font weigth 'bold', 'italic', 'normal' etc.. - default 'normal' }
     *@param fontsize { number - font width in pixel - default 10 }
     *@param font { string - type font - default 'Verdana'}
     *@param align { string - 'start' or 'end' or 'left' or 'right' or 'center' - default 'start' }
     *@param base { string - 'top' or 'hanging' or 'middle' or 'alphabetic' or 'ideographic' or 'bottom' - default 'alphabetic' }
     */
    _setFont: function(fontweight, fontsize, font, align, base) {
        this.fontWeigth = fontweight ? fontweight : this.fontWeigth;
        this.fontStyle = this.fontWeigth + ' ' + fontsize.toString() + 'px ' + font;
        this.fontType = font;
        this.fontSize = fontsize;
        this.align = (this._alignList[align]) ? align : 'center';
        this.baseLine = (this._baseList[base]) ? base : 'alphabetic';
    },
    /**
     *_setShadow - DisplayObjects INTERNAL ONLY - set the fill shadow style when drawning
     *@param {context} ctx
     */
    _setShadow: function(ctx) {
        if (this.shadow) {
            ctx.shadowColor = this.shadow.color;
            ctx.shadowOffsetX = this.shadow.offsetX;
            ctx.shadowOffsetY = this.shadow.offsetY;
            ctx.shadowBlur = this.shadow.blur;
        }
    },
    /**
     *_setLineShadow - DisplayObjects INTERNAL ONLY - set the stroke shadow style when drawning
     *@param {context} ctx
     */
    _setLineShadow: function(ctx) {
        if (this.lineShadow) {
            ctx.shadowColor = this.lineShadow.color;
            ctx.shadowOffsetX = this.lineShadow.offsetX;
            ctx.shadowOffsetY = this.lineShadow.offsetY;
            ctx.shadowBlur = this.lineShadow.blur;
        }
    },
    /**
     *_setGradient - DisplayObjects INTERNAL ONLY - set the fill gradient style when drawning
     *@example var linearGradient={'offset':[0,1],'color':[color,color],'type':'linear','coord':{'x0':0,'y0':0,'x1':30,'y1':30}};
     *var radialGradient={'offset':[0,1],'color':[color,color],'type':'radial','coord':{'x0':0,'y0':0,'r0':0,'x1':30,'y1':30,'r1':15}};
     *all REQUIRED
     *linear: two array with 'offset' number [0,1] and 'color' [color,color],
     *an object 'coord' { x0 y0 - stating point, x1 y1 - ending point }
     *for radial 'coord' { x0 y0 r0- stating point and radius, x1 y1 r1 - ending point and radius }
     *@param {context} ctx
     */
    _setGradient: function(ctx) {
        var gradient;
        var g = this.gradient;
        if (g.type === 'linear') {
            gradient = ctx.createLinearGradient(g.coord.x0, g.coord.y0, g.coord.x1, g.coord.y1);
        } else if (g.type === 'radial') {
            gradient = ctx.createRadialGradient(g.coord.x0, g.coord.y0, g.coord.r0, g.coord.x1, g.coord.y1, g.coord.r1);
        }
        for (var i = 0; i < g.color.length; i++) {
            gradient.addColorStop(g.offset[i], g.color[i]);
        }
        ctx.fillStyle = gradient;
        ctx.fill();
    },
    /**
     *_setLineGradient - DisplayObjects INTERNAL ONLY - set the stroke gradient style when drawning
     *@example var linearGradient={'offset':[0,1],'color':[color,color],'type':'linear','coord':{'x0':0,'y0':0,'x1':30,'y1':30}};
     *var radialGradient={'offset':[0,1],'color':[color,color],'type':'radial','coord':{'x0':0,'y0':0,'r0':0,'x1':30,'y1':30,'r1':15}};
     *all REQUIRED
     *linear: two array with 'offset' number [0,1] and 'color' [color,color],
     *an object 'coord' { x0 y0 - stating point, x1 y1 - ending point }
     *for radial 'coord' { x0 y0 r0- stating point and radius, x1 y1 r1 - ending point and radius }
     *@param {context} ctx
     */
    _setLineGradient: function(ctx) {
        var gradient;
        var g = this.lineGradient;
        if (g.type === 'linear') {
            gradient = ctx.createLinearGradient(g.coord.x0, g.coord.y0, g.coord.x1, g.coord.y1);
        } else if (g.type === 'radial') {
            gradient = ctx.createRadialGradient(g.coord.x0, g.coord.y0, g.coord.r0, g.coord.x1, g.coord.y1, g.coord.r1);
        }
        for (var i = 0; i < g.color.length; i++) {
            gradient.addColorStop(g.offset[i], g.color[i]);
        }
        ctx.stokeStyle = gradient;
        ctx.stroke();
    },
    /**
     *_drawRect - DisplayObjects INTERNAL ONLY -
     *@param {context} ctx
     *@param {context} buffer
     */
    _drawRect: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        ctx.rect(this.localX, this.localY, this.width, this.height);
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
     *@param {context} ctx
     *@param {context} buffer
     */
    _drawRoundRect: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        var lx, mx, ly, my;
        lx = this.localX + (this.width - this.radius);
        mx = this.localX + this.width;
        ly = this.localY + (this.height - this.radius);
        my = this.localY + this.height;
        ctx.moveTo(this.localX + this.radius, this.localY);
        ctx.lineTo(lx, this.localY);
        ctx.quadraticCurveTo(mx, this.localY, mx, this.localY + this.radius);
        ctx.lineTo(this.localX + this.width, ly);
        ctx.quadraticCurveTo(mx, my, lx, this.localY + this.height);
        ctx.lineTo(this.localX + this.radius, my);
        ctx.quadraticCurveTo(this.localX, my, this.localX, ly);
        ctx.lineTo(this.localX, this.localY + this.radius);
        ctx.quadraticCurveTo(this.localX, this.localY, this.localX + this.radius, this.localY);
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
     *@param {context} ctx
     *@param {context} buffer
     */
    _drawPolygon: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        var pX = [], pY = [];
        for (var i = 0; i < this.points.length; i++) {
            if (i === 0) {
                ctx.moveTo(this.localX + this.points[i][0], this.localY + this.points[i][1]);
            } else {
                ctx.lineTo(this.points[i][0] + this.localX, this.points[i][1] + this.localY);
            }
            pX.push(this.points[i][0] + this.localX);
            pY.push(this.points[i][1] + this.localY);
        }
        if (this.close) {
            ctx.closePath();
        }
        if (!buffer) {
            this._setFillStyle(ctx);
            this._setLineStyle(ctx);
            function sum(a, b) {
                if (a > 0) {
                    return b - a;
                } else {
                    if (b < 0) {
                        return Math.abs(a + b);
                    } else {
                        return Math.abs(a) + b;
                    }
                }
            }
            pX.sort(function(a, b) {
                return a - b;
            });
            pY.sort(function(a, b) {
                return a - b;
            });
            this.width = sum(pX[0], pX[pX.length - 1]);
            this.height = sum(pY[0], pY[pY.length - 1]);
            this._coord = {x: pX, y: pY};
        }
        ctx.restore();
        if (this.mask) {
            ctx.clip();
        }
    },
    /**
     *_drawShape - DisplayObjects INTERNAL ONLY -
     *@param {context} ctx
     *@param {context} buffer
     */
    _drawShape: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        var pX = [], pY = [];
        for (var i = 0; i < this.obj.length; i++) {
            for (var o in this.obj[i]) {
                var obj = this.obj[i][o];
                switch (o) {
                    case 'moveTo':
                        ctx.moveTo(this.localX + obj[0], this.localY + obj[1]);
                        pX.push(this.localX + obj[0]);
                        pY.push(this.localY + obj[1]);
                        break;
                    case 'lineTo':
                        ctx.lineTo(this.localX + obj[0], this.localY + obj[1]);
                        pX.push(this.localX + obj[0]);
                        pY.push(this.localY + obj[1]);
                        break;
                    case 'quadraticCurveTo':
                        ctx.quadraticCurveTo(this.localX + obj[0], this.localY + obj[1], this.localX + obj[2], this.localY + obj[3]);
                        pX.push(this.localX + obj[0]);
                        pY.push(this.localY + obj[1]);
                        pX.push(this.localX + obj[2]);
                        pY.push(this.localY + obj[3]);
                        break;
                    case 'bezierCurveTo':
                        ctx.bezierCurveTo(this.localX + obj[0], this.localY + obj[1], this.localX + obj[2], this.localY + obj[3], this.localX + obj[4], this.localY + obj[5]);
                        pX.push(this.localX + obj[0]);
                        pY.push(this.localY + obj[1]);
                        pX.push(this.localX + obj[2]);
                        pY.push(this.localY + obj[3]);
                        pX.push(this.localX + obj[4]);
                        pY.push(this.localY + obj[5]);
                        break;
                    case 'arcTo':
                        ctx.arcTo(this.localX + obj[0], this.localY + obj[1], this.localX + obj[2], this.localY + obj[3], obj[4]);
                        pX.push(this.localX + obj[0]);
                        pY.push(this.localY + obj[1]);
                        pX.push(this.localX + obj[2]);
                        pY.push(this.localY + obj[3]);
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
            function sum(a, b) {
                if (a > 0) {
                    return b - a;
                } else {
                    if (b < 0) {
                        return Math.abs(a + b);
                    } else {
                        return Math.abs(a) + b;
                    }
                }
            }
            pX.sort(function(a, b) {
                return a - b;
            });
            pY.sort(function(a, b) {
                return a - b;
            });
            this.width = sum(pX[0], pX[pX.length - 1]);
            this.height = sum(pY[0], pY[pY.length - 1]);
            this._coord = {x: pX, y: pY};
        }
        ctx.restore();
        if (this.mask) {
            ctx.clip();
        }
    },
    /**
     *_drawLine - DisplayObjects INTERNAL ONLY -
     *@param {context} ctx
     *@param {context} buffer
     */
    _drawLine: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        ctx.moveTo(this.points[0][0] + this.localX, this.points[0][1] + this.localY);
        ctx.lineTo(this.points[1][0] + this.localX, this.points[1][1] + this.localY);
        ctx.closePath();
        this._setLineStyle(ctx);
        var pX = [], pY = [];
        for (var i = 0; i < this.points.length; i++) {
            pX.push(this.points[i][0] + this.localX);
            pY.push(this.points[i][1] + this.localY);
        }
        function compareNumbers(a, b) {
            return a - b;
        }
        pX.sort(compareNumbers);
        pY.sort(compareNumbers);
        this.width = sum(pX[0], pX[pX.length - 1]);
        this.height = sum(pY[0], pY[pY.length - 1]);
        function sum(a, b) {
            if (a > 0) {
                return b - a;
            } else {
                if (b < 0) {
                    return Math.abs(a + b);
                } else {
                    return Math.abs(a) + b;
                }
            }
        }
        this._coord = {x: pX, y: pY};
        this.len = Math.sqrt(Math.pow(pX[0] + pX[1], 2) + Math.pow(pY[0] + pY[1], 2));
        ctx.restore();
    },
    /**
     *_drawCircle - DisplayObjects INTERNAL ONLY -
     *@param {context} ctx
     *@param {context} buffer
     */
    _drawCircle: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        ctx.beginPath();
        ctx.arc(this.localX, this.localY, this.radius, this.startAngle, this.endAngle, false);
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
     *_drawText - DisplayObjects INTERNAL ONLY -
     *@param {context} ctx
     *@param {context} buffer
     */
    _drawText: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        this.fontStyle = this.fontWeigth + ' ' + this.fontSize + 'px ' + this.fontType;
        ctx.font = this.fontStyle;
        ctx.textAlign = this.align;
        ctx.textBaseline = this.baseLine;

        var offsetY = this.height / 7;
        var offsetX = 0;
        switch (this.baseLine) {
            case 'top':
                offsetY = -(this.height / 7);
                break;
            case 'hanging':
                offsetY = -(this.height / 7);
                break;
            case 'middle':
                offsetY = (this.height / 7) * 3.5;
                break;
            case 'alphabetic':
                offsetY = (this.height / 7) * 5.8;
                break;
            case 'ideographic':
                offsetY = this.height;
                break;
            case 'bottom':
                offsetY = this.height;
                break;
            default:
                offsetY = 0;
                break;
        }
        var measure = ctx.measureText(this.txt);
        this.width = measure.width + this.paddingLeft;
        if (this.align === 'center') {
            offsetX = this.width / 2;
        } else if (this.align === 'right' || this.align === 'end') {
            offsetX = this.width;
        }
        ctx.beginPath();
        ctx.rect(this.localX - offsetX - this.paddingLeft, this.localY - offsetY - this.paddingTop, this.width + (this.paddingLeft * 2), this.height + (this.paddingTop * 2));
        ctx.closePath();
        if (this.backGround) {
            if (!buffer) {
                if (this.backGround.color) {
                    ctx.fillStyle = this.backGround.color;
                    ctx.fill();
                }
                if (this.backGround.lineColor) {
                    ctx.lineWidth = this.backGround.lineWidth ? this.backGround.lineWidth : 2;
                    ctx.strokeStyle = this.backGround.lineColor;
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
                    ctx.fillText(this.txt, this.localX, this.localY);
                    ctx.restore();
                } else {
                    ctx.save();
                    if (this.shadow) {
                        this._setShadow(ctx);
                    }
                    ctx.fillStyle = this.color;
                    ctx.fillText(this.txt, this.localX, this.localY);
                    ctx.restore();
                }
            }
            if (this.lineColor) {
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = this.lineCap;
                ctx.lineJoin = this.lineJoin;
                ctx.miterLimit = this.lineMiter;
                ctx.strokeStyle = this.lineColor;

                if (this.lineGradient) {
                    ctx.save();
                    if (this.lineShadow) {
                        this._setLineShadow(ctx);
                    }
                    this._setLineGradient(ctx);
                    ctx.strokeText(this.txt, this.localX, this.localY);
                    ctx.restore();
                } else {
                    ctx.save();
                    if (this.lineShadow) {
                        this._setLineShadow(ctx);
                    }
                    ctx.strokeStyle = this.lineColor;
                    ctx.strokeText(this.txt, this.localX, this.localY);
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
     *@param {context} ctx
     *@param {context} buffer
     */
    _drawImage: function(ctx, buffer) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;

        if (this.loadComplete && this.image) {
            this.width = this.imageCrop.dw === -1 ? this.width : this.imageCrop.dw;
            this.height = this.imageCrop.dh === -1 ? this.height : this.imageCrop.dh;
            ctx.beginPath();
            ctx.rect(this.localX - (this.paddingLeft), this.localY - (this.paddingTop), this.width + (this.paddingLeft * 2), this.height + (this.paddingTop * 2));
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
                    c.width = this.width;
                    c.height = this.height;
                    var cx = c.getContext("2d");
                    cx.drawImage(this.image, this.imageCrop.dx, this.imageCrop.dy, this.width, this.height, 0, 0, this.width, this.height);
                    this.imageData = c;
                    this.backUpImage = c;

                }
                ctx.drawImage(this.imageData, this.localX, this.localY, this.width, this.height);
                ctx.closePath();
            }
        }
        ctx.restore();
    },
    /**
     *_drawClip - DisplayObjects INTERNAL ONLY -
     *@param {context} ctx
     *@param {context} buffer
     */
    _drawClip: function(ctx, buffer) {
        if (!this.frameList) {
            return;
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this._g.alpha;
        if (this.loadComplete && this.image && this.frameList[this.currentFrame].data) {
            ctx.beginPath();
            ctx.rect(this.localX, this.localY, this.frameList[this.currentFrame].map.width, this.frameList[this.currentFrame].map.height);
            ctx.closePath();
            if (!buffer) {
                this._setFillStyle(ctx);
                this._setLineStyle(ctx);
                this._setShadow(ctx);
                ctx.beginPath();
                ctx.drawImage(this.frameList[this.currentFrame].data, this.localX + this.frameList[this.currentFrame].x, this.localY + this.frameList[this.currentFrame].y);
                ctx.closePath();
            }
        }
        ctx.restore();
    },
    _global: function() {
        var g = this.parent._global();
        return {
            'x': this.x,
            'y': this.y,
            'scaleX': this.scaleX,
            'scaleY': this.scaleY,
            'rotation': g.rotation + this.rotation,
            'alpha': g.alpha < 1 ? this.alpha * g.alpha : this.alpha,
            'lineAlpha': g.alpha < 1 ? this.lineAlpha * g.alpha : this.lineAlpha,
            'visible': g.visible ? this.visible : false
        };
    },
    /**
     *draw - DisplayObjects - INTERNAL ONLY call instead myObject.parent.draw();
     *@type method DisplayObjects
     *@description INTERNAL ONLY call instead myObject.parent.draw();
     *@param {context 2d} ctx NOT REQUIRED
     *@param {boolean} buffer INTERNAL ONLY
     *@example myObject.parent.draw();
     *@returns {undefined} none none
     *@see text
     *@link text
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
 * Tweener - Canvas2d prototype
 * @type constructor Tweener
 * @description create a tweener object that animate a certain property through time
 * @property {array} children list of nested objects
 * @property {object element} parent parent child
 * @example var myTween=new Canvas2d.Tweener();
 * @returns {void} Tweener current tweening object
 *@see text
 *@link text
 */
Canvas2d.Tweener = function() {
    this.children = {};
    this._tempChildren = {};
    this.charList=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ','0','1','2','3','4','5','6','7','8','9',',','"','\'',',',':',';','(',')','[',']','{','}','*','@','.','!','?','\\','/','<','>','#','+','-','_','=','^','ì','è','é','ò','à','ù','&','$','£','|','∞','°','ç'];
};
Canvas2d.Tweener.prototype = {
    /**
     * getFrame - Tweener - get the current increasing number of frame fired
     * @type method Tweener
     * @description get the current increasing number of frame fired.
     * @example myTween.getFrame();
     * @returns {number} frame number of frame executed
     *@see text
     *@link text
     */
    getFrame: function() {
        return window.rqanim.getFrame();
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
        return window.rqanim.getTime();
    },
    /**
     *getFps - Tweener - get the current number of frame per seconds
     * @type method Tweener
     *@description get the current number of frame per seconds
     *@example myTween.getFps();
     *@returns {number} fps frame per seconds
     *@see text
     *@link text
     */
    getFps: function() {
        return window.rqanim.getFps();
    },
    /**
     * getTimeInterval - Tweener - get the actual delay in millisecond between cicle loops
     * @type method Tweener
     * @description get the actual delay in millisecond between cicle loops
     * @example myTween.getTimeInterval();
     * @returns {number} float milliseconds
     *@see text
     *@link text
     */
    getTimeInterval: function() {
        return window.rqanim.getTimeInterval();
    },
    /**
     * addTweener - Tweener - Add an objects with parameter to be transitioned
     * @type method Tweener
     * @description add an objects with parameters to be translated in time
     * @param {object} o a Sprite or DisplayObjects element
     * @param {object} args a list of parameter
     * @example myTween.addTweener(myObject,{params:values,...,duration:milliseconds,ease:easeType});
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    addTweener: function(o, args) {
        if (o.parent === null || o.parent === undefined) {
            console.log(typeof o.parent, 'provide a nested object');
            return;
        }
        var twnobj = {};
        var properties = ['x', 'y', 'width', 'height', 'rotation', 'scaleX', 'scaleY', 'lineWidth', 'fontSize', 'radius','startAngle','endAngle'];
        var x, colorReq, r, g, b, rqAlpha, rqlineAlpha, alpha, lineAlpha, colorSrc, data = args['data'] ? args['data'] : null;
        var delay = args['delay'] ? args['delay'] : 0;
        var ease = args['ease'] ? args['ease'] : 'easeNone';
        var duration = args['duration'] ? args['duration'] : 1000;
        for (var i in args) {
            for (var n = 0; n < properties.length; n++) {
                if (i === properties[n]) {
                    x = (args[i] > o[i]) ? args[i] - o[i] : -(o[i] - args[i]);
                    twnobj[i] = {ease: ease, to: x, ct: 0, d: duration, from: o[i], prop: i, request: args[i], target: o};
                }
            }
        }
        if ('obj' in args) {
            if (!o['obj']) {
                return;
            }
            twnobj['obj'] = {ease: ease, to: [], ct: 0, d: duration, from: [], prop: 'obj', subprop: [], index: [], request: [], target: o};
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
        if('txt' in args){
            if(o['txt']==='') return;
            args.txt=args.txt!==''?args.txt:'cutFwd';
            r=[];var d=[];g=o['txt'];
            for(i=0;i<this.charList.length;i++){
                d.push(this.charList[i]);
            }
            d=this._shuffle(d);
            for(i=0;i<g.length;i++){
                for(x=0;x<d.length;x++){
                    if(g.charAt(i)===d[x]){
                        r.push(x);
                        break;
                    }
                }
            }
            twnobj['txt']={ease: ease, to: g.length, ct: 0, d: duration, from: 0, prop: 'txt', subprop: r, request: '', target: o, text:o.txt, type:args.txt, charlist:d};
            o._prevTxt=o.txt;o.txt='';
        }
        if ('shadow' in args) {
            if (!o['shadow']) {
                return;
            }
            twnobj['shadow'] = {ease: ease, to: [], ct: 0, d: duration, from: [], prop: 'shadow', subprop: [], request: [], target: o};
            for (var io in args['shadow']) {
                if (io === "color") {
                    colorReq = Colors.ParseColor(args['shadow'][io]);
                    colorSrc = Colors.ParseColor(o['shadow'][io]);
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
            twnobj['lineShadow'] = {ease: ease, to: [], ct: 0, d: duration, from: [], prop: 'lineShadow', subprop: [], request: [], target: o};
            for (var oi in args['lineShadow']) {
                if (oi === "color") {
                    colorReq = Colors.ParseColor(args['lineShadow'][oi]);
                    colorSrc = Colors.ParseColor(o['lineShadow'][oi]);
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
            colorReq = Colors.ParseColor(args['color']);
            colorSrc = Colors.ParseColor(o.color);
            r = colorReq[0] - colorSrc[0];
            g = colorReq[1] - colorSrc[1];
            b = colorReq[2] - colorSrc[2];
            twnobj['rgb'] = {ease: ease, tor: r, tog: g, tob: b, ct: 0, d: duration, fromr: colorSrc[0], fromg: colorSrc[1], fromb: colorSrc[2], prop: 'color', request: colorReq, target: o};
        }
        if ('lineColor' in args) {
            colorReq = Colors.ParseColor(args['lineColor']);
            colorSrc = Colors.ParseColor(o.lineColor);
            r = colorReq[0] - colorSrc[0];
            g = colorReq[1] - colorSrc[1];
            b = colorReq[2] - colorSrc[2];
            twnobj['rgbl'] = {ease: ease, tor: r, tog: g, tob: b, ct: 0, d: duration, fromr: colorSrc[0], fromg: colorSrc[1], fromb: colorSrc[2], prop: 'lineColor', request: colorReq, target: o};
        }
        if ('alpha' in args) {
            rqAlpha = args['alpha'];
            alpha = rqAlpha - o.alpha;
            twnobj['alpha'] = {ease: ease, to: alpha, ct: 0, d: duration, from: o.alpha, prop: 'alpha', request: rqAlpha, target: o};
        }
        if ('lineAlpha' in args) {
            rqAlpha = (args['lineAlpha'] > 1) ? args['lineAlpha'] / 100 : args['lineAlpha'];
            lineAlpha = rqAlpha - o.lineAlpha;
            twnobj['lineAlpha'] = {ease: ease, to: lineAlpha, ct: 0, d: duration, from: o.lineAlpha, prop: 'lineAlpha', request: rqlineAlpha, target: o};
        }
        var onStart = args['onStart'] ? args['onStart'] : null;
        var onTween = args['onTween'] ? args['onTween'] : null;
        var onEnd = args['onEnd'] ? args['onEnd'] : null;

        twnobj.state = {start: true, tweening: false, end: false, onStart: onStart, onTween: onTween, onEnd: onEnd, target: o, duration: duration, delay: delay, data: data};

        if (delay > 0) {
            this._tempChildren[o.id]='';
            var that = this;
            setTimeout(function() {
                if(o.id in that._tempChildren){
                    delete that._tempChildren[o.id];
                    that.children[o.id] = twnobj;
                }
                
            }, delay);
        } else {
            this.children[o.id] = twnobj;
            window.rqanim.addLoop(this, this._callTween);
        }
    },
    /**
     * removeTweener - Tweener - remove an object from the animation cicle list
     * @type method Tweener
     * @description remove an object from the animation cicle list
     * @param {object element} child a target Sprite or DisplayObjects element
     * @example myTween.removeTweener(myObject);
     * @returns {undefined} none none
     *@see text
     *@link text
     */
    removeTweener: function(child) {
        if(child.id in this._tempChildren){
            delete this._tempChildren[child.id];
        }
        if (child.id in this.children) {
            this.children[child.id].state.end=true;
        }
    },
    _shuffle: function(array){
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },
    _callTween: function(that) {
        var tree = {}, n = -1;
        for (var o in that.children) {
            if (that.children[o].state.start) {
                that._states(that.children[o].state);
                that.children[o].state.start = false;
            } else {
                if (that.children[o].state.end) {
                    that.children[o].state.tweening = false;
                    var obj = that.children[o].state;
                    delete that.children[o];
                    for (var nn in that.children) {
                        n++;
                    }
                    if (n === -1) {
                        window.rqanim.removeLoop(that);
                    }
                    that._states(obj);

                    continue;
                } else {
                    that.children[o].state.tweening = true;
                }
            }
            that._states(that.children[o].state);
            for (var oo in that.children[o]) {
                if (oo !== 'state') {
                    var ct = window.rqanim.getTimeInterval();
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
        }var n;
        
        switch(args.type){
            case 'cutFwd':
                n = Math.floor(this[args.ease](args['ct'], args['from'], args['to'], args['d']));
                args['target'][args['prop']]=args.text.substr(0,n);
                break;
            case 'cutBack':
                n = Math.floor(this[args.ease](args['ct'], args['from'], args['to'], args['d']));
                args['target'][args['prop']]=args.text.substr(0,args.to-n);
                break;
            case 'matrix':
                for(var i=0;i<args.subprop.length;i++){
                    n = Math.floor(this[args.ease](args['ct'], 0, args.subprop[i], args['d']));
                    n=n>this.charList.length-1?n-this.charList.length:n;
                    args.request+=args.charlist[n];
                }
                args['target'][args['prop']]=args.text=args.request;
                args.request='';
                break;
            default:
                break;
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
        return b+c*(Math.sin((Math.PI/d)*t));
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
var Colors = {
    /**
     * Rgb - Colors - return a rgb array value from an hex color format
     * @type static method Colors
     * @description return a rgb array value from an hex color format
     * @param {string} hex the color in hex format
     * @example var myValue= Colors.Rgb('#FF00FF');
     * @returns {array} rgb the RGB representation in set [0, 255]; [r, g, b]
     * @link http://www.w3.org/TR/2011/REC-css3-color-20110607/
     * @see text
     */
    Rgb: function(hex) {
        return [this._toR(hex), this._toG(hex), this._toB(hex)];
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
    /**
     * Hex - Colors - return a hex string value from an rgb array color format
     * @type static method Colors
     * @description return a hex string value from an rgb array color format
     * @param {array} rgb the color in rgb array format
     * @example var myValue= Colors.Hex([r, g, b]);
     * @returns {string} hex the HEX representation in string color format; '#value
     * @link http://www.w3.org/TR/2011/REC-css3-color-20110607/
     * @see text
     */
    Hex: function(rgb) {
        return "#" + this._toHex(rgb[0]) + this._toHex(rgb[1]) + this._toHex(rgb[2]);
    },
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
    /**
     * RgbToHsl - Colors -
     * @type static method Colors
     * @description Converts an RGB color value to HSL. Assumes r, g, and b are contained in the set [0, 255] and returns h, s, and l in the set [0, 1].
     * @param {number} r number The red color value 
     * @param {number} g number The green color value
     * @param {number} b number The blue color value
     * @example var myValue= Colors.RgbToHsl([r, g, b]);
     * @returns {array} hsl The HSL representation in the set [0, 1]; [ h, s, l]
     * @link http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
     * @see text
     */
    RgbToHsl: function(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return [h, s, l];
    },
    /**
     * HslToRgb - Colors -
     * @type static method Colors
     * @description Converts an HSL color value to RGB. Assumes h, s, and l are contained in the set [0, 1] and returns r, g, and b in the set [0, 255].
     * @param {number} h Number The hue 
     * @param {number} s Number The saturation 
     * @param {number} l Number The lightness
     * @example var myValue= Colors.HslToRgb([h, s, l]);
     * @returns {array} rgb The RGB representation in the set [0, 255]; [r, g, b]
     * @link http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
     * @see text
     */
    HslToRgb: function(h, s, l) {
        var r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },
    /**
     * RgbToHsv - Colors -
     * @type static method Colors
     * @description Converts an RGB color value to HSV. Assumes r, g, and b are contained in the set [0, 255] and returns h, s, and v in the set [0, 1].
     * @param {number} r Number The red color value
     * @param {number} g Number The green color value
     * @param {number} b Number The blue color value
     * @example var myValue= Colors.RgbToHsv([r, g, b]);
     * @returns {array} hsv The HSV representation in the set [0, 1]; [h, s, v]
     * @link http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
     * @see text
     */
    RgbToHsv: function(r, g, b) {
        r = r / 255, g = g / 255, b = b / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return [h, s, v];
    },
    /**
     * HsvToRgb - Colors -
     * @type static method Colors
     * @description Converts an HSV color value to RGB. Assumes h, s, and v are contained in the set [0, 1] and returns r, g, and b in the set [0, 255].
     * @param {number} h Number The hue
     * @param {number} s Number The saturation
     * @param {number} v Number The value
     * @example var myValue= Colors.HsvToRgb([h, s, v]);
     * @returns {array} rgb The RGB representation in the set [0, 255]; [r, g, b]
     * @link http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
     * @see text
     */
    HsvToRgb: function(h, s, v) {
        var r, g, b;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },
    /**
     * RandomRgb - Tweener - return a random rgb array value in range [0,255]
     * @type static method Colors
     * @description return a random rgb array value in range [0,255]
     * @param {string} type string that rapresent the desired returned format value; string or array; default string
     * @example var myValue= Colors.RandomRgb('array');
     * @returns {mixed} rgb in string or array format; 'rgb(n, n, n)' or [r, g, b]
     * @link http://www.w3.org/TR/2011/REC-css3-color-20110607/
     * @see text
     */
    RandomRgb: function(type) {
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
     * PraseColor - Colors - return a rgb array 
     * @type static method Colors
     * @description return a rgb array from any kind of accepted color formats
     * @param {mixed} color any kind of accepted color formats; string, name, hex, array
     * @example var myValue= Colors.ParseColor(myObject.color);
     * @returns {array} rgb The RGB representation in the set [0, 255]; [r, g, b]
     * @link http://www.w3.org/TR/2011/REC-css3-color-20110607/
     * @see text
     */
    ParseColor: function(color) {
        if (!color) {
            return [0,0,0];
        }
        if (typeof color === 'string') {
            var result = color.replace(/\s/g, "").toLowerCase();
            var re, ar;
            if (result.indexOf('rgb') > -1) {
                re = /\-?(\d{1,3}),\-?(\d{1,3}),\-?(\d{1,3})/g;
                ar = re.exec(result);
                return [parseInt(ar[1]), parseInt(ar[2]), parseInt(ar[3])];
            } else if (result.indexOf('#') > -1) {
                var hex = this.Rgb(result);
                return hex;
            } else if (result.indexOf('hsl') > -1) {
                re = /hsl\((.*),(\d{1,3})?%,(\d{1,3})/g;
                ar = re.exec(result);
                var hsl = this.HslToRgb(ar[1]/360, ar[2]/100, ar[3]/100);
                return hsl;
            } else if (result.indexOf('hsv') > -1) {
                re = /hsv\((.*),(\d{1,3})?%,(\d{1,3})/g;
                ar = re.exec(result);
                var hsv = this.HsvToRgb(ar[1]/360, ar[2]/100, ar[3]/100);
                return hsv;
            } else if (result in this.namedColor) {
                ar = this.namedColor[result][1];
                return ar;
            } else {
                return [0, 0, 0];
            }
        } else {
            return color;
        }
    },
    /**
     * namedColor - Colors -
     * @type object Colors
     * @description an object containing all the color's name accordingly to the specification css; name:[hex value, array rgb]
     * @example var myValue= Colors.namedColor('azure'); resulting in ["#f0ffff", [240, 255, 255]]
     * @returns {undefined} none none
     * @link http://www.w3.org/TR/2011/REC-css3-color-20110607/
     * @see text
     */
    namedColor: {//147 colors
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
        "yellowgreen": ["#9acd32", [154, 205, 50]]}
};