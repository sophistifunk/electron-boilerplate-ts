/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/github-electron/github-electron-main.d.ts" />

import app = require('app');
import BrowserWindow = require('browser-window');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

var mainWindow:GitHubElectron.BrowserWindow;

function createMainWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 400,
        resizable: false
    });

    win.loadUrl(`file://${__dirname}/index.html`);
    win.on('closed', onClosed);

    return win;
}

function onClosed() {
    // deref the window
    // for multiple windows store them in an array
    mainWindow = null;
}

app.on('window-all-closed', function () {
    app.quit();
});

app.on('activate-with-no-open-windows', function () {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', function () {
    mainWindow = createMainWindow();
});
