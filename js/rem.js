!(function() {
    var docElem = document.documentElement,
        metaElem = document.querySelector('meta[name="viewport"]'),
        dpr = window.devicePixelRatio || 1,
        // 将页面分为10块
        blocks = 10,
        // 需要限制的最小宽度
        defaultMinWidth = 320,
        // 需要限制的最大宽度
        defaultMaxWidth = 540,
        // 计算的基准值
        calcMaxWidth = 9999999;

    if (!metaElem) {
        metaElem = initMetaViewport();
    }

    if (metaElem.getAttribute('data-content-max') !== null) {
        calcMaxWidth = defaultMaxWidth;
    }

    // 确保meta[name="viewport"]存在
    function initMetaViewport() {
        var meta = document.createElement('meta');

        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width,initial-scale=1,user-scalable=no');
        document.head.appendChild(meta);

        return meta;
    }

    // 这里主要解决1px边框的问题
    // 大部分dpr为2以下的安卓机型不识别scale，需设置不缩放
    if (navigator.appVersion.match(/android/gi) && dpr <= 2) {
        dpr = 1;
    }

    setScale(dpr);

    // 企业QQ设置了scale后，不能完全识别scale（此时clientWidth未收到缩放的影响而翻倍），需设置不缩放
    if (navigator.appVersion.match(/qq\//gi) && docElem.clientWidth <= 360) {
        dpr = 1;
        setScale(dpr);
    }

    docElem.setAttribute('data-dpr', dpr);

    // 设置缩放
    function setScale(dpr) {
        metaElem.setAttribute('content', 'initial-scale=' + 1 / dpr + ',maximum-scale=' + 1 / dpr + ',minimum-scale=' + 1 / dpr + ',user-scalable=no');
    }

    // 设置docElem字体大小
    function setFontSize() {
        var clientWidth = docElem.clientWidth;

        clientWidth = Math.max(clientWidth, defaultMinWidth * dpr)

        // 调整计算基准值
        if (calcMaxWidth === defaultMaxWidth) {
            clientWidth = Math.min(clientWidth, defaultMaxWidth * dpr);
        }

        docElem.style.fontSize = clientWidth / blocks + 'px';
    }

    setFontSize();

    // 设备类型判断
    // var browser={
    //     versions:function() {
    //         var u=navigator.userAgent, app = navigator.appVersion;
    //         return {//移动终端浏览器版本信息
    //             trident: u.indexOf('Trident') > -1, //IE内核
    //             presto: u.indexOf('Presto') > -1, //opera内核
    //             webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    //             gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    //             mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
    //             ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    //             android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    //             iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
    //             iPad: u.indexOf('iPad') > -1, //是否iPad
    //             webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    //         };
    //     }(),
    //     language:(navigator.browserLanguage || navigator.language).toLowerCase()
    // }

    // if(browser.versions.ios || browser.versions.iPhone || browser.versions.iPad){
    //     window.location="https://itunes.apple.com/xxx";
    // }
    // else if (browser.versions.android){
    //     window.location="http://xxx/xxx.apk";
    // }

    // 设备竖屏还是横屏浏览网页
    // function orientationChange() {
    //     switch(window.orientation) {
    //         case 0:
    //             console.log("竖屏");
    //             break;
    //         case -90:
    //             console.log("左旋 -90");
    //             break;
    //         case 90:
    //             console.log("右旋 90");
    //             break;
    //         case 180:
    //             console.log("倒竖 180");
    //             break;
    //     }
    // }

    window.addEventListener(window.orientationchange ? 'orientationchange' : 'resize', setFontSize, false);
})();
