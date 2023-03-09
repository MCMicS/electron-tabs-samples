/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const TabGroup = require('electron-tabs')

let tabGroup = new TabGroup({
    newTab: {
        title: 'New Tab'
    }
});

tabGroup.addTab({
    title: "Electron",
    src: "https://www.electronjs.org/",
    visible: true,
    active: true
});
