import {app, BrowserWindow, ipcMain, Menu} from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import { initBot } from './helpers/bot';


const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

const windows = [];

(async () => {
  initBot();

})();


const createNewWindow = async () => {
  const win = createWindow('main', {
    width: 400,
    height: 300,
    frame: false,
    transparent: false,
    alwaysOnTop: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (isProd) {
    await win.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await win.loadURL(`http://localhost:${port}/home`);
    win.webContents.openDevTools();
  }



  // const closeButton = document.createElement('button');
  // closeButton.textContent = 'Close Window';
  // closeButton.addEventListener('click', () => {
  //   const index = windows.indexOf(win);
  //   if (index !== -1) {
  //     windows.splice(index, 1);
  //     win.close();
  //   }
  // });
  //
  // const newWindowButton = document.createElement('button');
  // newWindowButton.textContent = 'New Window';
  // newWindowButton.addEventListener('click', createNewWindow);

  // win.webContents.on('did-finish-load', () => {
  //   win.webContents.insertHTML(
  //       '<body><h1>Window ' + windows.length + '</h1></body>'
  //   );
  //   win.webContents.insertElement(closeButton);
  //   win.webContents.insertElement(newWindowButton);
  // });

  win.on('closed', function () {
    const index = windows.indexOf(win);
    if (index !== -1) {
      windows.splice(index, 1);
    }
  });

  windows.push(win);

}

app.on('ready', () => {
   createNewWindow();

  const template = [
    {
      label: app.name,
      submenu: [
        {
          label: 'Quit',
          accelerator: 'CommandOrControl+Q',
          click() {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Table',
      submenu: [
        {
          label: 'New Table',
          accelerator: 'CommandOrControl+N',
          click: createNewWindow,
        },
        {
          label: 'Close Table',
          accelerator: 'CommandOrControl+W',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            const index = windows.indexOf(window);
            if (index !== -1) {
              windows.splice(index, 1);
            }
            window.close();
          },
        },
      ],
    },
  ];


  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (windows.length === 0) {
    createWindow();
  }
});
