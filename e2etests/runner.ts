/*
 * e2e test runner
 *
 * Runs the tests on each platform in parallel, collects the outputs and then
 * prints the results as the tests finish
 */

import * as child_process from 'child_process';

import config from './tests/config';

const MAX_PROCESSES = 2;

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function run_tests() {
    const argv = ["node", "./node_modules/cucumber/bin/cucumber-js", "-p", "default"]
    const totalProcesses = config.capabilities.length;
    let runningProcesses = 0;
    let exitedProcesses = 0;
    let exitCode = 0;
    const processOutput: string[] = [];

    for (let i in config.capabilities) {
        // Limit the number of test processes running at once
        while (runningProcesses >= MAX_PROCESSES) {
            await sleep(1000);
        }

        // Start and monitor a new test process
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
            ++exitedProcesses;
            --runningProcesses;
            if (exitedProcesses >= totalProcesses) {
                process.exit(exitCode);
            }
        });
        ++runningProcesses;
        await sleep(2000);  // try to avoid locking issues on GitHub
    }
}

run_tests();
