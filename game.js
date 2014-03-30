var canvas;
var context;
var width=800;
var height=600;
var ONE_FRAME_TIME = 1000 / 60;

//Web
//var sitePath = "http://localhost";
//File
var sitePath = "/Users/caugusto/Palestras&Cursos/game1/";
var imgPath = "/img/";

var objArray = new Array();

function loadPlayer(name, x,y,imgName){
    var imgObj = loadImg(imgName);
    var newP = new Player(name,context,imgObj,x,y);
    objArray.push(newP);
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

function start(){
    createCanvas();
    loadPlayer("fyn", 100,50, "fyn.png"); 
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("keydown", keyDownHandler, false);
}

function draw(){
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
    for(i;i<objArray.length;i++) {
        objArray[i].KeyPressed(keyPressed);
    }
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

function update(){
    //Tst();
    var i = 0;
    for(i;i<objArray.length;i++) {
        ScreenLoop(objArray[i]); 
        objArray[i].Update();
    }
}

function ready(event){
    console.log("DOM ready");
    start();
    var mainLoop = function(){
        clearDraw();
        update();
        draw();
    };
    setInterval(mainLoop, ONE_FRAME_TIME);
}

window.addEventListener('DOMContentLoaded', ready);

