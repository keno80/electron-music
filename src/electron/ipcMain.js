const {ipcMain, BrowserWindow} = require('electron')

//窗口设置
const mainWindow = BrowserWindow.getAllWindows()

//窗口最小化
ipcMain.on('window-min',() => {
	console.log('www');
	console.log(mainWindow);
	// mainWindow.minimize()
})

//窗口最大化
ipcMain.on('window-max', () => {
	if (mainWindow.isMaximized()) {
		mainWindow.restore()
	} else {
		mainWindow.maximize()
	}
})

//关闭窗口
ipcMain.on('window-close', () => {
	// mainWindow.close()
})
