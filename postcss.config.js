/*
 * @Author: your name
 * @Date: 2019-11-26 16:09:30
 * @LastEditTime: 2019-11-29 16:00:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /source_code/postcss.config.js
 */
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿宽度的1/10,
      propList: ['*']// 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    }
  }
}
// module.exports = { plugins: { 'postcss-pxtorem': { rootValue: 32, propList: ['*'], minPixelValue: 2 } }};
