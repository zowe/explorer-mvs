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
import { getDriver, setApimlAuthTokenCookie } from "explorer-fvt-utilities";
import {
    USERNAME,
    PASSWORD,
    BASE_URL,
    BASE_URL_WITH_PATH,
} from '../constants';

describe('Test searching for datasets', function () {
    let driver: WebDriver;
    this.retries(3);
    
    before('Initialise', async () => {
        driver = await getDriver();
        await setApimlAuthTokenCookie(driver, USERNAME, PASSWORD, `${BASE_URL}/api/v1/gateway/auth/login`, BASE_URL_WITH_PATH);
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