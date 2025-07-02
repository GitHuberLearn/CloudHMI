/*
 * @Descripttion: Sustainable
 * @version: 1.0.0
 * @Author: Kenny
 * @Date: 2025-07-02 15:37:17
 * @LastEditors: ~
 * @LastEditTime: 2025-07-02 17:30:32
 */
export const dataDefault = () => {
  return {
    // 一次填入实际利率：circulation=4
    netPresentTrend: {
      "code": 200,
      "message": "sit",
      "data": {
        "months24_rate": {
          "title": "24个月",
          "data": [
            [
              24,
              0.0255,
              "目标（年/月/日） ~ 回收期（月） ~ 利率 ~ 本息：2023/08/28 ~ 24 ~ 0.0255 ~ 10510"
            ],
            12,
            6,
            3,
            24,
            12,
            6,
            3,
            24,
            12,
            6,
            3,
            24,
            12,
            6,
            3
          ]
        },
        "months12_rate": {
          "title": "12个月",
          "data": [
            [
              12,
              0.0215,
              "2023/08/28 ~ 12 ~ 0.0215 ~ 5107.5"
            ],
            [
              6,
              0.0175,
              "2025/02/28 ~ 06 ~ 0.0175 ~ 5152.19"
            ],
            [
              3,
              0.013,
              "2025/05/28 ~ 03 ~ 0.0130 ~ 5168.94（实际2025-06-04取5168.99-使用续存）"
            ],
            [
              24,
              0.014,
              "2027/06/04 ~ 24 ~ 0.0140 ~ 5313.72（实际2025-06-04存储5168.99）"
            ],
            12,
            6,
            3,
            24,
            12,
            6,
            3,
            24,
            12,
            6,
            3,
            24
          ]
        },
        "months06_rate": {
          "title": "06个月",
          "data": [
            [
              6,
              0.0195,
              "2023/08/28 ~ 06 ~ 0.0195 ~ 10097.5"
            ],
            [
              3,
              0.0165,
              "2024/02/28 ~ 03 ~ 0.0165 ~ 10139.15"
            ],
            [
              24,
              0.0215,
              "2026/05/28 ~ 24 ~ 0.0215 ~ 10575.13"
            ],
            12,
            6,
            3,
            24,
            12,
            6,
            3,
            24,
            12,
            6,
            3,
            24,
            12
          ]
        },
        "months03_rate": {
          "title": "03个月",
          "data": [
            [
              3,
              0.0175,
              "2023/08/28 ~ 03 ~ 0.0175 ~ 20087.5"
            ],
            [
              24,
              0.0235,
              "2023/11/30 ~ 24 ~ 0.0235 ~ 21031.61"
            ],
            12,
            6,
            3,
            24,
            12,
            6,
            3,
            24,
            12,
            6,
            3,
            24,
            12,
            6
          ]
        }
      },
      "msg": "culpa aliqua ullamco nostrud",
      "pageInfo": "in",
      "errorCode": "53",
      "timestamp": null,
      "errorMsg": "sint dolore laborum"
    },
    // 记录每年实际利率
    atPresentactualRate: {
      "code": 200,
      "message": "sit",
      "data": {
        "months24_rate": {
          "title": "24个月实际利率",
          "value": 0.014,
          "historicalInterestRate": {
            "label": "历史利率",
            "content": "2023/08/28: 0.0255 - 0.019,2023/11/30: 0.0235,2026/05/28: 0.0215,2027/06/04: 0.0140"
          }
        },
        "months12_rate": {
          "title": "12个月实际利率",
          "value": 0.0215,
          "historicalInterestRate": {
            "label": "历史利率",
            "content": "2023/08/28: 0.0215 - 0.0175"
          }
        },
        "months06_rate": {
          "title": "06个月实际利率",
          "value": 0.0175,
          "historicalInterestRate": {
            "label": "历史利率",
            "content": "2023/08/28: 0.0195 - 0.0155,2025/02/28: 0.0175"
          }
        },
        "months03_rate": {
          "title": "03个月实际利率",
          "value": 0.013,
          "historicalInterestRate": {
            "label": "历史利率",
            "content": "2023/08/28: 0.0175 - 0.013,2024/02/28: 0.0165,2025/05/28: 0.013"
          }
        }
      },
      "msg": "culpa aliqua ullamco nostrud",
      "pageInfo": "in",
      "errorCode": "53",
      "timestamp": null,
      "errorMsg": "sint dolore laborum"
    },
    // 记录投资日，未来回收日
    milestone: {
      "code": 200,
      "message": "sit",
      "data": {
        "0-05-25": "生日",
        "0-12-31": "跨年",
        "0-0-25": "工资",
        "2023-08-28": "v12投资日",
        "2025-02-28": "v12投资日",
        "2025-05-28": "v12:m03预发m24",
        "2025-08-28": "v24:m24预发m12",
        "2025-11-30": "v03:m24预发m12",
        "2025-06-04": "v12投资日",
        "2026-05-28": "v06:m24预发m12",
        "2027-06-04": "v12:m24预发m12"
      },
      "msg": "culpa aliqua ullamco nostrud",
      "pageInfo": "in",
      "errorCode": "53",
      "timestamp": null,
      "errorMsg": "sint dolore laborum"
    },
  };
};
//无法使用default
// export default {
//   dataDefault,
// };
