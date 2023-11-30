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
  click_show: 0,
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

  $("#click_show").on("change", function () {
    const value = $(this).val();
    data.click_show = value;
    listChart();
  });
});
const listChart = () => {
  //大→小
  //实际利率
  const _configt_real = option(list_real(), "大→小 (实际利率)");
  const myChart_real = echarts.init(document.getElementById("charts_real"));
  initEchart(myChart_real, _configt_real);
  //固定利率
  const _config = option(list(), "大→小 (固定利率)");
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
const accrual = (months, principal) => {
  let monthDate = [];
  let value = [];
  let value_simple = [];
  let date_value = [];
  let n = Object.assign({}, data.time);
  let recycle = principal;
  let recycle_simple = principal;
  months.forEach((el) => {
    const day = getRecentMonth(n, "yyyy-MM-dd");
    monthDate.push(day);
    const num = el instanceof Array ? el[0] : el;
    n.num += num;
    value.push(XEUtils.floor(recycle, 2));
    value_simple.push(XEUtils.floor(recycle_simple, 2));
    const rate = el instanceof Array ? el[1] : annual_rate(el);
    const month = el instanceof Array ? el[0] : el;
    const accrual = rate * (month / 12);
    const valuen = recycle * accrual;
    recycle += valuen;
    const valuen_simple = principal * accrual;
    recycle_simple += valuen_simple;
    date_value.push({
      date: day,
      reta: [month, rate, XEUtils.floor(recycle, 2)], //月份，当年利率,未来回收值
    });
  });
  return { monthDate, value, value_simple, date_value };
};
const list_real = () => {
  const months24 = minList(24);
  const data24 = accrual(months24, data.principal.value24);

  const months12 = minList(12);
  const data12 = accrual(months12, data.principal.value12);

  const months06 = minList(6);
  const data06 = accrual(months06, data.principal.value06);

  const months03 = minList(3);
  const months03_rate = minList(3);
  months03_rate[1] = [24, 0.0235];
  const data03 = accrual(months03_rate, data.principal.value03);
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
      date: data24.monthDate,
      interest: data24.value,
      interest_simple: data24.value_simple,
      date_value: data24.date_value,
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
      date: data12.monthDate,
      interest: data12.value,
      interest_simple: data12.value_simple,
      date_value: data12.date_value,
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
      date: data06.monthDate,
      interest: data06.value,
      interest_simple: data06.value_simple,
      date_value: data06.date_value,
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
      date: data03.monthDate,
      interest: data03.value,
      interest_simple: data03.value_simple,
      date_value: data03.date_value,
    },
  ];
  if (data.click_show === "1") {
    console.log(chartList);
  }
  return chartList;
};
const list = () => {
  const months24 = minList(24);
  const data24 = accrual(months24, data.principal.value24);

  const months12 = minList(12);
  const data12 = accrual(months12, data.principal.value12);

  const months06 = minList(6);
  const data06 = accrual(months06, data.principal.value06);

  const months03 = minList(3);
  const data03 = accrual(months03, data.principal.value03);
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
      date: data24.monthDate,
      interest: data24.value,
      interest_simple: data24.value_simple,
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
      date: data12.monthDate,
      interest: data12.value,
      interest_simple: data12.value_simple,
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
      date: data06.monthDate,
      interest: data06.value,
      interest_simple: data06.value_simple,
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
      date: data03.monthDate,
      interest: data03.value,
      interest_simple: data03.value_simple,
    },
  ];
  return chartList;
};
const listBig = (bg) => {
  const monthsBig03 = maxList(3);
  const data03 = accrual(monthsBig03, data.principal.value03);

  const monthsBig06 = maxList(6);
  const data06 = accrual(monthsBig06, data.principal.value06);

  const monthsBig12 = maxList(12);
  const data12 = accrual(monthsBig12, data.principal.value12);

  const monthsBig24 = maxList(24);
  const data24 = accrual(monthsBig24, data.principal.value24);

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
      date: data24.monthDate,
      interest: data24.value,
      interest_simple: data24.value_simple,
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
      date: data12.monthDate,
      interest: data12.value,
      interest_simple: data12.value_simple,
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
      date: data06.monthDate,
      interest: data06.value,
      interest_simple: data06.value_simple,
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
      date: data03.monthDate,
      interest: data03.value,
      interest_simple: data03.value_simple,
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
//年利率:专享类型
const annual_rate = (principal) => {
  let rate = 0;
  switch (principal) {
    case 24:
      // -> 2023: 0.0235
      rate = 0.0255; //普通：0.019
      break;
    case 12:
      rate = 0.0215; //普通：0.0175
      break;
    case 6:
      rate = 0.0195; //普通：0.0155
      break;
    case 3:
      rate = 0.0175; //普通：0.013
      break;
  }
  return rate;
};
const option = (chartList, title) => {
  let series = [],
    seriesList = [],
    seriesValue = [],
    seriesValue_simple = [];
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
    seriesValue_simple.push({
      ...el,
      yAxisIndex: 1,
      data: [],
    });
    el.data.forEach((m, i) => {
      seriesList[index].data.push([el.date[i], m]);
      seriesValue[index].data.push([el.date[i], el.interest[i]]);
      seriesValue_simple[index].data.push([el.date[i], el.interest_simple[i]]);
    });
  });
  const { x, xy, xyValue, y, xy1, xyn } = optionxy(chartList);
  const accrual = optionpi(seriesValue, title);
  const accrual_simple = optionpi(seriesValue_simple, title);
  series.push(...seriesList, ...seriesValue, ...seriesValue_simple);
  if (title != "组合") {
    series.push(
      {
        yAxisIndex: 1,
        name: "复息", //最长时间复息
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
        data: accrual.PI,
      },
      {
        yAxisIndex: 1,
        name: "单息", //最长时间单息
        type: "line",
        smooth: true,
        lineStyle: { color: "#DB29F0" },
        itemStyle: { color: "#DB29F0" },
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
        data: accrual_simple.PI,
      }
    );
  } else {
    series.push(
      {
        yAxisIndex: 1,
        name: "复息", //最长时间复息(大→小)
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
        data: accrual.PI,
      },
      {
        yAxisIndex: 1,
        name: "复息", //最长时间复息(小→大)
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
        data: accrual.PIs,
      },
      {
        yAxisIndex: 1,
        name: "单息", //最长时间单息(大→小)
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
        data: accrual_simple.PI,
      },
      {
        yAxisIndex: 1,
        name: "单息", //最长时间单息(小→大)
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
        data: accrual_simple.PIs,
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
