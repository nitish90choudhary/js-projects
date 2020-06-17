const { forEach, map } = require("./index");

let sum = 0;
forEach([1, 2, 3], (item) => {
  sum += item;
});

//test 1
if (sum !== 6) throw new Error("Sum is not equal to 6");

const result = map([1, 2, 3], (value) => {
    return value*2;
});
//result = [2,4,6]

if (result[0] !== 2) throw new Error(`Expected 2 but found result[0]`);
if (result[1] !== 4) throw new Error(`Expected 4 but found result[1]`);
if (result[2] !== 6) throw new Error(`Expected 6 but found result[2]`);