/*
 * @Descripttion: Sustainable
 * @version: 1.0.0
 * @Author: Kenny
 * @Date: 2023-01-05 14:18:41
 * @LastEditors: ~
 * @LastEditTime: 2023-11-07 14:39:30
 */
import {
  dateFs,
  dateNs,
  getRecentMonth,
  getRecentDate,
  parseTime,
} from "./index.js";
/**
 * mock数据
 * @param {string} key
 * @returns
 */
export const getScroll = () => {
  return {
    autoPlay: false,
    hoverStop: false, // 是否开启鼠标悬停stop
    step: 1, // 数值越大速度滚动越快
    limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
    direction: 1, // 0向下 1向上 2向左 3向右
    openWatch: true, // 开启数据实时监控刷新dom
    singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
    singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
    waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
  };
};

const require = (path) => {
  const weather = "www.baidu.com/"; //"@/assets/weather/"
  return weather + path;
};

export const weatherList = [
  { id: 1, name: "晴", url: require("weather01.png") },
  { id: 2, name: "少云", url: require("weather02.png") },
  { id: 3, name: "晴间多云", url: require("weather03.png") },
  { id: 4, name: "多云", url: require("weather04.png") },
  { id: 5, name: "阴", url: require("weather05.png") },
  { id: 6, name: "有风", url: require("weather06.png") },
  { id: 7, name: "平静", url: require("weather07.png") },
  { id: 8, name: "微风", url: require("weather08.png") },
  { id: 9, name: "和风", url: require("weather09.png") },
  { id: 10, name: "清风", url: require("weather10.png") },
  { id: 11, name: "强风/劲风", url: require("weather11.png") },
  { id: 12, name: "疾风", url: require("weather12.png") },
  { id: 13, name: "大风", url: require("weather13.png") },
  { id: 14, name: "烈风", url: require("weather14.png") },
  { id: 15, name: "风暴", url: require("weather15.png") },
  { id: 16, name: "狂爆风", url: require("weather16.png") },
  { id: 17, name: "飓风", url: require("weather17.png") },
  { id: 18, name: "热带风暴", url: require("weather18.png") },
  { id: 19, name: "霾", url: require("weather19.png") },
  { id: 20, name: "中度霾", url: require("weather20.png") },
  { id: 21, name: "重度霾", url: require("weather21.png") },
  { id: 22, name: "严重霾", url: require("weather22.png") },
  { id: 23, name: "阵雨", url: require("weather23.png") },
  { id: 24, name: "雷阵雨", url: require("weather24.png") },
  {
    id: 25,
    name: "雷阵雨并伴有冰雹",
    url: require("weather25.png"),
  },
  { id: 26, name: "小雨", url: require("weather26.png") },
  { id: 27, name: "中雨", url: require("weather27.png") },
  { id: 28, name: "大雨", url: require("weather28.png") },
  { id: 29, name: "暴雨", url: require("weather29.png") },
  { id: 30, name: "大暴雨", url: require("weather30.png") },
  { id: 31, name: "特大暴雨", url: require("weather31.png") },
  { id: 32, name: "强阵雨", url: require("weather32.png") },
  { id: 33, name: "强雷阵雨", url: require("weather33.png") },
  { id: 34, name: "极端降雨", url: require("weather34.png") },
  {
    id: 35,
    name: "毛毛雨/细雨",
    url: require("weather35.png"),
  },
  { id: 36, name: "雨", url: require("weather36.png") },
  { id: 37, name: "小雨-中雨", url: require("weather37.png") },
  { id: 38, name: "中雨-大雨", url: require("weather38.png") },
  { id: 39, name: "大雨-暴雨", url: require("weather39.png") },
  {
    id: 40,
    name: "暴雨-大暴雨",
    url: require("weather40.png"),
  },
  {
    id: 41,
    name: "大暴雨-特大暴雨",
    url: require("weather41.png"),
  },
  { id: 42, name: "雨雪天气", url: require("weather42.png") },
  { id: 43, name: "雨夹雪", url: require("weather43.png") },
  { id: 44, name: "阵雨夹雪", url: require("weather44.png") },
  { id: 45, name: "冻雨", url: require("weather45.png") },
  { id: 46, name: "雪", url: require("weather46.png") },
  { id: 47, name: "阵雪", url: require("weather47.png") },
  { id: 48, name: "小雪", url: require("weather48.png") },
  { id: 49, name: "中雪", url: require("weather49.png") },
  { id: 50, name: "大雪", url: require("weather50.png") },
  { id: 51, name: "暴雪", url: require("weather51.png") },
  { id: 52, name: "小雪-中雪", url: require("weather52.png") },
  { id: 53, name: "中雪-大雪", url: require("weather53.png") },
  { id: 54, name: "大雪-暴雪", url: require("weather54.png") },
  { id: 55, name: "浮尘", url: require("weather55.png") },
  { id: 56, name: "扬沙", url: require("weather56.png") },
  { id: 57, name: "沙尘暴", url: require("weather57.png") },
  { id: 58, name: "强沙尘暴", url: require("weather58.png") },
  { id: 59, name: "龙卷风", url: require("weather59.png") },
  { id: 60, name: "雾", url: require("weather60.png") },
  { id: 61, name: "浓雾", url: require("weather61.png") },
  { id: 62, name: "强浓雾", url: require("weather62.png") },
  { id: 63, name: "轻雾", url: require("weather63.png") },
  { id: 64, name: "大雾", url: require("weather64.png") },
  { id: 65, name: "特强浓雾", url: require("weather65.png") },
  { id: 66, name: "热", url: require("weather66.png") },
  { id: 67, name: "冷", url: require("weather67.png") },
  { id: 68, name: "未知", url: require("weather68.png") },
];

