/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    electron: any;
    sysinfo: any;
    nio: any;
    ncryp: any;
    store: any;
    misc: any;
  }
}
