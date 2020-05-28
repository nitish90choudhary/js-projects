#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const cp = require('child_process');
const chalk = require('chalk');

program.version('0.0.1')
    .argument('[filename]', 'Name of a file to execute')
    .action(async ({
        filename
    }) => {
        const name = filename || 'index.js';
        try {
            await fs.promises.access(name);
        } catch (err) {
            throw new Error(`Could not find the file ${err}`)
        }
        let proc;
        const start = debounce(() => {
            // console.log('Starting User Program')
            if (proc)
                proc.kill()

            console.log(chalk.blue('>>>>Starting program...'));
            proc = cp.spawn('node', [name], {
                stdio: 'inherit'
            });
        }, 100);

        chokidar.watch('.')
            .on('add', start)
            .on('change', start)
            .on('unlink', start);
    });

program.parse(process.argv);