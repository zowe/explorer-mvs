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

import {SERVER_HOST, SERVER_PORT, USERNAME, PASSWORD, TEST_DATASET} from './environment';

function getHttpsAgent() :https.Agent {
    return new https.Agent({
        rejectUnauthorized: false,
    });
}

function getBase64Credentials() :string {
    return `Basic ${new Buffer(`${USERNAME}:${PASSWORD}`).toString('base64')}`;
}

export async function createTestDataset() {
    await deleteTestDataset(true);    //try to delete dataset if it didn't get cleaned up last time
    const b64Credentials = getBase64Credentials();
    const agent :https.Agent = getHttpsAgent();
    await fetch(`https://${SERVER_HOST}:${SERVER_PORT}/api/v2/datasets`, {
        method: 'POST',
        headers: {
            authorization: b64Credentials,
            'Content-Type': 'application/json',
        },
        agent,
        body: JSON.stringify({
            "primary": 300,
            "allocationUnit": "TRACK",
            "recordFormat": "FB",
            "dataSetOrganization": "PO",
            "name":`${TEST_DATASET}`,
            "directoryBlocks": 20,
            "secondary": 100,
            "recordLength": 80
        }),
    }).then(
        async response => {
            if (response.ok) {
                console.log(`${TEST_DATASET}, created succesfully`);
            } else {
                console.log(`${TEST_DATASET}, create failed`);
                return response.json().then(e => { 
                    console.log(e.message);
                    throw Error(e.message); 
                });
            }
        },
    )
}

/**
 * 
 * @param failOk If you're unsure if the dataset exists set this to true to avoid failing a test 
 */
export async function deleteTestDataset(failOk = false) {
    const b64Credentials = getBase64Credentials();
    const agent :https.Agent = getHttpsAgent();
    await fetch(`https://${SERVER_HOST}:${SERVER_PORT}/api/v2/datasets/${TEST_DATASET}`, {
        method: 'DELETE',
        headers: { authorization: b64Credentials },
        agent
    }).then(
        async response => {
            if (response.ok) {
                console.log(`${TEST_DATASET}, deleted succesfully`);
            } else {
                console.log(`${TEST_DATASET}, delete failed`);
                console.log(`${response.status} : ${response.statusText}`);
                //failOk can be set when you're not sure if the dataset exists that you're trying to delete
                if(!failOk) {
                    throw Error(`Delete dataset failed - ${response.status} : ${response.statusText}`);
                }
            }
        },
    );
}