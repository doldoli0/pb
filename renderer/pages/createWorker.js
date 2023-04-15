import Link from "next/link";
import {Box, Button, Input, Modal, Typography} from "@mui/material";
import {ipcRenderer} from "electron";
import React, {Fragment, useState} from "react";
import {useRouter} from "next/router";

const createWorker = () => {
    const router = useRouter();
    const [mode, setMode] = useState(0);
    const [values, setValues] = useState({
        windowArea: [],
        name: '',
    })

    const getCoordinates = async () => {
        return await ipcRenderer.invoke('get-coordinates', 'mousedown');
    }

    const getArea = async () => {
        setMode(1);
        const coordinates1 = await getCoordinates();
        setMode(2);
        const coordinates2 = await getCoordinates();
        console.log("생성 좌표 : ", coordinates1, coordinates2);
        setValues({...values, windowArea: [coordinates1, coordinates2]});
        setMode(0);
    }

    const onChangeName = (e) => {
        setValues({...values, name: e.target.value});
    }

    return (
        <Fragment>
            <Box padding={3}>
                <Box display={'flex'} flexDirection={'column'}>
                    <div>
                        이름 <Input value={values.name} onChange={onChangeName}/>
                    </div>
                    {values.windowArea.map((item, index) => {
                        return (
                            <div key={index}>
                                {index === 0 ? "시작" : "종료"}좌표 X:{item.x} Y:{item.y}
                            </div>
                        )
                    })}

                    <div>
                        <Button onClick={getArea}>테이블 좌표</Button>
                    </div>
                </Box>


                <Link href={'/home'}>완료</Link>
            </Box>


            <Modal
                open={mode !== 0}
            >
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
                    <div>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            테이블 {mode === 1 ? '시작' : '끝'} 좌표에 마우스를 올리고 `을 입력
                        </Typography>
                    </div>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default createWorker;