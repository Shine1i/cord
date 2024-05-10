import { app, BrowserWindow } from 'electron';
import { start, load } from 'adapter-electron/functions';
import isDev from 'electron-is-dev';

import nodePath from 'node:path';
import { ipcMain } from 'electron';
import { log } from 'electron-log';

const port = await start();

async function createWindow() {
	
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		minWidth: 1280,
		minHeight: 720,
		backgroundColor: '#FFF',
		webPreferences: {
			preload: nodePath.join(__dirname, '../preload/index.mjs'),
			nodeIntegration: true,
			contextIsolation: true
			
		
		},
		frame: false
	});
	
	load(mainWindow, port);
	
	if (isDev) mainWindow.webContents.openDevTools();
	ipcMain.on('maximize-window', () => {
		if (!mainWindow.isMaximized()) {
			mainWindow.maximize();
		} else {
			mainWindow.unmaximize();
		}
	});
	ipcMain.on('minimize-window', () => {
		log('hello');
		mainWindow.minimize();
	});
	
	
	ipcMain.on('unmaximize-window', () => {
		mainWindow.unmaximize();
	});
	
	ipcMain.on('close-window', () => {
		mainWindow.close();
	});
	
	ipcMain.on('renderer-reload', () => {
		mainWindow.removeAllListeners();
	});
	
	ipcMain.on('window-is-maximized', (event) => {
		event.reply(mainWindow.isMaximized() ? 'window-maximized' : 'window-unmaximized');
	});
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
})