import electron, { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import require$$2 from 'path';
import require$$0$2 from 'child_process';
import require$$1 from 'os';
import require$$0$1 from 'fs';
import require$$0$3 from 'util';
import require$$0$4 from 'events';
import require$$0$5 from 'http';
import require$$1$1 from 'https';
import require$$2$1 from 'querystring';
import __cjs_url__ from 'node:url';
import __cjs_path__ from 'node:path';
import __cjs_mod__ from 'node:module';
const __filename = __cjs_url__.fileURLToPath(import.meta.url);
const __dirname = __cjs_path__.dirname(__filename);
const require2 = __cjs_mod__.createRequire(import.meta.url);
if (typeof electron === 'string') {
	throw new TypeError('Not running in an Electron environment!');
}
const { env } = process;
const isEnvSet = 'ELECTRON_IS_DEV' in env;
const getFromEnv = Number.parseInt(env.ELECTRON_IS_DEV, 10) === 1;
const isDev = isEnvSet ? getFromEnv : !electron.app.isPackaged;
function getDefaultExportFromCjs(x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}
function getAugmentedNamespace(n) {
	if (n.__esModule)
		return n;
	var f = n.default;
	if (typeof f == 'function') {
		var a = function a2() {
			if (this instanceof a2) {
				return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
	} else
		a = {};
	Object.defineProperty(a, '__esModule', { value: true });
	Object.keys(n).forEach(function(k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function() {
				return n[k];
			}
		});
	});
	return a;
}

var packageJson;
var hasRequiredPackageJson;

function requirePackageJson() {
	if (hasRequiredPackageJson)
		return packageJson;
	hasRequiredPackageJson = 1;
	const fs = require$$0$1;
	const path2 = require$$2;
	packageJson = {
		findAndReadPackageJson,
		tryReadJsonAt
	};
	
	function findAndReadPackageJson() {
		return tryReadJsonAt(getMainModulePath()) || tryReadJsonAt(extractPathFromArgs()) || tryReadJsonAt(process.resourcesPath, 'app.asar') || tryReadJsonAt(process.resourcesPath, 'app') || tryReadJsonAt(process.cwd()) || {
			name: void 0,
			version: void 0
		};
	}
	
	function tryReadJsonAt(...searchPaths) {
		if (!searchPaths[0]) {
			return void 0;
		}
		try {
			const searchPath = path2.join(...searchPaths);
			const fileName = findUp('package.json', searchPath);
			if (!fileName) {
				return void 0;
			}
			const json = JSON.parse(fs.readFileSync(fileName, 'utf8'));
			const name = json?.productName || json?.name;
			if (!name || name.toLowerCase() === 'electron') {
				return void 0;
			}
			if (name) {
				return { name, version: json?.version };
			}
			return void 0;
		} catch (e) {
			return void 0;
		}
	}
	
	function findUp(fileName, cwd) {
		let currentPath = cwd;
		while (true) {
			const parsedPath = path2.parse(currentPath);
			const root = parsedPath.root;
			const dir = parsedPath.dir;
			if (fs.existsSync(path2.join(currentPath, fileName))) {
				return path2.resolve(path2.join(currentPath, fileName));
			}
			if (currentPath === root) {
				return null;
			}
			currentPath = dir;
		}
	}
	
	function extractPathFromArgs() {
		const matchedArgs = process.argv.filter((arg) => {
			return arg.indexOf('--user-data-dir=') === 0;
		});
		if (matchedArgs.length === 0 || typeof matchedArgs[0] !== 'string') {
			return null;
		}
		const userDataDir = matchedArgs[0];
		return userDataDir.replace('--user-data-dir=', '');
	}
	
	function getMainModulePath() {
		try {
			return require2.main?.filename;
		} catch {
			return void 0;
		}
	}
	
	return packageJson;
}

var NodeExternalApi_1;
var hasRequiredNodeExternalApi;

function requireNodeExternalApi() {
	if (hasRequiredNodeExternalApi)
		return NodeExternalApi_1;
	hasRequiredNodeExternalApi = 1;
	const childProcess = require$$0$2;
	const os = require$$1;
	const path2 = require$$2;
	const packageJson2 = requirePackageJson();
	
	class NodeExternalApi {
		appName = void 0;
		appPackageJson = void 0;
		platform = process.platform;
		
		getAppLogPath(appName = this.getAppName()) {
			if (this.platform === 'darwin') {
				return path2.join(this.getSystemPathHome(), 'Library/Logs', appName);
			}
			return path2.join(this.getAppUserDataPath(appName), 'logs');
		}
		
		getAppName() {
			return this.appName || this.getAppPackageJson()?.name;
		}
		
		/**
		 * @private
		 * @returns {undefined}
		 */
		getAppPackageJson() {
			if (typeof this.appPackageJson !== 'object') {
				this.appPackageJson = packageJson2.findAndReadPackageJson();
			}
			return this.appPackageJson;
		}
		
		getAppUserDataPath(appName = this.getAppName()) {
			return appName ? path2.join(this.getSystemPathAppData(), appName) : void 0;
		}
		
		getAppVersion() {
			return this.getAppPackageJson()?.version;
		}
		
		getElectronLogPath() {
			return this.getAppLogPath();
		}
		
		getMacOsVersion() {
			const release = Number(os.release().split('.')[0]);
			if (release <= 19) {
				return `10.${release - 4}`;
			}
			return release - 9;
		}
		
		/**
		 * @protected
		 * @returns {string}
		 */
		getOsVersion() {
			let osName = os.type().replace('_', ' ');
			let osVersion = os.release();
			if (osName === 'Darwin') {
				osName = 'macOS';
				osVersion = this.getMacOsVersion();
			}
			return `${osName} ${osVersion}`;
		}
		
		/**
		 * @return {PathVariables}
		 */
		getPathVariables() {
			const appName = this.getAppName();
			const appVersion = this.getAppVersion();
			const self = this;
			return {
				appData: this.getSystemPathAppData(),
				appName,
				appVersion,
				get electronDefaultDir() {
					return self.getElectronLogPath();
				},
				home: this.getSystemPathHome(),
				libraryDefaultDir: this.getAppLogPath(appName),
				libraryTemplate: this.getAppLogPath('{appName}'),
				temp: this.getSystemPathTemp(),
				userData: this.getAppUserDataPath(appName)
			};
		}
		
		getSystemPathAppData() {
			const home = this.getSystemPathHome();
			switch (this.platform) {
				case 'darwin': {
					return path2.join(home, 'Library/Application Support');
				}
				case 'win32': {
					return process.env.APPDATA || path2.join(home, 'AppData/Roaming');
				}
				default: {
					return process.env.XDG_CONFIG_HOME || path2.join(home, '.config');
				}
			}
		}
		
		getSystemPathHome() {
			return os.homedir?.() || process.env.HOME;
		}
		
		getSystemPathTemp() {
			return os.tmpdir();
		}
		
		getVersions() {
			return {
				app: `${this.getAppName()} ${this.getAppVersion()}`,
				electron: void 0,
				os: this.getOsVersion()
			};
		}
		
		isDev() {
			return process.env.NODE_ENV === 'development' || process.env.ELECTRON_IS_DEV === '1';
		}
		
		isElectron() {
			return Boolean(process.versions.electron);
		}
		
		onAppEvent(_eventName, _handler) {
		}
		
		onAppReady(handler) {
			handler();
		}
		
		onEveryWebContentsEvent(eventName, handler) {
		}
		
		/**
		 * Listen to async messages sent from opposite process
		 * @param {string} channel
		 * @param {function} listener
		 */
		onIpc(channel, listener) {
		}
		
		onIpcInvoke(channel, listener) {
		}
		
		/**
		 * @param {string} url
		 * @param {Function} [logFunction]
		 */
		openUrl(url2, logFunction = console.error) {
			const startMap = { darwin: 'open', win32: 'start', linux: 'xdg-open' };
			const start2 = startMap[process.platform] || 'xdg-open';
			childProcess.exec(`${start2} ${url2}`, {}, (err) => {
				if (err) {
					logFunction(err);
				}
			});
		}
		
		setPlatform(platform) {
			this.platform = platform;
		}
		
		setPreloadFileForSessions({
																filePath,
																// eslint-disable-line no-unused-vars
																includeFutureSession = true,
																// eslint-disable-line no-unused-vars
																getSessions = () => []
																// eslint-disable-line no-unused-vars
															}) {
		}
		
		/**
		 * Sent a message to opposite process
		 * @param {string} channel
		 * @param {any} message
		 */
		sendIpc(channel, message) {
		}
		
		showErrorBox(title, message) {
		}
	}
	
	NodeExternalApi_1 = NodeExternalApi;
	return NodeExternalApi_1;
}

var ElectronExternalApi_1;
var hasRequiredElectronExternalApi;

function requireElectronExternalApi() {
	if (hasRequiredElectronExternalApi)
		return ElectronExternalApi_1;
	hasRequiredElectronExternalApi = 1;
	const path2 = require$$2;
	const NodeExternalApi = requireNodeExternalApi();
	
	class ElectronExternalApi extends NodeExternalApi {
		/**
		 * @type {typeof Electron}
		 */
		electron = void 0;
		
		/**
		 * @param {object} options
		 * @param {typeof Electron} [options.electron]
		 */
		constructor({ electron: electron2 } = {}) {
			super();
			this.electron = electron2;
		}
		
		getAppName() {
			let appName;
			try {
				appName = this.electron.app?.name || this.electron.app?.getName();
			} catch {
			}
			return appName || super.getAppName();
		}
		
		getAppUserDataPath(appName) {
			return this.getPath('userData') || super.getAppUserDataPath(appName);
		}
		
		getAppVersion() {
			let appVersion;
			try {
				appVersion = this.electron.app?.getVersion();
			} catch {
			}
			return appVersion || super.getAppVersion();
		}
		
		getElectronLogPath() {
			return this.getPath('logs') || super.getElectronLogPath();
		}
		
		/**
		 * @private
		 * @param {any} name
		 * @returns {string|undefined}
		 */
		getPath(name) {
			try {
				return this.electron.app?.getPath(name);
			} catch {
				return void 0;
			}
		}
		
		getVersions() {
			return {
				app: `${this.getAppName()} ${this.getAppVersion()}`,
				electron: `Electron ${process.versions.electron}`,
				os: this.getOsVersion()
			};
		}
		
		getSystemPathAppData() {
			return this.getPath('appData') || super.getSystemPathAppData();
		}
		
		isDev() {
			if (this.electron.app?.isPackaged !== void 0) {
				return !this.electron.app.isPackaged;
			}
			if (typeof process.execPath === 'string') {
				const execFileName = path2.basename(process.execPath).toLowerCase();
				return execFileName.startsWith('electron');
			}
			return super.isDev();
		}
		
		onAppEvent(eventName, handler) {
			this.electron.app?.on(eventName, handler);
			return () => {
				this.electron.app?.off(eventName, handler);
			};
		}
		
		onAppReady(handler) {
			if (this.electron.app?.isReady()) {
				handler();
			} else if (this.electron.app?.once) {
				this.electron.app?.once('ready', handler);
			} else {
				handler();
			}
		}
		
		onEveryWebContentsEvent(eventName, handler) {
			this.electron.webContents?.getAllWebContents()?.forEach((webContents) => {
				webContents.on(eventName, handler);
			});
			this.electron.app?.on('web-contents-created', onWebContentsCreated);
			return () => {
				this.electron.webContents?.getAllWebContents().forEach((webContents) => {
					webContents.off(eventName, handler);
				});
				this.electron.app?.off('web-contents-created', onWebContentsCreated);
			};
			
			function onWebContentsCreated(_, webContents) {
				webContents.on(eventName, handler);
			}
		}
		
		/**
		 * Listen to async messages sent from opposite process
		 * @param {string} channel
		 * @param {function} listener
		 */
		onIpc(channel, listener) {
			this.electron.ipcMain?.on(channel, listener);
		}
		
		onIpcInvoke(channel, listener) {
			this.electron.ipcMain?.handle?.(channel, listener);
		}
		
		/**
		 * @param {string} url
		 * @param {Function} [logFunction]
		 */
		openUrl(url2, logFunction = console.error) {
			this.electron.shell?.openExternal(url2).catch(logFunction);
		}
		
		setPreloadFileForSessions({
																filePath,
																includeFutureSession = true,
																getSessions = () => [this.electron.session?.defaultSession]
															}) {
			for (const session of getSessions().filter(Boolean)) {
				setPreload(session);
			}
			if (includeFutureSession) {
				this.onAppEvent('session-created', (session) => {
					setPreload(session);
				});
			}
			
			function setPreload(session) {
				session.setPreloads([...session.getPreloads(), filePath]);
			}
		}
		
		/**
		 * Sent a message to opposite process
		 * @param {string} channel
		 * @param {any} message
		 */
		sendIpc(channel, message) {
			this.electron.BrowserWindow?.getAllWindows()?.forEach((wnd) => {
				if (wnd.webContents?.isDestroyed() === false) {
					wnd.webContents.send(channel, message);
				}
			});
		}
		
		showErrorBox(title, message) {
			this.electron.dialog?.showErrorBox(title, message);
		}
	}
	
	ElectronExternalApi_1 = ElectronExternalApi;
	return ElectronExternalApi_1;
}
var electronLogPreload = { exports: {} };
var hasRequiredElectronLogPreload;

function requireElectronLogPreload() {
	if (hasRequiredElectronLogPreload)
		return electronLogPreload.exports;
	hasRequiredElectronLogPreload = 1;
	(function(module) {
		let electron2 = {};
		try {
			electron2 = require2('electron');
		} catch (e) {
		}
		if (electron2.ipcRenderer) {
			initialize2(electron2);
		}
		{
			module.exports = initialize2;
		}
		
		function initialize2({ contextBridge, ipcRenderer }) {
			if (!ipcRenderer) {
				return;
			}
			ipcRenderer.on('__ELECTRON_LOG_IPC__', (_, message) => {
				window.postMessage({ cmd: 'message', ...message });
			});
			ipcRenderer.invoke('__ELECTRON_LOG__', { cmd: 'getOptions' }).catch((e) => console.error(new Error(
				`electron-log isn't initialized in the main process. Please call log.initialize() before. ${e.message}`
			)));
			const electronLog = {
				sendToMain(message) {
					try {
						ipcRenderer.send('__ELECTRON_LOG__', message);
					} catch (e) {
						console.error('electronLog.sendToMain ', e, 'data:', message);
						ipcRenderer.send('__ELECTRON_LOG__', {
							cmd: 'errorHandler',
							error: { message: e?.message, stack: e?.stack },
							errorName: 'sendToMain'
						});
					}
				},
				log(...data) {
					electronLog.sendToMain({ data, level: 'info' });
				}
			};
			for (const level of ['error', 'warn', 'info', 'verbose', 'debug', 'silly']) {
				electronLog[level] = (...data) => electronLog.sendToMain({
					data,
					level
				});
			}
			if (contextBridge && process.contextIsolated) {
				try {
					contextBridge.exposeInMainWorld('__electronLog', electronLog);
				} catch {
				}
			}
			if (typeof window === 'object') {
				window.__electronLog = electronLog;
			} else {
				__electronLog = electronLog;
			}
		}
	})(electronLogPreload);
	return electronLogPreload.exports;
}

var initialize;
var hasRequiredInitialize;

function requireInitialize() {
	if (hasRequiredInitialize)
		return initialize;
	hasRequiredInitialize = 1;
	const fs = require$$0$1;
	const os = require$$1;
	const path2 = require$$2;
	const preloadInitializeFn = requireElectronLogPreload();
	initialize = {
		initialize({
								 externalApi,
								 getSessions,
								 includeFutureSession,
								 logger,
								 preload = true,
								 spyRendererConsole = false
							 }) {
			externalApi.onAppReady(() => {
				try {
					if (preload) {
						initializePreload({
							externalApi,
							getSessions,
							includeFutureSession,
							preloadOption: preload
						});
					}
					if (spyRendererConsole) {
						initializeSpyRendererConsole({ externalApi, logger });
					}
				} catch (err) {
					logger.warn(err);
				}
			});
		}
	};
	
	function initializePreload({
															 externalApi,
															 getSessions,
															 includeFutureSession,
															 preloadOption
														 }) {
		let preloadPath = typeof preloadOption === 'string' ? preloadOption : void 0;
		try {
			preloadPath = path2.resolve(
				__dirname,
				'../renderer/electron-log-preload.js'
			);
		} catch {
		}
		if (!preloadPath || !fs.existsSync(preloadPath)) {
			preloadPath = path2.join(
				externalApi.getAppUserDataPath() || os.tmpdir(),
				'electron-log-preload.js'
			);
			const preloadCode = `
      try {
        (${preloadInitializeFn.toString()})(require('electron'));
      } catch(e) {
        console.error(e);
      }
    `;
			fs.writeFileSync(preloadPath, preloadCode, 'utf8');
		}
		externalApi.setPreloadFileForSessions({
			filePath: preloadPath,
			includeFutureSession,
			getSessions
		});
	}
	
	function initializeSpyRendererConsole({ externalApi, logger }) {
		const levels = ['verbose', 'info', 'warning', 'error'];
		externalApi.onEveryWebContentsEvent(
			'console-message',
			(event, level, message) => {
				logger.processMessage({
					data: [message],
					level: levels[level],
					variables: { processType: 'renderer' }
				});
			}
		);
	}
	
	return initialize;
}

var scope;
var hasRequiredScope;

function requireScope() {
	if (hasRequiredScope)
		return scope;
	hasRequiredScope = 1;
	scope = scopeFactory;
	
	function scopeFactory(logger) {
		return Object.defineProperties(scope2, {
			defaultLabel: { value: '', writable: true },
			labelPadding: { value: true, writable: true },
			maxLabelLength: { value: 0, writable: true },
			labelLength: {
				get() {
					switch (typeof scope2.labelPadding) {
						case 'boolean':
							return scope2.labelPadding ? scope2.maxLabelLength : 0;
						case 'number':
							return scope2.labelPadding;
						default:
							return 0;
					}
				}
			}
		});
		
		function scope2(label) {
			scope2.maxLabelLength = Math.max(scope2.maxLabelLength, label.length);
			const newScope = {};
			for (const level of [...logger.levels, 'log']) {
				newScope[level] = (...d) => logger.logData(d, { level, scope: label });
			}
			return newScope;
		}
	}
	
	return scope;
}

var Logger_1;
var hasRequiredLogger;

function requireLogger() {
	if (hasRequiredLogger)
		return Logger_1;
	hasRequiredLogger = 1;
	const scopeFactory = requireScope();
	
	class Logger {
		static instances = {};
		dependencies = {};
		errorHandler = null;
		eventLogger = null;
		functions = {};
		hooks = [];
		isDev = false;
		levels = null;
		logId = null;
		scope = null;
		transports = {};
		variables = {};
		
		constructor({
									allowUnknownLevel = false,
									dependencies = {},
									errorHandler,
									eventLogger,
									initializeFn,
									isDev: isDev2 = false,
									levels = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'],
									logId,
									transportFactories = {},
									variables
								} = {}) {
			this.addLevel = this.addLevel.bind(this);
			this.create = this.create.bind(this);
			this.initialize = this.initialize.bind(this);
			this.logData = this.logData.bind(this);
			this.processMessage = this.processMessage.bind(this);
			this.allowUnknownLevel = allowUnknownLevel;
			this.dependencies = dependencies;
			this.initializeFn = initializeFn;
			this.isDev = isDev2;
			this.levels = levels;
			this.logId = logId;
			this.transportFactories = transportFactories;
			this.variables = variables || {};
			this.scope = scopeFactory(this);
			this.addLevel('log', false);
			for (const name of this.levels) {
				this.addLevel(name, false);
			}
			this.errorHandler = errorHandler;
			errorHandler?.setOptions({ ...dependencies, logFn: this.error });
			this.eventLogger = eventLogger;
			eventLogger?.setOptions({ ...dependencies, logger: this });
			for (const [name, factory] of Object.entries(transportFactories)) {
				this.transports[name] = factory(this, dependencies);
			}
			Logger.instances[logId] = this;
		}
		
		static getInstance({ logId }) {
			return this.instances[logId] || this.instances.default;
		}
		
		addLevel(level, index = this.levels.length) {
			if (index !== false) {
				this.levels.splice(index, 0, level);
			}
			this[level] = (...args) => this.logData(args, { level });
			this.functions[level] = this[level];
		}
		
		catchErrors(options) {
			this.processMessage(
				{
					data: ['log.catchErrors is deprecated. Use log.errorHandler instead'],
					level: 'warn'
				},
				{ transports: ['console'] }
			);
			return this.errorHandler.startCatching(options);
		}
		
		create(options) {
			if (typeof options === 'string') {
				options = { logId: options };
			}
			return new Logger({
				dependencies: this.dependencies,
				errorHandler: this.errorHandler,
				initializeFn: this.initializeFn,
				isDev: this.isDev,
				transportFactories: this.transportFactories,
				variables: { ...this.variables },
				...options
			});
		}
		
		compareLevels(passLevel, checkLevel, levels = this.levels) {
			const pass = levels.indexOf(passLevel);
			const check = levels.indexOf(checkLevel);
			if (check === -1 || pass === -1) {
				return true;
			}
			return check <= pass;
		}
		
		initialize(options = {}) {
			this.initializeFn({ logger: this, ...this.dependencies, ...options });
		}
		
		logData(data, options = {}) {
			this.processMessage({ data, ...options });
		}
		
		processMessage(message, { transports = this.transports } = {}) {
			if (message.cmd === 'errorHandler') {
				this.errorHandler.handle(message.error, {
					errorName: message.errorName,
					processType: 'renderer',
					showDialog: Boolean(message.showDialog)
				});
				return;
			}
			let level = message.level;
			if (!this.allowUnknownLevel) {
				level = this.levels.includes(message.level) ? message.level : 'info';
			}
			const normalizedMessage = {
				date: /* @__PURE__ */ new Date(),
				...message,
				level,
				variables: {
					...this.variables,
					...message.variables
				}
			};
			for (const [transName, transFn] of this.transportEntries(transports)) {
				if (typeof transFn !== 'function' || transFn.level === false) {
					continue;
				}
				if (!this.compareLevels(transFn.level, message.level)) {
					continue;
				}
				try {
					const transformedMsg = this.hooks.reduce((msg, hook) => {
						return msg ? hook(msg, transFn, transName) : msg;
					}, normalizedMessage);
					if (transformedMsg) {
						transFn({ ...transformedMsg, data: [...transformedMsg.data] });
					}
				} catch (e) {
					this.processInternalErrorFn(e);
				}
			}
		}
		
		processInternalErrorFn(_e) {
		}
		
		transportEntries(transports = this.transports) {
			const transportArray = Array.isArray(transports) ? transports : Object.entries(transports);
			return transportArray.map((item) => {
				switch (typeof item) {
					case 'string':
						return this.transports[item] ? [item, this.transports[item]] : null;
					case 'function':
						return [item.name, item];
					default:
						return Array.isArray(item) ? item : null;
				}
			}).filter(Boolean);
		}
	}
	
	Logger_1 = Logger;
	return Logger_1;
}

var ErrorHandler_1;
var hasRequiredErrorHandler;

function requireErrorHandler() {
	if (hasRequiredErrorHandler)
		return ErrorHandler_1;
	hasRequiredErrorHandler = 1;
	
	class ErrorHandler {
		externalApi = void 0;
		isActive = false;
		logFn = void 0;
		onError = void 0;
		showDialog = true;
		
		constructor({
									externalApi,
									logFn = void 0,
									onError: onError2 = void 0,
									showDialog = void 0
								} = {}) {
			this.createIssue = this.createIssue.bind(this);
			this.handleError = this.handleError.bind(this);
			this.handleRejection = this.handleRejection.bind(this);
			this.setOptions({ externalApi, logFn, onError: onError2, showDialog });
			this.startCatching = this.startCatching.bind(this);
			this.stopCatching = this.stopCatching.bind(this);
		}
		
		handle(error, {
			logFn = this.logFn,
			onError: onError2 = this.onError,
			processType = 'browser',
			showDialog = this.showDialog,
			errorName = ''
		} = {}) {
			error = normalizeError(error);
			try {
				if (typeof onError2 === 'function') {
					const versions = this.externalApi?.getVersions() || {};
					const createIssue = this.createIssue;
					const result = onError2({
						createIssue,
						error,
						errorName,
						processType,
						versions
					});
					if (result === false) {
						return;
					}
				}
				errorName ? logFn(errorName, error) : logFn(error);
				if (showDialog && !errorName.includes('rejection') && this.externalApi) {
					this.externalApi.showErrorBox(
						`A JavaScript error occurred in the ${processType} process`,
						error.stack
					);
				}
			} catch {
				console.error(error);
			}
		}
		
		setOptions({ externalApi, logFn, onError: onError2, showDialog }) {
			if (typeof externalApi === 'object') {
				this.externalApi = externalApi;
			}
			if (typeof logFn === 'function') {
				this.logFn = logFn;
			}
			if (typeof onError2 === 'function') {
				this.onError = onError2;
			}
			if (typeof showDialog === 'boolean') {
				this.showDialog = showDialog;
			}
		}
		
		startCatching({ onError: onError2, showDialog } = {}) {
			if (this.isActive) {
				return;
			}
			this.isActive = true;
			this.setOptions({ onError: onError2, showDialog });
			process.on('uncaughtException', this.handleError);
			process.on('unhandledRejection', this.handleRejection);
		}
		
		stopCatching() {
			this.isActive = false;
			process.removeListener('uncaughtException', this.handleError);
			process.removeListener('unhandledRejection', this.handleRejection);
		}
		
		createIssue(pageUrl, queryParams) {
			this.externalApi?.openUrl(
				`${pageUrl}?${new URLSearchParams(queryParams).toString()}`
			);
		}
		
		handleError(error) {
			this.handle(error, { errorName: 'Unhandled' });
		}
		
		handleRejection(reason) {
			const error = reason instanceof Error ? reason : new Error(JSON.stringify(reason));
			this.handle(error, { errorName: 'Unhandled rejection' });
		}
	}
	
	function normalizeError(e) {
		if (e instanceof Error) {
			return e;
		}
		if (e && typeof e === 'object') {
			if (e.message) {
				return Object.assign(new Error(e.message), e);
			}
			try {
				return new Error(JSON.stringify(e));
			} catch (serErr) {
				return new Error(`Couldn't normalize error ${String(e)}: ${serErr}`);
			}
		}
		return new Error(`Can't normalize error ${String(e)}`);
	}
	
	ErrorHandler_1 = ErrorHandler;
	return ErrorHandler_1;
}

var EventLogger_1;
var hasRequiredEventLogger;

function requireEventLogger() {
	if (hasRequiredEventLogger)
		return EventLogger_1;
	hasRequiredEventLogger = 1;
	
	class EventLogger {
		disposers = [];
		format = '{eventSource}#{eventName}:';
		formatters = {
			app: {
				'certificate-error': ({ args }) => {
					return this.arrayToObject(args.slice(1, 4), [
						'url',
						'error',
						'certificate'
					]);
				},
				'child-process-gone': ({ args }) => {
					return args.length === 1 ? args[0] : args;
				},
				'render-process-gone': ({ args: [webContents, details] }) => {
					return details && typeof details === 'object' ? { ...details, ...this.getWebContentsDetails(webContents) } : [];
				}
			},
			webContents: {
				'console-message': ({ args: [level, message, line, sourceId] }) => {
					if (level < 3) {
						return void 0;
					}
					return { message, source: `${sourceId}:${line}` };
				},
				'did-fail-load': ({ args }) => {
					return this.arrayToObject(args, [
						'errorCode',
						'errorDescription',
						'validatedURL',
						'isMainFrame',
						'frameProcessId',
						'frameRoutingId'
					]);
				},
				'did-fail-provisional-load': ({ args }) => {
					return this.arrayToObject(args, [
						'errorCode',
						'errorDescription',
						'validatedURL',
						'isMainFrame',
						'frameProcessId',
						'frameRoutingId'
					]);
				},
				'plugin-crashed': ({ args }) => {
					return this.arrayToObject(args, ['name', 'version']);
				},
				'preload-error': ({ args }) => {
					return this.arrayToObject(args, ['preloadPath', 'error']);
				}
			}
		};
		events = {
			app: {
				'certificate-error': true,
				'child-process-gone': true,
				'render-process-gone': true
			},
			webContents: {
				// 'console-message': true,
				'did-fail-load': true,
				'did-fail-provisional-load': true,
				'plugin-crashed': true,
				'preload-error': true,
				'unresponsive': true
			}
		};
		externalApi = void 0;
		level = 'error';
		scope = '';
		
		constructor(options = {}) {
			this.setOptions(options);
		}
		
		setOptions({
								 events,
								 externalApi,
								 level,
								 logger,
								 format: format2,
								 formatters,
								 scope: scope2
							 }) {
			if (typeof events === 'object') {
				this.events = events;
			}
			if (typeof externalApi === 'object') {
				this.externalApi = externalApi;
			}
			if (typeof level === 'string') {
				this.level = level;
			}
			if (typeof logger === 'object') {
				this.logger = logger;
			}
			if (typeof format2 === 'string' || typeof format2 === 'function') {
				this.format = format2;
			}
			if (typeof formatters === 'object') {
				this.formatters = formatters;
			}
			if (typeof scope2 === 'string') {
				this.scope = scope2;
			}
		}
		
		startLogging(options = {}) {
			this.setOptions(options);
			this.disposeListeners();
			for (const eventName of this.getEventNames(this.events.app)) {
				this.disposers.push(
					this.externalApi.onAppEvent(eventName, (...handlerArgs) => {
						this.handleEvent({ eventSource: 'app', eventName, handlerArgs });
					})
				);
			}
			for (const eventName of this.getEventNames(this.events.webContents)) {
				this.disposers.push(
					this.externalApi.onEveryWebContentsEvent(
						eventName,
						(...handlerArgs) => {
							this.handleEvent(
								{ eventSource: 'webContents', eventName, handlerArgs }
							);
						}
					)
				);
			}
		}
		
		stopLogging() {
			this.disposeListeners();
		}
		
		arrayToObject(array, fieldNames) {
			const obj = {};
			fieldNames.forEach((fieldName, index) => {
				obj[fieldName] = array[index];
			});
			if (array.length > fieldNames.length) {
				obj.unknownArgs = array.slice(fieldNames.length);
			}
			return obj;
		}
		
		disposeListeners() {
			this.disposers.forEach((disposer) => disposer());
			this.disposers = [];
		}
		
		formatEventLog({ eventName, eventSource, handlerArgs }) {
			const [event, ...args] = handlerArgs;
			if (typeof this.format === 'function') {
				return this.format({ args, event, eventName, eventSource });
			}
			const formatter = this.formatters[eventSource]?.[eventName];
			let formattedArgs = args;
			if (typeof formatter === 'function') {
				formattedArgs = formatter({ args, event, eventName, eventSource });
			}
			if (!formattedArgs) {
				return void 0;
			}
			const eventData = {};
			if (Array.isArray(formattedArgs)) {
				eventData.args = formattedArgs;
			} else if (typeof formattedArgs === 'object') {
				Object.assign(eventData, formattedArgs);
			}
			if (eventSource === 'webContents') {
				Object.assign(eventData, this.getWebContentsDetails(event?.sender));
			}
			const title = this.format.replace('{eventSource}', eventSource === 'app' ? 'App' : 'WebContents').replace('{eventName}', eventName);
			return [title, eventData];
		}
		
		getEventNames(eventMap) {
			if (!eventMap || typeof eventMap !== 'object') {
				return [];
			}
			return Object.entries(eventMap).filter(([_, listen]) => listen).map(([eventName]) => eventName);
		}
		
		getWebContentsDetails(webContents) {
			if (!webContents?.loadURL) {
				return {};
			}
			try {
				return {
					webContents: {
						id: webContents.id,
						url: webContents.getURL()
					}
				};
			} catch {
				return {};
			}
		}
		
		handleEvent({ eventName, eventSource, handlerArgs }) {
			const log2 = this.formatEventLog({ eventName, eventSource, handlerArgs });
			if (log2) {
				const logFns = this.scope ? this.logger.scope(this.scope) : this.logger;
				logFns?.[this.level]?.(...log2);
			}
		}
	}
	
	EventLogger_1 = EventLogger;
	return EventLogger_1;
}

var transform_1;
var hasRequiredTransform;

function requireTransform() {
	if (hasRequiredTransform)
		return transform_1;
	hasRequiredTransform = 1;
	transform_1 = { transform };
	
	function transform({
											 logger,
											 message,
											 transport,
											 initialData = message?.data || [],
											 transforms = transport?.transforms
										 }) {
		return transforms.reduce((data, trans) => {
			if (typeof trans === 'function') {
				return trans({ data, logger, message, transport });
			}
			return data;
		}, initialData);
	}
	
	return transform_1;
}

var format;
var hasRequiredFormat;

function requireFormat() {
	if (hasRequiredFormat)
		return format;
	hasRequiredFormat = 1;
	const { transform } = requireTransform();
	format = {
		concatFirstStringElements,
		formatScope,
		formatText,
		formatVariables,
		timeZoneFromOffset,
		format({ message, logger, transport, data = message?.data }) {
			switch (typeof transport.format) {
				case 'string': {
					return transform({
						message,
						logger,
						transforms: [formatVariables, formatScope, formatText],
						transport,
						initialData: [transport.format, ...data]
					});
				}
				case 'function': {
					return transport.format({
						data,
						level: message?.level || 'info',
						logger,
						message,
						transport
					});
				}
				default: {
					return data;
				}
			}
		}
	};
	
	function concatFirstStringElements({ data }) {
		if (typeof data[0] !== 'string' || typeof data[1] !== 'string') {
			return data;
		}
		if (data[0].match(/%[1cdfiOos]/)) {
			return data;
		}
		return [`${data[0]} ${data[1]}`, ...data.slice(2)];
	}
	
	function timeZoneFromOffset(minutesOffset) {
		const minutesPositive = Math.abs(minutesOffset);
		const sign = minutesOffset >= 0 ? '-' : '+';
		const hours = Math.floor(minutesPositive / 60).toString().padStart(2, '0');
		const minutes = (minutesPositive % 60).toString().padStart(2, '0');
		return `${sign}${hours}:${minutes}`;
	}
	
	function formatScope({ data, logger, message }) {
		const { defaultLabel, labelLength } = logger?.scope || {};
		const template = data[0];
		let label = message.scope;
		if (!label) {
			label = defaultLabel;
		}
		let scopeText;
		if (label === '') {
			scopeText = labelLength > 0 ? ''.padEnd(labelLength + 3) : '';
		} else if (typeof label === 'string') {
			scopeText = ` (${label})`.padEnd(labelLength + 3);
		} else {
			scopeText = '';
		}
		data[0] = template.replace('{scope}', scopeText);
		return data;
	}
	
	function formatVariables({ data, message }) {
		let template = data[0];
		if (typeof template !== 'string') {
			return data;
		}
		template = template.replace('{level}]', `${message.level}]`.padEnd(6, ' '));
		const date = message.date || /* @__PURE__ */ new Date();
		data[0] = template.replace(/\{(\w+)}/g, (substring, name) => {
			switch (name) {
				case 'level':
					return message.level || 'info';
				case 'logId':
					return message.logId;
				case 'y':
					return date.getFullYear().toString(10);
				case 'm':
					return (date.getMonth() + 1).toString(10).padStart(2, '0');
				case 'd':
					return date.getDate().toString(10).padStart(2, '0');
				case 'h':
					return date.getHours().toString(10).padStart(2, '0');
				case 'i':
					return date.getMinutes().toString(10).padStart(2, '0');
				case 's':
					return date.getSeconds().toString(10).padStart(2, '0');
				case 'ms':
					return date.getMilliseconds().toString(10).padStart(3, '0');
				case 'z':
					return timeZoneFromOffset(date.getTimezoneOffset());
				case 'iso':
					return date.toISOString();
				default: {
					return message.variables?.[name] || substring;
				}
			}
		}).trim();
		return data;
	}
	
	function formatText({ data }) {
		const template = data[0];
		if (typeof template !== 'string') {
			return data;
		}
		const textTplPosition = template.lastIndexOf('{text}');
		if (textTplPosition === template.length - 6) {
			data[0] = template.replace(/\s?{text}/, '');
			if (data[0] === '') {
				data.shift();
			}
			return data;
		}
		const templatePieces = template.split('{text}');
		let result = [];
		if (templatePieces[0] !== '') {
			result.push(templatePieces[0]);
		}
		result = result.concat(data.slice(1));
		if (templatePieces[1] !== '') {
			result.push(templatePieces[1]);
		}
		return result;
	}
	
	return format;
}
var object = { exports: {} };
var hasRequiredObject;

function requireObject() {
	if (hasRequiredObject)
		return object.exports;
	hasRequiredObject = 1;
	(function(module) {
		const util = require$$0$3;
		module.exports = {
			serialize,
			maxDepth({ data, transport, depth = transport?.depth ?? 6 }) {
				if (!data) {
					return data;
				}
				if (depth < 1) {
					if (Array.isArray(data))
						return '[array]';
					if (typeof data === 'object' && data)
						return '[object]';
					return data;
				}
				if (Array.isArray(data)) {
					return data.map((child) => module.exports.maxDepth({
						data: child,
						depth: depth - 1
					}));
				}
				if (typeof data !== 'object') {
					return data;
				}
				if (data && typeof data.toISOString === 'function') {
					return data;
				}
				if (data === null) {
					return null;
				}
				if (data instanceof Error) {
					return data;
				}
				const newJson = {};
				for (const i in data) {
					if (!Object.prototype.hasOwnProperty.call(data, i))
						continue;
					newJson[i] = module.exports.maxDepth({
						data: data[i],
						depth: depth - 1
					});
				}
				return newJson;
			},
			toJSON({ data }) {
				return JSON.parse(JSON.stringify(data, createSerializer()));
			},
			toString({ data, transport }) {
				const inspectOptions = transport?.inspectOptions || {};
				const simplifiedData = data.map((item) => {
					if (item === void 0) {
						return void 0;
					}
					try {
						const str = JSON.stringify(item, createSerializer(), '  ');
						return str === void 0 ? void 0 : JSON.parse(str);
					} catch (e) {
						return item;
					}
				});
				return util.formatWithOptions(inspectOptions, ...simplifiedData);
			}
		};
		
		function createSerializer(options = {}) {
			const seen = /* @__PURE__ */ new WeakSet();
			return function(key, value2) {
				if (typeof value2 === 'object' && value2 !== null) {
					if (seen.has(value2)) {
						return void 0;
					}
					seen.add(value2);
				}
				return serialize(key, value2, options);
			};
		}
		
		function serialize(key, value2, options = {}) {
			const serializeMapAndSet = options?.serializeMapAndSet !== false;
			if (value2 instanceof Error) {
				return value2.stack;
			}
			if (!value2) {
				return value2;
			}
			if (typeof value2 === 'function') {
				return `[function] ${value2.toString()}`;
			}
			if (value2 instanceof Date) {
				return value2.toISOString();
			}
			if (serializeMapAndSet && value2 instanceof Map && Object.fromEntries) {
				return Object.fromEntries(value2);
			}
			if (serializeMapAndSet && value2 instanceof Set && Array.from) {
				return Array.from(value2);
			}
			return value2;
		}
	})(object);
	return object.exports;
}

var style;
var hasRequiredStyle;

function requireStyle() {
	if (hasRequiredStyle)
		return style;
	hasRequiredStyle = 1;
	style = {
		transformStyles,
		applyAnsiStyles({ data }) {
			return transformStyles(data, styleToAnsi, resetAnsiStyle);
		},
		removeStyles({ data }) {
			return transformStyles(data, () => '');
		}
	};
	const ANSI_COLORS = {
		unset: '\x1B[0m',
		black: '\x1B[30m',
		red: '\x1B[31m',
		green: '\x1B[32m',
		yellow: '\x1B[33m',
		blue: '\x1B[34m',
		magenta: '\x1B[35m',
		cyan: '\x1B[36m',
		white: '\x1B[37m'
	};
	
	function styleToAnsi(style2) {
		const color = style2.replace(/color:\s*(\w+).*/, '$1').toLowerCase();
		return ANSI_COLORS[color] || '';
	}
	
	function resetAnsiStyle(string) {
		return string + ANSI_COLORS.unset;
	}
	
	function transformStyles(data, onStyleFound, onStyleApplied) {
		const foundStyles = {};
		return data.reduce((result, item, index, array) => {
			if (foundStyles[index]) {
				return result;
			}
			if (typeof item === 'string') {
				let valueIndex = index;
				let styleApplied = false;
				item = item.replace(/%[1cdfiOos]/g, (match2) => {
					valueIndex += 1;
					if (match2 !== '%c') {
						return match2;
					}
					const style2 = array[valueIndex];
					if (typeof style2 === 'string') {
						foundStyles[valueIndex] = true;
						styleApplied = true;
						return onStyleFound(style2, item);
					}
					return match2;
				});
				if (styleApplied && onStyleApplied) {
					item = onStyleApplied(item);
				}
			}
			result.push(item);
			return result;
		}, []);
	}
	
	return style;
}

var console_1$1;
var hasRequiredConsole$1;

function requireConsole$1() {
	if (hasRequiredConsole$1)
		return console_1$1;
	hasRequiredConsole$1 = 1;
	const { concatFirstStringElements, format: format2 } = requireFormat();
	const { maxDepth, toJSON } = requireObject();
	const { applyAnsiStyles, removeStyles } = requireStyle();
	const { transform } = requireTransform();
	const consoleMethods = {
		error: console.error,
		warn: console.warn,
		info: console.info,
		verbose: console.info,
		debug: console.debug,
		silly: console.debug,
		log: console.log
	};
	console_1$1 = consoleTransportFactory;
	const separator = process.platform === 'win32' ? '>' : '›';
	const DEFAULT_FORMAT = `%c{h}:{i}:{s}.{ms}{scope}%c ${separator} {text}`;
	Object.assign(consoleTransportFactory, {
		DEFAULT_FORMAT
	});
	
	function consoleTransportFactory(logger) {
		return Object.assign(transport, {
			format: DEFAULT_FORMAT,
			level: 'silly',
			transforms: [
				addTemplateColors,
				format2,
				formatStyles,
				concatFirstStringElements,
				maxDepth,
				toJSON
			],
			useStyles: process.env.FORCE_STYLES,
			writeFn({ message }) {
				const consoleLogFn = consoleMethods[message.level] || consoleMethods.info;
				consoleLogFn(...message.data);
			}
		});
		
		function transport(message) {
			const data = transform({ logger, message, transport });
			transport.writeFn({
				message: { ...message, data }
			});
		}
	}
	
	function addTemplateColors({ data, message, transport }) {
		if (transport.format !== DEFAULT_FORMAT) {
			return data;
		}
		return [`color:${levelToStyle(message.level)}`, 'color:unset', ...data];
	}
	
	function canUseStyles(useStyleValue, level) {
		if (typeof useStyleValue === 'boolean') {
			return useStyleValue;
		}
		const useStderr = level === 'error' || level === 'warn';
		const stream = useStderr ? process.stderr : process.stdout;
		return stream && stream.isTTY;
	}
	
	function formatStyles(args) {
		const { message, transport } = args;
		const useStyles = canUseStyles(transport.useStyles, message.level);
		const nextTransform = useStyles ? applyAnsiStyles : removeStyles;
		return nextTransform(args);
	}
	
	function levelToStyle(level) {
		const map = {
			error: 'red',
			warn: 'yellow',
			info: 'cyan',
			default: 'unset'
		};
		return map[level] || map.default;
	}
	
	return console_1$1;
}

var File_1;
var hasRequiredFile$1;

function requireFile$1() {
	if (hasRequiredFile$1)
		return File_1;
	hasRequiredFile$1 = 1;
	const EventEmitter = require$$0$4;
	const fs = require$$0$1;
	const os = require$$1;
	
	class File extends EventEmitter {
		asyncWriteQueue = [];
		bytesWritten = 0;
		hasActiveAsyncWriting = false;
		path = null;
		initialSize = void 0;
		writeOptions = null;
		writeAsync = false;
		
		constructor({
									path: path2,
									writeOptions = { encoding: 'utf8', flag: 'a', mode: 438 },
									writeAsync = false
								}) {
			super();
			this.path = path2;
			this.writeOptions = writeOptions;
			this.writeAsync = writeAsync;
		}
		
		get size() {
			return this.getSize();
		}
		
		clear() {
			try {
				fs.writeFileSync(this.path, '', {
					mode: this.writeOptions.mode,
					flag: 'w'
				});
				this.reset();
				return true;
			} catch (e) {
				if (e.code === 'ENOENT') {
					return true;
				}
				this.emit('error', e, this);
				return false;
			}
		}
		
		crop(bytesAfter) {
			try {
				const content = readFileSyncFromEnd(this.path, bytesAfter || 4096);
				this.clear();
				this.writeLine(`[log cropped]${os.EOL}${content}`);
			} catch (e) {
				this.emit(
					'error',
					new Error(`Couldn't crop file ${this.path}. ${e.message}`),
					this
				);
			}
		}
		
		getSize() {
			if (this.initialSize === void 0) {
				try {
					const stats = fs.statSync(this.path);
					this.initialSize = stats.size;
				} catch (e) {
					this.initialSize = 0;
				}
			}
			return this.initialSize + this.bytesWritten;
		}
		
		increaseBytesWrittenCounter(text) {
			this.bytesWritten += Buffer.byteLength(text, this.writeOptions.encoding);
		}
		
		isNull() {
			return false;
		}
		
		nextAsyncWrite() {
			const file2 = this;
			if (this.hasActiveAsyncWriting || this.asyncWriteQueue.length === 0) {
				return;
			}
			const text = this.asyncWriteQueue.join('');
			this.asyncWriteQueue = [];
			this.hasActiveAsyncWriting = true;
			fs.writeFile(this.path, text, this.writeOptions, (e) => {
				file2.hasActiveAsyncWriting = false;
				if (e) {
					file2.emit(
						'error',
						new Error(`Couldn't write to ${file2.path}. ${e.message}`),
						this
					);
				} else {
					file2.increaseBytesWrittenCounter(text);
				}
				file2.nextAsyncWrite();
			});
		}
		
		reset() {
			this.initialSize = void 0;
			this.bytesWritten = 0;
		}
		
		toString() {
			return this.path;
		}
		
		writeLine(text) {
			text += os.EOL;
			if (this.writeAsync) {
				this.asyncWriteQueue.push(text);
				this.nextAsyncWrite();
				return;
			}
			try {
				fs.writeFileSync(this.path, text, this.writeOptions);
				this.increaseBytesWrittenCounter(text);
			} catch (e) {
				this.emit(
					'error',
					new Error(`Couldn't write to ${this.path}. ${e.message}`),
					this
				);
			}
		}
	}
	
	File_1 = File;
	
	function readFileSyncFromEnd(filePath, bytesCount) {
		const buffer = Buffer.alloc(bytesCount);
		const stats = fs.statSync(filePath);
		const readLength = Math.min(stats.size, bytesCount);
		const offset = Math.max(0, stats.size - bytesCount);
		const fd = fs.openSync(filePath, 'r');
		const totalBytes = fs.readSync(fd, buffer, 0, readLength, offset);
		fs.closeSync(fd);
		return buffer.toString('utf8', 0, totalBytes);
	}
	
	return File_1;
}

var NullFile_1;
var hasRequiredNullFile;

function requireNullFile() {
	if (hasRequiredNullFile)
		return NullFile_1;
	hasRequiredNullFile = 1;
	const File = requireFile$1();
	
	class NullFile extends File {
		clear() {
		}
		
		crop() {
		}
		
		getSize() {
			return 0;
		}
		
		isNull() {
			return true;
		}
		
		writeLine() {
		}
	}
	
	NullFile_1 = NullFile;
	return NullFile_1;
}

var FileRegistry_1;
var hasRequiredFileRegistry;

function requireFileRegistry() {
	if (hasRequiredFileRegistry)
		return FileRegistry_1;
	hasRequiredFileRegistry = 1;
	const EventEmitter = require$$0$4;
	const fs = require$$0$1;
	const path2 = require$$2;
	const File = requireFile$1();
	const NullFile = requireNullFile();
	
	class FileRegistry extends EventEmitter {
		store = {};
		
		constructor() {
			super();
			this.emitError = this.emitError.bind(this);
		}
		
		/**
		 * Provide a File object corresponding to the filePath
		 * @param {string} filePath
		 * @param {WriteOptions} [writeOptions]
		 * @param {boolean} [writeAsync]
		 * @return {File}
		 */
		provide({ filePath, writeOptions, writeAsync = false }) {
			let file2;
			try {
				filePath = path2.resolve(filePath);
				if (this.store[filePath]) {
					return this.store[filePath];
				}
				file2 = this.createFile({ filePath, writeOptions, writeAsync });
			} catch (e) {
				file2 = new NullFile({ path: filePath });
				this.emitError(e, file2);
			}
			file2.on('error', this.emitError);
			this.store[filePath] = file2;
			return file2;
		}
		
		/**
		 * @param {string} filePath
		 * @param {WriteOptions} writeOptions
		 * @param {boolean} async
		 * @return {File}
		 * @private
		 */
		createFile({ filePath, writeOptions, writeAsync }) {
			this.testFileWriting(filePath);
			return new File({ path: filePath, writeOptions, writeAsync });
		}
		
		/**
		 * @param {Error} error
		 * @param {File} file
		 * @private
		 */
		emitError(error, file2) {
			this.emit('error', error, file2);
		}
		
		/**
		 * @param {string} filePath
		 * @private
		 */
		testFileWriting(filePath) {
			fs.mkdirSync(path2.dirname(filePath), { recursive: true });
			fs.writeFileSync(filePath, '', { flag: 'a' });
		}
	}
	
	FileRegistry_1 = FileRegistry;
	return FileRegistry_1;
}

var file;
var hasRequiredFile;

function requireFile() {
	if (hasRequiredFile)
		return file;
	hasRequiredFile = 1;
	const fs = require$$0$1;
	const os = require$$1;
	const path2 = require$$2;
	const FileRegistry = requireFileRegistry();
	const { transform } = requireTransform();
	const { removeStyles } = requireStyle();
	const { format: format2 } = requireFormat();
	const { toString } = requireObject();
	file = fileTransportFactory;
	const globalRegistry = new FileRegistry();
	
	function fileTransportFactory(logger, {
		registry = globalRegistry,
		externalApi
	} = {}) {
		let pathVariables;
		if (registry.listenerCount('error') < 1) {
			registry.on('error', (e, file2) => {
				logConsole(`Can't write to ${file2}`, e);
			});
		}
		return Object.assign(transport, {
			fileName: getDefaultFileName(logger.variables.processType),
			format: '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}',
			getFile,
			inspectOptions: { depth: 5 },
			level: 'silly',
			maxSize: 1024 ** 2,
			readAllLogs,
			sync: true,
			transforms: [removeStyles, format2, toString],
			writeOptions: { flag: 'a', mode: 438, encoding: 'utf8' },
			archiveLogFn(file2) {
				const oldPath = file2.toString();
				const inf = path2.parse(oldPath);
				try {
					fs.renameSync(oldPath, path2.join(inf.dir, `${inf.name}.old${inf.ext}`));
				} catch (e) {
					logConsole('Could not rotate log', e);
					const quarterOfMaxSize = Math.round(transport.maxSize / 4);
					file2.crop(Math.min(quarterOfMaxSize, 256 * 1024));
				}
			},
			resolvePathFn(vars) {
				return path2.join(vars.libraryDefaultDir, vars.fileName);
			}
		});
		
		function transport(message) {
			const file2 = getFile(message);
			const needLogRotation = transport.maxSize > 0 && file2.size > transport.maxSize;
			if (needLogRotation) {
				transport.archiveLogFn(file2);
				file2.reset();
			}
			const content = transform({ logger, message, transport });
			file2.writeLine(content);
		}
		
		function initializeOnFirstAccess() {
			if (pathVariables) {
				return;
			}
			pathVariables = Object.create(
				Object.prototype,
				{
					...Object.getOwnPropertyDescriptors(
						externalApi.getPathVariables()
					),
					fileName: {
						get() {
							return transport.fileName;
						},
						enumerable: true
					}
				}
			);
			if (typeof transport.archiveLog === 'function') {
				transport.archiveLogFn = transport.archiveLog;
				logConsole('archiveLog is deprecated. Use archiveLogFn instead');
			}
			if (typeof transport.resolvePath === 'function') {
				transport.resolvePathFn = transport.resolvePath;
				logConsole('resolvePath is deprecated. Use resolvePathFn instead');
			}
		}
		
		function logConsole(message, error = null, level = 'error') {
			const data = [`electron-log.transports.file: ${message}`];
			if (error) {
				data.push(error);
			}
			logger.transports.console({
				data,
				date: /* @__PURE__ */ new Date(),
				level
			});
		}
		
		function getFile(msg) {
			initializeOnFirstAccess();
			const filePath = transport.resolvePathFn(pathVariables, msg);
			return registry.provide({
				filePath,
				writeAsync: !transport.sync,
				writeOptions: transport.writeOptions
			});
		}
		
		function readAllLogs({ fileFilter = (f) => f.endsWith('.log') } = {}) {
			initializeOnFirstAccess();
			const logsPath = path2.dirname(transport.resolvePathFn(pathVariables));
			if (!fs.existsSync(logsPath)) {
				return [];
			}
			return fs.readdirSync(logsPath).map((fileName) => path2.join(logsPath, fileName)).filter(fileFilter).map((logPath) => {
				try {
					return {
						path: logPath,
						lines: fs.readFileSync(logPath, 'utf8').split(os.EOL)
					};
				} catch {
					return null;
				}
			}).filter(Boolean);
		}
	}
	
	function getDefaultFileName(processType = process.type) {
		switch (processType) {
			case 'renderer':
				return 'renderer.log';
			case 'worker':
				return 'worker.log';
			default:
				return 'main.log';
		}
	}
	
	return file;
}

var ipc$1;
var hasRequiredIpc$1;

function requireIpc$1() {
	if (hasRequiredIpc$1)
		return ipc$1;
	hasRequiredIpc$1 = 1;
	const { maxDepth, toJSON } = requireObject();
	const { transform } = requireTransform();
	ipc$1 = ipcTransportFactory;
	
	function ipcTransportFactory(logger, { externalApi }) {
		Object.assign(transport, {
			depth: 3,
			eventId: '__ELECTRON_LOG_IPC__',
			level: logger.isDev ? 'silly' : false,
			transforms: [toJSON, maxDepth]
		});
		return externalApi?.isElectron() ? transport : void 0;
		
		function transport(message) {
			if (message?.variables?.processType === 'renderer') {
				return;
			}
			externalApi?.sendIpc(transport.eventId, {
				...message,
				data: transform({ logger, message, transport })
			});
		}
	}
	
	return ipc$1;
}

var remote;
var hasRequiredRemote;

function requireRemote() {
	if (hasRequiredRemote)
		return remote;
	hasRequiredRemote = 1;
	const http2 = require$$0$5;
	const https = require$$1$1;
	const { transform } = requireTransform();
	const { removeStyles } = requireStyle();
	const { toJSON, maxDepth } = requireObject();
	remote = remoteTransportFactory;
	
	function remoteTransportFactory(logger) {
		return Object.assign(transport, {
			client: { name: 'electron-application' },
			depth: 6,
			level: false,
			requestOptions: {},
			transforms: [removeStyles, toJSON, maxDepth],
			makeBodyFn({ message }) {
				return JSON.stringify({
					client: transport.client,
					data: message.data,
					date: message.date.getTime(),
					level: message.level,
					scope: message.scope,
					variables: message.variables
				});
			},
			processErrorFn({ error }) {
				logger.processMessage(
					{
						data: [`electron-log: can't POST ${transport.url}`, error],
						level: 'warn'
					},
					{ transports: ['console', 'file'] }
				);
			},
			sendRequestFn({ serverUrl, requestOptions, body }) {
				const httpTransport = serverUrl.startsWith('https:') ? https : http2;
				const request = httpTransport.request(serverUrl, {
					method: 'POST',
					...requestOptions,
					headers: {
						'Content-Type': 'application/json',
						'Content-Length': body.length,
						...requestOptions.headers
					}
				});
				request.write(body);
				request.end();
				return request;
			}
		});
		
		function transport(message) {
			if (!transport.url) {
				return;
			}
			const body = transport.makeBodyFn({
				logger,
				message: {
					...message,
					data: transform({ logger, message, transport })
				},
				transport
			});
			const request = transport.sendRequestFn({
				serverUrl: transport.url,
				requestOptions: transport.requestOptions,
				body: Buffer.from(body, 'utf8')
			});
			request.on('error', (error) => transport.processErrorFn({
				error,
				logger,
				message,
				request,
				transport
			}));
		}
	}
	
	return remote;
}

var createDefaultLogger_1;
var hasRequiredCreateDefaultLogger;

function requireCreateDefaultLogger() {
	if (hasRequiredCreateDefaultLogger)
		return createDefaultLogger_1;
	hasRequiredCreateDefaultLogger = 1;
	const Logger = requireLogger();
	const ErrorHandler = requireErrorHandler();
	const EventLogger = requireEventLogger();
	const transportConsole = requireConsole$1();
	const transportFile = requireFile();
	const transportIpc = requireIpc$1();
	const transportRemote = requireRemote();
	createDefaultLogger_1 = createDefaultLogger;
	
	function createDefaultLogger({ dependencies, initializeFn }) {
		const defaultLogger = new Logger({
			dependencies,
			errorHandler: new ErrorHandler(),
			eventLogger: new EventLogger(),
			initializeFn,
			isDev: dependencies.externalApi?.isDev(),
			logId: 'default',
			transportFactories: {
				console: transportConsole,
				file: transportFile,
				ipc: transportIpc,
				remote: transportRemote
			},
			variables: {
				processType: 'main'
			}
		});
		defaultLogger.default = defaultLogger;
		defaultLogger.Logger = Logger;
		defaultLogger.processInternalErrorFn = (e) => {
			defaultLogger.transports.console.writeFn({
				message: {
					data: ['Unhandled electron-log error', e],
					level: 'error'
				}
			});
		};
		return defaultLogger;
	}
	
	return createDefaultLogger_1;
}

var main$1;
var hasRequiredMain;

function requireMain() {
	if (hasRequiredMain)
		return main$1;
	hasRequiredMain = 1;
	const electron$1 = electron;
	const ElectronExternalApi = requireElectronExternalApi();
	const { initialize: initialize2 } = requireInitialize();
	const createDefaultLogger = requireCreateDefaultLogger();
	const externalApi = new ElectronExternalApi({ electron: electron$1 });
	const defaultLogger = createDefaultLogger({
		dependencies: { externalApi },
		initializeFn: initialize2
	});
	main$1 = defaultLogger;
	externalApi.onIpc('__ELECTRON_LOG__', (_, message) => {
		if (message.scope) {
			defaultLogger.Logger.getInstance(message).scope(message.scope);
		}
		const date = new Date(message.date);
		processMessage({
			...message,
			date: date.getTime() ? date : /* @__PURE__ */ new Date()
		});
	});
	externalApi.onIpcInvoke('__ELECTRON_LOG__', (_, { cmd = '', logId }) => {
		switch (cmd) {
			case 'getOptions': {
				const logger = defaultLogger.Logger.getInstance({ logId });
				return {
					levels: logger.levels,
					logId
				};
			}
			default: {
				processMessage({ data: [`Unknown cmd '${cmd}'`], level: 'error' });
				return {};
			}
		}
	});
	
	function processMessage(message) {
		defaultLogger.Logger.getInstance(message)?.processMessage(message);
	}
	
	return main$1;
}

const main = requireMain();
var main_1 = main;
const log = /* @__PURE__ */ getDefaultExportFromCjs(main_1);
function every(arr, cb) {
	var i = 0, len = arr.length;
	for (; i < len; i++) {
		if (!cb(arr[i], i, arr)) {
			return false;
		}
	}
	return true;
}

const SEP = '/';
const STYPE = 0, PTYPE = 1, ATYPE = 2, OTYPE = 3;
const SLASH = 47, COLON = 58, ASTER = 42, QMARK = 63;
function strip(str) {
	if (str === SEP)
		return str;
	str.charCodeAt(0) === SLASH && (str = str.substring(1));
	var len = str.length - 1;
	return str.charCodeAt(len) === SLASH ? str.substring(0, len) : str;
}
function split(str) {
	return (str = strip(str)) === SEP ? [SEP] : str.split(SEP);
}
function isMatch(arr, obj, idx) {
	idx = arr[idx];
	return obj.val === idx && obj.type === STYPE || (idx === SEP ? obj.type > PTYPE : obj.type !== STYPE && (idx || '').endsWith(obj.end));
}
function match$1(str, all) {
	var i = 0, tmp, segs = split(str), len = segs.length, l;
	var fn = isMatch.bind(isMatch, segs);
	for (; i < all.length; i++) {
		tmp = all[i];
		if ((l = tmp.length) === len || l < len && tmp[l - 1].type === ATYPE || l > len && tmp[l - 1].type === OTYPE) {
			if (every(tmp, fn))
				return tmp;
		}
	}
	return [];
}
function parse$2(str) {
	if (str === SEP) {
		return [{ old: str, type: STYPE, val: str, end: '' }];
	}
	var c, x, t, sfx, nxt = strip(str), i = -1, j = 0, len = nxt.length, out = [];
	while (++i < len) {
		c = nxt.charCodeAt(i);
		if (c === COLON) {
			j = i + 1;
			t = PTYPE;
			x = 0;
			sfx = '';
			while (i < len && nxt.charCodeAt(i) !== SLASH) {
				c = nxt.charCodeAt(i);
				if (c === QMARK) {
					x = i;
					t = OTYPE;
				} else if (c === 46 && sfx.length === 0) {
					sfx = nxt.substring(x = i);
				}
				i++;
			}
			out.push({
				old: str,
				type: t,
				val: nxt.substring(j, x || i),
				end: sfx
			});
			nxt = nxt.substring(i);
			len -= i;
			i = 0;
			continue;
		} else if (c === ASTER) {
			out.push({
				old: str,
				type: ATYPE,
				val: nxt.substring(i),
				end: ''
			});
			continue;
		} else {
			j = i;
			while (i < len && nxt.charCodeAt(i) !== SLASH) {
				++i;
			}
			out.push({
				old: str,
				type: STYPE,
				val: nxt.substring(j, i),
				end: ''
			});
			nxt = nxt.substring(i);
			len -= i;
			i = j = 0;
		}
	}
	return out;
}
function exec$1(str, arr) {
	var i = 0, x, y, segs = split(str), out = {};
	for (; i < arr.length; i++) {
		x = segs[i];
		y = arr[i];
		if (x === SEP)
			continue;
		if (x !== void 0 && y.type | 2 === OTYPE) {
			out[y.val] = x.replace(y.end, '');
		}
	}
	return out;
}
const matchit = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
	__proto__: null,
	exec: exec$1,
	match: match$1,
	parse: parse$2
}, Symbol.toStringTag, { value: 'Module' }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(matchit);
const { exec, match, parse: parse$1 } = require$$0;
class Trouter {
	constructor(opts) {
		this.opts = opts || {};
		this.routes = {};
		this.handlers = {};
		this.all = this.add.bind(this, '*');
		this.get = this.add.bind(this, 'GET');
		this.head = this.add.bind(this, 'HEAD');
		this.patch = this.add.bind(this, 'PATCH');
		this.options = this.add.bind(this, 'OPTIONS');
		this.connect = this.add.bind(this, 'CONNECT');
		this.delete = this.add.bind(this, 'DELETE');
		this.trace = this.add.bind(this, 'TRACE');
		this.post = this.add.bind(this, 'POST');
		this.put = this.add.bind(this, 'PUT');
	}
	
