/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import { Map } from 'immutable';
import { DATASET_ORG_PARTITIONED } from '../../../constants/DataSetConstants';

const PRESETS = Map({
    JCL: {
        dsorg: DATASET_ORG_PARTITIONED,
        alcunit: 'TRK',
        primary: '300',
        secondary: '100',
        dirblk: '20',
        recfm: 'FB',
        blksize: '0',
        lrecl: '80',
    },
    COBOL: {
        dsorg: DATASET_ORG_PARTITIONED,
        alcunit: 'TRK',
        primary: '300',
        secondary: '150',
        dirblk: '20',
        recfm: 'FB',
        blksize: '0',
        lrecl: '133',
    },
    PLX: {
        dsorg: DATASET_ORG_PARTITIONED,
        alcunit: 'TRK',
        primary: '300',
        secondary: '150',
        dirblk: '20',
        recfm: 'VBA',
        blksize: '0',
        lrecl: '132',
    },
    XML: {
        dsorg: DATASET_ORG_PARTITIONED,
        alcunit: 'TRK',
        primary: '200',
        secondary: '100',
        dirblk: '20',
        recfm: 'VBA',
        blksize: '0',
        lrecl: '16383',
    },
});
export default PRESETS;
