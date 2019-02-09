(function (window) {
    'use strict';
    
    var scene = window.sceneFactory();
    var bullets = window.bulletsFactory();

    var floppyDisks = window.floppyDisksFactory();
    floppyDisks.init(10, 'src/img/player.png');
    
    var score = window.scoreFactory();

    var background = window.backgroundFactory(scene);
    background.init();
   
    var player = window.playerFactory(scene, window.bulletShooted, bullets);
    player.init();

    var theMouse = window.theMouseFactory(player);

    var enemy = window.enemyFactory();
    enemy.init('src/img/finalFoe.png');

    var collision = window.collision(scene, floppyDisks, background, player, enemy, bullets, score, app);

    var mainLoop = window.loopFactory(scene, background, player, enemy, theMouse, score, collision, floppyDisks, bullets);

    var app = window.gameFactory(scene, mainLoop, score, bullets, enemy, floppyDisks, background, player);
    
    window.controlsInit(app, player, scene, theMouse);
})(window);