
import Player from './player.js';
import SongInfo from './songInfo.js';
import Tool from './tool.js';
import Progress from './progress.js'

const cache = {
    songs:[],
    _index:0
}
Object.defineProperty(cache,'index',{
    get(){
        return cache._index;
    },
    set(val){
        cache._index = Math.abs(val%this.songs.length)||0;
        songInfo.change(this.songs[this.index]);
        tool.active(this.index);
        player.load(this.songs[this.index].src);
        player.isPause?'':player.play();
    }
})

const progress = new Progress({
    draged:function(percent){
        progress.setAdvance(percent);
        player.skip(percent);
    }
})
const player = new Player({
    timeupdate:function(){
        progress.setAdvance(this.getCurrentTime());
    },
    loadedmetadata:function(){
        progress.setDuration(this.getDuration());
    },
    ended:function(){
        cache.index++;
    }
});
const songInfo = new SongInfo();
let tool = new Tool({
    beforePlay:function(){
        if(player.isPause()){
            player.play();
        }else{
            player.pause();
        }
    },
    prevEvent:function(){
        cache.index--;
    },
    nextEvent:function(){
        cache.index++;
    },
    select:function(i){
        cache.index=i;
    }
})



//请求数据
axios.get('/list.json').then(function ({data}) {
    cache.songs = data||[];
    tool.renderLists(cache.songs);
    cache.index=0;
})