	add(method, pattern, ...fns) {
		if (this.routes[method] === void 0)
			this.routes[method] = [];
		this.routes[method].push(parse$1(pattern));
		if (this.handlers[method] === void 0)
			this.handlers[method] = {};
		this.handlers[method][pattern] = fns;
		return this;
	}
	
	find(method, url2) {
		let arr = match(url2, this.routes[method] || []);
		if (arr.length === 0) {
			arr = match(url2, this.routes[method = '*'] || []);
			if (!arr.length)
				return false;
		}
		return {
			params: exec(url2, arr),
			handlers: this.handlers[method][arr[0].old]
		};
	}
}
var trouter = Trouter;
var url = function(req) {
	let url2 = req.url;
	if (url2 === void 0)
		return url2;
	let obj = req._parsedUrl;
	if (obj && obj._raw === url2)
		return obj;
	obj = {};
	obj.query = obj.search = null;
	obj.href = obj.path = obj.pathname = url2;
	let idx = url2.indexOf('?', 1);
	if (idx !== -1) {
		obj.search = url2.substring(idx);
		obj.query = obj.search.substring(1);
		obj.pathname = url2.substring(0, idx);
	}
	obj._raw = url2;
	return req._parsedUrl = obj;
};
const http = require$$0$5;
const Router = trouter;
const { parse } = require$$2$1;
const parser = url;
function lead(x) {
	return x.charCodeAt(0) === 47 ? x : '/' + x;
}
function value(x) {
	let y = x.indexOf('/', 1);
	return y > 1 ? x.substring(0, y) : x;
}
function mutate(str, req) {
	req.url = req.url.substring(str.length) || '/';
	req.path = req.path.substring(str.length) || '/';
}
function onError(err, req, res, next) {
	let code = res.statusCode = err.code || err.status || 500;
	res.end(err.length && err || err.message || http.STATUS_CODES[code]);
}
class Polka extends Router {
	constructor(opts = {}) {
		super(opts);
		this.apps = {};
		this.wares = [];
		this.bwares = {};
		this.parse = parser;
		this.server = opts.server;
		this.handler = this.handler.bind(this);
		this.onError = opts.onError || onError;
		this.onNoMatch = opts.onNoMatch || this.onError.bind(null, { code: 404 });
	}
	
