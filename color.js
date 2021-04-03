console.log("charge");

chrome.storage.local.get(['check'], function(result) {
    stateCheck = result.check;
    console.log(stateCheck);
    if(stateCheck == 'check') {

        chrome.storage.local.get(['key'], function(result) {
            body = document.body;
            body.style.background = result.key;
        }); 
    }

      

    });



chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
    	console.log("j'ai reçu bg");
        switch(message.type) {
            case "body":
                body = document.body;
                body.style.background = message.color;
                console.log(message.color);
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);
