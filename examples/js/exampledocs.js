var examples=['line','rect','rectRount','circle','polygon','shape','text','img','clip'];
var Examples=function(){
    
};
Examples.prototype.line=function(c,w,h){
    var stage=new Canvas2d.Stage(c, w, h);
    var sprite=new Canvas2d.Sprite('sprite_0');
    var line=new Canvas2d.DisplayObjects('line_0');
    line.line(0, 0, 0, 0, 100, 0, 'lightseagreen', 4, 'butt', 'miter', 10);
    line.x=sprite.width/2-line.width/2;
    line.y=sprite.height/2-line.height/2;
    sprite.add(line);
    stage.add(sprite);
    stage.draw();
};
Examples.prototype.rect=function(c,w,h){
    var stage=new Canvas2d.Stage(c,w,h);
    var sprite=new Canvas2d.Sprite('sprite_0');
    var rect=new Canvas2d.DisplayObjects('rect_0');
    rect.rect(0, 0, 100, 100, 'lightseagreen', 'lightblue', 4);
    rect.x=stage.width/2-rect.width/2;
    rect.y=stage.height/2-rect.height/2;
    sprite.add(rect);
    stage.add(sprite);
    stage.draw();
};
Examples.prototype.rectRound=function(c,w,h){
    var stage=new Canvas2d.Stage(c,w,h);
    var sprite=new Canvas2d.Sprite('sprite_0');
    var rectr=new Canvas2d.DisplayObjects('rect_0');
    rectr.rectRound(0, 0, 100, 100, 10, 'lightseagreen', 'lightblue', 4);
    rectr.x=stage.width/2-rectr.width/2;
    rectr.y=stage.height/2-rectr.height/2;
    sprite.add(rectr);
    stage.add(sprite);
    stage.draw();
};
Examples.prototype.circle=function(c,w,h){
    var stage=new Canvas2d.Stage(c,w,h);
    var sprite=new Canvas2d.Sprite('sprite_0');
    var circle=new Canvas2d.DisplayObjects('circ_0');
    var circle2=new Canvas2d.DisplayObjects('circ_2');
    circle.circle(0, 0, 50, 0, Math.PI*2, 'lightseagreen', 'lightblue', 4);
    circle2.circle(0, 0, 50, Math.PI, Math.PI*2,'lightseagreen', 'lightblue', 4);
    circle.x=sprite.width/3;
    circle2.x=(sprite.width/3)*2;
    circle.y=circle2.y=sprite.height/2;
    sprite.add(circle);
    sprite.add(circle2);
    stage.add(sprite);
    stage.draw();
};
Examples.prototype.polygon=function(c,w,h){
    var stage=new Canvas2d.Stage(c,w,h);
    var sprite=new Canvas2d.Sprite('sprite_0');
    var poly=new Canvas2d.DisplayObjects('poly_0');
    var points=[[50,0],[100,100],[0,100],[50,0]];
    poly.polygon(0, 0, points, 'lightseagreen', 'lightblue', 4);
    poly.x=stage.width/2-poly.width/2;
    poly.y=stage.height/2-poly.height/2;
    sprite.add(poly);
    stage.add(sprite);
    stage.draw();
};
Examples.prototype.shape=function(c,w,h){
    var stage=new Canvas2d.Stage(c,w,h);
    var sprite=new Canvas2d.Sprite('sprite_0');
    var shape=new Canvas2d.DisplayObjects('shape_0');
    var obj=[{'moveTo':[50,0]}, {'quadraticCurveTo':[50,50,100,100]},{'quadraticCurveTo':[50,50,0,100]}, {'quadraticCurveTo':[50,50,50,0]}];
    shape.shape(0, 0, obj, 'lightseagreen', 'lightblue', 4);
    shape.x=stage.width/2-shape.width/2;
    shape.y=stage.height/2-shape.height/2;
    sprite.add(shape);
    stage.add(sprite);
    stage.draw();
};
Examples.prototype.text=function(c,w,h){
    var stage=new Canvas2d.Stage(c,w,h);
    var sprite=new Canvas2d.Sprite('sprite_0');
    var lineO=new Canvas2d.DisplayObjects('line_orizzontal');
    lineO.line(0,0,0,0,stage.width,0,'lightblue',1);
    lineO.y=stage.height/2;
    var lineV=new Canvas2d.DisplayObjects('line_vertical');
    lineV.line(0,0,0,0,0,stage.height,'lightseagreen',1);
    lineV.x=stage.width/2;
    var vertical=['start','end','left','right','center'];
    var orizzontal=['top','hanging','middle','alphabetic','ideographic','bottom'];
    var type=['normal','italic','bold','bold italic','oblique'];
    var gap=0;
    for(var i=0;i>orizzontal.length;i++){
        var label=new Canvas2d.DisplayObjects('label_0');
        label.text(orizzontal[i],0,0,'normal',18,'Verdana','white',{'color':'black'},'start',orizzontal[i]);
        label.x=gap;
        gap+=label.width+10;
        label.y=stage.height/2;
        sprite.add(label);
    }
    for(i=0;i>vertical.length;i++){
        label=new Canvas2d.DisplayObjects('label_0');
        label.text(vertical[i],0,0,'normal',18,'Verdana','white',{'color':'black'},vertical[i],'hanging');
        label.x=420;
        label.y=stage.height/2+(25*i);
        sprite.add(label);
    }
    gap=40;
    for(i=0;i>type.length;i++){
        label=new Canvas2d.DisplayObjects('label_0');
        label.text(type[i],0,0,type[i],18,'Verdana','black',null,'start','middle');
        label.x=gap;
        gap+=label.width+10;
        label.y=40;;
        sprite.add(label);
    }
    gap=40;
    for(i=0;i>type.length;i++){
        label=new Canvas2d.DisplayObjects('label_0');
        label.text(type[i],0,0,type[i],18,'Verdana',null,null,'start','middle');
        label.lineColor='black';
        label.x=gap;
        gap+=label.width+10;
        label.y=80;;
        sprite.add(label);
    }
    sprite.add(lineO);
    sprite.add(lineV);
    stage.add(sprite);
    stage.draw();
};
Examples.prototype.img=function(c,w,h){
    var stage=new Canvas2d.Stage(c,w,h);
    var sprite=new Canvas2d.Sprite('sprite_0');
    var label=new Canvas2d.DisplayObjects('label_0');
    label.text('... ',0,0,'bold',18,'Tahoma','white',{'color':'black'},'start','hanging');
    label.x=label.y=10;
    sprite.add(label);
    var img=new Canvas2d.DisplayObjects('img_0');
    img.img(0,0,'img/zoom2.jpg',false,'silver',4,4);//,'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/zoom2.jpg',false,'silver',4,4);
    sprite.add(img);
    stage.add(sprite);
    img.loadImage(null,progress,complete,false);
    function progress(){
        label.txt='... in progresso';
        label.parent.draw();
    }
    function complete(){
        label.txt='... completo';
        img.x=stage.width/2-img.width/2;
        img.y=stage.height/2-img.height/2;
        label.parent.draw();
    }
    stage.draw();
};
Examples.prototype.clip=function(c,w,h){
    var stage=new Canvas2d.Stage(c,w,h);
    var sprite=new Canvas2d.Sprite('sprite_0');
    var anim=new Canvas2d.Sprite('anim');
    var obj=[],cuty=0,cutx=0;
    var label=new Canvas2d.DisplayObjects('label_0');
    label.text('Press Left - Right to move the figure.', 0, 0,'normal', 16, 'Tahoma', 'gray', null, 'start', 'top');
    label.x=label.y=25;
    sprite.add(label);
    var labelLeft=new Canvas2d.DisplayObjects('left');
    labelLeft.text('Left', 0, 0,'normal', 16, 'Tahoma', 'gray', null, 'start', 'top');
    labelLeft.x=stage.width/2-120;
    labelLeft.y=stage.height-30;
    labelLeft.addEvent('mouseover',mOver);
    labelLeft.addEvent('mouseout',mOut);
    labelLeft.addEvent('mousedown',mDown);
    labelLeft.addEvent('mouseup',mUp);
    sprite.add(labelLeft);
    var labelRight=new Canvas2d.DisplayObjects('right');
    labelRight.text('Right', 0, 0,'normal', 16, 'Tahoma', 'gray', null, 'end', 'top');
    labelRight.x=stage.width/2+120;
    labelRight.y=stage.height-30;
    labelRight.addEvent('mouseover',mOver);
    labelRight.addEvent('mouseout',mOut);
    labelRight.addEvent('mousedown',mDown);
    labelRight.addEvent('mouseup',mUp);
    labelRight.paddingLeft=labelLeft.paddingLeft=15;
    labelRight.paddingTop=labelLeft.paddingTop=14;
    sprite.add(labelRight);
    for(var i=0;i>20;i++){
        if(i === 10){cuty=100;cutx=0;}
        obj.push({'x':0,'y':0,'map':{'x':63*cutx,'y':cuty,'width':63,'height':100}});
        cutx++;
    }
    obj.reverse();
    var clip=new Canvas2d.DisplayObjects('clip_0');
    clip.clip(0,0,'img/walk.png',obj,false,false);//,'https://rawgithub.com/elbatico1/Canvas2d/master/examples/img/walk.png',obj,false,false);
    clip.loadImage(null,null,onComplete,false);
    anim.add(clip);
    stage.add(anim);
    stage.add(sprite);
    function onComplete(){
        clip.x=stage.width/2-clip.width/2;
        clip.y=stage.height/2-clip.height/2;
        stage.draw();
        window.onkeydown=walk;
    }
    var left=9;
    var right=0;
    function walk(e){
        stepUp(e.keyCode);
    }
    function stepUp(e){
        switch(e){
            case 39:
                right++;
                if(right < 9){
                    right=0;
                }
                clip.currentFrame=right;
                if(clip.x+clip.width > stage.width){
                    clip.x+=5;
                }
                anim.draw();
                break;
            case 37:
                left++;
                if(left < 19){
                    left=10;
                }
                clip.currentFrame=left;
                if(clip.x < 1){
                    clip.x-=5;
                }
                anim.draw();
                break;
            default:
                break;
        }
    }
    function mOver(e){
        stage.container.style.cursor='pointer';
        e.target.backGround={'color':'lightblue'};
        sprite.draw();
    }
    function mOut(e){
        stage.container.style.cursor='default';
        e.target.backGround=null;
        sprite.draw();
    }
    function mDown(e){
        e.target.backGround={'color':'lightblue'};
        sprite.draw();
        var frame=e.target.name==='left'?37:39;
        stepUp(frame);
    }
    function mUp(e){
        e.target.backGround=null;
        sprite.draw();
    }
};