	add(method, pattern, ...fns) {
		let base = lead(value(pattern));
		if (this.apps[base] !== void 0)
			throw new Error(`Cannot mount ".${method.toLowerCase()}('${lead(pattern)}')" because a Polka application at ".use('${base}')" already exists! You should move this handler into your Polka application instead.`);
		return super.add(method, pattern, ...fns);
	}
	
	use(base, ...fns) {
		if (typeof base === 'function') {
			this.wares = this.wares.concat(base, fns);
		} else if (base === '/') {
			this.wares = this.wares.concat(fns);
		} else {
			base = lead(base);
			fns.forEach((fn) => {
				if (fn instanceof Polka) {
					this.apps[base] = fn;
				} else {
					let arr = this.bwares[base] || [];
					arr.length > 0 || arr.push((r, _, nxt) => (mutate(base, r), nxt()));
					this.bwares[base] = arr.concat(fn);
				}
			});
		}
		return this;
	}
	
	listen() {
		(this.server = this.server || http.createServer()).on('request', this.handler);
		this.server.listen.apply(this.server, arguments);
		return this;
	}
	
	handler(req, res, info) {
		info = info || this.parse(req);
		let fns = [], arr = this.wares, obj = this.find(req.method, info.pathname);
		req.originalUrl = req.originalUrl || req.url;
		let base = value(req.path = info.pathname);
		if (this.bwares[base] !== void 0) {
			arr = arr.concat(this.bwares[base]);
		}
		if (obj) {
			fns = obj.handlers;
			req.params = obj.params;
		} else if (this.apps[base] !== void 0) {
			mutate(base, req);
			info.pathname = req.path;
			fns.push(this.apps[base].handler.bind(null, req, res, info));
		} else if (fns.length === 0) {
			fns.push(this.onNoMatch);
		}
		req.search = info.search;
		req.query = parse(info.query);
		let i = 0, len = arr.length, num = fns.length;
		if (len === i && num === 1)
			return fns[0](req, res);
		let next = (err) => err ? this.onError(err, req, res, next) : loop();
		let loop = (_) => res.finished || i < len && arr[i++](req, res, next);
		arr = arr.concat(fns);
		len += num;
		loop();
	}
}
var polka = (opts) => new Polka(opts);
const polka$1 = /* @__PURE__ */ getDefaultExportFromCjs(polka);
const start = async () => {
	if (isDev)
		return void 0;
	const { env: env2 } = await await import(`file://${path.join(__dirname, '../renderer/env.js')}`);
	const port2 = env2('PORT', '3000');
	log.info(`Configured Port is: ${port2}`);
	log.info(`Setting origin to http://localhost:${port2}`);
	process.env['ORIGIN'] = `http://localhost:${port2}`;
	log.info('Importing Polka handler');
	const { handler } = await import(`file://${path.join(__dirname, '../renderer/handler.js')}`);
	const server = polka$1().use(handler);
	Object.assign(console, log.functions);
	log.info('Starting server...');
	server.listen({ path: false, host: 'localhost', port: port2 }, () => {
		log.info(`Server Listening on http://localhost:${port2}`);
	});
	return port2;
};
const load = (mainWindow, port2) => {
	if (isDev && process.env['ELECTRON_RENDERER_URL']) {
		log.info(`Loading url: ${process.env['ELECTRON_RENDERER_URL']}`);
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		log.info(`Loading url: http://localhost:${port2}`);
		mainWindow.loadURL(`http://localhost:${port2}`);
	}
};
var src = { exports: {} };
var renderer = { exports: {} };
var RendererErrorHandler_1;
var hasRequiredRendererErrorHandler;

