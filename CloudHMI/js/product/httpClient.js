/*
 * @Descripttion: Sustainable
 * @version: 1.0.0
 * @Author: Kenny
 * @Date: 2025-06-30 17:04:16
 * @LastEditors: ~
 * @LastEditTime: 2025-07-23 13:36:25
 */
var cubeLoadingIndex;

var HttpUtils = {
  loading: function (type) {
    // layui.use('layer', function () {
    //     var layer = parent.layui.layer;
    //     switch (type) {
    //         case 0:
    //             layer.close(cubeLoadingIndex);
    //             cubeLoadingIndex = layer.load(0, {shade: [0.001, '#fff']});
    //             break;
    //         case 1:
    //             layer.close(cubeLoadingIndex);
    //             break;
    //         default:
    //             layer.close(cubeLoadingIndex);
    //             break
    //     }
    // });
  },
  cuTosi: function (msg) {
    //layer.msg(msg);
    layer.closeAll("loading");
    //        layer.msg(msg, {icon: 5, time: 1000});
    //console.log("netMsg:" + msg);
  },
};

HttpUtils.request = {
  postNotParam: function (url, successCall, errorCall) {
    this.netOfAsync(
      url,
      "POST",
      true,
      false,
      false,
      false,
      successCall,
      errorCall
    );
  },
  getJson: function (url, data, successCall, errorCall) {
    this.netOfAsync(
      url,
      "GET",
      data,
      true,
      false,
      false,
      successCall,
      errorCall
    );
  },
  postJson: function (url, data, successCall, errorCall) {
    this.netOfAsync(
      url,
      "POST",
      data,
      false,
      false,
      false,
      successCall,
      errorCall
    );
  },
  postJsonSync: function (url, data, successCall, errorCall) {
    this.netOfsync(
      url,
      "POST",
      data,
      false,
      false,
      false,
      successCall,
      errorCall
    );
  },
  postParamSync: function (url, data, successCall, errorCall) {
    //同步param请求
    this.netOfsync(
      url,
      "POST",
      data,
      false,
      false,
      true,
      successCall,
      errorCall
    );
  },
  postParam: function (url, data, successCall, errorCall) {
    this.netOfAsync(
      url,
      "POST",
      data,
      false,
      false,
      true,
      successCall,
      errorCall
    );
  },
  postOfModel: function (url, data, successCall, errorCall) {
    this.netOfAsync(
      url,
      "POST",
      data,
      true,
      true,
      false,
      successCall,
      errorCall
    );
  },
  getOfModel: function (url, successCall, errorCall) {
    this.netOfAsync(url, "GET", "", true, true, false, successCall, errorCall);
  },
  netOfAsync: function (
    url,
    method,
    data,
    isProgress,
    isCubeObj,
    isParam,
    successCall,
    errorCall
  ) {
    this.netOfparamVerification(
      url,
      method,
      true,
      data,
      isProgress,
      isCubeObj,
      true,
      isParam,
      successCall,
      errorCall
    );
  },
  netOfsync: function (
    url,
    method,
    data,
    isProgress,
    isCubeObj,
    isParam,
    successCall,
    errorCall
  ) {
    this.netOfparamVerification(
      url,
      method,
      false,
      data,
      isProgress,
      isCubeObj,
      true,
      isParam,
      successCall,
      errorCall
    );
  },
  netOfNotToken: function (
    url,
    method,
    async,
    data,
    isProgress,
    isCubeObj,
    isParam,
    successCall,
    errorCall
  ) {
    this.netOfparamVerification(
      url,
      method,
      async,
      data,
      isProgress,
      isCubeObj,
      false,
      isParam,
      successCall,
      errorCall
    );
  },
  netOfparamVerification: function (
    url,
    method,
    async,
    data,
    isProgress,
    isCubeObj,
    isHaveToken,
    isParam,
    successCall,
    errorCall
  ) {
    this.netOfBusiness(
      url,
      method ? method.toUpperCase() : "GET",
      async,
      data,
      isProgress,
      isCubeObj,
      isHaveToken,
      isParam,
      successCall,
      errorCall
    );
  },
  netOfBusiness: function (
    url,
    method,
    async,
    data,
    isProgress,
    isCubeObj,
    isHaveToken,
    isParam,
    successCall,
    errorCall
  ) {
    // POST
    // @RequestBody
    // 接受参数

    isProgress ? HttpUtils.loading(0) : "";
    this.netOfToken(
      url,
      method,
      async,
      data,
      isProgress,
      isHaveToken,
      isParam,
      function (dataResult, textStatus, request) {
        if (isCubeObj) {
          if (dataResult.successful) {
            var vm = ko.mapping.fromJS(dataResult);
            console.log(vm);
            delete vm.__ko_mapping__;
            if ($.isFunction(successCall)) {
              successCall(vm);
            }
          } else {
            $.isFunction(errorCall)
              ? errorCall({
                  type: 2,
                  msg: dataResult.resultHint
                    ? dataResult.resultHint
                    : "获取业务数据失败",
                })
              : HttpUtils.cuTosi(
                  dataResult.resultHint
                    ? dataResult.resultHint
                    : "获取业务数据失败"
                );
          }
        } else {
          if (dataResult.successful) {
            if ($.isFunction(successCall)) {
              successCall(dataResult);
            }
          } else {
            $.isFunction(errorCall)
              ? errorCall({
                  type: 2,
                  msg: dataResult.resultHint
                    ? dataResult.resultHint
                    : "获取业务数据失败",
                })
              : HttpUtils.cuTosi(
                  dataResult.resultHint
                    ? dataResult.resultHint
                    : "获取业务数据失败"
                );
          }
        }
      },
      function (request, status, err) {
        $.isFunction(errorCall)
          ? errorCall({
              type: 1,
              msg: "网络请求失败",
              error: new Error(request.responseText),
            })
          : HttpUtils.cuTosi("网络请求失败");
      }
    );
  },

  netOfToken: function (
    url,
    method,
    async,
    data,
    isProgress,
    isHaveToken,
    isParam,
    success,
    error
  ) {
    // POST
    // @RequestBody
    // 接受参数
    isProgress ? HttpUtils.loading(0) : "";
    this.netOfprogressBar(
      url,
      method,
      async,
      data,
      isProgress,
      isParam,
      function (dataResult, textStatus, request) {
        if (isHaveToken) {
          var respAuth = request.getResponseHeader("Authorization");
          //console.log("respAuth:" + respAuth);
          if (respAuth) {
            sessionStorage.setItem("Authorization", respAuth);
          }
        }
        if ($.isFunction(success)) {
          success(dataResult, textStatus, request);
        }
      },
      function (request, status, err) {
        if ($.isFunction(error)) {
          error(request, status, err);
        }
      },
      function (XMLHttpRequest) {
        if (isHaveToken) {
          //console.log("reqAuth:" + sessionStorage.getItem("Authorization"));
          XMLHttpRequest.setRequestHeader(
            "Authorization",
            sessionStorage.getItem("Authorization")
          );
        }
      }
    );
  },

  netOfprogressBar: function (
    url,
    method,
    async,
    data,
    isProgress,
    isParam,
    success,
    error,
    beforecall
  ) {
    // POST
    // @RequestBody
    // 接受参数
    isProgress ? HttpUtils.loading(0) : "";
    this.netOfJsonParam(
      url,
      method,
      async,
      data,
      isParam,
      function (dataResult, textStatus, request) {
        //console.log("dataResult:" + JSON.stringify(dataResult));
        if ($.isFunction(success)) {
          success(dataResult, textStatus, request);
        }
      },
      function (request, status, err) {
        if ($.isFunction(error)) {
          error(request, status, err);
        }
      },
      function (XMLHttpRequest) {
        if ($.isFunction(beforecall)) {
          beforecall(XMLHttpRequest);
        }
      }
    );
  },
  // netOfJsonParam:function(url,method,async,data,success,error,beforecall){
  // //POST @RequestBody 接受参数
  // log("url:"+url);
  // // cube.gatewayURL_resource+url
  // this.ajax(url,method,async,null,"application/json",ko.toJSON(data),null,success,error,beforecall);
  // },

  netOfJsonParam: function (
    url,
    method,
    async,
    data,
    isParam,
    success,
    error,
    beforecall
  ) {
    // POST
    // @RequestBody
    // 接受参数

    //console.log("url:" + url);
    //console.log("data:" + JSON.stringify(data));
    isParam
      ? this.ajax(
          url,
          method,
          async,
          false,
          null,
          data,
          null,
          success,
          error,
          beforecall
        )
      : this.ajax(
          url,
          method,
          async,
          false,
          "application/json;charset=utf-8",
          ko.toJSON(data),
          null,
          success,
          error,
          beforecall
        );
  },

  get: function (url, data, success, error) {
    // 普通GET请求
    this.defaultAjax(url, "GET", null, data, success, error);
  },
  post: function (url, data, success, error) {
    // 普通POST请求
    // //console.log(success);
    this.defaultAjax(url, "POST", null, data, success, error);
  },

  postBody: function (url, data, success, error) {
    // POST @RequestBody 接受参数
    this.ajax(
      url,
      "POST",
      null,
      null,
      "application/json;charset=utf-8",
      data,
      null,
      success,
      error
    );
  },
  syncGet: function (url, data, success, error) {
    // 同步GET请求
    this.defaultAjax(url, "GET", false, data, success, error);
  },
  syncPost: function (url, data, success, error) {
    // 同步POST请求
    this.defaultAjax(url, "POST", false, data, success, error);
  },
  defaultAjax: function (url, method, async, data, success, error) {
    // 默认的AJAX配置
    // 请求
    this.ajax(url, method, async, null, null, data, null, success, error);
  },

  uploadFile: function (url, formData, successCall, completeCall, errCall) {
    //console.log("url:" + url);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      /**
       *必须false才会自动加上正确的Content-Type
       */
      contentType: false,
      /**
       * 必须false才会避开jQuery对 formdata 的默认处理
       * XMLHttpRequest会对 formdata 进行正确的处理
       */
      processData: false,
      dataType: "json",
      // beforeSend: function (XMLHttpRequest) {
      //     XMLHttpRequest.setRequestHeader("Authorization", localtokenId);
      // },
      success: function (data) {
        //console.log("success:" + JSON.stringify(data));
        if (data.successful) {
          if (successCall != undefined) {
            successCall(data);

            if (completeCall != undefined) {
              completeCall();
            }
          }
        } else {
          HttpUtils.cuTosi(data.resultHint);
          if (completeCall != undefined) {
            completeCall();
          }
        }
      },
      error: function (err) {
        //console.log("error:" + JSON.stringify(err));
        if (errCall != undefined) {
          errCall(err);

          if (completeCall != undefined) {
            completeCall();
          }
          return;
        }
        HttpUtils.cuTosi(JSON.stringify(err));
        if (completeCall != undefined) {
          completeCall();
        }
      },
    });
  },
  ajax: function (
    url,
    method,
    async,
    cache,
    contentType,
    data,
    dataType,
    success,
    error,
    beforeSend
  ) {
    var DEFAULT_AJAX_SETTING = {
      async: true,
      cache: true,
      contentType: "application/x-www-form-urlencoded;charset=utf-8",
      dataType: "json",
      crossDomain: true == !document.all,
      xhrFields: {
        withCredentials: true,
      },
    };
    DEFAULT_AJAX_SETTING.url = url;
    DEFAULT_AJAX_SETTING.type = method;
    if (async != null && async != undefined) {
      DEFAULT_AJAX_SETTING.async = async;
    }
    if (cache != null) {
      DEFAULT_AJAX_SETTING.cache = cache;
    }
    if (contentType != null) {
      DEFAULT_AJAX_SETTING.contentType = contentType;
    }
    if (data != null) {
      DEFAULT_AJAX_SETTING.data = data;
    }
    if (dataType != null) {
      DEFAULT_AJAX_SETTING.dataType != dataType;
    }
    if (success != null) {
      DEFAULT_AJAX_SETTING.success = success;
    }

    if (beforeSend != null) {
      DEFAULT_AJAX_SETTING.beforeSend = beforeSend;
    } else {
      DEFAULT_AJAX_SETTING.beforeSend = this.defaultBeforeSend;
    }
    if (error != null) {
      DEFAULT_AJAX_SETTING.error = error;
    } else {
      DEFAULT_AJAX_SETTING.error = this.defaultError;
    }
    this.originalAjax(DEFAULT_AJAX_SETTING);
  },
  originalAjax: function (setting) {
    $.ajax(setting);
  },
  defaultError: function (xhr, status, error) {
    //console.log("错误默认处理" + error + "||" + status);
  },
  defaultBeforeSend: function (xhr) {
    var authorization = sessionStorage.getItem("Authorization");
    //console.log(authorization + "==============================================================");
    //console.log("url+==============================================================" + this.url);
    // if (authorization == null) {
    //     if (WHITELIST.indexOf(getCaption(this.url, 0)) != -1) {

    //     } else {
    //         location.href = cube.gatewayURL_dataPortals + "/home/index.html";
    //     }
    // } else {
    //     xhr.setRequestHeader("Authorization", authorization);
    // }
  },
};

