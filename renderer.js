/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const tabGroup = document.querySelector("tab-group");

// Setup the default tab which is created when the "New Tab" button is clicked
tabGroup.setDefaultTab({
  title: "electron-tabs",
  src: "https://github.com/brrd/electron-tabs",
  iconURL: "node_modules/electron-tabs/demo/mark-github.svg",
  active: true
});

tabGroup.addTab({
    title: "Electron",
    src: "https://www.electronjs.org/",
    visible: true,
    active: true,
    badge: {
      text: `${versions.electron()}`
    }
});
