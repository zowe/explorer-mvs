/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */

import https from 'https';
import fetch from 'node-fetch';

import { 
    SERVER_HOST, 
    SERVER_PORT,
    b64Credentials,
    TEST_PARTITIONED_DATASET,
    TEST_SEQUENTIAL_DATASET, 
    TEST_DATASET_MEMBER 
} from './environment';
import { WebDriver, WebElement, By, until, Key } from 'selenium-webdriver';

async function createTestPartitionedDataset() {
    await deleteDataset(TEST_PARTITIONED_DATASET, true);
    await createDataset({
        primary: 300,
        alcunit: "TRK",
        recfm: "FB",
        dsorg: "PO",
        name: `${TEST_PARTITIONED_DATASET}`,
        dirblk: 20,
        secondary: 100,
        lrecl: 80
    });
}

async function createTestSequentialDataset() {
    await deleteDataset(TEST_SEQUENTIAL_DATASET, true);
    await createDataset({
        primary: 300,
        alcunit: "TRK",
        recfm: "FB",
        dsorg: "PS",
        name: `${TEST_SEQUENTIAL_DATASET}`,
        secondary: 100,
        lrecl: 80
    });
}

interface DatasetCreationParams {
    primary: number;
    alcunit: string;
    recfm: string;
    dsorg: string;
    name?: string;
    dirblk?: number;
    secondary: number;
    lrecl: number;
}

async function createDataset(requestBody: DatasetCreationParams) {
    const response = await fetch(`https://${SERVER_HOST}:${SERVER_PORT}/ibmzosmf/api/v1/zosmf/restfiles/ds/${requestBody.name}`, {
        method: 'POST',
        headers: {
            authorization: b64Credentials,
            'Content-Type': 'application/json',
            'X-CSRF-ZOSMF-HEADER': '*',
        },
        body: JSON.stringify(requestBody),
    });

    if (response.ok) {
        console.log(`${requestBody.name}, created successfully`);
    } else {
        console.log(`${requestBody.name}, create failed`);
        const error = await response.json();
        console.log(error.message);
        throw new Error(error.message);
    }
}

export async function createTestDatasetMember() {
    const fullDatasetAndMemberName = `${TEST_PARTITIONED_DATASET}(${TEST_DATASET_MEMBER})`;
    const response = await fetch(`https://${SERVER_HOST}:${SERVER_PORT}/ibmzosmf/api/v1/zosmf/restfiles/ds/${fullDatasetAndMemberName}`, {
        method: 'PUT',
        headers: { 
            authorization: b64Credentials,
            'Content-Type': 'text/plain',
            'X-IBM-Data-Type': 'text',
            'X-CSRF-ZOSMF-HEADER': '*',
        },
        body: '',
    });

    if (response.ok) {
        console.log(`${fullDatasetAndMemberName}, created successfully`);
    } else {
        console.log(`${fullDatasetAndMemberName}, create failed`);
        const error = await response.json();
        console.log(error.message);
        throw new Error(error.message);
    }
}

export async function cleanupDatasets(failOk = false) {
    await deleteDataset(TEST_PARTITIONED_DATASET, true);
    await deleteDataset(TEST_SEQUENTIAL_DATASET, true);
}

export async function deleteDataset(dataset: string, failOk = false) {
    const response = await fetch(`https://${SERVER_HOST}:${SERVER_PORT}/ibmzosmf/api/v1/zosmf/restfiles/ds/${dataset}`, {
        method: 'DELETE',
        headers: { 
            authorization: b64Credentials, 
            'X-CSRF-ZOSMF-HEADER': '*' 
        },
    });

    if (response.ok) {
        console.log(`${dataset}, deleted successfully`);
    } else {
        console.log(`${dataset}, delete failed`);
        console.log(`${response.status} : ${response.statusText}`);
        if (!failOk) {
            throw new Error(`Delete dataset failed - ${response.status} : ${response.statusText}`);
        }
    }
}

export async function editDatasetQualifierField(driver: WebDriver, searchQualifier: string) {
    const qualifierField: WebElement = await driver.findElement(By.id("datasets-qualifier-field"));
    await qualifierField.clear();
    await qualifierField.sendKeys(searchQualifier);
    await qualifierField.sendKeys(Key.ENTER);

    await driver.sleep(500);
    await driver.wait(until.elementLocated(By.id('refresh-icon')), 20000);
}
