function init(){
    var width=600,height=600;
    var stage=new Canvas2d.Stage("container",width,height,false);
    var sprite=new Canvas2d.Sprite("main");
    var obj=new Canvas2d.DisplayObjects("object_1");
    var out=document.getElementById("out");
    stage.add(sprite);
    sprite.add(obj);
    obj.rect(0,0,100,100,'red');
    obj.x=obj.y=stage.width/2;
    stage.draw();
    //stage.start();
    stage.addLoop(obj,loop);
    var ftp=1000/25,time=0,touch=false;
    
    function loop(){
        move();
        out.innerHTML="rate: "+Math.round(stage.getFps());
    }
    var rate=6,direction=rate,distw=stage.width,disth=stage.height;
    function move(){
        
        if(obj.x >= (stage.width-obj.width) && obj.y>=(stage.height-obj.height)){
            direction=(-rate);
            distw=-stage.width;disth=-stage.height;
        }else if(obj.x < 0 && obj.y <0){
            direction=rate;
            distw=stage.width;disth=stage.height;
        }
        obj.x+=(obj.x/distw)*direction;
        obj.y+=(obj.y/disth)*direction;
        obj.parent.draw();
    }
    stop=function(){
        stage.stop();
        console.log("stop");
    }
    start=function(){
        stage.start();
    }
}