function getCaption(obj, state) {
  var index = obj.lastIndexOf("query?catId=");
  if (index != -1) {
    index = obj.lastIndexOf("=");
  }
  if (index != -1) {
    if (state == 0) {
      obj = obj.substring(0, index) + "=";
    } else {
      obj = obj.substring(index + 1, obj.length);
    }
  }
  return obj;
}
function ApabiReaderYaz() {
  layer.closeAll();
  var isIE = cube.myBrowser();
  if (isIE == "IE") {
    var url = cube.gatewayURL_file + "/file/returnCebStream?id=" + data.fileId;
    x_admin_show("预览 --- " + data.fileName, url, "define", "808px", "518px");
  } else {
    layer.msg("请使用IE浏览器预览!", {
      icon: 7,
      time: 1000,
    });
  }
}
function ApabiReaderXz() {
  layer.closeAll();
  window.location.href =
    "http://forspeed.onlinedown.net/down/PRCReaderSetup-4.5.2-1790.zip";
}

// CUBEINITs = function () {
//     var self = this;
//     var urls = window.location.pathname;
//     var path = /CloudHMI/;
//     var result = path.test(urls) ? "/CloudHMI" : "";
//     /* url前缀 */
//     self.gatewayURL_basics = result; //项目部署所在访问根基础资源地址
//     var resultModules = path.test(urls)
//         ? "/CloudHMI/view/module_demo/"
//         : "/view/module_demo/";
//     self.gatewayURL_module = result; //整体使用时，本部特有地址
//     //self.gatewayURL_basics = "http://127.0.0.1:8020/outproject/Dom/"; //项目部署所在访问地址
// };
// cubeInits = new CUBEINITs();
// console.log(1, cubeInits.gatewayURL_basic)

