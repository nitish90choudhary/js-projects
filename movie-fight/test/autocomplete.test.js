const waitFor = (selector, timeout = 2000) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearTimeout(timeOut);
        resolve();
      }
    }, 30);

    const timeOut = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, timeout);
  });
};
beforeEach(() => {
  document.querySelector("#target").innerHTML = "";
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Not Avengers" },
        { Title: "Some other movie" },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});

afterEach(() => {});

it("Dropdown initial state is closed", () => {
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).not.to.include("is-active");
});

it("Opens dropdown after input", async () => {
  const search = document.querySelector("input");
  search.value = "avengers";
  search.dispatchEvent(new Event("input"));

  await waitFor(".dropdown-item");

  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).to.include("is-active");
});

it("After search display some result", async () => {
    const search = document.querySelector("input");
    search.value = "avengers";
    search.dispatchEvent(new Event("input"));
  
    await waitFor(".dropdown-item");
  
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    expect(dropdownItems.length).to.equal(3);
  });