/**
 * @param {*月数} n
 * @param {*时间类型} type
 * @returns 前n个月月份:本月计入
 */
export function getNMonth(n, type) {
  let FMonths = [];
  for (let index = n - 1; index >= 0; index--) {
    const date = getRecentMonth(-index, type);
    FMonths.push(date);
  }
  return FMonths;
}

/**
 *
 * @param {*} n小时
 * @param {*} option{
 *  time:时间
 *  spacing：间隔时间(单位分钟)
 * }
 * @returns 获取从time时间前的n小时前每隔spacing的间隔时间
 */
export function getTimeSpa(n, option) {
  //获取当前时间-24小时每隔15min的时间
  const t = 1000 * 60; //一分钟的时间戳
  let s = n ? n * 60 * t : 24 * 60 * t; //24就是96个时间
  let d = new Date().getTime();
  let spa = 15 * t;
  if (option) {
    const { time, spacing } = option;
    d = new Date(time).getTime();
    spa = spacing * t;
  }
  var result = [];
  let i = 0;
  while (i < s) {
    result.push(parseTime(d - i));
    i += spa; //计入当前
  }
  return result.reverse();
}

//前七天
export const dateF = dateFs;
//前七天含今天
export const dateN = dateNs;

/**
 * @param {*天数} n
 * @param {*时间类型} type
 * @returns 前n天:本天计入
 */
export function getDateN(n, type) {
  let FDate = [];
  for (let index = n - 1; index >= 0; index--) {
    const date = getRecentDate(-index, type);
    FDate.push(date);
  }
  return FDate;
}

/**
 * @param {*天数} n
 * @param {*时间类型} type
 * @returns 前n天:本天不计入
 */
export function getDateF(n, type) {
  let FDate = [];
  for (let index = n; index > 0; index--) {
    const date = getRecentDate(-index, type);
    FDate.push(date);
  }
  return FDate;
}

const numinit = [0, 0, 0, 0, 0, 0, 0, 0];
export const datas = numinit;
export const dataInit = numinit.slice(0, 7);

/**
 * 随机数
 * @param {*个数} n
 * @param {*进位值} k 默认10
 * @returns
 */
export function getNumber(n, k) {
  let num = [];
  for (let index = 0; index < n; index++) {
    num.push(Math.ceil(Math.random() * (k ? k : 10)));
  }
  return num;
}

/**
 * 补0
 * @param {*0数} n
 * @returns
 */
export function getDataInit(n) {
  let arr = [];
  for (let index = n; index > 0; index--) {
    arr.push(0);
  }
  return arr;
}

const dataNull = ["", "", "", "", "", "", "", ""];
export const dataNulls = dataNull;
export const dataNullInit = dataNull.slice(0, 7);
