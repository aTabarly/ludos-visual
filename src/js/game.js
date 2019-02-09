(function(window){
    window.gameFactory = function(scene, mainLoop, score, bullets, enemy, floppyDisks, background, player){
        return {
            started: false,
            stopMainLoop: undefined,
    
            // On lance la boucle principale
            start: function () {
                if(!this.started) { // Start.
                    this.started = true;

                    //// On boucle.
                    this.stopMainLoop = window.requestAnimationFrame(mainLoop);

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
                
                score.communication('dead');
                cancelAnimationFrame(this.stopMainLoop);
                setTimeout(function(){ scene.clearing(); }, 1000);
                this.started = false;
                console.log('GAME OVER');
                this.restart();
            },
    
            // On réinitialise la position du background, les enemy, les bullets et les scores.
            restart: function () {
                    bullets.list = [];
                    enemy.list = [];
    
                    scene.h2Resultat.style.display = 'none';
    
                    background.reset();
    
                    player.score = 0;
                    player.killCount = 0;
    
                    floppyDisks.init(10, 'src/img/player.png');
            },    
    
            pause: function() {
    
                console.log('on click sur abort');
        
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