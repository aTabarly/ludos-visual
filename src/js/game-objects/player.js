(function(window){

    'use strict';

// On ouvre le feu avec clique gauche ou space
var bulletCounter = 1;

var SPRITE_PLAYER = {
    IDLE: [{
        x: 831,
        y: 0,
        w: 77,
        h: 52,
    }, {
        x: 938,
        y: 65,
        w: 77,
        h: 52,
    }, {
        x: 937,
        y: 0,
        w: 77,
        h: 52,
    }],
    MOVE: [{
        x: 937,
        y: 0,
        w: 77,
        h: 52
    }, {
        x: 936,
        y: 65,
        w: 78,
        h: 52
    }, {
        x: 937,
        y: 137,
        w: 78,
        h: 52
    }, {
        x: 937,
        y: 207,
        w: 78,
        h: 52
    }, {
        x: 937,
        y: 276,
        w: 78,
        h: 52
    }, {
        x: 939,
        y: 343,
        w: 78,
        h: 52
    }, {
        x: 937,
        y: 409,
        w: 78,
        h: 52
    }, {
        x: 937,
        y: 465,
        w: 78,
        h: 52
    }],
    SHOOT: [{
        x: 712,
        y: 300,
        w: 116,
        h: 50
    }, {
        x: 712,
        y: 420,
        w: 116,
        h: 50
    }
    ],

};

window.playerFactory = function(scene, bulletShooted){
    var facteurEchelle = scene.facteurEchelle;
    var canvasWidth = scene.canvasWidth;
    var canvasHeight = scene.canvasHeight;

    return {

        posture: SPRITE_PLAYER.IDLE, // Indique l'animation à jouer ex: spritePlayer.move/idle
        oldPosture: SPRITE_PLAYER.IDLE,
        postureCounter: 0, // Compteur pour parcourir les postures.

        posX: scene.centerX,
        posY: scene.centerY,

        hitBoxX: scene.centerX - 20,
        hitBoxY: scene.centerY - 20,
        height: 40,
        width: 40,
        hitBoxRadius: 20,

        speed: 7, // param
        fireRate: 175,
        fullAuto: false,

        direction: {

            left: false,
            up: false,
            right: false,
            down: false,

        },

        shooting: false,

        updatePost: function () {

            if (this.shooting) {

                this.posture = SPRITE_PLAYER.SHOOT;
            } else {

                if (this.direction.left || this.direction.up || this.direction.right || this.direction.down) {

                    this.posture = SPRITE_PLAYER.MOVE;

                } else {

                    this.posture = SPRITE_PLAYER.IDLE;

                }

            }

        },



        shoot: function (bullets, theMouse) {

            var self = this;
            self.fullAuto = true;

            self.shooting = true; /// TEST. passe à true pour le sprite

            bullets.list[bullets.list.length] = bulletShooted(theMouse.xOnCanvas, theMouse.yOnCanvas, bulletCounter, 30, scene);

            bulletCounter++;

            // son gunshot
            setTimeout(function () {
                self.fullAuto = false;
            }, self.fireRate);

            setTimeout(function () {
                self.shooting = false;
            }, 250);
        },

        killCount: 0,

        move: function (bullets, floppyDisks, background, enemies) {
            var balls = bullets.list;
            var disk = floppyDisks.list;

            if (this.posture === SPRITE_PLAYER.MOVE) {

                // Gauche
                if (this.direction.left) {
                    background.x -= this.speed;

                    for (var i = 0; balls[i] !== undefined; i++) { // correction bullet en fonction du déplacement

                        balls[i].destinationX += this.speed * facteurEchelle; // *4 voir transformation du background.
                        balls[i].posX += this.speed * facteurEchelle; //test, envisager de caser la position de la bullet sur une référence du background
                    }
                    for (var i = 0; enemies.list[i] !== undefined; i++) {

                        enemies.list[i].posX += this.speed * facteurEchelle;
                    }
                    for (var i = 0; disk[i] !== undefined; i++) {
                        disk[i].posX += this.speed * facteurEchelle;
                    }

                }

                // Haut
                if (this.direction.up) {
                    background.y -= this.speed;

                    for (var i = 0; balls[i] !== undefined; i++) {

                        balls[i].destinationY += this.speed * facteurEchelle;
                        balls[i].posY += this.speed * facteurEchelle; //test, envisager de caser la position de la bullet sur une référence du background
                    }
                    for (var i = 0; enemies.list[i] !== undefined; i++) {

                        enemies.list[i].posY += this.speed * facteurEchelle;
                    }
                    for (var i = 0; disk[i] !== undefined; i++) {
                        disk[i].posY += this.speed * facteurEchelle;
                    }
                }

                // Droite
                if (this.direction.right) {
                    background.x += this.speed;

                    for (var i = 0; balls[i] !== undefined; i++) {

                        balls[i].destinationX -= this.speed * facteurEchelle;
                        balls[i].posX -= this.speed * facteurEchelle; //test, envisager de caser la position de la bullet sur une référence du background
                    }
                    for (var i = 0; enemies.list[i] !== undefined; i++) {

                        enemies.list[i].posX -= this.speed * facteurEchelle;
                    }
                    for (var i = 0; disk[i] !== undefined; i++) {
                        disk[i].posX -= this.speed * facteurEchelle;
                    }
                }

                // Bas
                if (this.direction.down) {
                    background.y += this.speed;

                    for (var i = 0; balls[i] !== undefined; i++) {

                        balls[i].destinationY -= this.speed * facteurEchelle;
                        balls[i].posY -= this.speed * facteurEchelle; //test, envisager de caser la position de la bullet sur une référence du background
                    }
                    for (var i = 0; enemies.list[i] !== undefined; i++) {

                        enemies.list[i].posY -= this.speed * facteurEchelle;
                    }
                    for (var i = 0; disk[i] !== undefined; i++) {
                        disk[i].posY -= this.speed * facteurEchelle;
                    }
                }

            }

        },

        score: 0,

        imageTest: null,

        init: function(imageSource) {
            var image = new Image()
            image.src = imageSource;
            this.imageTest = image;
            return this;
        },

        draw: function (context, theMouse) {
            var currentPosture = this.posture[this.postureCounter];

            // Bouclette sprite
            if (this.oldPosture !== this.posture || currentPosture === undefined) {
                this.postureCounter = 0;
            };
            this.oldPosture = this.posture;

            context.save();

            context.beginPath();

            // Dessin du sprite avec rotation vers la souris.
            // On décale le contexte au centre du canvas.
            context.translate(this.posX, this.posY);
            // On effectue une rotation qui nous aligne avec le pointeur de la souris.
            context.rotate(theMouse.angleCenter);
            // Dessin et positionement du sprite.
            context.drawImage(this.imageTest, currentPosture.x, currentPosture.y, currentPosture.w, currentPosture.h, -17, -12.5, 50, 25);
            // Repositionement du contexte. 
            context.rotate(-theMouse.angleCenter);
            context.translate(-this.posX, -this.posY);

            context.fillStyle = 'rgba(100, 100, 100, 0.1)';
            context.fillRect(0, 0, canvasWidth, canvasHeight);

            context.restore();
        },

    };
};

})(window)