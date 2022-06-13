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

/* eslint max-len: ["error", { "code": 400 }] */

export const fetchDSMembersData = {
    items: [
        { member: 'ZWECSVSM' },
        { member: 'ZWEKRING' },
        { member: 'ZWENOKYR' },
        { member: 'ZWENOSEC' },
        { member: 'ZWENOSSO' },
        { member: 'ZWESASTC' },
        { member: 'ZWESECUR' },
        { member: 'ZWESIPRG' },
        { member: 'ZWESIP00' },
        { member: 'ZWESISCH' },
        { member: 'ZWESISTC' },
        { member: 'ZWESLSTC' },
        { member: 'ZWESSOTK' },
        { member: 'ZWESVSTC' }],
    returnedRows: 14,
    JSONversion: 1,
};

export const trimmedDSMemberData = {
    items: [
        'ZWECSVSM',
        'ZWEKRING',
        'ZWENOKYR',
        'ZWENOSEC',
        'ZWENOSSO',
        'ZWESASTC',
        'ZWESECUR',
        'ZWESIPRG',
        'ZWESIP00',
        'ZWESISCH',
        'ZWESISTC',
        'ZWESLSTC',
        'ZWESSOTK',
        'ZWESVSTC',
    ],
};

export const processedDSNewMembersData = {
    items: ['DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'TSTJ0003', 'NEWMEM'],
};

export const responseForFetchDSNewMembersData = {
    items: [{ member: 'DEMOJOB' }, { member: 'TSTJCICS' }, { member: 'TSTJDB2' }, { member: 'TSTJIMS' }, { member: 'TSTJMQ' }, { member: 'TSTJ0001' }, { member: 'TSTJ0002' }, { member: 'TSTJ0003' }, { member: 'NEWMEM' }], returnedRows: 14, JSONversion: 1,
};

export const fetchDSMembersLargeData = {
    items: ['DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'TSTJ0003', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2',
        'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS',
        'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ',
        'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001',
        'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002',
        'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002'],
};

export const DSProperties = Map(
    {
        name: 'ATLAS.TEST.DELETE',
        dsorg: 'PS',
        alcunit: 'TRK',
        primary: 10,
        secondary: 5,
        avgblk: 500,
        recfm: 'FB',
        blksize: 400,
        lrecl: 80,
    },
);
