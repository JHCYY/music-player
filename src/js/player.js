export default class Player {
  
  constructor(events) {
    this.audio = new Audio();
    for (const key in events) {
      if (events.hasOwnProperty(key)) {
        const fun = events[key];
        if(typeof fun ==='function'){
          this.audio.addEventListener(key,()=>{
            fun.call(this);
          });
        }
      }
    }
  }
  /**
   * 播放
   */
  play() {
    this.audio.play();
    this.audio.autoplay = true;
    return this;
  }
  /**
   * 暂停
   */
  pause() {
    this.audio.autoplay = false;
    this.audio.pause();
    return this;
  }

  /**
   *
   *加载歌曲
   * @param {*} src
   */
  load(src) {
    this.audio.src = src;
    this.audio.load();
    return this;
  }
  /**
   * 是否是暂停
   */
  isPause(){
    return this.audio.paused;
  }
  /**
   * 获取音频时长(s)
   */
  getDuration() {
    return this.audio.duration;
  }
  /**
   *
   *获取已播放的时长
   */
  getCurrentTime(){
    return this.audio.currentTime;
  }
  /**
   *
   * 跳到指定百分比
   * @param {*} 取值范围∈[0,100]
   */
  skip(percent) {
    if (percent < 0 || percent > 100) {
      throw new Error('进度错误 [0,100]');
    }
    let cur = percent * this.getDuration()/100;
    this.audio.currentTime = cur;
    return this;
  }
}
