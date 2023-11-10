/**
 * Created by PanJiaChen on 16/11/18.
 */
// import moment from "moment";
// import Highcharts from "highcharts";
// import HighchartsMore from "highcharts/highcharts-more";
// import Highcharts3D from "highcharts/highcharts-3d";
// import HighchartsNoData from "highcharts/modules/no-data-to-display";
// import HighStock from "highcharts/highstock";
// import solidGauge from "highcharts/modules/solid-gauge";
// import variable from "highcharts/modules/variable-pie";
// import cylinder from "highcharts/modules/cylinder";
// import XEUtils from "xe-utils";
// HighchartsMore(Highcharts);
// Highcharts3D(Highcharts);
// HighchartsNoData(Highcharts);
// solidGauge(Highcharts);
// variable(Highcharts);
// cylinder(Highcharts);

/**
 * 定时器
 * @param {*} fn
 * @param {*} time 默认5分钟
 * @returns
 */
export function setInter_tiem(fn, time) {
  fn();
  time = time ? time : 1000 * 60 * 5;
  return setInterval(() => {
    fn();
  }, time);
}
export function setClear_tiem(TIMECLEAR) {
  clearInterval(TIMECLEAR);
}

/**
 * @param {*数值} cellValue
 * @param {*小数位数} n (默认三位)
 * @returns 保留小数点，符合四舍五入（有就保留，没有就不保留）
 */
export function formatterFloat(cellValue, n) {
  const d = n ? n : 3;
  return parseFloat(parseFloat(cellValue).toFixed(d));
}

/**
 * @param {*月数} n 正数后几个月，负数前几个月 默认本月
 * @param {*时间类型} type 默认yyyy-MM
 * @returns n个月月份
 */
export function getRecentMonth(news, type) {
  const time = XEUtils.isObject(news) ? news.time : new Date();
  const num = XEUtils.isObject(news) ? news.num : news;
  let month = XEUtils.getWhatMonth(time, num);
  type = type ? type : "yyyy-MM";
  return XEUtils.toDateString(month, type);
}

/**
 * @param {*天数} n 正数后几个天，负数前几个天 默认本天
 * @param {*时间类型} type 默认yyyy-MM-dd
 * @returns n天数
 */
export function getRecentDate(n, type) {
  let day = XEUtils.getWhatDay(new Date(), n);
  type = type ? type : "yyyy-MM-dd";
  return XEUtils.toDateString(day, type);
}

/**
 * @param {出生年月} birthday
 * @returns 年龄
 */
