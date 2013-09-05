function init(){
    var width=600,height=600;
    var stage=new Canvas2d.Stage("container",width,height);
    var sprite=new Canvas2d.Sprite("main");
    var obj=new Canvas2d.DisplayObjects("object_1");
    stage.add(sprite);
    sprite.add(obj);
    obj.rect(0,0,100,100,'red');
    stage.draw();
    stage.addEvent('mousemove',roll);
    function roll(e){
        obj.x=e.mouse.x-(obj.width/2);
        obj.y=e.mouse.y-(obj.height/2);
        e.target.draw();
    }
}