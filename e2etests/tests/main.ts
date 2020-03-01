/*
 * e2e tests
 *
 * MUST build the app for production before running this test
 * MUST set environment variables: BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY".
 */

import * as browserstack from 'browserstack-local';
import { WebDriver, Builder, By, Key, until } from 'selenium-webdriver';
import { binding, given, when, then, before, after } from 'cucumber-tsflow';
import express from 'express';
import * as net from 'net';
import * as path from 'path';
import { strict as assert } from 'assert';

import config from './config';

// Capabilities for the BrowserStack tests
const taskId = parseInt(process.env.TASK_ID as string) || 0;
const bsCaps = config.capabilities[taskId];
const bsLocalIdentifier = bsCaps["browserstack.localIdentifier"];

// Initialise BrowserStack local tunnel options
const bsLocalOptions = {
    key: process.env.BROWSERSTACK_ACCESS_KEY as string,
    localIdentifier: bsLocalIdentifier,
    force: true,
    forceLocal: true
};

// Local web server options
const port = 3000 + taskId;

//
@binding()
export class SearchAndReportForecastSteps {
    private bsLocal: browserstack.Local | null = null;
    private app: express.Application | null = null;
    private server: net.Server | null = null;
    private driver: WebDriver | null = null;

    @before()
    public async beforeAllScenarios(): Promise<void> {
        const promise = new Promise((resolve, reject) => {
            this.app = express();
            this.app.use('/whats-the-weather', express.static(path.join(__dirname, '../../build')));
            this.server = this.app.listen(port, async () => {
                this.bsLocal = new browserstack.Local();
                this.bsLocal.start(bsLocalOptions, async () => {
                    this.driver = await new Builder()
                        .usingServer('http://hub.browserstack.com/wd/hub')
                        .withCapabilities(bsCaps)
                        .build();

                    // Maximise the browser window for the current resolution
                    await this.driver.manage().window().maximize();

                    // BrowserStack setup complete, and web server running,
                    // so start the tests
                    resolve();
                });
            });
            
        });
        await promise;
    }

    @after()
    public async afterAllScenarios(): Promise<void> {
        if (this.driver) {
            await this.driver.quit();
        }
        const promise = new Promise((resolve, reject) => {
            if (this.server) {
                this.server.close();
                this.server = null;
            }
            if (this.bsLocal) {
                this.bsLocal.stop(() => {
                    this.bsLocal = null;
                    resolve();
                });
            }
        });
        await promise;
    }

    @given(/The app has been loaded/)
    public async givenAppLoaded(): Promise<void> {
        // Load the web app into the browser
        await this.driver?.get("http://localhost:"+port+"/whats-the-weather");
    }

    @when(/I type search location as "([^"]*)"/)
    public async whenTypeSearchLocation(searchValue: string): Promise<void> {
        const elWeatherLocation = await this.driver?.findElement(By.id("weather-location"));
        const elWeatherSearchButton = await this.driver?.findElement(By.tagName("button"));
        elWeatherLocation?.sendKeys("Cambridge");
        await this.driver?.sleep(1000);  // delay to allow text to be entered into the input element
    }

    @when(/I click the search button/)
    public async whenClickSearchButton(): Promise<void> {
        const elWeatherSearchButton = await this.driver?.findElement(By.tagName("button"));
        elWeatherSearchButton?.click();
        await this.driver?.sleep(3000);  // short delay so we don't necessarily spam the log waiting for an element
    }
    
    @then(/I should see the map, forecast and forecast selector/)
    public async thenShouldSeeMapForecastAndSelector(): Promise<void> {
        // Check the map is present
        await this.driver?.wait(until.elementLocated(By.className("leaflet-container")), 10000);
        // Check that all three major components are present by counting <div>
        // elements (search box; map + forecast; forecast selector)
        assert((await this.driver?.findElements(By.css("main > div > div > div")))?.length === 3);
    }

    @then(/I should take a screenshot after 5s/)
    public async thenTakeAScreenshot(): Promise<void> {
        await this.driver?.sleep(5000);  // allow time for map tiles and weather graphic to load
        await this.driver?.takeScreenshot();
    }

}