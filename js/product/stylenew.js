/*
 * @Descripttion: Sustainable
 * @version: 1.0.0
 * @Author: Kenny
 * @Date: 2023-11-10 10:46:25
 * @LastEditors: ~
 * @LastEditTime: 2025-06-09 11:04:55
 */

//来源web-tools
$(function () {
  //折叠文字
  $("pre.foldBox").prepend('<span class="fold J_fold"></span>');
  $(".foldBox .J_fold").on("click", function () {
    var index = $(this).parent().attr("index");
    var i = index == 0 ? 1 : 0;
    $(this).parent().attr("index", i);
    if (i) {
      $(this).parent().height("auto");
    } else {
      $(this).parent().height("36px");
    }
  });
});


/**
 * 详情页面log开关  false：关  true：开
 * @param {*any} data 
 * @param {*boole} boole 默认开启
 * 无法定位具体距离位置
 */
function log(data, boole) {
  var isOpenLog = boole ? boole : true;
  if (isOpenLog) {
    console.log(data);
  }
}

/**
 * 鼠标悬浮title提示
 * @type {null}
 */
var oldTitle = null;
$(document).bind("mouseover mouseout mousemove", function (event) {
  var left = event.pageX,
    top = event.pageY;
  var ele = event.target;
  var title = ele.title;

  var type = event.originalEvent.type;
  if (type == "mouseover") {
    oldTitle = title;
    ele.title = "";
    if (title != null && title != "") {
      var styleCss = {
        position: "absolute",
        top: top + 15,
        left: left + 15,
        paddingLeft: "12px",
        paddingRight: "12px",
        paddingTop: "3px",
        paddingBottom: "3px",
        border: "1px solid #D2DDE6",
        borderRadius: "2px",
        backgroundColor: "#DEEBF0",
        fontSize: "12px",
        fontColor: "#2C2C2C",
        fontFamily: "MicrosoftYaHeiUI",
        zIndex: "100000",
      },
        dvTitle = $("<div></div>");
      dvTitle.addClass("showTitleBox");
      dvTitle.css(styleCss);
      dvTitle.text(title);
      dvTitle.appendTo("body");
    }
  } else if (type == "mouseout") {
    ele.title = oldTitle;
    $(".showTitleBox").remove();
  } else if (type == "mousemove") {
    $(".showTitleBox").css({
      top: top + 15,
      left: left + 15,
    });
  }
});