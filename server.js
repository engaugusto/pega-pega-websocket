var io = require('socket.io').listen(8052);
var done = false;
var qtdPlayer=0;

var objArray = [{
        num:1, imgName:'fyn.png',x:0,y:0,online:false
    },
    {
        num:2, imgName:'jake.png',x:0,y:0,online:false
    }
];

function sendNewP(){
    if(qtdPlayer == 1){
        return objArray[0];
    }else{
        return objArray[1];
    }
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
        socket.broadcast.emit('getUpdate', objArray);
    });

    socket.on('message', function () { });
    socket.on('disconnect', function () {
        //p1=false;
    });
});
