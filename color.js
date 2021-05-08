console.log("charge");

//Yazil :
var r = 0,
g = 0,
b = 0;
body = document.body;
function bg () {

    if (r <= 255 && g == 0 && b == 0) {
        r ++;
    }

    if (r == 255 && b == 0 && g <= 255) {
        g ++;
    }

    if (r == 255 && g == 255 && b <= 255) {
        b ++;
    }

    if (b == 255 && g == 255 && r > 0) {
        r --;
    }

    if (r == 0 && b == 255 && g > 0) {
        g --;
    }

    if (r == 0 && g == 0 && b > 0) {
        b --;
    }
    chrome.storage.local.get(['gamer'], function(result) {
        gamer = result.gamer;

        chrome.storage.local.get(['speed'], function(result) {
            speedly = result.speed;
            
            if(gamer == 'check') {
            
                setTimeout(function() {
                    bg();
                }, parseInt(speedly));
            };

        })
        
    });

    body.style.background = 'rgb('+r+','+g+','+b+')';
}





chrome.storage.local.get(['gamer'], function(result) {
    gamer = result.gamer;
    
    if(gamer == 'check') {
        bg();   
    }else {
        chrome.storage.local.get(['check'], function(result) {
            stateCheck = result.check;
            
            if(stateCheck == 'check') {

                chrome.storage.local.get(['key'], function(result) {
                    body = document.body;
                    body.style.background = result.key;
                }); 
            }
        });

        chrome.storage.local.get(['checkStudent'], function(result) {
            stateCheck2 = result.checkStudent;
            console.log(stateCheck2);
            if(stateCheck2 == 'check') {

                chrome.storage.local.get(['studBack'], function(result) {
                    student = document.getElementById('menu-part');
                    student.style.background = result.studBack;
                    
                }); 
            }
        });
    }
});


chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
    	
        switch(message.type) {
            case "body":
                body = document.body;
                body.style.background = message.color;
                
                break;
            case "student":
                student = document.getElementById('menu-part');
                student.style.background = message.color;
                
                break;
            case "gamer":
                if (message.color == 'on') {
                    
                    bg();    
                }else {
                    body = document.body;
                    body.style.background = "#ffffff"    
                }
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);
