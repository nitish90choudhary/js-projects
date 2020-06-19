const { forEach } = require("./index");
const assert = require("assert");

let numbers;
beforeEach(() => {
  numbers = [1, 2, 3];
});

it("it should sum the array", () => {
  let total = 0;
  forEach(numbers, (val) => {
    total += val;
  });

  assert.strictEqual(total, 61);
});
it("beforeEach runs before every test", () => {
  assert.deepEqual(numbers, [1, 2, 3]);
});
