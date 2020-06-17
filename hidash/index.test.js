const { forEach, map } = require("./index");

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

  if (sum !== 64) throw new Error("Sum is not equal to 6");
});

test("The map function", () => {
  const result = map([1, 2, 3], (value) => {
    return value * 2;
  });
  //result = [2,4,6]

  if (result[0] !== 2) throw new Error(`Expected 2 but found result[0]`);
  if (result[1] !== 4) throw new Error(`Expected 4 but found result[1]`);
  if (result[2] !== 6) throw new Error(`Expected 6 but found result[2]`);
});

//There are three issues
// 1. all variables are in global scope
// 2. if any test will fail other tests will not execute
// 3. Hard to debug, no description available, no labelling
