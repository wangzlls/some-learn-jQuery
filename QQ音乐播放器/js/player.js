(function (window) {
    function Player($audio) {
        return new Player.prototype.init($audio)
    }

    Player.prototype = {
        constructor: Player,
        musicList: [],
        init: function ($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        currentIndex: -1,
        //播放按钮
        playMusic: function (index, music) {
            //判断是否是同一首音乐
            if (this.currentIndex == index) {
                //同一首音乐
                if (this.audio.paused) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            } else {
                //不是同一首
                this.$audio.attr('src', music.link_url);
                this.audio.play();
                this.currentIndex = index;
            }
        },

        //上一首按钮
        preIndex: function () {
            var index = this.currentIndex - 1;
            if (index < 0) {
                index = this.musicList.length - 1;
            }
            return index;
        },

        //下一首按钮
        nextIndex: function () {
            var index = this.currentIndex + 1;
            if (index > this.musicList.length - 1) {
                //当到了最后一首歌时
                index = 0;
            }
            return index;
        },

        //删除按钮
        changeMusic: function (index) {
            // 删除对应的数据
            this.musicList.splice(index, 1);

            // 判断当前删除的是否是正在播放音乐的前面的音乐
            if (index < this.currentIndex) {
                this.currentIndex = this.currentIndex - 1;
            }
        },


        //获取播放的时长和进度
        musicTimeUpDate: function (callback) {
            var $this = this;
            this.$audio.on('timeupdate', function () {
                var duration = $this.audio.duration;
                var currentTime = $this.audio.currentTime;
                var timeStr = $this.formatDate(currentTime, duration);
                callback(currentTime, duration, timeStr)
            });
        },
        formatDate: function (currentTime, duration) {
            var endMin = parseInt(duration / 60);
            var endSec = parseInt(duration % 60);
            if (endMin < 10) {
                endMin = '0' + endMin;
            }
            if (endSec < 10) {
                endSec = '0' + endSec;
            }

            var startMin = parseInt(currentTime / 60);
            var startSec = parseInt(currentTime % 60);
            if (startMin < 10) {
                startMin = '0' + startMin;
            }
            if (startSec < 10) {
                startSec = '0' + startSec;
            }
            return startMin + ':' + startSec + ' / ' + endMin + ':' + endSec
        },
        musicSeeckTo: function (value) {
            if (isNaN(value)) return;
            this.audio.currentTime = this.audio.duration * value;
        },
        musicVoiceSeeckTo: function (value) {
            //volume取值范围是0~1，1是最大声音
            if (isNaN(value)) return;
            if (value < 0 || value > 1) return;
            this.audio.volume = value;
        }

    };


    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
})(window);