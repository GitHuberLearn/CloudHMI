/*
 * @Descripttion: Sustainable
 * @version: 1.0.0
 * @Author: Kenny
 * @Date: 2024-05-13 20:33:24
 * @LastEditors: ~
 * @LastEditTime: 2026-03-17 12:07:07
 */
import atlas from './control/atlas';

/**
 * 返回上传api
 * type：VIDEO视频 VIDEO_IMG图片
 * @param {*boole} VIDEO true视频 false图片
 * @param {*boole} FOXMOCK 是否FOXMOCK api
 * @returns
 * 不管是什么类型都可以上传,但是类型仅仅两个VIDEO/VIDEO_IMG
 */
const uploadFileAPI = ({
  API = 'portal/nAdv/uploadFile',
  VIDEO = false,
  FOXMOCKAPI = false,
  resourcesType,
} = {}) => {
  const env = import.meta.env.VITE_APP_BASE_API;
  let type = VIDEO ? 'VIDEO' : 'VIDEO_IMG';
  if (resourcesType) {
    type = resourcesType;
  }
  let url = API;
  if (FOXMOCKAPI) {
    url = 'https://apifoxmock.com/m1/2830432-1213733-default/post';
  } else {
    url = `${env}${API}`;
  }
  return `${url}?type=${type}`;
};

const uploadFileAPI1 = ({
  API = 'portal/nAdv/uploadFile',
  VIDEO = false,
  FOXMOCKAPI = false,
  resourcesType,
} = {}) => {
  console.log(import.meta.env.VITE_APP_BASE_API);

  let type = VIDEO ? 'VIDEO' : 'VIDEO_IMG';
  if (resourcesType) {
    type = resourcesType;
  }
  let url = API;
  if (FOXMOCKAPI) {
    url = 'https://apifoxmock.com/m1/2830432-1213733-default/post';
  } else if (
    window.location.host.indexOf('localhost') > -1 ||
    window.location.host.indexOf('dev.seer-health') > -1 ||
    window.location.host.indexOf('192.168.10.') > -1
  ) {
    //dev
    url = `https://dev.seer-health.com/v1/${API}`;
  } else {
    //api
    url = `https://api.seer-health.com/v1/${API}`;
  }
  return `${url}?type=${type}`;
};

export default {
  uploadFileAPI,
  ...atlas,
};
