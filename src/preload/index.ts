import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
	'topbar', {
		min: () => {
			ipcRenderer.send('minimize-window');
		},
		max: () => {
			ipcRenderer.send('maximize-window');
		},
		close: () => {
			ipcRenderer.send('close-window');
		}
		
	}
);