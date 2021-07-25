const {app, BrowserWindow, Menu, session, webContents, shell ,MenuItem} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {

    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36';
        callback({cancel: false, requestHeaders: details.requestHeaders, 'Content-Security-Policy': ["default-src 'self'"]});
    })
    
    mainWindow = new BrowserWindow(
        {webPreferences:
            {nodeIntegration: true, nodeIntegrationInWorker: true, enableRemoteModule: true, contextIsolation: false, webviewTag: true}
        , width: 800, height: 600
    })
    
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'chatParam/chatview.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('web-contents-created', (e, contents) => {
    if (contents.getType() == 'webview') {
        contents.on('new-window', (e, url) => {
            if (!url.includes("nautiljon")) {
                e.preventDefault()
                let win = new BrowserWindow({width: 800, height: 600})
                win.loadURL(url);
            } else {
                contents.loadURL(url);
            }
        })
        contents.on('context-menu', (e, params) => {
        const sugges = new Menu()
        for (const suggestion of params.dictionarySuggestions) {
            sugges.append(new MenuItem({
                label: suggestion,
                click: () => mainWindow.webContents.replaceMisspelling(suggestion)
            }))
        }
        sugges.popup();
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
        pathname: path.join(__dirname, 'chatParam/chatview.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function openAnime() {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'anime/animeview.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function openUrl() {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'chatParam/url.html'),
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
