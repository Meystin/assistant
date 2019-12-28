const {app, BrowserWindow, Menu, session, webContents, shell} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
    
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36';
        callback({cancel: false, requestHeaders: details.requestHeaders, 'Content-Security-Policy': ["default-src 'self'"]});
    });

    mainWindow = new BrowserWindow({webPreferences: {contextIsolation: true}, width: 800, height: 600})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'chatview.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

//'Content-Security-Policy': ["default-src 'self'"]
//{extraHeaders: "Content-Security-Policy: default-src 'self'"}

app.on('web-contents-created', (e, contents) => {
    if (contents.getType() == 'webview') {
        contents.on('new-window', (e, url) => {
            e.preventDefault()
            let win = new BrowserWindow({width: 800, height: 600})
            win.loadURL(url);
        })
    }
})

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function openGame() {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'jeuview.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function openChat() {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'chatview.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function openAnime() {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'animeview.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function openUrl() {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'url.html'),
        protocol: 'file:',
        slashes: true
    }))
}

const template = [
    {
        label: 'Menu',
        submenu: [
            {
                label: '2048',
                click() {
                    openGame();
                }

            },
            {
                label: 'Anime',
                click() {
                    openAnime();
                }

            },
            {
                label: 'Chat',
                click() {
                    openChat();
                }
            },
            {
                label: 'Paramètre',
                click() {
                    openUrl();
                }
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() {
                    require('electron').shell.openExternal('https://www.reddit.com/r/Konosuba/comments/5y3hq6/chunchunmaru/')
                }
            },
            {
                role: 'reload'
            },
            {
                role: 'toggledevtools'
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
