var colorWell

var defaultColor = "#000000";

document.addEventListener('DOMContentLoaded', (event) => {
    chrome.storage.sync.get(['bodyCheckSave'], function(result) {
      if (result.bodyCheckSave == "check") {
        console.log("check");
        document.getElementById("backTrue").checked = true;
      };
  });
  var checkbox = document.getElementById("backTrue");
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      chrome.storage.sync.set({ "bodySave": event.target.value }, function(){
        console.log("save");
      });
    } else {
      chrome.storage.sync.set({ "bodyCheckSave": "off" }, function(){
          console.log("save");
        });
    }
  });

});







function startup() {
  colorWell = document.querySelector("#backcolor");
  chrome.storage.sync.get(['bodySave'], function(result) {
    if (result.bodySave != null) {
      defaultColor = result.bodySave;
    };
    console.log('Value currently is ' + result.key);
  });
  colorWell.value = defaultColor;
  colorWell.addEventListener("input", updateFirst, false);
  colorWell.addEventListener("change", updateAll, false);
  colorWell.select();
  let str = '';

  for (let i = 0; i < 2; i++) {
    str = str + i;
    if (document.getElementById("backTrue").checked) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: event.target.value});
    });
    chrome.storage.sync.set({ "bodySave": event.target.value }, function(){
      console.log("save");
    });
  } else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: "#ffffff"});
      });

    }
  }
  


  
}

function updateFirst(event) {
  var p = document.querySelector("#backcolor");

  if (p) {
    
    p.style.background = event.target.value;

    if (document.getElementById("backTrue").checked) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: event.target.value});
      chrome.storage.sync.set({ "bodyCheckSave": "check" }, function(){
        console.log("save");
      });
    });
    chrome.storage.sync.set({ "bodySave": event.target.value }, function(){
      console.log("save");
    });
  }
  else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: "#ffffff"});
      });
      chrome.storage.sync.set({ "bodyCheckSave": "off" }, function(){
        console.log("save");
      });
    }
}}

function updateAll(event) {
  document.querySelectorAll("#backcolor").forEach(function(p) {
    p.style.background = event.target.value;
    if (document.getElementById("backTrue").checked) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: event.target.value});
      });
      chrome.storage.sync.set({ "bodySave": event.target.value }, function(){
        console.log("save");
      });
      chrome.storage.sync.set({ "checkBodySave": "check" }, function(){
        console.log("save");
      });
    }
    else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: "#ffffff"});
      });
      chrome.storage.sync.set({ "bodyCheckSave": "off" }, function(){
        console.log("save");
      });
    }

  }); 
}

window.addEventListener("load", startup, false);



