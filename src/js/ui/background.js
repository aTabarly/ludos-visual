(function(window){
    window.backgroundFactory = function(scene){
        return {

            // Les limites de navigation sur le background.
            minX: 110,
            maxX: 2320,
            minY: 110,
            maxY: 1160,

            x: 340,
            y: 340,
            reset: function(){
                this.x = 340;
                this.y = 340;
            },
            sourceWidth: scene.canvasWidth / scene.facteurEchelle, // Largeur sur le fichier source image. 
            sourceHeight: scene.canvasHeight / scene.facteurEchelle, // Hauteur sur le fichier source image.

            map: null,

            init: function() {
                var map = new Image();
                map.src = 'src/img/moonWFog.png';
                this.map = map;
            },

            draw: function (context) {
                context.drawImage(this.map, this.x, this.y, this.sourceWidth, this.sourceHeight, 0, 0, scene.canvasWidth, scene.canvasHeight);
            },

        };
    };
})(window)