// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, webContents} = require('electron')
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
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  ipcMain.on('new-tab', (event, webContentsId) => {
    const tabWebContents = webContents.fromId(webContentsId)
    tabWebContents.setWindowOpenHandler((details) => {
      console.log(`Handle ${details.url} as ${details.disposition} for ${tabWebContents.id}`)
      switch(details.disposition) {
          case "foreground-tab":
              mainWindow.webContents.send('open-tab', {url: details.url, active: true})
              break
          case "background-tab":
              mainWindow.webContents.send('open-tab', {url: details.url, active: false})
              break
          case "new-window":
              return {
                  action: 'allow'
              }

      }
      return { action: 'deny' }
    })
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
