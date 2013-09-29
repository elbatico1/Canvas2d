function init(){
    var width=600,height=600;
    width='innerWidth' in window?window.innerWidth:document.documentElement.clientWidth;
    height='innerHeight' in window?window.innerHeight:document.documentElement.clientHeight;
    var stage=new Canvas2d.Stage("container",width,height,true);
    var sprite=new Canvas2d.Sprite("main");
    var sprite2=new Canvas2d.Sprite('',false);
    var circle=new Canvas2d.DisplayObjects("object_1");
    var length=new Canvas2d.DisplayObjects();
    var out=document.getElementById("out");
    stage.add(sprite);
    stage.add(sprite2);
    sprite.add(circle);
    sprite.add(length);
    var i,io,j,r=130,la=8,lab=2,g=1.078,ang=Math.PI*2/(la*2),len,angLen;
    function cO(a,an,as,y,r,x,nra,nr){
        c=360/(nra*nr);
        for(i=0;i<nra;i++){
            a.push({quadraticCurveTo:[]});
            for(io=0;io<nr;io++){
                
                if(sprite2.children.length>0){
                    for(i=0;i<sprite2.children.length;i++){
                        var m=sprite2[i];
                    }
                }else{
                    var m=new Canvas2d.DisplayObjects();
                    m.circle(0,0,5,0,Math.PI*2,'hsl('+Math.abs(c*i*(io+1))+',100%,50%)');
                    sprite2.add(m);
                }
                y=io<1?x:1;
                v=Math.cos(an)*r*y;
                a[i].quadraticCurveTo.push(v);
                m.x=v;
                v=Math.sin(an)*r*y;
                a[i].quadraticCurveTo.push(v);
                an+=as;
                m.y=v;
            }
            if(i===nra-1){
                a.unshift({moveTo:[a[i].quadraticCurveTo[2],a[i].quadraticCurveTo[3]]});
            }
        }
        return a;
    }
    circle.shape(0,0,cO([],0,ang,0,r,g,la,lab),"black");circle.x=circle.y=300;
    length.line(0,0,0,0,0,0,'red',2);length.x=circle.x;length.y=circle.y;
    sprite2.x=circle.x;sprite2.y=circle.y;
    stage.draw();
    stage.addEvent('mousemove',move);
    function move(e){
        len=Math.sqrt(Math.pow(e.mouse.x-circle.x,2)+Math.pow(e.mouse.y-circle.y,2));
        angLen=Math.atan2(e.mouse.y-circle.y,e.mouse.x-circle.x);
        //console.log(len,angLen);
        length.points[0][0]=0;
        length.points[0][1]=0;
        length.points[1][0]=e.mouse.x-circle.x;
        length.points[1][1]=e.mouse.y-circle.y;
        circle.obj=cO([],0,angLen+ang,0,Math.max(r,len/2),g,la,lab);
        stage.draw();
    }
    function pm(e){
        r+=e.target.name==='p'?10:-10;
        stage.draw();
    }
    stop=function(e){
        stage.stop();
    };
    start=function(e){
        stage.start();
    };
}
        
        