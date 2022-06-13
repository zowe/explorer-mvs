/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2020
 */

import { Map } from 'immutable';
import { DEFAULT_TITLE } from '../../../../WebContent/js/reducers/editor';

/* eslint max-len: ["error", { "code": 400 }] */

export const baseEditor = Map({
    content: null,
    etag: null,
    file: '',
    isFetching: false,
    title: DEFAULT_TITLE,
});

export const dataset = 'JCAIN.TEST.JCL(TSTJCICS)';
export const datasetSeq = 'JCAIN.TEST.TXT';

export const requestedContent = Map({
    content: null,
    etag: null,
    file: dataset,
    isFetching: true,
    title: DEFAULT_TITLE,
});

export const content = '//TSTJCICS JOB (ADL),ATLAS,MSGCLASS=0,CLASS=A,TIME=1440\n//*        THIS JOB SIMULATES A CICS REGION FOR 60 SECONDS';

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
    title: `${DEFAULT_TITLE} [${dataset}]`,
});

export const receivedSeqContent = Map({
    content,
    etag,
    file: datasetSeq,
    isFetching: false,
    title: `${DEFAULT_TITLE} [${datasetSeq}]`,
});

export const renameSeqContent = Map({
    content,
    etag,
    file: renameDSSeq,
    isFetching: false,
    title: `${DEFAULT_TITLE} [${renameDSSeq}]`,
});

export const afterRenameDSMember = Map({
    content,
    etag,
    file: renameDSMember,
    isFetching: false,
    title: `${DEFAULT_TITLE} [${renameDSMember}]`,
});

export const afterRenameDSName = Map({
    content,
    etag,
    file: renameDSName,
    isFetching: false,
    title: `${DEFAULT_TITLE} [${renameDSName}]`,
});

export const invalidatedContent = Map({
    content: 'Unable to retrieve content',
    etag: null,
    file: 'Unable to retrieve content',
    isFetching: false,
    title: DEFAULT_TITLE,
});

export const newContent = '//THE CONTENT AHS BEEN CHANGED IS NO LONGER VALID JCLn//*        THIS JOB SIMULATES A CICS REGION FOR 60 SECONDS';

export const newContentEditor = Map({
    content: newContent,
    etag,
    file: dataset,
    isFetching: false,
    title: `${DEFAULT_TITLE} [${dataset}]`,
});

export const newEtag = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

export const newEtagEditor = Map({
    content,
    etag: newEtag,
    file: dataset,
    isFetching: false,
    title: `${DEFAULT_TITLE} [${dataset}]`,
});

export const invalidatedEtagEditor = Map({
    content,
    etag: null,
    file: dataset,
    isFetching: false,
    title: `${DEFAULT_TITLE} [${dataset}]`,
});

export const invalidatedSaveEditor = Map({
    content,
    etag: null,
    file: dataset,
    isFetching: false,
    title: `${DEFAULT_TITLE} [${dataset}]`,
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
        dsname: 'JCAIN.ISPF.ISPPROF', blksz: '3120', catnm: 'CATALOG.T50111', cdate: '2021/07/08', dev: '3390', dsntp: 'PDS', dsorg: 'PO', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '10', spacu: 'TRACKS', used: '20', vol: 'T50113', vols: 'T50113',
    }),
});