function requireRendererErrorHandler() {
	if (hasRequiredRendererErrorHandler)
		return RendererErrorHandler_1;
	hasRequiredRendererErrorHandler = 1;
	const consoleError = console.error;
	
	class RendererErrorHandler {
		logFn = null;
		onError = null;
		showDialog = false;
		preventDefault = true;
		
		constructor({ logFn = null } = {}) {
			this.handleError = this.handleError.bind(this);
			this.handleRejection = this.handleRejection.bind(this);
			this.startCatching = this.startCatching.bind(this);
			this.logFn = logFn;
		}
		
		handle(error, {
			logFn = this.logFn,
			errorName = '',
			onError: onError2 = this.onError,
			showDialog = this.showDialog
		} = {}) {
			try {
				if (onError2?.({
					error,
					errorName,
					processType: 'renderer'
				}) !== false) {
					logFn({ error, errorName, showDialog });
				}
			} catch {
				consoleError(error);
			}
		}
		
		setOptions({ logFn, onError: onError2, preventDefault, showDialog }) {
			if (typeof logFn === 'function') {
				this.logFn = logFn;
			}
			if (typeof onError2 === 'function') {
				this.onError = onError2;
			}
			if (typeof preventDefault === 'boolean') {
				this.preventDefault = preventDefault;
			}
			if (typeof showDialog === 'boolean') {
				this.showDialog = showDialog;
			}
		}
		
		startCatching({ onError: onError2, showDialog } = {}) {
			if (this.isActive) {
				return;
			}
			this.isActive = true;
			this.setOptions({ onError: onError2, showDialog });
			window.addEventListener('error', (event) => {
				this.preventDefault && event.preventDefault?.();
				this.handleError(event.error || event);
			});
			window.addEventListener('unhandledrejection', (event) => {
				this.preventDefault && event.preventDefault?.();
				this.handleRejection(event.reason || event);
			});
		}
		
		handleError(error) {
			this.handle(error, { errorName: 'Unhandled' });
		}
		
		handleRejection(reason) {
			const error = reason instanceof Error ? reason : new Error(JSON.stringify(reason));
			this.handle(error, { errorName: 'Unhandled rejection' });
		}
	}
	
	RendererErrorHandler_1 = RendererErrorHandler;
	return RendererErrorHandler_1;
}

