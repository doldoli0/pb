import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {ipcMain, ipcRenderer} from 'electron';
import {Box, Button, Input, Modal, Table, TableHead, TableRow, Typography} from "@mui/material";

function Home() {
  const [mode, setMode] = useState(0);
  const [area, setArea] = useState([]);

  useEffect(() => {
    // const getWorkers = async  () => {
    //   const workers = await ipcRenderer.invoke('get-workers');
    //   setWorkers(workers);
    // }
    // getWorkers();
  }, []);

  const getCoordinates = async () => {
    return await ipcRenderer.invoke('get-coordinates', 'mousedown');
  }

  const getArea = async () => {
    setMode(1);
    const coordinates1 = await getCoordinates();
    setMode(2);
    const coordinates2 = await getCoordinates();
    const workerArea = await ipcRenderer.invoke('set-worker-area', [coordinates1, coordinates2]);
    console.log(workerArea);
    setArea(workerArea);
    setMode(0);
  }




  return (
    <React.Fragment>
      <Box padding={1}>
        <Box display={'flex'} flexDirection={'column'}>
          <Box>
            {area.length !== 0?
                <Button fullWidth onClick={getArea} variant={'contained'} size={'small'}>
                  {area.map((item, index) => (
                        <span key={index}>
                        X:{item.x} Y:{item.y}{index === 0 && ":"}
                      </span>
                    ))}
                </Button>
                :
                <Button onClick={getArea} variant={'contained'} size={'small'}>테이블 좌표</Button>
            }
          </Box>
        </Box>
      </Box>
      <Modal open={mode !== 0}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <div>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
              테이블 {mode === 1 ? '시작' : '끝'} 좌표에 마우스를 올리고 `을 입력
            </Typography>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Home;
