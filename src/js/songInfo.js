import GaussImg from './gaussBlur.js'
export default class SongInfo{
    constructor(){
        // 歌曲图片
        this.img = document.querySelector('.song .img');
        // 歌曲名
        this.name = document.querySelector('.song .name');
        // 歌手
        this.singer = document.querySelector('.song .singer');
        // 背景
        this.bg = document.querySelector('.wrap');
        // 是否喜欢
        this.like = document.querySelector('.tool .heart');
    }
    change(music){
        this.img.classList.remove('playing');
        this.img.offsetWidth;
        this.img.classList.add('playing');
        this.img.style.backgroundImage = `url(${music.pic})`;
        GaussImg(music.pic).then((baseData)=>{
            this.bg.style.backgroundImage = `url(${baseData})`;
        })
        
        this.name.innerText = music.name;
        this.singer.innerText = music.singer;
        music.isLike?this.like.classList.add('like'):this.like.classList.remove('like');
    }
}