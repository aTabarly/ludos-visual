(function(window){
    
    var randomPos = function (axe) {
        var value;
    
        if (axe === 'x') {
    
            value = Math.random() * (2400) +100;
    
            return value;
        }
    
        if (axe === 'y') {
    
            value = Math.random() * (1400) + 100;
    
            return value;
        }
    }

    var objectif = function () {

        var Disquette = function (x, y) {
            this.name = name;

            this.width = 40;
            this.height = 40;

            this.posX = x; /// Position initiale
            this.posY = y;

        };

        Disquette.prototype.erase = function () {

            // TODO
            floppyDisks.list.splice(floppyDisks.list.indexOf(this), 1);

        };


        var floppy = function (a, b) {
            return new Disquette(a, b);
        };

        return floppy;

    }();

    window.floppyDisksFactory = function(){
        return {

            list: [],
            init: function (nbrDeDisquette, imageSource) {

                this.list = [];
                for (var i = 0; i < nbrDeDisquette; i++) {

                    this.list[this.list.length] = objectif(randomPos('x'), randomPos('y'));
                }

                this.image = new Image();
                this.image.src = imageSource;

            },

            image: null,

            draw: function (context) {
                for (var i = 0; this.list[i] != undefined; i++) {

                    var d = this.list[i];

                    context.drawImage(this.image, 150, 360, 130, 130, d.posX, d.posY, d.width, d.height);
                }
            }
        };
    };
})(window);