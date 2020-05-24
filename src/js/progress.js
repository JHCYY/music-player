export default class Progress{
    constructor({draged}){
        this.advance = 0;
        this.end = 0;
        this.time = document.querySelector('.progress .time');
        this.duration = document.querySelector('.progress .duration');
        this.front = document.querySelector('.bar .front');
        this.back = document.querySelector('.bar .back');
        this.dot = document.querySelector('.bar .dot');
        let bar = document.querySelector('.bar');
        this.touchLock = false;
        this.dot.addEventListener('touchstart',(e)=>{
            this.touchLock =true;
        })
        this.dot.addEventListener('touchmove',(e)=>{
            let clientX = e.touches[0].clientX;
            let min = bar.offsetLeft;
            let max = min+bar.offsetWidth;
            if(clientX<min||clientX>max){
                return;
            }
            this.dot.style.left = `${clientX-min}px`;
            this.front.style.width = `${clientX-min}px`;
            this.back.style.width = `${ max - clientX}px`;
        })
        this.dot.addEventListener('touchend',(e)=>{
            this.touchLock =false;
            let offsetLeft = this.dot.offsetLeft;
            let width = bar.offsetWidth;
            let percent = (offsetLeft/width)*100;
            typeof(draged) ==='function' ? draged.call(this,percent):''
        })
    }
    /**
     *
     * 获取进度百分比
     * 保留两位小数
     */
    getPercent(){
        return (this.advance/this.end)*100;
    }
    /**
     *
     * 时长转 mm:ss
     * @param {*} 时长(秒)
     */
    formatTime(long){
        let m = Math.floor(long/60);
        let s = Math.floor(long % 60);
        return `${m<10?`0${m}`:`${m}`}:${s<10?`0${s}`:`${s}`}`
    }
    /**
     *
     * 设置进度条总时长
     * @param {*} 时长(秒)
     * @memberof Progress
     */
    setDuration(long){
        this.end = long
        this.duration.innerText = this.formatTime(long);
    }
    /**
     *
     * 设置进度
     * @param {*} long
     */
    setAdvance(long){
        this.advance = long;
        if(!this.touchLock){
            this.dot.style.left = `${this.getPercent()}%`;
            this.front.style.width = `${this.getPercent()}%`;
            this.back.style.width = `${100-this.getPercent()}%`;
        }
    }
}