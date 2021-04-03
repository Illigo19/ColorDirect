var colorWell



chrome.storage.local.get(['key'], function(result) {
  defaultColor = result.key;
  console.log('Value currently is ' + defaultColor);
});



document.addEventListener('DOMContentLoaded', (event) => {
//auto-check checkbox if it was checked.
  chrome.storage.local.get(['check'], function(result) {
      if (result.check == 'check') {
        document.getElementById("backTrue").checked = true;
      }
  });

//save state of checkbox
  var checkbox = document.getElementById("backTrue");
  checkbox.addEventListener('change', function() {


    if (document.getElementById("backTrue").checked) {
      checked = "check";
      chrome.storage.local.set({'check': checked}, function() {
        console.log('is checked');
      });

      chrome.storage.local.get(['key'], function(result) {
        defaultColor = result.key;
        console.log(defaultColor);
        
      });
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: defaultColor});
        });

    } else {
      checked = "not";
      chrome.storage.local.set({'check': checked}, function() {
        console.log('not checked');
      });
      //set background-color to #ffffff

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: "#ffffff"});
      });

    }
    // for console only
    chrome.storage.local.get(['check'], function(result) {
      stateCheck = result.check;
      console.log('Value currently is ' + stateCheck);

    });

    })

  });









function startup() {
  colorWell = document.querySelector("#backcolor");


  chrome.storage.local.get(['key'], function(result) {
    defaultColor = result.key;
    console.log('Value currently is ' + defaultColor);
    colorWell.value = defaultColor;
    colorWell.style.background = defaultColor;
    colorWell.addEventListener("input", updateFirst, false);
    colorWell.addEventListener("change", updateAll, false);
    colorWell.select();

  });
}
  


  


function updateFirst(event) {
  var p = document.querySelector("#backcolor");

  if (p) {
    
    p.style.background = event.target.value;
    color = event.target.value;

    if (document.getElementById("backTrue").checked) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: event.target.value});
      });

      //save state of color
      chrome.storage.local.set({key: color}, function() {
        console.log('Value is set to ' + color);

      });


    }else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: "#ffffff"});
      });
      
    }
    
  }
}

function updateAll(event) {
  document.querySelectorAll("#backcolor").forEach(function(p) {
    p.style.background = event.target.value;


    if (document.getElementById("backTrue").checked) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: event.target.value});
      });
      
      
    }else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: "#ffffff"});
      });
      
    }

  }); 
}

window.addEventListener("load", startup, false);



