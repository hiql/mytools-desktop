const { contextBridge, ipcRenderer } = require('electron');
const sysinfo = require('./sysinfo');
const nio = require('./nio');
const ncryp = require('./crypto');
const misc = require('./misc');
const store = require('./store');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    getAppVersion() {
      ipcRenderer.send('ipc-get-app-version', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-get-app-version'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-get-app-version'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});

contextBridge.exposeInMainWorld('store', store);
contextBridge.exposeInMainWorld('sysinfo', sysinfo);
contextBridge.exposeInMainWorld('nio', nio);
contextBridge.exposeInMainWorld('ncryp', ncryp);
contextBridge.exposeInMainWorld('misc', misc);
