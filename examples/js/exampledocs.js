
var Code = {
    Common: {
        method: {
            clone: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('main');
                var newRect, i = 0;
                var label = new Canvas2d.DisplayObjects('label', false);
                label.text('Clone by Clicking It and Drag It where you Want', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
                label.x = label.y = 20;
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(0, 0, 100, 100, 'lightsteelblue');
                rect.x = rect.y = 60;
                rect.addEvent('click', cloneIt);
                rect.addEvent('mouseover', mOver);
                rect.addEvent('mouseout', mOut);
                rect.addEvent('dragstart', dragSIt);
                rect.addEvent('drag', dragIt);
                sprite.add(label);
                sprite.add(rect);
                stage.add(sprite);
                stage.draw();
                function mOver() {
                    stage.container.style.cursor = 'pointer';
                }
                function mOut() {
                    stage.container.style.cursor = 'default';
                }
                function cloneIt(e){
                    newRect = rect.clone('newRect_' + i++);
                    newRect.color = Colors.RandomRgb();
                    newRect.x = e.target.x + 10;
                    newRect.y = e.target.y + 10;
                    sprite.add(newRect);
                    e.target.parent.draw();
                }
                function dragIt(e){
                    e.target.x = e.mouse.ox;
                    e.target.y = e.mouse.oy;
                    e.target.parent.draw();
                }
                function dragSIt(e){
                    e.target.zOrder('top');
                }
            },
            addEvent: function(c, w, h, params) {
                var eventList = ['click', 'mouseover', 'mouseout', 'dragstart', 'drag', 'dragstop', 'mousedown', 'mouseup', 'mousemove'];
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('main');
                var labelContainer = new Canvas2d.Sprite('label container', false);
                var label;
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(-50, -50, 100, 100, 'lightsteelblue');
                rect.x = stage.width / 2;
                rect.y = stage.height / 2;
                sprite.add(rect);
                stage.add(labelContainer);
                stage.add(sprite);
                for (var i = 0; i < eventList.length; i++) {
                    rect.addEvent(eventList[i], eval(eventList[i]));
                    label = new Canvas2d.DisplayObjects(eventList[i]);
                    label.text('Current event:', 0, 0, 'normal', 20, 'Helvetica', 'black', null, 'start', 'top');
                    label.x = 20;
                    label.y = 20 + (30 * i);
                    rect[eventList[i]] = label;
                    labelContainer.add(label);
                }
                function click(e) {
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function mouseover(e) {
                    e.target.mouseout.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function mouseout(e) {
                    e.target.mousemove.txt = 'Current event: ';
                    e.target.mouseover.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function dragstart(e) {
                    e.target.dragstop.txt = 'Current event: ';
                    e.target.mousemove.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function drag(e) {
                    e.target.dragstop.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    rect.x = e.mouse.ox;
                    rect.y = e.mouse.oy;
                    stage.draw();
                }
                function dragstop(e) {
                    e.target.dragstart.txt = 'Current event: ';
                    e.target.drag.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function mousedown(e) {
                    e.target.mouseup.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function mouseup(e) {
                    e.target.mousedown.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function mousemove(e) {
                    e.target.mousedown.txt = 'Current event: ';
                    e.target.mouseup.txt = 'Current event: ';
                    e.target.click.txt = 'Current event: ';
                    e.target.dragstop.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                stage.draw();
            },
            removeEvent: function(c, w, h, params) {
                var eventList = ['click', 'mouseover', 'mouseout', 'dragstart', 'drag', 'dragstop', 'mousedown', 'mouseup', 'mousemove'];
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('main');
                var labelContainer = new Canvas2d.Sprite('label container', false);
                var evtRemover = new Canvas2d.Sprite('label remover');
                var label, eventRemove;
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(-50, -50, 100, 100, 'lightsteelblue');
                rect.x = stage.width / 2;
                rect.y = stage.height / 2;
                sprite.add(rect);
                stage.add(labelContainer);
                stage.add(evtRemover);
                stage.add(sprite);
                for (var i = 0; i < eventList.length; i++) {
                    rect.addEvent(eventList[i], eval(eventList[i]));
                    label = new Canvas2d.DisplayObjects(eventList[i]);
                    label.text('Current event:', 0, 0, 'normal', 20, 'Helvetica', 'black', null, 'start', 'top');
                    label.x = 20;
                    label.y = 20 + (30 * i);
                    rect[eventList[i]] = label;
                    labelContainer.add(label);
                    eventRemove = label.clone(eventList[i]);
                    eventRemove.txt = eventList[i];
                    eventRemove.align = 'right';
                    eventRemove.x = stage.width - 20;
                    eventRemove.y = eventRemove.height + (30 * i);
                    eventRemove.addEvent('click', addRemove);
                    eventRemove.addEvent('mouseover', mOver);
                    eventRemove.addEvent('mouseout', mOut);
                    evtRemover.add(eventRemove);
                }
                function click(e) {
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function mouseover(e) {
                    e.target.mouseout.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function mouseout(e) {
                    e.target.mousemove.txt = 'Current event: ';
                    e.target.mouseover.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function dragstart(e) {
                    e.target.dragstop.txt = 'Current event: ';
                    e.target.mousemove.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function drag(e) {
                    e.target.dragstop.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    rect.x = e.mouse.ox;
                    rect.y = e.mouse.oy;
                    stage.draw();
                }
                function dragstop(e) {
                    e.target.dragstart.txt = 'Current event: ';
                    e.target.drag.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function mousedown(e) {
                    e.target.mouseup.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function mouseup(e) {
                    e.target.mousedown.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function mousemove(e) {
                    e.target.mousedown.txt = 'Current event: ';
                    e.target.mouseup.txt = 'Current event: ';
                    e.target.click.txt = 'Current event: ';
                    e.target.dragstop.txt = 'Current event: ';
                    e.target[e.type].txt = 'Current event: ' + e.type;
                    stage.draw();
                }
                function addRemove(e) {
                    if (e.target.name in rect.evtListeners) {
                        if (eval(e.target.name) === rect.evtListeners[e.target.name].func[0]) {
                            rect.removeEvent(e.target.name, eval(e.target.name));
                            rect[e.target.name].txt = e.target.name + ' event removed';
                            rect[e.target.name].color = 'red';
                        }
                    } else {
                        rect.addEvent(e.target.name, eval(e.target.name));
                        rect[e.target.name].txt = e.target.name + ' event added';
                        rect[e.target.name].color = 'black';
                    }
                    stage.draw();
                }
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                    e.target.color = 'lightblue';
                    evtRemover.draw();
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                    e.target.color = 'black';
                    evtRemover.draw();
                }
                stage.draw();
            },
            add: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('main');
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(-50, -50, 100, 100, Colors.RandomRgb());
                var circle = new Canvas2d.DisplayObjects('circle');
                circle.circle(0, 0, 50, 0, Math.PI * 2, Colors.RandomRgb());
                var x, y;
                var label = new Canvas2d.DisplayObjects('addobject');
                label.text('Add Object', 0, 0, 'normal', 20, 'Helvetica', 'black', null, 'start', 'top');
                label.x = 20;
                label.y = 20;
                label.addEvent('click', addObj);
                label.addEvent('mouseover', mOver);
                label.addEvent('mouseout', mOut);
                sprite.add(label);
                stage.add(sprite);
                stage.draw();
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                    e.target.color = 'lightblue';
                    sprite.draw();
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                    e.target.color = 'black';
                    sprite.draw();
                }
                function addObj(e) {
                    var randomObject;
                    x = Math.random() * (stage.width - 100) + 50;
                    y = Math.random() * (stage.height - 100) + 50;
                    if (Math.random() * 2 < 1) {
                        randomObject = rect.clone();
                        randomObject.color = Colors.RandomRgb();
                        randomObject.x = x;
                        randomObject.y = y;
                    } else {
                        randomObject = circle.clone();
                        randomObject.color = Colors.RandomRgb();
                        randomObject.x = x;
                        randomObject.y = y;
                    }
                    sprite.add(randomObject);
                    stage.draw();
                }
            },
            remove: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('main');
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(-50, -50, 100, 100, Colors.RandomRgb());
                var circle = new Canvas2d.DisplayObjects('circle');
                circle.circle(0, 0, 50, 0, Math.PI * 2, Colors.RandomRgb());
                var x, y, label2;
                var label = new Canvas2d.DisplayObjects('addobject');
                label.text('Add Objects', 0, 0, 'normal', 20, 'Helvetica', 'black', null, 'start', 'top');
                label2 = label.clone('label2');
                label2.align = 'center';
                label2.baseLine = 'alphabetic';
                label2.enabledEvent = false;
                label2.visible = false;
                label.x = 20;
                label.y = 20;
                label.addEvent('click', addObj);
                label.addEvent('mouseover', mOver);
                label.addEvent('mouseout', mOut);
                sprite.add(label2);
                sprite.add(label);
                stage.add(sprite);
                stage.draw();
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                    e.target.color = 'lightblue';
                    sprite.draw();
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                    e.target.color = 'black';
                    sprite.draw();
                }
                function rOut(e) {
                    stage.container.style.cursor = 'default';
                    label2.visible = false;
                    label2.x = 0;
                    label2.y = 0;
                    label2.txt = '';
                    sprite.draw();
                }
                function rOver(e) {
                    stage.container.style.cursor = 'pointer';
                    label2.x = e.target.x;
                    label2.y = e.target.y - 10;
                    label2.txt = 'Remove';
                    label2.visible = true;
                    sprite.draw();
                }
                function removeObj(e) {
                    rOut(e);
                    e.target.removeEvent('mouseout', rOut);
                    label2.visible = false;
                    sprite.remove(e.target);
                    stage.draw();
                }
                function addObj() {
                    for (var i = 0; i < Math.random() * 30; i++) {
                        var randomObject;
                        x = Math.random() * (stage.width - 100) + 50;
                        y = Math.random() * (stage.height - 100) + 50;
                        if (Math.random() * 2 < 1) {
                            randomObject = rect.clone();
                            randomObject.color = Colors.RandomRgb();
                            randomObject.x = x;
                            randomObject.y = y;
                        } else {
                            randomObject = circle.clone();
                            randomObject.color = Colors.RandomRgb();
                            randomObject.x = x;
                            randomObject.y = y;
                        }
                        randomObject.addEvent('click', removeObj);
                        randomObject.addEvent('mouseover', rOver);
                        randomObject.addEvent('mouseout', rOut);
                        sprite.add(randomObject);
                    }
                    label2.zOrder('top');
                    stage.draw();
                }
                addObj();
            },
            zOrder: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('main');
                var sprite2 = new Canvas2d.Sprite('sprite2');
                var sprite3 = new Canvas2d.Sprite('sprite3');
                var orders = 'top', ordero = 'top', rectObj;
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(-50, -50, 100, 100, 'lightsteelblue', 'red', 2);
                rect.x = stage.width / 2;
                rect.y = stage.height / 2;
                rect.addEvent('mouseover', mOvero);
                rect.addEvent('mouseout', mOuto);
                rect.addEvent('click', zOrderObject);
                for (var i = 0; i < 4; i++) {
                    rectObj = rect.clone();
                    rectObj.color = Colors.RandomRgb();
                    rectObj.x = ((stage.width / 2) - 100) + (50 * (i > 2 ? i - 2 : i));
                    rectObj.y = ((stage.height / 2) - 50) + (50 * (i > 1 ? 1 : 0));
                    sprite2.add(rectObj);
                    rectObj = rect.clone();
                    rectObj.color = Colors.RandomRgb();
                    rectObj.lineColor = 'blue';
                    rectObj.x = ((stage.width / 2) - 100) + (50 * (i > 2 ? i - 2 : i));
                    rectObj.y = ((stage.height / 2) - 50) + (50 * (i > 1 ? 1 : 0));
                    sprite3.add(rectObj);
                }
                sprite3.x = 10;
                sprite3.y = -20;
                sprite3.addEvent('drag', drag);
                sprite2.addEvent('drag', drag);
                var label = new Canvas2d.DisplayObjects('addobject');
                label.text('zOrder Sprite', 0, 0, 'normal', 20, 'Helvetica', 'black', null, 'start', 'top');
                label.x = 20;
                label.y = 20;
                label.addEvent('mouseover', mOver);
                label.addEvent('mouseout', mOut);
                label.addEvent('click', zOrderSprite);

                sprite.add(label);
                stage.add(sprite);
                stage.add(sprite2);
                stage.add(sprite3);
                stage.draw();
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                    e.target.color = 'lightblue';
                    e.target.parent.draw();
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                    e.target.color = 'black';
                    e.target.parent.draw();
                }
                function mOvero(e) {
                    stage.container.style.cursor = 'pointer';
                }
                function mOuto(e) {
                    stage.container.style.cursor = 'default';
                }
                function drag(e) {
                    e.target.x = e.mouse.ox;
                    e.target.y = e.mouse.oy;
                    e.target.parent.draw();
                }
                function zOrderSprite(e) {
                    sprite2.zOrder(orders);
                    orders = orders === 'top' ? 'bottom' : 'top';
                }
                function zOrderObject(e) {
                    ordero = e.target.index === e.target.parent.children.length - 1 ? 'bottom' : 'top';
                    e.target.zOrder(ordero);
                    e.target.parent.draw();
                }
            },
            clear: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('main');
                var spriteLabel = new Canvas2d.Sprite('mainlabel');
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(-50, -50, 100, 100, Colors.RandomRgb());
                var circle = new Canvas2d.DisplayObjects('circle');
                circle.circle(0, 0, 50, 0, Math.PI * 2, Colors.RandomRgb());
                var x, y, clearCanvas;
                var label = new Canvas2d.DisplayObjects('addobject');
                label.text('Add Object', 0, 0, 'normal', 20, 'Helvetica', 'black', null, 'start', 'top');
                label.x = 20;
                label.y = 20;
                label.addEvent('mouseover', mOver);
                label.addEvent('mouseout', mOut);
                clearCanvas = label.clone('clearcanvas');
                clearCanvas.txt = 'Clear Canvas';
                clearCanvas.y = 60;
                clearCanvas.addEvent('click', clearAll);
                label.addEvent('click', addObj);
                spriteLabel.add(clearCanvas);
                sprite.add(label);
                stage.add(sprite);
                stage.add(spriteLabel);
                stage.draw();
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                    e.target.color = 'lightblue';
                    e.target.parent.draw();
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                    e.target.color = 'black';
                    e.target.parent.draw();
                }
                function addObj(e) {
                    var randomObject;
                    x = Math.random() * (stage.width - 100) + 50;
                    y = Math.random() * (stage.height - 100) + 50;
                    if (Math.random() * 2 < 1) {
                        randomObject = rect.clone();
                        randomObject.color = Colors.RandomRgb();
                        randomObject.x = x;
                        randomObject.y = y;
                    } else {
                        randomObject = circle.clone();
                        randomObject.color = Colors.RandomRgb();
                        randomObject.x = x;
                        randomObject.y = y;
                    }
                    sprite.add(randomObject);
                    sprite.draw();
                }
                function clearAll(e) {
                    e.target.txt = e.target.txt === 'Draw' ? 'Clear Canvas' : 'Draw';
                    label.visible = label.visible === false ? true : false;
                    sprite.clear();
                    if (label.visible === true)
                        sprite.draw();
                    e.target.parent.draw();
                }
            },
            draw: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('main');
                var spriteLabels = new Canvas2d.Sprite('labels');
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(-50, -50, 100, 100, Colors.RandomRgb());
                var circle = new Canvas2d.DisplayObjects('circle');
                circle.circle(0, 0, 50, 0, Math.PI * 2, Colors.RandomRgb());
                var x, y, label2, label3, n = 0;
                var label = new Canvas2d.DisplayObjects('addobject');
                label.text('Add Objects', 0, 0, 'normal', 20, 'Helvetica', 'black', null, 'start', 'top');
                label.x = 20;
                label3 = label.clone('label3');
                label3.txt = 'Number of objects: ';
                label3.y = 100;
                label.addEvent('mouseover', mOver);
                label.addEvent('mouseout', mOut);
                label2 = label.clone('label2');
                label2.txt = 'Draw';
                label2.y = 60;
                label2.addEvent('click', drawObj);
                label.y = 20;
                label.addEvent('click', addObj);
                label3.enabledEvent = false;

                spriteLabels.add(label2);
                spriteLabels.add(label3);
                spriteLabels.add(label);
                stage.add(sprite);
                stage.add(spriteLabels);
                stage.draw();
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                    e.target.color = 'lightblue';
                    e.target.parent.draw();
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                    e.target.color = 'black';
                    e.target.parent.draw();
                }
                function drawObj(e) {
                    e.target.txt = e.target.txt === 'Draw' ? 'Clear' : 'Draw';
                    if (e.target.txt === 'Clear') {
                        sprite.draw();
                    } else {
                        sprite.clear();
                    }
                    e.target.parent.draw();
                }
                function addObj() {
                    for (var i = 0; i < Math.random() * 30; i++) {
                        var randomObject;
                        x = Math.random() * (stage.width - 200) + 100;
                        y = Math.random() * (stage.height - 100) + 50;
                        if (Math.random() * 2 < 1) {
                            randomObject = rect.clone();
                            randomObject.color = Colors.RandomRgb();
                            randomObject.x = x;
                            randomObject.y = y;
                        } else {
                            randomObject = circle.clone();
                            randomObject.color = Colors.RandomRgb();
                            randomObject.x = x;
                            randomObject.y = y;
                        }
                        sprite.add(randomObject);
                    }
                    n += i;
                    label3.txt = 'Number of objects: ' + n;
                    spriteLabels.draw();
                }
                addObj();
            },
            getFrame: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h, false);
                var stats = new Stats();
                stats.domElement.style.top = '0px';
                stats.domElement.style.left = '0px';
                stats.domElement.style.position = 'absolute';
                stage.container.parentNode.appendChild(stats.domElement);
                var sprite = new Canvas2d.Sprite('main');
                var step = 4, x = step;
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(-50, -50, 100, 100, 'lightsteelblue');
                rect.x = stage.width / 2;
                rect.y = stage.height / 2;
                var label = new Canvas2d.DisplayObjects('label');
                label.text('Current Frame Number', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
                label.x = 140;
                label.y = 40;
                sprite.add(rect);
                sprite.add(label);
                stage.add(sprite);
                stage.draw();
                function loop() {
                    stats.begin();
                    label.txt = 'Current Frame Number: ' + stage.getFrame();
                    if (rect.x > stage.width - rect.width) {
                        x = -step;
                    } else if (rect.x < rect.width) {
                        x = step;
                    }
                    rect.x += x;
                    stage.draw();
                    stats.end();
                }
                stage.addLoop(sprite, loop);
            },
            getTime: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h, false);
                var stats = new Stats();
                stats.domElement.style.top = '0px';
                stats.domElement.style.left = '0px';
                stats.domElement.style.position = 'absolute';
                stage.container.parentNode.appendChild(stats.domElement);
                var sprite = new Canvas2d.Sprite('main');
                var step = 4, x = step;
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(-50, -50, 100, 100, 'lightsteelblue');
                rect.x = stage.width / 2;
                rect.y = stage.height / 2;
                var label = new Canvas2d.DisplayObjects('label');
                label.text('Current Time Elapsed', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
                label.x = 140;
                label.y = 40;
                sprite.add(rect);
                sprite.add(label);
                stage.add(sprite);
                stage.draw();
                function loop() {
                    stats.begin();
                    label.txt = 'Current Time Elapsed: ' + stage.getTime() + 'Mls';
                    if (rect.x > stage.width - rect.width) {
                        x = -step;
                    } else if (rect.x < rect.width) {
                        x = step;
                    }
                    rect.x += x;
                    stage.draw();
                    stats.end();
                }
                stage.addLoop(sprite, loop);
            },
            getFps: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h, false);
                var stats = new Stats();
                stats.domElement.style.top = '0px';
                stats.domElement.style.left = '0px';
                stats.domElement.style.position = 'absolute';
                stage.container.parentNode.appendChild(stats.domElement);
                var sprite = new Canvas2d.Sprite('main');
                var step = 4, x = step;
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(-50, -50, 100, 100, 'lightsteelblue');
                rect.x = stage.width / 2;
                rect.y = stage.height / 2;
                var label = new Canvas2d.DisplayObjects('label');
                label.text('Current Frame Per Second', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
                label.x = 140;
                label.y = 40;
                sprite.add(rect);
                sprite.add(label);
                stage.add(sprite);
                stage.draw();
                function loop() {
                    stats.begin();
                    label.txt = 'Current Frame Per Second: ' + parseInt(stage.getFps()) + 'Fps';
                    if (rect.x > stage.width - rect.width) {
                        x = -step;
                    } else if (rect.x < rect.width) {
                        x = step;
                    }
                    rect.x += x;
                    stage.draw();
                    stats.end();
                }
                stage.addLoop(sprite, loop);
            },
            getTimeInterval: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h, false);
                var stats = new Stats();
                stats.domElement.style.top = '0px';
                stats.domElement.style.left = '0px';
                stats.domElement.style.position = 'absolute';
                stage.container.parentNode.appendChild(stats.domElement);
                var sprite = new Canvas2d.Sprite('main');
                var step = 4, x = step;
                var rect = new Canvas2d.DisplayObjects('rect');
                rect.rect(-50, -50, 100, 100, 'lightsteelblue');
                rect.x = stage.width / 2;
                rect.y = stage.height / 2;
                var label = new Canvas2d.DisplayObjects('label');
                label.text('Current Interval Time', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
                label.x = 140;
                label.y = 40;
                sprite.add(rect);
                sprite.add(label);
                stage.add(sprite);
                stage.draw();
                function loop() {
                    stats.begin();
                    label.txt = 'Current Interval Time: ' + stage.getTimeInterval() + 'Mls';
                    if (rect.x > stage.width - rect.width) {
                        x = -step;
                    } else if (rect.x < rect.width) {
                        x = step;
                    }
                    rect.x += x;
                    stage.draw();
                    stats.end();
                }
                stage.addLoop(sprite, loop);
            }
        }
    },
    Stage: {
        examples: {
            stars: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('txt_container');
                var sr = new Canvas2d.Sprite('');
                var twe = new Canvas2d.Tweener();
                var star = new Canvas2d.DisplayObjects('star_0');
                var points = [], g = 10, r1 = 18, r2 = 32;
                var step = (Math.PI * 2) / g, x = 0, y = 0, r = r1, drag = false;
                var coord = [
                    [1, 1], [2, 1], [3, 1], [4, 1],
                    [1, 2], [2, 2], [3, 2], [4, 2],
                    [1, 3], [2, 3], [3, 3], [4, 3]
                ];
                for (var i = 0; i < g; i++) {
                    x = Math.cos((step * i) + step / 2) * r;
                    y = Math.sin((step * i) + step / 2) * r;
                    points.push([x, y]);
                    r = r === r1 ? r2 : r1;
                }
                star.polygon(0, 0, points, null);
                star.x = stage.width / 2;
                star.height = stage.height / 2;
                star.shadow = {color: 'rgba(119,136,153,0.5)',
                    offsetX: 6, offsetY: 6, blur: 10};
                star.addEvent('dragstart', dStart);
                star.addEvent('drag', dDrag);
                star.addEvent('dragstop', dStop);
                star.addEvent('mouseover', mOver);
                star.addEvent('mouseout', mOut);
                function dStart(e) {
                    drag = false;
                    e.target.zOrder('top');
                    twe.addTweener(e.target, {shadow: {offsetX: 20, offsetY: 20, blur: 30},
                        scaleX: 2, scaleY: 2, rotation: 2,
                        duration: 1000, ease: 'easeOutElastic', onEnd: endtwe});
                }
                function endtwe(e) {
                    drag = true;
                }
                function dDrag(e) {
                    e.target.x = Math.round(e.mouse.ox);
                    e.target.y = Math.round(e.mouse.oy);
                    if (drag) {
                        e.target.parent.draw();
                    }
                }
                function dStop(e) {
                    drag = false;
                    twe.addTweener(e.target, {x: e.target.data.x, y: e.target.data.y,
                        shadow: {offsetX: 6, offsetY: 6, blur: 10},
                        scaleX: 1, scaleY: 1, rotation: 0,
                        duration: 800, ease: 'easeOutElastic'});
                }
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                }
                for (i = 0; i < 11; i++) {
                    var s = star.clone('star_' + i);
                    sprite.add(s);
                }
                sprite.add(star);
                stage.add(sr);
                stage.add(sprite);
                sr.draw();
                for (i = 0; i < sprite.children.length; i++) {
                    var xd = coord[i][0] * (stage.width / 5),
                            yd = coord[i][1] * (stage.height / 4);
                    sprite.children[i].x += (Math.cos((Math.PI / 6) * i) * 200);
                    sprite.children[i].y = Math.sin((Math.PI / 6) * i) * 200;
                    sprite.children[i].gradient = {'offset': [0, 1],
                        'color': ['gold', 'lightseagreen'],
                        'type': 'radial',
                        'coord': {'x0': -(coord[i][0] + 3), 'y0': -(coord[i][1] + 3), 'r0': 0,
                            'x1': 0, 'y1': 0, 'r1': r2 * 2}};
                    sprite.children[i].data = {x: xd, y: yd};
                    twe.addTweener(sprite.children[i], {x: xd, y: yd,
                        ease: 'easeOutBounce', delay: 100 * i, duration: 1000});
                }
            },
            multyAnimation: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h, false);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var label = new Canvas2d.DisplayObjects('label1'), lb;
                label.text('STAGE 1', 0, 0, 'bold', 120, 'Helvetica', 'lightblue', null, 'center', 'middle');
                label.x = stage.width / 2;
                label.y = stage.height / 2;
                lb = label.clone('label2');
                lb.txt = 'STAGE 2';
                var background = new Canvas2d.DisplayObjects('back'), bg;
                background.rect(0, 0, w, h, 'lightsteelblue');
                background.alpha = 0.6;
                bg = background.clone('back2');
                var rect = new Canvas2d.DisplayObjects('rect_0');
                rect.rect(0, 0, 40, 40, 'lightseagreen');
                rect.x = Math.random() * stage.width;
                rect.y = Math.random() * stage.height;
                sprite.add(background);
                sprite.add(label);
                sprite.add(rect);
                stage.add(sprite);
                stage.draw();
                //same process different container 
                //div id=container,div id=container2
                var container = document.createElement('div');
                container.id = 'examples2';
                container.style.left = w + 60 + 'px';
                container.style.top = 0 + 'px';
                stage.container.parentNode.appendChild(container);
                var stage2 = new Canvas2d.Stage('examples2', w, h, false);
                var sprite2 = new Canvas2d.Sprite('sprite_2');
                sprite2.add(bg);
                sprite2.add(lb);
                stage2.add(sprite2);
                stage2.draw();
                var offset1 = stage.container.offsetTop + stage.height;
                var offset2 = stage2.container.offsetTop;
                var gap = offset2 - offset1;
                var step = Math.random() * 8 + 4, x = step;
                var stepx = Math.random() * 8 + 4, y = stepx;
                function loop() {
                    if (rect.x > stage.width && sprite2.children.length === 2 && x > 0) {
                        sprite.remove(rect);
                        sprite.draw();
                        sprite2.add(rect);
                        rect.x = -60;
                        x = step;
                    } else if (rect.x + rect.width > stage.width && sprite2.children.length > 2) {
                        x = -step;
                    } else if (rect.x + rect.width < 1 && sprite2.children.length > 2 && x < 0) {
                        sprite2.remove(rect);
                        sprite2.draw();
                        sprite.add(rect);
                        rect.x = stage.width + 60;
                        x = -step;
                    } else if (rect.x < 1 && sprite.children.length > 2) {
                        x = step;
                    }
                    if (rect.y + rect.height > stage.height) {
                        y = -step;
                    } else if (rect.y < 1) {
                        y = step;
                    }
                    rect.x += x;
                    rect.y += y;
                    rect.parent.draw();
                }
                stage.addLoop(rect, loop);
            },
            mobile: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var rect = new Canvas2d.DisplayObjects('rect_0');
                rect.rect(-50, -50, 100, 100, 'lightseagreen', 'lightblue', 4);
                rect.y = rect.x = 0;
                stage.x = stage.width / 2;
                stage.y = stage.height / 2;
                sprite.add(rect);
                stage.add(sprite);
                stage.draw();
                stage.addEvent('gesturechange', gChange);
                function gChange(e) {
                    e.target.scaleX = e.target.scaleY = e.mouse.scale;
                    e.target.rotation = e.mouse.angle;
                    e.target.draw();
                }
            },
            stressTestLoop: function(c, w, h, params) {
                var stats = new Stats(), i, n = 1000, element, x, y, range = 0, r = h / 2, step = (Math.PI*2) / 360;
                var stage = new Canvas2d.Stage(c, w, h);
                stats.domElement.style.top = '0px';
                stats.domElement.style.left = '0px';
                stats.domElement.style.position = 'absolute';
                stage.container.parentNode.appendChild(stats.domElement);
                var layerTop = new Canvas2d.Sprite("top");
                var start = new Canvas2d.DisplayObjects('start');
                start.text('Start', 0, 0, 'normal', 20, 'Helvetica', 'black', null, 'start', 'ideographic');
                start.x = 20;
                start.y = stage.height - 30;
                var stop, plus, minus, label;
                label = start.clone('label');
                label.align = 'right';
                label.enabledEvent = false;
                label.txt = 'Number of Elemenets: ' + n;
                label.x = stage.width - 20;
                start.addEvent('mouseover', mOver);
                start.addEvent('mouseout', mOut);
                start.addEvent('click', click);
                stop = start.clone('stop');
                stop.txt = 'Stop';
                stop.x = start.x + start.width + 20;
                plus = start.clone('plus');
                plus.txt = ' + 1000';
                plus.x = stop.x + stop.width + 20;
                minus = start.clone('minus');
                minus.txt = ' - 1000';
                minus.x = plus.x + 80;
                layerTop.add(label);
                layerTop.add(start);
                layerTop.add(stop);
                layerTop.add(plus);
                layerTop.add(minus);
                var sprite = new Canvas2d.Sprite("main", false);
                function placeElements(n, s){
                    range = 0;
                    for(i = 0; i < n; i++){
                        element = new Canvas2d.DisplayObjects();
                        r = ((h / 2) / n) * i;
                        x = (stage.width / 2) + (Math.cos(range) * r);
                        y = (stage.height / 2) + (Math.sin(range) * r);
                        element.circle(0, 0, 5 * (i / n + 1), 0, Math.PI * 2, Colors.RandomRgb());
                        element.x = x;
                        element.y = y;
                        s.add(element);
                        range += step;
                    }
                }
                placeElements(n, sprite);
                stage.add(sprite);
                stage.add(layerTop);
                stage.draw();
                function loop() {
                    stats.begin();
                    for (var i = 0; i < sprite.children.length; i++) {
                        if (sprite.children[i].x >= stage.width) {
                            sprite.children[i].x = (-sprite.children[i].radius);
                        }
                        sprite.children[i].x += sprite.children[i].radius;
                    }
                    stage.draw();
                    stats.end();
                }
                stage.addLoop(sprite, loop);
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                }
                function click(e){
                    switch(e.target.name){
                        case 'start':
                            stage.addLoop(sprite, loop);
                            break;
                        case 'stop':
                            stage.removeLoop(sprite, loop);
                            break;
                        case 'plus':
                            n = n === 10000 ? 10000 : n + 1000;
                            for(i = sprite.children.length-1; i > -1; i--){
                                sprite.remove(sprite.children[i]);
                            }
                            placeElements(n, sprite);
                            label.txt = 'Number of Elemenets: ' + n;
                            label.parent.draw();
                            break;
                        case 'minus':
                            n = n === 1000 ? 1000 : n - 1000;
                            for(i = sprite.children.length-1; i > -1; i--){
                                sprite.remove(sprite.children[i]);
                            }
                            placeElements(n, sprite);
                            label.txt = 'Number of Elemenets: ' + n;
                            label.parent.draw();
                            break;
                        default:
                            break;
                    }
                }
            },
            stressTestDraw: function(c, w, h, params) {
                var i, n = 1000, element,col = 0, row = 0, r, label, minus, start = (new Date()).getTime(), stop;
                var stage = new Canvas2d.Stage(c, w, h);
                var layerTop = new Canvas2d.Sprite("top");
                var plus = new Canvas2d.DisplayObjects('plus');
                plus.text(' + 1000', 0, 0, 'normal', 20, 'Helvetica', 'black', {color : 'rgba(255, 255, 255, 150)'}, 'start', 'ideographic');
                plus.x = 20;
                plus.y = stage.height - 30;
                label = plus.clone('label');
                label.align = 'right';
                label.enabledEvent = false;
                label.txt = 'Number of Elemenets: ' + n;
                label.x = stage.width - 20;
                plus.addEvent('mouseover', mOver);
                plus.addEvent('mouseout', mOut);
                plus.addEvent('click', click);
                minus = plus.clone('minus');
                minus.txt = ' - 1000';
                minus.x = plus.x + plus.width + 20;
                layerTop.add(label);
                layerTop.add(plus);
                layerTop.add(minus);
                var sprite = new Canvas2d.Sprite("main", false);
                function placeElements(n, s){
                    row = 0;
                    col = 0;
                    r = Math.sqrt((w * h) / n) / 2;
                    for(i = 0; i < n; i++){
                        row += r * 2;
                        element = new Canvas2d.DisplayObjects();
                        element.circle(0, 0, r, 0, Math.PI * 2, Colors.RandomRgb());
                        element.x = row;
                        element.y = (r * 2) * col;
                        s.add(element);
                        row = row > stage.width - (r * 2) ? 0 : row;
                        col = row === 0 ? col + 1 : col;
                    }
                }
                placeElements(n, sprite);
                stage.add(sprite);
                stage.add(layerTop);
                stage.draw();
                stop = (new Date()).getTime();
                label.txt = 'Number of Elemenets: ' + n + ' Time Elapsed: ' + (stop - start) + ' Mls';
                label.parent.draw();
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                }
                function click(e){
                    switch(e.target.name){
                        case 'plus':
                            n = n === 20000 ? 20000 : n + 1000;
                            for(i = sprite.children.length-1; i > -1; i--){
                                sprite.remove(sprite.children[i]);
                            }
                            start = (new Date()).getTime();
                            placeElements(n, sprite);
                            stage.draw();
                            stop = (new Date()).getTime();
                            label.txt = 'Number of Elemenets: ' + n + ' Time Elapsed: ' + (stop - start) + ' Mls';
                            label.parent.draw();
                            break;
                        case 'minus':
                            n = n === 1000 ? 1000 : n - 1000;
                            for(i = sprite.children.length-1; i > -1; i--){
                                sprite.remove(sprite.children[i]);
                            }
                            start = (new Date()).getTime();
                            placeElements(n, sprite);
                            stage.draw();
                            stop = (new Date()).getTime();
                            label.txt = 'Number of Elemenets: ' + n + ' Time Elapsed: ' + (stop - start) + ' Mls';
                            label.parent.draw();
                            break;
                        default:
                            break;
                    }
                }
            }
        },
        start: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var stats = new Stats();
            stats.domElement.style.top = '0px';
            stats.domElement.style.left = '0px';
            stats.domElement.style.position = 'absolute';
            stage.container.parentNode.appendChild(stats.domElement);
            var sprite = new Canvas2d.Sprite('main');
            var step = 4, x = step;
            var rect = new Canvas2d.DisplayObjects('rect');
            rect.rect(-50, -50, 100, 100, 'lightsteelblue');
            rect.x = stage.width / 2;
            rect.y = stage.height / 2;
            var start = new Canvas2d.DisplayObjects('start');
            start.text('Start', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
            start.x = 140;
            start.y = 40;
            start.addEvent('click', resume);
            start.addEvent('mouseover', mOver);
            start.addEvent('mouseout', mOut);
            var stop = start.clone('stop');
            stop.txt = 'Stop';
            stop.y = 70;
            sprite.add(rect);
            sprite.add(start);
            sprite.add(stop);
            stage.add(sprite);
            stage.draw();
            function loop() {
                stats.begin();
                if (rect.x > stage.width - rect.width) {
                    x = -step;
                } else if (rect.x < rect.width) {
                    x = step;
                }
                rect.x += x;
                stage.draw();
                stats.end();
            }
            stage.addLoop(sprite, loop);
            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.color = 'lightsteelblue';
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.color = 'black';
                e.target.parent.draw();
            }
            function resume(e) {
                if (e.target.name === 'start') {
                    stage.start();
                } else {
                    stage.stop();
                }
            }
        },
        stop: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var stats = new Stats();
            stats.domElement.style.top = '0px';
            stats.domElement.style.left = '0px';
            stats.domElement.style.position = 'absolute';
            stage.container.parentNode.appendChild(stats.domElement);
            var sprite = new Canvas2d.Sprite('main');
            var step = 4, x = step;
            var rect = new Canvas2d.DisplayObjects('rect');
            rect.rect(-50, -50, 100, 100, 'lightsteelblue');
            rect.x = stage.width / 2;
            rect.y = stage.height / 2;
            var start = new Canvas2d.DisplayObjects('start');
            start.text('Start', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
            start.x = 140;
            start.y = 40;
            start.addEvent('click', resume);
            start.addEvent('mouseover', mOver);
            start.addEvent('mouseout', mOut);
            var stop = start.clone('stop');
            stop.txt = 'Stop';
            stop.y = 70;
            sprite.add(rect);
            sprite.add(start);
            sprite.add(stop);
            stage.add(sprite);
            stage.draw();
            function loop() {
                stats.begin();
                if (rect.x > stage.width - rect.width) {
                    x = -step;
                } else if (rect.x < rect.width) {
                    x = step;
                }
                rect.x += x;
                stage.draw();
                stats.end();
            }
            stage.addLoop(sprite, loop);
            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.color = 'lightsteelblue';
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.color = 'black';
                e.target.parent.draw();
            }
            function resume(e) {
                if (e.target.name === 'start') {
                    stage.start();
                } else {
                    stage.stop();
                }
            }
        },
        reset: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var stats = new Stats();
            stats.domElement.style.top = '0px';
            stats.domElement.style.left = '0px';
            stats.domElement.style.position = 'absolute';
            stage.container.parentNode.appendChild(stats.domElement);
            var sprite = new Canvas2d.Sprite('main');
            var step = 4, x = step;
            var rect = new Canvas2d.DisplayObjects('rect');
            rect.rect(-50, -50, 100, 100, 'lightsteelblue');
            rect.x = stage.width / 2;
            rect.y = stage.height / 2;
            var start = new Canvas2d.DisplayObjects('start');
            start.text('Start', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
            start.x = 140;
            start.y = 70;
            var frames = start.clone('frames');
            frames.txt = 'Current Frame Elapsed: ';
            frames.y = 10;
            var times = start.clone('times');
            times.txt = 'Current Time Elapsed: ';
            times.y = 40;
            start.addEvent('click', resume);
            start.addEvent('mouseover', mOver);
            start.addEvent('mouseout', mOut);
            var stop = start.clone('stop');
            stop.txt = 'Stop';
            stop.y = 100;
            var reset = start.clone('reset');
            reset.txt = 'Reset';
            reset.y = 130;
            start.x = stop.x = reset.x = 20;
            sprite.add(rect);
            sprite.add(times);
            sprite.add(frames);
            sprite.add(reset);
            sprite.add(start);
            sprite.add(stop);
            stage.add(sprite);
            stage.draw();
            function loop() {
                stats.begin();
                frames.txt = 'Current Frame Elapsed: ' + stage.getFrame();
                times.txt = 'Current Time Elapsed: ' + stage.getTime() + 'Mls';
                if (rect.x > stage.width - rect.width) {
                    x = -step;
                } else if (rect.x < rect.width) {
                    x = step;
                }
                rect.x += x;
                stage.draw();
                stats.end();
            }
            stage.addLoop(sprite, loop);
            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.color = 'lightsteelblue';
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.color = 'black';
                e.target.parent.draw();
            }
            function resume(e) {
                if (e.target.name === 'start') {
                    stage.start();
                } else if (e.target.name === 'stop') {
                    stage.stop();
                } else {
                    stage.reset();
                    frames.txt = 'Current Frame Elapsed: ' + stage.getFrame();
                    times.txt = 'Current Time Elapsed: ' + stage.getTime() + 'Mls';
                    stage.draw();
                }
            }
        },
        addLoop: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var stats = new Stats();
            stats.domElement.style.top = '0px';
            stats.domElement.style.left = '0px';
            stats.domElement.style.position = 'absolute';
            stage.container.parentNode.appendChild(stats.domElement);
            var sprite = new Canvas2d.Sprite('main');
            var step = 4, x = step;
            var rect = new Canvas2d.DisplayObjects('rect');
            rect.rect(-50, -50, 100, 100, 'lightsteelblue');
            rect.x = stage.width / 2;
            rect.y = stage.height / 2;
            var start = new Canvas2d.DisplayObjects('start');
            start.text('Start', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
            start.x = 20;
            start.y = 70;
            var looplist = start.clone('looplist');
            looplist.txt = 'Number of Element in the Loop List Array: ';
            looplist.y = 10;
            looplist.x = 140;
            start.addEvent('click', resume);
            start.addEvent('mouseover', mOver);
            start.addEvent('mouseout', mOut);
            var stop = start.clone('stop');
            stop.txt = 'Stop';
            stop.y = 100;
            var addloop = start.clone('addloop');
            addloop.txt = 'Add Loop';
            addloop.y = 130;
            var removeloop = start.clone('removeloop');
            removeloop.txt = 'Remove Loop';
            removeloop.y = 160;
            sprite.add(rect);
            sprite.add(looplist);
            sprite.add(start);
            sprite.add(stop);
            sprite.add(addloop);
            sprite.add(removeloop);
            stage.add(sprite);
            stage.draw();
            function loop() {
                stats.begin();
                looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                if (rect.x > stage.width - rect.width) {
                    x = -step;
                } else if (rect.x < rect.width) {
                    x = step;
                }
                rect.x += x;
                stage.draw();
                stats.end();
            }
            stage.addLoop(sprite, loop);
            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.color = 'lightsteelblue';
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.color = 'black';
                e.target.parent.draw();
            }
            function resume(e) {
                if (e.target.name === 'start') {
                    stage.start();
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else if (e.target.name === 'stop') {
                    stage.stop();
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else if (e.target.name === 'addloop') {
                    stage.addLoop(sprite, loop);
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else if (e.target.name === 'removeloop') {
                    stage.removeLoop(sprite, loop);
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else {
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                }
            }
        },
        removeLoop: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var stats = new Stats();
            stats.domElement.style.top = '0px';
            stats.domElement.style.left = '0px';
            stats.domElement.style.position = 'absolute';
            stage.container.parentNode.appendChild(stats.domElement);
            var sprite = new Canvas2d.Sprite('main');
            var step = 4, x = step;
            var rect = new Canvas2d.DisplayObjects('rect');
            rect.rect(-50, -50, 100, 100, 'lightsteelblue');
            rect.x = stage.width / 2;
            rect.y = stage.height / 2;
            var start = new Canvas2d.DisplayObjects('start');
            start.text('Start', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
            start.x = 20;
            start.y = 70;
            var looplist = start.clone('looplist');
            looplist.txt = 'Number of Element in the Loop List Array: ';
            looplist.y = 10;
            looplist.x = 140;
            start.addEvent('click', resume);
            start.addEvent('mouseover', mOver);
            start.addEvent('mouseout', mOut);
            var stop = start.clone('stop');
            stop.txt = 'Stop';
            stop.y = 100;
            var addloop = start.clone('addloop');
            addloop.txt = 'Add Loop';
            addloop.y = 130;
            var removeloop = start.clone('removeloop');
            removeloop.txt = 'Remove Loop';
            removeloop.y = 160;
            sprite.add(rect);
            sprite.add(looplist);
            sprite.add(start);
            sprite.add(stop);
            sprite.add(addloop);
            sprite.add(removeloop);
            stage.add(sprite);
            stage.draw();
            function loop() {
                stats.begin();
                looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                if (rect.x > stage.width - rect.width) {
                    x = -step;
                } else if (rect.x < rect.width) {
                    x = step;
                }
                rect.x += x;
                stage.draw();
                stats.end();
            }
            stage.addLoop(sprite, loop);
            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.color = 'lightsteelblue';
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.color = 'black';
                e.target.parent.draw();
            }
            function resume(e) {
                if (e.target.name === 'start') {
                    stage.start();
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else if (e.target.name === 'stop') {
                    stage.stop();
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else if (e.target.name === 'addloop') {
                    stage.addLoop(sprite, loop);
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else if (e.target.name === 'removeloop') {
                    stage.removeLoop(sprite, loop);
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else {
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                }
            }
        },
        enableEvt: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h, false);
            var sprite = new Canvas2d.Sprite('main');
            var disable = new Canvas2d.DisplayObjects('disable');
            disable.text('Disable', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
            disable.x = 20;
            disable.y = 70;
            var label = disable.clone('label');
            label.align = 'center';
            label.txt = 'All the Event Listeners of Stage are Disabled';
            label.x = stage.width / 2;
            label.y = stage.height / 2;
            disable.addEvent('click', endisAble);
            disable.addEvent('mouseover', mOver);
            disable.addEvent('mouseout', mOut);
            sprite.add(disable);
            sprite.add(label);
            stage.add(sprite);

            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.color = 'lightsteelblue';
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.color = 'black';
                e.target.parent.draw();
            }
            function endisAble(e) {
                label.txt = 'All the Event Listeners of Stage are Disabled';
                stage.reset();
                stage.addLoop(sprite, loop);
                stage.disableEvt();
                mOut(e);
            }
            function loop() {
                disable.txt = 'All Event Listeners Abled in: ' + (4000 - stage.getTime()) + 'Mls';
                if (stage.getTime() > 4000) {
                    stage.removeLoop(sprite, loop);
                    label.txt = 'Now all the Event Listener of Stage are Abled, click on Disable';
                    disable.txt = 'Disable';
                    stage.enableEvt();
                }
                stage.draw();
            }
            stage.reset();
            stage.addLoop(sprite, loop);
        },
        disableEvt: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h, false);
            var sprite = new Canvas2d.Sprite('main');
            var disable = new Canvas2d.DisplayObjects('disable');
            disable.text('Disable', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
            disable.x = 20;
            disable.y = 70;
            var label = disable.clone('label');
            label.align = 'center';
            label.txt = 'All the Event Listeners of Stage are Disabled';
            label.x = stage.width / 2;
            label.y = stage.height / 2;
            disable.addEvent('click', endisAble);
            disable.addEvent('mouseover', mOver);
            disable.addEvent('mouseout', mOut);
            sprite.add(disable);
            sprite.add(label);
            stage.add(sprite);

            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.color = 'lightsteelblue';
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.color = 'black';
                e.target.parent.draw();
            }
            function endisAble(e) {
                label.txt = 'All the Event Listeners of Stage are Disabled';
                stage.reset();
                stage.addLoop(sprite, loop);
                stage.disableEvt();
                mOut(e);
            }
            function loop() {
                disable.txt = 'All Event Listeners Abled in: ' + (4000 - stage.getTime()) + 'Mls';
                if (stage.getTime() > 4000) {
                    stage.removeLoop(sprite, loop);
                    label.txt = 'Now all the Event Listener of Stage are Abled, click on Disable';
                    disable.txt = 'Disable';
                    stage.enableEvt();
                }
                stage.draw();
            }
            stage.reset();
            stage.addLoop(sprite, loop);
        },
        getLoopList: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var stats = new Stats();
            stats.domElement.style.top = '0px';
            stats.domElement.style.left = '0px';
            stats.domElement.style.position = 'absolute';
            stage.container.parentNode.appendChild(stats.domElement);
            var sprite = new Canvas2d.Sprite('main');
            var step = 4, x = step;
            var rect = new Canvas2d.DisplayObjects('rect');
            rect.rect(-50, -50, 100, 100, 'lightsteelblue');
            rect.x = stage.width / 2;
            rect.y = stage.height / 2;
            var start = new Canvas2d.DisplayObjects('start');
            start.text('Start', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
            start.x = 20;
            start.y = 70;
            var looplist = start.clone('looplist');
            looplist.txt = 'Number of Element in the Loop List Array: ';
            looplist.y = 10;
            looplist.x = 140;
            start.addEvent('click', resume);
            start.addEvent('mouseover', mOver);
            start.addEvent('mouseout', mOut);
            var stop = start.clone('stop');
            stop.txt = 'Stop';
            stop.y = 100;
            var addloop = start.clone('addloop');
            addloop.txt = 'Add Loop';
            addloop.y = 130;
            var removeloop = start.clone('removeloop');
            removeloop.txt = 'Remove Loop';
            removeloop.y = 160;
            sprite.add(rect);
            sprite.add(looplist);
            sprite.add(start);
            sprite.add(stop);
            sprite.add(addloop);
            sprite.add(removeloop);
            stage.add(sprite);
            stage.draw();
            function loop() {
                stats.begin();
                looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                if (rect.x > stage.width - rect.width) {
                    x = -step;
                } else if (rect.x < rect.width) {
                    x = step;
                }
                rect.x += x;
                stage.draw();
                stats.end();
            }
            stage.addLoop(sprite, loop);
            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.color = 'lightsteelblue';
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.color = 'black';
                e.target.parent.draw();
            }
            function resume(e) {
                if (e.target.name === 'start') {
                    stage.start();
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else if (e.target.name === 'stop') {
                    stage.stop();
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else if (e.target.name === 'addloop') {
                    stage.addLoop(sprite, loop);
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else if (e.target.name === 'removeloop') {
                    stage.removeLoop(sprite, loop);
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                } else {
                    looplist.txt = 'Number of Element in the Loop List Array: ' + stage.getLoopList().length;
                    stage.draw();
                }
            }
        },
        isAnimating: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var stats = new Stats();
            stats.domElement.style.top = '0px';
            stats.domElement.style.left = '0px';
            stats.domElement.style.position = 'absolute';
            stage.container.parentNode.appendChild(stats.domElement);
            var sprite = new Canvas2d.Sprite('main');
            var step = 4, x = step;
            var rect = new Canvas2d.DisplayObjects('rect');
            rect.rect(-50, -50, 100, 100, 'lightsteelblue');
            rect.x = stage.width / 2;
            rect.y = stage.height / 2;
            var start = new Canvas2d.DisplayObjects('start');
            start.text('Start', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
            start.x = 20;
            start.y = 70;
            var animating = start.clone('animating');
            animating.txt = 'Animation: ';
            animating.y = 10;
            animating.x = 140;
            start.addEvent('click', resume);
            start.addEvent('mouseover', mOver);
            start.addEvent('mouseout', mOut);
            var stop = start.clone('stop');
            stop.txt = 'Stop';
            stop.y = 100;
            sprite.add(rect);
            sprite.add(animating);
            sprite.add(start);
            sprite.add(stop);
            stage.add(sprite);
            stage.draw();
            function loop() {
                stats.begin();
                animating.txt = 'Animation: ' + stage.isAnimating();
                if (rect.x > stage.width - rect.width) {
                    x = -step;
                } else if (rect.x < rect.width) {
                    x = step;
                }
                rect.x += x;
                stage.draw();
                stats.end();
            }
            stage.addLoop(sprite, loop);
            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.color = 'lightsteelblue';
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.color = 'black';
                e.target.parent.draw();
            }
            function resume(e) {
                if (e.target.name === 'start') {
                    stage.start();
                    animating.txt = 'Animation: ' + stage.isAnimating();
                    stage.draw();
                } else if (e.target.name === 'stop') {
                    stage.stop();
                    animating.txt = 'Animation: ' + stage.isAnimating();
                    stage.draw();
                }
            }
        },
        getDataURL: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('main');
            var source = new Canvas2d.Sprite('source');
            var destination = new Canvas2d.Sprite('destination', false);

            var x1, x2, y1, y2, rect, n = 10, sourceimage, crop = {dx: 0, dy: 0, dw: 0, dh: 0};
            var image = new Canvas2d.DisplayObjects('image', false);
            image.img(0, 0, null, false, null, 0, 0, crop);
            destination.add(image);

            for (var i = 0; i < n; i++) {
                rect = new Canvas2d.DisplayObjects('rect', false);
                rect.rect(-50, -50, 100, 100, Colors.RandomRgb());
                rect.x = 200 + Math.random() * 300;
                rect.y = 100 + Math.random() * 100;
                sprite.add(rect);
            }
            var background = new Canvas2d.DisplayObjects('background');
            background.rect(0, 0, source.width, source.height, 'black');
            background.alpha = 0;
            source.add(background);
            var sourcerect = new Canvas2d.DisplayObjects('sourcerect', false);
            sourcerect.rect(0, 0, 0, 0, null, 'black', 2);
            source.add(sourcerect);
            source.addEvent('dragstart', dragStart);
            source.addEvent('drag', drag);
            source.addEvent('dragstop', dragStop);
            destination.x = stage.width / 2;
            var description = new Canvas2d.DisplayObjects('description', false);
            description.text('Drag the Mouse and Draw a Rect', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
            description.x = 20;
            description.y = 20;
            source.add(description);
            stage.add(sprite);
            stage.add(destination);
            stage.add(source);
            stage.draw();
            function dragStart(e) {
                x1 = e.mouse.x;
                y1 = e.mouse.y;
                sourcerect.x = x1;
                sourcerect.y = y1;
            }
            function drag(e) {
                sourcerect.width = e.mouse.x - x1;
                sourcerect.height = e.mouse.y - y1;
                e.target.draw();
            }
            function dragStop(e) {
                x2 = e.mouse.x;
                y2 = e.mouse.y;
                crop = {dx: Math.min(x1, x2), dy: Math.min(y1, y2), dw: Math.max(x1, x2) - Math.min(x1, x2), dh: Math.max(y1, y2) - Math.min(y1, y2)};
                sourceimage = stage.getDataURL('image/png', 8);
                placeImg(sourceimage, crop);
            }
            function placeImg(img, crop) {
                image.setCrop(crop);
                image.loadImage(img, null, onComplete, false);

            }
            function onComplete() {
                destination.draw();
                image.x = 10;
                image.y = stage.height / 2 - image.height / 2;
                destination.draw();
            }
        },
        resize: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h, false);
            var sprite = new Canvas2d.Sprite('main');
            var disable = new Canvas2d.DisplayObjects('disable');
            disable.text('Disable', 0, 0, 'normal', 22, 'Helvetica', 'black', null, 'start', 'top');
            disable.x = 20;
            disable.y = 70;
            var label = disable.clone('label');
            label.align = 'center';
            label.txt = 'All the Event Listeners of Stage are Disabled';
            label.x = stage.width / 2;
            label.y = stage.height / 2;
            disable.addEvent('click', endisAble);
            disable.addEvent('mouseover', mOver);
            disable.addEvent('mouseout', mOut);
            sprite.add(disable);
            sprite.add(label);
            stage.add(sprite);

            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.color = 'lightsteelblue';
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.color = 'black';
                e.target.parent.draw();
            }
            function endisAble(e) {

            }
        }
    },
    Sprite: {
        examples: {
            dragDrop: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var row = 0;
                var col = 0;
                for (var i = 0; i < 20; i++) {
                    var rect = new Canvas2d.DisplayObjects('rect_0');
                    rect.rect(0, 0, 50, 50, 'lightseagreen', 'lightblue', 4);
                    rect.x = 50 * row + (row * rect.width) + 50;
                    rect.y = 20 * col + (col * rect.height) + 20;
                    row++;
                    if (row === 5) {
                        row = 0;
                        col++;
                    }
                    rect.addEvent('dragstart', dStart);
                    rect.addEvent('drag', dDrag);
                    rect.addEvent('dragstop', dStop);
                    rect.addEvent('mouseover', mOver);
                    rect.addEvent('mouseout', mOut);
                    sprite.add(rect);
                }
                function dStart(e) {
                    e.target.zOrder('top');
                    e.target.lineWidth = 8;
                    e.target.parent.draw();
                }
                function dDrag(e) {
                    e.target.x = e.mouse.ox;
                    e.target.y = e.mouse.oy;
                    e.target.parent.draw();
                }
                function dStop(e) {
                    e.target.lineWidth = 4;
                    e.target.parent.draw();
                }
                function mOver() {
                    stage.container.style.cursor = 'pointer';
                }
                function mOut() {
                    stage.container.style.cursor = 'default';
                }
                stage.add(sprite);
                stage.draw();
            },
            events: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var label = new Canvas2d.DisplayObjects('label_0');
                label.text('', 0, 0, 'normal', 14, 'Helvetica',
                        'black', null, 'start', 'middle');
                var labelg = new Canvas2d.DisplayObjects('label_0');
                labelg.text('Global Coord', 0, -1, 'normal', 16, 'Tahoma',
                        'gray', null, 'start', 'top');
                var row = 0;
                var col = 0;
                for (var i = 0; i < 20; i++) {
                    var rect = new Canvas2d.DisplayObjects('rect_0');
                    rect.rect(0, 0, 50, 50, 'lightseagreen', 'lightblue', 4);
                    rect.x = 50 * row + (row * rect.width) + 50;
                    rect.y = 20 * col + (col * rect.height) + 20;
                    row++;
                    if (row === 5) {
                        row = 0;
                        col++;
                    }
                    rect.addEvent('mousedown', mDown);
                    rect.addEvent('mouseup', mUp);
                    rect.addEvent('click', clicked);
                    rect.addEvent('mouseover', mOver);
                    rect.addEvent('mouseout', mOut);
                    rect.addEvent('mousemove', mMove);
                    sprite.add(rect);
                }
                function provastart(e) {
                    e.target.lineWidth = 8;
                    e.target.parent.draw();
                }
                function provaend(e) {
                    e.target.lineWidth = 4;
                    e.target.parent.draw();
                }
                function provamove(e) {
                    labelg.txt = 'Global Coord x: ' + (e.mouse.x).toString() +
                            ' y: ' + (e.mouse.y).toString();
                    label.txt = 'Local Coord x: ' +
                            Math.round(e.mouse.ox - e.target.x).toString() +
                            ' y: ' + Math.round(e.mouse.oy - e.target.y).toString();
                    label.x = e.target.x + e.target.width / 2 - label.width / 2;
                    label.y = e.target.y + e.target.height + 8;
                    sprite.draw();
                }
                function mDown(e) {
                    e.target.lineWidth = 8;
                    e.target.parent.draw();
                }
                function mUp(e) {
                    e.target.lineWidth = 4;
                    e.target.parent.draw();
                }
                function clicked(e) {
                    var color = e.target.getColor('name') === 'lightseagreen' ?
                            'deepskyblue' : 'lightseagreen';
                    e.target.color = color;
                    e.target.parent.draw();
                }
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                }
                function mMove(e) {
                    labelg.txt = 'Global Coord x: ' + (e.mouse.x).toString() +
                            ' y: ' + (e.mouse.y).toString();
                    label.txt = 'Local Coord x: ' +
                            Math.round(e.mouse.ox - e.target.x).toString() +
                            ' y: ' + Math.round(e.mouse.oy - e.target.y).toString();
                    label.x = e.target.x + e.target.width / 2 - label.width / 2;
                    label.y = e.target.y + e.target.height + 8;
                    sprite.draw();
                }
                sprite.add(labelg);
                sprite.add(label);
                stage.add(sprite);
                stage.draw();
            }
        }
    },
    DisplayObjects: {
        examples: {
            mask: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var shapes = new Canvas2d.Sprite('shapes_container');
                var mask = new Canvas2d.DisplayObjects('circle');
                var rect = new Canvas2d.DisplayObjects('rect');
                var element, sprite, stepw = 0, steph = 0;
                mask.circle(0, 0, 100, 0, Math.PI * 2);
                mask.x = 150;
                mask.y = 100;
                mask.mask = true;
                rect.rect(0, 0, 100, 100, Colors.RandomRgb());
                for (var i = 0; i < 6; i++) {
                    element = rect.clone('rect' + i);
                    element.color = Colors.RandomRgb();
                    element.x = (rect.width * stepw);
                    element.y = (rect.height * steph);
                    element.alpha = 0.5;
                    shapes.add(element);
                    stepw++;
                    stepw = stepw === 3 ? 0 : stepw;
                    steph = i === 2 ? 1 : steph;
                }
                stage.add(shapes);
                sprite = shapes.clone('mask_shapes');
                sprite.y = stage.height / 4;
                sprite.x = 100;
                shapes.y = sprite.y;
                shapes.x = stage.width / 1.5;
                sprite.add(mask);
                mask.zOrder('bottom');
                stage.add(sprite);
                stage.draw();

            },
            shadow: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var rectFill = new Canvas2d.DisplayObjects();
                var rectLine = new Canvas2d.DisplayObjects();
                var circFill = new Canvas2d.DisplayObjects();
                var circLine = new Canvas2d.DisplayObjects();
                var rectFillLine = new Canvas2d.DisplayObjects();
                rectFill.rect(-50, -50, 100, 100, 'lightblue');
                rectLine.rect(-50, -50, 100, 100, null, 'lightblue', 4);
                circFill.circle(0, 0, 50, 0, Math.PI * 2, 'lightseagreen');
                circLine.circle(0, 0, 50, 0, Math.PI * 2, null, 'lightseagreen', 4);
                rectFill.shadow = circFill.shadow = {'color': 'grey', 'offsetX': 10, 'offsetY': 10, 'blur': 10};
                rectLine.lineShadow = circLine.lineShadow = {'color': 'grey', 'offsetX': 10, 'offsetY': 10, 'blur': 10};
                rectFillLine.rect(-50, -50, 100, 100, 'lightseagreen', 'lightblue', 4);
                rectFillLine.shadow = {'color': 'dimgray', 'offsetX': 10, 'offsetY': 10, 'blur': 10};
                rectFillLine.lineShadow = {'color': 'grey', 'offsetX': 10, 'offsetY': 10, 'blur': 10};
                sprite.add(rectFillLine);
                sprite.add(rectFill);
                sprite.add(rectLine);
                sprite.add(circFill);
                sprite.add(circLine);
                for (var i = 0; i < sprite.children.length; i++) {
                    sprite.children[i].x = ((stage.width / sprite.children.length) * i) + 100;
                    sprite.children[i].y = stage.height / 2;
                }
                stage.add(sprite);
                stage.draw();
            },
            shadowAnim: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h), r, a;
                var sprite = new Canvas2d.Sprite('sprite_0', false);
                var circFill = new Canvas2d.DisplayObjects();
                circFill.circle(0, 0, 50, 0, Math.PI * 2, 'lightseagreen');
                circFill.shadow = {'color': 'grey', 'offsetX': 0, 'offsetY': 0, 'blur': 0};
                circFill.x = stage.width / 2;
                circFill.y = stage.height / 2;
                sprite.add(circFill);
                stage.add(sprite);
                stage.draw();
                stage.addEvent('mousemove', mMove);
                function mMove(e) {
                    r = Math.sqrt(Math.pow(e.mouse.y - circFill.y, 2) + Math.pow(e.mouse.x - circFill.x, 2));
                    a = Math.atan2(e.mouse.y - circFill.y, e.mouse.x - circFill.x);
                    circFill.shadow.offsetX = (Math.cos(a) * ((r / (stage.width / 2)) * 300));
                    circFill.shadow.offsetY = (Math.sin(a) * ((r / (stage.height / 2)) * 300));
                    circFill.shadow.blur = (r / (stage.width / 2)) * 80;
                    circFill.radius = Math.max(50, (r / (stage.width / 2)) * 200);
                    sprite.draw();
                }
            },
            gradient: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var w = 100, h = 100, rect;
                var gradObj_0 = {'color': ['blue', 'green'],
                    'offset': [0, 1],
                    'coord': {'x0': 0, 'y0': 0, 'x1': w, 'y1': 0}, 'type': 'linear'};
                var gradObj_1 = {'color': ['blue', 'green', 'red'],
                    'offset': [0, 0.5, 1],
                    'coord': {'x0': 0, 'y0': 0, 'x1': w, 'y1': 0}, 'type': 'linear'};
                var gradObj_2 = {'color': ['hsla(0,100%,50%,1)', 'hsla(0,100%,50%,0)'],
                    'offset': [0, 1],
                    'coord': {'x0': 0, 'y0': 0, 'x1': w, 'y1': 0}, 'type': 'linear'};
                var gradObj_3 = {'color': ['hsla(0,100%,50%,1)', 'hsla(0,100%,50%,0)',
                        'hsla(0,100%,50%,1)'],
                    'offset': [0, 0.5, 1],
                    'coord': {'x0': 0, 'y0': 0, 'x1': w, 'y1': 0}, 'type': 'linear'};
                var gradLinearArray = [gradObj_0, gradObj_1, gradObj_2, gradObj_3];
                for (var i = 0; i < gradLinearArray.length; i++) {
                    rect = new Canvas2d.DisplayObjects();
                    rect.rect(0, 0, w, h);
                    rect.gradient = gradLinearArray[i];
                    rect.x = 50 + (100 * i) + (20 * i);
                    rect.y = 50;
                    sprite.add(rect);
                }
                var gradObj_4 = {'color': ['blue', 'green'],
                    'offset': [0, 1],
                    'coord': {'x0': 0, 'y0': 0, 'r0': 0, 'x1': 0, 'y1': 0, 'r1': w},
                    'type': 'radial'};
                var gradObj_5 = {'color': ['blue', 'green', 'red'],
                    'offset': [0, 0.5, 1],
                    'coord': {'x0': 0, 'y0': 0, 'r0': 0, 'x1': 0, 'y1': 0, 'r1': w},
                    'type': 'radial'};
                var gradObj_6 = {'color': ['hsla(0,100%,50%,1)', 'hsla(0,100%,50%,0)'],
                    'offset': [0, 1],
                    'coord': {'x0': 0, 'y0': 0, 'r0': 0, 'x1': 0, 'y1': 0, 'r1': w},
                    'type': 'radial'};
                var gradObj_7 = {'color': ['hsla(0,100%,50%,1)', 'hsla(0,100%,50%,0)',
                        'hsla(0,100%,50%,1)'],
                    'offset': [0, 0.5, 1],
                    'coord': {'x0': 0, 'y0': 0, 'r0': 0, 'x1': 0, 'y1': 0, 'r1': w},
                    'type': 'radial'};
                var gradRadialArray = [gradObj_4, gradObj_5, gradObj_6, gradObj_7];
                for (var i = 0; i < gradRadialArray.length; i++) {
                    rect = new Canvas2d.DisplayObjects();
                    rect.rect(0, 0, w, h);
                    rect.gradient = gradRadialArray[i];
                    rect.x = 50 + (100 * i) + (20 * i);
                    rect.y = 170;
                    sprite.add(rect);
                }
                stage.add(sprite);
                stage.draw();
            },
            gradientChart: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var panel = new Canvas2d.Sprite('panel');
                var backPanel = new Canvas2d.Sprite('back_panel');
                var piker = new Canvas2d.Sprite('piker');
                var label, rect, arLabel = [], r = 100, limit, level, len = r * 2,
                        offx = stage.width - 40 - (r * 2), i = 0;
                arCoord = ['x0', 'y0', 'r0', 'x1', 'y1', 'r1'], rt = 2;
                var stopC = ['red', 'yellow', 'green', 'cyan', 'blue', 'purple'];
                var circle = new Canvas2d.DisplayObjects();
                var grdObj = {'color': ['red', 'purple'], 'offset': [0, 1],
                    'coord': {'x0': 0, 'y0': 0, 'r0': 0, 'x1': 0, 'y1': 0, 'r1': r},
                    'type': 'radial'};
                circle.rect(-(r * rt) / 2, -(r * rt) / 2, r * rt, r * rt);
                circle.x = offx / 2;
                circle.y = stage.height / 2;
                circle.gradient = grdObj;
                sprite.add(circle);
                var labList = ['Radial', 'Linear', 'Circle', 'Rectangle'];
                for (i = 0; i < 4; i++) {
                    label = new Canvas2d.DisplayObjects(labList[i]);
                    label.text(labList[i], 0, 0, 'normal', 16, 'Tahoma',
                            'black', null, 'start', 'bottom');
                    label.x = i === 0 || i === 2 ? offx / 2 - r : offx / 2 + r - label.width;
                    label.y = i < 2 ? stage.height - 20 : 40;
                    label.addEvent('click', changeType);
                    label.addEvent('mouseover', overHandler);
                    label.addEvent('mouseout', outHandler);
                    backPanel.add(label);
                }
                for (i = 0; i < 6; i++) {
                    var s = new Canvas2d.DisplayObjects(i.toString());
                    var slideObj = [{'moveTo': [-4, 3]}, {'quadraticCurveTo': [-4, 0, -1, 0]},
                        {'lineTo': [9, 0]}, {'quadraticCurveTo': [11, 1, 13, 2]},
                        {'lineTo': [16, 5]}, {'quadraticCurveTo': [17, 7, 16, 9]},
                        {'lineTo': [13, 12]}, {'quadraticCurveTo': [11, 13, 9, 14]},
                        {'lineTo': [-1, 14]}, {'quadraticCurveTo': [-4, 14, -4, 11]},
                        {'lineTo': [-4, 3]}];
                    s.shape(-2, -7, slideObj, 'lightsteelblue', 'grey', 2);
                    s.shadow = {'color': 'hsla(0,0%,0%,0.6)', 'blur': 8, 'offsetX': 2,
                        'offsetY': 2};
                    s.addEvent('drag', dragHandler);
                    s.addEvent('mouseover', overHandler);
                    s.addEvent('mouseout', outHandler);
                    var firstPos = i === 2 ? 0 : i === 5 ? r : r;
                    s.x = firstPos + offx;
                    s.y = 40 + (40 * i);
                    s.rotation = -Math.PI / 2;
                    panel.add(s);
                    rect = new Canvas2d.DisplayObjects();
                    rect.rect(0, -6, r * 2, 6, null, 'lightgrey', 2);
                    rect.x = offx;
                    rect.y = s.y;
                    rect.lineShadow = {'color': 'black', 'offsetX': 1,
                        'offsetY': 1, 'blur': 3};
                    backPanel.add(rect);
                    var nPos = i === 2 || i === 5 ? ['0', r.toString(),
                        (r * 2).toString()] : [('-' + r.toString()), '0', r.toString()];
                    for (var l = 0; l < nPos.length; l++) {
                        label = new Canvas2d.DisplayObjects();
                        label.text(nPos[l], 0, 0, 'lighter', 10, 'Tahoma',
                                'black', null, 'center', 'bottom');
                        label.x = offx + (r * l);
                        label.y = s.y - 18;
                        backPanel.add(label);
                    }
                    var n = i === 5 ? r : 0;
                    label = new Canvas2d.DisplayObjects(i.toString());
                    label.text(n.toString(), 0, -3, 'normal', 14, 'Tahoma',
                            'black', null, 'end', 'middle');
                    label.x = offx - 15;
                    label.y = s.y;
                    arLabel.push(label);
                    panel.add(label);
                    label = new Canvas2d.DisplayObjects(i.toString());
                    label.text(arCoord[i], 0, -3, 'normal', 14, 'Tahoma',
                            'rgb(69,116,158)', null, 'center', 'middle');
                    label.x = stage.width - 20;
                    label.y = s.y;
                    panel.add(label);
                    rect = new Canvas2d.DisplayObjects();
                    rect.rect(0, 0, r / 4, 25, stopC[i], 'lightgrey', 2);
                    rect.x = offx + (rect.width * i) + ((((r * 2) - (rect.width * 6)) / 5) * i);
                    rect.y = (40 * 6) + 20;
                    rect.addEvent('mousedown', addStopDw);
                    rect.addEvent('mouseup', addStopUp);
                    rect.addEvent('mouseover', overHandler);
                    rect.addEvent('mouseout', outHandler);
                    piker.add(rect);
                }
                stage.add(sprite);
                stage.add(backPanel);
                stage.add(panel);
                stage.add(piker);
                stage.draw();


                function dragHandler(e) {
                    limit = e.mouse.x - offx;
                    level = e.mouse.x;
                    if (limit >= 0 && limit <= len) {
                        level = e.mouse.x;
                    } else {
                        if (limit <= 0) {
                            level = offx;
                        } else {
                            level = offx + len;
                        }
                    }
                    e.target.x = level;
                    panel.draw();
                    limit = limit < 0 ? 0 : limit > len ? len : limit;
                    var circ = grdObj.coord;
                    switch (e.target.name) {
                        case '0':
                            circ.x0 = limit - r;
                            arLabel[parseInt(e.target.name)].txt = (circ.x0).toString();
                            break;
                        case '1':
                            circ.y0 = limit - r;
                            arLabel[parseInt(e.target.name)].txt = (circ.y0).toString();
                            break;
                        case '2':
                            circ.r0 = limit;
                            arLabel[parseInt(e.target.name)].txt = (circ.r0).toString();
                            break;
                        case '3':
                            circ.x1 = limit - r;
                            arLabel[parseInt(e.target.name)].txt = (circ.x1).toString();
                            break;
                        case '4':
                            circ.y1 = limit - r;
                            arLabel[parseInt(e.target.name)].txt = (circ.y1).toString();
                            break;
                        case '5':
                            circ.r1 = limit;
                            arLabel[parseInt(e.target.name)].txt = (circ.r1).toString();
                            break;
                        default :
                            break;
                    }
                    sprite.draw();
                }
                function addStopDw(e) {
                    var obj = circle.gradient, i, u;
                    if (!e.target.selected) {
                        obj.color.push(e.target.color);
                        obj.offset.push(1);
                        for (i = 0; i < obj.offset.length; i++) {
                            obj.offset[i] = i / (obj.offset.length - 1);
                        }
                        e.target.lineColor = 'black';
                        e.target.selected = true;
                    } else {
                        for (i = 0; i < obj.color.length; i++) {
                            if (e.target.color === obj.color[i]) {
                                u = i;
                                e.target.selected = false;
                                break;
                            }
                        }
                        obj.color.splice(u, 1);
                        obj.offset.splice(u, 1);
                        for (i = 0; i < obj.offset.length; i++) {
                            obj.offset[i] = i / (obj.offset.length - 1);
                        }
                        e.target.lineColor = 'lightgrey';
                    }
                    sprite.draw();
                    e.target.lineWidth = 5;
                    piker.draw();
                }
                function addStopUp(e) {
                    e.target.lineWidth = 2;
                    piker.draw();
                }
                function changeType(e) {
                    switch (e.target.name) {
                        case 'Linear':
                            grdObj.type = 'linear';
                            break;
                        case 'Radial':
                            grdObj.type = 'radial';
                            break;
                        case 'Circle':
                            circle.circle(0, 0, r, 0, Math.PI * 2);
                            circle.x = offx / 2;
                            circle.y = stage.height / 2;
                            circle.gradient = grdObj;
                            break;
                        case 'Rectangle':
                            circle.rect(-(r * rt) / 2, -(r * rt) / 2, r * rt, r * rt);
                            circle.x = offx / 2;
                            circle.y = stage.height / 2;
                            circle.gradient = grdObj;
                            break;
                        default:
                            break;
                    }
                    sprite.draw();
                }
                function overHandler() {
                    stage.container.style.cursor = 'pointer';
                }
                function outHandler() {
                    stage.container.style.cursor = 'default';
                }
            }
        },
        text: {
            textAlignment: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h, false);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var back = new Canvas2d.Sprite('back');
                var lineO = new Canvas2d.DisplayObjects('line_orizzontal');
                lineO.line(0, 0, 0, 0, stage.width, 0, 'lightblue', 1);
                lineO.y = stage.height / 2.5;
                var lineV = new Canvas2d.DisplayObjects('line_vertical');
                lineV.line(0, 0, 0, 0, 0, stage.height, 'lightseagreen', 1);
                lineV.x = stage.width - (stage.width / 4);
                var vertical = ['start', 'end', 'left', 'right', 'center'];
                var orizzontal = ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom'];
                var type = ['normal', 'italic', 'bold', 'bold italic', 'oblique'];
                var gap = stage.width / 8, size = 24;
                for (var i = 0; i < orizzontal.length; i++) {
                    var label = new Canvas2d.DisplayObjects('label_0');
                    label.text(orizzontal[i], 0, 0, 'normal', size, 'Verdana', 'black', null, 'start', orizzontal[i]);
                    label.x = gap;
                    gap += label.width + 10;
                    label.y = lineO.y;
                    sprite.add(label);
                }
                for (i = 0; i < vertical.length; i++) {
                    label = new Canvas2d.DisplayObjects('label_0');
                    label.text(vertical[i], 0, 0, 'normal', size, 'Verdana', 'black', null, vertical[i], 'hanging');
                    label.x = lineV.x;
                    label.y = lineO.y + (label.height * i) + 10;
                    sprite.add(label);
                }
                gap = 40;
                for (i = 0; i < type.length; i++) {
                    label = new Canvas2d.DisplayObjects('label_0');
                    label.text(type[i], 0, 0, type[i], size, 'Verdana', 'black', null, 'start', 'middle');
                    label.x = gap;
                    label.y = 20;
                    sprite.add(label);
                    label = new Canvas2d.DisplayObjects('label_0');
                    label.text(type[i], 0, 0, type[i], size, 'Verdana', null, null, 'start', 'middle');
                    label.lineColor = 'black';
                    label.x = gap;
                    gap += label.width + 10;
                    label.y = 60;
                    sprite.add(label);
                }

                back.add(lineO);
                back.add(lineV);
                stage.add(back);
                stage.add(sprite);
                stage.draw();
            },
            textTest: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('txt_container');
                var back = new Canvas2d.Sprite('misc_container', false);
                var align = ['left', 'right', 'center', 'start', 'end'];
                var baseLine = ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom'];
                var fontWeight = ['bold italic', 'normal', 'italic', 'bold', 'oblique', 'lighter'];
                var font = ['Verdana', 'Georgia', 'Times', 'Arial', 'Fantasy', 'Helvetica'];
                var prop, t, world, size = 18;
                var vertical = new Canvas2d.DisplayObjects('line_v');
                var orizontal = new Canvas2d.DisplayObjects('line_o');
                vertical.line(0, 0, 0, -100, 0, 100, 'lightseagreen', 2);
                orizontal.line(0, 0, -150, 0, 150, 0, 'lightseagreen', 2);
                vertical.x = orizontal.x = stage.width / 2;
                orizontal.y = vertical.y = stage.height / 2;
                back.add(vertical);
                back.add(orizontal);
                var label = new Canvas2d.DisplayObjects('display_prop');
                label.text('', 0, 0, 'lighter', size, font[0], 'black');
                label.paddingLeft = label.paddingTop = 5;
                setEvents(label);
                for (var i = 0; i < baseLine.length; i++) {
                    t = label.clone('baseLine_' + baseLine[i]);
                    t.txt = baseLine[i];
                    t.align = 'start';
                    t.x = 20;
                    t.y = (stage.height / 2) + (t.height * i) + 20 + (4 * i);
                    sprite.add(t);
                    t = label.clone('fontWeigth_' + fontWeight[i]);
                    t.txt = fontWeight[i];
                    t.align = 'start';
                    t.x = 20;
                    t.y = (20) + (t.height * i) + 20;
                    sprite.add(t);
                    t = label.clone('fontType_' + font[i]);
                    t.txt = font[i];
                    t.align = 'end';
                    t.baseLine = 'middle';
                    t.fontType = font[i];
                    t.x = stage.width - 20;
                    t.y = (t.height * i) + 20;
                    sprite.add(t);
                    if (i < baseLine.length - 1) {
                        t = label.clone('align_' + align[i]);
                        t.txt = align[i];
                        t.align = 'end';
                        t.x = stage.width - 20;
                        t.y = (stage.height / 2) + (t.height * i) + 20;
                        sprite.add(t);
                    }
                }
                t = new Canvas2d.DisplayObjects('fontSize_plus');
                t.text('Plus', 0, 0, 'normal', size, font[0], 'black', 'right', 'top');
                t.paddingLeft = label.paddingTop = 5;
                t.x = (stage.width / 2) - 50;
                t.y = stage.height - 20;
                sprite.add(t);
                t.addEvent('click', sClick);
                t.addEvent('mouseover', mOver);
                t.addEvent('mouseout', mOut);
                t = new Canvas2d.DisplayObjects('fontSize_minus');
                t.text('Minus', 0, 0, 'normal', size, font[0], 'black', 'left', 'top');
                t.paddingLeft = label.paddingTop = 5;
                t.x = (stage.width / 2) + 50;
                t.y = stage.height - 20;
                sprite.add(t);
                t.addEvent('click', sClick);
                t.addEvent('mouseover', mOver);
                t.addEvent('mouseout', mOut);
                label.enabledEvent = false;
                world = label.clone('helloworld');
                world.txt = 'Hello World';
                world.align = 'center';
                world.baseLine = 'middle';
                world.x = vertical.x;
                world.y = orizontal.y;
                sprite.add(world);
                label.txt = world.fontStyle + ' ' + world.align + ' ' + world.baseLine;
                label.align = 'center';
                label.x = stage.width / 2;
                label.y = 20;
                sprite.add(label);
                function setEvents(e) {
                    e.addEvent('click', click);
                    e.addEvent('mouseover', mOver);
                    e.addEvent('mouseout', mOut);
                }
                function click(e) {
                    prop = e.target.name.split('_');
                    world[prop[0]] = prop[1];
                    label.txt = world.fontWeigth + ' ' + world.fontSize + 'px ' + world.fontType + ' ' + world.align + ' ' + world.baseLine;
                    e.target.parent.draw();
                }
                function sClick(e) {
                    prop = e.target.name.split('_');
                    size += prop[1] === 'plus' ? 1 : -1;
                    size = size < 5 ? 5 : size;
                    world[prop[0]] = size;
                    label.txt = world.fontWeigth + ' ' + world.fontSize + 'px ' + world.fontType + ' ' + world.align + ' ' + world.baseLine;
                    e.target.parent.draw();
                }
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                    e.target.color = 'lightseagreen';
                    e.target.parent.draw();
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                    e.target.color = 'black';
                    e.target.parent.draw();
                }
                stage.add(back);
                stage.add(sprite);
                stage.draw();
            }
        },
        line: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('sprite_0');
            var line = new Canvas2d.DisplayObjects('line_0');
            line.line(0, 0, 0, 0, 100, 0, 'lightseagreen', 4, 'butt', 'miter', 10);
            line.x = sprite.width / 2 - line.width / 2;
            line.y = sprite.height / 2 - line.height / 2;
            sprite.add(line);
            stage.add(sprite);
            stage.draw();
        },
        rect: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('sprite_0');
            var rect = new Canvas2d.DisplayObjects('rect_0');
            rect.rect(0, 0, 100, 100, 'lightseagreen', 'lightblue', 4);
            rect.x = stage.width / 2 - rect.width / 2;
            rect.y = stage.height / 2 - rect.height / 2;
            sprite.add(rect);
            stage.add(sprite);
            stage.draw();
        },
        rectRound: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('sprite_0');
            var rectr = new Canvas2d.DisplayObjects('rect_0');
            rectr.rectRound(0, 0, 100, 100, 10, 'lightseagreen', 'lightblue', 4);
            rectr.x = stage.width / 2 - rectr.width / 2;
            rectr.y = stage.height / 2 - rectr.height / 2;
            sprite.add(rectr);
            stage.add(sprite);
            stage.draw();
        },
        circle: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('sprite_0');
            var circle = new Canvas2d.DisplayObjects('circ_0');
            var circle2 = new Canvas2d.DisplayObjects('circ_2');
            circle.circle(0, 0, 50, 0, Math.PI * 2, 'lightseagreen', 'lightblue', 4);
            circle2.circle(0, 0, 50, Math.PI, Math.PI * 2, 'lightseagreen', 'lightblue', 4);
            circle.x = sprite.width / 3;
            circle2.x = (sprite.width / 3) * 2;
            circle.y = circle2.y = sprite.height / 2;
            sprite.add(circle);
            sprite.add(circle2);
            stage.add(sprite);
            stage.draw();
        },
        polygon: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('sprite_0');
            var poly = new Canvas2d.DisplayObjects('poly_0');
            var points = [[50, 0], [100, 100], [0, 100], [50, 0]];
            poly.polygon(0, 0, points, 'lightseagreen', 'lightblue', 4);
            poly.x = stage.width / 2 - poly.width / 2;
            poly.y = stage.height / 2 - poly.height / 2;
            sprite.add(poly);
            stage.add(sprite);
            stage.draw();
        },
        shape: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('sprite_0');
            var shape = new Canvas2d.DisplayObjects('shape_0');
            var obj = [{'moveTo': [50, 0]}, {'quadraticCurveTo': [50, 50, 100, 100]}, {'quadraticCurveTo': [50, 50, 0, 100]}, {'quadraticCurveTo': [50, 50, 50, 0]}];
            shape.shape(0, 0, obj, 'lightseagreen', 'lightblue', 4);
            shape.x = stage.width / 2 - shape.width / 2;
            shape.y = stage.height / 2 - shape.height / 2;
            sprite.add(shape);
            stage.add(sprite);
            stage.draw();
        },
        img: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('sprite_0');
            var label = new Canvas2d.DisplayObjects('label_0');
            label.text('... ', 0, 0, 'bold', 18, 'Tahoma', 'white', {'color': 'black'}, 'start', 'hanging');
            label.x = label.y = 10;
            var img = new Canvas2d.DisplayObjects('img_0');
            img.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'http://www.somethinglikethis.it/img/hosted/zoom2.jpg', false, 'silver', 4, 4);
            sprite.add(img);
            sprite.add(label);
            stage.add(sprite);
            img.loadImage(null, progress, complete, false);
            function progress() {
                label.txt = '... in progresso';
                label.parent.draw();
            }
            function complete() {
                label.txt = '... completo';
                img.x = stage.width / 2 - img.width / 2;
                img.y = stage.height / 2 - img.height / 2;
                label.parent.draw();
            }
            stage.draw();
        },
        clip: {
            clipAnimation: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var anim = new Canvas2d.Sprite('anim');
                var obj = [], cuty = 0, cutx = 0;
                var label = new Canvas2d.DisplayObjects('label_0');
                label.text('Press Left - Right to move the figure.', 0, 0, 'normal', 16, 'Tahoma', 'gray', null, 'start', 'top');
                label.x = label.y = 25;
                sprite.add(label);
                var labelLeft = new Canvas2d.DisplayObjects('left');
                labelLeft.text('Left', 0, 0, 'normal', 16, 'Tahoma', 'gray', null, 'start', 'top');
                labelLeft.x = stage.width / 2 - 120;
                labelLeft.y = stage.height - 30;
                labelLeft.addEvent('mouseover', mOver);
                labelLeft.addEvent('mouseout', mOut);
                labelLeft.addEvent('mousedown', mDown);
                labelLeft.addEvent('mouseup', mUp);
                sprite.add(labelLeft);
                var labelRight = new Canvas2d.DisplayObjects('right');
                labelRight.text('Right', 0, 0, 'normal', 16, 'Tahoma', 'gray', null, 'end', 'top');
                labelRight.x = stage.width / 2 + 120;
                labelRight.y = stage.height - 30;
                labelRight.addEvent('mouseover', mOver);
                labelRight.addEvent('mouseout', mOut);
                labelRight.addEvent('mousedown', mDown);
                labelRight.addEvent('mouseup', mUp);
                labelRight.paddingLeft = labelLeft.paddingLeft = 15;
                labelRight.paddingTop = labelLeft.paddingTop = 14;
                sprite.add(labelRight);
                for (var i = 0; i < 20; i++) {
                    if (i === 10) {
                        cuty = 100;
                        cutx = 0;
                    }
                    obj.push({'x': 0, 'y': 0, 'map': {'x': 63 * cutx, 'y': cuty, 'width': 63, 'height': 100}});
                    cutx++;
                }
                obj.reverse();
                var clip = new Canvas2d.DisplayObjects('clip_0');
                clip.clip(0, 0, params[0] ? 'img/walk.png' : 'http://www.somethinglikethis.it/img/hosted/walk.png', obj, false);
                clip.loadImage(null, prog, onComplete, false);
                anim.add(clip);
                stage.add(anim);
                stage.add(sprite);
                function prog(e) {

                }
                function onComplete() {
                    clip.x = stage.width / 2 - clip.width / 2;
                    clip.y = stage.height / 2 - clip.height / 2;
                    stage.draw();
                    window.onkeydown = walk;
                }
                var left = 9;
                var right = 0;
                function walk(e) {
                    stepUp(e.keyCode);
                }
                function stepUp(e) {
                    switch (e) {
                        case 39:
                            right++;
                            if (right > 9) {
                                right = 0;
                            }
                            clip.currentFrame = right;
                            if (clip.x + clip.width < stage.width) {
                                clip.x += 5;
                            }
                            anim.draw();
                            break;
                        case 37:
                            left++;
                            if (left > 19) {
                                left = 10;
                            }
                            clip.currentFrame = left;
                            if (clip.x > 1) {
                                clip.x -= 5;
                            }
                            anim.draw();
                            break;
                        default:
                            break;
                    }
                }
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                    e.target.backGround = {'color': 'lightblue'};
                    sprite.draw();
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                    e.target.backGround = null;
                    sprite.draw();
                }
                function mDown(e) {
                    e.target.backGround = {'color': 'lightblue'};
                    sprite.draw();
                    var frame = e.target.name === 'left' ? 37 : 39;
                    stepUp(frame);
                }
                function mUp(e) {
                    e.target.backGround = null;
                    sprite.draw();
                }
            },
            clipTest: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var anim = new Canvas2d.Sprite('sprite_0');
                var imageToClip = new Canvas2d.Sprite('sprite_0');
                var obj = [], cuty = 0, cutx = 0;
                for (var i = 0; i < 20; i++) {
                    if (i === 10) {
                        cuty = 100;
                        cutx = 0;
                    }
                    obj.push({'x': 0, 'y': 0, 'map': {'x': 63 * cutx, 'y': cuty, 'width': 63, 'height': 100}});
                    cutx++;
                }
                obj.reverse();
                var clip = new Canvas2d.DisplayObjects('clip_0');
                clip.clip(0, 0, 'img/walk.png', obj, false, false);
                clip.loadImage(null, null, onComplete, false);
                //Image Sample
                var img = new Canvas2d.DisplayObjects('img_sample');
                img.img(0, 0, null, false, null, 5, 5);
                //Clipping Image Sample
                var rect = new Canvas2d.DisplayObjects();
                rect.rect(0, 0, 63, 100, null, 'red', 2);
                imageToClip.add(img);
                imageToClip.add(rect);
                anim.add(clip);
                stage.add(anim);
                stage.add(imageToClip);
                function onComplete() {
                    clip.x = stage.width / 2 - clip.width / 2;
                    clip.y = 40;
                    img.loadImage(clip.image, null, onCompleteImg, false);
                    anim.draw();

                }
                function onCompleteImg() {
                    rect.x = clip.frameList[0].map.x + img.paddingLeft;
                    rect.y = clip.frameList[0].map.y + img.paddingTop;
                    clipHolder();
                    imageToClip.scaleX = imageToClip.scaleY = 0.6;
                    imageToClip.x = (stage.width / 2) - ((img.width / 2) * 0.6);
                    imageToClip.y = (stage.height) - ((img.height + 20) * 0.6);
                    imageToClip.draw();
                    window.onkeydown = walk;
                }
                function clipHolder() {
                    for (var i = 0; i < clip.frameList.length; i++) {
                        var r = new Canvas2d.DisplayObjects();
                        r.rect(0, 0, clip.frameList[i].map.width, clip.frameList[i].map.height);
                        r.x = clip.frameList[i].map.x + img.paddingLeft;
                        r.y = clip.frameList[i].map.y + img.paddingTop;
                        r.data = {'direction': i < 10 ? 'right' : 'left', 'cFrame': i};
                        r.addEvent('mouseover', mOver);
                        r.addEvent('mouseout', mOut);
                        r.addEvent('mousemove', mMove);
                        imageToClip.add(r);
                    }
                }
                var left = 9;
                var right = 0;
                function walk(e) {
                    stepUp(e.keyCode);
                }
                function stepUp(e) {
                    switch (e) {
                        case 39:
                            right++;
                            if (right > 9) {
                                right = 0;
                            }
                            clip.currentFrame = right;
                            rect.x = clip.frameList[right].map.x + img.paddingLeft;
                            rect.y = clip.frameList[right].map.y + img.paddingTop;
                            if (clip.x + clip.width < stage.width) {
                                clip.x += 5;
                            }
                            stage.draw();
                            break;
                        case 37:
                            left++;
                            if (left > 19) {
                                left = 10;
                            }
                            clip.currentFrame = left;
                            rect.x = clip.frameList[left].map.x + img.paddingLeft;
                            rect.y = clip.frameList[left].map.y + img.paddingTop;
                            if (clip.x > 1) {
                                clip.x -= 5;
                            }
                            stage.draw();
                            break;
                        default:
                            break;
                    }
                }
                function mOver() {
                    stage.container.style.cursor = 'pointer';
                }
                function mOut() {
                    stage.container.style.cursor = 'default';
                }
                function mMove(e) {
                    left = e.target.data.direction === 'left' ? e.target.data.cFrame : left;
                    right = e.target.data.direction === 'right' ? e.target.data.cFrame : right;
                    clip.currentFrame = e.target.data.cFrame;
                    rect.x = clip.frameList[e.target.data.cFrame].map.x + img.paddingLeft;
                    rect.y = clip.frameList[e.target.data.cFrame].map.y + img.paddingTop;
                    stage.draw();
                }
            }
        },
        filter: {
            grayscale: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sp = new Canvas2d.Sprite();
                var bt = new Canvas2d.Sprite();

                var btn = new Canvas2d.DisplayObjects();
                btn.rectRound(-(140 / 4), -(30 / 4), 140, 30, 8, 'lightseagreen');
                bt.addEvent('mousedown', pixelated);
                var tx = new Canvas2d.DisplayObjects();
                tx.text('Non Grayscale', 0, 0, 'normal', 20, 'Calibri',
                        'whitesmoke', null, 'center', 'middle');
                bt.add(btn);
                bt.add(tx);
                bt.x = 90;
                bt.y = 35;

                var im = new Canvas2d.DisplayObjects();
                var crop = {dx: 250, dy: 250, dw: 300, dh: 250};
                im.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'http://www.somethinglikethis.it/img/hosted/zoom2.jpg', false, 'rgba(120,100,15,0.3)', 5, 5);
                im.x = 180;
                im.y = 20;
                im.loadImage(im.source, null, complete);
                function complete(e) {
                    e.setCrop(crop);
                    e.parent.draw();
                }
                sp.add(im);
                stage.add(sp);
                stage.add(bt);
                stage.draw();
                function pixelated(e) {
                    if (im.currentFilter === 'grayscale') {
                        im.restore();
                        tx.txt = 'Non Grayscale';
                    } else {
                        im.filter('grayscale');
                        tx.txt = 'Grayscale';
                    }
                    stage.draw();
                }
            },
            pixelated: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sp = new Canvas2d.Sprite();
                var bt = new Canvas2d.Sprite();

                var btn = new Canvas2d.DisplayObjects();
                btn.rectRound(-(140 / 4), -(30 / 4), 140, 30, 8, 'lightseagreen');
                bt.addEvent('mousedown', pixelated);
                var tx = new Canvas2d.DisplayObjects();
                tx.text('Non Pixelated', 0, 0, 'normal', 20, 'Calibri',
                        'whitesmoke', null, 'center', 'middle');
                bt.add(btn);
                bt.add(tx);
                bt.x = 90;
                bt.y = 35;

                var im = new Canvas2d.DisplayObjects();
                var crop = {dx: 250, dy: 250, dw: 300, dh: 250};
                im.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'http://www.somethinglikethis.it/img/hosted/zoom2.jpg', false, 'rgba(120,100,15,0.3)', 5, 5);
                im.x = 180;
                im.y = 20;
                im.loadImage(im.source, null, complete);
                function complete(e) {
                    e.setCrop(crop);
                    e.parent.draw();
                }
                sp.add(im);
                stage.add(sp);
                stage.add(bt);
                stage.draw();
                function pixelated(e) {
                    if (im.currentFilter === 'pixelated') {
                        im.restore();
                        tx.txt = 'Non Pixelated';
                    } else {
                        im.filter('pixelated', [12]);
                        tx.txt = 'Pixelated';
                    }
                    stage.draw();
                }
            },
            hsl: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sp = new Canvas2d.Sprite();
                var slide = new Canvas2d.Sprite();
                slide.x = slide.y = 10;

                var slideObj = [{'moveTo': [-4, 3]}, {'quadraticCurveTo': [-4, 0, -1, 0]},
                    {'lineTo': [9, 0]}, {'quadraticCurveTo': [11, 1, 13, 2]},
                    {'lineTo': [16, 5]}, {'quadraticCurveTo': [17, 7, 16, 9]},
                    {'lineTo': [13, 12]}, {'quadraticCurveTo': [11, 13, 9, 14]},
                    {'lineTo': [-1, 14]}, {'quadraticCurveTo': [-4, 14, -4, 11]},
                    {'lineTo': [-4, 3]}];

                var sl = new Canvas2d.DisplayObjects('h');
                sl.shape(-2, -7, slideObj, 'lightgrey', 'slategrey', 2);

                var sl2 = sl.clone('s');
                var sl3 = sl.clone('l');
                sl.x = 15;
                sl2.x = 45;
                sl3.x = 75;
                sl3.y = sl2.y = sl.y = 50;

                sl.addEvent('drag', onDragHandler);
                sl2.addEvent('drag', onDragHandler);
                sl3.addEvent('drag', onDragHandler);

                var lmax = 101, lmin = -1, rate = 50, h = 0, s = 0, l = 0;

                function onDragHandler(e) {
                    if (e.mouse.oy >= lmax) {
                        rate = 100;
                    } else if (e.mouse.oy <= lmin) {
                        rate = 0;
                    } else if (e.mouse.oy < lmax && e.target.y > lmin) {
                        rate = e.mouse.oy;
                    }
                    e.target.y = rate;
                    e.target.parent.draw();
                    switch (e.target.name) {
                        case 'h':
                            h = rate - 50;
                            break;
                        case 's':
                            s = rate - 50;
                            break;
                        case 'l':
                            l = rate - 50;
                            break;
                        default:
                            break;
                    }
                    im.filter('hsl', [h, s, l]);
                }
                var g = {color: ['red', 'yellow', 'green', 'rgb(0,255,255)', 'blue'],
                    offset: [0, 0.25, 0.5, 0.75, 1],
                    coord: {x0: 0, y0: 0, x1: 0, y1: 100}, type: 'linear'};
                var g1 = {color: ['gray', 'violet'],
                    offset: [0, 1], coord: {x0: 0, y0: 0, x1: 0, y1: 100}, type: 'linear'};
                var g2 = {color: ['black', 'white'],
                    offset: [0, 1], coord: {x0: 0, y0: 0, x1: 0, y1: 100}, type: 'linear'};
                var r = new Canvas2d.DisplayObjects();
                r.rect(0, 0, 5, 100, 'red');
                var r1 = r.clone();
                var r2 = r.clone();
                r.x = sl.x;
                r1.x = sl2.x;
                r2.x = sl3.x;
                r1.color = 'green';
                r2.color = 'blue';
                r.gradient = g;
                r1.gradient = g1;
                r2.gradient = g2;

                var im = new Canvas2d.DisplayObjects();
                var crop = {dx: 250, dy: 250, dw: 300, dh: 250};
                im.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'http://www.somethinglikethis.it/img/hosted/zoom2.jpg', false, 'rgba(120,100,15,0.3)', 5, 5);
                im.x = 150;
                im.y = 20;
                im.loadImage(im.source, null, complete);
                function complete(e) {
                    e.setCrop(crop);
                    e.parent.draw();
                }

                slide.add(r);
                slide.add(r1);
                slide.add(r2);
                slide.add(sl);
                slide.add(sl2);
                slide.add(sl3);
                sp.add(im);
                stage.add(sp);
                stage.add(slide);
                stage.draw();
            },
            invert: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sp = new Canvas2d.Sprite();
                var bt = new Canvas2d.Sprite();

                var btn = new Canvas2d.DisplayObjects();
                btn.rectRound(-(140 / 4), -(30 / 4), 140, 30, 8, 'lightseagreen');
                bt.addEvent('mousedown', pixelated);
                var tx = new Canvas2d.DisplayObjects();
                tx.text('Non Invert', 0, 0, 'normal', 20, 'Calibri',
                        'whitesmoke', null, 'center', 'middle');
                bt.add(btn);
                bt.add(tx);
                bt.x = 90;
                bt.y = 35;

                var im = new Canvas2d.DisplayObjects();
                var crop = {dx: 250, dy: 250, dw: 300, dh: 250};
                im.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'http://www.somethinglikethis.it/img/hosted/zoom2.jpg', false, 'rgba(120,100,15,0.3)', 5, 5);
                im.x = 180;
                im.y = 20;
                im.loadImage(im.source, null, complete);
                function complete(e) {
                    e.setCrop(crop);
                    e.parent.draw();
                }
                sp.add(im);
                stage.add(sp);
                stage.add(bt);
                stage.draw();
                function pixelated(e) {
                    if (im.currentFilter === 'invert') {
                        im.restore();
                        tx.txt = 'Non Invert';
                    } else {
                        im.filter('invert');
                        tx.txt = 'Invert';
                    }
                    stage.draw();
                }
            }
        },
        setCrop: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('main');
            var im = new Canvas2d.DisplayObjects('image');
            var crop = {dx: 100, dy: 50, dw: w - 200, dh: h - 100};
            im.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'http://www.somethinglikethis.it/img/hosted/zoom2.jpg', false);
            im.loadImage(im.source, null, complete);
            im.x = crop.dx;
            im.y = crop.dy;
            function complete(e) {
                e.parent.draw();
            }
            sprite.add(im);
            stage.add(sprite);
            stage.draw();
            stage.addEvent('mousemove', mMove);
            function mMove(e) {
                var x = e.mouse.x;
                x = x + crop.dw > im.image.width ? im.image.width - crop.dw - 1 : x;
                var y = e.mouse.y;
                y = y + crop.dh > im.image.height ? im.image.height - crop.dh - 1 : y;
                crop.dx = Math.min(e.mouse.x,im.width);
                crop.dy = Math.min(e.mouse.y,im.height);
                im.setCrop(crop);
                sprite.draw();
            }

        },
        cacheAsBitmap: function(c, w, h, params) {
            
        },
        loadImage: function(c, w, h, params) {
            
        }
    },
    Tweener: {
        examples: {
            ease: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var spriteLabel = new Canvas2d.Sprite('sprite_label');
                var tween = new Canvas2d.Tweener();
                var rect, label;
                var labList = ['easeInOutQuad', 'easeInOutExpo',
                    'easeInOutBounce', 'easeInOutElastic'];
                for (var i = 0; i < 4; i++) {
                    label = new Canvas2d.DisplayObjects(i.toString());
                    label.text(labList[i], 0, 0, 'normal', 16, 'Tahoma', 'black');
                    label.paddingLeft = label.paddingTop = 5;
                    label.x = stage.width - 70;
                    label.y = 50 + (label.height * i) + (50 * i);
                    label.left = false;
                    label.ease = labList[i];
                    label.addEvent('mouseover', mOver);
                    label.addEvent('mouseout', mOut);
                    label.addEvent('click', start);
                    spriteLabel.add(label);
                    rect = new Canvas2d.DisplayObjects();
                    rect.rect(-25, -25, 50, 50, 'lightseagreen', 'lightblue', 4);
                    rect.x = 40;
                    rect.y = label.y;
                    sprite.add(rect);
                }
                stage.add(sprite);
                stage.add(spriteLabel);
                stage.draw();
                function start(e) {
                    var child = sprite.children[parseInt(e.target.name)];
                    var x = e.target.left ? 40 : 390;
                    tween.addTweener(child, {
                        'x': x, 'duration': 2000, 'ease': e.target.ease});
                    e.target.left = e.target.left ? false : true;
                }
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                    e.target.backGround = {'color': 'lightgrey'};
                    e.target.color = 'ivory';
                    spriteLabel.draw();
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                    e.target.backGround = null;
                    e.target.color = 'black';
                    spriteLabel.draw();
                }
            },
            events: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var spriteLabel = new Canvas2d.Sprite('sprite_label');
                var tween = new Canvas2d.Tweener();
                var rect, label, labList = [], tweList = ['X', 'Y', 'Color',
                    'onStart', 'onTween', 'onEnd'];
                rect = new Canvas2d.DisplayObjects();
                rect.rect(-50, -50, 100, 100, 'lightseagreen', 'lightblue', 4);
                rect.x = stage.width / 2;
                rect.y = stage.height / 2;
                sprite.add(rect);
                for (var i = 0; i < tweList.length; i++) {
                    label = new Canvas2d.DisplayObjects(tweList[i]);
                    label.text(tweList[i], 0, 0, 'normal', 16, 'Tahoma',
                            'black', null, 'end', 'top');
                    label.paddingLeft = label.paddingTop = 5;
                    label.x = stage.width - 80;
                    label.y = 40 + (label.height * i) + (20 * i);
                    spriteLabel.add(label);
                    labList.push(label);
                    label = new Canvas2d.DisplayObjects(tweList[i]);
                    label.text('', 0, 0, 'normal', 16, 'Tahoma',
                            'black', null, 'start', 'top');
                    label.paddingLeft = label.paddingTop = 5;
                    spriteLabel.add(label);
                    labList.push(label);
                    if (i === 4 || i === 5) {
                        label.fontSize = 20;
                        label.txt = i === 4 ? 'Start' : 'Stop';
                        label.name = label.txt;
                        label.align = 'end';
                        label.x = i === 4 ? stage.width - 80 : stage.width - 30;
                        label.y = stage.height - 40;
                        label.addEvent('mouseover', mOver);
                        label.addEvent('mouseout', mOut);
                        var func = i === 4 ? start : stop;
                        label.addEvent('click', func);
                        continue;
                    }
                    label.x = stage.width - 60;
                    label.y = 40 + (label.height * i) + (20 * i);
                }
                stage.add(sprite);
                stage.add(spriteLabel);
                stage.draw();
                function start() {
                    tween.addTweener(rect, {
                        'x': 50 + Math.random() * 300,
                        'y': 50 + Math.random() * 200,
                        'color': Colors.RandomRgb(),
                        'onStart': onStart,
                        'onTween': onTween,
                        'onEnd': onEnd,
                        'duration': 2000,
                        'ease': 'easeInOutQuad'});
                }
                function onStart(e) {
                    tween.addTweener(labList[8], {'color': 'lightblue', 'duration': 500});
                    labList[6].color = 'red';
                    tween.addTweener(labList[6], {'color': 'black', 'duration': 700});
                    setLabels();
                }
                function onTween(e) {
                    setLabels();
                    spriteLabel.draw();
                }
                function onEnd(e) {
                    labList[8].color = 'black';
                    labList[10].color = 'green';
                    tween.addTweener(labList[10], {'color': 'black', 'duration': 700});
                    setLabels();
                    start();
                }
                function setLabels() {
                    labList[1].txt = Math.round(rect.x).toString();
                    labList[3].txt = Math.round(rect.y).toString();
                    labList[5].txt = '     ';
                    labList[5].backGround = {'color': rect.color};
                }
                function stop() {
                    tween.removeTweener(rect);
                }
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                    e.target.backGround = {'color': 'lightgrey'};
                    spriteLabel.draw();
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                    e.target.backGround = null;
                    spriteLabel.draw();
                }
            },
            delay: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var spriteLabel = new Canvas2d.Sprite('sprite_label');
                var tween = new Canvas2d.Tweener();
                var rect, label, rectList = [];
                var labList = ['Start', 'Delay 500ms', 'Delay 1000ms', 'Delay 1500ms'];
                for (var i = 0; i < 4; i++) {
                    label = new Canvas2d.DisplayObjects(i.toString());
                    label.text(labList[i], 0, 0, 'normal', 14, 'Tahoma',
                            'silver', null, 'center', 'middle');
                    label.paddingLeft = label.paddingTop = 5;
                    label.x = stage.width - 80;
                    label.y = 50 + (label.height * i) + (50 * i);
                    if (i === 0) {
                        label.align = 'start';
                        label.fontSize = 16;
                        label.color = 'black';
                        label.left = false;
                        label.addEvent('mouseover', mOver);
                        label.addEvent('mouseout', mOut);
                        label.addEvent('click', start);
                    }
                    spriteLabel.add(label);
                    rect = new Canvas2d.DisplayObjects();
                    rect.rect(-25, -25, 50, 50, 'lightseagreen', 'lightblue', 4);
                    rect.x = 40;
                    rect.y = label.y;
                    sprite.add(rect);
                    rectList.push(rect);
                }
                stage.add(sprite);
                stage.add(spriteLabel);
                stage.draw();
                function start(e) {
                    for (var i = 0; i < sprite.children.length; i++) {
                        tween.removeTweener(sprite.children[i]);
                        var x = e.target.left ? 40 : 400;
                        tween.addTweener(sprite.children[i], {
                            'x': x, 'duration': 2000, 'ease': 'easeInOutQuad',
                            'delay': (i * 500)
                        });
                    }
                    e.target.left = e.target.left ? false : true;
                }
                function mOver(e) {
                    stage.container.style.cursor = 'pointer';
                    e.target.backGround = {'color': 'lightgrey'};
                    e.target.color = 'ivory';
                    spriteLabel.draw();
                }
                function mOut(e) {
                    stage.container.style.cursor = 'default';
                    e.target.backGround = null;
                    e.target.color = 'black';
                    spriteLabel.draw();
                }
            },
            color4: function(c, w, h, params) {

            }
        },
        addTweener: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('sprite_0');
            var spriteLabel = new Canvas2d.Sprite('sprite_label');
            var tween = new Canvas2d.Tweener();
            var rect, label, tweList = ['Coordinates', 'Length',
                'Color', 'Rotation', 'Scale', 'Default'];
            rect = new Canvas2d.DisplayObjects();
            rect.rect(-50, -50, 100, 100, 'lightseagreen', 'lightblue', 4);
            rect.x = stage.width / 2;
            rect.y = stage.height / 2;
            sprite.add(rect);
            for (var i = 0; i < tweList.length; i++) {
                label = new Canvas2d.DisplayObjects(tweList[i]);
                label.text(tweList[i], 0, 0, 'normal', 16, 'Tahoma',
                        'black', null, 'start', 'top');
                label.paddingLeft = label.paddingTop = 5;
                label.x = stage.width - 120;
                label.y = 20 + (label.height * i) + (20 * i);
                label.addEvent('mouseover', mOver);
                label.addEvent('mouseout', mOut);
                label.addEvent('click', addTween);
                spriteLabel.add(label);
            }
            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.backGround = {'color': 'lightgrey'};
                e.target.color = 'ivory';
                spriteLabel.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.backGround = null;
                e.target.color = 'black';
                spriteLabel.draw();
            }
            function addTween(e) {
                switch (e.target.name) {
                    case tweList[0]:
                        tween.addTweener(rect, {
                            'x': Math.random() * (stage.width - rect.x),
                            'y': Math.random() * (stage.height - rect.y),
                            'duration': 1000, 'ease': 'easeNone'});
                        break;
                    case tweList[1]:
                        tween.addTweener(rect, {
                            'width': Math.random() * 300,
                            'height': Math.random() * 300,
                            'duration': 1000, 'ease': 'easeNone'});
                        break;
                    case tweList[2]:
                        tween.addTweener(rect, {
                            'color': Colors.RandomRgb(),
                            'duration': 1000, 'ease': 'easeNone'});
                        break;
                    case tweList[3]:
                        tween.addTweener(rect, {
                            'rotation': Math.random() * (Math.PI * 8),
                            'duration': 1000, 'ease': 'easeNone'});
                        break;
                    case tweList[4]:
                        var scale = Math.random() * 2;
                        tween.addTweener(rect, {
                            'scaleX': scale,
                            'scaleY': scale,
                            'duration': 1000, 'ease': 'easeNone'});
                        break;
                    case tweList[5]:
                        tween.removeTweener(rect);
                        rect.width = rect.height = 100;
                        rect.scaleX = rect.scaleY = 1;
                        rect.rotation = 0;
                        rect.color = 'lightseagreen';
                        rect.x = stage.width / 2;
                        rect.y = stage.height / 2;
                        sprite.draw();
                        break;
                    default:
                        break;
                }
            }
            stage.add(sprite);
            stage.add(spriteLabel);
            stage.draw();
        },
        removeTweener: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('sprite_0');
            var spriteLabel = new Canvas2d.Sprite('sprite_label');
            var tween = new Canvas2d.Tweener();
            var rect, label, tweList = ['Coordinates', 'Length',
                'Color', 'Rotation', 'Scale', 'Default'];
            rect = new Canvas2d.DisplayObjects();
            rect.rect(-50, -50, 100, 100, 'lightseagreen', 'lightblue', 4);
            rect.x = stage.width / 2;
            rect.y = stage.height / 2;
            sprite.add(rect);
            for (var i = 0; i < tweList.length; i++) {
                label = new Canvas2d.DisplayObjects(tweList[i]);
                label.text(tweList[i], 0, 0, 'normal', 16, 'Tahoma',
                        'black', null, 'start', 'top');
                label.paddingLeft = label.paddingTop = 5;
                label.x = stage.width - 120;
                label.y = 20 + (label.height * i) + (20 * i);
                label.addEvent('mouseover', mOver);
                label.addEvent('mouseout', mOut);
                label.addEvent('click', addTween);
                spriteLabel.add(label);
            }
            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.backGround = {'color': 'lightgrey'};
                e.target.color = 'ivory';
                spriteLabel.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.backGround = null;
                e.target.color = 'black';
                spriteLabel.draw();
            }
            function addTween(e) {
                switch (e.target.name) {
                    case tweList[0]:
                        tween.addTweener(rect, {
                            'x': Math.random() * (stage.width - rect.x),
                            'y': Math.random() * (stage.height - rect.y),
                            'duration': 1000, 'ease': 'easeNone'});
                        break;
                    case tweList[1]:
                        tween.addTweener(rect, {
                            'width': Math.random() * 300,
                            'height': Math.random() * 300,
                            'duration': 1000, 'ease': 'easeNone'});
                        break;
                    case tweList[2]:
                        tween.addTweener(rect, {
                            'color': Colors.RandomRgb(),
                            'duration': 1000, 'ease': 'easeNone'});
                        break;
                    case tweList[3]:
                        tween.addTweener(rect, {
                            'rotation': Math.random() * (Math.PI * 8),
                            'duration': 1000, 'ease': 'easeNone'});
                        break;
                    case tweList[4]:
                        var scale = Math.random() * 2;
                        tween.addTweener(rect, {
                            'scaleX': scale,
                            'scaleY': scale,
                            'duration': 1000, 'ease': 'easeNone'});
                        break;
                    case tweList[5]:
                        tween.removeTweener(rect);
                        rect.width = rect.height = 100;
                        rect.scaleX = rect.scaleY = 1;
                        rect.rotation = 0;
                        rect.color = 'lightseagreen';
                        rect.x = stage.width / 2;
                        rect.y = stage.height / 2;
                        sprite.draw();
                        break;
                    default:
                        break;
                }
            }
            stage.add(sprite);
            stage.add(spriteLabel);
            stage.draw();
        },
        ease: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('sprite_0');
            var spriteLabel = new Canvas2d.Sprite('sprite_label');
            var tween = new Canvas2d.Tweener();
            var grid, graph, rect, label, left, right = new Canvas2d.DisplayObjects('text_right'), x, ct = 0, color = 360 / 1000;
            right.text('Right', 0, 0, 'normal', 20, 'Helvetica', 'black', null, 'start', 'top');
            right.y = 30;
            right.x = 100;
            right.paddingLeft = right.paddingTop = 8;
            right.addEvent('mouseover', mOver);
            right.addEvent('mouseout', mOut);
            left = right.clone('text_left');
            left.txt = 'Left';
            left.x = 20;
            label = right.clone('text_label');
            label.txt = params[1];
            label.x = w - 250;
            right.addEvent('click', startStop);
            left.addEvent('click', startStop);
            grid = new Canvas2d.DisplayObjects('grid', false);
            grid.polygon(0, 0, [[0, 0], [w - 80, 0], [w - 80, h - 160], [0, h - 160]], null, 'lightgray', 2, true);
            grid.x = 40;
            grid.y = 80;
            grid.lineAlpha = 0.3;
            graph = new Canvas2d.DisplayObjects('graph', false);
            graph.polygon(0, 0, [[0, 0], [0, 0]], null, 'blue', 2, false);
            graph.x = 40;
            graph.y = h - 80;
            graph.lineAlpha = 0.5;
            rect = new Canvas2d.DisplayObjects('rect', false);
            rect.rect(0, 0, 50, 50, 'lightseagreen', 'lightblue', 4);
            rect.x = 10;
            rect.y = h / 2 - rect.height / 2;
            function startStop(e) {
                x = e.target.name === 'text_right' ? w - 10 - rect.width : 10;
                graph.points = [[0, 0], [0, 0]];
                ct = 0;
                tween.addTweener(rect, {x: x, duration: 1000, ease: params[1], onTween: loop});
            }
            function mOver(e) {
                if (e.target.name === 'text_label')
                    return;
                stage.container.style.cursor = 'pointer';
                e.target.backGround = {color: 'lightgray'};
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.backGround = null;
                e.target.parent.draw();
            }
            function loop(e) {
                graph.points.push([(w - 80) * (ct / 994), -tween[params[1]](ct, 0, h - 160, 994)]);
                graph.lineColor = 'hsl(' + (color * ct) + ',100%,50%)';
                ct += stage.getTimeInterval();
            }
            sprite.add(grid);
            sprite.add(graph);
            sprite.add(rect);
            spriteLabel.add(label);
            spriteLabel.add(left);
            spriteLabel.add(right);
            stage.add(sprite);
            stage.add(spriteLabel);
            stage.draw();
        }
    },
    Colors: {
        examples: {
            color: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var sprite = new Canvas2d.Sprite('sprite_0');
                var specContainer = new Canvas2d.Sprite('sprite_1');
                var piccolors = ['mintcream', 'rgb(216,191,216)',
                    [210, 180, 140], 'hsl(120,100%,50%)'];
                for (var i = 0; i < 4; i++) {
                    var pict = new Canvas2d.DisplayObjects();
                    pict.rect(0, 0, 50, 20, piccolors[i], 'silver', 4);
                    pict.lineAlpha = 0.6;
                    pict.x = 30;
                    pict.y = 20 + (20 * i) + (50 * i);
                    var hex, rgb, hsl, hsv, name, ar;
                    hex = pict.getColor('hex');
                    rgb = pict.getColor('rgb');
                    hsl = pict.getColor('hsl');
                    hsv = pict.getColor('hsv');
                    ;
                    name = pict.getColor('name');
                    ar = pict.getColor('array');
                    var colors = [hex, rgb, hsl, hsv, name, ar];
                    for (var l = 0; l < colors.length; l++) {
                        var label = new Canvas2d.DisplayObjects();
                        label.text(colors[l], 0, 0, 'normal', 10, 'Tahoma',
                                'black', null, 'start', 'bottom');
                        label.x = pict.x + pict.width + 18;
                        label.y = pict.y + (11 * l);
                        sprite.add(label);
                    }
                    sprite.add(pict);
                }
                for (i = 0; i < 360; i++) {
                    var spec = new Canvas2d.DisplayObjects();
                    var start = (Math.PI * 2) * (i / 360);
                    var end = (Math.PI * 2) * ((i + 1) / 360);
                    var rad = 80;
                    spec.polygon(0, 0, [[0, 0],
                        [(rad * Math.cos(start)), (rad * Math.sin(start))],
                        [(rad * Math.cos(end)), (rad * Math.sin(end))], [0, 0]],
                            'hsl(' + i + ',100%,50%)');
                    specContainer.add(spec);
                }
                specContainer.x = 460;
                specContainer.y = 90;
                ;
                stage.add(specContainer);
                stage.add(sprite);
                stage.draw();
            },
            color2: function(c, w, h, params) {
                var stage = new Canvas2d.Stage(c, w, h);
                var slider = new Canvas2d.Sprite('sprite_0');
                var mask = new Canvas2d.Sprite();
                var samples = new Canvas2d.Sprite();

                var colorTable = new Canvas2d.DisplayObjects();
                colorTable.rect(0, 0, 26, 180);
                colorTable.x = 120;
                colorTable.y = stage.height / 2 - colorTable.height / 2;

                var slideHandler = new Canvas2d.DisplayObjects();
                var slideObj = [{'moveTo': [-4, 3]}, {'quadraticCurveTo': [-4, 0, -1, 0]},
                    {'lineTo': [9, 0]}, {'quadraticCurveTo': [11, 1, 13, 2]},
                    {'lineTo': [16, 5]}, {'quadraticCurveTo': [17, 7, 16, 9]},
                    {'lineTo': [13, 12]}, {'quadraticCurveTo': [11, 13, 9, 14]},
                    {'lineTo': [-1, 14]}, {'quadraticCurveTo': [-4, 14, -4, 11]},
                    {'lineTo': [-4, 3]}];
                slideHandler.shape(-2, -7, slideObj, 'lightgrey', 'slategrey', 2);
                slideHandler.shadow = {'color': 'hsla(0,0%,0%,0.6)',
                    'blur': 8, 'offsetX': 4, 'offsetY': 4};
                slideHandler.addEvent('drag', onDragHandler);
                slideHandler.addEvent('mouseover', overHandler);
                slideHandler.addEvent('mouseout', outHandler);
                slideHandler.x = colorTable.x;
                slideHandler.y = colorTable.y;

                var pict = new Canvas2d.DisplayObjects();
                pict.rect(0, 0, 180, 180, 'hsl(0,100%,50%)', 'silver', 2);
                pict.x = colorTable.x + colorTable.width + 20;
                pict.y = colorTable.y;

                var pictCircle = new Canvas2d.DisplayObjects();
                pictCircle.circle(0, 0, 10, 0, Math.PI * 2, null, 'grey', 2);
                pictCircle.lineShadow = {'color': 'hsla(0,0%,0%,0.6)',
                    'blur': 4, 'offsetX': 2, 'offsetY': 3};
                pictCircle.x = pict.x + pict.width / 2;
                pictCircle.y = pict.y + pict.height;
                pictCircle.addEvent('mouseover', overHandler);
                pictCircle.addEvent('mouseout', outHandler);
                pictCircle.addEvent('drag', dDrag);

                var sample = new Canvas2d.DisplayObjects();
                sample.rect(0, 0, 50, 50, 'hsl(0,100%,50%)', 'silver', 2);
                sample.x = pict.x + pict.width + 20;
                sample.y = pict.y + pict.width - sample.height;

                var black = new Canvas2d.DisplayObjects();
                black.rect(0, 0, 180, 180);
                black.x = pict.x;
                black.y = pict.y;
                black.gradient = {'color': ['rgba(0,0,0,0.9)', 'rgba(128,128,128,0.25)',
                        'rgba(128,128,128,0)', 'rgba(128,128,128,0.2)',
                        'rgba(255,255,255,0.9)'],
                    'offset': [0, 0.38, 0.5, 0.62, 1], 'type': 'linear',
                    'coord': {'x0': 0, 'y0': 0, 'x1': 180, 'y1': 0}};

                var white = new Canvas2d.DisplayObjects();
                white.rect(0, 0, 180, 180);
                white.x = pict.x;
                white.y = pict.y;
                white.gradient = {'color': ['rgba(128,128,128,1)',
                        'rgba(128,128,128,0)'],
                    'offset': [0, 1], 'type': 'linear',
                    'coord': {'x0': 0, 'y0': 0, 'x1': 0, 'y1': 180}};

                var colStop = [];
                var offsetStop = [];
                for (var i = 0; i < 12; i++) {
                    o = (1 * (i / 12));
                    c = 'hsl(' + ((i / 12) * 360) + ',100%,50%)';
                    colStop.push(c);
                    offsetStop.push(o);
                }
                colorTable.gradient = {'color': colStop, 'offset': offsetStop,
                    'type': 'linear', 'coord': {'x0': 0, 'y0': 0, 'x1': 0, 'y1': 180}};

                var labels = [];
                var labList = ['H 0°', 'S 100%', 'L 50%', 'R 255', 'G 0', 'B 0'];
                for (i = 0; i < labList.length; i++) {
                    var lab = new Canvas2d.DisplayObjects();
                    lab.text(labList[i], 0, 0, 'bold', 16, 'Tahoma',
                            [180, 180, 180], null, 'start', 'hanging');
                    lab.x = pict.x + pict.width + 20;
                    lab.y = i === 3 ? pict.y + (lab.height * i) + (2 * i) + 10 : i > 3 ? pict.y +
                            (lab.height * i) + (2 * i) + 10 : pict.y + (lab.height * i) + (2 * i);
                    labels.push(lab);
                    samples.add(lab);
                }

                slider.add(slideHandler);
                slider.add(pictCircle);

                mask.add(colorTable);
                mask.add(white);
                mask.add(black);

                samples.add(sample);
                samples.add(pict);

                stage.add(samples);
                stage.add(mask);
                stage.add(slider);
                stage.draw();

                var getHue = 0, getSat = 100, getLight = 50, rgb, limitX = 0,
                        limitY = 0, levelX = 0, levelY = 0;

                function setLabels(h, s, l) {
                    pict.color = 'hsl(' + h + ',100%,50%)';
                    rgb = Colors.HslToRgb(h / 360, s / 100, l / 100);
                    labels[0].txt = 'H ' + Math.round(h).toString() + '°';
                    labels[1].txt = 'S ' + Math.round(s).toString() + '%';
                    labels[2].txt = 'L ' + Math.round(l).toString() + '%';
                    labels[3].txt = 'R ' + rgb[0].toString();
                    labels[4].txt = 'G ' + rgb[1].toString();
                    labels[5].txt = 'B ' + rgb[2].toString();
                    sample.color = 'hsl(' + h + ',' + s + '%,' + l + '%)';
                    samples.draw();
                }

                function onDragHandler(e) {
                    limitY = e.mouse.oy - colorTable.y;
                    levelY = e.mouse.oy;
                    if (limitY >= 0 && limitY <= colorTable.height) {
                        levelY = e.mouse.oy;
                    } else {
                        if (limitY <= 0) {
                            levelY = colorTable.y;
                        } else {
                            levelY = colorTable.height + colorTable.y;
                        }
                    }
                    getHue = ((Math.abs(levelY - pict.y) / 180) * 360);
                    setLabels(getHue, getSat, getLight);
                    e.target.y = levelY;
                    slider.draw();
                }

                function dDrag(e) {
                    limitY = e.mouse.oy - pict.y;
                    limitX = e.mouse.ox - pict.x;
                    levelY = e.mouse.oy;
                    levelX = e.mouse.ox;
                    if (limitY >= 0 && limitY <= pict.height) {
                        levelY = e.mouse.oy;
                    } else {
                        if (limitY <= 0) {
                            levelY = pict.y;
                        } else {
                            levelY = pict.height + pict.y;
                        }
                    }
                    if (limitX >= 0 && limitX <= pict.width) {
                        levelX = e.mouse.ox;
                    } else {
                        if (limitX <= 0) {
                            levelX = pict.x;
                        } else {
                            levelX = pict.width + pict.x;
                        }
                    }
                    getSat = ((Math.abs(levelY - pict.y) / 180) * 100);
                    getLight = ((Math.abs(levelX - pict.x) / 180) * 100);
                    setLabels(getHue, getSat, getLight);
                    e.target.y = levelY;
                    e.target.x = levelX;
                    slider.draw();
                }
                function overHandler() {
                    stage.container.style.cursor = 'pointer';
                }
                function outHandler() {
                    stage.container.style.cursor = 'default';
                }
            },
            color3: function(c, w, h, params) {

            },
            color4: function(c, w, h, params) {

            }
        },
        namedColor: function(c, w, h, params) {
            var stage = new Canvas2d.Stage(c, w, h);
            var sprite = new Canvas2d.Sprite('main');
            var colorResult = new Canvas2d.Sprite('sprite_labels', false);
            var colorScroll = new Canvas2d.Sprite('sprite_scroll');
            var cref = new Canvas2d.DisplayObjects('colorname');
            cref.rect(0, -50, 100, 100, 'black', 'black', 2);
            cref.x = 700;
            cref.y = stage.height / 2;
            var cname = new Canvas2d.DisplayObjects('colorname'), chex, crgb;
            cname.text('Color Name: ', 0, 0, 'bold', 22, 'Helvetica', [200,34,35], null, 'start', 'middle');
            cname.y = (stage.height / 2) - 30;
            cname.x = 300;
            chex = cname.clone('colorhex');
            chex.txt = 'Hex Value: ';
            chex.y = (stage.height / 2);
            crgb = cname.clone('colorarray');
            crgb.txt = 'Rgb Value: ';
            crgb.y = (stage.height / 2) + 30;
            colorResult.add(cname);
            colorResult.add(chex);
            colorResult.add(crgb);
            colorResult.add(cref);
            var scroll = new Canvas2d.DisplayObjects('scroll');
            scroll.rectRound(-10, 4, 18, 60, 8, 'lightgray');
            scroll.x = 230;
            scroll.addEvent('drag', drag);
            scroll.addEvent('mouseover', mOver);
            scroll.addEvent('mouseout', mOut);
            var mask = new Canvas2d.DisplayObjects('mask');
            mask.rect(0, 0, 220, 300, null);
            mask.mask = true;
            colorScroll.add(mask);
            var l, i = 0, sh = 20;
            for(var o in Colors.namedColor) {
                l = new Canvas2d.DisplayObjects(o);
                l.text(o, 0, 0, 'normal', 18, 'Helvetica', 'black', null, 'start', 'top');
                l.addEvent('mouseover', mOver);
                l.addEvent('mouseout', mOut);
                l.addEvent('click', click);
                l.x = 10;
                l.y = 4 + (20 * i);
                colorScroll.add(l);
                i++;
            }
            sh = l.y;
            colorScroll.y = 20;
            sprite.add(scroll);
            stage.add(colorResult);
            stage.add(colorScroll);
            stage.add(sprite);
            function mOver(e) {
                stage.container.style.cursor = 'pointer';
                e.target.color = e.target.name === 'scroll' ? 'gray' : Colors.Invert(e.target.name);
                e.target.backGround = e.target.name === 'scroll' ? null : {color : e.target.name};
                e.target.parent.draw();
            }
            function mOut(e) {
                stage.container.style.cursor = 'default';
                e.target.color = e.target.name === 'scroll' ? 'lightgray' : 'black';
                e.target.backGround = null;
                e.target.parent.draw();
            }
            function click(e){
                cname.txt = 'Color Name: ' + e.target.name;
                chex.txt = 'Hex Value: ' + Colors.namedColor[e.target.name][0];
                crgb.txt = 'Rgb Value: ' + Colors.namedColor[e.target.name][1][0] + ', ' + Colors.namedColor[e.target.name][1][1] + ', ' + Colors.namedColor[e.target.name][1][2];
                cref.color = e.target.name;
                colorResult.draw();
            }
            function drag(e){
                e.target.y=e.mouse.oy>-1&&e.mouse.oy<298-e.target.height?e.mouse.oy:e.target.y;
                colorScroll.y=-(((sh-280)/(280-scroll.height))*(e.target.y));
                mask.y = Math.abs(colorScroll.y);
                colorScroll.draw();
                sprite.draw();
            }
            stage.draw();
        }
    }
};

