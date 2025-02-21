import { config } from './wdio.conf.js';

export const firefoxConfig = {
    ...config,
    capabilities: [{
        maxInstances: 2,
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: ['--headless', '--disable-gpu', '--window-size=1920,1080', '--no-sandbox'],
        },
    }],
    services: ['geckodriver'], 
};

exports.config = firefoxConfig;