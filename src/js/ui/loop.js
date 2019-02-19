
(function(window){
    'use strict';
    window.loopFactory = function(ui, gameObjects, collision, constants){
        var timeBase;
        var timeBase2;

        var player = gameObjects.player;
        var enemies = gameObjects.enemies;
        var floppyDisks = gameObjects.floppyDisks;
        var bullets = gameObjects.bullets;

        var scene = ui.scene;
        var background = ui.background;
        var theMouse = ui.theMouse;

        return function(game) {
           return function loop(tFrame) {
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
                    scene.clearing();


                    // drawbackground
                    background.draw(scene.context);

                    floppyDisks.draw(scene.context);


                    if (balls.length > 0) { // Si une balle est active on la déplace/dessine.
                        bullets.move();
                        bullets.draw(scene.context);
                    }

                    //// Animation Player
                    player.updatePost();
                    player.draw(scene.context, theMouse);
                    player.move(bullets, floppyDisks, background, enemies);

                    // idle
                    // console.log(posture)
                    // move


                    // enemies. 

                    if (enemies.list.length > 0) { // Si un enemies est actif on le déplace/dessine.

                        enemies.move();
                        enemies.draw(scene.context);
                    }


                    enemies.invoque(); // On crée un enemies.

                    // The mouse
                    theMouse.draw(scene.context);

                    // update enemies death

                    enemies.death();

                    // Check collision.
                    if(collision() === constants.GAME_OVER){
                        game && game.gameOver();
                    }
                };

                // Incrementation du compteur pour boucler sur les sprites.
                if ((tFrame - timeBase2) >= 200) {
                    timeBase2 = tFrame;
                    player.counter++;
                    enemies.spriteCounter++;

                    // console.log(floppyDisks.list);


                    scene.updateDisplayedScore(player);

                    // if (bullets.list.length > 0) {

                    //     console.log(bullets.list[0].destinationX + " impact " + bullets.list[0].destinationY);
                    // }

                    if (floppyDisks.list.length === 0) {
                        floppyDisks.create(5);
                    }

                    if (player.score > 1000) {
                        window.document.getElementById('btncv').style.display = 'inline';
                        scene.divInstruction.innerText = '--- VICTORY ---';
                        scene.h2Resultat.style.display = 'block';
                        scene.h2Resultat.style.color = 'green';
                        scene.h2Resultat.innerText = '--- VICTORY ---';
                    }
                };

                if (game.started) {
                    game.stopMainLoop = window.requestAnimationFrame(loop);
                };
            }
        };
    };

})(window)