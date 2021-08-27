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

/* eslint max-len: ["error", { "code": 400 }] */

const ROOT_TREE_ID = 'treeDS';

export const baseTree = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({}),
    isFetching: false,
    DSPath: '',
});

export const DSPathSetTree = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({}),
    isFetching: false,
    DSPath: 'JCAIN',
});

export const toggledTree = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({}),
    isFetching: false,
    DSPath: '',
});

export const requestedChildrenTree = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({}),
    isFetching: true,
    DSPath: 'JCAIN',
});

export const restDSChildren = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({}),
    isFetching: false,
    DSPath: 'JCAIN',
});

export const DSChildData = { items: [
    { dsname: 'JCAIN.ISPF.ISPPROF', blksz: '3120', catnm: 'CATALOG.T50111', cdate: '2021/07/08', dev: '3390', dsntp: 'PDS', dsorg: 'PO', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '10', spacu: 'TRACKS', used: '20', vol: 'T50113', vols: 'T50113' },
    { dsname: 'JCAIN.SPFLOG1.LIST', blksz: '129', catnm: 'CATALOG.T50111', cdate: '2021/07/09', dev: '3390', dsorg: 'PS', edate: '***None***', extx: '1', lrecl: '125', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'VA', sizex: '9', spacu: 'BLOCKS', used: '11', vol: 'T50112', vols: 'T50112' },
    { dsname: 'JCAIN.TEST.JCL', blksz: '32720', catnm: 'CATALOG.T50111', cdate: '2021/08/17', dev: '3390', dsntp: 'LIBRARY', dsorg: 'PO-E', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '15', spacu: 'CYLINDERS', used: '3', vol: 'T50113', vols: 'T50113' },
    { dsname: 'JCAIN.TEST.TE', blksz: '80', catnm: 'CATALOG.T50111', cdate: '2021/08/16', dev: '3390', dsntp: 'PDS', dsorg: 'PO', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '300', spacu: 'TRACKS', used: '1', vol: 'T50112', vols: 'T50112' },
] };

export const receivedDSChildrenTree = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({
        'JCAIN.ISPF.ISPPROF': 'PO',
        'JCAIN.SPFLOG1.LIST': 'PS',
        'JCAIN.TEST.JCL': 'PO-E',
        'JCAIN.TEST.TE': 'PO',
    }),
    isFetching: false,
    DSPath: 'JCAIN',
});

export const receivedDSChildrenForDelete = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({
        'ATLAS.TEST.JCL': 'PO',
        'ATLAS.JEST.TCL': 'PS',
    }),
    isFetching: false,
    DSPath: 'ATLAS',
});

export const receivedDSChildrenAfterDelete = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({
        'ATLAS.JEST.TCL': 'PS',
    }),
    isFetching: false,
    DSPath: 'ATLAS',
});


export const receivedDSChildrenForRename = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({
        'ATLAS.TEST.JCL': 'PO',
        'ATLAS.JEST.TCL': 'PS',
    }),
    isFetching: false,
    DSPath: 'ATLAS',
});

export const receivedDSChildrenAfterRename = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({
        'ATLAS.TEST1.JCL': 'PO',
        'ATLAS.JEST.TCL': 'PS',
    }),
    isFetching: false,
    DSPath: 'ATLAS',
});


export const receivedDSMemberForRename = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({
        'ATLAS.TEST(OLD.JCL)': 'PO',
        'ATLAS.JEST.TCL': 'PS',
    }),
    isFetching: false,
    DSPath: 'ATLAS',
});

export const receivedDSMemberAfterRename = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({
        'ATLAS.JEST.TCL': 'PS',
    }),
    isFetching: false,
    DSPath: 'ATLAS',
});
