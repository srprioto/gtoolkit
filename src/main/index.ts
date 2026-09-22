import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { spawn } from 'child_process'
import store from './store'

import fs from 'node:fs'
import path from 'node:path'



function createWindow(): void {
	const mainWindow = new BrowserWindow({
		width: 1100,
		height: 670,
		show: false,
		frame: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false,
			webviewTag: true
		}
	})

	mainWindow.webContents.session.on('will-download', (_event, item) => {
		item.on('done', (_e, state) => {
			if (state === 'completed') {
				console.log('Descarga completada:', item.getSavePath())
			} else {
				console.log('Descarga fallida:', state)
			}
		})
	})

	mainWindow.on('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})

	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
	}
}

app.whenReady().then(() => {
	electronApp.setAppUserModelId('com.electron')

	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	ipcMain.on('ping', () => console.log('pong'))

	ipcMain.on('window:minimizar', (e) => {
		BrowserWindow.fromWebContents(e.sender)?.minimize()
	})

	ipcMain.on('window:maximizar', (e) => {
		const win = BrowserWindow.fromWebContents(e.sender)
		if (!win) return
		win.isMaximized() ? win.unmaximize() : win.maximize()
	})

	ipcMain.on('window:cerrar', (e) => {
		BrowserWindow.fromWebContents(e.sender)?.close()
	})

  	createWindow()

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})

	// abrir refirma
	ipcMain.handle('abrir-firmapperu', async () => {
		const basePath = app.isPackaged
			? process.resourcesPath
			: join(__dirname, '../../resources')

		const exePath = join(
			basePath,
			'refirma',
			'firm..tion_7905cfbaddd95851_0001.0001_81987131807f31c0',
			'FirmaPeru.exe'
		)

		const child = spawn(exePath, [], {
			detached: true,
			stdio: 'ignore',
			cwd: join(exePath, '..')
		})
		child.unref()

		return { ok: true }
	})


	// abrir rutas
	ipcMain.handle('abrir-ruta', async (_e, ruta: string) => {
		const err = await shell.openPath(ruta)
		return { ok: err === '', error: err }
	})

	// conexion con electron store
	ipcMain.handle('db:create', (_, key, item) => {
		const list = store.get(key, []) as any[]
		const newItem = { id: Date.now(), ...item }
		store.set(key, [...list, newItem])
		return newItem
	})

	ipcMain.handle('db:read', (_, key) => store.get(key, []))

	ipcMain.handle('db:update', (_, key, id, changes) => {
		const list = store.get(key, []) as any[]
		const updated = list.map(i => i.id === id ? { ...i, ...changes } : i)
		store.set(key, updated)
		return updated.find(i => i.id === id)
	})

	ipcMain.handle('db:delete', (_, key, id) => {
		const list = store.get(key, []) as any[]
		store.set(key, list.filter(i => i.id !== id))
		return true
	})



	// mover archivos plantilla word (SIEMPRE como plantilla.docx)
	ipcMain.handle('file:copyReadonly', async (_, srcPath: string, destFolder: string) => {
		try {
			const absoluteDest = path.isAbsolute(destFolder)
			? destFolder
			: path.join(process.cwd(), destFolder)

			await fs.promises.mkdir(absoluteDest, { recursive: true })

			const destPath = path.join(absoluteDest, 'plantilla.docx')

			// Quitar readonly si ya existe, para poder sobrescribir
			await fs.promises.chmod(destPath, 0o666).catch(() => {})

			await fs.promises.copyFile(srcPath, destPath)
			await fs.promises.chmod(destPath, 0o444)

			return { ok: true, destPath }
		} catch (err: any) {
			console.error('copyReadonly error:', err)
			return { ok: false, error: err.message }
		}
	})

	ipcMain.handle('file:selectDocx', async () => {
		const result = await dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{ name: 'Word', extensions: ['docx'] }]
		})
		if (result.canceled || !result.filePaths[0]) return { ok: false }
		return { ok: true, path: result.filePaths[0] }
	})

	ipcMain.handle('abrir-plantilla', async () => {
		const ruta = app.isPackaged
		? path.join(process.resourcesPath, 'docs', 'plantilla.docx')
		: path.join(process.cwd(), 'src/renderer/src/assets/docs/plantilla.docx')

		const err = await shell.openPath(ruta)
		return { ok: err === '', error: err, ruta }
	})

	ipcMain.handle('db:set', (_, key, item) => {
		store.set(key, item)
		return item
	})


})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})