CUBE = function () {
  var self = this;

  /**
   * 地市配置
   */
  self.currentCity = "LANZHOU";
  /**
   * 每页显示多少条
   */
  self.pageSize = 10;
  /**
   * 显示的页数
   */
  self.pageLimitSize = 5;

  /**
   * require资源配置
   */
  self.requirePaths = {
    text: "js/require.text",
    sammy: "js/sammy",
    director: "js/director",
  };

  /**
   * 初始化
   *
   * @ignore
   */
  self.init = function () {
    // 初始化JS
    self._includeFrameworkJs("product/app.js");
    // 初始化css

    require = {
      paths: self.requirePaths,
    };
  };

  self._includeFrameworkJs = function (name) {
    document.write(
      "<script type='text/javascript' src='" +
        cubeInit.gatewayURL_basics +
        "/js/" +
        name +
        "'></script>"
    );
  };

  /**
   * 获取资源管理服务全路径
   */
  self.getResource = function (urlSuffix) {
    return cube.gatewayURL_resource + urlSuffix;
  };
  /**
   * resId,-资源id
   * resName,-资源名称
   * viewModel,
   * Zwsj,-暂无数据
   * fgnumber,-分割数量
   * numbers-条数
   * 获取相似资源列表
   */
  self.queryResAlike = function (
    resId,
    resName,
    viewModel,
    Zwsj,
    fgnumber,
    numbers,
    dataType
  ) {
    $("#" + Zwsj).hide();
    var postData = {
      resId: resId,
      resName: resName,
      resType: fgnumber,
      dataType: dataType,
      numbers: numbers,
    };
    HttpUtils.request.postJson(
      cube.getResource("/resource/queryResAlike"),
      postData,
      function (result) {
        //debugger
        if (result.successful == true) {
          if (!cube.isEmpty(result.resultValue)) {
            viewModel.resAlikeList(result.resultValue);
          } else {
            $("#" + Zwsj).show();
          }
        } else {
          $("#" + Zwsj).show();
        }
      },
      function (error) {
        $("#" + Zwsj).show();
      }
    );
  };
  /**
   * 删除资源
   */
  self.deleteRes = function (viewModel, orderId, resId, resType) {
    var postData = {
      orderId: orderId,
      resId: resId,
      resType: resType,
    };
    layer.confirm(
      "确认要删除吗？",
      { title: "<span>信息</span>", shadeClose: true, offset: "100px" },
      function (index) {
        HttpUtils.request.postBody(
          cube.gatewayURL_resource + "/deleteData/deleteResById",
          JSON.stringify(postData),
          function (result) {
            var resultData = ko.mapping.toJS(result);
            if (resultData.successful == true) {
              layer.msg("已删除!", {
                icon: 6,
                time: 1000,
                offset: "100px",
              });
              viewModel.getList();
            } else {
              if (!cube.isEmpty(resultData.resultHint)) {
                layer.msg(resultData.resultHint, {
                  icon: 5,
                  time: 1000,
                  offset: "100px",
                });
              } else {
                layer.msg("删除失败", {
                  icon: 5,
                  time: 1000,
                  offset: "100px",
                });
              }
            }
          },
          function (error) {
            layer.msg(error.status, {
              icon: 5,
              time: 1000,
              offset: "100px",
            });
          }
        );
      }
    );
  };
  /**
   * 删除工单
   */
  self.deleteOrder = function (viewModel, orderId, resId, resType) {
    var postData = {
      orderId: orderId,
      resId: resId,
      resType: resType,
    };
    layer.confirm(
      "确认要删除吗？",
      { title: "<span>信息</span>", shadeClose: true, offset: "100px" },
      function (index) {
        HttpUtils.request.postBody(
          cube.gatewayURL_resource + "/deleteData/deleteOrderById",
          JSON.stringify(postData),
          function (result) {
            var resultData = ko.mapping.toJS(result);
            if (resultData.successful == true) {
              layer.msg("已删除!", {
                icon: 6,
                time: 1000,
                offset: "100px",
              });
              viewModel.queryOrderCount();
              viewModel.getList();
            } else {
              if (!cube.isEmpty(resultData.resultHint)) {
                layer.msg(resultData.resultHint, {
                  icon: 5,
                  time: 1000,
                  offset: "100px",
                });
              } else {
                layer.msg("删除失败", {
                  icon: 5,
                  time: 1000,
                  offset: "100px",
                });
              }
            }
          },
          function (error) {
            layer.msg(error.status, {
              icon: 5,
              time: 1000,
              offset: "100px",
            });
          }
        );
      }
    );
  };
  /**
   * 判断是否为IE
   */
  self.myBrowser = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE =
      userAgent.indexOf("Trident") > -1 &&
      userAgent.indexOf("rv") > -1 &&
      !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari =
      userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome =
      userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
      /*var reIE = new RegExp(/rv:(\d+\.\d+)/);
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return "IE7";
            } else if (fIEVersion == 8) {
                return "IE8";
            } else if (fIEVersion == 9) {
                return "IE9";
            } else if (fIEVersion == 10) {
                return "IE10";
            } else if (fIEVersion == 11) {
                return "IE11";
            } else {
                return "0";
            }//IE版本过低*/
      return "IE";
    }
    if (isOpera) {
      return "Opera";
    }
    if (isEdge) {
      return "Edge";
    }
    if (isFF) {
      return "FF";
    }
    if (isSafari) {
      return "Safari";
    }
    if (isChrome) {
      return "Chrome";
    }
  };
  /**
   * 预览文件
   */
  self.prewFile = function (data) {
    debugger;
    if (
      data.suffix.toLowerCase() == "ceb" ||
      data.suffix.toLowerCase() == "cebx"
    ) {
      var isIE = cube.myBrowser();
      if (isIE == "IE") {
        var url =
          cube.gatewayURL_file + "/file/returnCebStream?id=" + data.fileId;
        x_admin_show(
          "预览 --- " + data.fileName,
          url,
          "define",
          "808px",
          "518px"
        );
      } else {
        layer.open({
          title: "<span>信息</span>",
          shadeClose: true,
          type: 1,
          skin: "layui-layer-rim", // 加上边框
          area: ["420px", "240px"], // 宽高
          content:
            '<div class="container-browser">\
    	   			<p class="title fz18" title="温馨提示">温馨提示</p>\
    	   			<div class="news">\
    	   				<p>检测到您预览的是ceb或cebx文件。</p>\
    						<p class="bottom-time fr">需要安装Apabi Reader软件。为避免无法预览，建议您下载安装，已安装请忽略！</p>\
    	   			</div>\
    					<button type="button" class="fr btn btn-small btn-download"  onclick="ApabiReaderYaz()">我已安装</button>\
    	            	<button type="button" class="fr btn btn-small btn-download"  onclick="ApabiReaderXz()">下载</button>\
    				</div>',
        });
      }
    } else if (data.suffix.toLowerCase() == "pdf") {
      var url =
        cube.gatewayURL_dataPortals +
        "/home/view/grabble/pdfSelfPreview.html?id=" +
        data.fileId;
      x_admin_show(
        "预览 --- " + data.fileName,
        url,
        "define",
        "808px",
        "518px"
      );
    } else {
      var url =
        cube.gatewayURL_dataPortals +
        "/home/view/grabble/pdfpreview.html?id=" +
        data.fileId +
        "&" +
        encodeURI(data.fileName);
      x_admin_show(
        "预览 --- " + data.fileName,
        url,
        "define",
        "808px",
        "518px"
      );
    }
  };
  /**
   * 列表分页
   */
  self.showPageControl = function (viewModel, myClass) {
    var pageClass = "";
    if (cube.isEmpty(myClass)) {
      pageClass = "navigation";
    } else {
      pageClass = myClass;
    }
    var pageIndex = viewModel.pageIndex();
    var pageSize = viewModel.pageSize;
    var totalCount = viewModel.totalCount;
    var pageCount =
      totalCount % pageSize == 0
        ? parseInt(totalCount / pageSize)
        : parseInt(totalCount / pageSize) + 1;
    // 显示分页功能
    if (pageCount <= 0) {
      $("." + pageClass)
        .find("ul")
        .html("");
      return;
    }
    $("." + pageClass)
      .find("ul")
      .html("");
    $("." + pageClass)
      .find("ul")
      .append("<li id='pre'><a class='Previous'><span><</span></a></li>");
    this.getPageArray(pageIndex, pageCount, pageClass);
    //输入页面 跳转组件
    var bstpage =
      '\
        	<li class="bstpage"><a>\
			    <span class="bst-skip">\
			        到第<input type="text" min="1" value=' +
      pageIndex +
      ' class="bst-input">页\
			        <button type="button" class="btn bst-page">确定</button>\
			    </span>\
	    		<span>共' +
      totalCount +
      " 条</span></a>\
			</li>";
    $("." + pageClass)
      .find("ul")
      .append(
        "<li id='next'><a class='Next'><span>></span></a></li>" + bstpage
      );
    // 添加点击事件
    $("." + pageClass)
      .find("li")
      .on("click", function () {
        var id = $(this).attr("id");
        //console.log("index =" + id);
        if (cube.isEmpty(id)) {
          return;
        }
        if (id == "pre") {
          pageIndex--;
          if (pageIndex < 1) {
            pageIndex = 1;
          }
        } else if (id == "next") {
          pageIndex++;
          if (pageIndex > pageCount) {
            pageIndex = pageCount;
          }
        } else {
          pageIndex = id;
        }
        //console.log("pageIndex =" + pageIndex);
        viewModel.pageIndex(pageIndex);
        viewModel.getList();
      });
    $(".bst-page").click(function () {
      var index = $(this).prev().val();
      // var index = $(".bst-input").val();
      if (cube.isEmpty(index)) {
        layer.msg("请输入有效页数", { icon: 7, time: 1000 });
        index = 1;
      } else {
        if (isNaN(index)) {
          layer.msg("请输入有效数字页数", { icon: 7, time: 1000 });
          index = 1;
        }
      }
      if (parseInt(index) < 1 || parseInt(index) > pageCount) {
        layer.msg("请输入有效页数", { icon: 7, time: 1000 });
        index = 1;
      }

      viewModel.pageIndex(index);
      viewModel.getList();
    });
  };

  self.getPageArray = function (pageIndex, pageCount, pageClass) {
    if (pageCount <= this.pageLimitSize) {
      this.appendHtml(1, pageCount, pageIndex, pageClass);
    } else {
      if (pageIndex <= this.pageLimitSize - 1) {
        // 前半部分
        this.appendHtml(1, this.pageLimitSize - 1, pageIndex, pageClass);
        $("." + pageClass)
          .find("ul")
          .append(" <li><a >...</a></li>");
        $("." + pageClass)
          .find("ul")
          .append(" <li id='" + pageCount + "'><a>" + pageCount + "</a></li>");
      } else if (pageCount - pageIndex + 1 <= this.pageLimitSize - 1) {
        // 后半部分
        $("." + pageClass)
          .find("ul")
          .append(" <li id='1'><a >1</a></li>");
        $("." + pageClass)
          .find("ul")
          .append(" <li><a>...</a></li>");
        this.appendHtml(
          pageCount - (this.pageLimitSize - 2),
          pageCount,
          pageIndex,
          pageClass
        );
      } else {
        $("." + pageClass)
          .find("ul")
          .append(" <li id='1'><a >1</a></li>");
        $("." + pageClass)
          .find("ul")
          .append(" <li><a>...</a></li>");
        if (self.pageLimitSize > 4 && self.pageLimitSize % 2 != 0) {
          this.appendHtml(
            parseInt(pageIndex) - Math.ceil((this.pageLimitSize - 3) / 2),
            parseInt(pageIndex) + Math.ceil((this.pageLimitSize - 3) / 2),
            pageIndex,
            pageClass
          );
        } else {
          this.appendHtml(
            parseInt(pageIndex) - Math.ceil((this.pageLimitSize - 3) / 2),
            parseInt(pageIndex) + Math.ceil((this.pageLimitSize - 3) / 2) - 1,
            pageIndex,
            pageClass
          );
        }
        $("." + pageClass)
          .find("ul")
          .append(" <li><a >...</a></li>");
        $("." + pageClass)
          .find("ul")
          .append(" <li id='" + pageCount + "'><a>" + pageCount + "</a></li>");
      }
    }
  };

  self.appendHtml = function (startIndex, endIndex, pageIndex, pageClass) {
    for (var i = startIndex; i <= endIndex; i++) {
      var str = " <li id='" + i + "'><a>" + i + "</a></li>";
      if (i == pageIndex) {
        str = " <li class='active' id='" + i + "'><a>" + i + "</a></li>";
      }
      $("." + pageClass)
        .find("ul")
        .append(str);
    }
  };

  //判断字符是否为空的方法
  self.isEmpty = function (obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true;
    } else {
      return false;
    }
  };
  //时间格式化处理
  self.dateFormat = function (fmt, date) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  };
};

cube = new CUBE();
cube.init();
