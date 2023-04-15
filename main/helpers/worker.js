import robot from 'robotjs'

export default class Worker {
    constructor(){
        this.workerArea = [];
        this.street = '';
        this.state = '';
        this.detectInterval = setInterval(() => this.detectScreen(), 500);
        this.threshold = 0.9;
    }


    detectScreen() {
        if (this.workerArea.length !== 2) {
            console.log('NO AREA');
            return;
        }

        console.log('검색합니다...');
        // const startArea = this.workerArea[0];
        // const endArea = this.workerArea[1];
        //
        // const { maxVal, maxLoc } = this.findCard(this.image, startArea.x, startArea.y, endArea.x, endArea.y);
        //
        // if (maxVal >= this.threshold) {
        //     console.log(`카드 이미지가 화면에서 발견되었습니다: (${startArea.x + maxLoc.x}, ${startArea.y + maxLoc.y})`);
        // } else {
        //     console.log('카드 이미지가 화면에서 발견되지 않았습니다.');
        // }
    }


    stopDetect() {
        clearInterval(this.detectInterval);
    }

     setWindowArea(workerArea) {
         this.workerArea = workerArea;
    }
}