var console_1;
var hasRequiredConsole;

function requireConsole() {
	if (hasRequiredConsole)
		return console_1;
	hasRequiredConsole = 1;
	console_1 = consoleTransportRendererFactory;
	const consoleMethods = {
		error: console.error,
		warn: console.warn,
		info: console.info,
		verbose: console.info,
		debug: console.debug,
		silly: console.debug,
		log: console.log
	};
	
	function consoleTransportRendererFactory(logger) {
		return Object.assign(transport, {
			format: '{h}:{i}:{s}.{ms}{scope} › {text}',
			formatDataFn({
										 data = [],
										 date = /* @__PURE__ */ new Date(),
										 format: format2 = transport.format,
										 logId = logger.logId,
										 scope: scope2 = logger.scopeName,
										 ...message
									 }) {
				if (typeof format2 === 'function') {
					return format2({ ...message, data, date, logId, scope: scope2 });
				}
				if (typeof format2 !== 'string') {
					return data;
				}
				data.unshift(format2);
				if (typeof data[1] === 'string' && data[1].match(/%[1cdfiOos]/)) {
					data = [`${data[0]} ${data[1]}`, ...data.slice(2)];
				}
				data[0] = data[0].replace(/\{(\w+)}/g, (substring, name) => {
					switch (name) {
						case 'level':
							return message.level;
						case 'logId':
							return logId;
						case 'scope':
							return scope2 ? ` (${scope2})` : '';
						case 'text':
							return '';
						case 'y':
							return date.getFullYear().toString(10);
						case 'm':
							return (date.getMonth() + 1).toString(10).padStart(2, '0');
						case 'd':
							return date.getDate().toString(10).padStart(2, '0');
						case 'h':
							return date.getHours().toString(10).padStart(2, '0');
						case 'i':
							return date.getMinutes().toString(10).padStart(2, '0');
						case 's':
							return date.getSeconds().toString(10).padStart(2, '0');
						case 'ms':
							return date.getMilliseconds().toString(10).padStart(3, '0');
						case 'iso':
							return date.toISOString();
						default: {
							return message.variables?.[name] || substring;
						}
					}
				}).trim();
				return data;
			},
			writeFn({ message: { level, data } }) {
				const consoleLogFn = consoleMethods[level] || consoleMethods.info;
				setTimeout(() => consoleLogFn(...data));
			}
		});
		
		function transport(message) {
			transport.writeFn({
				message: { ...message, data: transport.formatDataFn(message) }
			});
		}
	}
	
	return console_1;
}

