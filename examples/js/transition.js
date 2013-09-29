/**
* Transition JavaScript Library v1.0
* http://www.somethinglikethis.it/transition/
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

/**
 * 
 * @param {document.element} element
 * @param {function.event} evt
 * @param {function} func
 * @returns {null}
 */
function addEvt(element,evt,func){
    if("addEventListener" in window){
        element.addEventListener(evt,func,false);
    }else{
        element.attachEvent("on"+evt,func);
    }
}
/**
 * 
 * @param {function.event} evt
 * @returns {currentTarget}
 */
function addTarget(evt){
    if("currentTarget" in evt){
        return evt.currentTarget;
    }else if("target" in evt){
        return evt.target;
    }else{
        return evt.srcElement;
    }
}
/**
*
*@param {document.element} o
*@param {style.parameter} p
*@param {style.parameter} p1 alternative parameter
*/
function getStyle(o,p,p1){
    return !!o.currentStyle?o.currentStyle[p]||o.currentStyle[p1]:document.defaultView.getComputedStyle(o, null).getPropertyValue(p)||document.defaultView.getComputedStyle(o, null).getPropertyValue(p1);
}
function getLength(n,p){
    var b=document.body,r=getStyle(b,"font-size","fontSize");
    var t=compute(r,16);
    function compute(n,t){
        var l=0;
        if(typeof(n) === "string"){
            if(n==="auto"){return t;}
            var list=["%","px","em","ex"];
            for(var i=0;i<list.length;i++){
                if(n.indexOf(list[i])!==-1){
                    switch(list[i]){
                        case "%":
                            l=(parseFloat(n)/100)*t;
                            break;
                        case "px":
                            l=parseFloat(n);
                            break;
                        case "em":
                            l=(parseFloat(n))*t;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        return l;
    }
    return compute(n,p||t);
}
var Transition=function(){
    var agent=navigator.userAgent.toLowerCase();
    this.agent=agent;
    console.log(agent);
    var v=/msie\s(\d{1,4}\.\d)/;
    var v1=/version\s?\/(\d{1,4}\.\d)/;
    
    var system_host=/(chrome|safari|firefox|opera|msie)/;
    var mobile=/mobile|tablet|android/;
    var brw=system_host.exec(this.agent);
    this.browser='none';
    this.version=0;
    this.device=mobile.exec(this.agent)?'mobile':'desktop';
    var okvers;
if(brw){
    this.browser=brw[1];
    if(this.browser==='msie'){
        okvers=v.exec(this.agent);
    }else{
        if(this.browser==='safari'||this.browser==='opera'){
            okvers=v1.exec(this.agent);
        }else{
            var v2=/[firefox|chrome]\s?\/(\d{1,4}\.\d)/;
            okvers=v2.exec(this.agent);
        }
    }
    var alternative=/\)\s\w+\s?\/(\d{1,4}\.\d)/;
    var checkalt=alternative.exec(this.agent);
    this.version=okvers?parseFloat(okvers[1]):parseFloat(checkalt[1]);
}
console.log(this.version,this.browser,this.device);
    if(!window.fire){
        window.fire = (function(callback){
            var r=this.device==="desktop"?60:30;
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback){
            window.setTimeout(callback, 1000 / r);};
        })();
        window.cancelFire =(function(id){
            return window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || function(id){
            window.clearTimeout(id);};
        })();
        window.rqanim={
            time:0,
            timeInterval:0,
            startTime:0,
            lastTime:0,
            frame:0,
            animating:false,
            loop:[],
            prId:0,
            getTime:function(){
                return this.time;
            },
            getFps:function(){
                return this.timeInterval > 0 ? 1000/ this.timeInterval : 0;
            },
            getFrame:function(){
                return this.frame;
            },
            getTimeInterval:function(){
                return this.timeInterval;
            },
            _animationLoop:function(){
                if(this.animating){
                    var that = this;
                    this.frame++;
                    var date = new Date();
                    var thisTime = date.getTime();
                    this.timeInterval=thisTime-this.lastTime;
                    this.time+=this.timeInterval;
                    this.lastTime=thisTime;
                    for(var i=0;i<that.loop.length ;i++){
                        var illo=this.loop[i];
                        illo.func.apply(illo.target,[illo.target]);
                    }
                    window.fire(function(){that._animationLoop();});
                }
            },
            start:function(){
                if(!this.animating){
                    var date = new Date();
                    this.startTime=date.getTime();
                    this.lastTime=this.startTime;
                    this.animating=true;
                    this._animationLoop();
                }
            },
            reset:function(){
                this.time=0;
                this.timeInterval=0;
                this.startTime=0;
                this.lastTime=0;
                this.frame=0;
                var date = new Date();
                this.startTime=date.getTime();
                this.lastTime=this.startTime;
            },
            stop:function(){
                this.animating=false;
            },
            addLoop:function(target,func){
                this.prId++;
                if(!this.isChild(target)){
                    this.loop.push({'target':target,'func':func,'id':this.prId});
                    this.start();
                }
                
                return this.prId;
            },
            isChild:function(target){
                var id=-1;
                for(var i=0;i<this.loop.length;i++){
                    if(this.loop[i].target === target){
                        id=i;
                        break;
                    }
                }
                return id>-1?true:false;
            },
            removeLoop:function(target){
                var id=-1;
                for(var i=0;i<this.loop.length;i++){
                    if(this.loop[i].target === target){
                        id=i;
                        break;
                    }
                }
                if(id > -1){
                    this.loop.splice(id,1);
                }
                if(this.loop.length === 0){this.stop();}
            },
            _init:function(){
                var date = new Date();
                this.startTime=date.getTime();
                this.lastTime=this.startTime;
                this.animating=true;
                this._animationLoop();
            }
        };
    }else{
console.log('is there',window.fire);
    }
    this.children={};
};
Transition.prototype={
/**
*getFrame - Tweener - get the current increasing number of frame fired.
*@return number
*/
    getFrame:function(){
        return window.rqanim.getFrame();
    },
/**
*getTime - Tweener - get the current increasing number of millisecond.
*@raturn number
*/
    getTime:function(){
        return window.rqanim.getTime();
    },
/**
*getFps - Tweener - get the current number of frame per seconds.
*@return number
*/
    getFps:function(){
        return window.rqanim.getFps();
    },
/**
*getTimeInterval - Tweener - get the actual delay in millisecond between loop.
*@return number 
*/
    getTimeInterval:function(){
        return window.rqanim.getTimeInterval();
    },
    getTransform:function(o,k){
    	if(this.browser==="msie"){
    		return o.currentStyle[k];
    	}else{
    		return document.defaultView.getComputedStyle(o,null).getPropertyValue(k);
    	}
    },
    addTweener:function(o, args){
        //if(o.parent === null || o.parent === undefined){console.log(typeof o.parent, 'provide a nested object');return;}
        var twnobj={};
        var properties=['top','left','right','bottom','paddingTop','paddingLeft','paddingRight','paddingBottom','marginTop','marginLeft','marginRight','marginBottom','x','y','width','height','fontSize'];
        var propstyles={'top':'top','left':'left','right':'right','bottom':'bottom','paddingTop':'padding-top','paddingLeft':'padding-left','paddingRight':'padding-right','paddingBottom':'padding-bottom','marginTop':'margin-top','marginLeft':'margin-left','marginRight':'margin-right','marginBottom':'margin-bottom','x':'y','y':'y','width':'width','height':'height','fontSize':'font-size'};
        var x,colorReq,r,g,b,rqAlpha,to,opacity,colorSrc,prop;
        var delay=args['delay']?args['delay']:0;
        var ease=args['ease']?args['ease']:'easeNone';
        var duration=args['duration']?args['duration']:1000;
        for(var i in args){
            for(var n =0;n<properties.length;n++){
                if(i === properties[n]){
                    prop=o['style'][i];if(!prop){o['style'][i]=this.browser === 'msie'?o.currentStyle[i]:document.defaultView.getComputedStyle(o, null).getPropertyValue(propstyles[i]);prop=o['style'][i];}
                    to=parseFloat(prop);
                    x=(parseFloat(args[i]) > to)? parseFloat(args[i])-to : -(to-parseFloat(args[i]));
                    twnobj[i]={'ease':ease,'to':x,'ct':0,'d':duration,'from':to,'prop':i,'request':args[i],'target':o};
                }
            }
        }
        if(args['scroll']){
            var argX=args['scroll'][0],argY=args['scroll'][1];
            var fromx=(this.browser==='msie'&&this.version<9)?document.documentElement.scrollLeft:window.scrollX,fromy=(this.browser==='msie'&&this.version<9)?document.documentElement.scrollTop:window.scrollY;
            var tox=(argX > fromx)? argX-fromx : -(fromx-argX);
            var toy=(argY > fromy)? argY-fromy : -(fromy-argY);
            twnobj['scroll']={'ease':ease,'tox':tox,'toy':toy,'ct':0,'d':duration,'fromx':fromx,'fromy':fromy,'prop':'scroll','request':'scroll','target':o};
        }
        if(args['transform']){
        var getkit,setkit,defaultkit="translate(0px,0px) scale(1,1) rotate(0deg) skew(0deg,0deg)";
		var ki={safari:["-webkit-transform","webkitTransform"],chrome:["-webkit-transform","webkitTransform"],
			opera:["-o-transform","OTransform"],camino:["-moz-transform-","MozTransform"],
			firefox:["-moz-transform-","MozTransform"],msie:["-ms-transform","msTransform"]};
		getkit=ki[this.browser][0];
		setkit=ki[this.browser][1];
		if(!o.style[setkit]){
			o.style[setkit]=defaultkit;
		}
		var rs=/(scale)\(\s*(\-?\d+\.*\d*)(\w*)\s*,?\s*(\-?\d*\.*\d*)(\w*)\s*\)/;
		var as=rs.exec(o.style[setkit]);
		var rt=/(translate)\(\s*(\-?\d+\.*\d*)\s*(\w*)\s*,?\s*(\-?\d*\.*\d*)(\w*)\s*\)/;
		var at=rt.exec(o.style[setkit]);
		var rr=/(rotate)\(\s*(\-?\d+\.*\d*)(\w*)/;
		var ar=rr.exec(o.style[setkit]);
		var rk=/(skew)\(\s*(\-?\d+\.*\d*)(\w*)\s*,?\s*(\-?\d*\.*\d*)(\w*)\s*\)/;
		var ak=rk.exec(o.style[setkit]);
		var aregprop=[as,at,ar,ak],objtransform={};
		for(i=0;i<aregprop.length;i++){
			if(aregprop[i]){
				objtransform[aregprop[i][1]]=[];
				for(var pa=2;pa<aregprop[i].length;pa++){
					if(aregprop[i][pa]){
						var val=pa===2 || pa===4?parseFloat(aregprop[i][pa]):aregprop[i][pa];
						objtransform[aregprop[i][1]].push(val);
					}
				}
			}
		}
		this.kit=setkit;var iter=0,otr=0;this.gkit=getkit;
        twnobj[setkit]={ease:ease,ct:0,d:duration,target:o};
        	for(var ot in args.transform){
        		twnobj[setkit][ot]={ease:ease,ct:0,d:duration,target:o,to:[],from:[],request:[],prop:""};
        		iter=0;
        		for(otr=0;otr<args.transform[ot].length;otr++){
        			var toot=(args.transform[ot][otr] > objtransform[ot][iter])? args.transform[ot][otr]-objtransform[ot][iter] : -(objtransform[ot][iter]-args.transform[ot][otr]);
        				twnobj[setkit][ot].to.push(toot);
        				twnobj[setkit][ot].from.push(objtransform[ot][iter]);
        				twnobj[setkit][ot].request.push(args.transform[ot][otr]);
        				twnobj[setkit][ot].prop=ot==="scale"?"":objtransform[ot][1];
        				iter=iter===0?2 in objtransform[ot]?2:0:0;
        		}
        	}
        }
        if(args['backgroundColor']){
            if(!o.style.backgroundColor){o.style.backgroundColor=this.browser === 'msie'?o.currentStyle['background-color']:document.defaultView.getComputedStyle(o, null).getPropertyValue('background-color');}
            colorReq=Colors.ParseColor(args['backgroundColor']);
            colorSrc=Colors.ParseColor(o.style.backgroundColor);
            r=colorReq[0]-colorSrc[0];
            g=colorReq[1]-colorSrc[1];
            b=colorReq[2]-colorSrc[2];
            twnobj['rgbb']={'ease':ease,"tor":r,"tog":g,"tob":b,"ct":0,"d":duration,"fromr":colorSrc[0],"fromg":colorSrc[1],"fromb":colorSrc[2],"prop":'backgroundColor',"request":colorReq,'target':o};
        }
        if(args['color']){
            if(!o.style.color){o.style.color=this.browser === 'msie'?o.currentStyle['color']:document.defaultView.getComputedStyle(o, null).getPropertyValue('color');}
            colorReq=Colors.ParseColor(args['color']);
            colorSrc=Colors.ParseColor(o.style.color);
            r=colorReq[0]-colorSrc[0];
            g=colorReq[1]-colorSrc[1];
            b=colorReq[2]-colorSrc[2];
            twnobj['rgbt']={'ease':ease,"tor":r,"tog":g,"tob":b,"ct":0,"d":duration,"fromr":colorSrc[0],"fromg":colorSrc[1],"fromb":colorSrc[2],"prop":'color',"request":colorReq,'target':o};
        }
        if(args['opacity']){
            rqAlpha=args['opacity'];
            
            if(this.browser==="msie"){
                if(this.version <8){
                    prop=(o.filters.item("DXImageTransform.Microsoft.Alpha").opacity)?(o.filters.item("DXImageTransform.Microsoft.Alpha").opacity):o.filters.alpha.opacity;
                    //prop=o.filters.alpha.opacity;
                    //if(!prop){o.filters.alpha.opacity=1;prop=o.filters.alpha.opacity;}
                    if(!prop){prop=(o.filters.item("DXImageTransform.Microsoft.Alpha").opacity=100)|(o.filters.alpha.opacity=1);}
                rqAlpha=rqAlpha*100;
                }else if(this.version <9){
                    prop=o.filters.alpha.opacity;
                    if(!prop){o.filters.alpha.opacity=1;prop=o.filters.alpha.opacity;}
                    rqAlpha=rqAlpha*100;
                }else{
                    prop=o.style.opacity;
                    if(!prop){o.style.opacity=1;prop=o.style.opacity;}
                }
            }else{
                prop=o.style.opacity;
                if(!prop){o.style.opacity=1;prop=o.style.opacity;}
            }
            to=parseFloat(prop);
            opacity=rqAlpha>to?rqAlpha-to:-(to-rqAlpha);
            twnobj['opacity']={'ease':ease,'to':opacity,'ct':0,'d':duration,'from':to,'prop':'opacity','request':rqAlpha,'target':o};
        }
        var onStart=args['onStart']?args['onStart']:null;
        var onTween=args['onTween']?args['onTween']:null;
        var onEnd=args['onEnd']?args['onEnd']:null;
        var arguments=args['args']?args['args']:null;
        
        twnobj['state']={'start':true,'tweening':false,'end':false,'onStart':onStart,'onTween':onTween,'onEnd':onEnd,'target':o,'duration':duration,'delay':delay,'args':arguments};
        
        if(delay > 0){
            var that=this.children;
            setTimeout(function(){that[o.id]=twnobj;},delay);
        }else{
            this.children[o.id]=twnobj;
            window.rqanim.addLoop(this,this._callTween);
        }
    },
    removeTweener:function(child){
        if(child.id in this.children){
            delete this.children[child.id];
        }
    },
    _callTween:function(that){
        var n=-1;
        for(var o in that.children){
            if(that.children[o].state.start){
                that._states(that.children[o].state);
                that.children[o].state.start=false;
            }else{
                if(that.children[o].state.end){
                    that.children[o].state.tweening=false;
                    var obj=that.children[o].state;
                    delete that.children[o];
                    for(var nn in that.children){
                        n++;
                    }
                    if(n === -1){
                        window.rqanim.removeLoop(that);
                    }
                    that._states(obj);
                    
                    continue;
                }else{
                    that.children[o].state.tweening=true;
                }
            }
            that._states(that.children[o].state);
            for(var oo in that.children[o]){
                if(oo !== 'state'){
                    var ct=window.rqanim.getTimeInterval();
                    if(oo === 'rgbb' || oo === 'rgbt'){
                        that.children[o][oo].ct+=ct;
                        that._tweenColor(that.children[o][oo], that.children[o].state);
                    }else if(oo === that.kit){
                    	that.children[o][oo].ct+=ct;
                        that._tweenS(that.children[o][oo], that.children[o].state);
                    }else if(oo === "scroll"){
                    	that.children[o][oo].ct+=ct;
                        that._tweenG(that.children[o][oo], that.children[o].state);
                    }else{
                    	that.children[o][oo].ct+=ct;
                        that._tween(that.children[o][oo], that.children[o].state);
                    }
                }
            }
        }
        
    },
    _tweenColor:function(args,ctrl){
        if((args['ct']/args['d']) >= 1){args['ct']=1;args['d']=1;ctrl.end=true;}
        var r,g,b;
        r=this[args.ease](args['ct'], args['fromr'], args['tor'], args['d']);
        g=this[args.ease](args['ct'], args['fromg'], args['tog'], args['d']);
        b=this[args.ease](args['ct'], args['fromb'], args['tob'], args['d']);
        args['target']['style'][args['prop']]='rgb('+Math.round(r)+','+Math.round(g)+','+Math.round(b)+')';
    },
    _tweenS:function(args,ctrl){
        var rr="";
        for(var i in args){
        if(i==="ct"||i==="d"||i==="ease"||i==="target"){continue;}
        args[i].ct=args.ct;
        	rr+=i;
        	if((args[i]['ct']/args[i]['d']) >= 1){args[i]['ct']=1;args[i]['d']=1;}
        	if(args[i].request.length===1){
        		rr+="("+this[args[i].ease](args[i]['ct'], args[i]['from'][0], args[i]['to'][0], args[i]['d'])+args[i].prop+") ";
        	}else{
        		rr+="("+this[args[i].ease](args[i]['ct'], args[i]['from'][0], args[i]['to'][0], args[i]['d'])+args[i].prop+
        		","+this[args[i].ease](args[i]['ct'], args[i]['from'][1], args[i]['to'][1], args[i]['d'])+args[i].prop+") ";
        	}
        }
        args.target.style[this.kit]=rr;
        if((args['ct']/args['d']) >= 1){args['ct']=1;args['d']=1;ctrl.end=true;}
    },
    _tweenG:function(args,ctrl){
        if((args['ct']/args['d']) >= 1){args['ct']=1;args['d']=1;ctrl.end=true;}
        var x,y;
        x=this[args.ease](args['ct'], args['fromx'], args['tox'], args['d']);
        y=this[args.ease](args['ct'], args['fromy'], args['toy'], args['d']);
        if(this.browser==='msie'&&this.version<9){
            window.scrollTo(x,y);
        }else{
            window.scroll(x,y);
        }
        
    },
    _tween:function(args,ctrl){
        if((args['ct']/args['d']) >= 1){args['ct']=1;args['d']=1;ctrl.end=true;}
        var n;
        n=this[args.ease](args['ct'], args['from'], args['to'], args['d']);
        if(args['prop']==='opacity'){
            if(this.browser==="msie"){
                if(this.version <8){
                    args['target'].filters.item("DXImageTransform.Microsoft.Alpha").opacity=n;
                    //args['target']['style']['filter']="alpha(opacity="+n+")";
                }else if(this.version <9){
                    args['target']['style']['filter']="alpha(opacity="+n+")";
                }else{
                    args['target']['style'][args['prop']]=n;
                }
            }else{
                args['target']['style'][args['prop']]=n;
            }
        }else{
            args['target']['style'][args['prop']]=args['prop']==='fontSize'?Math.floor(n)+"px":n+"px";
        }
    },
//////////////////////////////////////////////
//Equations - From Caurina Tweener
//
//author Zeh Fernando, Nate Chatellier
//v1.0.2
//Open source under the BSD License.
//Copyright ¬© 2001 Robert Penner
//
//http://code.google.com/p/tweener/
/////////////////////////////////////////////
/**
* Easing equation function for a simple linear tweening, with no easing.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeNone:function(t,b,c,d,p_params){
            return c*t/d + b;
    },
/**
* Easing equation function for a quadratic (t^2) easing in: accelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInQuad:function(t,b,c,d,p_params){
            return c*(t/=d)*t + b;
    },
/**
* Easing equation function for a quadratic (t^2) easing out: decelerating to zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutQuad:function(t,b,c,d,p_params){
            return -c *(t/=d)*(t-2) + b;
    },
/**
* Easing equation function for a quadratic (t^2) easing in/out: acceleration until halfway, then deceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInOutQuad:function(t,b,c,d,p_params){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
    },
/**
* Easing equation function for a quadratic (t^2) easing out/in: deceleration until halfway, then acceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutInQuad:function(t,b,c,d,p_params){
            if (t < d/2) return this.easeOutQuad (t*2, b, c/2, d, p_params);
            return this.easeInQuad((t*2)-d, b+c/2, c/2, d, p_params);
    },
/**
* Easing equation function for a cubic (t^3) easing in: accelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInCubic:function(t,b,c,d,p_params){
            return c*(t/=d)*t*t + b;
    },
/**
* Easing equation function for a cubic (t^3) easing out: decelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutCubic:function(t,b,c,d,p_params){
            return c*((t=t/d-1)*t*t + 1) + b;
    },
/**
* Easing equation function for a cubic (t^3) easing in/out: acceleration until halfway, then deceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInOutCubic:function(t,b,c,d,p_params){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
    },
/**
* Easing equation function for a cubic (t^3) easing out/in: deceleration until halfway, then acceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutInCubic:function(t,b,c,d,p_params){
            if (t < d/2) return this.easeOutCubic (t*2, b, c/2, d, p_params);
            return this.easeInCubic((t*2)-d, b+c/2, c/2, d, p_params);
    },
/**
* Easing equation function for a quartic (t^4) easing in: accelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInQuart:function(t,b,c,d,p_params){
            return c*(t/=d)*t*t*t + b;
    },
/**
* Easing equation function for a quartic (t^4) easing out: decelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutQuart:function(t,b,c,d,p_params){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
/**
* Easing equation function for a quartic (t^4) easing in/out: acceleration until halfway, then deceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInOutQuart:function(t,b,c,d,p_params){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
/**
* Easing equation function for a quartic (t^4) easing out/in: deceleration until halfway, then acceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutInQuart:function(t,b,c,d,p_params){
            if (t < d/2) return this.easeOutQuart (t*2, b, c/2, d, p_params);
            return this.easeInQuart((t*2)-d, b+c/2, c/2, d, p_params);
    },
/**
* Easing equation function for a quintic (t^5) easing in: accelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInQuint:function(t,b,c,d,p_params){
            return c*(t/=d)*t*t*t*t + b;
    },
/**
* Easing equation function for a quintic (t^5) easing out: decelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutQuint:function(t,b,c,d,p_params){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
/**
* Easing equation function for a quintic (t^5) easing in/out: acceleration until halfway, then deceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInOutQuint:function(t,b,c,d,p_params){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
/**
* Easing equation function for a quintic (t^5) easing out/in: deceleration until halfway, then acceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutInQuint:function(t,b,c,d,p_params){
            if (t < d/2) return this.easeOutQuint (t*2, b, c/2, d, p_params);
            return this.easeInQuint((t*2)-d, b+c/2, c/2, d, p_params);
    },
/**
* Easing equation function for a sinusoidal (sin(t)) easing in: accelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInSine:function(t,b,c,d,p_params){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
/**
* Easing equation function for a sinusoidal (sin(t)) easing out: decelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutSine:function(t,b,c,d,p_params){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
/**
* Easing equation function for a sinusoidal (sin(t)) easing in/out: acceleration until halfway, then deceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInOutSine:function(t,b,c,d,p_params){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
/**
* Easing equation function for a sinusoidal (sin(t)) easing out/in: deceleration until halfway, then acceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutInSine:function(t,b,c,d,p_params){
            if (t < d/2) return this.easeOutSine (t*2, b, c/2, d, p_params);
            return this.easeInSine((t*2)-d, b+c/2, c/2, d, p_params);
    },
/**
* Easing equation function for an exponential (2^t) easing in: accelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInExpo:function(t,b,c,d,p_params){
            return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b - c * 0.001;
    },
/**
* Easing equation function for an exponential (2^t) easing out: decelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutExpo:function(t,b,c,d,p_params){
            return (t===d) ? b+c : c * 1.001 * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
/**
* Easing equation function for an exponential (2^t) easing in/out: acceleration until halfway, then deceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInOutExpo:function(t,b,c,d,p_params){
            if (t===0) return b;
            if (t===d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b - c * 0.0005;
            return c/2 * 1.0005 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
/**
* Easing equation function for an exponential (2^t) easing out/in: deceleration until halfway, then acceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutInExpo:function(t,b,c,d,p_params){
            if (t < d/2) return this.easeOutExpo (t*2, b, c/2, d, p_params);
            return this.easeInExpo((t*2)-d, b+c/2, c/2, d, p_params);
    },
/**
* Easing equation function for a circular (sqrt(1-t^2)) easing in: accelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInCirc:function(t,b,c,d,p_params){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
/**
* Easing equation function for a circular (sqrt(1-t^2)) easing out: decelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutCirc:function(t,b,c,d,p_params){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
/**
* Easing equation function for a circular (sqrt(1-t^2)) easing in/out: acceleration until halfway, then deceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInOutCirc:function(t,b,c,d,p_params){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
/**
* Easing equation function for a circular (sqrt(1-t^2)) easing out/in: deceleration until halfway, then acceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutInCirc:function(t,b,c,d,p_params){
            if (t < d/2) return this.easeOutCirc (t*2, b, c/2, d, p_params);
            return this.easeInCirc((t*2)-d, b+c/2, c/2, d, p_params);
    },
/**
* Easing equation function for an elastic (exponentially decaying sine wave) easing in: accelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
*  a		Amplitude.
*  p		Period.
* @return		The correct value.
*/
    easeInElastic:function(t,b,c,d,p_params){
            if (t===0) return b;
            if ((t/=d)===1) return b+c;
            var p = !(p_params) || isNaN(p_params.period) ? d*.3 : p_params.period;
            var s;
            var a = !(p_params) || isNaN(p_params.amplitude) ? 0 : p_params.amplitude;
            if (!(a) || a < Math.abs(c)) {
                    a = c;
                    s = p/4;
            } else {
                    s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
/**
* Easing equation function for an elastic (exponentially decaying sine wave) easing out: decelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
*  a		Amplitude.
*  p		Period.
* @return		The correct value.
*/
    easeOutElastic:function(t,b,c,d,p_params){
            if (t===0) return b;
            if ((t/=d)===1) return b+c;
            var p = !(p_params) || isNaN(p_params.period) ? d*.3 : p_params.period;
            var s;
            var a = !(p_params) || isNaN(p_params.amplitude) ? 0 : p_params.amplitude;
            if (!(a) || a < Math.abs(c)) {
                    a = c;
                    s = p/4;
            } else {
                    s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
    },
/**
* Easing equation function for an elastic (exponentially decaying sine wave) easing in/out: acceleration until halfway, then deceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
*  a		Amplitude.
*  p		Period.
* @return		The correct value.
*/
    easeInOutElastic:function(t,b,c,d,p_params){
            if (t===0) return b;
            if ((t/=d/2)===2) return b+c;
            var p = !(p_params) || isNaN(p_params.period) ? d*(.3*1.5) : p_params.period;
            var s;
            var a = !(p_params) || isNaN(p_params.amplitude) ? 0 : p_params.amplitude;
            if (!(a) || a < Math.abs(c)) {
                    a = c;
                    s = p/4;
            } else {
                    s = p/(2*Math.PI) * Math.asin (c/a);
            }
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
/**
* Easing equation function for an elastic (exponentially decaying sine wave) easing out/in: deceleration until halfway, then acceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
*  a		Amplitude.
*  p		Period.
* @return		The correct value.
*/
    easeOutInElastic:function(t,b,c,d,p_params){
            if (t < d/2) return this.easeOutElastic (t*2, b, c/2, d, p_params);
            return this.easeInElastic((t*2)-d, b+c/2, c/2, d, p_params);
    },
/**
* Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing in: accelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
*  s		Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
* @return		The correct value.
*/
    easeInBack:function(t,b,c,d,p_params){
            var s = !(p_params) || isNaN(p_params.overshoot) ? 1.70158 : p_params.overshoot;
            return c*(t/=d)*t*((s+1)*t - s) + b;
    },
/**
* Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing out: decelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
*  s		Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
* @return		The correct value.
*/
    easeOutBack:function(t,b,c,d,p_params){
            var s = !(p_params) || isNaN(p_params.overshoot) ? 1.70158 : p_params.overshoot;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
/**
* Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing in/out: acceleration until halfway, then deceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* s		Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
* @return		The correct value.
*/
    easeInOutBack:function(t,b,c,d,p_params){
            var s = !(p_params) || isNaN(p_params.overshoot) ? 1.70158 : p_params.overshoot;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
/**
* Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing out/in: deceleration until halfway, then acceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* s		Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
* @return		The correct value.
*/
    easeOutInBack:function(t,b,c,d,p_params){
            if (t < d/2) return this.easeOutBack (t*2, b, c/2, d, p_params);
            return this.easeInBack((t*2)-d, b+c/2, c/2, d, p_params);
    },
/**
* Easing equation function for a bounce (exponentially decaying parabolic bounce) easing in: accelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInBounce:function(t,b,c,d,p_params){
            return c - this.easeOutBounce (d-t, 0, c, d) + b;
    },
/**
* Easing equation function for a bounce (exponentially decaying parabolic bounce) easing out: decelerating from zero velocity.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutBounce:function(t,b,c,d,p_params){
            if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
    },
/**
* Easing equation function for a bounce (exponentially decaying parabolic bounce) easing in/out: acceleration until halfway, then deceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeInOutBounce:function(t,b,c,d,p_params){
            if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
            else return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
    },
/**
* Easing equation function for a bounce (exponentially decaying parabolic bounce) easing out/in: deceleration until halfway, then acceleration.
*
* @param t		Current time (in frames or seconds).
* @param b		Starting value.
* @param c		Change needed in value.
* @param d		Expected easing duration (in frames or seconds).
* @param p_params
* @return		The correct value.
*/
    easeOutInBounce:function(t,b,c,d,p_params){
            if (t < d/2) return this.easeOutBounce (t*2, b, c/2, d, p_params);
            return this.easeInBounce((t*2)-d, b+c/2, c/2, d, p_params);
    },
    _states:function(ctrl){
        for(var o in ctrl){
            switch (o) {
                case 'start':
                    if(ctrl[o]===true && ctrl['onStart']){
                        ctrl['onStart'].apply(ctrl['target'], [{target:ctrl['target'],event:"onStart",obj:ctrl,args:ctrl['arguments']}]);
                    }
                    break;
                case 'tweening':
                    if(ctrl[o]===true && ctrl['onTween']){
                        ctrl['onTween'].apply(ctrl['target'], [{target:ctrl['target'],event:"onTween",obj:ctrl,args:ctrl['arguments']}]);
                    }
                    break;
                case 'end':
                    if(ctrl[o]===true && ctrl['onEnd']){
                        ctrl['onEnd'].apply(ctrl['target'], [{target:ctrl['target'],event:"onEnd",obj:ctrl,args:ctrl['arguments']}]);
                    }
                    break;
                default:
                    break;
            }
        }

    }
};
//////////////////////////////////////////////////////////////
//Colors - list of function to manage colors
//Rgb - return an array of length 3 digits corresponding to red green and blue values - required a color hex string
//Hex - return a color hex string and require an array of length 3 digits corrensponding to red green and blue values
//RandomRgb - return an array rgb of random value
//namedColor - an object of 1567 entries of colors by name with a corresponding value rgb and hex
//////////////////////////////////////////////////////////////
var Colors={
/**
*Rgd - static function
*@param hex { a string rapresenting an hex color }
*@return an array length 3 rgb values [255,0,255]
*/
    Rgb:function(hex){return [this._toR(hex),this._toG(hex),this._toB(hex)];},
    _toR:function(h){return parseInt((this._cutHex(h)).substring(0,2),16);},
    _toG:function(h){return parseInt((this._cutHex(h)).substring(2,4),16);},
    _toB:function(h){return parseInt((this._cutHex(h)).substring(4,6),16);},
    _cutHex:function(h){return (h.charAt(0)==="#") ? h.substring(1,7):h;},
/**
*Hex - static function
*@param rgb { an array of length 3 digits }
*@return a string hex value #FF0FF
*/
    Hex:function(rgb){return "#"+this._toHex(rgb[0])+this._toHex(rgb[1])+this._toHex(rgb[2]);},
    _toHex:function(N){
        if (N===null) return "00";
        N=parseInt(N);if (N===0 || isNaN(N)) return "00";
        N=Math.max(0,N);N=Math.min(N,255);N=Math.round(N);
        return "0123456789ABCDEF".charAt((N-N%16)/16)+ "0123456789ABCDEF".charAt(N%16);
    },
/**
*http://http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
* Converts an RGB color value to HSL.
* Assumes r, g, and b are contained in the set [0, 255] and
* returns h, s, and l in the set [0, 1].
* @param   r { number The red color value }
* @param   g { number The green color value }
* @param   b { number The blue color value }
* @return  Array The HSL representation
*/
    RgbToHsl:function(r, g, b){
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max === min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r:h = (g - b) / d + (g < b ? 6 : 0);break;
                case g:h = (b - r) / d + 2;break;
                case b:h = (r - g) / d + 4;break;
            }
            h /= 6;
        }

        return [ h, s, l];
    },
/**
*http://http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
* Converts an HSL color value to RGB.
* Assumes h, s, and l are contained in the set [0, 1] and
* returns r, g, and b in the set [0, 255].
* @param h { Number The hue }
* @param s { Number The saturation }
* @param l { Number The lightness }
* @return  Array The RGB representation
*/
    HslToRgb:function(h, s, l){
        var r, g, b;

        if(s === 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },
/**
*http://http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
* Converts an RGB color value to HSV.
* Assumes r, g, and b are contained in the set [0, 255] and
* returns h, s, and v in the set [0, 1].
* @param   r { Number The red color value }
* @param   g { Number The green color value }
* @param   b { Number The blue color value }
* @return  Array The HSV representation
*/
    RgbToHsv:function(r, g, b){
        r = r/255, g = g/255, b = b/255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if(max === min){
            h = 0; // achromatic
        }else{
            switch(max){
                case r:h = (g - b) / d + (g < b ? 6 : 0);break;
                case g:h = (b - r) / d + 2;break;
                case b:h = (r - g) / d + 4;break;
            }
            h /= 6;
        }

        return [h, s, v];
    },
/**
*http://http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
* Converts an HSV color value to RGB.
* Assumes h, s, and v are contained in the set [0, 1] and
* returns r, g, and b in the set [0, 255].
* @param h { Number The hue }
* @param s { Number The saturation }
* @param v { Number The value }
* @return  Array The RGB representation
*/
    HsvToRgb:function(h, s, v){
        var r, g, b;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch(i % 6){
            case 0:r = v, g = t, b = p;break;
            case 1:r = q, g = v, b = p;break;
            case 2:r = p, g = v, b = t;break;
            case 3:r = p, g = q, b = v;break;
            case 4:r = t, g = p, b = v;break;
            case 5:r = v, g = p, b = q;break;
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },
/**
* Pick a random rgb color
* @param type { return an array if !type, return a string 'rgb(r,g,b)' if type }
* @return string 'rgb(255,0,255)' or array [255,0,255]
*/
    RandomRgb:function(type){
        var t=type?type:'string';
        var r=Math.round(Math.random()*255);
        var g=Math.round(Math.random()*255);
        var b=Math.round(Math.random()*255);
        if(t==='array'){
            return [Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)];
        }else{
            return 'rgb('+r+','+g+','+b+')';
        }
        
    },
    ParseColor:function(color){
       if(!color){console.log(color,' isn\'t a valid value.');return undefined;}
       if(typeof color === 'string'){
           var result=color.replace(/\s/g,"").toLowerCase();
           var re,ar;
           if(result.indexOf('rgb') > -1){
               re=/(\d{1,3}),(\d{1,3}),(\d{1,3})/g;
               ar=re.exec(result);
               return [parseInt(ar[1]),parseInt(ar[2]),parseInt(ar[3])];
           }else if(result.indexOf('#') > -1){
               var hex=Colors.Rgb(result);
               return hex;
           }else if(result.indexOf('hsl') > -1){
               re=/hsl\((.*),(\d{1,3})?%,(\d{1,3})/g;
               ar=re.exec(result);
               var hsl=Colors.HslToRgb(parseInt(ar[1]), parseInt(ar[2]), parseInt(ar[3]));
               return hsl;
           }else if(result.indexOf('hsv') > -1){
               re=/hsv\((.*),(\d{1,3})?%,(\d{1,3})/g;
               ar=re.exec(result);
               var hsv=Colors.HsvToRgb(parseInt(ar[1]), parseInt(ar[2]), parseInt(ar[3]));
               return hsv;
           }else if(result in Colors.namedColor){
               ar=Colors.namedColor[result][1];
               return ar;
           }else{
               console.log(color,' isn\'t a valid value.');return [0,0,0];
           }
       }else{
           return color;
       }
   },
    namedColor:{//147 colors
"aliceblue": ["#f0f8ff", [240,248,255]],
"antiquewhite": ["#faebd7", [250,235,215]],
"aqua": ["#00ffff", [0,255,255]],
"aquamarine": ["#7fffd4", [127,255,212]],
"azure": ["#f0ffff", [240,255,255]],
"beige": ["#f5f5dc", [245,245,220]],
"bisque": ["#ffe4c4", [255,228,196]],
"black": ["#000000", [0,0,0]],
"blanchedalmond": ["#ffebcd", [255,235,205]],
"blue": ["#0000ff", [0,0,255]],
"blueviolet": ["#8a2be2", [138,43,226]],
"brown": ["#a52a2a", [165,42,42]],
"burlywood": ["#deb887", [222,184,135]],
"cadetblue": ["#5f9ea0", [95,158,160]],
"chartreuse": ["#7fff00", [127,255,0]],
"chocolate": ["#d2691e", [210,105,30]],
"coral": ["#ff7f50", [255,127,80]],
"cornflowerblue": ["#6495ed", [100,149,237]],
"cornsilk": ["#fff8dc", [255,248,220]],
"crimson": ["#dc143c", [220,20,60]],
"cyan": ["#00ffff", [0,255,255]],
"darkblue": ["#00008b", [0,0,139]],
"darkcyan": ["#008b8b", [0,139,139]],
"darkgoldenrod": ["#b8860b", [184,134,11]],
"darkgray": ["#a9a9a9", [169,169,169]],
"darkgreen": ["#006400", [0,100,0]],
"darkgrey": ["#a9a9a9", [169,169,169]],
"darkkhaki": ["#bdb76b", [189,183,107]],
"darkmagenta": ["#8b008b", [139,0,139]],
"darkolivegreen": ["#556b2f", [85,107,47]],
"darkorange": ["#ff8c00", [255,140,0]],
"darkorchid": ["#9932cc", [153,50,204]],
"darkred": ["#8b0000", [139,0,0]],
"darksalmon": ["#e9967a", [233,150,122]],
"darkseagreen": ["#8fbc8f", [143,188,143]],
"darkslateblue": ["#483d8b", [72,61,139]],
"darkslategray": ["#2f4f4f", [47,79,79]],
"darkslategrey": ["#2f4f4f", [47,79,79]],
"darkturquoise": ["#00ced1", [0,206,209]],
"darkviolet": ["#9400d3", [148,0,211]],
"deeppink": ["#ff1493", [255,20,147]],
"deepskyblue": ["#00bfff", [0,191,255]],
"dimgray": ["#696969", [105,105,105]],
"dimgrey": ["#696969", [105,105,105]],
"dodgerblue": ["#1e90ff", [30,144,255]],
"firebrick": ["#b22222", [178,34,34]],
"floralwhite": ["#fffaf0", [255,250,240]],
"forestgreen": ["#228b22", [34,139,34]],
"fuchsia": ["#ff00ff", [255,0,255]],
"gainsboro": ["#dcdcdc", [220,220,220]],
"ghostwhite": ["#f8f8ff", [248,248,255]],
"gold": ["#ffd700", [255,215,0]],
"goldenrod": ["#daa520", [218,165,32]],
"gray": ["#808080", [128,128,128]],
"green": ["#008000", [0,128,0]],
"greenyellow": ["#adff2f", [173,255,47]],
"grey": ["#808080", [128,128,128]],
"honeydew": ["#f0fff0", [240,255,240]],
"hotpink": ["#ff69b4", [255,105,180]],
"indianred": ["#cd5c5c", [205,92,92]],
"indigo": ["#4b0082", [75,0,130]],
"ivory": ["#fffff0", [255,255,240]],
"khaki": ["#f0e68c", [240,230,140]],
"lavender": ["#e6e6fa", [230,230,250]],
"lavenderblush": ["#fff0f5", [255,240,245]],
"lawngreen": ["#7cfc00", [124,252,0]],
"lemonchiffon": ["#fffacd", [255,250,205]],
"lightblue": ["#add8e6", [173,216,230]],
"lightcoral": ["#f08080", [240,128,128]],
"lightcyan": ["#e0ffff", [224,255,255]],
"lightgoldenrodyellow": ["#fafad2", [250,250,210]],
"lightgray": ["#d3d3d3", [211,211,211]],
"lightgreen": ["#90ee90", [144,238,144]],
"lightgrey": ["#d3d3d3", [211,211,211]],
"lightpink": ["#ffb6c1", [255,182,193]],
"lightsalmon": ["#ffa07a", [255,160,122]],
"lightseagreen": ["#20b2aa", [32,178,170]],
"lightskyblue": ["#87cefa", [135,206,250]],
"lightslategray": ["#778899", [119,136,153]],
"lightslategrey": ["#778899", [119,136,153]],
"lightsteelblue": ["#b0c4de", [176,196,222]],
"lightyellow": ["#ffffe0", [255,255,224]],
"lime": ["#00ff00", [0,255,0]],
"limegreen": ["#32cd32", [50,205,50]],
"linen": ["#faf0e6", [250,240,230]],
"magenta": ["#ff00ff", [255,0,255]],
"maroon": ["#800000", [128,0,0]],
"mediumaquamarine": ["#66cdaa", [102,205,170]],
"mediumblue": ["#0000cd", [0,0,205]],
"mediumorchid": ["#ba55d3", [186,85,211]],
"mediumpurple": ["#9370db", [147,112,219]],
"mediumseagreen": ["#3cb371", [60,179,113]],
"mediumslateblue": ["#7b68ee", [123,104,238]],
"mediumspringgreen": ["#00fa9a", [0,250,154]],
"mediumturquoise": ["#48d1cc", [72,209,204]],
"mediumvioletred": ["#c71585", [199,21,133]],
"midnightblue": ["#191970", [25,25,112]],
"mintcream": ["#f5fffa", [245,255,250]],
"mistyrose": ["#ffe4e1", [255,228,225]],
"moccasin": ["#ffe4b5", [255,228,181]],
"navajowhite": ["#ffdead", [255,222,173]],
"navy": ["#000080", [0,0,128]],
"oldlace": ["#fdf5e6", [253,245,230]],
"olive": ["#808000", [128,128,0]],
"olivedrab": ["#6b8e23", [107,142,35]],
"orange": ["#ffa500", [255,165,0]],
"orangered": ["#ff4500", [255,69,0]],
"orchid": ["#da70d6", [218,112,214]],
"palegoldenrod": ["#eee8aa", [238,232,170]],
"palegreen": ["#98fb98", [152,251,152]],
"paleturquoise": ["#afeeee", [175,238,238]],
"palevioletred": ["#db7093", [219,112,147]],
"papayawhip": ["#ffefd5", [255,239,213]],
"peachpuff": ["#ffdab9", [255,218,185]],
"peru": ["#cd853f", [205,133,63]],
"pink": ["#ffc0cb", [255,192,203]],
"plum": ["#dda0dd", [221,160,221]],
"powderblue": ["#b0e0e6", [176,224,230]],
"purple": ["#800080", [128,0,128]],
"red": ["#ff0000", [255,0,0]],
"rosybrown": ["#bc8f8f", [188,143,143]],
"royalblue": ["#4169e1", [65,105,225]],
"saddlebrown": ["#8b4513", [139,69,19]],
"salmon": ["#fa8072", [250,128,114]],
"sandybrown": ["#f4a460", [244,164,96]],
"seagreen": ["#2e8b57", [46,139,87]],
"seashell": ["#fff5ee", [255,245,238]],
"sienna": ["#a0522d", [160,82,45]],
"silver": ["#c0c0c0", [192,192,192]],
"skyblue": ["#87ceeb", [135,206,235]],
"slateblue": ["#6a5acd", [106,90,205]],
"slategray": ["#708090", [112,128,144]],
"slategrey": ["#708090", [112,128,144]],
"snow": ["#fffafa", [255,250,250]],
"springgreen": ["#00ff7f", [0,255,127]],
"steelblue": ["#4682b4", [70,130,180]],
"tan": ["#d2b48c", [210,180,140]],
"teal": ["#008080", [0,128,128]],
"thistle": ["#d8bfd8", [216,191,216]],
"tomato": ["#ff6347", [255,99,71]],
"turquoise": ["#40e0d0", [64,224,208]],
"violet": ["#ee82ee", [238,130,238]],
"wheat": ["#f5deb3", [245,222,179]],
"white": ["#ffffff", [255,255,255]],
"whitesmoke": ["#f5f5f5", [245,245,245]],
"yellow": ["#ffff00", [255,255,0]],
"yellowgreen": ["#9acd32",[154,205,50]]}
};