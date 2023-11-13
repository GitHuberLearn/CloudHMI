let { getRecentMonth, dateNs, initEchart } = await import(
  `${cube.gatewayURL_module}js/product/index.js`
);

let { getDateN } = await import(
  `${cube.gatewayURL_module}js/product/mockData.js`
);

//选择项目文件右击打开
$(function () {
  const time = {
    time: "2023-08-28",
    num: 0,
  };
  //大→小
  const list = (time) => {
    const months24 = [24, 12, 6, 3, 24, 12, 6, 3, 24, 12, 6, 3, 24, 12, 6, 3];
    let month24Date = [];
    //8.28
    let n24 = Object.assign({}, time);
    months24.forEach((el) => {
      const day = getRecentMonth(n24, "yyyy-MM-dd");
      n24.num += el;
      month24Date.push(day);
    });

    const months12 = [12, 6, 3, 24, 12, 6, 3, 24, 12, 6, 3, 24, 12, 6, 3, 24];
    let month12Date = [];
    let n12 = Object.assign({}, time);
    months12.forEach((el) => {
      const day = getRecentMonth(n12, "yyyy-MM-dd");
      n12.num += el;
      month12Date.push(day);
    });

    const months06 = [6, 3, 24, 12, 6, 3, 24, 12, 6, 3, 24, 12, 6, 3, 24, 12];
    let month06Date = [];
    let n06 = Object.assign({}, time);
    months06.forEach((el) => {
      const day = getRecentMonth(n06, "yyyy-MM-dd");
      n06.num += el;
      month06Date.push(day);
    });

    const months03 = [3, 24, 12, 6, 3, 24, 12, 6, 3, 24, 12, 6, 3, 24, 12, 6];
    let month03Date = [];
    let n03 = Object.assign({}, time);
    months03.forEach((el) => {
      const day = getRecentMonth(n03, "yyyy-MM-dd");
      n03.num += el;
      month03Date.push(day);
    });

    const chartList = [
      {
        xAxisIndex: 0,
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
      },
      {
        xAxisIndex: 1,
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
      },
      {
        xAxisIndex: 2,
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
      },
      {
        xAxisIndex: 3,
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
      },
    ];
    const chartList1 = [
      {
        xAxisIndex: 0,
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
      },
    ];

    return chartList;
  };
  const _config = option(list(time), "大→小");
  const myChart = echarts.init(document.getElementById("charts"));
  initEchart(myChart, _config);

  //小→大
  const listBig = (time, bg, index) => {
    const monthsBig03 = [
      3, 6, 12, 24, 3, 6, 12, 24, 3, 6, 12, 24, 3, 6, 12, 24,
    ];
    let monthBig03Date = [];
    let nBig03 = Object.assign({}, time);
    monthsBig03.forEach((el) => {
      const day = getRecentMonth(nBig03, "yyyy-MM-dd");
      nBig03.num += el;
      monthBig03Date.push(day);
    });

    const monthsBig06 = [
      6, 12, 24, 3, 6, 12, 24, 3, 6, 12, 24, 3, 6, 12, 24, 3,
    ];
    let monthBig06Date = [];
    let nBig06 = Object.assign({}, time);
    monthsBig06.forEach((el) => {
      const day = getRecentMonth(nBig06, "yyyy-MM-dd");
      nBig06.num += el;
      monthBig06Date.push(day);
    });

    const monthsBig12 = [
      12, 24, 3, 6, 12, 24, 3, 6, 12, 24, 3, 6, 12, 24, 3, 6,
    ];
    let monthBig12Date = [];
    let nBig12 = Object.assign({}, time);
    monthsBig12.forEach((el) => {
      const day = getRecentMonth(nBig12, "yyyy-MM-dd");
      nBig12.num += el;
      monthBig12Date.push(day);
    });

    const monthsBig24 = [
      24, 3, 6, 12, 24, 3, 6, 12, 24, 3, 6, 12, 24, 3, 6, 12,
    ];
    let monthBig24Date = [];
    let nBig24 = Object.assign({}, time);
    monthsBig24.forEach((el) => {
      const day = getRecentMonth(nBig24, "yyyy-MM-dd");
      nBig24.num += el;
      monthBig24Date.push(day);
    });

    const xindex = index ? index : 0;
    const chartList = [
      {
        xAxisIndex: xindex,
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
      },
      {
        xAxisIndex: 1 + xindex,
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
      },
      {
        xAxisIndex: 2 + xindex,
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
      },
      {
        xAxisIndex: 3 + xindex,
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
      },
    ];
    const chartList1 = [
      {
        xAxisIndex: xindex,
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
        data: monthsBig24,
        date: monthBig24Date,
      },
    ];
    return chartList;
  };
  const _configBig = option(listBig(time, true), "小→大");
  const myChartBig = echarts.init(document.getElementById("chartsBig"));
  initEchart(myChartBig, _configBig);

  //组合
  const listGroup = (time) => {
    const group = list(time);
    const groupBig = listBig(time, true, 4);
    const chartList = [...group, ...groupBig];
    return chartList;
  };
  const _confiGroup = option(listGroup(time), "组合");
  const myChartGroup = echarts.init(document.getElementById("chartsGroup"));
  initEchart(myChartGroup, _confiGroup);
});

