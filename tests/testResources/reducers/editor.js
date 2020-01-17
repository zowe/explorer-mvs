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
    etag: null,
    file: '',
    isFetching: false,
});

export const requestedContent = Map({
    content: null,
    etag: null,
    file: '',
    isFetching: true,
});

export const content = '//TSTJCICS JOB (ADL),ATLAS,MSGCLASS=0,CLASS=A,TIME=1440\n//*        THIS JOB SIMULATES A CICS REGION FOR 60 SECONDS';

export const dataset = 'JCAIN.TEST.JCL(TSTJCICS)';
export const datasetSeq = 'JCAIN.TEST.TXT';

/* depends on 'dataset' name above */
export const renameDSMember = 'JCAIN.TEST.JCL(NEWNAME)';
export const renameDSName = 'JCAIN.TEST1.JCL(TSTJCICS)';
export const renameDS = 'JCAIN.TEST1.JCL';

/* depends on 'datasetSeq' name above */
export const renameDSSeq = 'JCAIN.TEST1.TXT';


export const etag = '1EAC8542504731CBDBC42BB95008EAA8';
export const receivedContent = Map({
    content,
    etag,
    file: dataset,
    isFetching: false,
});

export const receivedSeqContent = Map({
    content,
    etag,
    file: datasetSeq,
    isFetching: false,
});

export const renameSeqContent = Map({
    content,
    etag,
    file: renameDSSeq,
    isFetching: false,
});

export const afterRenameDSMember = Map({
    content,
    etag,
    file: renameDSMember,
    isFetching: false,
});

export const afterRenameDSName = Map({
    content,
    etag,
    file: renameDSName,
    isFetching: false,
});

export const invalidatedContent = Map({
    content: 'Unable to retrieve content',
    etag: null,
    file: 'Unable to retrieve content',
    isFetching: false,
});

export const newContent = '//THE CONTENT AHS BEEN CHANGED IS NO LONGER VALID JCLn//*        THIS JOB SIMULATES A CICS REGION FOR 60 SECONDS';

export const newContentEditor = Map({
    content: newContent,
    etag,
    file: dataset,
    isFetching: false,
});

export const newEtag = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

export const newEtagEditor = Map({
    content,
    etag: newEtag,
    file: dataset,
    isFetching: false,
});

export const invalidatedEtagEditor = Map({
    content,
    etag: null,
    file: dataset,
    isFetching: false,
});

export const invalidatedSaveEditor = Map({
    content,
    etag: null,
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
        blockSize: '3213',
        dataSetOrganization: 'PO',
        recordLength: '80',
        name: 'JCAIN.SPF.ISPROF',
        recordFormat: 'FB',
    }),
});
