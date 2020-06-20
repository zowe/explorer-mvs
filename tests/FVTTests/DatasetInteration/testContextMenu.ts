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
import { loadPage, testElementAppearsXTimesById } from "explorer-fvt-utilities";
import { 
    editDatasetQualifierField, 
    createTestSequentialDataset, 
    createTestPartitionedDataset, 
    cleanupDatasets, 
    createTestDatasetMember } from "../utilities";
import {
    BASE_URL_WITH_PATH,
    TEST_PARTITIONED_DATASET,
    TEST_SEQUENTIAL_DATASET,
    TEST_DATASET_MEMBER,
} from '../environment';

import { getDriver } from '../testConfig';

describe('Test Context Menu for datasets', function () {
    let driver: WebDriver;
    this.retries(3);
    
    before('Initialise', async () => {
        driver = await getDriver();
        await createTestPartitionedDataset();
        await createTestDatasetMember();
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

        async function findDatasetAndOpenContextMenu(dataset :string) {
            await editDatasetQualifierField(driver, dataset);
            const datasetElement: WebElement = await getDatasetElement(dataset);
            await driver.actions().contextClick(datasetElement).perform();
        }

        async function getDatasetElement(dataset: string): Promise<WebElement> {
            const datasets: WebElement[] = await driver.findElements(By.className('node-label'));
            const nodeText = await datasets[0].getText();
            if (nodeText != dataset) {
                throw Error(`Did not find expected Dataset ${dataset} in dataset tree`);
            }
            return datasets[0]
        }

        async function getDatasetMemberElement(member :string): Promise<WebElement> {
            const members: WebElement[] = await driver.findElements(By.className('node-label content-link'));
            const nodeText = await members[0].getText();
            if (nodeText != member) {
                throw Error(`Did not find expected Dataset member ${member} in dataset tree`);
            }
            return members[0]
        }

        async function getContextMenuItemByIndex(index :number): Promise<WebElement>{
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

        async function getContextMenuItems() :Promise<string[]> {
                const contextMenuItems :WebElement[] = await driver.findElements(By.css('nav.react-contextmenu--visible > div.react-contextmenu-item'));
                await driver.sleep(200);
                return await Promise.all(contextMenuItems.map(async (menuItem :WebElement) => {
                    return await menuItem.getText();
                }));
        }

        describe('Paritioned Datasets', () => {
            it('Should display a context menu on right click' , async () => {
                await findDatasetAndOpenContextMenu(TEST_PARTITIONED_DATASET);

                const contextMenu :WebElement[] = await driver.findElements(By.css('.react-contextmenu--visible'));
                expect(contextMenu).to.be.an('array').with.length(1);
            });

            it('Should display context menu with context menu items', async () => {
                await findDatasetAndOpenContextMenu(TEST_PARTITIONED_DATASET);

                const contextMenuItems :WebElement[] = await driver.findElements(By.css('nav.react-contextmenu--visible > div.react-contextmenu-item'));
                expect(contextMenuItems).to.be.an('array').with.length.greaterThan(0);
            });

            it('Should display context menu with expected menu items', async () => {
                await findDatasetAndOpenContextMenu(TEST_PARTITIONED_DATASET);
                const expectedContextMenuItems = ['New Dataset...', 'New Dataset Member...', 'Delete', 'Rename'];
                const actualContextMenuItems = await getContextMenuItems();
                expect(expectedContextMenuItems).to.eql(actualContextMenuItems);
            });

            it('Should render create new dataset dialog when clicking New Dataset...', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await findDatasetAndOpenContextMenu(TEST_PARTITIONED_DATASET);
                await openDialogByContextMenuId(0);
                await testCorrectDialogLoads('New Dataset');
            });

            it('Should render new dataset member dialog when clicking New Dataset Member...', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await findDatasetAndOpenContextMenu(TEST_PARTITIONED_DATASET);
                await openDialogByContextMenuId(1);
                await testCorrectDialogLoads('New Dataset Member');
            });

            it('Should render delete dataset member dialog when clicking Delete', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await findDatasetAndOpenContextMenu(TEST_PARTITIONED_DATASET);
                await openDialogByContextMenuId(2);
                await testCorrectDialogLoads('Delete');
            });

            it('Should render rename dataset member dialog when clicking Rename', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await findDatasetAndOpenContextMenu(TEST_PARTITIONED_DATASET);
                await openDialogByContextMenuId(3);
                await testCorrectDialogLoads('Rename');
            });
        });

        describe('Partitioned Dataset Member', () => {
            async function openDatasetMemberContextMenu(dataset :string, member :string) {
                await editDatasetQualifierField(driver, dataset);
                const partitionedDatasetElement :WebElement = await getDatasetElement(dataset);
                await partitionedDatasetElement.click();
                await driver.sleep(500); //Wait for dataset members to start fetching
                await driver.wait(until.elementLocated(By.id('refresh-icon')));
                const datasetMemberElement :WebElement = await getDatasetMemberElement(member);
                await driver.actions().contextClick(datasetMemberElement).perform();
            }

            it('Should display a context menu on right click', async () => {
                await openDatasetMemberContextMenu(TEST_PARTITIONED_DATASET, TEST_DATASET_MEMBER);

                const contextMenu :WebElement[] = await driver.findElements(By.css('nav.react-contextmenu--visible'));
                expect(contextMenu).to.be.an('array').with.length.greaterThan(0);
            });

            it('Should display a context menu with context menu items', async () => {
                await openDatasetMemberContextMenu(TEST_PARTITIONED_DATASET, TEST_DATASET_MEMBER);
                
                const contextMenu :WebElement[] = await driver.findElements(By.css('nav.react-contextmenu--visible > div.react-contextmenu-item'));
                expect(contextMenu).to.be.an('array').with.length.greaterThan(0);
            });

            it('Should display contect menu with expected items', async () => {
                await openDatasetMemberContextMenu(TEST_PARTITIONED_DATASET, TEST_DATASET_MEMBER);
                const expectedContextMenuItems = ['New Dataset Member...', 'Open', 'Delete Member', 'Submit as Job', 'Rename'];
                const actualContextMenuItems = await getContextMenuItems();
                expect(expectedContextMenuItems).to.eql(actualContextMenuItems);                
            });

            it('Should render create new dataset member dialog when clicking New Dataset Member...', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await openDatasetMemberContextMenu(TEST_PARTITIONED_DATASET, TEST_DATASET_MEMBER);
                await openDialogByContextMenuId(0);
                await testCorrectDialogLoads('New Dataset Member');
            });

            it('Should render delete member dialog when clicking delete', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await openDatasetMemberContextMenu(TEST_PARTITIONED_DATASET, TEST_DATASET_MEMBER);
                await openDialogByContextMenuId(2);
                await testCorrectDialogLoads('Delete Dataset Member');
            });

            it('Should render rename member dialog when clicking rename', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await openDatasetMemberContextMenu(TEST_PARTITIONED_DATASET, TEST_DATASET_MEMBER);
                await openDialogByContextMenuId(4);
                await testCorrectDialogLoads('Rename Dataset Member');
            });
        });

        describe('Sequential Datasets', () => {
            it('Should display a context menu on right click' , async () => {
                await findDatasetAndOpenContextMenu(TEST_SEQUENTIAL_DATASET);

                const contextMenu :WebElement[] = await driver.findElements(By.css('.react-contextmenu--visible'));
                expect(contextMenu).to.be.an('array').with.length(1);
            });

            it('Should display context menu with context menu items', async () => {
                await findDatasetAndOpenContextMenu(TEST_SEQUENTIAL_DATASET);

                const contextMenuItems :WebElement[] = await driver.findElements(By.css('nav.react-contextmenu--visible > div.react-contextmenu-item'));
                expect(contextMenuItems).to.be.an('array').with.length.greaterThan(0);
            });

            it('Should display context menu with expected menu items', async () => {
                await findDatasetAndOpenContextMenu(TEST_SEQUENTIAL_DATASET);
                const expectedContextMenuItems = ['New Dataset...', 'Open', 'Delete', 'Submit as Job', 'Rename'];
                const actualContextMenuItems = await getContextMenuItems();
                expect(expectedContextMenuItems).to.eql(actualContextMenuItems);
            });

            it('Should render create new dataset dialog when clicking New Dataset...', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await findDatasetAndOpenContextMenu(TEST_SEQUENTIAL_DATASET);
                await openDialogByContextMenuId(0);
                await testCorrectDialogLoads('New Dataset');
            });

            it('Should render delete dataset member dialog when clicking Delete', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await findDatasetAndOpenContextMenu(TEST_SEQUENTIAL_DATASET);
                await openDialogByContextMenuId(2);
                await testCorrectDialogLoads('Delete');
            });

            it('Should render rename dataset member dialog when clicking Rename', async () => {
                expect(await testElementAppearsXTimesById(driver, 'dialog', 0)).to.be.true;
                await findDatasetAndOpenContextMenu(TEST_SEQUENTIAL_DATASET);
                await openDialogByContextMenuId(4);
                await testCorrectDialogLoads('Rename');
            });
        });

    });
});