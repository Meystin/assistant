/*const { remote } = require('electron');
const { readFileSync } = require('fs')

let currWindow = remote.BrowserWindow.getFocusedWindow();

window.closeCurrentWindow = function(){
  currWindow.close();
}*/

window.ipcRenderer = require('electron').ipcRenderer;
