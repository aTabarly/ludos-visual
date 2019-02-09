(function(window){
'use strict';

window.collision = function (scene, floppyDisks, background, player, enemy, bullets, score, app) { // Fonction qui calcule toute les collisions.

    var facteurEchelle = scene.facteurEchelle;
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
        score.communication('getback'); // Petit message pour la trame.
    }
    if (background.x > background.maxX) {

        background.x -= player.speed + 2;

        for (var i = 0; enemy.list[i] != undefined; i++) {

            enemy.list[i].posX += player.speed * facteurEchelle + 6;

        }
        for (var i = 0; disk[i] != undefined; i++) {
            disk[i].posX += player.speed * facteurEchelle + 6;
        }
        score.communication('getback');

    }
    if (background.y < background.minY) {

        background.y += player.speed + 2;

        for (var i = 0; enemy.list[i] != undefined; i++) {

            enemy.list[i].posY -= player.speed * facteurEchelle + 6;

        }
        for (var i = 0; disk[i] != undefined; i++) {
            disk[i].posY -= player.speed * facteurEchelle + 6;
        }
        score.communication('getback');

    }
    if (background.y > background.maxY) {

        background.y -= player.speed + 2;

        for (var i = 0; enemy.list[i] != undefined; i++) {

            enemy.list[i].posY += player.speed * facteurEchelle + 6;

        }
        for (var i = 0; disk[i] != undefined; i++) {
            disk[i].posY += player.speed * facteurEchelle + 6;
        }
        score.communication('getback');

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

                app.gameOver();

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
})(window)
