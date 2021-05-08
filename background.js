var colorWellBack



chrome.storage.local.get(['key'], function(result) {
  defaultColor = result.key;
});



document.addEventListener('DOMContentLoaded', (event) => {
  //auto-check checkbox if it was checked.
  chrome.storage.local.get(['speed'], function(result) {
    speedly = result.speed;
    document.getElementById("range").value = parseInt(speedly);
  })
  chrome.storage.local.get(['check'], function(result) {
      if (result.check == 'check') {
        document.getElementById("backTrue").checked = true;
      }
  });

  chrome.storage.local.get(['checkStudent'], function(result) {
    
    if (result.checkStudent == 'check') {
      document.getElementById("backTrueStudent").checked = true;
    }
  });

  chrome.storage.local.get(['gamer'], function(result) {
    
    if (result.gamer == 'check') {
      document.getElementById("gamer").checked = true;
      var slider = document.getElementById("range");
        var output = document.getElementById("speed");
        var pGamer = document.getElementById("pGamer");
        slider.style.display = "block";
        output.style.display = "block";
        pGamer.style.display = "block";
        chrome.storage.local.get(['speed'], function(result) {
          speedValue = result.speed;
          speedValue = this.value;
          speedValue = parseInt(speedValue);
          if(speedValue < 7){
            output.innerHTML = "Fast";
          }else if(speedValue < 10 ){
            output.innerHTML = "Normal";
          }else if(speedValue < 15){
            output.innerHTML = "Slow";
          }
          else if(speedValue > 15){
            output.innerHTML = "really Slow";
          }
          
        });
        slider.oninput = function() {
          speedValue = this.value;
          speedValue = parseInt(speedValue);
          speedValue = 21 - speedValue;
          if(speedValue < 7){
            output.innerHTML = "Fast";
          }else if(speedValue < 10){
            output.innerHTML = "Normal";
          }else if(speedValue < 15){
            output.innerHTML = "Slow";
          }
          else if(speedValue > 15){
            output.innerHTML = "really Slow";
          }
          chrome.storage.local.set({'speed': speedValue}, function() {
            console.log('speed : ', speedValue);
          });
        };
    }
  });

//save state of checkbox
  var checkbox = document.getElementById("backTrue");
  checkbox.addEventListener('change', function() {


    if (document.getElementById("backTrue").checked) {
      checked = "check";
      chrome.storage.local.set({'check': checked}, function() {
        
      });

      chrome.storage.local.get(['key'], function(result) {
        defaultColor = result.key;
        
      });
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: defaultColor});
        });

    } else {
      checked = "not";
      chrome.storage.local.set({'check': checked}, function() {

      });
      //set background-color to #ffffff

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: "#ffffff"});
      });

    }
  }); 
  var checkbox = document.getElementById("backTrueStudent");
  checkbox.addEventListener('change', function() {
    if (document.getElementById("backTrueStudent").checked) {
      checked = "check";
      chrome.storage.local.set({'checkStudent': checked}, function() {
        console.log('is checked');
      });

      chrome.storage.local.get(['studBack'], function(result) {
        colorStudDefault = result.studBack;
        console.log(colorStudDefault);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "student", color: colorStudDefault});
        });
      });
    } else {
      checked = "not";
      chrome.storage.local.set({'checkStudent': checked}, function() {
        console.log('not checked');
      });
        //set background-color to #ffffff
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "student", color: "#0E4F94"});
      });
    }
  })
  //all checkBox
    var checkbox = document.getElementById("all");
    checkbox.addEventListener('change', function() {
      if (document.getElementById("all").checked == false) {

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "student", color: "#0E4F94"});
        });
        document.getElementById("backTrueStudent").checked = false;
        document.getElementById("backTrue").checked = false;
        document.getElementById("gamer").checked = false;
        checked = "not";
        chrome.storage.local.set({'gamer': checked}, function() {
          console.log('not checked');
        });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: "#ffffff"});
        });

      }
    });
    //gamer's mod
    var checkbox = document.getElementById("gamer");
    checkbox.addEventListener('change', function() {
      if (checkbox.checked){
        
        var slider = document.getElementById("range");
        var output = document.getElementById("speed");
        var pGamer = document.getElementById("pGamer");
        slider.style.display = "block";
        output.style.display = "block";
        pGamer.style.display = "block";
        
        output.innerHTML = slider.value;
        slider.oninput = function() {

          
          speedValue = this.value;
          speedValue = parseInt(speedValue);
          speedValue = 21 - speedValue;
          if(speedValue < 7){
            output.innerHTML = "Fast";
          }else if(speedValue < 10){
            output.innerHTML = "Normal";
          }else if(speedValue < 15){
            output.innerHTML = "Slow";
          }
          else if(speedValue > 15){
            output.innerHTML = "really Slow";
          }
          chrome.storage.local.set({'speed': speedValue}, function() {
            console.log('speed : ', speedValue);
          });
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: "gamer", color: "off"});
          });
        };
        document.getElementById("backTrueStudent").checked = false;
        checked = "not";
        chrome.storage.local.set({'checkStudent': checked}, function() {
          console.log('not checked');
        });
        document.getElementById("backTrue").checked = false;
        checked = "not";
        chrome.storage.local.set({'check': checked}, function() {
          console.log('not checked');
        });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "body", color: "#ffffff"});
        });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "student", color: "#0E4F94"});
        });
        checked = "check";
        chrome.storage.local.set({'gamer': checked}, function() {
          console.log('is checked');
        });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "gamer", color: "on"});
        });
      } else {
        var slider = document.getElementById("range");
        var output = document.getElementById("speed");
        var pGamer = document.getElementById("pGamer");
        slider.style.display = "none";
        output.style.display = "none";
        pGamer.style.display = "none";
        checked = "not";
        chrome.storage.local.set({'gamer': checked}, function() {
          console.log('not checked');
        });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "gamer", color: "off"});
        });
      }
      
    });
  
});

function startup() {
  colorWellBack = document.querySelector("#backcolor");
  colorStud = document.querySelector("#elevBack")


  chrome.storage.local.get(['key'], function(result) {
    defaultColor = result.key;
    console.log('Value currently is ' + defaultColor);
    colorWellBack.value = defaultColor;
    colorWellBack.style.background = defaultColor;
    colorWellBack.addEventListener("input", updateFirst, false);
    colorWellBack.addEventListener("change", updateAll, false);
    colorWellBack.select();
  });

  chrome.storage.local.get(['studBack'], function(result) {
    colorStudDefault = result.studBack;
    console.log("it's"+colorStud);

    colorStud.value = colorStudDefault;
    colorStud.style.background = colorStudDefault;
    colorStud.addEventListener("input", updateStudentFirst, false);
    colorStud.addEventListener("change", updateStudentAll, false);
    colorStud.select();


  })
}
  


function updateStudentFirst(event) {
  var student = document.querySelector("#elevBack");

  if (student) {
    
    student.style.background = event.target.value;
    color = event.target.value;

    if (document.getElementById("backTrueStudent").checked) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "student", color: event.target.value});
      });

      //save state of color
      chrome.storage.local.set({studBack: color}, function() {
        console.log('Value is set to ' + color);

      });


    }else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "student", color: "#0E4F94"});
      });
      
    }
    
  }
}

function updateStudentAll(event) {
  document.querySelectorAll("#elevBack").forEach(function(student) {
    student.style.background = event.target.value;


    if (document.getElementById("backTrueStudent").checked) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "student", color: event.target.value});
      });
      
      
    }else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "student", color: "#0E4F94"});
      });
      
    }

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