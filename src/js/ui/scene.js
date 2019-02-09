(function(window){
    'use strict';
    window.sceneFactory = function() {
        var canvas = window.document.querySelector('#game-canvas');
        var context = canvas.getContext('2d');
        
        return {
            canvas: canvas,
            context: context,
            clearing: function () {
                console.log('clearing');
                this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            },
            divInstruction: window.document.getElementById('instruction'),
            h2Resultat:  window.document.getElementById('resultat'),
            canvasHeight: canvas.height, // clientheight
            canvasWidth: canvas.width, // clientWidth
            centerX: canvas.width / 2,
            centerY: canvas.height / 2,
            facteurEchelle: 2,

            communication: function (code) {

                var com = window.document.getElementById('display-com');
        
                if (code === 'getback') {
                    com.innerText = 'Get back to the mission...';
        
                }
                if (code === 'dead') {
                    com.innerText = 'We seem to have lost the connection...';
                }
        
                setTimeout(function () {
                    com.innerText = 'Message Incoming...';
        
                }, 2500);
        
            },
        
        
            updateDisplayedScore: function (player) {
                if (player.score < 10) {
        
                    window.document.getElementById('point').innerText = '0' + player.score ;
        
                } else {
        
                    window.document.getElementById('point').innerText = player.score ;
        
                }
                if (player.killCount < 10) {
        
                    window.document.getElementById('kill-count').innerText = '0' + player.killCount;
        
                } else {
        
                    window.document.getElementById('kill-count').innerText = player.killCount;
        
                }
        
            }
        }
    }

})(window)
    