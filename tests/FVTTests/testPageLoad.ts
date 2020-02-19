/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */

import 'regenerator-runtime/runtime';
import 'mocha';
const { expect } = require('chai');

import {
    getDriver,
    checkDriver,
    testElementAppearsXTimesById,
} from 'explorer-fvt-utilities';

require('geckodriver');

const {
    ZOWE_USERNAME: USERNAME, ZOWE_PASSWORD: PASSWORD, SERVER_HOST_NAME, SERVER_HTTPS_PORT,
} = process.env;

const BASE_URL = `https://${SERVER_HOST_NAME}:${SERVER_HTTPS_PORT}/ui/v1/explorer-mvs`;

// Need to use unnamed function so we can specify the retries
// eslint-disable-next-line
describe('MVS explorer page load', function () {
    let driver;
    this.retries(3);

    before('Initialise', async () => {
        driver = await getDriver();
        await checkDriver(driver, BASE_URL, USERNAME, PASSWORD, SERVER_HOST_NAME, SERVER_HTTPS_PORT);
    });

    describe('MVS Explorer home page', () => {
        it('Should render datasetTreeCard and editorCard', () => {
            expect(testElementAppearsXTimesById(driver, 'datasetTreeCard', 1)).to.be.true;
            expect(testElementAppearsXTimesById(driver, 'editorCard', 1)).to.be.true;
        });
    });
});
