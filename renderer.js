// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const TabGroup = require('electron-tabs')
const ipcRenderer = require("electron").ipcRenderer;

let tabGroup = new TabGroup({
    newTab: {
        title: 'New Tab'
    }
});
tabGroup.on("tab-added", (tab, tabGroup) => {
    tab.once("webview-ready", t => ipcRenderer.send('new-tab', t.webview.getWebContentsId()))
})

tabGroup.addTab({
    title: "Electron",
    src: "https://www.electronjs.org/",
    visible: true
});

tabGroup.addTab({
    title: "Allow Popups",
    src: "./allowPopups.html",
    visible: true,
    active: true,
    webviewAttributes: {
        'allowpopups': true
    }
});

function openTab(tabInfo) {
    console.log(`Open Tab ${tabInfo.url} as active --> ${tabInfo.active}`)
    tabGroup.addTab({
        title: tabInfo.title || "From Popup",
        src: tabInfo.url,
        visible: true,
        active: tabInfo.active,
        webviewAttributes: {
            'allowpopups': true
        }
    });
}

ipcRenderer.on('open-tab', (event, tabInfo) => openTab(tabInfo))
