let { getRecentMonth, dateNs, initEchart } = await import(
  `${cube.gatewayURL_module}js/product/index.js`
);

let { getDateN } = await import(
  `${cube.gatewayURL_module}js/product/mockData.js`
);

//全局变量
let data = {
  time: {
    time: "2023-08-28",
    num: 0,
  },
  value: 6,
  principal: {
    value24: 10000,
    value12: 5000,
    value06: 10000,
    value03: 20000,
  },
  circulation: 4,
  min: [24, 12, 6, 3],
  max: [3, 6, 12, 24],
};

//选择项目文件右击打开
$(function () {
  //初步启动
  listChart();
  $("#clickCirculation").on("change", function () {
    const value = $(this).val();
    data.circulation = value;
    listChart();
  });
  $("#clicks").on("change", function () {
    const value = $(this).val();
    data.value = value;
    listChart();
  });
});
const listChart = () => {
  //大→小
  const _config = option(list(), "大→小");
  const myChart = echarts.init(document.getElementById("charts"));
  initEchart(myChart, _config);
  //小→大
  const _configBig = option(listBig(true), "小→大");
  const myChartBig = echarts.init(document.getElementById("chartsBig"));
  initEchart(myChartBig, _configBig);
  //组合
  const _confiGroup = option(listGroup(), "组合");
  const myChartGroup = echarts.init(document.getElementById("chartsGroup"));
  initEchart(myChartGroup, _confiGroup);
};
const list = () => {
  const months24 = minList(24);
  let month24Date = [];
  let n24 = Object.assign({}, data.time);
  let value24 = [];
  let recycle24 = data.principal.value24;
  months24.forEach((el) => {
    const day = getRecentMonth(n24, "yyyy-MM-dd");
    month24Date.push(day);
    value24.push(XEUtils.floor(recycle24, 2));
    n24.num += el;
    const value = recycle24 * annual_rate(el) * (el / 12);
    recycle24 += value;
  });

  const months12 = minList(12);
  let month12Date = [];
  let n12 = Object.assign({}, data.time);
  let value12 = [];
  let recycle12 = data.principal.value12;
  months12.forEach((el) => {
    const day = getRecentMonth(n12, "yyyy-MM-dd");
    month12Date.push(day);
    value12.push(XEUtils.floor(recycle12, 2));
    n12.num += el;
    const value = recycle12 * annual_rate(el) * (el / 12);
    recycle12 += value;
  });

  const months06 = minList(6);
  let month06Date = [];
  let n06 = Object.assign({}, data.time);
  let value06 = [];
  let recycle06 = data.principal.value06;
  months06.forEach((el) => {
    const day = getRecentMonth(n06, "yyyy-MM-dd");
    month06Date.push(day);
    value06.push(XEUtils.floor(recycle06, 2));
    n06.num += el;
    const value = recycle06 * annual_rate(el) * (el / 12);
    recycle06 += value;
  });

  const months03 = minList(3);
  let month03Date = [];
  let n03 = Object.assign({}, data.time);
  let value03 = [];
  let recycle03 = data.principal.value03;
  months03.forEach((el) => {
    const day = getRecentMonth(n03, "yyyy-MM-dd");
    month03Date.push(day);
    value03.push(XEUtils.floor(recycle03, 2));
    n03.num += el;
    const value = recycle03 * annual_rate(el) * (el / 12);
    recycle03 += value;
  });

  const chartList = [
    {
      name: "2年",
      type: "line",
      smooth: true,
      lineStyle: { color: "#FDAD26" },
      itemStyle: { color: "#FDAD26" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#FDAD26",
          },
          {
            offset: 0.8,
            color: "#322C5B",
          },
        ]),
      },
      data: months24,
      date: month24Date,
      interest: value24,
    },
    {
      name: "1年",
      type: "line",
      smooth: true,
      lineStyle: { color: "#46E7A5" },
      itemStyle: { color: "#46E7A5" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#1B527C",
          },
          {
            offset: 0.8,
            color: "#184E79",
          },
        ]),
      },
      data: months12,
      date: month12Date,
      interest: value12,
    },
    {
      name: "半年",
      type: "line",
      smooth: true,
      lineStyle: { color: "#3FD7F8" },
      itemStyle: { color: "#3FD7F8" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#153881",
          },
          {
            offset: 0.8,
            color: "#0B2678",
          },
        ]),
      },
      data: months06,
      date: month06Date,
      interest: value06,
    },
    {
      name: "3个月",
      type: "line",
      smooth: true,
      lineStyle: { color: "#FF7A45" },
      itemStyle: { color: "#FF7A45" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#B98989",
          },
          {
            offset: 0.8,
            color: "#B99B9B",
          },
        ]),
      },
      data: months03,
      date: month03Date,
      interest: value03,
    },
  ];
  return chartList;
};
const listBig = (bg) => {
  const monthsBig03 = maxList(3);
  let monthBig03Date = [];
  let nBig03 = Object.assign({}, data.time);
  let value03 = [];
  let recycle03 = data.principal.value03;
  monthsBig03.forEach((el) => {
    const day = getRecentMonth(nBig03, "yyyy-MM-dd");
    monthBig03Date.push(day);
    value03.push(XEUtils.floor(recycle03, 2));
    nBig03.num += el;
    const value = recycle03 * annual_rate(el) * (el / 12);
    recycle03 += value;
  });

  const monthsBig06 = maxList(6);
  let monthBig06Date = [];
  let nBig06 = Object.assign({}, data.time);
  let value06 = [];
  let recycle06 = data.principal.value06;
  monthsBig06.forEach((el) => {
    const day = getRecentMonth(nBig06, "yyyy-MM-dd");
    monthBig06Date.push(day);
    value06.push(XEUtils.floor(recycle06, 2));
    nBig06.num += el;
    const value = recycle06 * annual_rate(el) * (el / 12);
    recycle06 += value;
  });

  const monthsBig12 = maxList(12);
  let monthBig12Date = [];
  let nBig12 = Object.assign({}, data.time);
  let value12 = [];
  let recycle12 = data.principal.value12;
  monthsBig12.forEach((el) => {
    const day = getRecentMonth(nBig12, "yyyy-MM-dd");
    monthBig12Date.push(day);
    value12.push(XEUtils.floor(recycle12, 2));
    nBig12.num += el;
    const value = recycle12 * annual_rate(el) * (el / 12);
    recycle12 += value;
  });

  const monthsBig24 = maxList(24);
  let monthBig24Date = [];
  let nBig24 = Object.assign({}, data.time);
  let value24 = [];
  let recycle24 = data.principal.value24;
  monthsBig24.forEach((el) => {
    const day = getRecentMonth(nBig24, "yyyy-MM-dd");
    monthBig24Date.push(day);
    value24.push(XEUtils.floor(recycle24, 2));
    nBig24.num += el;
    const value = recycle24 * annual_rate(el) * (el / 12);
    recycle24 += value;
  });

  const chartList = [
    {
      name: "2年",
      type: "line",
      smooth: true,
      lineStyle: { color: bg ? "#EDED46" : "#FDAD26" },
      itemStyle: { color: bg ? "#EDED46" : "#FDAD26" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#FDAD26",
          },
          {
            offset: 0.8,
            color: "#322C5B",
          },
        ]),
      },
      data: monthsBig24,
      date: monthBig24Date,
      interest: value24,
    },
    {
      name: "1年",
      type: "line",
      smooth: true,
      lineStyle: { color: bg ? "#B2ED50" : "#46E7A5" },
      itemStyle: { color: bg ? "#B2ED50" : "#46E7A5" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#1B527C",
          },
          {
            offset: 0.8,
            color: "#184E79",
          },
        ]),
      },
      data: monthsBig12,
      date: monthBig12Date,
      interest: value12,
    },
    {
      name: "半年",
      type: "line",
      smooth: true,
      lineStyle: { color: bg ? "#D3EDED" : "#3FD7F8" },
      itemStyle: { color: bg ? "#D3EDED" : "#3FD7F8" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#153881",
          },
          {
            offset: 0.8,
            color: "#0B2678",
          },
        ]),
      },
      data: monthsBig06,
      date: monthBig06Date,
      interest: value06,
    },
    {
      name: "3个月",
      type: "line",
      smooth: true,
      lineStyle: { color: bg ? "#E01F6A" : "#FF7A45" },
      itemStyle: { color: bg ? "#E01F6A" : "#FF7A45" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#B98989",
          },
          {
            offset: 0.8,
            color: "#B99B9B",
          },
        ]),
      },
      data: monthsBig03,
      date: monthBig03Date,
      interest: value03,
    },
  ];
  return chartList;
};
const listGroup = () => {
  const group = list();
  const groupBig = listBig(true);
  const chartList = [...group, ...groupBig];
  return chartList;
};
//配置项
const circu = (start, end) => {
  const min = [...start, ...end];
  let arr = [];
  for (let index = 0; index < data.circulation; index++) {
    min.forEach((element) => {
      arr.push(element);
    });
  }
  return arr;
};
const minList = (val) => {
  const index = data.min.indexOf(val);
  const end = data.min.slice(0, index);
  const start = data.min.slice(index);
  return circu(start, end);
};
const maxList = (val) => {
  const index = data.max.indexOf(val);
  const end = data.max.slice(0, index);
  const start = data.max.slice(index);
  return circu(start, end);
};
//年利率
const annual_rate = (principal) => {
  let rate = 0;
  switch (principal) {
    case 24:
      rate = 0.0255;
      break;
    case 12:
      rate = 0.0215;
      break;
    case 6:
      rate = 0.0195;
      break;
    case 3:
      rate = 0.0175;
      break;
  }
  return rate;
};
const option = (chartList, title) => {
  let series = [],
    seriesList = [],
    seriesValue = [];
  chartList.forEach((el, index) => {
    seriesList.push({
      ...el,
      data: [],
    });
    seriesValue.push({
      ...el,
      yAxisIndex: 1,
      data: [],
    });
    el.data.forEach((m, i) => {
      seriesList[index].data.push([el.date[i], m]);
      seriesValue[index].data.push([el.date[i], el.interest[i]]);
    });
  });
  const { x, xy, xyValue, y, xy1, xyn } = optionxy(chartList);
  const { PI, PIs } = optionpi(seriesValue, title);
  series.push(...seriesList, ...seriesValue);
  if (title != "组合") {
    series.push({
      yAxisIndex: 1,
      name: "本息", //最长时间本息
      type: "line",
      smooth: true,
      lineStyle: { color: "#F5084B" },
      itemStyle: { color: "#F5084B" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#F27E9B",
          },
          {
            offset: 0.8,
            color: "#AF4664",
          },
        ]),
      },
      data: PI,
    });
  } else {
    series.push(
      {
        yAxisIndex: 1,
        name: "本息", //最长时间本息(大→小)
        type: "line",
        smooth: true,
        lineStyle: { color: "#F5084B" },
        itemStyle: { color: "#F5084B" },
        areaStyle: {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#F27E9B",
            },
            {
              offset: 0.8,
              color: "#AF4664",
            },
          ]),
        },
        data: PI,
      },
      {
        yAxisIndex: 1,
        name: "本息", //最长时间本息(小→大)
        type: "line",
        smooth: true,
        lineStyle: { color: "#FF7A45" },
        itemStyle: { color: "#FF7A45" },
        areaStyle: {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#F27E9B",
            },
            {
              offset: 0.8,
              color: "#AF4664",
            },
          ]),
        },
        data: PIs,
      }
    );
  }
  series.push(
    {
      yAxisIndex: 1,
      name: "收益值", //按照时间(层级合计值)
      type: "line",
      smooth: true,
      lineStyle: { color: "#F5084B" },
      itemStyle: { color: "#F5084B" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#F27E9B",
          },
          {
            offset: 0.8,
            color: "#AF4664",
          },
        ]),
      },
      data: xyValue,
    },
    {
      name: "净现率", //全量净现值：按照时间(重复率：斜率为0)
      type: "line",
      smooth: true,
      lineStyle: { color: "#F5084B" },
      itemStyle: { color: "#F5084B" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#F27E9B",
          },
          {
            offset: 0.8,
            color: "#AF4664",
          },
        ]),
      },
      data: xy,
    },
    {
      name: "净现值", //按照时间去重(重复率：净现率相差)
      type: "line",
      smooth: true,
      lineStyle: { color: "#009885" },
      itemStyle: { color: "#009885" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#93C6C1",
          },
          {
            offset: 0.8,
            color: "#2C5852",
          },
        ]),
      },
      data: y,
    },
    {
      name: "全量跨度",
      type: "line",
      smooth: true,
      symbol: "arrow",
      symbolSize: 8,
      symbolRotate: 270,
      lineStyle: {
        color: "#F508ED",
      },
      itemStyle: { color: "#F276F0" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#D867D8",
          },
          {
            offset: 0.8,
            color: "#9B409D",
          },
        ]),
      },
      data: xy1,
    },
    {
      name: "跨度" + data.value + "个月",
      type: "line",
      smooth: true,
      lineStyle: { color: "#F508ED" },
      itemStyle: { color: "#F508ED" },
      areaStyle: {
        opacity: 0.5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#D867D8",
          },
          {
            offset: 0.8,
            color: "#9B409D",
          },
        ]),
      },
      data: xyn,
    }
  );
  return {
    title: {
      text: title,
      textStyle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 600,
      },
      left: "center",
      itemGap: 20,
    },
    tooltip: {
      trigger: "axis",
      confine: true,
    },
    legend: {
      x: "center",
      textStyle: { color: "white" },
      padding: [28, 10, 0, 0],
    },
    grid: {
      top: "20%",
      left: "5%",
      right: "8%",
      bottom: "10%",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        color: "#fff",
        // formatter: function (value) {
        // 	return value.slice(5);
        // },
      },
      data: x,
    },
    yAxis: [
      {
        type: "value",
        name: "级层",
        minInterval: 1,
        nameTextStyle: {
          color: "#23FFFC",
          padding: [0, 30, 0, 0],
        },
        axisLabel: {
          color: "#fff",
        },
        splitLine: { lineStyle: { color: "#22467D" } },
      },
      {
        type: "value",
        name: "收益",
        minInterval: 1,
        nameTextStyle: {
          color: "#23FFFC",
          padding: [0, -50, 0, 0],
        },
        axisLabel: {
          color: "#fff",
        },
        splitLine: { lineStyle: { color: "#22467D" } },
      },
    ],
    series,
  };
};
const optionpi = (chartList, title) => {
  let PI = [],
    PIs = [];
  const arr = maxTime(chartList, title);
  arr.data.forEach((el, index) => {
    let interest = 0,
      interests = 0;
    chartList.forEach((m, i) => {
      if (i < 4) {
        interest += m.data[index][1];
      } else {
        interests += m.data[index][1];
      }
    });
    PI.push([el[0], XEUtils.floor(interest, 2)]);
    PIs.push([el[0], XEUtils.floor(interests, 2)]);
  });
  return { PI, PIs };
};
const maxTime = (chartList, title) => {
  let arr = [];
  switch (title) {
    case "小→大":
      arr = chartList[2];
      break;
    default:
      arr = chartList[0];
      break;
  }
  return arr;
};
const optionxy = (chartList) => {
  let xAxisList = [];
  chartList.forEach((el) => {
    el.data.forEach((m, i) => {
      xAxisList.push({
        y: m,
        x: el.date[i],
        value: el.interest[i],
      });
    });
  });
  const data = sortMin(xAxisList);
  let xy = [],
    xyValue = [],
    value = 0,
    obj = [];
  data.forEach((el) => {
    xy.push([el.x, el.y]);
    obj.push({
      x: el.x,
      y: el.y,
    });
    value += Number(el.value);
    xyValue.push([el.x, el.value]);
  });
  const { x, y, xy1, xyn } = getMonthMax(obj);
  return { xy, xyValue, x, y, xy1, xyn };
};
//排序(时间从小到大)
const sortMin = (xAxisList) => {
  let list = xAxisList.concat([]); //防止改变原数据
  list.sort(function (a, b) {
    return (
      Date.parse(a.x.replace(/-/g, "/")) - Date.parse(b.x.replace(/-/g, "/"))
    );
  });
  return list;
};
const getMonthMax = (obj) => {
  //去重
  let map = new Map();
  const newArr = obj.filter((v) => !map.has(v.x) && map.set(v.x, v));
  let x = [],
    y = [];
  newArr.forEach((el) => {
    x.push(el.x);
    y.push(el.y);
  });
  //月跨度率（31）
  const mm = obj.map((el, index) => {
    const spread = teve(el, index, obj);
    return spread;
  });
  // 跨度从小到大
  const list = mm.concat([]); //防止改变原数据
  list.sort(function (a, b) {
    return a.n - b.n;
  });
  let xy = [],
    xyn = [];
  list.forEach((el) => {
    xy.push([el.x, el.n]);
    if (el.n === Number(data.value)) {
      xyn.push([el.x, el.y]);
    }
  });
  return { x, y, xy1: xy, xyn };
};
// 月跨度差（31）
const teve = (el, index, obj) => {
  let txl = 0,
    tafxl = 0,
    l = 0;
  if (index < obj.length - 1) {
    const xl = el.x.substring(0, 7);
    txl = Date.parse(xl.replace(/-/g, "/"));
    const afxl = obj[index + 1].x.substring(0, 7);
    tafxl = Date.parse(afxl.replace(/-/g, "/"));
    const xln = xl.split("-")[1];
    const afxln = afxl.split("-")[1];
    if (xln > afxln) {
      l = 12 - xln + Number(afxln);
    } else {
      l = afxln - xln;
    }
  }
  const monthdiffer = Math.trunc((tafxl - txl) / (1000 * 60 * 60 * 24 * 31));
  return {
    x: el.x,
    y: el.y,
    t: monthdiffer,
    n: l,
  };
};
