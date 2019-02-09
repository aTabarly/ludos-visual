///////////////////////////////////////////////////////////////////////////////////////////
////////////////////  Bullet création.

(function (window) {

    var Bullet = function (tX, tY, numSerie, speed, centerX, centerY) {
        this.num = numSerie;

        this.speed = speed;
        this.width = 2;
        this.height = 2;

        this.hitBoxRadius = 3;

        this.posX = centerX - this.width / 2; /// Position initiale
        this.posY = centerY - this.height / 2;

        this.destinationX = tX; // point d'impact ?
        this.destinationY = tY;

        this.deltaX = this.destinationX - this.posX;
        this.deltaY = this.destinationY - this.posY;


    };

    Bullet.prototype.clean = function () {

        // TODO inversion
        bullets.list.splice(bullets.list.indexOf(this), 1);

        return this;
    };

    window.bulletShooted = function (tX, tY, numSerie, speed, scene) {
        return new Bullet(tX, tY, numSerie, speed, scene.centerX, scene.centerY);
    };

    window.bulletsFactory = function(){
        return {
        
            list: [],
    
            move: function () {
    
                for (var i = 0; this.list[i] != undefined; i++) {
    
                    var angle = Math.atan2(this.list[i].deltaY, this.list[i].deltaX);
    
                    // source exterieur
                    this.list[i].posX += Math.cos(angle) * this.list[i].speed;
                    this.list[i].posY += Math.sin(angle) * this.list[i].speed;
    
    
                }
            },
    
    
    
            draw: function (context) {
    
                for (var i = 0; this.list[i] != undefined; i++) {
    
                    context.beginPath();
    
                    context.arc(this.list[i].posX, this.list[i].posY, this.list[i].hitBoxRadius, 0, 2 * Math.PI);
    
                    context.fillStyle = 'rgb(161, 9, 9)';
                    context.fill();
    
                }
            },
    
        };
    };

}(window));