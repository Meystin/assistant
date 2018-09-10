const storage = require('electron-json-storage');
const electron = require('electron.js');

function getUrl() {
    storage.get('url', function (error, data) {
        if (error)
            throw error;
        if (data.length) {
            var json = data;
            json.forEach(function (elm) {
                if (elm.url)
                    document.getElementById("screen" + elm.screen).src = elm.url;
                else
                    location.assign("url.html");
            });
        }
    });
}

var tab;

function erased()
{
    var height = window.innerHeight - 63;
    document.getElementById('screen1').style.display = "none";
    document.getElementById('screen2').style.display = "none";
    document.getElementById('screen3').style.display = "none";
    document.getElementById('screen4').style.display = "none";
    document.getElementById('screen1').style.height = height.toString() + "px";
    document.getElementById('screen1').style.width = "100%";
    document.getElementById('screen2').style.height = height.toString() + "px";
    document.getElementById('screen2').style.width = "100%";
    document.getElementById('screen3').style.height = height.toString() + "px";
    document.getElementById('screen3').style.width = "100%";
    document.getElementById('screen4').style.height = height.toString() + "px";
    document.getElementById('screen4').style.width = "100%";
}

function screen1()
{
    erased();
    var height = window.innerHeight - 63;
    document.getElementById('screen1').style.height = height.toString() + "px";
    document.getElementById('screen1').style.width = "100%";
    document.getElementById('screen1').style.display = "inline-flex";
    tab = 1;
}

function screen2()
{
    erased();
    var height = window.innerHeight - 63;
    document.getElementById('screen2').style.height = height.toString() + "px";
    document.getElementById('screen2').style.width = "100%";
    document.getElementById('screen2').style.display = "inline-flex";
    tab = 2;
}

function screen3()
{
    erased();
    var height = window.innerHeight - 63;
    document.getElementById('screen3').style.height = height.toString() + "px";
    document.getElementById('screen3').style.width = "100%";
    document.getElementById('screen3').style.display = "inline-flex";
    tab = 3;
}

function screen4()
{
    erased();
    var height = window.innerHeight - 63;
    document.getElementById('screen4').style.display = "inline-flex";
    document.getElementById('screen4').style.height = height.toString() + "px";
    document.getElementById('screen4').style.width = "100%";
    tab = 4;
}

function overview()
{
    var demi = (window.innerHeight - 67) / 2;
    document.getElementById('screen1').style.display = "inline-flex";
    document.getElementById('screen1').style.height = demi.toString() + "px";
    document.getElementById('screen1').style.width = "50%";
    document.getElementById('screen2').style.display = "inline-flex";
    document.getElementById('screen2').style.height = demi.toString() + "px";
    document.getElementById('screen2').style.width = "50%";
    document.getElementById('screen3').style.display = "inline-flex";
    document.getElementById('screen3').style.height = demi.toString() + "px";
    document.getElementById('screen3').style.width = "50%";
    document.getElementById('screen4').style.display = "inline-flex";
    document.getElementById('screen4').style.height = demi.toString() + "px";
    document.getElementById('screen4').style.width = "50%";
    tab = 5
}

window.onresize = function () {
    console.log('ok');
    switch (tab) {
        case 1:
            console.log('ok'+ tab);
            screen1();
            break;
        case 2:
            console.log('ok'+ tab);
            screen2();
            break;
        case 3:
            console.log('ok'+ tab);
            screen3();
            break;
        case 4:
            console.log('ok' + tab);
            screen4();
            break;
        case 5:
            console.log('ok'+ tab);
            overview();
            break;
    }
}

window.onload = function () {
    getUrl();
    overview();
};

document.getElementById('screen1').addEventListener('new-window', function (event) {
    const Window = electron.remote.BrowserWindow;
    var linkWindow = new Window({width: 800, height: 600});
    linkWindow.loadURL(event.url);
    linkWindow.on('closed', function () {
        linkWindow = null;
    });
});

document.getElementById('screen2').addEventListener('new-window', function (event) {
    const Window = electron.remote.BrowserWindow;
    var linkWindow = new Window({width: 800, height: 600});
    linkWindow.loadURL(event.url);
    linkWindow.on('closed', function () {
        linkWindow = null;
    });
});

document.getElementById('screen3').addEventListener('new-window', function (event) {
    const Window = electron.remote.BrowserWindow;
    var linkWindow = new Window({width: 800, height: 600});
    linkWindow.loadURL(event.url);
    linkWindow.on('closed', function () {
        linkWindow = null;
    });
});

document.getElementById('screen4').addEventListener('new-window', function (event) {
    const Window = electron.remote.BrowserWindow;
    var linkWindow = new Window({width: 800, height: 600});
    linkWindow.loadURL(event.url);
    linkWindow.on('closed', function () {
        linkWindow = null;
    });
});