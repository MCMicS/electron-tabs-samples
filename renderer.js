const TabGroup = require('electron-tabs')
const ipcRenderer = require("electron").ipcRenderer;

let tabGroup = new TabGroup();

tabGroup.addTab({
    title: "Electron",
    src: "./demo.html",
    visible: true,
    active: true,
    webviewAttributes: {
        allowpopups: true,
        id:'foo',
    }
});

function openTab(details) {
    console.log(`Open Tab ${details.url}`)
    tabGroup.addTab({
        title: "new page",
        src: details.url,
        active: true,
    });
}
ipcRenderer.on('open-tab', (event, details) => openTab(details))

