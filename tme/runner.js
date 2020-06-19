const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const render = require("./render");

const excludes = ["node_modules"];
class Runner {
  constructor() {
    this.testFiles = [];
  }

  async collectFiles(targetPath) {
    //Using Breadth-First search algorithm for tree traversal- but will optimized a bit
    const files = await fs.promises.readdir(targetPath);
    for (let file of files) {
      //console.log("files", files);
      const filePath = path.join(targetPath, file);
      const stat = await fs.promises.lstat(filePath);
      if (stat.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filePath, shortName: file });
      } else if (stat.isDirectory() && !excludes.includes(file)) {
        const childFiles = await fs.promises.readdir(filePath);
        //console.log("childfiles", childFiles);
        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }

  async runTest() {
    for (let test of this.testFiles) {
      console.log(chalk.gray(`-- ${test.shortName} --`));

      //define render in global
      global.render = render;
      //define beforeEach in global
      const beforeEaches = [];
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };

      //define afterEach in global
      const afterEaches = [];
      global.afterEach = (fn) => {
        afterEaches.push(fn);
      };

      //define it
      global.it = async (desc, testFunc) => {
        //run before each
        beforeEaches.forEach((func) => func());

        //run test
        try {
          await testFunc();
          console.log(chalk.green(`\t✅ ${desc}`));
        } catch (err) {
          const message = err.message.replace("/\n/g", "\n\t\t");
          console.log(chalk.red(`\t❌ ${desc}`));
          console.log(chalk.red("\t", err));
        }
        //run after each
        afterEaches.forEach((func) => func());
      };

      //load each testfile and execute
      try {
        require(test.name);
      } catch (err) {
        console.log(err);
      }
    }
  }
}

module.exports = Runner;
