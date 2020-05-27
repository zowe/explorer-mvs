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
            "allocationUnit": "TRACK",
            "averageBlock": 500,
            "blockSize": 400,
            "dataSetOrganization": "PO",
            "deviceType": 3390,
            "directoryBlocks": 5,
            "name": `${TEST_DATASET}`,
            "primary": 10,
            "recordFormat": "FB",
            "recordLength": 80,
            "secondary": 5,
            "volumeSerial": "zmf046"
          }),
    }).then(
        async response => {
            if (response.ok) {
                console.log(`${TEST_DATASET}, created succesfully`);
                return response.json();
            }
            return response.json().then(e => { throw Error(e.message); });
        },
    ).then(
        responseJson => { console.log(responseJson); },
    );
}

export async function deleteTestDataset() {
    const b64Credentials = getBase64Credentials();
    const agent :https.Agent = getHttpsAgent();
    await fetch(`https://${SERVER_HOST}:${SERVER_PORT}/api/v2/dataset/${TEST_DATASET}`, {
        method: 'DELETE',
        headers: { authorization: b64Credentials },
        agent
    }).then(
        async response => {
            if (response.ok) {
                console.log(`${TEST_DATASET}, deleted succesfully`);
            }
            return response.json().then(e => { 
                console.log(e.message);
                throw Error(e.message); 
            });
        },
    );
}