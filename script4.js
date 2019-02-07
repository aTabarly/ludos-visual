(function () {
    "use strict";
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Welcome to the canvas

    //// Déclaration initiale canvas (+dimension) context .

    var canvas = window.document.querySelector('#game-canvas');

    var context = canvas.getContext('2d');

    var canvasHeight = canvas.height; // clientheight
    var canvasWidth = canvas.width; // clientWidth
    var centerX = canvasWidth / 2;
    var centerY = canvasHeight / 2;

    var facteurEchelle = 2;

    var divInstruction = window.document.getElementById('instruction');
    var h2Resultat =  window.document.getElementById('resultat');

    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// La souris. mouseEvent theMouse

    canvas.addEventListener('mouseover', function (e) {
        if (started) {
            this.style.cursor = "none";
        }
    }, false);


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

    }, false);



    // On ouvre le feu avec clique gauche ou space
    var bulletCounter = 1;


    canvas.addEventListener('mousedown', function (e) {

        if (started) {

            player.shoot();
        }

    }, false);

    window.document.addEventListener('keydown', function (e) {

        if (started && e.keyCode === 32 && !player.fullAuto) {

            player.shoot();
        }

    }, false);



    ///////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////  Bullet création.


    var bulletShooted = function () {

        var Bullet = function (tX, tY, numSerie, speed) {
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

            bullets.list.splice(bullets.list.indexOf(this), 1);

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

                context.beginPath();

                context.arc(this.list[i].posX, this.list[i].posY, this.list[i].hitBoxRadius, 0, 2 * Math.PI);

                context.fillStyle = 'rgb(161, 9, 9)';
                context.fill();

            }
        },

    };


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

            player.fullAuto = true;

            player.shooting = true; /// TEST. passe à true pour le sprite

            bullets.list[bullets.list.length] = bulletShooted(theMouse.xOnCanvas, theMouse.yOnCanvas, bulletCounter, 30);

            console.log(bullets.list)
            bulletCounter++;


            // son gunshot
            setTimeout(function () {

                player.fullAuto = false;

            }, player.fireRate);



            setTimeout(function () {

                player.shooting = false;

            }, 250);

        },

        killCount: 0,

        move: function () {
            var balls = bullets.list;
            var disk = floppyDisks.list;


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
                    for (var i = 0; disk[i] != undefined; i++) {
                        disk[i].posX += this.speed * facteurEchelle;
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
                    for (var i = 0; disk[i] != undefined; i++) {
                        disk[i].posY += this.speed * facteurEchelle;
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
                    for (var i = 0; disk[i] != undefined; i++) {
                        disk[i].posX -= this.speed * facteurEchelle;
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
                    for (var i = 0; disk[i] != undefined; i++) {
                        disk[i].posY -= this.speed * facteurEchelle;
                    }
                }

            }

        },

        gameOver: function () {

            window.document.getElementById('btncv').style.display = 'inline';
            canvas.style.display = 'none';
            divInstruction.style.display = 'inline-block';
            
            h2Resultat.style.display = 'inline';
            h2Resultat.innerText = 'GAME - OVER';
            h2Resultat.style.color = 'rgb(167, 4, 4)';
            

            communication('dead');
            cancelAnimationFrame(stopMainLoop);
            setTimeout(clearing, 1000);
            started = false;
            console.log('GAME OVER');
            restart();


        },

        score: 0,

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
            /*context.arc(this.posX, this.posY, this.hitBoxRadius, 0, 2 * Math.PI);
            context.moveTo(this.posX, this.posY);

            context.lineTo(this.posX + 20 * Math.cos(theMouse.angleCenter), this.posY + 20 * Math.sin(theMouse.angleCenter));

            context.strokeStyle = 'rgba(24, 185, 2, 1)';
            context.stroke();

            context.strokeStyle = 'green';
            context.strokeRect(this.hitBoxX, this.hitBoxY, this.width, this.height);

*/
            context.fillStyle = 'rgba(100, 100, 100, 0.1)';
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

    player.imageTest.src = 'src/img/player.png';

    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// Background imgage.

    var initMapX = 340;
    var initMapY = 340;

    var background = {

        // Les limites de navigation sur le background.
        minX: 110,
        maxX: 2320,
        minY: 110,
        maxY: 1160,

        x: initMapX,
        y: initMapY,
        sourceWidth: canvasWidth / facteurEchelle, // Largeur sur le fichier source image. 
        sourceHeight: canvasHeight / facteurEchelle, // Hauteur sur le fichier source image.

        map: new Image(),


        draw: function () {

            context.drawImage(this.map, this.x, this.y, this.sourceWidth, this.sourceHeight, 0, 0, canvasWidth, canvasHeight);


        },

    };

    background.map.src = 'src/img/moonWFog.png';



    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// Disquette.

    var randomPos = function (axe) {
        var value;

        if (axe === 'x') {

            value = Math.random() * (2400) +100;

            return value;
        }

        if (axe === 'y') {

            value = Math.random() * (1400) + 100;

            return value;
        }
    }

    var objectif = function () {

        var Disquette = function (x, y) {
            this.name = name;

            this.width = 40;
            this.height = 40;

            this.posX = x; /// Position initiale
            this.posY = y;

        };

        Disquette.prototype.erase = function () {

            floppyDisks.list.splice(floppyDisks.list.indexOf(this), 1);

        };


        var floppy = function (a, b) {
            return new Disquette(a, b);
        };

        return floppy;

    }();

    var floppyDisks = {

        list: [],
        create: function (nbrDeDisquette) {

            for (var i = 0; i < nbrDeDisquette; i++) {

                this.list[this.list.length] = objectif(randomPos('x'), randomPos('y'));
            }

        },

        image: new Image(),

        draw: function () {
            for (var i = 0; this.list[i] != undefined; i++) {

                var d = this.list[i];

                context.drawImage(this.image, 150, 360, 130, 130, d.posX, d.posY, d.width, d.height);
            }
        }

    };

    floppyDisks.image.src = 'src/img/player.png';
    floppyDisks.create(10);




    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// Foe.

    var invocation = false; // Un enemy est il en cours de création.
    var enemyCounter = 0;

    var createEnemy = function () {

        var Zombi = function (maxSpeed, minSpeed) {

            this.num = 'zombi' + enemy.list.length;

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

            this.state = enemy.sprite.walking;

            this.hp = 4;


        };

        Zombi.prototype.die = function () {

            enemy.list.splice(enemy.list.indexOf(this), 1);

            player.score += 1;
            player.killCount += 1;

        };

        var romero = function (a, b) {
            return new Zombi(a, b);
        };

        return romero;

    }();



    var enemy = {


        death: function () {

            for (var i = 0; this.list[i] != undefined; i++) {
                if (this.list[i].state === this.sprite.dead) {
                    this.list[i].die();
                }
            }

        },

        list: [],
        // deadList: [], 

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

        speedMax: 6,
        speedMin: 0.1,
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


                    var zDeltaX = centerX - this.list[i].hitBoxX; // difference X entre le zombi.
                    var zDeltaY = centerY - this.list[i].hitBoxY; //

                    var zAngle = Math.atan2(zDeltaY, zDeltaX);// L'angle en radians 

                    /*context.beginPath();

                    context.rect(this.list[i].hitBoxX, this.list[i].hitBoxY, this.list[i].width, this.list[i].height);

                    context.strokeStyle = 'orange'; // rgb

                    context.stroke();*/

                    context.beginPath();

                    context.translate(this.list[i].posX, this.list[i].posY);

                    context.rotate(zAngle + 1.5);

                    context.drawImage(this.imgTest, this.sprite.walking[c].x, this.sprite.walking[c].y, this.sprite.walking[c].w, this.sprite.walking[c].h, -17, -12.5, 40, 40);

                    context.rotate(-zAngle - 1.5);


                    context.translate(-this.list[i].posX, -this.list[i].posY);



                } else if (this.list[i].state === enemy.sprite.dead) {
                    // Enemy dead.

                    /* context.beginPath();
 
                     context.rect(this.list[i].hitBoxX, this.list[i].hitBoxY, this.list[i].width, this.list[i].height);
 
                     context.strokeStyle = 'pink'; // rgb
 
                     context.stroke();
 
                     context.beginPath();*/

                    context.drawImage(this.imgTest, this.sprite.dead[0].x, this.sprite.dead[0].y, this.sprite.dead[0].w, this.sprite.dead[0].h, this.list[i].posX - 20, this.list[i].posY - 20, 40, 40);

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
        },

        invoque: function () { // Methode qui crée de nouveaux zombis, avec un délai et un nombre maximum.

            if (this.list.length < 100 && !invocation) { // param z nbr

                invocation = true;

                setTimeout(function () {

                    enemy.list[enemy.list.length] = createEnemy(enemy.speedMax, enemy.speedMin); // param

                    invocation = false;

                    // console.log(enemy.list[enemyCounter]);

                    enemyCounter++;

                }, 500);

            }
        }

    };

    enemy.imgTest.src = 'src/img/finalFoe.png';

    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// Collision

    var collision = function () { // Fonction qui calcule toute les collisions.

        var disk = floppyDisks.list;
        // Player vs Bordure. Renvoie le joueur dans l'aire de jeu. 
        if (background.x < background.minX) {

            background.x += player.speed + 2;
            // Et corrige la position des zombis, modifié par la méthode player.move.
            for (var i = 0; enemy.list[i] != undefined; i++) {

                enemy.list[i].posX -= player.speed * facteurEchelle + 6;

            }
            // Et des disquettes.
            for (var i = 0; disk[i] != undefined; i++) {
                disk[i].posX -= player.speed * facteurEchelle + 6;
            }
            communication('getback'); // Petit message pour la trame.
        }
        if (background.x > background.maxX) {

            background.x -= player.speed + 2;

            for (var i = 0; enemy.list[i] != undefined; i++) {

                enemy.list[i].posX += player.speed * facteurEchelle + 6;

            }
            for (var i = 0; disk[i] != undefined; i++) {
                disk[i].posX += player.speed * facteurEchelle + 6;
            }
            communication('getback');

        }
        if (background.y < background.minY) {

            background.y += player.speed + 2;

            for (var i = 0; enemy.list[i] != undefined; i++) {

                enemy.list[i].posY -= player.speed * facteurEchelle + 6;

            }
            for (var i = 0; disk[i] != undefined; i++) {
                disk[i].posY -= player.speed * facteurEchelle + 6;
            }
            communication('getback');

        }
        if (background.y > background.maxY) {

            background.y -= player.speed + 2;

            for (var i = 0; enemy.list[i] != undefined; i++) {

                enemy.list[i].posY += player.speed * facteurEchelle + 6;

            }
            for (var i = 0; disk[i] != undefined; i++) {
                disk[i].posY += player.speed * facteurEchelle + 6;
            }
            communication('getback');

        }
        //// Player vs Disquette rapporte des points.

        var disk = floppyDisks.list;

        for (var i = 0; disk[i] != undefined; i++) {
            if (disk[i].posX < player.hitBoxX + player.width &&
                disk[i].posX + disk[i].width > player.hitBoxX &&
                disk[i].posY < player.hitBoxY + player.height &&
                disk[i].height + disk[i].posY > player.hitBoxY + 10) {

                player.score += 85;
                return disk[i].erase();

            }
        }


        ////// Enemy vs Enemy vs Player. Une boucle parcour le tableau qui contient les références aux zombis.
        // On verifie s'il y a une collision avec un autre enemy ou le player.
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

                        enemy.list[i].posX += Math.random() * (10) - 5;
                        enemy.list[i].posY += Math.random() * (10) - 5;

                        enemy.list[j].posX += Math.random() * (10) - 5;
                        enemy.list[j].posY += Math.random() * (10) - 5;

                    }
                }
            }

            // Z vs player. On compare la position de chaque enemy avec la position de player. 1 seule vie, la collision provoque le game over.

            if (enemy.list[i].hitBoxX < player.hitBoxX + player.width - 10 &&
                enemy.list[i].hitBoxX + enemy.list[i].width > player.hitBoxX + 10 &&
                enemy.list[i].hitBoxY < player.hitBoxY + player.height - 10 &&
                enemy.list[i].height + enemy.list[i].hitBoxY > player.hitBoxY + 10) {

                if (enemy.list[i].state === enemy.sprite.walking) {

                    player.gameOver();

                }

            }

            // Z vs bullet. 

            for (var j = 0; bullets.list[j] != undefined; j++) {

                if (enemy.list[i].state === enemy.sprite.walking) {

                    if (bullets.list[j].posX < enemy.list[i].hitBoxX + enemy.list[i].width && bullets.list[j].posX > enemy.list[i].hitBoxX && bullets.list[j].posY < enemy.list[i].hitBoxY + enemy.list[i].height && bullets.list[j].posY > enemy.list[i].hitBoxY) {
                        console.log('la balle touche');

                        enemy.list[i].state = enemy.sprite.dead; // On change le sprite du zombi.

                        return bullets.list[j].clean(); // On supprime la bullet en supprimant son référencement.


                    }

                }


            }


        }


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

            floppyDisks.draw();


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




            // update enemy death

            enemy.death();
            // Check collision.
            collision();




        };

        // Incrementation du compteur pour boucler sur les sprites.
        if ((tFrame - timeBase2) >= 200) {
            timeBase2 = tFrame;
            counter++;
            enemy.spriteCounter++;

            // console.log(floppyDisks.list);


            updateDisplayedScore();

            // if (bullets.list.length > 0) {

            //     console.log(bullets.list[0].destinationX + " impact " + bullets.list[0].destinationY);
            // }

            if (floppyDisks.list.length === 0) {
                floppyDisks.create(5);
            }

            if (player.score > 1000) {
                window.document.getElementById('btncv').style.display = 'inline';
                divInstruction.innerText = '--- VICTORY ---';
                h2Resultat.style.display = 'block';
                h2Resultat.style.color = 'green';
                h2Resultat.innerText = '--- VICTORY ---';

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
    ////////////////////  START / PAUSE. 

    // On lance la boucle principale

    var start = function () {
        started = true;
        mainLoop();

    };

    var pause = function() {

        console.log('on click sur abort');

        if (started) { // Pause.
            cancelAnimationFrame(stopMainLoop); // On stop le request animation frame de mainLoop.
            started = false;
            console.log('ON STOOOOOOP')

            canvas.style.display = 'none';
            divInstruction.style.display = 'block';
            boutonStart.innerText = 'start';
        } 

    }

    var boutonStart = window.document.getElementById('play');

    // Bouton start / pause. On affiche soit la div instruction soit le canvas 

    boutonStart.addEventListener('click', function () {



        console.log('on click sur start')

        if(!started) { // Start.
            start();
            console.log('STARTED = ' + started);

            divInstruction.style.display = 'none';
            h2Resultat.style.display = 'none';
            canvas.style.display = 'block';


        }

    }, false);

    window.document.getElementById('abort').addEventListener('click', pause, false);



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

    }, false);

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

    }, false);
    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// 



    ///////////// Blocage : scroll + clique gauche

    canvas.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);

    window.addEventListener('dblclick', function (e) {
        e.preventDefault();
    }, false);


    window.addEventListener('keydown', function (e) {
        // Espace et arrow keys.
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Partie Interface / affichage des scores.

    var communication = function (code) {

        var com = window.document.getElementById('display-com');

        if (code === 'getback') {
            com.innerText = 'Get back to the mission...';

        }
        if (code === 'dead') {
            com.innerText = 'We seem to have lost the connection...';
        }

        setTimeout(function () {
            com.innerText = 'Message Incoming...';

        }, 2500);

    };


    var updateDisplayedScore = function () {
        if (player.score < 10) {

            window.document.getElementById('point').innerText = '0' + player.score ;

        } else {

            window.document.getElementById('point').innerText = player.score ;

        }
        if (player.killCount < 10) {

            window.document.getElementById('kill-count').innerText = '0' + player.killCount;

        } else {

            window.document.getElementById('kill-count').innerText = player.killCount;

        }

    };


    // On réinitialise la position du background, les enemy, les bullets et les scores.
    var restart = function () {

        bullets.list = [];
        enemy.list = [];

        h2Resultat.style.display = 'none';

        background.x = initMapX;
        background.y = initMapY;

        player.score = 0;
        player.killCount = 0;

        floppyDisks.list = [];
        floppyDisks.create(10);

    }


    var boutonRestart = window.document.getElementById('restart');
    boutonRestart.addEventListener('click', restart, false);


    window.document.getElementById('linkcv1').addEventListener('click', function () {
        window.document.getElementById('cv').style.display = "block";

    }, false);

    window.document.getElementById('btncv').addEventListener('click', function () {
        window.document.getElementById('cv').style.display = "block";

    }, false);







})();