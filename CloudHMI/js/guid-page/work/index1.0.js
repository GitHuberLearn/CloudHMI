//跨度值: [24, 12, 6, 3]
const { getRecentMonth, dateNs, initEchart } = await import(
  `${cube.gatewayURL_module}js/product/index.js`
);

const { getDateN, getDateF } = await import(
  `${cube.gatewayURL_module}js/product/mockData.js`
);

//console.log(getDateN(15));

//全局变量
let laytpl = null,
  time = '2023-08-28',//显示当前时间new Date()
  table = null;
const init = {
  circulation: 4,
  spacing: 6, //跨度值
  message: 0,//显示信息
}

const init_calc = {
  principal: null,
  interestRate: null,
  duration: null,
}
const initData = {
  time: {
    time,
    num: 0,
  },
  ...init
}
let data = {
  principalInterest: 0,
  ...initData,
  principal: {
    value24: 10000,
    value12: 5000,
    value06: 10000,
    value03: 20000,
  },
  min: [24, 12, 6, 3],
  max: [3, 6, 12, 24],
  compare: [],
  compare_real: [],
};
//选择项目文件右击打开
$(function () {
  //layui声明模块
  layui.use(function () {
    var $ = layui.$;
    var form = layui.form;
    var laydate = layui.laydate;
    var layer = layui.layer;
    laydate.render({
      elem: "#selectDate",
      // format: 'yyyy/MM/dd',// HH:mm:ss
      value: time,
      mark: onClickMsg(),
      done: function (value) {
        const list = onClickMsg();
        const keys = Object.keys(list)
        const values = Object.values(list)
        keys.forEach((element, index) => {
          if (element === value) {
            layer.msg(values[index]);
          }
        });
        data.time.time = value;
        listChart();
      },
    });
    // 表单2计算
    $('#LAY-component-form-getval').on('click', function () {
      let getval = form.val('calc-filter');
      const { principal, interestRate, duration } = getval;
      if (!principal || !interestRate || !duration) {
        layer.msg('请输入必选项');
        return false;
      }
      data.principalInterest = Number(principal) + principal * interestRate / 100 / 12 * duration;
      principalInterestCalc();
      return false;// 阻止默认 form 跳转
    });
    // 表单2重置
    $('#LAY-component-form-reset').on('click', function () {
      form.val('calc-filter', {
        ...init_calc
      });
      data.principalInterest = 0;
      principalInterestCalc();
      return false;// 阻止默认 form 跳转
    });
    // 表单1重置
    $('#LAY-component-form-setval').on('click', function () {
      Object.assign(data, initData)
      form.val('val-filter', {
        date: time,
        ...init
      });
      listChart();
      return false;// 阻止默认 form 跳转
    });

    form.on("select(circulation)", function (env) {
      const value = env.value;
      data.circulation = value;
      listChart();
    });

    form.on("select(spacing)", function (env) {
      const value = env.value;
      data.spacing = value;
      listChart();
    });

    form.on("select(message)", function (env) {
      const value = env.value;
      data.message = value;
      listChart();
    });

    laytpl = layui.laytpl;
    table = layui.table;
    //初步启动
    listChart();
  });
});

/**
 * 点击渲染msg
 */
const onClickMsg = () => {
  return {
    /**
      * 如果为空字符，则默认显示数字+徽章
      */
    "0-05-25": "生日",//每年-xx
    "0-12-31": "跨年",
    "0-0-25": "工资",
    "2023-08-28": "v12投资日",
    "2025-02-28": "v12投资日",
    "2025-05-28": "v12:m03预发m24",
    "2025-06-04": "v12投资日",
    "2027-06-04": "v12:m24预发m12",
  }
}
/**
 * 图表渲染
 */
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
/**
 * @param {*月列表} months
 * @param {*本金} principal
 * @returns 返回Echart数据
 */
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
//大→小
/**
 * 根据xx_rate一次填入实际利率
 * @returns 返回实际数据
 */
