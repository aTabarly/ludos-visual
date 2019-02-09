(function (window) {
    'use strict';
    
    var scene = window.sceneFactory();
    var background = window.backgroundFactory(scene);
    background.init();

    var floppyDisks = window.floppyDisksFactory();
    floppyDisks.init(10, 'src/img/player.png');

    var bullets = window.bulletsFactory();
   
    var player = window.playerFactory(scene, window.bulletShooted, bullets);
    player.init();
    
    var enemies = window.enemiesFactory(scene, player);
    enemies.init('src/img/finalFoe.png');
    
    var gameObjects = {
        enemies: enemies,
        player: player,
        floppyDisks: floppyDisks,
        bullets: bullets
    };

    var ui = {
        background: background,
        scene: scene,
        theMouse: window.theMouseFactory(player),
    };

    var constants = {
        GAME_OVER: 'GAME_OVER',
    };

    var collision = window.collisionFactory(ui, gameObjects, constants);

    var mainLoop = window.loopFactory(ui, gameObjects, collision, constants);

    var game = window.gameFactory(ui, gameObjects, mainLoop);
    
    window.controlsInit(ui, gameObjects, game);
})(window);