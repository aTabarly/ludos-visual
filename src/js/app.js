(function (window) {
    'use strict';
    
    var scene = window.sceneFactory();
    var background = window
                        .backgroundFactory(scene)
                        .init('src/img/moonWFog.png');

    var floppyDisks = window
                        .floppyDisksFactory()
                        .init(10, 'src/img/player.png');

    var bullets = window.bulletsFactory();
   
    var player = window
                    .playerFactory(scene, window.bulletShooted, bullets)
                    .init('src/img/player.png');
    
    var enemies = window
                    .enemiesFactory(scene, player)
                    .init('src/img/finalFoe.png');
    
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