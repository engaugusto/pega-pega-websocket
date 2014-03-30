//player.js
var Player = (function(){
    var _context;
    var _image;
    var _x,_y;
    var _name;
    var _key;
    var _speed;
    var _keyRelease;
    var _dx,dy;
    function Player(name,context,image, x,y){
        this._name=name;
        this._x=x;
        this._y=y;
        this._context=context;
        this._image = image;
        this._release = false;
        
        this._dx = this._dy = 0;

        this._speed = 3;
    }
    Player.prototype.KeyPressed = function(key){
        this._key=key;
        this._release = false;
        //eixo X,Y com 0,0 a esquerda e acima
        switch(this._key){
            case 'W':
               this._dy =  -this._speed; 
            break;
            case 'A':
               this._dx = -this._speed; 
            break;
            case 'S':
               this._dy = this._speed; 
            break;
            case 'D':
               this._dx = this._speed; 
            break;
        }
    }
    Player.prototype.KeyRelease = function(key){
       if(key == "W"
        || key=="S"){
            this._dx = 0;
        }else if(key == "A"
        || key=="D"){
            this._dy = 0;
        }
       this._key=""; 
    }
    Player.prototype.Draw = function(){
       this._context.drawImage(this._image,this._x,this._y); 
    }
    Player.prototype.Update = function(){
        if(this._release == false){
            this._x += this._dx;
            this._y += this._dy;
        }
    }
    Player.prototype.getX = function(){
        return this._x;
    }
    Player.prototype.getY = function(){
        return this._y;
    }
    Player.prototype.setPos = function(x,y){
        this._x = x;
        this._y = y;
    }
    return Player;
})();
