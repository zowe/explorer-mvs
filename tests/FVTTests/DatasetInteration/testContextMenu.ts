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
import { getDriver, setApimlAuthTokenCookie, loadPage, testElementAppearsXTimesById } from "explorer-fvt-utilities";
import { editDatasetQualifierField, createTestSequentialDataset, createTestPartitionedDataset, cleanupDatasets } from "../utilities";
import {
    USERNAME,
    PASSWORD,
    BASE_URL,
    BASE_URL_WITH_PATH,
    TEST_PARTITIONED_DATASET,
    TEST_SEQUENTIAL_DATASET,
} from '../environment';

describe('Test Context Menu for datasets', function () {
    let driver: WebDriver;
    this.retries(3);
    
    before('Initialise', async () => {
        driver = await getDriver();
        await setApimlAuthTokenCookie(driver, USERNAME, PASSWORD, `${BASE_URL}/api/v1/gateway/auth/login`, BASE_URL_WITH_PATH);
        await createTestPartitionedDataset();
        await createTestSequentialDataset();
    });

    after('Close out', async () => {
        driver.quit();
        await cleanupDatasets();
    });

    describe('Context menu loads on right click', () => {
        beforeEach('', async () => {
            await loadPage(driver, BASE_URL_WITH_PATH);
            await driver.wait(until.elementLocated(By.id('refresh-icon')));
        });

        async function openContextMenu(dataset) {
            await editDatasetQualifierField(driver, `${dataset}`);
            const datasets: WebElement[] = await driver.findElements(By.className('node-label'));

            await driver.actions().contextClick(datasets[0]).perform();
        }

        async function getContextMenuItemByIndex(index :number) {
            const contextMenuItems :WebElement[] = await driver.findElements(By.css('nav.react-contextmenu--visible > div.react-contextmenu-item'));
            return contextMenuItems[index];
        }

        async function testCorrectDialogLoads(expectedDialogTitle :string) {
            expect(await testElementAppearsXTimesById(driver, 'dialog', 1)).to.be.true;
            const dialogTitleElement :WebElement = driver.findElement(By.id('dialog-title'));
            const dialogTitleText :string = await dialogTitleElement.getText();
            expect(dialogTitleText).to.contain(expectedDialogTitle);
        }

        async function openDialogByContextMenuId(contextMenuId :number) {
            const contextMenuItem :WebElement = await getContextMenuItemByIndex(contextMenuId);
            await driver.sleep(200);
            await contextMenuItem.click();
        }

        describe('Paritioned Datasets', () => {
            it('Should display a context menu on right click' , async () => {
                await openContextMenu(TEST_PARTITIONED_DATASET);

                const contextMenu :WebElement[] = await driver.findElements(By.css('.react-contextmenu--visible'));
                expect(contextMenu).to.be.an('array').with.length(1);
            });

            it('Should display context menu with context menu items', async () => {
                await openContextMenu(TEST_PARTITIONED_DATASET);

                const contextMenuItems :WebElement[] = await driver.findElements(By.css('nav.react-contextmenu--visible > div.react-contextmenu-item'));
                expect(contextMenuItems).to.be.an('array').with.length.greaterThan(0);
            });

            it('Should display context menu with expected menu items', async () => {
                const expectedContextMenuItems = ['New Dataset...', 'New Dataset Member...', 'Delete', 'Rename'];
                await openContextMenu(TEST_PARTITIONED_DATASET);
                for (let i = 0; i <= 3; i++) {
                    const contextMenuItem :WebElement = await getContextMenuItemByIndex(i);
                    await driver.sleep(200);
                    const menuItemText :string = await contextMenuItem.getText();
                    expect(menuItemText).to.equal(expectedContextMenuItems[i]);
                }
            });

            it('Should render create new dataset dialog when clicking New Dataset...', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await openContextMenu(TEST_PARTITIONED_DATASET);
                await openDialogByContextMenuId(0);
                await testCorrectDialogLoads('New Dataset');
            });

            it('Should render new dataset member dialog when clicking New Dataset Member...', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await openContextMenu(TEST_PARTITIONED_DATASET);
                await openDialogByContextMenuId(1);
                await testCorrectDialogLoads('New Dataset Member');
            });

            it('Should render delete dataset member dialog when clicking Delete', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await openContextMenu(TEST_PARTITIONED_DATASET);
                await openDialogByContextMenuId(2);
                await testCorrectDialogLoads('Delete');
            });

            it('Should render rename dataset member dialog when clicking Rename', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await openContextMenu(TEST_PARTITIONED_DATASET);
                await openDialogByContextMenuId(3);
                await testCorrectDialogLoads('Rename');
            });
        });

        describe('Sequential Datasets', () => {
            it('Should display a context menu on right click' , async () => {
                await openContextMenu(TEST_SEQUENTIAL_DATASET);

                const contextMenu :WebElement[] = await driver.findElements(By.css('.react-contextmenu--visible'));
                expect(contextMenu).to.be.an('array').with.length(1);
            });

            it('Should display context menu with context menu items', async () => {
                await openContextMenu(TEST_SEQUENTIAL_DATASET);

                const contextMenuItems :WebElement[] = await driver.findElements(By.css('nav.react-contextmenu--visible > div.react-contextmenu-item'));
                expect(contextMenuItems).to.be.an('array').with.length.greaterThan(0);
            });

            it('Should display context menu with expected menu items', async () => {
                const expectedContextMenuItems = ['New Dataset...', 'Open', 'Delete', 'Submit as Job', 'Rename'];
                await openContextMenu(TEST_SEQUENTIAL_DATASET);
                for (let i = 0; i <= 3; i++) {
                    const contextMenuItem :WebElement = await getContextMenuItemByIndex(i);
                    await driver.sleep(200);
                    const menuItemText :string = await contextMenuItem.getText();
                    expect(menuItemText).to.equal(expectedContextMenuItems[i]);
                }
            });

            it('Should render create new dataset dialog when clicking New Dataset...', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await openContextMenu(TEST_SEQUENTIAL_DATASET);
                await openDialogByContextMenuId(0);
                await testCorrectDialogLoads('New Dataset');
            });

            it('Should render delete dataset member dialog when clicking Delete', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await openContextMenu(TEST_SEQUENTIAL_DATASET);
                await openDialogByContextMenuId(2);
                await testCorrectDialogLoads('Delete');
            });

            it('Should render rename dataset member dialog when clicking Rename', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await openContextMenu(TEST_SEQUENTIAL_DATASET);
                await openDialogByContextMenuId(4);
                await testCorrectDialogLoads('Rename');
            });
        })
    });
});