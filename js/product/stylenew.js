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
