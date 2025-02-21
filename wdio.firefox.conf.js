import { config } from './wdio.conf.js';

export const firefoxConfig = {
    ...config,
    capabilities: [{
        maxInstances: 5,
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: ['-headless'],
        },
    }],
    services: ['geckodriver'], 
};

exports.config = firefoxConfig;