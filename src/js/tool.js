export default class Tool{
    constructor({beforePlay,prevEvent,nextEvent,select}){
        this.action = null;
        this.like = document.querySelector('.tool .heart');
        this.prev = document.querySelector('.tool .prev');
        this.play = document.querySelector('.tool .play');
        this.next = document.querySelector('.tool .next');
        this.list = document.querySelector('.tool .list');
        this.lists = document.querySelector('.lists');
        this.close = document.querySelector('.lists .close');
        this.img = document.querySelector('.song .img');
        this.roll = document.querySelector('.roll');
        //初始化事件
        this.list.addEventListener('touchend',()=>{
            this.lists.classList.add('open');
        })
        this.close.addEventListener('touchend',()=>{
            this.lists.classList.remove('open');
        })
        this.play.addEventListener('touchend',()=>{
            if( typeof(beforePlay) ==='function' && beforePlay.call(this) === false ){
                return; 
            }
            this.img.classList.contains('playing')?'':this.img.classList.add('playing');
            if(this.play.classList.contains('pause')){
                this.play.classList.remove('pause');
                this.img.classList.add('pause')
            }else{
                this.play.classList.add('pause');
                this.img.classList.remove('pause');
            }
        })
        this.prev.addEventListener('touchend',()=>{
            typeof(prevEvent) ==='function' ? prevEvent.call(this):''
        })
        this.next.addEventListener('touchend',()=>{
            typeof(nextEvent) ==='function' ? nextEvent.call(this):''
        })
        this.roll.addEventListener('touchend',(e)=>{
            let target = e.target;
            if(!target.classList.contains('item') || target.classList.contains('active')){
                return;
            }
            typeof(select) ==='function' ? select.call(this, parseInt(e.target.dataset.index)):'';
        })
    }
    /**
     *
     * 渲染歌曲列表
     * @param {*} 曲目
     * @memberof Tool
     */
    renderLists(data){
        data.forEach((item,i)=>{
            let li = document.createElement('li');
            li.classList.add('item');
            li.dataset.index = i ;
            li.innerText = item.name;
            this.roll.appendChild(li)
        })
    }

    active(index){
        this.action!=null?this.roll.children[this.action].classList.remove('active'):'';
        this.roll.children[index].classList.add('active');
        this.action = index;
    }
    
}