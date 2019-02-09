(function(window){

    window.sceneFactory = function() {
        var canvas = window.document.querySelector('#game-canvas');
        var context = canvas.getContext('2d');
        
        return {
            canvas: canvas,
            context: context,
            clearing: function () {
                this.context.clearRect(0, 0, canvasWidth, canvasHeight);
            },
            divInstruction: window.document.getElementById('instruction'),
            h2Resultat:  window.document.getElementById('resultat'),
            canvasHeight: canvas.height, // clientheight
            canvasWidth: canvas.width, // clientWidth
            centerX: canvas.width / 2,
            centerY: canvas.height / 2,
            facteurEchelle: 2,
        }
    }

})(window)
    