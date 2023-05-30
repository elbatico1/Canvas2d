Canvas2d
========
javascript library thought for ease the inetraction with the context 2d capabilities of the "canvas" HTML5 element.
Canvas2D offer a set of methods for drawing and interact with animated objects.

Browser Support
--------

All major browsers

Examples
--------

Under development [www.somethinglikethis.it/canvas2d](http://www.somethinglikethis.it).

Usage
--------

### instanciate Stage as Main DIV container

*Three arguments accepted:*

* REQUIRED - {**container**} DIV Element or ID of a preexisting DIV Element
* REQUIRED - {**point**} Size in form of Point; Point, Array, Number, or String as CSS format "width,height" or as a single word "full" to extend the DIV Element to the entire viewport
* OPTIONAL - {**boolean**} Enable Event Listener TRUE or FALSE; default TRUE

`var stage=new Canvas2d.Stage('canva','100%,100%',false);`

*the __canva__ argument refer to e preexisting DIV ELement with ID = "canva"*

*the __"100%,100%"__ argument calls for an extended container, equal to __"full"__ the __false__ argument disable the Event listeners*

#### more on __Stage__ at __Under development__ [www.somethinglikethis.it/canvas2d](http://www.somethinglikethis.it).

### instanciate Layer as context2d element child of Stage

* OPTIONAL - {**name**} a String representing the object name
* OPTIONAL - {**boolean**} Enable Event Listener TRUE or FALSE; default TRUE

`var layer=new Canvas2d.Layer('layer_1',false);`

*the __false__ argument disable the Event listeners*

#### more on __Layer__ at __Under development__ [www.somethinglikethis.it/canvas2d](http://www.somethinglikethis.it).

### instanciate DisplayObjects as single basic shapes

* OPTIONAL - {**name**} a String representing the object name
* OPTIONAL - {**boolean**} Enable Event Listener TRUE or FALSE; default TRUE

`var dispObj=new Canvas2d.DisplayObjects('dispObj_1');`

*a basic shape method can be called, as an example 'rect'*

`dispObj.rect(0, [100,100], 'lightseagreen', 'darkorange', 4);`

*A position and Size is pass as an argument. It can be a:*
- *Point* - object
- *Array* - in form `[x,y]`
- *Number* - a single number

**All DisplayObjects basic shapes:**

- **rect** `.rect(p, size, color, linecolor, linewidth);`
- **roundRect** `.rectRound(p, size, radius, color, linecolor, linewidth);`
- **circle** `.circle(p, radius, startAngle, endAngle, color, linecolor, linewidth);`
- **line** `.line(p, start, end, linecolor, linewidth, lineCap, lineJoin, lineMiter);`
- **polygon** `.polygon(p, points, color, linecolor, linewidth, close);`
- **shape** `.shape(p, obj, color, linecolor, linewidth, close);`
- **img** `.img(p, source, show, color, paddingleft, paddingtop, crop);`
- **clip** `.clip(p, source, framelist, show);`
- **text** `.text(txt, p, fontweigth, fontsize, font, color, background, align, baseline);`

#### more on __DisplayObjects__ at __Under development__ [www.somethinglikethis.it/canvas2d](http://www.somethinglikethis.it).

**All DisplayObjects share some basic properties:**

- **position** *a point Object with its own set of methods*
- **size** *a point Object with its own set of methods*
- **pivot** *a point Object with its own set of methods*
- **scale** *a point Object with its own set of methods*
- **color** *an __Array__ `[r,g,b]`, __String__ as hex, rgb, hsl or hsv*
- **lineColor** *an __Array__ `[r,g,b]`, __String__ as hex, rgb, hsl or hsv*
- **lineWidth**
- **lineCap**
- **lineJoin**
- **lineMiter**
- **gradient** *an object `{'color': ['blue', 'green'],
                    'offset': [0, 1],
                    'coord': {'x0': 0, 'y0': 0, 'x1': w, 'y1': 0}, 'type': 'linear'};`*
- **lineGradient** *see _gradient_*

#### Add dispObj to the childlist of Layer to be later draw
`layer.add(dispObj);`

*layer can accept multiple DisplayObjects elements as arguments*

#### Add layer to its parent container childlist Stage
`stage.add(layer);`

* finally the draw method can be called either from Stage, to draw all Layers and its children or from Layer to draw all DisplayObjects as children of Layer

`stage.draw();`

License
-------
Canvas2d is released under [Apache license](http://www.apache.org/licenses/LICENSE-2.0).

Credits
-------
Canvas2d javascript library was created by [Fabio Fantini](https://github.com/elbatico1/Canvas2d). You can contact me at [info@somethinglikethis.it](mailto:info@somethinglikethis.it)