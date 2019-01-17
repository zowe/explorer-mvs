/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2018
 */

import { Map } from 'immutable';
import { DATASET_ORG_PARTITIONED } from '../../../constants/DataSetConstants';

const PRESETS = Map({
    JCL: {
        dataSetOrganization: DATASET_ORG_PARTITIONED,
        allocationUnit: 'TRK',
        primary: '300',
        secondary: '100',
        dirblk: '20',
        recordFormat: 'FB',
        blockSize: '0',
        recordLength: '80',
    },
    COBOL: {
        dataSetOrganization: DATASET_ORG_PARTITIONED,
        allocationUnit: 'TRK',
        primary: '300',
        secondary: '150',
        dirblk: '20',
        recordFormat: 'FB',
        blockSize: '0',
        recordLength: '133',
    },
    PLX: {
        dataSetOrganization: DATASET_ORG_PARTITIONED,
        allocationUnit: 'TRK',
        primary: '300',
        secondary: '150',
        dirblk: '20',
        recordFormat: 'VBA',
        blockSize: '0',
        recordLength: '132',
    },
    XML: {
        dataSetOrganization: DATASET_ORG_PARTITIONED,
        allocationUnit: 'TRK',
        primary: '200',
        secondary: '100',
        dirblk: '20',
        recordFormat: 'VBA',
        blockSize: '0',
        recordLength: '16383',
    },
});
export default PRESETS;
