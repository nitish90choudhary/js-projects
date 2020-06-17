const { forEach, map } = require("./index");
const assert = require("assert");

const test = (desc, fn) => {
  console.log("----", desc);
  try {
    fn();
  } catch (err) {
    console.log("Failed: ", err.message);
  }
};

test("The forEach function", () => {
  let sum = 0;
  forEach([1, 2, 3], (item) => {
    sum += item;
  });
  assert.strictEqual(sum,6,"Sum is not equal to 6");
});

test("The map function", () => {
  const result = map([1, 2, 3], (value) => {
    return value * 2;
  });
  //result = [2,4,6]
  assert.strictEqual(result[0],2,`Expected 2 but found result[0]`);
  assert.strictEqual(result[1],4,`Expected 2 but found result[0]`);
  assert.strictEqual(result[2],6,`Expected 2 but found result[0]`);
});

//There are three issues
// 1. all variables are in global scope
// 2. if any test will fail other tests will not execute
// 3. Hard to debug, no description available, no labelling
