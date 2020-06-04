/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */

import fetch from 'node-fetch';
import https = require('https');

import { 
    SERVER_HOST, 
    SERVER_PORT,
    b64Credentials,
    TEST_PARTITIONED_DATASET,
    TEST_SEQUENTIAL_DATASET } from './environment';
import { WebDriver, WebElement, By, until } from 'selenium-webdriver';

function getHttpsAgent() :https.Agent {
    return new https.Agent({
        rejectUnauthorized: false,
    });
}

export async function createTestPartitionedDataset() {
    await deleteDataset(TEST_PARTITIONED_DATASET, true);    //try to delete dataset if it didn't get cleaned up last time
    await createDataset({
        "primary": 300,
        "allocationUnit": "TRACK",
        "recordFormat": "FB",
        "dataSetOrganization": "PO",
        "name":`${TEST_PARTITIONED_DATASET}`,
        "directoryBlocks": 20,
        "secondary": 100,
        "recordLength": 80
    })
}

export async function createTestSequentialDataset() {
    await deleteDataset(TEST_SEQUENTIAL_DATASET, true) //try to delete dataset if it didn't get cleaned up last time
    await createDataset({
            "primary":300,
            "allocationUnit":"TRACK",
            "recordFormat":"FB",
            "dataSetOrganization":"PS",
            "name":`${TEST_SEQUENTIAL_DATASET}`,
            "secondary":100,
            "recordLength":80
        })
}

async function createDataset(requestBody) {
    const agent :https.Agent = getHttpsAgent();
    await fetch(`https://${SERVER_HOST}:${SERVER_PORT}/api/v2/datasets`, {
        method: 'POST',
        headers: {
            authorization: b64Credentials,
            'Content-Type': 'application/json',
        },
        agent,
        body: JSON.stringify(requestBody),
    }).then(
        async response => {
            if (response.ok) {
                console.log(`${requestBody.name}, created succesfully`);
            } else {
                console.log(`${requestBody.name}, create failed`);
                return response.json().then(e => { 
                    console.log(e.message);
                    throw Error(e.message); 
                });
            }
        },
    )
}

export async function cleanupDatasets(failOk = false){
    await deleteDataset(TEST_PARTITIONED_DATASET, true);
    await deleteDataset(TEST_SEQUENTIAL_DATASET, true);
}

/**
 * 
 * @param failOk If you're unsure if the dataset exists set this to true to avoid failing a test 
 */
export async function deleteDataset(dataset :string, failOk = false) {
    const agent :https.Agent = getHttpsAgent();
    await fetch(`https://${SERVER_HOST}:${SERVER_PORT}/api/v2/datasets/${dataset}`, {
        method: 'DELETE',
        headers: { authorization: b64Credentials },
        agent
    }).then(
        async response => {
            if (response.ok) {
                console.log(`${dataset}, deleted succesfully`);
            } else {
                console.log(`${dataset}, delete failed`);
                console.log(`${response.status} : ${response.statusText}`);
                //failOk can be set when you're not sure if the dataset exists that you're trying to delete
                if(!failOk) {
                    throw Error(`Delete dataset failed - ${response.status} : ${response.statusText}`);
                }
            }
        },
    );
}

export async function editDatasetQualifierField(driver :WebDriver, searchQualifier :string) {
    const qualifierField: WebElement = await driver.findElement(By.id("datasets-qualifier-field"));
    await qualifierField.clear();
    await qualifierField.sendKeys(searchQualifier);

    await driver.sleep(200);
    await driver.wait(until.elementLocated(By.id('refresh-icon')), 20000);
}