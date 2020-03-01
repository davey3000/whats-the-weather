/*
 * Capabilities for the BrowserStack tests
 */

// Capabilities that are common to all target platforms
let build = "debug";
if ("GITHUB_REF" in process.env && "GITHUB_SHA" in process.env) {
    build = process.env.GITHUB_REF + " " + process.env.GITHUB_SHA;
}

const common = {
    project: "What's the Weather?",
    build: build,
    //name: "1",
    "browserstack.local": true,
    "browserstack.user": process.env.BROWSERSTACK_USERNAME as string,
    "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY as string,
    //"browserstack.localIdentifier": "build 1"
};

// Per-platform capabilities
const capabilities: Array<any> = [
    {
        browserName: "chrome",
        os: "Windows",
        os_version : "10",
        resolution : "1920x1080",
    },
    {
        browserName: "firefox",
        os: "Windows",
        os_version : "10",
        resolution : "1920x1080",
    },
    {
        browserName: "edge",
        os: "Windows",
        os_version : "10",
        resolution : "1920x1080",
    },
    /*{
        os_version: "11",
        device: "iPhone 8 Plus",
        real_mobile: "true",
        browserName: "iPhone",
    },
    {
        os_version: "7.0",
        device: "Samsung Galaxy S8",
        real_mobile: "true",
        browserName: "Android"
    },*/
];

capabilities.forEach((caps, index) => {
    caps["browserstack.localIdentifier"] = "e2etest-" + index;
    let summaryName = [];
    if ("device" in caps) {
        summaryName.push(caps.device);
    }
    if ("os" in caps) {
        summaryName.push(caps.os);
    }
    if ("os_version" in caps) {
        summaryName.push(caps.os_version);
    }
    if ("browserName" in caps) {
        summaryName.push(caps.browserName);
    }
    if ("resolution" in caps) {
        summaryName.push(caps.resolution);
    }
    caps.summaryName = summaryName.join(", ");
    Object.assign(caps, common);
});

export default {
    capabilities
};
