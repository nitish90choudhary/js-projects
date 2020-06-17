module.exports = {
  forEach(arr, fn) {
    for (let index in arr) fn(arr[index], index);
  },

  map(arr, fn) {
    const res = [];
    for (let index in arr) {
      res.push(fn(arr[index], index));
    }
    return res;
  },
};
