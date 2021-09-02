const Store = require('electron-store');

const store = new Store({ watch: true });
const registry = new Map();

module.exports = {
  set: (key, value) => {
    store.set(key, value);
  },
  get: (key, defaultValue) => {
    const storedValue = store.get(key);
    if (storedValue === null || storedValue === undefined) {
      if (defaultValue === undefined) {
        return null;
      }
      return defaultValue;
    }
    return storedValue;
  },
  watch: (key, callback) => {
    const unsubscribe = store.onDidChange(key, callback);
    registry.set(key, unsubscribe);
  },
  unwatch: (key) => {
    const unsubscribe = registry.get(key);
    unsubscribe();
  },
};
