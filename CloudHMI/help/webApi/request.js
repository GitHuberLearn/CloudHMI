/*
 * @Descripttion: magic web ui api axios
 * @version: 1.0.0
 * @Author: Kenny
 * @Date: 2024-07-05 17:28:55
 * @LastEditors: ~
 * @LastEditTime: 2025-06-26 17:45:37
 */
import axios from "axios";
import { MessageBox, Message, Loading } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  //baseURL: process.env.VUE_APP_WEB_BUSINESS_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 3 * 60 * 1000, // request timeout
});
let loadingInstance = null;
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["Authorization"] = getToken();
      if (!config.headers["Auth"]) {
        config.headers["Auth"] = localStorage.getItem("tokenMall");
      }
      var userMsg = JSON.parse(localStorage.getItem("userMsg"));
      if (
        userMsg &&
        userMsg.businessInfoList &&
        userMsg.businessInfoList.length > 0
      ) {
        config.headers["orgId"] = userMsg.businessInfoList[0].businessId;
        config.headers["orgUserId"] = userMsg.id || "";
      } else if (userMsg && userMsg.id) {
        config.headers["userId"] = userMsg.id || "";
      }
    }
    if (config.showLoading) {
      loadingInstance = Loading.service({
        lock: true,
        background: "rgba(255, 255, 255, 0.01)",
        text: "Loading...",
      });
    }
    const formData = handleFormData(config);
    if (formData) {
      config.data = formData;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    closeLoading();
    if (res.code !== 0) {
      if (res.code === 1 && res.errorCode === 1000) {
        Message({
          message: res.msg || "系统繁忙，请稍后重试",
          type: "error",
          duration: 5 * 1000,
        });
        return;
      } else if (res.code === 1 && res.errorCode === 1100) {
        Message.closeAll();
        Message({
          message: "登陆超时，请重新登陆",
          type: "error",
          duration: 3 * 1000,
        });
        store.dispatch("user/resetToken").then(() => {
          location.hash = "#/login";
        });
        return;
      } else if (res.code === 1 && res.data === 50001) {
        Message.closeAll();
        Message({
          message: "手机号重复，请稍后重试",
          type: "error",
          duration: 5 * 1000,
        });
        return res;
      } else if (res.code === 1 && res.data === 50002) {
        Message.closeAll();
        Message({
          message: "名称重复，请稍后重试",
          type: "error",
          duration: 5 * 1000,
        });
        return res;
      } else if (res.code === 1 && res.data === 50003) {
        Message.closeAll();
        Message({
          message: "验证码失效，请重试",
          type: "error",
          duration: 5 * 1000,
        });
        return res;
      }
      if (res.code === 50001) {
        Message.closeAll();
        Message({
          message: "手机号重复，请稍后重试",
          type: "error",
          duration: 5 * 1000,
        });
        return res;
      }
      if (res.code === 50002) {
        Message.closeAll();
        Message({
          message: "名称重复，请稍后重试",
          type: "error",
          duration: 5 * 1000,
        });
        return;
      }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        res.code === 50008 ||
        res.code === 50012 ||
        res.code === 50014 ||
        res.status === 401
      ) {
        // to re-logincolor: white;
        MessageBox.confirm("请重新登陆", "请重新登陆", {
          confirmButtonText: "Re-Login",
          cancelButtonText: "Cancel",
          type: "warning",
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      //包含res.code == 200的成功请求
      if (response.status === 200) {
        return res;
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    closeLoading();
    if (error.message.indexOf("401") > -1) {
      Message({
        message: "登陆超时",
        type: "error",
        duration: 5 * 1000,
      });
      setTimeout(() => {
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });
      }, 1 * 1000);
      return;
    }
    console.error("err:" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
/**
 * 处理表单数据，根据配置生成FormData对象
 * @param {Object} config
 * @returns fd
 */
const handleFormData = (config) => {
  if (!config.file && !config.formData) return;
  const fd = new FormData();
  // 优先处理file专用配置
  if (config.file) {
    const { content, fieldName = "file", fileName, fileType } = config.file;
    let fileContent;
    let finalFileName;
    if (content instanceof File) {
      fileContent = content;
      finalFileName = fileName || content.name;
    } else if (content instanceof Blob) {
      fileContent = content;
      finalFileName = fileName || `blob-${Date.now()}`;
    } else if (typeof content === "string") {
      // 模拟文件创建（实际项目可能需要调整）
      fileContent = new Blob([content], { type: fileType || "text/plain" });
      finalFileName = fileName || `file-${Date.now()}.txt`;
    } else {
      throw new Error("Unsupported file content type");
    }

    fd.append(fieldName, fileContent, finalFileName);
  }

  // 处理普通formData字段
  if (config.formData) {
    Object.entries(config.formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          fd.append(key, value, value.name);
        } else {
          fd.append(key, String(value));
        }
      }
    });
  }

  return fd;
};
/**
 * 关闭
 */
const closeLoading = () => {
  Message.closeAll();
  if (loadingInstance) {
    loadingInstance.close();
    loadingInstance = null;
  }
};
export default service;
