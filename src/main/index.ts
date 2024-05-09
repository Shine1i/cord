import { app, BrowserWindow } from 'electron';
import { start, load } from 'adapter-electron/functions';
import isDev from 'electron-is-dev';

import nodePath from 'node:path';

const port = await start();

async function createWindow() {
	
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		minWidth: 1280,
		minHeight: 720,
		backgroundColor: '#FFF',
		webPreferences: {
			preload: nodePath.join(__dirname, '../preload/index.mjs')
		},
		frame: false
		
	});
	
	// Load the local URL for development or the local
	// html file for production
	load(mainWindow, port);
	
	if (isDev) mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
	
	createWindow();
	
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
