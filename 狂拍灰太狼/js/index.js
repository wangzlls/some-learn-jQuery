$(function () {
    //1.监听游戏规则按钮的点击
    $('.rules').click(function () {
        $('.rule').stop().fadeIn(500)
    });


    //2.监听规则中的关闭按钮的点击
    $('.close').click(function () {
        $('.rule').stop().fadeOut(500)
    });


    //3.监听游戏开始按钮的点击
    $('.start').stop().click(function () {
        $(this).stop().fadeOut(100);
        //处理进度条的方法
        progressHandler();
        startWolfAnimation();
    });


    //4.监听重新开始按钮的点击
    $('.reStart').click(function () {
        $('.mask').stop().fadeOut(500);
        progressHandler();
        // 调用处理灰太狼动画的方法(重新开始)
        startWolfAnimation();
    });


    //定义一个进度条减少的方法。
    function progressHandler() {
        //当每一次重新进来的时候，重新设置进度条的宽度
        $('.progress').css({
            width: 180
        });
        //开启定时器处理进度条
        var timer = setInterval(function () {
            //获取进度条长度
            var progressWidth = $('.progress').width();
            //减少进度条的长度
            progressWidth -= 3;
            //将减少的进度条给进度条
            $('.progress').css({
                width: progressWidth
            });
            //监听进度条是否走完
            if (progressWidth <= 0) {
                //关闭进度条
                clearInterval(timer);
                //显示重新开始界面
                $('.mask').stop().fadeIn(500, function () {
                    $('.last').html($('.score'));
                });
                //在整个进度条结束后，停止灰太狼的动画
                stopWolfAnimation();
            }
        }, 1000);
    }


    //定义一个函数，让灰太狼和小灰灰跳出来。
    var wolfTimer;
    function startWolfAnimation() {
        // 1.定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png'];
        var wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png'];
        // 2.定义一个数组保存所有可能出现的位置
        var arrpos = [{left: "100px", top: "115px"},
            {left: "20px", top: "160px"},
            {left: "190px", top: "142px"},
            {left: "105px", top: "193px"},
            {left: "19px", top: "221px"},
            {left: "202px", top: "212px"},
            {left: "120px", top: "275px"},
            {left: "30px", top: "295px"},
            {left: "209px", top: "297px"}];
        // 3.创建一个图片
        var $wolfImage = $('<img src="" class="wolfImage">');
        // 随机获取图片的位置，向上取整，不然取不到 8
        var posIndex = Math.round(Math.random() * 8);
        // 4.设置图片显示的位置
        $wolfImage.css({
            position: 'absolute',
            left: arrpos[posIndex].left,
            top: arrpos[posIndex].top
        });
        // 随机获取数组类型，判断是小灰灰还是灰太狼，灰太狼true/小灰灰/false
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
        // 5.设置图片的内容
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function () {
            if (wolfIndex > wolfIndexEnd) {
                $wolfImage.remove();
                clearInterval(wolfTimer);
                startWolfAnimation();
            }
            $wolfImage.attr('src', wolfType[wolfIndex]);
            wolfIndex++;
        }, 200);


        // 6.将图片添加到界面上
        $('.container').append($wolfImage);

        // 7.处理游戏规则的方法
        gameRules($wolfImage);
    }


    //游戏规则的方法
    function gameRules($wolfImage) {

        $wolfImage.one('click', function () {
            //修改索引,直接把图片变成第五章图片
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;

            //拿到当前点击图片的地址
            var $src = $(this).attr('src');
            //根据图片地址判断是否是灰太狼
            var flag = $src.indexOf('h') >= 0;

            //根据点击图片的类型增减分数
            if (flag) {
                $('.score').text(parseInt($('.score').text()) + 10);

            } else {
                $('.score').text(parseInt($('.score').text()) - 10);

            }
        });
    }


    //在游戏结束后停止动画
    function stopWolfAnimation() {
        $('.wolfImage').remove();
        clearInterval(wolfTimer);
    }
});


