function erased()
{
    document.getElementById('messenger').style.display="none";
    document.getElementById('discord').style.display="none";
    document.getElementById('recherche').style.display="none";
    document.getElementById('whatsapp').style.display="none";
    document.getElementById('messenger').style.height="624px";
    document.getElementById('messenger').style.width="100%";
    document.getElementById('discord').style.height="624px";
    document.getElementById('discord').style.width="100%";
    document.getElementById('whatsapp').style.height="624px";
    document.getElementById('whatsapp').style.width="100%";
    document.getElementById('recherche').style.height="624px";
    document.getElementById('recherche').style.width="100%";
}

function messenger()
{
    erased();
    document.getElementById('messenger').style.height="624px";
    document.getElementById('messenger').style.width="100%";
    document.getElementById('messenger').style.display="inline-flex";
}

function recherche()
{
    erased();
    document.getElementById('recherche').style.height="624px";
    document.getElementById('recherche').style.width="100%";
    document.getElementById('recherche').style.display="inline-flex";
}

function discord()
{
    erased();
    document.getElementById('discord').style.height="624px";
    document.getElementById('discord').style.width="100%";
    document.getElementById('discord').style.display="inline-flex";
}

function whatsapp()
{
    erased();
    document.getElementById('whatsapp').style.display="inline-flex";
    document.getElementById('whatsapp').style.height="624px";
    document.getElementById('whatsapp').style.width="100%";
}

function overview()
{
    document.getElementById('messenger').style.display="inline-flex";
    document.getElementById('messenger').style.height="310px";
    document.getElementById('messenger').style.width="50%";
    document.getElementById('discord').style.display="inline-flex";
    document.getElementById('discord').style.height="310px";
    document.getElementById('discord').style.width="50%";
    document.getElementById('recherche').style.display="inline-flex";
    document.getElementById('recherche').style.height="310px";
    document.getElementById('recherche').style.width="50%";
    document.getElementById('whatsapp').style.display="inline-flex";
    document.getElementById('whatsapp').style.height="310px";
    document.getElementById('whatsapp').style.width="50%";
}

window.onload=overview();

document.getElementById('messenger').addEventListener('new-window', function (event, url){
    const Window = electron.remote.BrowserWindow
    var linkWindow = new Window({width: 800, height: 600})
    linkWindow.loadURL(event.url);
    linkWindow.on('closed', function (){
        linkWindow = null;
    })
})

document.getElementById('recherche').addEventListener('new-window', function (event, url){
    const Window = electron.remote.BrowserWindow
    var linkWindow = new Window({width: 800, height: 600})
    linkWindow.loadURL(event.url);
    linkWindow.on('closed', function (){
        linkWindow = null;
    })
})

document.getElementById('discord').addEventListener('new-window', function (event, url){
    const Window = electron.remote.BrowserWindow
    var linkWindow = new Window({width: 800, height: 600})
    linkWindow.loadURL(event.url);
    linkWindow.on('closed', function (){
        linkWindow = null;
    })
})

document.getElementById('whatsapp').addEventListener('new-window', function (event, url){
    const Window = electron.remote.BrowserWindow
    var linkWindow = new Window({width: 800, height: 600})
    linkWindow.loadURL(event.url);
    linkWindow.on('closed', function (){
        linkWindow = null;
    })
})