var mastermind = function(c, w, h, params) {
    function init(img) {
        var w = 320, h = 520;
        var cont2 = document.getElementById('holdercontainer');
        cont2.style.width = '560px';
        cont2.style.height = '520px';
        var stage = new Canvas2d.Stage('container', w, h);
        var main = new Canvas2d.Sprite('main');
        var deck = new Canvas2d.Sprite('deck');
        var ok_btn = new Canvas2d.Sprite('ok_btn');
        var sphere = new Canvas2d.Sprite('sphere');
        var master_board = new Canvas2d.Sprite('master_b');
        var picker = new Canvas2d.Sprite('picker');
        picker.x = 40;
        picker.y = 40;
        var guess_board = new Canvas2d.Sprite('guess_board'),
                gcoord = [[-5, -5], [5, -5], [-5, 5], [5, 5]];
        var rows = {}, rowa = [];
        var color = ['crimson', 'forestgreen', 'gold',
            'darkviolet', 'darkorange', 'mediumblue'];
        var master = [Math.round(Math.random() * 5), Math.round(Math.random() * 5)
                    , Math.round(Math.random() * 5), Math.round(Math.random() * 5)];
        var master_sphere = [], gapo = 26, gapv = 110;
        var currentElement = null, currentRow = 0;
        picker.visible = false;
        master_board.visible = false;
        var pat = main.ctx.createPattern(img, 'repeat');
        var p = new Canvas2d.DisplayObjects();
        p.rectRound(0, 0, w - 8,
                h - 8, 20, null, 'burlywood', 4);
        p.x = 4;
        p.y = 4;
        p.color = pat;
        main.add(p);

        for (var i = 0; i < 10; i++) {
            rows['row' + (10 - i)] = {id: (10 - i)};
            var n = new Canvas2d.DisplayObjects('label_' + (10 - i));
            n.text(10 - i, 0, 0, 'bold', 26, 'Arial',
                    'burlywood', null, 'center', 'middle');
            n.lineColor = 'burlywood';
            n.lineShadow = {color: 'gray', offsetX: 1, offsetY: 1, blur: 1};
            n.x = gapo;
            n.y = gapv + (40 * i);
            deck.add(n);

            rows['row' + (10 - i)]['sphere'] = [];
            for (var a = 0; a < 4; a++) {
                var c = new Canvas2d.DisplayObjects('circle_' + (10 - i) + a);
                c.circle(0, 0, 16, 0, Math.PI * 2, null);
                c.x = n.x + (n.x * 1.5) + (((w - (n.x + (n.x * 1.5) +
                        (c.radius * 2))) / 4) * a);
                c.y = gapv + (40 * i);
                c.data = {code: -1};
                sphere.add(c);
                rows['row' + (10 - i)]['sphere'].push(c);

                var cb = c.clone('cb_' + (10 - i) + a);
                cb.gradient = {'offset': [0, 0.1, 0.2, 1],
                    'color': ['black', 'burlywood', 'rgba(255,255,255,0)', 'black'],
                    'type': 'radial',
                    'coord': {'x0': 0, 'y0': 0, 'r0': 3, 'x1': 0, 'y1': 0, 'r1': 30}};
                main.add(cb);
            }
            var guess = new Canvas2d.DisplayObjects('guess_sqr_' + (10 - i));
            var m1 = c.radius * 1.5, m = m1 / 2;
            guess.rect(-m, -m, m1, m1, 'rgba(120,120,120,0.1)',
                    'rgba(120,120,120,0.1)', 1);
            guess.x = c.x + (c.radius * 2) + 3;
            guess.y = c.y;
            guess.lineShadow = {color: 'black', offsetX: 0, offsetY: 0, blur: 1};
            guess_board.add(guess);

            rows['row' + (10 - i)]['guess'] = [];
            for (a = 0; a < 4; a++) {
                c = new Canvas2d.DisplayObjects('guess_circle_' + (10 - i) + a);
                c.circle(0, 0, 4, 0, Math.PI * 2, null);
                c.x = guess.x + gcoord[a][0];
                c.y = guess.y + gcoord[a][1];
                c.shadow = {color: 'black', offsetX: 1, offsetY: 1, blur: 1};
                guess_board.add(c);
                rows['row' + (10 - i)]['guess'].push(c);
            }
            rowa.push(rows['row' + (10 - i)]);
        }
        rowa.reverse();

        var ok = new Canvas2d.DisplayObjects('btn');
        var okb = new Canvas2d.DisplayObjects('btnb');
        okb.circle(0, 0, 10, 0, Math.PI * 2, 'ivory', 'green', 1);
        okb.alpha = 0.6;
        okb.lineShadow = {color: 'black', offsetX: 1, offsetY: 1, blur: 2};
        var points = [[-5, 0], [0, 6], [8, -6], [0, 2], [-5, 0]];
        ok.polygon(0, 0, points, 'green');
        ok_btn.add(okb);
        ok_btn.add(ok);
        ok_btn.x = guess.x + 28;
        ok_btn.y = guess.y;
        ok_btn.addEvent('mouseover', overBtn);
        ok_btn.addEvent('mouseout', outBtn);
        ok_btn.addEvent('click', clickBtn);

        var pick = new Canvas2d.DisplayObjects('pick_0');
        pick.circle(0, 0, 38, 0, Math.PI * 2);
        pick.gradient = {'offset': [0, 1],
            'color': ['rgba(255,255,255,0)', 'rgba(120,120,120,0.2)'],
            'type': 'radial',
            'coord': {'x0': 0, 'y0': 0, 'r0': 10, 'x1': 0, 'y1': 0, 'r1': 20}};
        pick.shadow = {color: 'black', offsetX: 0, offsetY: 0, blur: 15};
        picker.add(pick);

        for (a = 0; a < color.length; a++) {
            c = new Canvas2d.DisplayObjects('circle_' + a);
            c.circle(0, 0, 10, 0, Math.PI * 2, color[a]);
            var g = {'offset': [0, 1], 'color': ['ivory', color[a]],
                'type': 'radial',
                'coord': {'x0': -4, 'y0': -4, 'r0': 1, 'x1': -2, 'y1': -2, 'r1': 14}};
            c.data = {colorid: a, g: g, code: a,
                s: {color: 'black', offsetX: 1, offsetY: 1, blur: 5}};
            c.x = Math.cos(Math.PI / 3 * a) * 24;
            c.y = Math.sin(Math.PI / 3 * a) * 24;
            picker.add(c);
            c.addEvent('click', clickPicker);
        }

        function clickPicker(e) {
            picker.visible = false;
            currentElement.gradient = e.target.data.g;
            currentElement.shadow = e.target.data.s;
            currentElement.data.code = e.target.data.code;
            currentElement.parent.draw();
            picker.draw();
        }
        function clickPick(e) {
            picker.visible = true;
            picker.x = e.target.x;
            picker.y = e.target.y;
            currentElement = e.target;
            picker.draw();
        }
        function overBtn(e) {
            pointer(true);
        }
        function outBtn(e) {
            pointer(false);
        }
        function pointer(cursor) {
            stage.container.style.cursor = cursor ? 'pointer' : 'default';
        }
        function clickBtn(e) {
            var check = false, tocheck = [];
            for (var i = 0; i < rowa[currentRow].sphere.length; i++) {
                if (rowa[currentRow].sphere[i].data.code === -1) {
                    check = false;
                    break;
                } else {
                    check = true;
                    tocheck.push(rowa[currentRow].sphere[i].data.code);
                }
            }
            if (check) {
                checkGuess(tocheck);
            }
        }
        for (a = 0; a < master.length; a++) {
            c = new Canvas2d.DisplayObjects('master_' + a);
            c.circle(0, 0, 16, 0, Math.PI * 2);
            c.x = n.x + (n.x * 1.5) + (((w - (n.x + (n.x * 1.5) +
                    (c.radius * 2))) / 4) * a);
            c.y = 64;
            c.gradient = {'offset': [0, 1],
                'color': ['ivory', color[master[a]]],
                'type': 'radial',
                'coord': {'x0': -5, 'y0': -5, 'r0': 2, 'x1': 0, 'y1': 0, 'r1': 16}};
            c.shadow = {color: 'black', offsetX: 1, offsetY: 1, blur: 4};
            master_board.add(c);
            master_sphere.push(c);
        }
        var label_result = new Canvas2d.DisplayObjects('lr');
        label_result.text('Hai Perso', 0, 0, 'bold', 24,
                'Arial', null, null, 'left', 'middle');
        label_result.lineColor = 'burlywood';
        label_result.lineShadow = {color: 'black', offsetX: 1, offsetY: 1, blur: 1};
        label_result.x = master_sphere[0].x;
        label_result.y = c.y - 40;
        master_board.add(label_result);
        function setCurrentRow(n) {
            var cr = rowa[n];
            for (i = 0; i < cr.sphere.length; i++) {
                cr.sphere[i].addEvent('click', clickPick);
                cr.sphere[i].addEvent('mouseover', overBtn);
                cr.sphere[i].addEvent('mouseout', outBtn);
            }
            ok_btn.y = cr.sphere[0].y;
            ok_btn.draw();
        }
        function cleanCurrentRow(n) {
            var cr = rowa[n];
            for (i = 0; i < cr.sphere.length; i++) {
                cr.sphere[i].removeEvent('click', clickPick);
                cr.sphere[i].removeEvent('mouseover', overBtn);
                cr.sphere[i].removeEvent('mouseout', outBtn);
            }
            pointer(false);
            currentRow++;
            if (currentRow === rowa.length) {
                label_result.txt = 'Hai Perso';
                master_board.visible = true;
                master_board.draw();
                ok_btn.y = label_result.y;
                ok_btn.draw();
                ok_btn.removeEvent('click', clickBtn);
                ok_btn.addEvent('click', restart);
                return;
            }
            setCurrentRow(currentRow);
        }
        function checkGuess(t) {
            var m = [], n = [], c = [], right = [], almost = [];
            for (var i = 0; i < master.length; i++) {
                if (master[i] === t[i]) {
                    right.push(i);
                } else {
                    m.push(master[i]);
                    n.push(t[i]);
                }
            }
            for (i = 0; i < m.length; i++) {
                for (var a = 0; a < n.length; a++) {
                    if (m[i] === n[a]) {
                        almost.push(i);
                        n.splice(a, 1);
                        break;
                    }
                }
            }
            var b = right.length, w = almost.length;
            var cr = rowa[currentRow].guess;
            for (i = 0; i < b; i++) {
                cr[i].color = 'black';
            }
            for (i = b; i < w + b; i++) {
                cr[i].color = 'white';
            }
            guess_board.draw();
            if (right.length === 4) {
                pointer(false);
                label_result.txt = 'Hai Vinto';
                master_board.visible = true;
                master_board.draw();
                ok_btn.y = label_result.y;
                ok_btn.draw();
                ok_btn.removeEvent('click', clickBtn);
                ok_btn.addEvent('click', restart);
                var cr = rowa[currentRow];
                for (i = 0; i < cr.sphere.length; i++) {
                    cr.sphere[i].removeEvent('click', clickPick);
                    cr.sphere[i].removeEvent('mouseover', overBtn);
                    cr.sphere[i].removeEvent('mouseout', outBtn);
                }
            } else {
                cleanCurrentRow(currentRow);
            }
        }
        function restart() {
            for (var i = 0; i < rowa.length; i++) {
                var e = rowa[i];
                for (var a = 0; a < e.sphere.length; a++) {
                    e.sphere[a].data.code = -1;
                    e.sphere[a].gradient = null;
                    e.guess[a].color = null;
                }
            }
            currentElement = null;
            currentRow = 0;
            ok_btn.y = guess.y;
            master_board.visible = false;
            master = [Math.round(Math.random() * 5), Math.round(Math.random() * 5),
                Math.round(Math.random() * 5), Math.round(Math.random() * 5)];
            for (a = 0; a < master_sphere.length; a++) {
                master_sphere[a].gradient = {'offset': [0, 1],
                    'color': ['ivory', color[master[a]]],
                    'type': 'radial',
                    'coord': {'x0': -5, 'y0': -5, 'r0': 2, 'x1': 0, 'y1': 0, 'r1': 16}};
            }
            stage.draw();
            ok_btn.removeEvent('click', restart);
            ok_btn.addEvent('click', clickBtn);
            setCurrentRow(currentRow);
        }
        stage.add(main);
        stage.add(deck);
        stage.add(ok_btn);
        stage.add(sphere);
        stage.add(guess_board);
        stage.add(picker);
        stage.add(master_board);
        stage.draw();
        setCurrentRow(currentRow);
    }
    var img = new Image();
    img.onload = function() {
        init(img);
    };
    img.src = params[0] ? 'img/retina_wood.png' : 'http://www.somethinglikethis.it/img/hosted/retina_wood.png';
};