const list_real = () => {
  //目标（年/月/日） ~ 回收期（月） ~ 利率 ~ 本息
  //value24:v24
  const months24 = minList(24);
  const months24_rate = minList(24);
  months24_rate[0] = [months24_rate[0], 0.0255];//2023/08/28 ~ 24 ~ 0.0255 ~ 10510
  const data24 = accrual(months24_rate, data.principal.value24);
  //value12:v12
  const months12 = minList(12);
  const months12_rate = minList(12);
  months12_rate[0] = [months12_rate[0], 0.0215];//2023/08/28 ~ 12 ~ 0.0215 ~ 5107.5
  months12_rate[1] = [months12_rate[1], 0.0175];//2025/02/28 ~ 06 ~ 0.0175 ~ 5152.19
  months12_rate[2] = [months12_rate[2], 0.0130];//2025/05/28 ~ 03 ~ 0.0130 ~ 5168.94（实际2025-06-04取5168.99-使用续存）
  months12_rate[3] = [months12_rate[3], 0.0140];//2027/06/04 ~ 24 ~ 0.0140 ~ 5313.72（实际2025-06-04存储5168.99）
  const data12 = accrual(months12_rate, data.principal.value12);
  //value06:v06
  const months06 = minList(6);
  const months06_rate = minList(6);
  months06_rate[0] = [months06_rate[0], 0.0195];//2023/08/28 ~ 06 ~ 0.0195 ~ 10097.5
  months06_rate[1] = [months06_rate[1], 0.0165];//2024/02/28 ~ 03 ~ 0.0165 ~ 10139.15
  months06_rate[2] = [months06_rate[2], 0.0215];//2026/05/28 ~ 24 ~ 0.0215 ~ 10575.13
  const data06 = accrual(months06_rate, data.principal.value06);
  //value03:v03
  const months03 = minList(3);
  const months03_rate = minList(3);
  months03_rate[0] = [months03_rate[0], 0.0175];//2023/08/28 ~ 03 ~ 0.0175 ~ 20087.5
  months03_rate[1] = [months03_rate[1], 0.0235];//2023/11/30 ~ 24 ~ 0.0235 ~ 21031.61
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
      date_value: data24.date_value,
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
      date_value: data12.date_value,
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
      date_value: data06.date_value,
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
      date_value: data03.date_value,
      date: data03.monthDate,
      interest: data03.value,
      interest_simple: data03.value_simple,
    },
  ];
  if (data.message === "1") {
    data.compare = chartList;
    console.log("实际发布值interest", chartList);
  }
  return chartList;
};
/**
 * @returns 返回本息
 */
const principalInterestCalc = () => {
  let getTpl = compare_pr.innerHTML,
    view = document.getElementById("view_pr"), value = Math.round(data.principalInterest * 100) / 100;
  //本息赋值
  if (value > 0) {
    laytpl(getTpl).render(value, function (html) {
      view.innerHTML = html;
    });
  } else {
    view.innerHTML = "-";
  }
};
/**
 * @returns 返回固定数据
 */
const list = (text) => {
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
  let getTpl = compare.innerHTML,
    view = document.getElementById("view");
  //列表赋值
  if (data.message === "1") {
    data.compare_real = chartList;
    const le = text ? `-${text}` : ''
    console.log(`固定发布值interest${le}`, chartList);
    laytpl(getTpl).render(data, function (html) {
      view.innerHTML = html;
    });
  } else {
    view.innerHTML = "";
  }
  return chartList;
};
//小→大
/**
 * @param {*是否默认颜色} bg
 * @returns 返回固定数据
 */
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
//组合
/**
 * @returns 组合数据
 */
const listGroup = () => {
  const group = list('组合');
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
/**
 * 大→小
 * @param {*跨度值} val
 * @returns 循环列表
 */
const minList = (val) => {
  const index = data.min.indexOf(val);
  const end = data.min.slice(0, index);
  const start = data.min.slice(index);
  return circu(start, end);
};
/**
 * 小→大
 * @param {*跨度值} val
 * @returns 循环列表
 */
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
    //专享 - 普通
    case 24:
      // -> 2023/08/28: 0.0255 - 0.019
      // -> 2023/11/30: 0.0235
      // -> 2026/05/28: 0.0215
      // -> 2027/06/04: 0.0140
      rate = 0.0140;
      break;
    case 12:
      // -> 2023/08/28: 0.0215 - 0.0175
      rate = 0.0215;
      break;
    case 6:
      // -> 2023/08/28: 0.0195 - 0.0155
      // -> 2025/02/28: 0.0175
      rate = 0.0175;
      break;
    case 3:
      // -> 2023/08/28: 0.0175 - 0.013
      // -> 2024/02/28: 0.0165
      // -> 2025/05/28: 0.013
      rate = 0.013;
      break;
  }
  return rate;
};

/**
 * @param {*数据列表} chartList
 * @param {*名称} title
 * @returns Echart数据
 */
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
      name: "跨度" + data.spacing + "个月",
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
/**
 *
 * @param {*所有数据列表} chartList
 * @param {*名称} title
 * @returns 获取对应两端（大→小、小→大）数据
 */
const optionpi = (chartList, title) => {
  let PI = [],
    PIs = [];
  const arr = maxTime(chartList, title);
  arr.data.forEach((el, index) => {
    let interest = 0,
      interests = 0;
    chartList.forEach((m, i) => {
      if (i < 4) {
        //大→小
        interest += m.data[index][1];
      } else {
        //小→大
        interests += m.data[index][1];
      }
    });
    PI.push([el[0], XEUtils.floor(interest, 2)]);
    PIs.push([el[0], XEUtils.floor(interests, 2)]);
  });
  return { PI, PIs };
};
/**
 *
 * @param {*数据列表} chartList
 * @param {*名称} title
 * @returns 获取对应数据
 */
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
/**
 *
 * @param {*所有数据} chartList
 * @returns 配置数据格式
 */
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
/**
 *
 * @param {*数组对象} obj
 * @returns 处理对应数据
 */
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
    if (el.n === Number(data.spacing)) {
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
