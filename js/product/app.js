/*
 * 网关地址
 *
 * @default id + port
 */

var baseurl = "http://10.1.5.98:";

cube.gatewayURL_iscDefaultLogin = "http://21.76.119.115:17006"; // isc默认登录服务

cube.gatewayURL_resource =
  "https://m1.apifoxmock.com/m1/2829284-1202965-default"; // dataPortals-resource资源管理服务地址

cube.gatewayURL_order = "http://10.1.5.98:8102"; // dataPortals-order工单服务地址

cube.gatewayURL_catalogue = "http://10.1.5.98:8103"; // dataPortals-catalogue目录管理服务地址

cube.gatewayURL_base = "http://10.1.5.98:8080"; // 新旧门户部署的地址

/*文件详情*/
cube.gatewayURL_filedetail = self.gatewayURL_file + "/file/queryName";

/* 图片显示url前缀 */
cube.gatewayURL_imgShow = "http://10.1.5.98:18079/dps-v1"; //图片服务器

cube.gatewayURL_headImgShow = "http://10.1.5.98:18079/dps-v1/file/query?id=";

cube.gatewayURL_dataPortals = "http://localhost:8080/dataPortals"; //项目部署所在访问地址

/*文件服务器地址*/
cube.gatewayURL_file = "http://10.1.5.98:18079/dps-v1";
/*公告公共接口*/
cube.gatewayURL_dsCommBulle =
  "http://10.1.5.98:8006/ds/bulletin/commBulletinList";
/*公告新增或者编辑*/
cube.gatewayURL_dsCommBulleAddOrEdit =
  "http://10.1.5.98:8999/ds/home/view/product/common/bulletinPlugin.html";
/*本系统跨系统登录*/
cube.url_local_isc = "http://10.1.5.98:8085/isc/default/sendRedirect";

//系统id sysId
cube.sysId = "8a81859d6b9d7d2e016bb565ec700005"; //项目id

//系统名称 sysName
cube.sysName = "数据超市"; //项目名称
/* url前缀定义：用于非根目录转换 */
// var urls = window.location.pathname;
// var path = /CloudHMI/;
// var result = path.test(urls) ? "/CloudHMI/" : "/";
// cube.gatewayURL_basics = result; //项目部署所在访问根基础资源地址
// cube.gatewayURL_module = result; //整体使用时，本部特有地址
cube = {
  ...cube,
  ...cubeInit,
};

//白名单，不用校验token
var WHITELIST = [
  baseurl + "8104/index/getDataCount",
  baseurl + "8104/index/getOutAndInnerResCount",
  baseurl + "8104/index/getHotLabels",
  baseurl + "8104/index/getScanResourceList",
  baseurl + "8104/index/getNewResourceList",
  baseurl + "8104/index/getDowLoadList",
  baseurl + "8104/downrecode/getResourceTypeCount",
  baseurl + "8104/downrecode/querytopten",
  baseurl + "8104/downrecode/queryCountByCity",
  baseurl + "8104/downrecode/queryCountByDepartment",
  baseurl + "8104/resource/getCityBelongto",
  baseurl + "8104/keyword/querybycount",
  baseurl + "8103/restype/query?catId=",
  baseurl + "8104/resource/query",
  baseurl + "8104/index/depCountList",
  baseurl + "8103/cat/selectchildnode?catId=1",
  baseurl + "8103/cat/selectchildnode?catId=2",
  baseurl + "8103/cat/selectrootnode",
  baseurl + "8104/resource/dataResDetail",
  //baseurl + "evaluationmsg/getCommentsByResourceId",
  baseurl + "8104/taginfo/queryResByPid",
  baseurl + "8104/resource/getDicList",
  baseurl + "8104/Echarts/etByDept",
  baseurl + "8104/resource/getResPerAchCount",
  baseurl + "8102/order/getindexbycondition",
];
