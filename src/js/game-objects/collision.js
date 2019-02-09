(function(window){
    'use strict';

    window.collisionFactory = function (ui, gameObjects, constants) { // Fonction qui calcule toute les collisions.
        var player = gameObjects.player;
        var enemies = gameObjects.enemies;
        var floppyDisks = gameObjects.floppyDisks;
        var bullets = gameObjects.bullets;

        var scene = ui.scene;
        var background = ui.background;

        return function() {
            var facteurEchelle = scene.facteurEchelle;
            var disks = floppyDisks.list;
            // Player vs Bordure. Renvoie le joueur dans l'aire de jeu. 
            if (background.x < background.minX) {

                background.x += player.speed + 2;
                // Et corrige la position des zombis, modifié par la méthode player.move.
                for (var i = 0; enemies.list[i] !== undefined; i++) {

                    enemies.list[i].posX -= player.speed * facteurEchelle + 6;

                }
                // Et des disquettes.
                for (var i = 0; disks[i] !== undefined; i++) {
                    disks[i].posX -= player.speed * facteurEchelle + 6;
                }
                scene.communication('getback'); // Petit message pour la trame.
            }
            if (background.x > background.maxX) {

                background.x -= player.speed + 2;

                for (var i = 0; enemies.list[i] !== undefined; i++) {

                    enemies.list[i].posX += player.speed * facteurEchelle + 6;

                }
                for (var i = 0; disks[i] !== undefined; i++) {
                    disks[i].posX += player.speed * facteurEchelle + 6;
                }
                scene.communication('getback');

            }
            if (background.y < background.minY) {

                background.y += player.speed + 2;

                for (var i = 0; enemies.list[i] !== undefined; i++) {

                    enemies.list[i].posY -= player.speed * facteurEchelle + 6;

                }
                for (var i = 0; disks[i] !== undefined; i++) {
                    disks[i].posY -= player.speed * facteurEchelle + 6;
                }
                scene.communication('getback');

            }
            if (background.y > background.maxY) {

                background.y -= player.speed + 2;

                for (var i = 0; enemies.list[i] !== undefined; i++) {

                    enemies.list[i].posY += player.speed * facteurEchelle + 6;

                }
                for (var i = 0; disks[i] !== undefined; i++) {
                    disks[i].posY += player.speed * facteurEchelle + 6;
                }
                scene.communication('getback');

            }
            //// Player vs Disquette rapporte des points.

            var disks = floppyDisks.list;

            for (var i = 0; disks[i] !== undefined; i++) {
                var disk = disks[i];
                if (disk.posX < player.hitBoxX + player.width &&
                    disk.posX + disk.width > player.hitBoxX &&
                    disk.posY < player.hitBoxY + player.height &&
                    disk.height + disk.posY > player.hitBoxY + 10) {

                    player.score += 85;
                    return floppyDisks.erase(i);

                }
            }


            ////// enemies vs enemies vs Player. Une boucle parcour le tableau qui contient les références aux zombis.
            // On verifie s'il y a une collision avec un autre enemies ou le player.
            for (var i = 0; enemies.list[i] !== undefined; i++) {

                var enemy = enemies.list[i];
                enemy.hitBoxX = enemy.posX - enemy.hitBoxRadius;
                enemy.hitBoxY = enemy.posY - enemy.hitBoxRadius;


                // enemies vs enemies. Provoque un déplacement aléatoire.
                // On compare la position de chaque enemies avec les autres avec une boucle imbriquée.

                for (var j = 0; enemies.list[j] !== undefined; j++) {

                    var innerEnemy = enemies.list[j];
                    innerEnemy.hitBoxX = innerEnemy.posX - innerEnemy.hitBoxRadius;
                    innerEnemy.hitBoxY = innerEnemy.posY - innerEnemy.hitBoxRadius;


                    if (enemy.state === enemies.sprite.walking && innerEnemy.state === enemies.sprite.walking) { // Si les enemies sont 'vivant' ils peuvent entrer en collision.


                        var collisionX = i !== j && enemy.hitBoxX < innerEnemy.hitBoxX + innerEnemy.width && enemy.hitBoxX + enemy.width > innerEnemy.hitBoxX;

                        var collisionY = i !== j && enemy.hitBoxY < innerEnemy.hitBoxY + innerEnemy.height && enemy.height + enemy.hitBoxY > innerEnemy.hitBoxY


                        if (collisionX && collisionY) { // Si collision, on modifie leur position.

                            enemy.posX += Math.random() * (10) - 5;
                            enemy.posY += Math.random() * (10) - 5;

                            innerEnemy.posX += Math.random() * (10) - 5;
                            innerEnemy.posY += Math.random() * (10) - 5;

                        }
                    }
                }

                // Z vs player. On compare la position de chaque enemies avec la position de player. 1 seule vie, la collision provoque le game over.

                if (enemy.hitBoxX < player.hitBoxX + player.width - 10 &&
                    enemy.hitBoxX + enemy.width > player.hitBoxX + 10 &&
                    enemy.hitBoxY < player.hitBoxY + player.height - 10 &&
                    enemy.height + enemy.hitBoxY > player.hitBoxY + 10) {
                    if (enemy.isWalking()) {
                        return constants.GAME_OVER;
                    }
                }

                // Z vs bullet. 

                for (var j = 0; bullets.list[j] !== undefined; j++) {

                    if (enemy.isWalking()) {

                        if (bullets.list[j].posX < enemy.hitBoxX + enemy.width && bullets.list[j].posX > enemy.hitBoxX && bullets.list[j].posY < enemy.hitBoxY + enemy.height && bullets.list[j].posY > enemy.hitBoxY) {
                            console.log('la balle touche');

                            enemy.die(); // On change le sprite du zombi.

                            return bullets.clean(j); // On supprime la bullet en supprimant son référencement.
                        }

                    }


                }


            }
        };
    };
})(window)
