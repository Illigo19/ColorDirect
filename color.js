console.log("chu chargé chacal");
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
    	console.log("j'ai reçu bg");
        switch(message.type) {
            case "body":
                body = document.body;
                body.style.background = message.color;
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);