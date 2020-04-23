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
import { WebDriver } from "selenium-webdriver"

import {
    getDriver,
    setApimlAuthTokenCookie,
    testElementAppearsXTimesById,
} from 'explorer-fvt-utilities';

require('geckodriver');

const {
    ZOWE_USERNAME: USERNAME, ZOWE_PASSWORD: PASSWORD, SERVER_HOST_NAME, SERVER_HTTPS_PORT,
} = process.env;

const BASE_URL :string = `https://${SERVER_HOST_NAME}:${SERVER_HTTPS_PORT}`;
const BASE_URL_WITH_PATH :string =`${BASE_URL}/ui/v1/explorer-mvs`;

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
        it('Should render dataset-tree-card and editor-card', async () => {
            expect(await testElementAppearsXTimesById(driver, 'dataset-tree-card', 1)).to.be.true;
            expect(await testElementAppearsXTimesById(driver, 'editor-card', 1)).to.be.true;
        });
    });
});
