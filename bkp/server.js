var io = require('socket.io').listen(8052);
var qtdPlayer=0;

var objArray = [{
        num:1, imgName:'fyn.png',x:0,y:0,width:25,height:43
    },
    {
        num:2, imgName:'jake.png',x:100,y:50,width:21,height:43
    }
];

function sendNewP(){
    if(qtdPlayer == 1){
        return objArray[0];
    }else{
        return objArray[1];
    }
}

function colisaoPlayer(){
    if (objArray[0].x < objArray[1].x + objArray[1].width  && objArray[0].x + objArray[0].width  > objArray[1].x &&
                objArray[0].y < objArray[1].y + objArray[1].height && objArray[0].y + objArray[0].height > objArray[1].y) {
     // The objects are touching
     return true;
  }
  return false;
}   

io.sockets.on('connection', function (socket) {
    qtdPlayer++;

    socket.emit('getPlayers', objArray);
    socket.broadcast.emit('newP', sendNewP());

    socket.on('updateNet', function(data){
        //console.log('updateNet called');
        if(data.num == 1){
            objArray[0].x=data.x; 
            objArray[0].y=data.y;
       }
        else if(data.num == 2){
            objArray[1].x=data.x; 
            objArray[1].y=data.y;
        }
        var bolColisao = colisaoPlayer();
        if(bolColisao){
            socket.broadcast.emit('fimjogo');
            socket.emit('fimjogo');
        }
        socket.broadcast.emit('getUpdate', objArray);
    });

    socket.on('message', function () {});
    socket.on('disconnect', function () {
    });
});
