// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // needed for Electron >= 12.x
            webviewTag: true
        }
    });

    // and load the index.html of the app.
    mainWindow.maximize()
    mainWindow.show()
    mainWindow.loadFile('index.html')
    return mainWindow
}

app.whenReady().then(() => {
    const mainWindow = createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    app.on('web-contents-created', function (webContentsCreatedEvent, contents) {
        if (contents.getType() === 'webview') {
            contents.setWindowOpenHandler(details => {
                mainWindow.webContents.send('open-tab', details)
                return {
                    action: "deny"
                }
            })
        }
    });
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
