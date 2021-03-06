function startCanvas(l){
    var codePre=document.getElementById('codecode'),examples=document.getElementById('example'),location=l.indexOf('localhost')>-1?true:false;
    var gitlogo=document.getElementById('gitlogo'),githref=location?'img/blacktocat.png':'http://www.somethinglikethis.it/img/hosted/blacktocat.png';gitlogo.innerHTML='<a target="_blank" href="https://github.com/elbatico1/Canvas2d" title="download javascript library Canvas2d from github"><img src="'+githref+'" width="66" height="66"/></a>';
    var clogo=document.getElementById('canvaslogo'),chref=location?'img/canvas2d_64.png':'http://www.somethinglikethis.it/img/hosted/canvas2d_64.png';clogo.innerHTML='<img src="'+chref+'"/>';
    var methodsList={addEvent:'addEvent',removeEvent:'removeEvent',add:'add',remove:'remove',zOrder:'zOrder',clear:'clear',draw:'draw',getFrame:'getFrame',getTime:'getTime',getFps:'getFps',getTimeInterval:'getTimeInterval',clone:'clone'};
    //stage elements
    var width='innerWidth' in window?window.innerWidth:document.documentElement.clientWidth;width=1200;
    var height='innerHeight' in window?window.innerHeight:document.documentElment.clientHeight,h=300;
    var mainDocs=new Canvas2d.Stage('maindocs',width,h);
    var refDocs=new Canvas2d.Stage('referense',width,h);
    var badgeDw=new Canvas2d.Stage('badgedw',160,h);
    var trans=new Transition();
    //set variables
    var response,code,i,o,ii=-1,ia,a=[],b=[],c,d,filter,ja=false,ne=false,xqr,xp,multyOpen=false,offY=0;
    var refList={Stage:'Stage',Sprite:'Sprite',DisplayObjects:'DisplayObjects',Tweener:'Tweener',Colors:'Colors'};
    var proList=['Stage','Sprite','DisplayObjects','Tweener','Colors'],numList=[],ease='easeOutExpo';
    //set regular expression
    var ATX=/\*/g,PRM=/(@\w+)/g,END=/\n\r?/,TYP=/(\w+?\s?\w+)\s(\w+)/,DSC=/(.*)/,PAR=/\{(\w+?\s?\w+)\}\s(\w*)\s(.*)/;
    var EXA=/(.*)/,RTR=/\{(\w+?\s?\w+)\}\s(\w+)\s(.*)/,LNK=/(.*)/,SEE=/(.*)/,PRP=/\{(\w+?\s?\w+)\}\s(\w*)\s(.*)/;
    var CLOJ=/^\s{8}(\w+)\:\sfunction\(c\,\sw\,\sh\,?\s?params?\)\s\{/;
    var TRIM=/var\sCode\s\=\s\{/,TREN=/^\}\;/,CLSJ=/\s{4}(Stage|Sprite|DisplayObjects|Tweener|Colors|Common)\:\s\{/,CLSJEND=/^\s{4}\}\,?/;
    var FUNEND=/^\s{8}\}\,?/,FUN=/^\s{8}(\w+)\:\sfunction\(c\,\sw\,\sh\,\sparams\)\s\{/,OBJ=/^\s{8}(\w+)\:\s\{/;
    var SOBJ=/^\s{12}(\w+\d?)\:\sfunction\(c\,\sw\,\sh\,\sparams\)\s\{/,SOBCJ=/^\s{12}\}\,?/;
    //collect data from canvas2d Examples as text
    xqr=new XMLHttpRequest();
    xqr.onload=function(){code=xqr.responseText.replace(END,'\n').split('\n');};
    xqr.open('get',location?'js/exampledocs.js':'https://rawgit.com/elbatico1/Canvas2d/master/examples/js/exampledocs.js',false);
    xqr.send();
    //parse data Examples
    var codeObj={Stage:{},Sprite:{},DisplayObjects:{},Tweener:{},Colors:{},Common:{}};
    var oc=false,ock=false,obc=false,obck=false,obf=false,obfk=false,oso=false,osok=false,osf=false,osfk=false,oty,pro,spro;
    for(var i=0;i<code.length;i++){
        if(oc && !ock){
            if(CLSJ.test(code[i])){oty=CLSJ.exec(code[i])[1];obc=true;obck=false;
            }
            if(CLSJEND.test(code[i])){obck=true;obc=false;}
            if(obc && !obck){
                if(FUNEND.test(code[i])){obf=false;obfk=true;oso=false;osok=true;}
                if(obf && !obfk){codeObj[oty][pro]+=code[i]+'\n';}
                if(oso && !osok){
                    if(SOBCJ.test(code[i])){osf=false;osfk=true;}
                    if(osf && !osfk){codeObj[oty][pro][spro]+=code[i]+'\n';}
                    if(SOBJ.test(code[i])){spro=SOBJ.exec(code[i])[1];codeObj[oty][pro][spro]='';osf=true;osfk=false;}
                }
                if(OBJ.test(code[i])){pro=OBJ.exec(code[i])[1];codeObj[oty][pro]={};oso=true;osok=false;}
                if(CLOJ.test(code[i])){pro=FUN.exec(code[i])[1];codeObj[oty][pro]='';obf=true;obfk=false;}
            }
        }
        if(TRIM.test(code[i])){oc=true;}
        if(oc && TREN.test(code[i])){ock=true;oc=false;}
    }
    ja=false;ne=true;a=[];ii=-1;
    //collect data from canvas2d as text
    xqr=new XMLHttpRequest();
    xqr.onload=function(){response=xqr.responseText.replace(END,'\n').split('\n');};
    xqr.open('get',location?'../canvas2d.js':'https://rawgit.com/elbatico1/Canvas2d/master/canvas2d.js',false);
    xqr.send();
    //parse Data
    for(i=0;i<response.length;i++){
        if(response[i].indexOf('/**')>-1){
            a.push('');ja=true;ii++;
        }else if(response[i].indexOf('*/')>-1){
            ja=false;ne=true;
        }
        if(ja){
            a[ii]+=response[i];
        }else if(ne){
            a[ii]=a[ii].substr(4,a[ii].length);filter=/\w+/.exec(a[ii]);
            if(filter[0].indexOf('_')<0){c={};c[filter]=a[ii];b.push(c);}
            ne=false;
        }
    }
    a={};ii=-1;
    for(i=0;i<b.length;i++){
        for(o in b[i]){
            if(o in refList){
                ja=true;d=o;a[d]={};a[d][o]=b[i][o];numList.push(0);ii++;
            }else{
                if(ja){a[d][o]=b[i][o];numList[ii]+=1;}
            }
        }
    }b=[];
    //collect proper data for show
    function parseResult(e){
        var t=e.replace(ATX,"");
        var a=t.split(PRM);
        var c=[],d;
        for(var i=0;i<a.length;i++){
            if(i/2===parseInt(i/2)&&i!==0){
                switch(a[i-1]){
                    case '@type':
                        d=TYP.exec(a[i]);
                        c.push({r:a[i-1].substr(1,a[i-1].length),type:d[1],class:d[2]});
                        break;
                    case '@description':
                        d=DSC.exec(a[i]);
                        c.push({r:a[i-1].substr(1,a[i-1].length),description:d[1]});
                        break;
                    case '@param':
                        d=PAR.exec(a[i]);
                        c.push({r:a[i-1].substr(1,a[i-1].length),type:d[1],name:d[2],description:d[3]});
                        break;
                    case '@example':
                        d=EXA.exec(a[i]);
                        c.push({r:a[i-1].substr(1,a[i-1].length),example:d[1]});
                        break;
                    case '@returns':
                        d=RTR.exec(a[i]);
                        c.push({r:a[i-1].substr(1,a[i-1].length),type:d[1],name:d[2],description:d[3]});
                        break;
                    case '@link':
                        d=LNK.exec(a[i]);
                        c.push({r:a[i-1].substr(1,a[i-1].length),url:d[1]});
                        break;
                    case '@see':
                        d=SEE.exec(a[i]);
                        c.push({r:a[i-1].substr(1,a[i-1].length),target:d[1]});
                        break;
                    case '@property':
                        d=PRP.exec(a[i]);
                        c.push({r:a[i-1].substr(1,a[i-1].length),type:d[1],name:d[2],description:d[3]});
                        break;
                    default:
                        console.log('default',a[i-1]);
                        break;
                }
            }
        }
        return c;
    }
    //set background's element
    var infoLabel,infoRow,rowColor='gray',font='Lucida Grande,Helvetica,Verdana,Sans-serif',mainBackground=new Canvas2d.Sprite('backgrounds',false);
    var gradientMenu={color:['hsla(200,60%,90%,1)','hsla(180,10%,90%,0)'],offset:[0,1],coord:{x0:0,y0:0,r0:0,x1:0,y1:30,r1:0},type:'linear'};
    var backMenu=new Canvas2d.DisplayObjects('backmenu',false);backMenu.rect(0,0,width,40,'white');//mainBackground.add(backMenu);//backMenu.gradient=gradientMenu;
    infoRow=new Canvas2d.DisplayObjects('infonrow');
    infoRow.shape(0,0,[{moveTo:[0,-8],quadraticCurveTo:[6.5,0,0,8]}],null,rowColor,4,false);infoRow.lineCap='round';
    infoLabel=new Canvas2d.DisplayObjects('infolabel');
    infoLabel.text('open class',0,0,'normal',18,font,'gray',null,'left','middle');
    mainBackground.add(infoLabel);
    mainBackground.add(infoRow);
    mainDocs.add(mainBackground);
    //set background's element for refDocs
    var refLayer,refLayerHolder,refBackground,refLayerScroll=new Canvas2d.Sprite('reflayerscroll'),hook=new Canvas2d.DisplayObjects('hookbar');
    refLayer=new Canvas2d.Sprite('reflayer');refLayerHolder=new Canvas2d.Sprite('reflayerholder');refBackground=new Canvas2d.DisplayObjects('refbackground');
    refBackground.rect(0,0,refDocs.width,refDocs.height,'rgb(230,230,230)');
    //scroll handlers
    hook.rectRound(-4,0,12,40,6,'#cccccc');hook.x=10;hook.y=0;
    refLayerScroll.add(hook);refLayerScroll.visible=false;
    //refLayer.add(refBackground);
    refDocs.add(refLayer);refDocs.add(refLayerHolder);refDocs.add(refLayerScroll);refDocs.draw();
    hook.addEvent('dragstart',scrollRefs);hook.addEvent('drag',scrollRef);hook.addEvent('dragstop',scrollRefst);
    //set background's element for badgeDw
    var bLayerDw,bLayerDwS,bBackDw;
    bLayerDw=new Canvas2d.Sprite('badgelayerup');bLayerDwS=new Canvas2d.Sprite('badgelayerups');bBackDw=new Canvas2d.DisplayObjects('badgupbackground');
    bBackDw.shape(0,0,[{moveTo:[10,0]},{lineTo:[130,0]},{quadraticCurveTo:[138,2,140,10]},{lineTo:[140,300]},{lineTo:[0,300]},{lineTo:[0,10]},{quadraticCurveTo:[2,2,10,0]}],'white');
    bBackDw.y=h-40;bBackDw.x=10;bBackDw.shadow={color:'#CCCCCC',offsetX:0,offsetY:0,blur:10};
    bLayerDwS.add(bBackDw);
    badgeDw.add(bLayerDwS);badgeDw.add(bLayerDw);badgeDw.draw();
    //setting object based on parsed data text
    var dClass,dConstr,dConstrh,sConstr,sConstrh,menuBadge,wS,wSum=0,x,y;
    var sClass=new Canvas2d.Sprite('main_class');
    for(i=0;i<proList.length;i++){
        ii=a[proList[i]];
        dClass=new Canvas2d.DisplayObjects(proList[i]);
        dClass.text(proList[i],0,0,'bold',26,font,'#999999',null,'center','middle');dClass.paddingLeft=dClass.paddingTop=5;
        b.push(dClass);wS=i===0?b[0].width:b[i-1].width;wSum+=wS;dClass.x=wSum+(dClass.width/2)+(50*i)+50;dClass.y=20;
        c=360/numList[i];ia=0;dClass.addEvent('click',classOpen);dClass.addEvent('mouseover',dcOver);dClass.addEvent('mouseout',dcOut);
        //sConstr=new Canvas2d.Sprite('sub_'+proList[i]);
        var testDocs=document.getElementById('maindocs');
        sConstr=document.createElement('div');sConstr.style.position='absolute';testDocs.appendChild(sConstr);sConstr.style.zIndex=100;
        sConstrh=new Canvas2d.Sprite('subh_'+proList[i],false);
        for(o in ii){
            //set parameters text fields
            /*dConstr=new Canvas2d.DisplayObjects(i+'_'+o);
            dConstr.text(o,0,0,'lighter',16,font,'black',null,'left','bottom');dConstr.alpha=0;dConstr.paddingLeft=dConstr.paddingTop=4;
            dConstr.x=dClass.x;dConstr.y=dClass.y;dConstr.origin={x:dClass.x,y:dClass.y,set:false,parent:dClass};dConstr.dest={x:0,y:0,set:false};
            dConstr.addEvent('click',constrOpen);dConstr.addEvent('mouseover',coOver);dConstr.addEvent('mouseout',coOut);
            sConstr.add(dConstr);*/
            dConstrh=new Canvas2d.DisplayObjects(i+'h_'+o);
            dConstr=document.createElement('p');
            dConstr.id=i+'_'+o;
            dConstr.innerHTML=o;
            dConstr.style.position='absolute';
            dConstr.style.opacity='0';
            dConstr.style.lineHeight='-16px';
            dConstr.style.height='16px';
            dConstr.style.padding='0px';
            dConstr.style.margin='0px';
            dConstr.style.textAlign='left';
            dConstr.style.left=dClass.x+'px';
            dConstr.style.top=dClass.y+'px';
            dConstr.origin={x:dClass.x,y:dClass.y,set:false,parent:dClass,owner:sConstr,txt:o,ownertxt:proList[i]};dConstr.dest={x:0,y:0,set:false};
            addEvt(dConstr,'click',constrOpen);
            addEvt(dConstr,'mouseover',coOver);
            addEvt(dConstr,'mouseout',coOut);
            sConstr.appendChild(dConstr);
            //set lines for text fields to follow
            dConstrh.shape(0,0,[{'moveTo':[dClass.x,dClass.y]}, {'quadraticCurveTo':[dClass.x,dClass.y,dClass.x,dClass.y]}],null,'hsl('+(c*ia)+',100%,50%)',1.2,false);
            dConstrh.origin={x:dClass.x,y:dClass.y,set:false};dConstr.ref={x:25,y:h-15,txt:'',isopen:false,result:ii[o]};dConstrh.content=dConstr;dConstr.content=dConstrh;
            sConstrh.add(dConstrh);ia++;dConstrh.lineAlpha=0.3;
        }
        sConstr.style.display='none';dClass.content={dc:sConstr,dch:sConstrh,isopen:false,n:numList[i]};
        //mainDocs.add(sConstr);
        sClass.add(dClass);mainDocs.add(sConstrh);infoLabel.x=dClass.x+dClass.width;infoLabel.y=20;infoRow.x=infoLabel.x+infoLabel.width+10;infoRow.y=20;
    }
    //add everithings into mainDocs 'main stage'
    sConstr=new Canvas2d.Sprite('backgroundmenulayer',false);
    menuBadge=new Canvas2d.DisplayObjects('backgroundmenumoving',false);menuBadge.rectRound(0,-(dClass.height/2),dClass.width+10,36,20,'#dddddd');
    sConstr.add(menuBadge);menuBadge.x=dClass.x-(dClass.width/2)-5;menuBadge.y=dClass.y-3;menuBadge.alpha=0.5;
    mainDocs.add(sConstr);mainDocs.add(sClass);mainDocs.draw();
    //initialize Tweener
    var tween=new Canvas2d.Tweener(),currS=null,currC=null,togo=false,aEle,bEle;
    //function classes constructors
    function classOpen(e){
        aEle=e.target.content.dc.getElementsByTagName('p');bEle=e.target.content.dch.children;a=150;b=30;c=0;currC=null;
        if(!e.target.content.isopen){
            if(currS!==e&&currS!==null){
                if(currS.target.id!==e.target.id){
                    togo=e;classOpen(currS);return;
                }
            }
            //clearStart();
            e.target.content.isopen=true;tween.addTweener(infoLabel,{txt:'cutBack',alpha:0,duration:400,onEnd:info,data:{txt:e.target.txt,color:rowColor},onTween:null,onStart:labelStart});
            for(i=0;i<aEle.length;i++){
                if(!aEle[i].origin.set){
                    if(aEle[i].innerHTML in refList){
                        x=42;y=54-offY;
                    }else{
                        b=30*c;x=width-a;y=(e.target.y+50)+b;c++;
                    }
                    aEle[i].dest.x=x;aEle[i].dest.y=y-offY;
                }else{
                    x=aEle[i].dest.x;y=aEle[i].dest.y;
                }
                bEle[i].lineAlpha=0.3;bEle[i].lineWidth=1.2;aEle[i].style.color='black';
                //tween.addTweener(aEle[i],{x:x,y:y,duration:1000,ease:ease,alpha:1,delay:10*i,onStart:i===0?isVisible:null,data:{visible:true,e:e,togo:togo}});
                trans.addTweener(aEle[i],{left:x,top:y,duration:1000,ease:ease,opacity:1,delay:10*i,onStart:i===0?isVisible:null,data:{visible:'block',e:e,togo:togo}});
                tween.addTweener(bEle[i],{obj:{'1':{quadraticCurveTo:[x/4,y+120,x,y]}},duration:1000,ease:ease,delay:10*i});
                if(!aEle[i].origin.set){
                    if(b>(h/2)){
                        c=0;a+=140;
                    }
                    aEle[i].origin.set=true;
                }
            }
        }else{
            currS=e.target.id===togo.target.id?null:togo;closeAll();
            e.target.content.isopen=false;tween.addTweener(infoLabel,{txt:'cutBack',alpha:0,duration:400,onEnd:info,data:{txt:'open class',color:rowColor},onTween:null,onStart:labelStart});
            for(i=0;i<aEle.length;i++){
                if(aEle[i].ref.isopen){
                    aEle[i].ref.isopen=false;
                }
                x=aEle[i].origin.x;y=aEle[i].origin.y;
                //tween.addTweener(aEle[i],{scaleX:1,scaleY:1,x:x,y:y,duration:800,ease:'easeInBack',alpha:0,delay:10*(aEle.length-i),onEnd:i===0?isVisible:null,data:{visible:false,e:e}});
                trans.addTweener(aEle[i],{fontSize:16,left:x,top:y,duration:800,ease:'easeInBack',opacity:0,delay:10*(aEle.length-i),onEnd:i===0?isVisible:null,data:{visible:'none',e:e}});
                tween.addTweener(bEle[i],{obj:{'1':{quadraticCurveTo:[x,y,x,y]}},duration:800,ease:'easeInBack',delay:10*(aEle.length-i)});
            }
        }
    }
    function constrOpen(e){
        e.target.style.color='black';mainDocs.container.style.cursor='default';
        if(currC!==e&&currC!==null){
            if(currC.target.id!==e.target.id){
                constrOpen(currC);
            }else{
                tween.addTweener(infoLabel,{txt:'cutBack',alpha:0,duration:400,onEnd:info,data:{txt:e.target.origin.ownertxt,color:e.target.content.lineColor},onTween:null,onStart:labelStart});
            }
        }
        if(!e.target.ref.isopen){
            e.target.ref.isopen=true;x=e.target.ref.x;y=e.target.ref.y;currC=e;closeAll();
            tween.addTweener(infoLabel,{txt:'cutBack',alpha:0,duration:400,onEnd:info,data:{txt:e.target.origin.txt,color:e.target.content.lineColor},onTween:null,onStart:labelStart});
            //tween.addTweener(e.target,{scaleX:2,scaleY:2,x:x,y:y,duration:1000,ease:ease,data:true});
            trans.addTweener(e.target,{fontSize:32,left:x,top:y,duration:1000,ease:ease,data:true});
            tween.addTweener(e.target.content,{obj:{'1':{quadraticCurveTo:[x+250,y,x,y]}},lineWidth:2,lineAlpha:1,duration:1000,ease:ease,onEnd:constrEnd,data:{target:e.target}});

        }else{
            e.target.ref.isopen=false;x=e.target.dest.x;y=e.target.dest.y;currC=null;
            //tween.addTweener(e.target,{scaleX:1,scaleY:1,x:x,y:y,duration:800,ease:'easeInOutBack',data:false});
            trans.addTweener(e.target,{fontSize:16,left:x,top:y,duration:1000,ease:'easeInOutBack',data:false});
            tween.addTweener(e.target.content,{obj:{'1':{quadraticCurveTo:[x/2,y+100,x,y]}},lineWidth:1.2,lineAlpha:0.3,duration:900,ease:'easeInOutBack'});
        }
    }
    //mishellaneous
    function isVisible(e){
        e.target.origin.owner.style.display=e.data.visible;
        if(e.data.visible==='block'){
            currS=e.data.e;
            togo=currS;
        }else{
            if(currS!==e&&currS!==null){
                if(currS.target.id!==e.data.e.id){
                    classOpen(currS);
                }
            }
        }
    }
    function info(e){
        infoLabel.txt=e.data.txt;
        tween.addTweener(infoLabel,{txt:'cutFwd',alpha:1,duration:400,onEnd:backEnd,data:{color:e.data.color}});
    }
    function backEnd(e){
        tween.addTweener(infoRow,{lineColor:e.data.color,x:(e.target.x+e.target.width+10),scaleX:1,duration:300,ease:'easeOutBack'});
    }
    function labelTween(e){
        //infoRow.x=(e.target.x+e.target.width+20);
    }
    function labelStart(e){
        tween.addTweener(infoRow,{lineColor:e.data.color,x:e.target.x-10,scaleX:-1,duration:400,ease:ease});
    }
    function constrEnd(e){
        pushDescription(e.data.target.ref.result,e.data.target);
    }
    var z,idx=0,refField,pColors={r:"rgb(128,128,128)",type:"rgb(100,80,240)",class:"violet",description:"rgb(100,100,100)",name:"black",example:"rgb(200,50,50)",url:"slateblue",target:"gray"},fontWeight={name:'bold',type:'italic',class:'bold'};
    function pushDescription(c,t){
        a=parseResult(c);refLayerHolder.y=0;cleanLayer(refLayerHolder,tween);refDocs.draw();
        for(i=0;i<a.length;i++){
            idx=0;b=[];wS=0;wSum=0;
            for(o in a[i]){
                refField=new Canvas2d.DisplayObjects('para_'+o+'_'+a[i][o],false);
                refField.text(a[i][o],0,0,o in fontWeight?fontWeight[o]:'lighter',16,font,pColors[o],null,'left','hang');
                b.push(refField);wS=idx===0?25:b[idx-1].width;wSum+=wS;refField.x=wSum+(25*idx);refField.y=(20*i)+30;
                if(o==='url'){
                    refField.enabledEvent=true;
                    refField.addEvent('click',goToLink);
                }
                refLayerHolder.add(refField);refField.alpha=0;idx++;
            }
        }
        for( i=0;i<refLayerHolder.children.length;i++){
            tween.addTweener(refLayerHolder.children[i],{txt:'matrix',alpha:1,duration:300,ease:'easeInQuad',delay:5*i,onEnd:i===refLayerHolder.children.length-1?scrollVisible:null,data:{target:t}});
        }
    }
    function scrollVisible(e){
        pushExample(e.data.target.origin.ownertxt,e.data.target.origin.txt);
        idx=refLayerHolder.getBound();
        if(idx.height>refDocs.height){
            refLayerScroll.visible=true;
            hook.height=h*(h/(idx.height+(idx.height-h)));
            tween.addTweener(hook,{color:'black',duration:700,ease:'easeSine'});
        }
    }
    function pushExample(c,o){
        if(c in codeObj){
            if(o in codeObj[c]){
                if(typeof codeObj[c][o]==='string'){
                    //Code[c][o]('examples',width,300,[location]);
                    //codePre.innerHTML=codeObj[c][o];
                    //hljs.highlightBlock(codePre);
                    openNoOp([c,o],width,300,[location]);multyOpen=true;
                }else{
                    pushMultyOptions(c,o);
                }
            }else if(o.indexOf('ease')>-1){
                //Code[c].ease('examples',width,300,[location,o]);
                //codePre.innerHTML=codeObj[c].ease;
                //hljs.highlightBlock(codePre);
                openNoOp([c,'ease'],width,300,[location,o]);multyOpen=true;
            }else if(c===o){
                pushMultyOptions(c,'examples');
            }else if(o in methodsList){
                //Code.Common.method[o]('examples',width,300,[location,o]);console.log(o,c,codeObj,codeObj.Common);
                //codePre.innerHTML=codeObj.Common.method[o];
                //hljs.highlightBlock(codePre);
                openNoOp(['Common','method',o],width,300,[location,o]);multyOpen=true;
            }
        }
    }
    function pushMultyOptions(c,o){
        cleanLayer(bLayerDw,tween);
        idx=0;b=[];wS=0;wSum=0;
        refField=new Canvas2d.DisplayObjects('multy_title',false);
        refField.text('Examples',0,0,'bold',18,font,'black',null,'left','hang');
        bLayerDw.add(refField);refField.y=(20*idx)+30;refField.x=20;
        idx++;
        for(z in codeObj[c][o]){
            refField=new Canvas2d.DisplayObjects('multy_'+c+'_'+o+' '+z,true);
            refField.text(z,0,0,'lighter',16,font,'black',null,'left','hang');
            refField.y=(20*idx)+30;
            refField.x=20;refField.addEvent('click',pushMultyExample);
            refField.content={c:c,o:o,z:z,b:true};
            refField.addEvent('mouseover',bwOver);
            refField.addEvent('mouseout',bwOut);
            idx++;
            bLayerDw.add(refField);
        }
        bLayerDw.y=bBackDw.y+10;
        scaleMultyOptions(h-parseInt(bLayerDw.getBound().height)-40);bLayerDw.draw();
    }
    function scaleMultyOptions(h){
        tween.addTweener(bBackDw,{y:h,duratione:1000,ease:'easeOutQuint'});
        tween.addTweener(bLayerDw,{y:h+20,duratione:1000,ease:'easeOutQuint'});
    }
    function pushMultyExample(e){
        closeAll(true,e.target);
        
    }
    
    
    
    function scrollRefs(e){
        idx=refLayerHolder.getBound();
    }
    function scrollRef(e){
        if(idx.height>refDocs.height){
            e.target.y=e.mouse.oy>1&&e.mouse.oy<h-e.target.height?e.mouse.oy:e.target.y;
            refLayerHolder.y=-(((idx.height-h)/(h-hook.height))*(e.target.y));
            refDocs.draw();
        }
    }
    function scrollRefst(e){
        //console.log('stop');
    }
    function cleanLayer(l,t){
        hook.y=9;refLayerScroll.visible=false;
        if(l.children.length>0){
            for(i=l.children.length-1;i>=0;i--){
                t.removeTweener(l.children[i]);
            }
            for(i=l.children.length-1;i>=0;i--){
               l.remove(l.children[i]);
            }
        }
    }
    function goToLink(e){
        window.open(e.target.txt,'_blank');
    }
    function dcOver(e){
        mainDocs.container.style.cursor='pointer';
        e.target.color='#222222';
        e.target.parent.draw();
        tween.addTweener(menuBadge,{x:e.target.x-(e.target.width/2)-10,width:e.target.width+20,duration:700,ease:'easeOutQuint',onEnd:null});
    }
    function dcOut(e){
        mainDocs.container.style.cursor='default';
        e.target.color='#999999';
        e.target.parent.draw();
    }
    function coOver(e){
        mainDocs.container.style.cursor='pointer';
        e.target.style.color=e.target.content.lineColor;
        //e.target.parent.draw();
    }
    function coOut(e){
        mainDocs.container.style.cursor='default';
        e.target.style.color='black';
        //e.target.parent.draw();
    }
    function bwOver(e){
        badgeDw.container.style.cursor='pointer';
        e.target.color='lightblue';
        e.target.parent.draw();
    }
    function bwOut(e){
        badgeDw.container.style.cursor='default';
        e.target.color='black';
        e.target.parent.draw();
    }
    function closeAll(bol,e){window.rqanim.loop=[];
        if(e === undefined){cleanLayer(bLayerDw,tween);scaleMultyOptions(h-40);};
        xp=document.getElementById('examples');
        trans.addTweener(codePre,{opacity:0,duration:200,onEnd:codeToZero,data:{go:bol,target:e}});
        trans.addTweener(xp,{opacity:0,duration:300});
    }
    function codeToZero(e){
        examples.innerHTML='<div id="examples" style="opacity:0;"></div><div class="tempmessage1"><h1>EXAMPLE</h1></div>';
        if(e.data.go){
            window.rqanim.loop=[];
            codePre.innerHTML=codeObj[e.data.target.content.c][e.data.target.content.o][e.data.target.content.z];
            Code[e.data.target.content.c][e.data.target.content.o][e.data.target.content.z]('examples',e.data.target.content.z.indexOf('multy')>-1?(width/2)-40:width,300,[location]);
            hljs.highlightBlock(codePre);
            xp=document.getElementById('examples');
            trans.addTweener(codePre,{opacity:1,duration:300});
            trans.addTweener(xp,{opacity:1,duration:200});
        }else{
            cleanLayer(refLayerHolder,tween);refDocs.draw();
        }
    }
    function codeToOne(){
        cleanLayer(refLayerHolder,tween);refDocs.draw();
    }
    var codeToPush;
    function openNoOp(args,width,height,params){
        xp=document.getElementById('examples');
        if(args.length===3){
            Code[args[0]][args[1]][args[2]]('examples',width,height,params);
            codeToPush=codeObj[args[0]][args[1]][args[2]];
        }else{
            Code[args[0]][args[1]]('examples',width,height,params);
            codeToPush=codeObj[args[0]][args[1]];
        }
        codePre.innerHTML=codeToPush;
        hljs.highlightBlock(codePre);
        trans.addTweener(codePre,{opacity:1,duration:300});
        trans.addTweener(xp,{opacity:1,duration:200});
    }
}