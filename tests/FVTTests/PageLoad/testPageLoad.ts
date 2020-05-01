/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */
import { expect } from 'chai';
import { WebDriver, until, By } from "selenium-webdriver"

import {
    getDriver,
    setApimlAuthTokenCookie,
    testElementAppearsXTimesById,
    loadPage,
} from 'explorer-fvt-utilities';
import {
    USERNAME,
    PASSWORD,
    BASE_URL,
    BASE_URL_WITH_PATH,
} from '../environment';

require('geckodriver');

// Need to use unnamed function so we can specify the retries
// eslint-disable-next-line
describe('MVS explorer page load', function () {
    let driver: WebDriver;
    this.retries(3);

    before('Initialise', async () => {
        driver = await getDriver();
        await setApimlAuthTokenCookie(driver, USERNAME, PASSWORD, `${BASE_URL}/api/v1/gateway/auth/login`, BASE_URL_WITH_PATH);
    });

    after('Close out', async () => {
        if (driver) {
            driver.quit();
        }
    });

    describe('MVS Explorer home page', () => {
        before('Initialise', async () => {
            await loadPage(driver, BASE_URL_WITH_PATH);
            await driver.wait(until.elementLocated(By.id('refresh-icon')));
        })
        
        it('Should render dataset-tree-card and editor-card', async () => {
            expect(await testElementAppearsXTimesById(driver, 'dataset-tree-card', 1)).to.be.true;
            expect(await testElementAppearsXTimesById(driver, 'editor-card', 1)).to.be.true;
        });
    });
});
