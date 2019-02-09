(function(window){

    window.scoreFactory = function(){
        return {
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
    };

})(window)