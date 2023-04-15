import { ipcMain, globalShortcut } from "electron";
import * as robot from "robotjs";
import Worker from "./worker";


export const initBot = () => {
    let worker = new Worker();
    console.log('init Setting');
    const setWorkerArea = (event, argv) => {
        worker.setWindowArea(argv);
        console.log('createWorker', worker);
        return worker.workerArea;
    }

    const getCoordinate = () => {
        return new Promise((resolve) => {
          globalShortcut.register("`", () => {
            const mousePosition = robot.getMousePos();
            console.log(
              `Mouse position: x=${mousePosition.x}, y=${mousePosition.y}`
            );
            globalShortcut.unregisterAll();

            resolve(mousePosition);
          });
        });
    }

    ipcMain.handle('get-coordinates', getCoordinate);
    ipcMain.handle('set-worker-area', setWorkerArea);

} 