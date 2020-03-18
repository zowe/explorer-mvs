/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */
import { WebDriver } from "selenium-webdriver";
import { getDriver, checkDriver } from "explorer-fvt-utilities";


const {
    ZOWE_USERNAME: USERNAME, ZOWE_PASSWORD: PASSWORD, SERVER_HOST_NAME, SERVER_HTTPS_PORT,
} = process.env;

const BASE_URL :string = `https://${SERVER_HOST_NAME}:${SERVER_HTTPS_PORT}/ui/v1/explorer-mvs`;

describe('Test searching for datasets', function () {
    let driver: WebDriver;
    this.retries(3);
    
    before('Initialise', async () => {
        driver = await getDriver();
        await checkDriver(driver, BASE_URL, USERNAME, PASSWORD, SERVER_HOST_NAME, parseInt(SERVER_HTTPS_PORT), "/api/v1/datasets/username");
    });

    after('Close out', async () => {
        driver.quit();
    });

    describe('Tree searching for datasets', () => {
        it('Should have editable qualifier field', async () => {

        });

        it('Should return datasets matching new qualifier');
        it('Should return datasets matching new multiple levels of qualifiers');
        it('Should return no datasets found message when using crazy qualifier');

        it('Should show loading icon after changing qualifier field then go back to refresh icon');
        it('Should change refresh icon to loading and then back to refresh when clicking refresh icon');
    });
});