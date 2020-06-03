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
import { WebDriver, By, WebElement, until } from "selenium-webdriver"

import {
    getDriver,
    setApimlAuthTokenCookie,
    loadPage,
    testElementAppearsXTimesById
} from 'explorer-fvt-utilities';
import {
    USERNAME,
    PASSWORD,
    BASE_URL,
    BASE_URL_WITH_PATH,
} from '../environment';
import { createTestPartitionedDataset, cleanupDatasets } from "../Utilities"

require('geckodriver');

// Need to use unnamed function so we can specify the retries
// eslint-disable-next-line
describe('Test initialisation of dataset tree', function () {
    let driver: WebDriver;
    this.retries(3);

    before('Initialise', async () => {
        driver = await getDriver();
        await setApimlAuthTokenCookie(driver, USERNAME, PASSWORD, `${BASE_URL}/api/v1/gateway/auth/login`, BASE_URL_WITH_PATH);
    });

    after('Close out', async () => {
        driver.quit();
    });

    describe('Initial Tree Load', () => {
        before('Prepare page for test', async () => {
            await createTestPartitionedDataset();
            await loadPage(driver, BASE_URL_WITH_PATH);
            await driver.wait(until.elementLocated(By.id('refresh-icon')));
        });

        beforeEach('', async () => {
            await driver.wait(until.elementLocated(By.id('refresh-icon')));
        });

        after('Cleanup', async () => {
            await cleanupDatasets();
        })

        it('Should render dataset qualifier field, refresh icon and full height tree', async () => {
            expect(await testElementAppearsXTimesById(driver, 'datasets-qualifier-field', 1)).to.be.true;
            expect(await testElementAppearsXTimesById(driver, 'refresh-icon', 1)).to.be.true;
            expect(await testElementAppearsXTimesById(driver, 'full-height-tree', 1)).to.be.true;
        });

        it('Should initialise search field with test users username', async () => {
            const qualifierField :WebElement = await driver.findElement(By.id('datasets-qualifier-field'));
            const qualifierFieldText :string = await qualifierField.getAttribute('value');
            expect(qualifierFieldText.toUpperCase()).to.equal(USERNAME.toUpperCase());
        });

        it('Should pre load datasets with HLQ as test username', async () => {
            const datasetNodes :WebElement[] = await driver.findElements(By.css('.node-label'));
            expect(datasetNodes.length >= 1).to.equal(true, 'No dataset nodes to test');
            for (const datasetNode of datasetNodes) {
                const nodeText :string = await datasetNode.getText();
                expect(nodeText.toUpperCase().startsWith(USERNAME.toUpperCase())).to.equal(true, `${nodeText} should start with ${USERNAME}`);
            }
        });
    });
});
