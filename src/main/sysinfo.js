module.exports = {
  cpu: () => process.getCPUUsage().percentCPUUsage,
  mem: () => process.memoryUsage().rss,
  pid: () => process.pid,
  uptime: () => process.uptime(),
  arch: () => process.arch,
  platform: () => process.platform,
  versions: {
    electron: process.versions.electron,
    node: process.versions.node,
    chrome: process.versions.chrome,
  },
};
