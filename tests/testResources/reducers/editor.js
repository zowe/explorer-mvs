/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

import { Map } from 'immutable';

export const baseEditor = Map({
    content: null,
    checksum: null,
    file: '',
    isFetching: false,
});

export const requestedContent = Map({
    content: null,
    checksum: null,
    file: '',
    isFetching: true,
});

export const content = '//TSTJCICS JOB (ADL),ATLAS,MSGCLASS=0,CLASS=A,TIME=1440\n//*        THIS JOB SIMULATES A CICS REGION FOR 60 SECONDS';

export const dataset = 'JCAIN.TEST.JCL(TSTJCICS)';

export const checksum = '1EAC8542504731CBDBC42BB95008EAA8';

export const receivedContent = Map({
    content,
    checksum,
    file: dataset,
    isFetching: false,
});

export const invalidatedContent = Map({
    content: 'Unable to retrieve content',
    checksum: null,
    file: 'Unable to retrieve content',
    isFetching: false,
});

export const newContent = '//THE CONTENT AHS BEEN CHANGED IS NO LONGER VALID JCLn//*        THIS JOB SIMULATES A CICS REGION FOR 60 SECONDS';

export const newContentEditor = Map({
    content: newContent,
    checksum,
    file: dataset,
    isFetching: false,
});

export const newChecksum = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

export const newChecksumEditor = Map({
    content,
    checksum: newChecksum,
    file: dataset,
    isFetching: false,
});

export const invalidatedChecksumEditor = Map({
    content,
    checksum: null,
    file: dataset,
    isFetching: false,
});

export const invalidatedSaveEditor = Map({
    content,
    checksum: null,
    file: dataset,
    isFetching: false,
});

export const requestDataset = Map({
    DSPath: dataset,
    isFetching: false,
});

export const requestedDatasetAttributes = Map({
    DSPath: dataset,
    isFetching: true,
});

export const recievedDatasetAttributes = Map({
    DSPath: dataset,
    isFetching: false,
    attributes: Map({
        blksize: '3213',
        dsorg: 'PO',
        lrecl: '80',
        name: 'JCAIN.SPF.ISPROF',
        recfm: 'FB',
    }),
});
