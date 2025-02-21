export const config = {
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    //runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    //maxInstances: 10,
    capabilities: [],
    logLevel: 'info',
    bail: 0,
    //baseUrl: 'https://telnyx.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}

