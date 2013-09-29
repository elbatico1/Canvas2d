function init(){
    var width,height,canvas,c,st=true;
    var tween=new Transition();
    document.body.style.backgroundColor="white";
    var video=document.createElement("video");
    video.setAttribute("src","video/theSagaOfBiorn.mp4");
    video.setAttribute("autoplay","");
    video.setAttribute("controls","controls");
    document.body.appendChild(video);
    console.log(video,video.videoWidth);
    video.addEventListener("play",handler,false);
    function handler(){
        width=video.videoWidth;
        height=video.videoHeight;
        console.log(width,height);
    }
    getImage=function(){
        if(!width) return;
        canvas=document.createElement("canvas");
        canvas.width=width;
        canvas.height=height;
        var ctx=canvas.getContext("2d");
        ctx.drawImage(video,0,0,width,height);
        var data=ctx.getImageData(0,0,width,height);
        var d=data.data;
        var color=[0,0,0];
        for(var i=0;i<d.length/4;i++){
            var r=d[i*4+0];
            var g=d[i*4+1];
            var b=d[i*4+2];
            color[0]+=r;
            color[1]+=g;
            color[2]+=b;
        }
        var rt=d.length/4;
        c=Colors.Hex([color[0]/rt,color[1]/rt,color[2]/rt]);
        console.log(c,color);
        tween.addTweener(document.body,{backgroundColor:c,duration:1000,ease:"easeInOutSine",onEnd:getImage});
    };
    function start(){
            var interval=setInterval(getImage(),2000);
    }
}