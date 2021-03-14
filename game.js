var canvas;
var context;
var width=800;
var height=600;
var ONE_FRAME_TIME = 1000 / 60;
var fimJogo = false;
var p1ou2=0;//0-indefinido, 1-p1,2-p2

//Web
//var sitePath = "http://localhost";
//File
//"/Users/caugusto/Palestras&Cursos/game1/";
var sitePath = "";
var imgPath = "/img/";

var objArray = new Array();

var arrayImg = [];

//*****************************
//     Engine
//*****************************
function addImg(name){
    var i=0;
    if(arrayImg.length == 0)
        arrayImg.push(loadImg(name));
    for(i;i<arrayImg.length;i++){
        if(arrayImg[i].src.search(name) != -1)
            return arrayImg[i];
    }
    var imgLoaded = loadImg(name);
    arrayImg.push(imgLoaded);
    return imgLoaded;
}
function loadImg(name){
    var fileName = sitePath+imgPath+name;
    var imageObj = new Image();
    imageObj.src=fileName;
    return imageObj;
}
function createCanvas(){
   canvas = document.createElement('canvas');
   canvas.id="mainLayer";
   canvas.width=width;
   canvas.height=height;
   canvas.style.border="1px solid";
   document.body.appendChild(canvas);
   context = canvas.getContext('2d');
}



//*****************************
//     Aux. ao jogo
//*****************************
function loadPlayer(name, x,y,imgName){
    var imgObj = addImg(imgName);
    var newP = new Player(name,context,imgObj,x,y);
    objArray.push(newP);
}

function keyUpHandler(event){
    var keyPressed = String.fromCharCode(event.keyCode);
    var i = 0;
    for(i;i<objArray.length;i++) {
        objArray[i].KeyRelease(keyPressed);
    }
}

function keyDownHandler(event){
    var keyPressed = String.fromCharCode(event.keyCode);
    var i = 0;
    //for(i;i<objArray.length;i++) {
    objArray[p1ou2].KeyPressed(keyPressed);
      //  objArray[i].KeyPressed(keyPressed);
    //}
}

function ScreenLoop(obj){
    var x = obj.getX();
    var y = obj.getY();
    if(x<0)
        x = width;
    if(x>width)
        x = 0;
    if(y<0)
        y=height;
    if(y>height)
        y=0;
    obj.setPos(x,y);
    
}

function newPlayer(data){
    p1ou2 = 1;
    if(data.num == 1)
        p1ou2=0;
    loadPlayer(data.num, data.x, data.y, data.imgName);
}

//*****************************
//     Update
//*****************************
function draw(){
    if(fimJogo){
        clearDraw();
        drawFimJogo();
        return;
    }
    var i = 0;
    for(i;i<objArray.length;i++) {
        objArray[i].Draw();
    }
}

function clearDraw(){
    // Store the current transformation matrix
    context.save();

    // Use the identity matrix while clearing the canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    context.restore();
}

function drawFimJogo(){
   var imgName = "you_lose.png";
   if(p1ou2==1){
        imgName="you_win.png";
   }
   var img = addImg(imgName);
   if(typeof(img) == 'undefined')
        return;
   context.drawImage(
        img,
        20,
        20
   );
}

//*****************************
//     Update
//*****************************
function netUpdate(){
    fimJogo = getFimJogo();
    if(fimJogo){
       return; 
    }
    var newObjArray = getUpdateNet(); 
    var i = 0;
    //updating myself
    var objSend = {
        name: objArray[p1ou2].getName(),
        x: objArray[p1ou2].getX(),
        y: objArray[p1ou2].getY()
    };
    var j=0;
    if(newObjArray != null){
       for(i;i<objArray.length;i++){
          for(j=0;j<newObjArray.length;j++){
             if(i != p1ou2 
                 && objArray[i].getName() == newObjArray[j].num){
                 objArray[i].setPos(newObjArray[j].x,newObjArray[j].y);
             }
          }
       }
    }
    updateNetMyself(objSend);
}

function update(){
    if(fimJogo)
        return;
    var i = 0;
    for(i;i<objArray.length;i++) {
        ScreenLoop(objArray[i]); 
        objArray[i].Update();
    }
    netUpdate();
}

//*****************************
//     Ready !
//*****************************
function start(){
    createCanvas();
    if(NetPlayers == null)
        return;
    if(NetPlayers.length > 1){
        var i =0;
        var netP;
        for(i;i<NetPlayers.length;i++){
            netP = NetPlayers[i];
            loadPlayer(netP.num,netP.x,netP.y, netP.imgName);
        } 
    }
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("keydown", keyDownHandler, false);
}

ready = function(event){
    console.log("DOM ready");
    
    start();
    var mainLoop = function(){
        clearDraw();
        update();
        draw();
    };
    setInterval(mainLoop, ONE_FRAME_TIME);
}

//window.addEventListener('DOMContentLoaded', ready);

