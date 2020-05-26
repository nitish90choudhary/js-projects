#!/usr/bin/env/node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');

// #Method 2 to wrap lstat in promise
//const lstat = util.promisify(fs.lstat);

// #Method 3
const lstat = fs.promises.lstat;

const targetDir = process.argv[2] || process.cwd();
fs.readdir(targetDir, async (err, files) => {
    if (err)
        throw new Error(err);

    const statPromises = files.map(file => {
        return lstat(path.join(targetDir, file));
    });
    const allStat = await Promise.all(statPromises);

    allStat.forEach((stat, index) => {
        if (stat.isFile())
            console.log(chalk.blue(files[index]));
        else
            console.log(chalk.red.bold(files[index]));
    });

    //Solution 1 : store the lstat callbacks in array and wait for completion and then print
    // const allStats = Array(files.length).fill(null);

    // files.forEach((file, index) => {
    //     fs.lstat(file, (err, stats) => {
    //         if (err)
    //             console.log(err);

    //         allStats[index] = stats;
    //         const ready = allStats.every((stats) => {
    //             return stats;
    //         });

    //         if (ready) {
    //             allStats.forEach((stats, index) => {
    //                 console.log(files[index], stats.isFile())
    //             });
    //         }
    //     })
    // });

    //### Solution 2: WRAP lstat to promise

    // for (let file of files) {
    //     try {
    //         const stats = await lstat(file);
    //         console.log(file, stats.isFile());
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
});

// # Method 1 to wrap lstat to promise
// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if (err)
//                 reject(err);

//             resolve(stats);
//         });
//     });
// }