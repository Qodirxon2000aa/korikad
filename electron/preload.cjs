const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("korikAdminDesktop", {
  isDesktop: true
});
