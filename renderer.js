// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const TabGroup = require("electron-tabs");
const { ipcRenderer } = require('electron')
let tabGroup = new TabGroup();
tabGroup.addTab(
  {
    title: "index",
    src: `https://github.com/MCMicS/electron-tabs-samples/tree/puchenhui/refreshTab/`,
    active: true,
    closable: false,
    visible: true,
    webviewAttributes: {
      allowpopups: true,
    },
  });

openAddTab = (details, name) => {
  let tab = tabGroup.addTab({
    title: name,
    src: details.url,
    active: true,
    webviewAttributes: {
      allowpopups: true,
    },
  });
  tab.webview.addEventListener('close', () => tab.close())
}
openAddTab({url: "https://github.com/puchenhui"}, 'Second')

onFlushed = () => {
  let activeTab = tabGroup.getActiveTab()
  if (activeTab) {
    console.log(activeTab);
    let webview = activeTab.webview;
    console.log('Reload tab with URL: ' + webview.getURL());
    webview.reload();
  }
}

toClose = () => {
  ipcRenderer.send('close-app')
}
