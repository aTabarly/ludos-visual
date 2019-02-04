/* A faire : 1 la souris DONE

1bis un Idle orienté vers le pointeur si joueur a l'arret ALMOST DONE.

1-2
requestframe Main Loop and Animation System.

2
le idle sprite pour tester la souris.

3 
tir / rajouter un sprite de feu de tir, à placer au niveau du canon du personnage
/ detruire les bullets qui quittent l'écran.
4 
enemy

5 
collision

6
map

7 
paththrought

8
les autres sprites

9
le site
*/


/* Mots Clés : responsive, souris, loop, redraw, player, started */



(function () {



    "use strict";


    //// Déclaration initiale canvas (+dimension) context .

    var canvas = window.document.querySelector('#game-canvas');

    var context = canvas.getContext('2d');

    var canvasHeight = canvas.height; // clientheight
    var canvasWidth = canvas.width; // clientWidth
    var centerX = canvasWidth / 2;
    var centerY = canvasHeight / 2;

    var facteurEchelle = 2;


    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// La souris. mouseEvent theMouse

    // canvas.addEventListener('mouseover', function (e) {
    //     if (started) {
    //         this.style.cursor = "none";
    //     }
    // });


    var theMouse = {
        draw: function () {

            context.beginPath();

            // context.rect(this.list[i].posX, this.list[i].posY, this.list[i].width, this.list[i].height);

            context.arc(this.xOnCanvas, this.yOnCanvas, 100, 0, 2 * Math.PI);

            context.fillStyle = 'rgba(236, 240, 221,0.1)';
            context.fill();

            context.beginPath();

            context.drawImage(player.imageTest, 90, 18, 249, 249, this.xOnCanvas - 25, this.yOnCanvas - 25, 50, 50);




        }
    };


    canvas.addEventListener('mousemove', function (e) {

        // console.log('mouse canvas coordonnées : ' + theMouse.angleCenter);



        theMouse.xOnCanvas = e.offsetX;
        theMouse.yOnCanvas = e.offsetY;

        theMouse.xCenterDelta = theMouse.xOnCanvas - centerX; // difference X entre le pointeur et le centre.
        theMouse.yCenterDelta = theMouse.yOnCanvas - centerY; // difference Y entre le pointeur et le centre.

        theMouse.angleCenter = Math.atan2(theMouse.yCenterDelta, theMouse.xCenterDelta);// L'angle en radians souris/ axe x centre

        // console.log(Math.sin(theMouse.angleCenter));

        context.beginPath();

        context.drawImage(player.imageTest, 90, 18, 249, 249, this.xOnCanvas - 25, this.yOnCanvas - 25, 50, 50);

    });



    // var shooting;
    var bulletCounter = 1;

    canvas.addEventListener('click', function (e) {

        if (started) {

            // console.log('target x y : ' + theMouse.xOnCanvas + '  ' + theMouse.yOnCanvas + ' list of bullet = ' + bullets.list);


            player.shoot();
        }

    });




    ///////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////  Bullet création.


    var bulletShooted = function () {

        var Bullet = function (tX, tY, numSerie, speed) {
            this.num = numSerie;

            this.speed = speed;
            this.width = 2;
            this.height = 2;

            this.hitBoxRadius = 2;

            this.state = bullets.sprite.fly;

            this.posX = centerX - this.width / 2; /// Position initiale
            this.posY = centerY - this.height / 2;

            this.destinationX = tX; // point d'impact ?
            this.destinationY = tY;

            this.deltaX = this.destinationX - this.posX;
            this.deltaY = this.destinationY - this.posY;


        };

        Bullet.prototype.clean = function () {

            bullets.list.splice(bullets.list.indexOf(this), 1);

            // bullets.list = bullets.list.filter(function(element, indx){
            //     return bullets.list[indx] != bullets.list.indexOf(this);
            // });



            return this;
        };


        var tir = function (a, b, c, d) {
            return new Bullet(a, b, c, d);
        };

        return tir;

    }();

    /////////////////// Gestion des balles.

    var bullets = {

        list: [],

        move: function () {

            for (var i = 0; this.list[i] != undefined; i++) {

                var angle = Math.atan2(this.list[i].deltaY, this.list[i].deltaX);

                // source exterieur
                this.list[i].posX += Math.cos(angle) * this.list[i].speed;
                this.list[i].posY += Math.sin(angle) * this.list[i].speed;


            }
            console.log(this.list.length);
        },



        draw: function () {

            for (var i = 0; this.list[i] != undefined; i++) {

                if (this.list[i].state === this.sprite.impact) {

                    // context.drawImage()

                }

                context.beginPath();

                // context.rect(this.list[i].posX, this.list[i].posY, this.list[i].width, this.list[i].height);

                context.arc(this.list[i].posX, this.list[i].posY, this.list[i].hitBoxRadius, 0, 2 * Math.PI);

                context.fillStyle = 'red';
                context.fill();

            }
        },
        sprite: {
            // fly: {
            //     x: 710,
            //     y: 0,
            //     w: 78,
            //     h: 52,
            // },
            impact: {
                x: 710,
                y: 0,
                w: 78,
                h: 52,
            }

        },
    };

    // var balls = bullets.list;




    ///////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////  DAS PLAYER

    var player = {

        posX: centerX,
        posY: centerY,

        hitBoxX: centerX - 20,
        hitBoxY: centerY - 20,
        height: 40,
        width: 40,
        hitBoxRadius: 20,

        speed: 2.5, // param

        ammo: 15, // param

        direction: {

            left: false,
            up: false,
            right: false,
            down: false,

        },

        shooting: false,

        updatePost: function () {

            if (player.shooting) {

                posture = player.spritePlayer.shoot;
            } else {

                if (this.direction.left || this.direction.up || this.direction.right || this.direction.down) {

                    posture = player.spritePlayer.move;

                } else {

                    posture = player.spritePlayer.idle;

                    // console.log('on est idle')

                }

            }

        },



        shoot: function () {

            if(this.ammo>0) {

            //if(this.ammo>0) {le code} else {code plus de balle + son click}
            player.shooting = true; /// TEST. passe à true pour le sprite

            bullets.list[bullets.list.length] = bulletShooted(theMouse.xOnCanvas, theMouse.yOnCanvas, bulletCounter, 30);

            console.log(bullets.list)
            bulletCounter++;

            this.ammo -= 1;

            // son gunshot

            setTimeout(function () {

                player.shooting = false;

            }, 250);

            } else {
                console.log('click');
            }


        },

        move: function () {
            var balls = bullets.list;


            if (posture === this.spritePlayer.move) {

                // Gauche
                if (this.direction.left) {
                    background.x -= this.speed;

                    for (var i = 0; balls[i] != undefined; i++) { // correction bullet en fonction du déplacement

                        balls[i].destinationX += this.speed * facteurEchelle; // *4 voir transformation du background.
                        balls[i].posX += this.speed * facteurEchelle; //test, envisager de caser la position de la bullet sur une référence du background
                    }
                    for (var i = 0; enemy.list[i] != undefined; i++) {

                        enemy.list[i].posX += this.speed * facteurEchelle;
                    }

                }

                // Haut
                if (this.direction.up) {
                    background.y -= player.speed;

                    for (var i = 0; balls[i] != undefined; i++) {

                        balls[i].destinationY += this.speed * facteurEchelle;
                        balls[i].posY += this.speed * facteurEchelle; //test, envisager de caser la position de la bullet sur une référence du background
                    }
                    for (var i = 0; enemy.list[i] != undefined; i++) {

                        enemy.list[i].posY += this.speed * facteurEchelle;
                    }
                }

                // Droite
                if (this.direction.right) {
                    background.x += this.speed;

                    for (var i = 0; balls[i] != undefined; i++) {

                        balls[i].destinationX -= this.speed * facteurEchelle;
                        balls[i].posX -= this.speed * facteurEchelle; //test, envisager de caser la position de la bullet sur une référence du background
                    }
                    for (var i = 0; enemy.list[i] != undefined; i++) {

                        enemy.list[i].posX -= this.speed * facteurEchelle;
                    }
                }

                // Bas
                if (this.direction.down) {
                    background.y += this.speed;

                    for (var i = 0; balls[i] != undefined; i++) {

                        balls[i].destinationY -= this.speed * facteurEchelle;
                        balls[i].posY -= this.speed * facteurEchelle; //test, envisager de caser la position de la bullet sur une référence du background
                    }
                    for (var i = 0; enemy.list[i] != undefined; i++) {

                        enemy.list[i].posY -= this.speed * facteurEchelle;
                    }
                }

            }

        },

        gameOver: function () {

            cancelAnimationFrame(stopMainLoop);
            setTimeout(clearing, 1000);
            started = false;
            console.log('GAME OVER');


        },

        score:0,

        spritePlayer: {

            idle: [{
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
            move: [{
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
            shoot: [{
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

        },

        imageTest: new Image(),

        draw: function (post) {

            // Bouclette sprite
            if (oldPosture != post || post[counter] === undefined) {
                counter = 0;
            };
            oldPosture = post;

            context.save();

            context.beginPath();

            // Dessin du sprite avec rotation vers la souris.
            // On décale le contexte au centre du canvas.
            context.translate(this.posX, this.posY);
            // On effectue une rotation qui nous aligne avec le pointeur de la souris.
            context.rotate(theMouse.angleCenter);
            // Dessin et positionement du sprite.
            context.drawImage(this.imageTest, post[counter].x, post[counter].y, post[counter].w, post[counter].h, -17, -12.5, 50, 25);
            // Repositionement du contexte. 
            context.rotate(-theMouse.angleCenter);
            context.translate(-this.posX, -this.posY);

            // Le cercle et le marqueur d'orientation.
            context.arc(this.posX, this.posY, this.hitBoxRadius, 0, 2 * Math.PI);
            context.moveTo(this.posX, this.posY);

            context.lineTo(this.posX + 20 * Math.cos(theMouse.angleCenter), this.posY + 20 * Math.sin(theMouse.angleCenter));

            context.strokeStyle = 'rgba(24, 185, 2, 1)';
            context.stroke();

            context.strokeStyle = 'green';
            context.strokeRect(this.hitBoxX, this.hitBoxY, this.width, this.height);

            context.fillStyle = 'rgba(100, 100, 100, 0.3)';
            context.fillRect(0, 0, canvasWidth, canvasHeight);


            context.restore();

            // counter++;

        },

    };



    //////////////////////////// FIN PLAYER ////////////////////////////////////////////////////////////

    //// Déclaration des variables boucler draw player.

    var counter = 0; // Compteur pour parcourir les postures.
    var posture = player.spritePlayer.idle; // Indique l'animation à jouer ex: spritePlayer.move/idle
    var oldPosture = posture;  // Référence à l'ancienne posture.

    player.imageTest.src = 'heroTest-withRotation.png';

    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// Background imgage.

    var initMapX = 340;
    var initMapY = 340;

    var background = {

        // Les limites de navigation sur le background.
        minX: 320,
        maxX: 1338,
        minY: 200,
        maxY: 772,

        x: initMapX,
        y: initMapY,
        width: canvasWidth / facteurEchelle, // Largeur sur le fichier source image. !!!!!!!!!!!!! Piste pour Responsive canvas
        height: canvasHeight / facteurEchelle, // Hauteur sur le fichier source image.

        map: new Image(),

        draw: function () {
            context.drawImage(this.map, this.x, this.y, this.width, this.height, 0, 0, canvasWidth, canvasHeight);

            // context.fillStyle = 'rgba(100, 100, 100, 0.5)'
            // context.fillRect( 0, 0, canvasWidth, canvasHeight);
        },


    };
    background.map.src = 'moon.png';


    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// Obstacle.

    var obstacle = {};



    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// Foe.

    var invocation = false; // Un enemy est il en cours de création.
    var enemyCounter = 0;

    var createEnemy = function () {

        var Zombi = function (maxSpeed, minSpeed) {

            this.num = 'zombi' + enemy.list.length;

            this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;

            this.posX = Math.random() * (500) + canvasWidth;
            this.posY = Math.random() * (canvasHeight + 300) - 300;

            this.hitBoxRadius = 20; // Option collision cercle.
            this.hitBoxX = this.posX - this.hitBoxRadius;
            this.hitBoxY = this.posY - this.hitBoxRadius;

            this.height = 40;
            this.width = 40;

            this.state = enemy.sprite.walking;

            this.hp = 4;


        };

        Zombi.prototype.die = function () {

            if (Math.random()>.9) {

                this.state = enemy.sprite.ammo;
                
            } else {
                enemy.list.splice(enemy.list.indexOf(this), 1);

            }

        };

        var romero = function (a, b) {
            return new Zombi(a, b);
        };

        return romero;

    }();



    var enemy = {

        list: [],

        deadList: [],

        move: function () {

            for (var i = 0; this.list[i] != undefined; i++) {

                if (this.list[i].state === enemy.sprite.walking) {

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


        spriteCounter: 0,

        draw: function () {

            if (this.sprite.walking[this.spriteCounter] === undefined) {
                this.spriteCounter = 0;
            };


            for (var i = 0; this.list[i] != undefined; i++) {

                this.list[i].hitBoxX = this.list[i].posX - this.list[i].hitBoxRadius;
                this.list[i].hitBoxY = this.list[i].posY - this.list[i].hitBoxRadius;

                if (this.list[i].state === enemy.sprite.walking) {
                    // Enemy walking.


                    var c = this.spriteCounter;


                    var zDeltaX = centerX - this.list[i].hitBoxX; // difference X entre le pointeur et le centre.
                    var zDeltaY = centerY - this.list[i].hitBoxY; // difference Y entre le pointeur et le centre.

                    var zAngle = Math.atan2(zDeltaY, zDeltaX);// L'angle en radians 

                    context.beginPath();

                    context.rect(this.list[i].hitBoxX, this.list[i].hitBoxY, this.list[i].width, this.list[i].height);

                    context.strokeStyle = 'orange'; // rgb

                    context.stroke();

                    context.beginPath();

                    context.translate(this.list[i].posX, this.list[i].posY);

                    context.rotate(zAngle + 1.5)

                    context.drawImage(this.imgTest, this.sprite.walking[c].x, this.sprite.walking[c].y, this.sprite.walking[c].w, this.sprite.walking[c].h, -17, -12.5, 40, 40);

                    context.rotate(-zAngle - 1.5)


                    context.translate(-this.list[i].posX, -this.list[i].posY);



                } else if (this.list[i].state === enemy.sprite.dead) {
                    // Enemy dead.

                    context.beginPath();

                    context.rect(this.list[i].hitBoxX, this.list[i].hitBoxY, this.list[i].width, this.list[i].height);

                    context.strokeStyle = 'pink'; // rgb

                    context.stroke();

                    context.beginPath();

                    context.drawImage(this.imgTest, this.sprite.dead[0].x, this.sprite.dead[0].y, this.sprite.dead[0].w, this.sprite.dead[0].h, this.list[i].posX - 20, this.list[i].posY - 20, 40, 40);


                } else {
                    // Enemy ammo.
                    context.beginPath();

                    context.drawImage(this.imgTest, this.sprite.ammo.x, this.sprite.ammo.y, this.sprite.ammo.w, this.sprite.ammo.h, this.list[i].posX - 20, this.list[i].posY - 20, 40, 40);

                }

            }


        },

        imgTest: new Image(),

        sprite: {
            walking: [
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

            dead: [{
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

            ammo: {
                x: 324,
                y: 116,
                w: 78,
                h: 71
            },
        },

        invoque: function () { // Methode qui crée de nouveaux zombis, avec un délai et un nombre maximum.

            if (this.list.length < 80 && !invocation) { // param z nbr

                invocation = true;

                setTimeout(function () {

                    enemy.list[enemy.list.length] = createEnemy(2, 0.1); // param

                    invocation = false;

                    // console.log(enemy.list[enemyCounter]);

                    enemyCounter++

                }, 500);

            }
        }

    };

    enemy.imgTest.src = 'finalFoe.png';

    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// Collision

    var collision = function () { // Fonction qui calcule toute les collisions.

        // Player vs Bordure. Renvoie le joueur dans l'aire de jeu. 
        if (background.x < background.minX) {

            background.x += player.speed + 2;
            // Et corrige la position des zombis, modifié par la méthode player.move.
            for (var i = 0; enemy.list[i] != undefined; i++) {

                enemy.list[i].posX -= player.speed * facteurEchelle + 6;

            }

        }
        if (background.x > background.maxX) {

            background.x -= player.speed + 2;

            for (var i = 0; enemy.list[i] != undefined; i++) {

                enemy.list[i].posX += player.speed * facteurEchelle + 6;

            }
        }
        if (background.y < background.minY) {

            background.y += player.speed + 2;

            for (var i = 0; enemy.list[i] != undefined; i++) {

                enemy.list[i].posY -= player.speed * facteurEchelle + 6;

            }
        }
        if (background.y > background.maxY) {

            background.y -= player.speed + 2;

            for (var i = 0; enemy.list[i] != undefined; i++) {

                enemy.list[i].posY += player.speed * facteurEchelle + 6;

            }
        }


        ////// Enemy vs Enemy vs Player. Une boucle parcour le tableau qui contient les références aux zombis.
        // On verifie s'il y a une collision avec une autre enemy ou le player.
        for (var i = 0; enemy.list[i] != undefined; i++) {

            enemy.list[i].hitBoxX = enemy.list[i].posX - enemy.list[i].hitBoxRadius;
            enemy.list[i].hitBoxY = enemy.list[i].posY - enemy.list[i].hitBoxRadius;


            // Enemy vs Enemy. Provoque un déplacement aléatoire.
            // On compare la position de chaque enemy avec les autres avec une boucle imbriquée.

            for (var j = 0; enemy.list[j] != undefined; j++) {

                enemy.list[j].hitBoxX = enemy.list[j].posX - enemy.list[j].hitBoxRadius;
                enemy.list[j].hitBoxY = enemy.list[j].posY - enemy.list[j].hitBoxRadius;


                if (enemy.list[i].state === enemy.sprite.walking && enemy.list[j].state === enemy.sprite.walking) { // Si les enemy sont 'vivant' ils peuvent entrer en collision.


                    var collisionX = i != j && enemy.list[i].hitBoxX < enemy.list[j].hitBoxX + enemy.list[j].width && enemy.list[i].hitBoxX + enemy.list[i].width > enemy.list[j].hitBoxX;

                    var collisionY = i != j && enemy.list[i].hitBoxY < enemy.list[j].hitBoxY + enemy.list[j].height && enemy.list[i].height + enemy.list[i].hitBoxY > enemy.list[j].hitBoxY


                    if (collisionX && collisionY) { // Si collision, on modifie leur position.



                        enemy.list[i].posX += Math.random() * (20) - 10;
                        enemy.list[i].posY += Math.random() * (20) - 10;

                        enemy.list[j].posX += Math.random() * (20) - 10;
                        enemy.list[j].posY += Math.random() * (20) - 10;

                        // console.log('on passe la avec : ' + enemy.list[i].num)


                    }
                }
            }
            // Z vs player. On compare la position de chaque enemy avec la position de player. 1 seule vie, la collision provoque le game over.

            if (enemy.list[i].hitBoxX < player.hitBoxX + player.width - 10 &&
                enemy.list[i].hitBoxX + enemy.list[i].width > player.hitBoxX + 10 &&
                enemy.list[i].hitBoxY < player.hitBoxY + player.height - 10 &&
                enemy.list[i].height + enemy.list[i].hitBoxY > player.hitBoxY + 10) {

                    if (enemy.list[i].state === enemy.sprite.walking) {

                        // player.gameOver();
        
                        console.log('GAME OVER');

                    } else if (enemy.list[i].state === enemy.sprite.ammo) {

                        player.ammo += 5; // param
                        return enemy.list.splice(enemy.list.indexOf(i), 1);

                    } else {

                        // return player.score +=5;

                    }




            }

            for (var j = 0; bullets.list[j] != undefined; j++) {

                if (enemy.list[i].state === enemy.sprite.walking) {

                    if (bullets.list[j].posX < enemy.list[i].hitBoxX + enemy.list[i].width && bullets.list[j].posX > enemy.list[i].hitBoxX && bullets.list[j].posY < enemy.list[i].hitBoxY + enemy.list[i].height && bullets.list[j].posY > enemy.list[i].hitBoxY) {
                        console.log('la balle touche');

                        enemy.list[i].state = enemy.sprite.dead; // On change le sprite du zombi.

                        setTimeout(function(){
                            enemy.list[i].die();
                        },2000);

                        return bullets.list[j].clean(); // On supprime la bullet en supprimant son référencement.


                    }

                }



            }

            //////



        }

        // Z vs player. 1 seule vie, provoque le game over.

        // for (var i = 0; enemy.list[i] != undefined; i++) {


        //     enemy.list[i].hitBoxX = enemy.list[i].posX - enemy.list[i].hitBoxRadius + 10;
        //     enemy.list[i].hitBoxY = enemy.list[i].posY - enemy.list[i].hitBoxRadius + 10;

        //     // if (enemy.list[i].state === enemy.sprite.walking && enemy.list[i].hitBoxX < player.hitBoxX + player.width - 10 &&
        //     //     enemy.list[i].hitBoxX + enemy.list[i].width > player.hitBoxX + 10 &&
        //     //     enemy.list[i].hitBoxY < player.hitBoxY + player.height - 10 &&
        //     //     enemy.list[i].height + enemy.list[i].hitBoxY > player.hitBoxY + 10) {

        //     //     // player.gameOver();

        //     //     console.log('GAME OVER');

        //     // }
        // }


        //// Z vs bullet. Le Z explose. On compare la position de chaque bullet avec la position de chaque zombi 'vivant'. 

        // for (var i = 0; bullets.list[i] != undefined; i++) {

        //     for (var j = 0; enemy.list[j] != undefined; j++) {

        //         if (enemy.list[j].state === enemy.sprite.walking) {

        //             if (bullets.list[i].posX < enemy.list[j].posX + enemy.list[j].width && bullets.list[i].posX > enemy.list[j].posX && bullets.list[i].posY < enemy.list[j].posY + enemy.list[j].height && bullets.list[i].posY > enemy.list[j].posY) {
        //                 console.log('la balle touche');

        //                 enemy.list[j].state = enemy.sprite.dead; // On change son sprite.

        //                 return bullets.list[i].clean(); // On supprime la bullet en supprimant toute référence.


        //             }

        //         }


        //     }

        // }

    };

    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// Refresh loop / Main loop 

    var started = false; // Booleen le jeu est il lancé, Change avec fonction start.
    var stopMainLoop = 0; // On stop le request animation frame de la boucle principale.
    var timeBase;
    var timeBase2;


    var mainLoop = function (tFrame) {

        var balls = bullets.list;


        if (!timeBase || !timeBase2) { // On initialise les timestamps pour la première exécution.
            timeBase = tFrame;
            timeBase2 = tFrame;
        }


        //// To do every 40.
        // console.log(' DELTA TIME : ' + (tFrame - timeBase));

        if ((tFrame - timeBase) >= 40) {

            timeBase = tFrame; // On réinitialise la valeur de timeBase pour le prochain passage.
            // clear
            clearing();

            // drawbackground
            background.draw();

            if (balls.length > 0) { // Si une balle est active on la déplace/dessine.
                bullets.move();
                bullets.draw();
            }

            //// Animation Player
            player.updatePost();
            player.draw(posture);
            player.move();

            // idle
            // console.log(posture)
            // move


            // Enemy. 

            if (enemy.list.length > 0) { // Si un enemy est actif on le déplace/dessine.

                enemy.move();
                enemy.draw();
            }


            enemy.invoque(); // On crée un enemy.

            // The mouse
            theMouse.draw();


            // Check collision.
            collision();




        };

        // Incrementation du compteur pour boucler sur les sprites.
        if ((tFrame - timeBase2) >= 200) {
            timeBase2 = tFrame;
            counter++;
            enemy.spriteCounter ++;



            if (bullets.list.length > 0) {

                console.log(bullets.list[0].destinationX + " impact " + bullets.list[0].destinationY);
            }

        };


        //// On boucle.
        if (started) {

            stopMainLoop = window.requestAnimationFrame(mainLoop);

        };
    };
















    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////// Nettoyage.


    // Canvas.
    var clearing = function () {


        context.clearRect(0, 0, canvasWidth, canvasHeight);
    };



    ///////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////  START / PAUSE 

    // on lance

    var start = function () {
        started = true;
        mainLoop();

    };

    var boutonStartPause = window.document.querySelector('h1');



    boutonStartPause.addEventListener('click', function () {

        console.log('on click sur start')

        if (started) {
            cancelAnimationFrame(stopMainLoop);
            started = false;
            console.log('ON STOOOOOOP')
        } else {
            start();
            console.log('STARTED = ' + started);

        }

    });



    ///////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////  Key Key
    // On change les directions actives pour le player. Si une touche est enfoncée ou relachée.

    window.addEventListener('keydown', function (event) {

        var code = event.keyCode;


        switch (code) {



            case 37: //////////////////////// gauche    
                //*instructions*


                player.direction.left = true;

                break;



            case 38: //////////////////////////// haut
                //instructions


                player.direction.up = true;

                break;


            case 39: ///////////////////////// droite
                //instructions


                player.direction.right = true;


                break;


            case 40: /////////////////// bas
                //instructions


                player.direction.down = true;


                break;

        };

    });

    window.addEventListener('keyup', function (event) {


        var code = event.keyCode;


        switch (code) {



            case 37: //////////////////////// gauche
                //*instructions*

                player.direction.left = false;


                break;


            case 38: //////////////////////////// haut
                //instructions

                player.direction.up = false;


                break;


            case 39: ///////////////////////// droite
                //instructions

                player.direction.right = false;

                break;


            case 40: /////////////////// bas
                //instructions

                player.direction.down = false;


                break;


        };

    });
    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// 



    ///////////// Blocage : scroll + clique gauche

    canvas.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    window.addEventListener('dblclick', function (e) {
        e.preventDefault();
    });


    window.addEventListener('keydown', function (e) {
        // Espace et arrow keys.
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

})();