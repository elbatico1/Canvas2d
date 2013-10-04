
var Examples = function() {

};
var DisplayObjects = function() {

};
var Tweener = function() {

};
var Colors = function() {

};
var Common = function() {

};
var Stage = function() {

};
var Sprite = function() {

};
DisplayObjects.prototype.line = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sprite = new Canvas2d.Sprite('sprite_0');
    var line = new Canvas2d.DisplayObjects('line_0');
    line.line(0, 0, 0, 0, 100, 0, 'lightseagreen', 4, 'butt', 'miter', 10);
    line.x = sprite.width / 2 - line.width / 2;
    line.y = sprite.height / 2 - line.height / 2;
    sprite.add(line);
    stage.add(sprite);
    stage.draw();
};
DisplayObjects.prototype.rect = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sprite = new Canvas2d.Sprite('sprite_0');
    var rect = new Canvas2d.DisplayObjects('rect_0');
    rect.rect(0, 0, 100, 100, 'lightseagreen', 'lightblue', 4);
    rect.x = stage.width / 2 - rect.width / 2;
    rect.y = stage.height / 2 - rect.height / 2;
    sprite.add(rect);
    stage.add(sprite);
    stage.draw();
};
DisplayObjects.prototype.rectRound = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sprite = new Canvas2d.Sprite('sprite_0');
    var rectr = new Canvas2d.DisplayObjects('rect_0');
    rectr.rectRound(0, 0, 100, 100, 10, 'lightseagreen', 'lightblue', 4);
    rectr.x = stage.width / 2 - rectr.width / 2;
    rectr.y = stage.height / 2 - rectr.height / 2;
    sprite.add(rectr);
    stage.add(sprite);
    stage.draw();
};
DisplayObjects.prototype.circle = function(c, w, h, params) {
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
};
DisplayObjects.prototype.polygon = function(c, w, h, params) {
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
};
DisplayObjects.prototype.shape = function(c, w, h, params) {
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
};
DisplayObjects.prototype.img = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sprite = new Canvas2d.Sprite('sprite_0');
    var label = new Canvas2d.DisplayObjects('label_0');
    label.text('... ', 0, 0, 'bold', 18, 'Tahoma', 'white', {'color': 'black'}, 'start', 'hanging');
    label.x = label.y = 10;
    var img = new Canvas2d.DisplayObjects('img_0');
    img.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/zoom2.jpg', false, 'silver', 4, 4);
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
};
DisplayObjects.prototype.clip = function(c, w, h, params) {
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
    clip.clip(0, 0, params[0] ? 'img/walk.png' : 'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/walk.png', obj, false);
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
};
DisplayObjects.prototype.mask = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sprite = new Canvas2d.Sprite('txt_container');
    var mask = new Canvas2d.DisplayObjects();
    mask.circle(0, 0, 50, 0, Math.PI * 2);
    mask.x = 150;
    mask.y = 150;
    mask.mask = true;
    sprite.add(mask);
    var q0 = new Canvas2d.DisplayObjects();
    q0.rect(0, 0, 100, 100, 'red', 'yellow', 2);
    sprite.add(q0);
    var q1 = q0.clone();
    var q2 = q0.clone();
    var q3 = q0.clone();
    sprite.add(q1);
    sprite.add(q2);
    sprite.add(q3);
    q0.x = 100;
    q0.y = 100;
    q1.x = 150;
    q1.y = 100;
    q1.color = 'green';
    q2.x = 50;
    q2.y = 150;
    q2.color = 'blue';
    q3.x = 150;
    q3.y = 150;
    q3.color = 'purple';

    var copy = sprite.clone();
    copy.x = 200;
    copy.children[0].visible = false;
    stage.add(copy);
    stage.add(sprite);
    stage.draw();
};
Examples.prototype.mastermind = function(c, w, h, params) {
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
    img.src = params[0] ? 'img/retina_wood.png' : 'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/retina_wood.png';
};
Examples.prototype.stars = function(c, w, h, params) {
    function init(img) {
        var stage = new Canvas2d.Stage(c, w, h);
        var sprite = new Canvas2d.Sprite('txt_container');
        var sr = new Canvas2d.Sprite('');
        var p = sr.ctx.createPattern(img, 'repeat');
        var pattern = new Canvas2d.DisplayObjects('pattern');
        pattern.rect(0, 0, stage.width, stage.height);
        pattern.color = p;
        sr.add(pattern);
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
    }
    var img = new Image();
    img.onload = function() {
        init(img);
    };
    img.src = params[0] ? 'img/ice_age.png' : 'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/ice_age.png';
};
DisplayObjects.prototype.setCrop = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sp = new Canvas2d.Sprite();
    var im = new Canvas2d.DisplayObjects();
    var crop = {dx: 0, dy: 0, dw: w, dh: h};
    im.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/zoom2.jpg', false);
    im.loadImage(im.source, null, complete);
    function complete(e) {
        e.parent.draw();
    }
    sp.add(im);
    stage.add(sp);
    stage.draw();
    stage.addEvent('mousemove', mMove);
    function mMove(e) {
        var x = e.mouse.x;
        x = x + crop.dw > im.image.width ? im.image.width - crop.dw - 1 : x;
        var y = e.mouse.y;
        y = y + crop.dh > im.image.height ? im.image.height - crop.dh - 1 : y;
        crop.dx = Math.max(0, x);
        crop.dy = Math.max(0, y);
        im.setCrop(crop);
        sp.draw();
    }

};
DisplayObjects.prototype.filter = {
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
        im.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/zoom2.jpg', false, 'rgba(120,100,15,0.3)', 5, 5);
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
        im.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/zoom2.jpg', false, 'rgba(120,100,15,0.3)', 5, 5);
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
        im.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/zoom2.jpg', false, 'rgba(120,100,15,0.3)', 5, 5);
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
        im.img(0, 0, params[0] ? 'img/zoom2.jpg' : 'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/zoom2.jpg', false, 'rgba(120,100,15,0.3)', 5, 5);
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
};
Stage.prototype.examples = {
    intro: function(c, w, h, params) {
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
    multy: function(c, w, h, params) {
        var stage = new Canvas2d.Stage(c, w, h);
        var sprite = new Canvas2d.Sprite('sprite_0');
        var rect = new Canvas2d.DisplayObjects('rect_0');
        rect.rect(0, 0, 100, 100, 'lightseagreen', 'lightblue', 4);
        rect.x = stage.width / 2 - rect.width / 2;
        rect.y = stage.height / 2 - rect.height / 2;
        sprite.add(rect);
        stage.add(sprite);
        stage.draw();
        //same process different container - div id=container, div id=container2
        var stage2 = new Canvas2d.Stage(c, w, h);
        var sprite2 = new Canvas2d.Sprite('sprite_2');
        var rect2 = new Canvas2d.DisplayObjects('rect_2');
        rect2.rect(0, 0, 100, 100, 'lightseagreen', 'lightblue', 4);
        rect2.x = stage2.width / 2 - rect2.width / 2;
        rect2.y = stage2.height / 2 - rect2.height / 2;
        sprite2.add(rect2);
        stage2.add(sprite2);
        stage2.draw();
    },
    multy1: function(c, w, h, params) {
        var stage = new Canvas2d.Stage(c, w, h);
        var sprite = new Canvas2d.Sprite('sprite_0');
        var label = new Canvas2d.DisplayObjects('label_0');
        label.text('FPS : 0', 0, 0, 'normal', 20, 'Verdana',
                'black', null, 'start', 'top');
        label.x = label.y = 10;
        sprite.add(label);
        var rect = new Canvas2d.DisplayObjects('rect_0');
        rect.rect(0, 0, 40, 40, 'lightseagreen', 'lightblue', 4);
        rect.x = stage.width / 2 - rect.width / 2;
        rect.y = stage.height / 2 - rect.height / 2;
        sprite.add(rect);
        stage.add(sprite);
        stage.draw();
        //same process different container 
        //div id=container,div id=container2
        var stage2 = new Canvas2d.Stage(c, w, h);
        var sprite2 = new Canvas2d.Sprite('sprite_2');
        stage2.add(sprite2);
        var offset1 = stage.container.offsetTop + stage.height;
        var offset2 = stage2.container.offsetTop;
        var gap = offset2 - offset1;
        var step = 4, direction = step;
        var stepx = 4, directionx = stepx;
        function loop() {
            if (rect.parent === sprite) {
                if (rect.y > stage.height) {
                    sprite.remove(rect);
                    sprite2.add(rect);
                    rect.y = -gap;
                    direction = step;
                } else if (rect.y < 1) {
                    direction = step;
                }
            } else {
                if (rect.y + rect.height >= stage2.height) {
                    direction = -step;
                } else if (rect.y < -gap && direction === -step) {
                    sprite2.remove(rect);
                    sprite2.draw();
                    sprite.add(rect);
                    rect.y = stage2.height;
                    direction = -step;
                }
            }
            if (rect.x + rect.width > stage.width) {
                directionx = -stepx;
            } else if (rect.x < 1) {
                directionx = stepx;
            }
            rect.x += directionx;
            rect.y += direction;
            rect.parent.draw();
        }
        stage.addLoop(rect, loop);
        var frame = stage.getTimeInterval(), interval = frame;
        function monitorFps(e) {
            interval += stage.getTimeInterval();
            if (interval / 12 >= (1000 / 12)) {
                interval = 0;
                e.txt = 'FPS : ' + Math.round(stage2.getFps());
                if (e.parent !== rect.parent) {
                    e.parent.draw();
                }
            }
        }
        stage2.addLoop(label, monitorFps);
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
    }
};
DisplayObjects.prototype.txt = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sprite = new Canvas2d.Sprite('sprite_0');
    var lineO = new Canvas2d.DisplayObjects('line_orizzontal');
    lineO.line(0, 0, 0, 0, stage.width, 0, 'lightblue', 1);
    lineO.y = stage.height / 2;
    var lineV = new Canvas2d.DisplayObjects('line_vertical');
    lineV.line(0, 0, 0, 0, 0, stage.height, 'lightseagreen', 1);
    lineV.x = 420;
    var vertical = ['start', 'end', 'left', 'right', 'center'];
    var orizzontal = ['top', 'hanging', 'middle',
        'alphabetic', 'ideographic', 'bottom'];
    var type = ['normal', 'italic', 'bold', 'bold italic', 'oblique'];
    var gap = 0;
    for (var i = 0; i < orizzontal.length; i++) {
        var label = new Canvas2d.DisplayObjects('label_0');
        label.text(orizzontal[i], 0, 0, 'normal', 18, 'Verdana', 'white',
                {'color': 'black'}, 'start', orizzontal[i]);
        label.x = gap;
        gap += label.width + 10;
        label.y = stage.height / 2;
        sprite.add(label);
    }
    for (i = 0; i < vertical.length; i++) {
        label = new Canvas2d.DisplayObjects('label_0');
        label.text(vertical[i], 0, 0, 'normal', 18, 'Verdana', 'white',
                {'color': 'black'}, vertical[i], 'hanging');
        label.x = 420;
        label.y = stage.height / 2 + (25 * i);
        sprite.add(label);
    }
    gap = 40;
    for (i = 0; i < type.length; i++) {
        label = new Canvas2d.DisplayObjects('label_0');
        label.text(type[i], 0, 0, type[i], 18, 'Verdana', 'black',
                null, 'start', 'middle');
        label.x = gap;
        gap += label.width + 10;
        label.y = 40;
        ;
        sprite.add(label);
    }
    gap = 40;
    for (i = 0; i < type.length; i++) {
        label = new Canvas2d.DisplayObjects('label_0');
        label.text(type[i], 0, 0, type[i], 18, 'Verdana', null,
                null, 'start', 'middle');
        label.lineColor = 'black';
        label.x = gap;
        gap += label.width + 10;
        label.y = 80;
        ;
        sprite.add(label);
    }
    sprite.add(lineO);
    sprite.add(lineV);
    stage.add(sprite);
    stage.draw();
};
DisplayObjects.prototype.text = {
    text0: function(c, w, h, params) {
        var stage = new Canvas2d.Stage(c, w, h);
        var sprite = new Canvas2d.Sprite('sprite_0');
        var lineO = new Canvas2d.DisplayObjects('line_orizzontal');
        lineO.line(0, 0, 0, 0, stage.width, 0, 'lightblue', 1);
        lineO.y = stage.height / 2;
        var lineV = new Canvas2d.DisplayObjects('line_vertical');
        lineV.line(0, 0, 0, 0, 0, stage.height, 'lightseagreen', 1);
        lineV.x = 420;
        var vertical = ['start', 'end', 'left', 'right', 'center'];
        var orizzontal = ['top', 'hanging', 'middle',
            'alphabetic', 'ideographic', 'bottom'];
        var type = ['normal', 'italic', 'bold', 'bold italic', 'oblique'];
        var gap = 0;
        for (var i = 0; i < orizzontal.length; i++) {
            var label = new Canvas2d.DisplayObjects('label_0');
            label.text(orizzontal[i], 0, 0, 'normal', 18, 'Verdana', 'white',
                    {'color': 'black'}, 'start', orizzontal[i]);
            label.x = gap;
            gap += label.width + 10;
            label.y = stage.height / 2;
            sprite.add(label);
        }
        for (i = 0; i < vertical.length; i++) {
            label = new Canvas2d.DisplayObjects('label_0');
            label.text(vertical[i], 0, 0, 'normal', 18, 'Verdana', 'white',
                    {'color': 'black'}, vertical[i], 'hanging');
            label.x = 420;
            label.y = stage.height / 2 + (25 * i);
            sprite.add(label);
        }
        gap = 40;
        for (i = 0; i < type.length; i++) {
            label = new Canvas2d.DisplayObjects('label_0');
            label.text(type[i], 0, 0, type[i], 18, 'Verdana', 'black',
                    null, 'start', 'middle');
            label.x = gap;
            gap += label.width + 10;
            label.y = 40;
            ;
            sprite.add(label);
        }
        gap = 40;
        for (i = 0; i < type.length; i++) {
            label = new Canvas2d.DisplayObjects('label_0');
            label.text(type[i], 0, 0, type[i], 18, 'Verdana', null,
                    null, 'start', 'middle');
            label.lineColor = 'black';
            label.x = gap;
            gap += label.width + 10;
            label.y = 80;
            ;
            sprite.add(label);
        }
        sprite.add(lineO);
        sprite.add(lineV);
        stage.add(sprite);
        stage.draw();
    },
    text1: function(c, w, h, params) {
        var stage = new Canvas2d.Stage(c, w, h);
        var sprite = new Canvas2d.Sprite('txt_container');
        var back = new Canvas2d.Sprite('misc_container');
        var align = ['left', 'right', 'center', 'start', 'end'];
        var baseline = ['top', 'hanging', 'middle', 'alphabetic',
            'ideographic', 'bottom'];
        var fontWeigth = ['bold italic', 'normal', 'italic', 'bold'];
        var font = ['Verdana', 'Georgia', 'Times', 'Arial', 'Fantasy', 'Impact'];
        var propList = [], gap = 15;
        var vertical = new Canvas2d.DisplayObjects('line_v');
        var orizontal = new Canvas2d.DisplayObjects('line_o');
        vertical.line(0, 0, 0, -100, 0, 100, 'pink', 2);
        orizontal.line(0, 0, -100, 0, 100, 0, 'pink', 2);
        vertical.x = orizontal.x = stage.width / 2;
        orizontal.y = vertical.y = stage.height / 2;
        back.add(vertical);
        back.add(orizontal);
        var t = new Canvas2d.DisplayObjects('font');
        t.text(font[0], 0, 0, 'normal', 16, font[0], 'black',
                {color: 'lightseagreen'}, 'start');
        t.paddingLeft = t.paddingTop = 5;
        var indexFont = 0;
        t.y = 90;
        t.x = 10;
        back.add(t);
        t.addEvent('mouseover', mOver);
        t.addEvent('mouseout', mOut);
        t.addEvent('click', changeFont);
        function changeFont(e) {
            indexFont = indexFont < font.length - 1 ? indexFont + 1 : 0;
            text.fontType = font[indexFont];
            text.parent.draw();
            e.target.txt = font[indexFont];
            e.target.fontType = font[indexFont];
            label.txt = text.fontStyle;
            e.target.parent.draw();
        }

        for (var i = 0; i < align.length; i++) {
            t = new Canvas2d.DisplayObjects('align_' + i);
            t.text(align[i], 0, 0, 'normal', 14, 'Verdana', 'gray',
                    {color: 'lightseagreen'}, 'right');
            t.paddingLeft = t.paddingTop = 5;
            t.data = {prop: 'align', value: align[i]};
            t.y = 25 + stage.height / 2 + (10 * i) + gap * i;
            t.x = stage.width - 10;
            back.add(t);
            propList.push(t);
        }
        for (var i = 0; i < baseline.length; i++) {
            t = new Canvas2d.DisplayObjects('baseline_' + i);
            t.text(baseline[i], 0, 0, 'normal', 14, 'Verdana', 'gray',
                    {color: 'lightseagreen'}, 'left');
            t.paddingLeft = t.paddingTop = 5;
            t.data = {prop: 'baseLine', value: baseline[i]};
            t.y = 150 + (10 * i) + gap * i;
            t.x = 10;
            back.add(t);
            propList.push(t);
        }
        for (var i = 0; i < fontWeigth.length; i++) {
            t = new Canvas2d.DisplayObjects('fontWeigth_' + i);
            t.text(fontWeigth[i], 0, 0, 'normal', 14, 'Verdana', 'gray',
                    {color: 'lightseagreen'}, 'right');
            t.paddingLeft = t.paddingTop = 5;
            t.data = {prop: 'fontWeigth', value: fontWeigth[i]};
            t.y = 35 + (10 * i) + gap * i;
            t.x = stage.width - 10;
            back.add(t);
            propList.push(t);
        }
        for (i = 0; i < propList.length; i++) {
            propList[i].addEvent('mouseover', mOver);
            propList[i].addEvent('mouseout', mOut);
            propList[i].addEvent('click', changeProp);
        }
        function mOver(e) {
            e.target.backGround.color = 'lightblue';
            stage.container.style.cursor = 'pointer';
            e.target.parent.draw();
        }
        function mOut(e) {
            e.target.backGround.color = 'lightseagreen';
            stage.container.style.cursor = 'default';
            e.target.parent.draw();
        }
        function changeProp(e) {
            text[e.target.data.prop] = e.target.data.value;
            text.parent.draw();
            label.txt = text.fontStyle;
            label2.txt = text.align + ' ' + text.baseLine;
            for (var i = 0; i < propList.length; i++) {
                propList[i].color = 'gray';
            }
            e.target.color = 'black';
            e.target.parent.draw();
        }
        var text = new Canvas2d.DisplayObjects();
        text.text('Hello World!', 0, 0, 'normal', 18, 'Verdana', 'black',
                null, 'center', 'middle');
        text.paddingLeft = text.paddingTop = 5;
        text.x = stage.width / 2;
        text.y = stage.height / 2;

        var label = new Canvas2d.DisplayObjects('label_0');
        label.text(text.fontStyle, 0, 0, 'italic', 18, 'Verdana', 'black',
                null, 'left');
        label.paddingLeft = label.paddingTop = 5;
        label.y = 35;
        label.x = 15;
        var label2 = new Canvas2d.DisplayObjects('label_2');
        label2.text(text.align + ' ' + text.baseLine, 0, 0, 'bold', 16, 'Verdana',
                'black', null, 'left');
        label2.paddingLeft = label2.paddingTop = 5;
        label2.y = 55;
        label2.x = 15;
        back.add(label);
        back.add(label2);

        sprite.add(text);
        stage.add(back);
        stage.add(sprite);
        stage.draw();
    }
};
Examples.prototype.clip2 = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sprite = new Canvas2d.Sprite('sprite_0');
    var anim = new Canvas2d.Sprite('anim');
    var obj = [], cuty = 0, cutx = 0;
    var label = new Canvas2d.DisplayObjects('label_0');
    label.text('Press Left - Right to move the figure.', 0, 0,
            'normal', 16, 'Tahoma', 'gray', null, 'start', 'top');
    label.x = 25;
    label.y = 25;
    sprite.add(label);
    var labelLeft = new Canvas2d.DisplayObjects('left');
    labelLeft.text('Left', 0, 0,
            'normal', 16, 'Tahoma', 'gray', null, 'start', 'top');
    labelLeft.x = stage.width / 2 - 120;
    labelLeft.y = stage.height - 30;
    labelLeft.addEvent('mouseover', mOver);
    labelLeft.addEvent('mouseout', mOut);
    labelLeft.addEvent('mousedown', mDown);
    labelLeft.addEvent('mouseup', mUp);
    sprite.add(labelLeft);
    var labelRight = new Canvas2d.DisplayObjects('right');
    labelRight.text('Right', 0, 0,
            'normal', 16, 'Tahoma', 'gray', null, 'end', 'top');
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
        obj.push({'x': 0, 'y': 0,
            'map': {'x': 63 * cutx, 'y': cuty, 'width': 63, 'height': 100}});
        cutx++;
    }
    obj.reverse();
    var clip = new Canvas2d.DisplayObjects('clip_0');
    clip.clip(0, 0, params[0] ? 'img/walk.png' : 'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/walk.png', obj, false, false);
    clip.loadImage(null, null, onComplete, false);
    anim.add(clip);
    stage.add(anim);
    stage.add(sprite);
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
};
Examples.prototype.events = function(c, w, h, params) {
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
};
Common.prototype.method = {
    addEvent: function(c, w, h, params) {

    },
    removeEvent: function(c, w, h, params) {

    },
    add: function(c, w, h, params) {

    },
    remove: function(c, w, h, params) {

    },
    zOrder: function(c, w, h, params) {

    },
    clear: function(c, w, h, params) {

    },
    draw: function(c, w, h, params) {

    }
};
Examples.prototype.dragdrop = function(c, w, h, params) {
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
};
Colors.prototype.colors = function(c, w, h, params) {
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
};
Colors.prototype.colors2 = function(c, w, h, params) {
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
};
Examples.prototype.shadow = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sprite = new Canvas2d.Sprite('sprite_0');
    var rectFill = new Canvas2d.DisplayObjects();
    var rectLine = new Canvas2d.DisplayObjects();
    var circFill = new Canvas2d.DisplayObjects();
    var circLine = new Canvas2d.DisplayObjects();
    rectFill.rect(0, 0, 100, 100, 'lightblue');
    rectLine.rect(0, 0, 100, 100, null, 'lightblue', 4);
    circFill.circle(0, 0, 50, 0, Math.PI * 2, 'lightseagreen');
    circLine.circle(0, 0, 50, 0, Math.PI * 2, null, 'lightseagreen', 4);
    rectFill.shadow = circFill.shadow = {'color': 'grey', 'offsetX': 10,
        'offsetY': 10, 'blur': 10};
    rectLine.lineShadow = circLine.lineShadow = {'color': 'grey', 'offsetX': 10,
        'offsetY': 10, 'blur': 10};
    var rectFillLine = new Canvas2d.DisplayObjects();
    rectFillLine.rect(0, 0, 100, 100, 'lightseagreen', 'lightblue', 4);
    rectFillLine.shadow = {'color': 'dimgray', 'offsetX': 10,
        'offsetY': 10, 'blur': 10};
    rectFillLine.lineShadow = {'color': 'grey', 'offsetX': 10,
        'offsetY': 10, 'blur': 10};
    rectFill.x = rectLine.x = 70;
    circFill.x = circLine.x = rectFill.x + rectFill.width + circFill.width;
    rectFill.y = 30;
    rectLine.y = rectFill.y + rectFill.height + 20;
    circLine.y = rectLine.y + circLine.radius;
    circFill.y = rectFill.y + circFill.radius;
    rectFillLine.x = circFill.x + circFill.width;
    rectFillLine.y = stage.height / 2 - rectFillLine.height / 2;
    sprite.add(rectFillLine);
    sprite.add(rectFill);
    sprite.add(rectLine);
    sprite.add(circFill);
    sprite.add(circLine);
    stage.add(sprite);
    stage.draw();
};
Examples.prototype.gradient = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sprite = new Canvas2d.Sprite('sprite_0');
    var w = 100;
    var h = 100;
    var rect;
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
};
Examples.prototype.gradient2 = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sprite = new Canvas2d.Sprite('sprite_0');
    function setGradients(coord, offY, type) {
        for (var i = 0; i < 4; i++) {
            circle = new Canvas2d.DisplayObjects();
            circle.circle(0, 0, r, 0, Math.PI * 2);
            circle.gradient = {'color': color, 'offset': [0, 1],
                'coord': {'x0': coord[i][0], 'y0': coord[i][1],
                    'r0': coord[i][2],
                    'x1': coord[i][3], 'y1': coord[i][4], 'r1': coord[i][5]},
                'type': type};
            circle.x = 60 + (100 * i) + (45 * i);
            circle.y = offY;
            sprite.add(circle);
            line = new Canvas2d.DisplayObjects();
            line.line(0, 0, coord[i][0], coord[i][1], coord[i][2],
                    coord[i][3], 'slategrey');
            line.x = circle.x;
            line.y = circle.y;
            sprite.add(line);
            for (var s = 0; s < coordL.length; s++) {
                label = new Canvas2d.DisplayObjects();
                bl = ((s / 2) === parseInt(s / 2)) ? 'top' : 'bottom';
                al = ((s / 2) === parseInt(s / 2)) ? 'end' : 'start';
                label.text(coordL[s], 0, 0, 'normal', 10, 'Tahoma',
                        'green', null, al, bl);
                if (s < 2) {
                    label.color = 'blue';
                    label.x = circle.x + coord[i][0];
                    label.y = circle.y + coord[i][1];
                } else {
                    label.x = circle.x + coord[i][2];
                    label.y = circle.y + coord[i][3];
                }
                sprite.add(label);
            }
        }
    }
    var w = 100, h = 100, r = w / 2, label, circle, line, color, al, bl, coords;
    var coordL = ['x0', 'y0', 'x1', 'y1'];
    color = ['hsla(0,100%,50%,1)', 'hsla(0,100%,50%,0)'];
    coords = [[0, 0, 0, r, 0, 0], [r, r, 0, -r, 0, 0], [-r, r, 0, r, 0, 0], [-r, -r, 0, r, 0, 0]];
    setGradients(coords, 60, 'linear');
    coords = [[0, 0, 0, 0, 0, r], [-r, -r, 0, 0, 0, r], [0, r, 0, 0, 0, r], [r, 0, 0, 0, 0, r]];
    setGradients(coords, 220, 'radial');
    stage.add(sprite);
    stage.draw();
};
Examples.prototype.gradient3 = function(c, w, h, params) {
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
                deafault :
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
};
Tweener.prototype.addremove = function(c, w, h, params) {
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
};
Tweener.prototype.TweenerEvents = function(c, w, h, params) {
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
};
Tweener.prototype.ease = function(c, w, h, params) {
    var stage = new Canvas2d.Stage(c, w, h);
    var sprite = new Canvas2d.Sprite('sprite_0');
    var spriteLabel = new Canvas2d.Sprite('sprite_label');
    var tween = new Canvas2d.Tweener();
    var grid, graph, rect, label, left, right=new Canvas2d.DisplayObjects('text_right'), x, ct=0, color=360/1000;
    right.text('Right', 0, 0, 'normal', 20, 'Helvetica', 'black', null, 'start', 'top');
    right.y=30;right.x=100;right.paddingLeft=right.paddingTop=8;
    right.addEvent('mouseover',mOver);
    right.addEvent('mouseout',mOut);
    left=right.clone('text_left');left.txt='Left';left.x=20;
    label=right.clone('text_label');label.txt=params[1];label.x=w-250;
    right.addEvent('click',startStop);
    left.addEvent('click',startStop);
    grid=new Canvas2d.DisplayObjects('grid',false);
    grid.polygon(0, 0, [[0,0],[w-80,0],[w-80,h-160],[0,h-160]], null, 'lightgray', 2, true);
    grid.x=40;grid.y=80;grid.lineAlpha=0.3;
    graph=new Canvas2d.DisplayObjects('graph',false);
    graph.polygon(0, 0, [[0,0],[0,0]], null, 'blue', 2, false);
    graph.x=40;graph.y=h-80;graph.lineAlpha=0.5;
    rect=new Canvas2d.DisplayObjects('rect',false);
    rect.rect(0, 0, 50, 50, 'lightseagreen', 'lightblue', 4);
    rect.x=10;rect.y=h/2-rect.height/2;
    function startStop(e){
        x=e.target.name==='text_right'?w-10-rect.width:10;
        graph.points=[[0,0],[0,0]];ct=0;
        tween.addTweener(rect,{x:x,duration:1000,ease:params[1],onTween:loop});
    }
    function mOver(e){
        if(e.target.name==='text_label') return;
        stage.container.style.cursor='pointer';
        e.target.backGround={color:'lightgray'};
        e.target.parent.draw();
    }
    function mOut(e){
        stage.container.style.cursor='default';
        e.target.backGround=null;
        e.target.parent.draw();
    }
    function loop(e){
        graph.points.push([(w-80)*(ct/994),-tween[params[1]](ct,0,h-160,994)]);
        graph.lineColor='hsl('+(color*ct)+',100%,50%)';
        ct+=stage.getTimeInterval();
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
};
Tweener.prototype.easel = function(c, w, h, params) {
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
};
Tweener.prototype.delay = function(c, w, h, params) {
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
};