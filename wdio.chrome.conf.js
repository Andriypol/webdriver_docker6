import { config } from './wdio.conf.js';

export const chromeConfig = {
    ...config,
    capabilities: [{
        maxInstances: 3,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu', '--window-size=1920,1080', '--no-sandbox',
                '--disable-dev-shm-usage'], 
        },
    }],
};


export { chromeConfig as config };