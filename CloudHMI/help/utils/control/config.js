/*
 * @Descripttion: Sustainable
 * @version: 1.0.0
 * @Author: Kenny
 * @Date: 2025-06-24 08:56:42
 * @LastEditors: ~
 * @LastEditTime: 2025-06-26 09:45:58
 */
// import * as echart from "echarts";//全量加载
import { init, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import * as Components from "echarts/components";

// 功能分组注册
const registerComponents = () => {
  use([
    Components.GridComponent,
    Components.LegendComponent,
    Components.TitleComponent,
    Components.TooltipComponent,
    Components.GraphicComponent,
    LineChart,
    CanvasRenderer,
  ]);
};

// 延迟初始化：优化首屏加载
let componentsRegistered = false;
export const delayedInit = (dom) => {
  if (!componentsRegistered) {
    registerComponents();
    componentsRegistered = true;
  }
  return init(dom);
};

//highcharts
// import "echarts-gl";
// import Highcharts from "highcharts";
// import HighchartsMore from "highcharts/highcharts-more";
// import Highcharts3D from "highcharts/highcharts-3d";
// import HighchartsNoData from "highcharts/modules/no-data-to-display";
// import HighStock from "highcharts/highstock";
// import solidGauge from "highcharts/modules/solid-gauge";
// import variable from "highcharts/modules/variable-pie";
// import cylinder from "highcharts/modules/cylinder";
// HighchartsMore(Highcharts);
// Highcharts3D(Highcharts);
// HighchartsNoData(Highcharts);
// solidGauge(Highcharts);
// variable(Highcharts);
// cylinder(Highcharts);