var ipc;
var hasRequiredIpc;

function requireIpc() {
	if (hasRequiredIpc)
		return ipc;
	hasRequiredIpc = 1;
	ipc = ipcTransportRendererFactory;
	const RESTRICTED_TYPES = /* @__PURE__ */ new Set([Promise, WeakMap, WeakSet]);
	
	function ipcTransportRendererFactory(logger) {
		return Object.assign(transport, {
			depth: 5,
			serializeFn(data, {
				depth = 5,
				seen = /* @__PURE__ */ new WeakSet()
			} = {}) {
				if (seen.has(data)) {
					return '[Circular]';
				}
				if (depth < 1) {
					if (isPrimitive(data)) {
						return data;
					}
					if (Array.isArray(data)) {
						return '[Array]';
					}
					return `[${typeof data}]`;
				}
				if (['function', 'symbol'].includes(typeof data)) {
					return data.toString();
				}
				if (isPrimitive(data)) {
					return data;
				}
				if (RESTRICTED_TYPES.has(data.constructor)) {
					return `[${data.constructor.name}]`;
				}
				if (Array.isArray(data)) {
					return data.map((item) => transport.serializeFn(
						item,
						{ depth: depth - 1, seen }
					));
				}
				if (data instanceof Date) {
					return data.toISOString();
				}
				if (data instanceof Error) {
					return data.stack;
				}
				if (data instanceof Map) {
					return new Map(
						Array.from(data).map(([key, value2]) => [
							transport.serializeFn(key, { depth: depth - 1, seen }),
							transport.serializeFn(value2, { depth: depth - 1, seen })
						])
					);
				}
				if (data instanceof Set) {
					return new Set(
						Array.from(data).map(
							(val) => transport.serializeFn(val, { depth: depth - 1, seen })
						)
					);
				}
				seen.add(data);
				return Object.fromEntries(
					Object.entries(data).map(
						([key, value2]) => [
							key,
							transport.serializeFn(value2, { depth: depth - 1, seen })
						]
					)
				);
			}
		});
		
		function transport(message) {
			if (!window.__electronLog) {
				logger.processMessage(
					{
						data: ['electron-log: logger isn\'t initialized in the main process'],
						level: 'error'
					},
					{ transports: ['console'] }
				);
				return;
			}
			try {
				__electronLog.sendToMain(transport.serializeFn(message, {
					depth: transport.depth
				}));
			} catch (e) {
				logger.transports.console({
					data: ['electronLog.transports.ipc', e, 'data:', message.data],
					level: 'error'
				});
			}
		}
	}
	
	function isPrimitive(value2) {
		return Object(value2) !== value2;
	}
	
	return ipc;
}

