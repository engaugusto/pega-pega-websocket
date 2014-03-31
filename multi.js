var socket = io.connect('http://localhost:8052/');

var NetPlayers = {};
updateNetMyself = function(obj){ 
    socket.emit('updateNet', {
        num: obj.name,
        x: obj.x,
        y: obj.y,
        online: true
    }); 
}
var objMultiRet;
var objNewP;

getUpdateNet = function(){
   return objMultiRet;
}

NewPlayerConnected= function(data){
    newPlayer(data);
}

socket.on('connect', function () {

    socket.on('getUpdate', function(objData){
        objMultiRet = objData;
    });
   
    socket.on('newP', function(data){
        NewPlayerConnected(data);
    });

    socket.on('getPlayers', function (data) {
        // my msg
        NetPlayers = data;
        //start the game after anyone connect
        ready();
     });
});
