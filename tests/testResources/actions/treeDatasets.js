/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018
 */

import { Map } from 'immutable';

export const fetchDSMembersData = ['DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'TSTJ0003'];

export const fetchDSNewMembersData = ['DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'TSTJ0003', 'NEWMEM'];

export const fetchDSMembersLargeData = ['DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'TSTJ0003', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2',
    'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS',
    'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ',
    'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001',
    'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002', 'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002',
    'DEMOJOB', 'TSTJCICS', 'TSTJDB2', 'TSTJIMS', 'TSTJMQ', 'TSTJ0001', 'TSTJ0002'];

export const DSProperties = Map({ dsname: 'ATLAS.TEST', blksize: 0, primary: 300, lrecl: 80, secondary: 100, dirblk: 20, dsorg: 'PO', recfm: 'FB', alcunit: 'TRK' });