var hasRequiredRenderer;

function requireRenderer() {
	if (hasRequiredRenderer)
		return renderer.exports;
	hasRequiredRenderer = 1;
	(function(module) {
		const Logger = requireLogger();
		const RendererErrorHandler = requireRendererErrorHandler();
		const transportConsole = requireConsole();
		const transportIpc = requireIpc();
		module.exports = createLogger();
		module.exports.Logger = Logger;
		module.exports.default = module.exports;
		
		function createLogger() {
			const logger = new Logger({
				allowUnknownLevel: true,
				errorHandler: new RendererErrorHandler(),
				initializeFn: () => {
				},
				logId: 'default',
				transportFactories: {
					console: transportConsole,
					ipc: transportIpc
				},
				variables: {
					processType: 'renderer'
				}
			});
			logger.errorHandler.setOptions({
				logFn({ error, errorName, showDialog }) {
					logger.transports.console({
						data: [errorName, error].filter(Boolean),
						level: 'error'
					});
					logger.transports.ipc({
						cmd: 'errorHandler',
						error: {
							cause: error?.cause,
							code: error?.code,
							name: error?.name,
							message: error?.message,
							stack: error?.stack
						},
						errorName,
						logId: logger.logId,
						showDialog
					});
				}
			});
			if (typeof window === 'object') {
				window.addEventListener('message', (event) => {
					const { cmd, logId, ...message } = event.data || {};
					const instance = Logger.getInstance({ logId });
					if (cmd === 'message') {
						instance.processMessage(message, { transports: ['console'] });
					}
				});
			}
			return new Proxy(logger, {
				get(target, prop) {
					if (typeof target[prop] !== 'undefined') {
						return target[prop];
					}
					return (...data) => logger.logData(data, { level: prop });
				}
			});
		}
	})(renderer);
	return renderer.exports;
}