function option(chartList, title) {
  let xAxis = [];
  let series = [];
  chartList.forEach((el, index) => {
    const show = index === 0 ? true : false;
    xAxis.push({
      show,
      type: "category",
      boundaryGap: false,
      axisLabel: {
        color: "#fff",
        // formatter: function (value) {
        // 	return value.slice(5);
        // },
      },
      data: el.date,
    });
  });

  const { x, xy, y, xy1 } = optionxy(chartList);

  xAxis.push({
    show: false,
    type: "category",
    boundaryGap: false,
    axisLabel: {
      color: "#fff",
    },
    data: x,
  });
  series.push(
    ...chartList,
    {
      xAxisIndex: title === "组合" ? 8 : 4,
      name: "净现率", //按照时间(重复率：斜率为0)
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
      xAxisIndex: title === "组合" ? 8 : 4,
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
      xAxisIndex: title === "组合" ? 8 : 4,
      name: "跨度", //按照时间去重(重复率：净现率相差)
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
      data: xy1,
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
      x: "right",
      textStyle: { color: "white" },
      padding: [28, 10, 0, 0],
    },
    grid: {
      top: "20%",
      left: "5%",
      right: "3%",
      bottom: "10%",
    },
    xAxis,
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
    ],
    series,
  };
}

function optionxy(chartList) {
  let xAxisList = [];
  chartList.forEach((el) => {
    el.data.forEach((m, i) => {
      xAxisList.push({
        y: m,
        x: el.date[i],
      });
    });
  });

  //从小到大时间
  const data = sortMin(xAxisList);
  let xy = [],
    obj = [];
  data.forEach((el) => {
    xy.push([el.x, el.y]);
    obj.push({
      x: el.x,
      y: el.y,
    });
  });
  const { x, y, xy1 } = getMonthMax(obj);
  return { xy, x, y, xy1 };
}

//排序(从小到大)
function sortMin(xAxisList) {
  let list = xAxisList.concat([]); //防止改变原数据
  list.sort(function (a, b) {
    return (
      Date.parse(a.x.replace(/-/g, "/")) - Date.parse(b.x.replace(/-/g, "/"))
    );
  });
  return list;
}
//去重
function getMonthMax(obj) {
  let map = new Map();
  const newArr = obj.filter((v) => !map.has(v.x) && map.set(v.x, v));
  let x = [],
    y = [];

  let mm = [];

  newArr.forEach((el, index) => {
    let txl = 0,
      tafxl = 0;
    if (index < newArr.length - 1) {
      const xl = el.x.substring(0, 7);
      txl = Date.parse(xl.replace(/-/g, "/"));
      const afxl = newArr[index + 1].x.substring(0, 7);
      tafxl = Date.parse(afxl.replace(/-/g, "/"));
    }
    x.push(el.x);
    y.push(el.y);
    mm.push({
      x: el.x,
      y: el.y,
      t: tafxl - txl,
    });
  });
  console.log(mm);
  //从小到大
  mm.sort(function (a, b) {
    return a.t - b.t;
  });
  //获取最大
  const maxs = mm.filter((item) => item.t === 7948800000);

  let xy = [];
  mm.forEach((el) => {
    xy.push([el.x, el.y]);
  });

  return { x, y, xy1: xy };
}
