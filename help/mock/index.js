/*
 * @Descripttion: Sustainable
 * @version: 1.0.0
 * @Author: Kenny
 * @Date: 2023-01-05 14:18:41
 * @LastEditors: ~
 * @LastEditTime: 2025-07-02 17:10:07
 */
const index = await import("./control/index.js");
const { dataDefault } = index;
/**
 * mock数据
 * @param {*object} obj :isMock(Boolean)
 * @returns
 */
export function getMockData(key) {
  const { isMock } = key || { isMock: false };
  let data = [];
  if (isMock) {
    data = dataDefault();
  } else {
    data = false;
  }
  return data;
}
