// Para jogar em rede ou pela internet trocar o IP abaixo pelo da sua maquina ou do HOST
// Se for online a porta 8052 tem que estar liberada no pc que vai rodar server
var socket = io.connect('http://localhost:8052/');
var fimjogo = false;

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

getFimJogo = function(){
    return fimjogo;
}

socket.on('connect', function () {

    socket.on('getUpdate', function(objData){
        objMultiRet = objData;
    });
   
    socket.on('newP', function(data){
        NewPlayerConnected(data);
    });

    socket.on('fimjogo', function(){
       fimjogo=true; 
    });

    socket.on('getPlayers', function (data) {
        // my msg
        NetPlayers = data;
        //start the game after anyone connect
        ready();
     });
});
