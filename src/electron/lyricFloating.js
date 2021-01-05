const {remote} = window.require('electron')

let deskLyricWindow = null
const modalPath = 'http://localhost:8080/'

export function createDeskLyricWindow() {
	if (remote.BrowserWindow.getAllWindows().length === 1) {
		deskLyricWindow = new remote.BrowserWindow({
			width: 700,
			height: 76,
			frame: false,
			fullscreen: false,
			transparent: true,
			alwaysOnTop: true,
			webPreferences: {
				nodeIntegration: true
			}
		})

		deskLyricWindow.webContents.openDevTools()

		deskLyricWindow.setSkipTaskbar(true)
		deskLyricWindow.maximizable = false
		deskLyricWindow.minimizable = false
		deskLyricWindow.setPosition(600, 760)

		deskLyricWindow.loadURL(modalPath + '#/desk/lyric')
		deskLyricWindow.on('closed', () => {
			deskLyricWindow = null
		})
	} else {
		// deskLyricWindow.on('closeDesk', () => {
		// 	console.log('show');
		// })
	}
}