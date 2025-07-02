/*
 * @Descripttion: Sustainable
 * @version: 1.0.0
 * @Author: Kenny
 * @Date: 2024-07-08 09:27:27
 * @LastEditors: ~
 * @LastEditTime: 2024-12-30 15:59:05
 */
import requestWebUI from "./request";

const API = process.env.VUE_APP_BASE_API;
const SEERREPORT = process.env.VUE_APP_BASE_API_SEER_REPORT;
const PORTA = process.env.VUE_APP_BASE_API_PORTAL;
const HEALTH = process.env.VUE_APP_BASE_API_HEALTH;
const COM = process.env.VUE_APP_BASE_API_COM;
const FOXMOCK = process.env.VUE_APP_WEBUI_API_FOXMOCK;
const REPORT = process.env.VUE_APP_BASE_API_REPORT;
const MICRO = process.env.VUE_APP_BASE_API_MICRO;
const MALL = process.env.VUE_APP_BASE_API_MALL;
const USER = process.env.VUE_APP_BASE_API_USER;
const PLATFORM = process.env.VUE_APP_BASE_API_PLATFORM;
const REPORT_TEM = process.env.VUE_APP_BASE_API_REPORT_TEM;
const HEALTH_REPORT = process.env.VUE_APP_BASE_API_HEALTH_REPORT;

export default {
  //请求源
  HEALTH_REPORT,
  REPORT_TEM,
  PLATFORM,
  USER,
  MALL,
  MICRO,
  REPORT,
  FOXMOCK,
  COM,
  API,
  HEALTH,
  PORTA,
  SEERREPORT,
  //请求axios逻辑
  requestWebUI,
};
