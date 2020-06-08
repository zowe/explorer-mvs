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
import { WebDriver, By, WebElement, until } from "selenium-webdriver";
import { getDriver, setApimlAuthTokenCookie, loadPage } from "explorer-fvt-utilities";
import {
    USERNAME,
    PASSWORD,
    BASE_URL,
    BASE_URL_WITH_PATH,
} from '../environment';

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
        beforeEach('', async () => {
            await loadPage(driver, BASE_URL_WITH_PATH);
            await driver.wait(until.elementLocated(By.id('refresh-icon')));
        });

        it('Should have editable qualifier field', async () => {
            const qualifierField: WebElement = await driver.findElement(By.id("datasets-qualifier-field"));
            const initialText: string = await qualifierField.getAttribute('value');
            const newText: string = 'ABC123!#';
            await qualifierField.sendKeys(newText);
            const qualifierFieldModified: WebElement = await driver.findElement(By.id("datasets-qualifier-field"));
            const modifiedText: string = await qualifierFieldModified.getAttribute('value');
            expect(modifiedText).to.equal(initialText + newText);
        });

        it('Should return datasets matching new qualifier', async () => {
            expect(await testQualifierSearch(driver, 'USER.**', 'USER')).to.be.true;;
        });

        it('Should return datasets matching new multiple levels of qualifiers', async () => {
            expect(await testQualifierSearch(driver, 'USER.PARMLIB.**', 'USER.PARMLIB')).to.be.true;;
        });

        it('Should return no datasets found message when using crazy qualifier', async () => {
            expect(await testQualifierSearch(driver, 'ABCZYX12', 'No Datasets found')).to.be.true;;
        });

        async function testQualifierSearch(driver: WebDriver, searchQualifier: string, matchQualifier: string) {
            const qualifierField: WebElement = await driver.findElement(By.id("datasets-qualifier-field"));
            await qualifierField.clear();
            await qualifierField.sendKeys(searchQualifier);

            expect(await testRefreshIconTransition(driver)).to.be.true;

            const datasets: WebElement[] = await driver.findElements(By.className('node-label'));
            let allQualifiersMatch: boolean = true;
            datasets.forEach(async (nodeLabel: WebElement) => {
                const nodeLabelText: string = await nodeLabel.getText();
                if (!nodeLabelText.includes(matchQualifier)) {
                    console.log('Unexpected dataset label: ' + nodeLabelText + ' should have included: ' + matchQualifier);
                    allQualifiersMatch = false;
                }
            });
            return allQualifiersMatch;
        }

        it('Should show loading icon after changing qualifier field then go back to refresh icon', async () => {
            const qualifierField: WebElement = await driver.findElement(By.id('datasets-qualifier-field'));
            await qualifierField.sendKeys('abc');
            expect(await testRefreshIconTransition(driver)).to.be.true;
        });

        it('Should change refresh icon to loading and then back to refresh when clicking refresh icon', async () => {
            const refreshIcon: WebElement = await driver.findElement(By.id('refresh-icon'));
            await refreshIcon.click();
            expect(await testRefreshIconTransition(driver)).to.be.true;
        });

        async function testRefreshIconTransition(driver) {
            try {
                await driver.wait(until.elementLocated(By.id('loading-icon')), 10000);
            } catch(err) {
                console.log('[testRefreshIconTransition] fail on loading-icon not found');
            }
            await driver.wait(until.elementLocated(By.id('refresh-icon')), 30000);
            const newRefreshIcon: WebElement[] = await driver.findElements(By.id('refresh-icon'));
            if (newRefreshIcon.length !== 1) {
                console.log('refresh-icon never found');
                return false;
            }
            return true;
        }
    });
});