export function age_cofig(birthday) {
  let age = "--";
  if (birthday) {
    const date = new Date().getFullYear();
    age = date - birthday.split("-")[0];
  }
  return age;
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export const formatTime = (time, option) => {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;
  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
};

/**
 * @param {string} url
 * @returns {Object}
 */
export const param2Obj = (url) => {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach((v) => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
};

/**
 * 图片上传地址
 * @returns {string}
 */
export const actionUrl = () => {
  if (window.location.host.indexOf("localhost") > -1) {
    return "/dev-api/api/common/v1/uploadAttachment/";
  } else if (window.location.host.indexOf("dev.seer-health") > -1) {
    return "https://dev.seer-health.com/v1/mall/api/common/v1/uploadAttachment/";
  } else {
    return "https://api.seer-health.com/v1/mall/api/common/v1/uploadAttachment/";
  }
};

export const actionUrl2 = () => {
  if (window.location.host.indexOf("localhost") > -1) {
    return "/portal-api/nAdv/uploadFile";
  } else if (window.location.host.indexOf("dev.seer-health") > -1) {
    return "https://dev.seer-health.com/v1/portal/nAdv/uploadFile";
  } else {
    return "https://api.seer-health.com/v1/portal/nAdv/uploadFile";
  }
};

/**
 * 对象判空
 * empty：false非空，true空
 */
export const emptyObj = (obj) => {
  for (const key in obj) {
    return false;
  }
  return true;
};

/**
 * Echarts 初始化
 */

export const initEchart = (echart, config, bg, color) => {
  if (!config) {
    config = echartsNoData(bg, color);
  }
  echart.setOption(config);
  return false;
};

/**
 * echarts 无数据
 */
export const echartsNoData = (bg, color) => {
  let text = bg ? "" : "暂无数据";
  return {
    title: {
      text,
      x: "center",
      y: "center",
      textStyle: NoDataStyle(color),
    },
  };
};

/**
 * Hchart 初始化
 */
export const initHchart = (el, config, bgs, flag) => {
  if (!config) {
    if (el) {
      config = highchartsNoData(bgs);
    } else {
      let { bg, el } = bgs;
      config = highchartsNoData(bg, el);
    }
  }
  if (el) {
    if (flag) {
      HighStock.chart(el, config);
    } else {
      Highcharts.chart(el, config);
    }
  } else {
    //多个类
    if (flag) {
      HighStock.chart(config);
    } else {
      Highcharts.chart(config);
    }
  }
  // else {
  //     document.getElementById(el).innerHTML = "";
  //     document.getElementById(el).backgroundImage = 'none'
  // }
  return false;
};

/**
 * highchart 无数据
 */
export const highchartsNoData = (bg, el) => {
  let text = bg ? "" : "暂无数据";
  let chart = { backgroundColor: "none" };
  if (el) {
    chart.renderTo = el;
  }
  return {
    chart,
    credits: {
      enabled: false,
    },
    lang: {
      noData: "",
    },
    title: {
      text,
      y: 100,
      style: NoDataStyle(),
    },
  };
};

/**
 * @returns 无数据样式
 */
export const NoDataStyle = (c) => {
  let color = c === "admin" ? "#6D6D6D" : "#3DF4F5";
  return {
    color,
    fontWeight: "bold",
    fontSize: "1.2rem",
  };
};

/**
 * vue-seamless-scroll 无缝滚动
 * @param {*this} that
 * @param {*ref} dom
 * @param {*data} list
 * @returns const { play, data } = tableMarqueeSeamless(this,'ref',res.data);
 * this.defineScroll.autoPlay = play; this.defineScroll.hoverStop = play;
 */
export const tableMarqueeSeamless = (that, dom, list) => {
  let tablexy = that.$refs[dom];
  if (!tablexy) return;
  const divDataH = tablexy.$el.clientHeight;
  let table = that.$refs[`${dom}s`];
  const h =
    table.bodyWrapper.childNodes[0].childNodes[1].childNodes[0].clientHeight;
  const len = list.length * h;
  if (len > divDataH) {
    return { play: true, data: [...list] };
  } else {
    let n = 1,
      arr = [];
    while (divDataH - len > h * n) {
      arr.push({});
      n += 1;
    }
    return { play: false, data: [...list, ...arr] };
  }
};

/**
 * table 无缝滚动
 * @param {el} table
 * @param {data} list
 * @returns
 * @use this.allData = tableMarquee(this.$refs.table,res.data);
 */
export const tableMarquee = (table, list) => {
  if (!table) return;
  const divDataH = table.bodyWrapper.clientHeight;
  const h =
    table.bodyWrapper.childNodes[0].childNodes[1].childNodes[0].clientHeight;
  const len = list.length * h;
  if (len > divDataH) {
    marqueeInterval(table.bodyWrapper, len);
    return [...list, ...list];
  } else {
    let n = 1,
      arr = [];
    while (divDataH - len > h * n) {
      arr.push({});
      n += 1;
    }
    return [...list, ...arr];
  }
};
const marqueeInterval = (bodyWrapper, len) => {
  let tbTop = 0;
  const speedhq = 100;
  const marquehq = () => {
    if (tbTop <= -len) {
      tbTop = 0;
    } else {
      tbTop -= 1;
    }
    const dome = bodyWrapper.childNodes[0];
    // dome.style.transform = `translateY(${tbTop}px)`;//`translate(0,${tbTop}px)`
    // dome.style.transition = "all 1s";//all 0ms ease-in 0s
    dome.style.top = tbTop + "px";
  };
  let timer = 0;
  timer = setInterval(marquehq, speedhq);
  const clearElement = (element) => {
    element.onmouseleave = function () {
      clearInterval(timer);
      timer = setInterval(marquehq, speedhq);
    };
    element.onmouseenter = function () {
      clearInterval(timer);
    };
  };
  clearElement(bodyWrapper);
  const this_dom = document.querySelectorAll(".popperBoxs .content");
  this_dom.forEach((element) => {
    clearElement(element);
  });
  return timer;
};

export const tableMarquees = (table, list) => {
  if (!table) return;
  const divDataH = table.bodyWrapper.clientHeight;
  const h =
    table.bodyWrapper.childNodes[0].childNodes[1].childNodes[0].clientHeight;
  const len = list.length * h;
  if (len > divDataH) {
    marqueeIntervals(table.bodyWrapper, len);
    return [...list, ...list];
  } else {
    let n = 1;
    while (divDataH > h * n) {
      list.push({});
      n += 1;
    }
    return list;
  }
};
const marqueeIntervals = (bodyWrapper, len) => {
  let tbTop = 0;
  const speedhq = 1;
  const marquehq = () => {
    if (tbTop <= -len) {
      tbTop = 0;
    } else {
      tbTop -= 0.36;
    }
    bodyWrapper.childNodes[0].style.top = tbTop + "px";
  };
  let timers = 0;
  timers = setInterval(marquehq, speedhq);
  const clearElement = (element) => {
    element.onmouseleave = function () {
      clearInterval(timers);
      timers = setInterval(marquehq, speedhq);
    };
    element.onmouseenter = function () {
      clearInterval(timers);
    };
  };
  clearElement(bodyWrapper);
  const this_dom = document.querySelectorAll(".popperBoxs .content");
  this_dom.forEach((element) => {
    clearElement(element);
  });
  return timers;
};
/**
 * 姓名隐藏关键字
 * @param {*姓名} name
 * @returns
 */
export const toStartName = (name) => {
  if (!name) {
    return;
  }
  if (name.length > 2) {
    return name.substring(0, 1) + "*" + name.substring(1 + 1);
  } else if (name.length === 2) {
    return name.substring(0, 1) + "*";
  } else {
    return name;
  }
};

/**
 * 手机号隐藏关键号
 * @param {*手机号} phone
 * @returns
 */
export const toStartCellphone = (phone) => {
  if (!phone) {
    return;
  }
  return `${phone.substring(0, 3)}****${phone.substring(7)}`;
};

/**
 * 根据数组获取 色值
 * @param {*数组} indicator
 * @returns
 */
export const marke_tone = (indicator) => {
  let marke = {};
  let cs = color_tone();
  let cs1 = color_tone(0.3);
  return indicator_cs(indicator, marke, cs, cs1);
};

//marke 色值
export const color_tone = (k) => {
  let op = k ? k : 1;
  return [
    `rgba(61, 239, 239,${op})`,
    `rgba(90, 234, 109,${op})`,
    `rgba(0, 186, 186,${op})`,
    `rgba(98, 137, 220,${op})`,
    `rgba(136, 127, 254,${op})`,
    `rgba(57, 230, 216,${op})`,
    `rgba(103, 198, 63,${op})`,
    `rgba(105, 165, 255,${op})`,
    `rgba(122, 122, 195,${op})`,
    `rgba(37, 163, 236,${op})`,
  ];
};
/**
 * @param {*数组或数值} indicator
 * @param {*返回Html} marke
 * @param {*色值1} arrcs
 * @param {*色值2} arrcs1
 * @returns
 */
export const indicator_cs = (indicator, marke, arrcs, arrcs1) => {
  let s = 0;
  let num = indicator instanceof Array ? indicator.length : indicator;
  let cs = [];
  let cs1 = [];
  for (let index = 0; index < num; index++) {
    s = s < arrcs.length ? s : 0;
    let key = `marke_${index}`;
    Object.assign(marke, {
      [key]: {
        width: 7,
        height: 7,
        borderRadius: 50,
        borderColor: cs1[s],
        borderWidth: 3,
        backgroundColor: cs[s],
      },
    });
    cs.push(arrcs[s]);
    cs1.push(arrcs1[s]);
    s++;
  }
  return { marke, cs, cs1 };
};

/**
 * 输入框只能输入正数、浮点数
 * @param {值} num
 * @returns
 */
export function oninput(num) {
  var str = num;
  var len1 = str.substr(0, 1);
  var len2 = str.substr(1, 1);
  // 如果第一位是0，第二位不是点，就用数字把点替换掉
  if (str.length > 1 && len1 == 0 && len2 != ".") {
    str = str.substr(1, 1);
  }
  // 第一位不能是.
  if (len1 == ".") {
    str = "";
  }
  // 限制只能输入一个小数点
  if (str.indexOf(".") != -1) {
    var str_ = str.substr(str.indexOf(".") + 1);
    if (str_.indexOf(".") != -1) {
      str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
    }
  }
  // 正则替换
  str = str.replace(/[^\d^\.]+/g, ""); // 保留数字和小数点
  str = str.replace(/\.\d\d\d$/, ""); // 小数点后只能输两位
  return str;
}

/**
 * 移除00:00:00
 * @param {*} num
 * @returns
 */
export function toTImeString(val) {
  const t = val.split(" ");
  return t[1] === "00:00:00" ? t[0] : val;
}

//前8天的日期
const date = [
  parseTime(new Date() - 7 * 24 * 3600 * 1000, "{y}-{m}-{d}"),
  parseTime(new Date() - 6 * 24 * 3600 * 1000, "{y}-{m}-{d}"),
  parseTime(new Date() - 5 * 24 * 3600 * 1000, "{y}-{m}-{d}"),
  parseTime(new Date() - 4 * 24 * 3600 * 1000, "{y}-{m}-{d}"),
  parseTime(new Date() - 3 * 24 * 3600 * 1000, "{y}-{m}-{d}"),
  parseTime(new Date() - 2 * 24 * 3600 * 1000, "{y}-{m}-{d}"),
  parseTime(new Date() - 1 * 24 * 3600 * 1000, "{y}-{m}-{d}"),
  parseTime(new Date() - 0 * 24 * 3600 * 1000, "{y}-{m}-{d}"),
];
//前七天
export const dateFs = date.slice(0, 7);
//前七天含今天
export const dateNs = date.slice(1, 8);

//前5个月的月份
// const months = [
//   moment(new Date()).subtract(4, "months").format("YYYY-MM"),
//   moment(new Date()).subtract(3, "months").format("YYYY-MM"),
//   moment(new Date()).subtract(2, "months").format("YYYY-MM"),
//   moment(new Date()).subtract(1, "months").format("YYYY-MM"),
//   moment(new Date()).subtract(0, "months").format("YYYY-MM"),
// ];
// //前三个月含本月
// export const monthNs = months.slice(2, 5);

//后台图片存放地址
export const imgBaseUrl = window.location.origin;
