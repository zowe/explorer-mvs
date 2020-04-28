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
} from '../constants';
import { isExportDeclaration } from "typescript";

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
            const initialText: string = await qualifierField.getText();
            const newText: string = 'abc123!#';
            await qualifierField.sendKeys(newText);
            const qualifierFieldModified: WebElement = await driver.findElement(By.id("datasets-qualifier-field"));
            const modifiedText: string = await qualifierFieldModified.getText();
            expect(modifiedText).to.equal(initialText + newText);
        });

        it('Should return datasets matching new qualifier', async () => {
            const qualifierField: WebElement = await driver.findElement(By.id("datasets-qualifier-field"));
            await qualifierField.clear();
            await qualifierField.sendKeys('SYS1.**');

            const datasets: WebElement[] = await driver.findElements(By.className('node-label'));
            datasets.forEach(async (nodeLabel: WebElement) => {
                const nodeLabelText: string = await nodeLabel.getText();
                console.log(nodeLabelText);
                expect(nodeLabelText).to.include('SYS1');
            })

        });

        it('Should return datasets matching new multiple levels of qualifiers');
        it('Should return no datasets found message when using crazy qualifier');

        it('Should show loading icon after changing qualifier field then go back to refresh icon');
        it('Should change refresh icon to loading and then back to refresh when clicking refresh icon');
    });
});