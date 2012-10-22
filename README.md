Canvas2d
========
javascript library for managing 2d drawing through html 5 element canvas.
Canvas2d it's an ease and friendly way of taking advantages of the great features of html 5 context 2d canvas. This library was intended particularly for who is thinking, or already did, moving from Flash actionscript to javascript and context 2d canvas, as well as I did.

Browser Support
--------

Canvas2d has been tested and should work in
- Internet Explorer 9+
- Safari
- Firefox
- Chrome
- Opera

Examples
--------

I just begin to set it free so, for right now, there isn't much to show. Some example and a draft documentation can be found at [here](http://www.somethinglikethis.it/canvas2d/).

Usage
--------

Canvas2d it's subdivided into 4 main objects:
* Stage
* Sprite
* DisplayObjects
* Tweener 

and a separated object **Colors** in wich are placed some utils for converting and manage colors.

**Stage** is the first object to be instantiated, require 3 parameters and a fourth optional.

* container - The div element in wich place all the subsequent _layer_ ( **Sprite** )
* width - The horizontal length
* height - The vertical length
* enableevent - A boolean defining if enable the loop listener for interaction

**Sprite** basically the layer ( _HTML5 canvas context 2d_ ) with an optional parameter.

* name - The name given to the element

**DisplayObjects** is where the actual drawing it's made. It has several methods and constructor for managing the basics shapes and picture.

* line - a straight line
* rect - a simple rectangle
* rectRound - a rounded rectangle
* polygon - a free polygon shape
* shape - a free shape
* text - a line of text
* img - an image
* clip - a collection of cut from a given image

**Tweener** is a collection of methods useful for move in time every property of basic shape, sprite and stage.

* addTweener - the main method, takes the target element _required_ , the parameters to transition and a few optional parameters.

> duration - the actual duration in milliseconds - *required*

> ease - the type of transition, there is a collection of 41 different types

> onStart - a function to be executed once first start

> onTween - a function to be executed while the transition take action

> onEnd - a function to be executed once the transition ends



## Some simple example

### Stage
```
var stage=new Canvas2d.Stage("container",560,300,true);
```

### Sprite
```
var sprite=new Canvas2d.Sprite("mysprite");
```

### DisplayObjects
```
var myobj=new Canvas2d.DisplayObjects("myobj");
myobj.rect(localx,localy,width,height,color,linecolor,linewidth);
sprite.add(myobj);
stage.add(sprite);
stage.draw();
```

### Tweener
```
var tween=new Canvas2d.Tweener();
tween.addTweener(myobj,{param...,duration:mls,ease:"easeNone",onStart:function,onTween:function,onEnd:function});
```
				
License
-------
Canvas2d is released under [MIT license](http://opensource.org/licenses/mit-license.php).

Credits
-------
Canvas2d javascript library was created by [Fabio Fantini](https://github.com/elbatico1/Canvas2d). You can contact me at [info@somethinglikethis.it](mailto:info@somethinglikethis.it)