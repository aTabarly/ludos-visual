(function(window){
    'use strict';
    window.controlsInit = function(ui, gameObjects, app) {
        var player = gameObjects.player;
        var bullets = gameObjects.bullets;

        var scene = ui.scene;
        var theMouse = ui.theMouse;

        scene.canvas.addEventListener('mousemove', function (e) {

            // console.log('mouse canvas coordonnées : ' + theMouse.angleCenter);

            theMouse.xOnCanvas = e.offsetX;
            theMouse.yOnCanvas = e.offsetY;

            theMouse.xCenterDelta = theMouse.xOnCanvas - scene.centerX; // difference X entre le pointeur et le centre.
            theMouse.yCenterDelta = theMouse.yOnCanvas - scene.centerY; // difference Y entre le pointeur et le centre.

            theMouse.angleCenter = Math.atan2(theMouse.yCenterDelta, theMouse.xCenterDelta);// L'angle en radians souris/ axe x centre

            scene.context.beginPath();

            scene.context.drawImage(player.imageTest, 90, 18, 249, 249, theMouse.xOnCanvas - 25, theMouse.yOnCanvas - 25, 50, 50);

        }, false);

        scene.canvas.addEventListener('mousedown', function () {

            if (app.started) {

                player.shoot(bullets, theMouse);
            }

        }, false);

        window.document.addEventListener('keydown', function (e) {

            if (app.started && e.keyCode === 32 && !player.fullAuto) {

                player.shoot(bullets, theMouse);
            }

        }, false);

///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////// La souris. mouseEvent theMouse

    scene.canvas.addEventListener('mouseover', function () {
        if (app.started) {
            this.style.cursor = 'none';
        }
    }, false);

    var boutonStart = window.document.getElementById('play');

    // Bouton start / pause. On affiche soit la div instruction soit le canvas 

    boutonStart.addEventListener('click', function () { app.start(); }, false);

    window.document.getElementById('abort').addEventListener('click', function(){ 
        app.pause();
        boutonStart.innerText = 'start';
    }, false);



    ///////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////  Key Key
    // On change les directions actives pour le player. Si une touche est enfoncée ou relachée.
    var KEY_CODES = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
    }

    window.addEventListener('keydown', function (event) {
        var code = event.keyCode;
        switch (code) {
            case KEY_CODES.LEFT: //////////////////////// gauche    
                //*instructions*
                player.direction.left = true;
                break;
            case KEY_CODES.UP: //////////////////////////// haut
                //instructions
                player.direction.up = true;
                break;
            case KEY_CODES.RIGHT: ///////////////////////// droite
                //instructions
                player.direction.right = true;
                break;
            case KEY_CODES.DOWN: /////////////////// bas
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

    ///////////// Blocage : scroll + clique gauche

    scene.canvas.addEventListener('contextmenu', function (e) {
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


    var boutonRestart = window.document.getElementById('restart');
    boutonRestart.addEventListener('click', function(){ app.restart() }, false);

    window.document.getElementById('linkcv1').addEventListener('click', function () {
        window.document.getElementById('cv').style.display = "block";

    }, false);

    window.document.getElementById('btncv').addEventListener('click', function () {
        window.document.getElementById('cv').style.display = "block";

    }, false);
};

})(window)