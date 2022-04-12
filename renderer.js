const TabGroup = require('electron-tabs')

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

const webview = document.getElementById('foo')

webview.addEventListener('new-window', (e) => {
    e.preventDefault()
    tabGroup.addTab({
        title: "new page",
        src: e.url,
        active: true,
    });

});

