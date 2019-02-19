(function(){
    'use strict';
    var invocation = false; // Un enemies est il en cours de création.

    var SPRITE = {
        WALKING: [
            {
                x: 0,
                y: 0,
                w: 62,
                h: 72
            }, {
                x: 62,
                y: 0,
                w: 62,
                h: 72
            }, {
                x: 124,
                y: 0,
                w: 62,
                h: 72
            }, {
                x: 186,
                y: 0,
                w: 62,
                h: 72
            }, {
                x: 249,
                y: 0,
                w: 62,
                h: 72
            }, {
                x: 310,
                y: 0,
                w: 62,
                h: 72
            }, {
                x: 372,
                y: 0,
                w: 62,
                h: 72
            }, {
                x: 434,
                y: 0,
                w: 62,
                h: 72
            }, {
                x: 495,
                y: 0,
                w: 62,
                h: 72
            }, {
                x: 560,
                y: 0,
                w: 62,
                h: 72
            }],

        DEAD: [{
            x: 7,
            y: 81,
            w: 115,
            h: 122
        }, {
            x: 790,
            y: 774,
            w: 59,
            h: 72
        }],
    };

    var createEnemies = function () {
        Zombi.counter = 0;

        function Zombi(maxSpeed, minSpeed, canvasWidth, canvasHeight) {
            this.num = 'zombi' + Zombi.counter++;

            this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;

            if (Math.random() > 0.49) {
                this.posX = Math.random() * (500) + canvasWidth;
                this.posY = Math.random() * (canvasHeight + 300) - 300;

            } else {
                this.posX = Math.random() * (-500);
                this.posY = Math.random() * (canvasHeight + 400) - 400;
            }

            this.hitBoxRadius = 20; // Option collision cercle.
            this.hitBoxX = this.posX - this.hitBoxRadius;
            this.hitBoxY = this.posY - this.hitBoxRadius;

            this.height = 40;
            this.width = 40;

            this.state = SPRITE.WALKING;

            this.hp = 4;
        };

        Zombi.prototype.isDead = function(){
            return this.state === SPRITE.DEAD;
        }

        Zombi.prototype.isWalking = function(){
            return this.state === SPRITE.WALKING;
        }

        Zombi.prototype.die = function(){
            this.state = SPRITE.DEAD;
        }

        var romero = function (maxSpeed, minSpeed, canvasWidth, canvasHeight) {
            return new Zombi(maxSpeed, minSpeed, canvasWidth, canvasHeight);
        };

        return romero;

    }();

    window.enemiesFactory = function(scene, player){
        var centerX = scene.centerX;
        var centerY = scene.centerY;

        return {
            die: function(zombieIndex){
                this.list.splice(zombieIndex, 1);
                player.score += 1;
                player.killCount += 1;
            },

            isWalking: function(zombieIndex) {
                return this.list[zombieIndex].isWalking();
            },

            isDead: function(zombieIndex) {
                return this.list[zombieIndex].isDead();
            },

            death: function () {

                for (var i = 0; this.list[i] !== undefined; i++) {
                    if (this.isDead(i)) {
                        this.die(i);
                    }
                }

            },

            list: [],
            // deadList: [], 

            move: function () {

                for (var i = 0; this.list[i] !== undefined; i++) {

                    if (this.list[i].state === SPRITE.WALKING) {

                        if (this.list[i].posX < player.posX) {
                            this.list[i].posX += this.list[i].speed;
                        }
                        if (this.list[i].posX > player.posX) {
                            this.list[i].posX -= this.list[i].speed;
                        }
                        if (this.list[i].posY < player.posY) {
                            this.list[i].posY += this.list[i].speed;
                        }
                        if (this.list[i].posY > player.posY) {
                            this.list[i].posY -= this.list[i].speed;
                        }

                    } else {
                        // console.log('les remorts ne bougent pas');
                    }

                }

            },

            speedMax: 6,
            speedMin: 0.1,
            spriteCounter: 0,

            draw: function (context) {

                if (SPRITE.WALKING[this.spriteCounter] === undefined) {
                    this.spriteCounter = 0;
                };


                for (var i = 0; this.list[i] !== undefined; i++) {

                    var zombie = this.list[i];
                    zombie.hitBoxX = zombie.posX - zombie.hitBoxRadius;
                    zombie.hitBoxY = zombie.posY - zombie.hitBoxRadius;

                    if (zombie.isWalking()) {
                        // enemies walking.

                        var c = this.spriteCounter;

                        var zDeltaX = centerX - zombie.hitBoxX; // difference X entre le zombi.
                        var zDeltaY = centerY - zombie.hitBoxY; //

                        var zAngle = Math.atan2(zDeltaY, zDeltaX);// L'angle en radians 

                        context.beginPath();

                        context.translate(zombie.posX, zombie.posY);

                        context.rotate(zAngle + 1.5);

                        context.drawImage(this.imgTest, SPRITE.WALKING[c].x, SPRITE.WALKING[c].y, SPRITE.WALKING[c].w, SPRITE.WALKING[c].h, -17, -12.5, 40, 40);

                        context.rotate(-zAngle - 1.5);


                        context.translate(-zombie.posX, -zombie.posY);

                    } else if (zombie.isDead()) {

                        context.drawImage(this.imgTest, SPRITE.DEAD[0].x, SPRITE.DEAD[0].y, SPRITE.DEAD[0].w, SPRITE.DEAD[0].h, zombie.posX - 20, zombie.posY - 20, 40, 40);

                    }

                }

            },

            imgTest: new Image(),

            init: function(imageSource){
                this.imgTest.src = imageSource;
                return this;
            },

            invoque: function () { // Methode qui crée de nouveaux zombis, avec un délai et un nombre maximum.
                var self = this;

                if (this.list.length < 100 && !invocation) { // param z nbr

                    invocation = true;

                    setTimeout(function () {
                        self.list[self.list.length] = createEnemies(self.speedMax, self.speedMin, scene.canvasWidth, scene.canvasHeight); // param
                        invocation = false;
                    }, 500);

                }
            }
        };
    };

})(window)