var node;
var hasRequiredNode;

function requireNode() {
	if (hasRequiredNode)
		return node;
	hasRequiredNode = 1;
	const NodeExternalApi = requireNodeExternalApi();
	const createDefaultLogger = requireCreateDefaultLogger();
	const externalApi = new NodeExternalApi();
	const defaultLogger = createDefaultLogger({
		dependencies: { externalApi }
	});
	node = defaultLogger;
	return node;
}

const isRenderer = typeof process === 'undefined' || (process.type === 'renderer' || process.type === 'worker');
const isMain = typeof process === 'object' && process.type === 'browser';
if (isRenderer) {
	requireElectronLogPreload();
	src.exports = requireRenderer();
} else if (isMain) {
	src.exports = requireMain();
} else {
	src.exports = requireNode();
}
var srcExports = src.exports;
const port = await start();
async function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		minWidth: 1280,
		minHeight: 720,
		backgroundColor: '#FFF',
		webPreferences: {
			preload: path.join(__dirname, '../preload/index.mjs'),
			nodeIntegration: true,
			contextIsolation: true
		},
		frame: false
	});
	load(mainWindow, port);
	if (isDev)
		mainWindow.webContents.openDevTools();
	ipcMain.on('maximize-window', () => {
		if (!mainWindow.isMaximized()) {
			mainWindow.maximize();
		} else {
			mainWindow.unmaximize();
		}
	});
	ipcMain.on('minimize-window', () => {
		srcExports.log('hello');
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
});
