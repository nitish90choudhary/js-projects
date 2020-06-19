const assert = require("assert");

it("it has a text input", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");
  assert(input);
});

it("Shows success message with valid email", async () => {
  const dom = await render("index.html");

  const input = dom.window.document.querySelector("input");
  input.value = "nitish@nitish";
  dom.window.document
    .querySelector("form")
    .dispatchEvent(new dom.window.Event("submit"));
  const h1 = dom.window.document.querySelector("h1");
  assert.equal(h1.innerHTML, "Valid email");
});
