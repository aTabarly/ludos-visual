(function(window){
    window.theMouseFactory = function(player){
        return {
            xOnCanvas: undefined,
            yOnCanvas: undefined,
            draw: function (context) {
    
                context.beginPath();
    
                context.arc(this.xOnCanvas, this.yOnCanvas, 100, 0, 2 * Math.PI);
    
                context.fillStyle = 'rgba(236, 240, 221,0.1)';
                context.fill();
    
                context.beginPath();
    
                context.drawImage(player.imageTest, 90, 18, 249, 249, this.xOnCanvas - 25, this.yOnCanvas - 25, 50, 50);

            }
        };
    }
})(window)