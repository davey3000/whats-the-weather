/*
 * e2e test runner
 *
 * Runs the tests on each platform in parallel, collects the outputs and then
 * prints the results as the tests finish
 */

import * as child_process from 'child_process';

import config from './tests/config';

const argv = ["node", "./node_modules/cucumber/bin/cucumber-js", "-p", "default"]
const totalProcesses = 1; //config.capabilities.length;
let processCount = 0;
let exitCode = 0;
const processOutput: string[] = [];

for (let i in config.capabilities) {
    const env = Object.create( process.env );
    env.TASK_ID = i;
    const p = child_process.spawn('/usr/bin/env', argv, { env: env } );
    processOutput.push("");
    p.stdout.setEncoding('utf8');
    p.stdout.on('data', (data) => {
        const convData = data.toString();
        processOutput[i] += data;
    });
    p.stderr.setEncoding('utf8');
    p.stderr.on('data', (data) => {
        const convData = data.toString();
        processOutput[i] += data;
    });
    p.on("close", (code) => {
        console.log(config.capabilities[i].summaryName);
        console.log(processOutput[i]);
        if (code > exitCode) {
            exitCode = code;
        }
        ++processCount;
        if (processCount >= totalProcesses) {
            process.exit(exitCode);
        }
    });
    break;
}
