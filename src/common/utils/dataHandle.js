/**
 * 合并组合算法
 * @param {[
        [{ attr0: "3G" }, { attr0: "4G" }],
        [{ attr1: "5寸" }, { attr1: "6寸" }],
        [{ attr2: "2G" }, { attr2: "4G" }]
      ]} attr
 * @returns
 */
function combinationCalculate(attr) {
  let result = [];
  let fn = (i, attr, item = {}) => {
    if (attr[i] && attr[i].length > 0) {
      for (let j = 0; j < attr[i].length; j++) {
        fn(i + 1, attr, { ...item, ...attr[i][j] });
      }
    } else {
      result.push(item);
    }
  };

  fn(0, attr, {});
  return result;
}
export { combinationCalculate };
