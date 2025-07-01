/* url前缀定义：用于非根目录转换 */
CUBEINIT = function () {
  var self = this;
  var urls = window.location.pathname;
  var path = /CloudHMI/;
  var result = path.test(urls) ? "/CloudHMI/" : "/";
  /* url前缀 */
  self.gatewayURL_basics = result; //项目部署所在访问根基础资源地址
  var resultModules = path.test(urls)
    ? "/CloudHMI/view/module_demo/"
    : "/view/module_demo/";
  self.gatewayURL_module = result; //整体使用时，本部特有地址
  //self.gatewayURL_basics = "http://127.0.0.1:8020/outproject/Dom/"; //项目部署所在访问地址
};
cubeInit = new CUBEINIT();

//声明公共css,js变量
var LSList = {
  type1: "link",
  type2: "script",
  type1_scss: "link_scss",
  // 引入的路径列表
  list1: [
    "plugins/layui/css/layui.css",
    "api_resource/lib/stylenew.css",
    "css/index.css",
  ],
  list2: [
    "plugins/jquery/jquery.min.js",
    'plugins/knockout/knockout-3.2.0.js',
    'plugins/knockout/knockout.mapping.js',
    "plugins/lib/xe-utils.js",
    "plugins/layui/layui.js",
    'js/product/httpClient.js',
    "js/product/stylenew.js", //本部js
  ],
};

// 清理缓存 调用版本号
// var version = 1;//稳定版本 适用于上线
var version = new Date().getTime(); // 随时更新 适用于开发版本
/**
 *
 * @param {*文件类型} type
 * @param {*文件地址列表} list
 * @param {*是否用基础资源} basics 默认本部
 */
var writeImportFile = function (type, list, isBasics) {
  let path = isBasics ? cubeInit.gatewayURL_basics : cubeInit.gatewayURL_module;
  if (type === "link") {
    for (var i = 0; i < list.length; i++) {
      document.write(
        '<link rel="stylesheet" type="text/css" href="' +
        path +
        list[i] +
        "?v=" +
        version +
        '">'
      );
    }
  } else if (type === "script") {
    for (var i = 0; i < list.length; i++) {
      document.write(
        '<script type="text/javascript" type="module" charset="utf-8" src="' +
        path +
        list[i] +
        "?v=" +
        version +
        '"></script>'
      );
    }
  } else if (type === "scriptmodule") {
    //用于模块import组件
    for (var i = 0; i < list.length; i++) {
      document.write(
        '<script  type="module" src="' +
        path +
        list[i] +
        "?v=" +
        version +
        '"></script>'
      );
    }
  }
};

// 调用公共js/css
//logon 图片 //module
document.write(
  '<link rel="shortcut icon" type="image/x-icon" href="' +
  cubeInit.gatewayURL_basics +
  'favicon.ico">'
);

writeImportFile(LSList.type1, LSList.list1, true);
writeImportFile(LSList.type2, LSList.list2, true);

/**
 * 详情页面log开关  false：关  true：开
 * @param data 打印的Log信息
 */

function log(data) {
  var isOpenLog = true;
  if (isOpenLog) {
    console.log(data);
  }
}

//ie9及以上版本使用
if (IEVersion() >= 9) {
  //捕获图片异常处理  不兼容IE8
  document.addEventListener(
    "error",
    function (e) {
      var elem = e.target;
      if (elem.tagName.toLowerCase() == "img") {
        //特定class
        // logcat("加载异常标签名称=<" + elem.tagName.toLowerCase() + ">，标签id=" + elem.id + ",标签src=" + elem.src);
        if (elem.classList.contains("userIMG")) {
          //用户异常图片加载
          elem.src = cubeInit.gatewayURL_basics + "images/error/user.png";
        } else if (elem.classList.contains("logoIMG")) {
          //logo异常图片加载
          elem.src = cubeInit.gatewayURL_basics + "images/logo.png";
        } else if (elem.classList.contains("media-object")) {
          //详情异常图片加载
          elem.src = cubeInit.gatewayURL_basics + "images/error/nullifor.png";
        } else {
          //其他
          elem.src = cubeInit.gatewayURL_basics + "images/error/nullifor1.png";
        }
      }
    },
    true
  );
}

/*
 *  js判断是否是ie浏览器且给出ie版本
 */
function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE =
    userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 =
    userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return "edge"; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return 100; //不是ie浏览器
  }
}
