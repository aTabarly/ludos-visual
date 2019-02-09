
(function(window){

    window.loopFactory = function(scene, background, player, enemy, theMouse, score, collision, floppyDisks, bullets){
        var timeBase;
        var timeBase2;

        return function (tFrame) {

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
                player.move();

                // idle
                // console.log(posture)
                // move


                // Enemy. 

                if (enemy.list.length > 0) { // Si un enemy est actif on le déplace/dessine.

                    enemy.move();
                    enemy.draw(scene.context);
                }


                enemy.invoque(); // On crée un enemy.

                // The mouse
                theMouse.draw(scene.context);




                // update enemy death

                enemy.death();

                // Check collision.
                collision();




            };

            // Incrementation du compteur pour boucler sur les sprites.
            if ((tFrame - timeBase2) >= 200) {
                timeBase2 = tFrame;
                player.counter++;
                enemy.spriteCounter++;

                // console.log(floppyDisks.list);


                score.updateDisplayedScore(player);

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
        };
    };

})(window)