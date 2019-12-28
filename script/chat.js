const storage = require('electron-json-storage');

function getUrl() {
    storage.get('url', function (error, data) {
        if (error)
            throw error;
        if (data.length) {
            let json = data;
            json.forEach(function (elm) {
                if (elm.url)
                    document.getElementById(elm.screen).src = elm.url;
                else
                    location.assign("url.html");
            });
        }
    });
}

var tab;

function erased()
{
    const height = window.innerHeight - 63;
    document.getElementById('1').style.height = height.toString() + "px";
    document.getElementById('1').style.width = "100%";
    document.getElementById('2').style.height = height.toString() + "px";
    document.getElementById('2').style.width = "100%";
    document.getElementById('3').style.height = height.toString() + "px";
    document.getElementById('3').style.width = "100%";
    document.getElementById('4').style.height = height.toString() + "px";
    document.getElementById('4').style.width = "100%";
    document.getElementById('1').style.display = "none";
    document.getElementById('2').style.display = "none";
    document.getElementById('3').style.display = "none";
    document.getElementById('4').style.display = "none";
}

function overview()
{
    const demi = (window.innerHeight - 67) / 2;
    document.getElementById('4').style.display = "inline-flex";
    document.getElementById('1').style.display = "inline-flex";
    document.getElementById('2').style.display = "inline-flex";
    document.getElementById('3').style.display = "inline-flex";
    document.getElementById('1').style.height = demi.toString() + "px";
    document.getElementById('1').style.width = "50%";
    document.getElementById('2').style.height = demi.toString() + "px";
    document.getElementById('2').style.width = "50%";
    document.getElementById('3').style.height = demi.toString() + "px";
    document.getElementById('3').style.width = "50%";
    document.getElementById('4').style.height = demi.toString() + "px";
    document.getElementById('4').style.width = "50%";
    tab = 0;
}

window.onresize = function () {
    switch (tab) {
        case 1:
        erased();
        document.getElementById('1').style.display = "inline-flex";
            break;
        case 2:
        erased();
        document.getElementById('2').style.display = "inline-flex";
            break;
        case 3:
        erased();
        document.getElementById('3').style.display = "inline-flex";
            break;
        case 4:
        erased();
        document.getElementById('4').style.display = "inline-flex";
            break;
        case 0:
            overview();
            break;
    }
}

window.onload = function () {
    getUrl();
    overview();
}

function getEvent(event,screen){
  if (event.button == 2){
    refresh(screen.name)
  }else
  resize(screen.name)
}

function resize(screen){
    erased();
    document.getElementById(screen).style.display = "inline-flex";
    tab = screen;
}

function refresh(screen){
  storage.get('url', function (error, data) {
      if (error)
          throw error;
      if (data.length) {
          let json = data;
          json.forEach(function (elm) {
              if (elm.screen == screen){
                  document.getElementById(elm.screen).src = elm.url;
                  }
          });
      }
  });
}
