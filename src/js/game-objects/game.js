(function(window){
    'use strict';
    window.gameFactory = function(ui, gameObjects, mainLoop){
        var player = gameObjects.player;
        var enemies = gameObjects.enemies;
        var floppyDisks = gameObjects.floppyDisks;
        var bullets = gameObjects.bullets;

        var scene = ui.scene;
        var background = ui.background;

        return {
            started: false,
            stopMainLoop: undefined,
    
            // On lance la boucle principale
            start: function () {
                var self = this;
                
                if(!self.started) { // Start.
                    self.started = true;

                    //// On boucle.
                    mainLoop(this)();

                    scene.divInstruction.style.display = 'none';
                    scene.h2Resultat.style.display = 'none';
                    scene.canvas.style.display = 'block';
                }
            },
    
            gameOver: function () {
                window.document.getElementById('btncv').style.display = 'inline';
                
                scene.canvas.style.display = 'none';
                scene.divInstruction.style.display = 'inline-block';
                
                scene.h2Resultat.style.display = 'inline';
                scene.h2Resultat.innerText = 'GAME - OVER';
                scene.h2Resultat.style.color = 'rgb(167, 4, 4)';
                
                scene.communication('dead');
                cancelAnimationFrame(this.stopMainLoop);
                setTimeout(function(){ scene.clearing(); }, 1000);
                this.started = false;
                this.restart();
            },
    
            // On réinitialise la position du background, les enemies, les bullets et les scores.
            restart: function () {
                    bullets.list = [];
                    enemies.list = [];
    
                    scene.h2Resultat.style.display = 'none';
    
                    background.reset();
    
                    player.score = 0;
                    player.killCount = 0;
    
                    floppyDisks.init(10, 'src/img/player.png');
            },    
    
            pause: function() {
        
                if (this.started) { // Pause.
                    cancelAnimationFrame(this.stopMainLoop); // On stop le request animation frame de mainLoop.
                    this.started = false;
        
                    scene.canvas.style.display = 'none';
                    scene.divInstruction.style.display = 'block';
                } 
        
            }
        };
    }
})(window)