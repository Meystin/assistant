const electron = require('electron')
const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'chatview.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

function openGame(){
    mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'jeuview.html'),
    protocol: 'file:',
    slashes: true
  }))
}

function openChat(){
    mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'chatview.html'),
    protocol: 'file:',
    slashes: true
  }))
}

function openAnime(){
    mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'animeview.html'),
    protocol: 'file:',
    slashes: true
  }))
}

function openUrl(){
    mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'url.html'),
    protocol: 'file:',
    slashes: true
  }))
}

const template = [
  {
    label: 'Menu',
    submenu:[
        {
            label: '2048',
            click () { openGame(); }
        
        },
        {
            label: 'Anime',
            click () { openAnime(); }
        
        },
        {
            label: 'Chat',
            click (){ openChat(); }
        },
        {
            label: 'Paramètre',
            click (){ openUrl(); }
        }
    ]
},
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://www.reddit.com/r/Konosuba/comments/5y3hq6/chunchunmaru/') }
      },
      {
          role:'reload'
      },
      {
          role:'toggledevtools'
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
