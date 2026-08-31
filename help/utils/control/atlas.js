/*
 * @Descripttion: Sustainable
 * @version: 1.0.0
 * @Author: Kenny
 * @Date: 2025-06-24 08:56:42
 * @LastEditors: ~
 * @LastEditTime: 2025-06-26 13:45:22
 */
import { delayedInit } from "./config";

/**
 * 图谱 配置
 */
const _config = {
  confine: true,
  trigger: "item", //item axis
  backgroundColor: "#0E67CE",
  borderColor: "#0E67CE",
  padding: 3,
  textStyle: {
    color: "#e5f7ff",
    fontSize: "14",
  },
};
/**
 * Echarts 配置
 */
export const initEchart_config = {
  tooltip: _config,
};
/**
 * Echarts 初始化
 * @param {object} param
 * {
 *  *el: 元素
 *  config: object 配置
 *  bg: boolean 默认无背景
 *  noDataColor: string 无数据颜色
 * }
 * @returns { myChart }
 */
export const initEchartView = (param) => {
  const { el, config, bg, noDataColor } = param;
  if (!el) return "error";
  if (!config) {
    config = echartsNoData(bg, noDataColor);
  }
  const myChart = delayedInit(el);
  myChart.clear();
  myChart.setOption(config);
  return { myChart };
};
//updateNewRemove
export const initEchart = (echart, config, bg, noDataColor) => {
  if (!echart) return;
  if (!config) {
    config = echartsNoData(bg, noDataColor);
  }
  echart.setOption(config);
  return false;
};

/**
 * echarts 无数据
 */
export const echartsNoData = (bg, noDataColor) => {
  let text = bg ? "" : "暂无数据";
  return {
    title: {
      text,
      x: "center",
      y: "center",
      textStyle: NoDataStyle(noDataColor),
    },
  };
};

/**
 * Hchart 配置
 */
export const initHchart_config = {
  tooltip: {
    ..._config,
    style: _config.textStyle,
  },
};
/**
 * Hchart 初始化
 */
export const initHchart = (el, config, bgs, flag) => {
  if (!el) return "error";
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
export const initHchartView = ({
  el,
  config,
  bgs,
  flag,
  HighStock,
  Highcharts,
}) => {
  if (!el) return "error";
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
const NoDataStyle = (noDataColor) => {
  return {
    color: noDataColor ? noDataColor : "#3DF4F5",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };
};

export default {
  initEchart_config,
  initHchart_config,
  initEchartView,
  initHchartView,
  initEchart, //updateNewRemove Echarts：占用3.29MB
  initHchart, //updateNewRemove Hchart：2.1MB
};
