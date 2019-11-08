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
    {
        name: 'JCAIN',
    },
    {
        blockSize: '3213',
        dataSetOrganization: 'PO',
        recordLength: '80',
        name: 'JCAIN.SPF.ISPROF',
        recordFormat: 'FB',
    },
    {
        blockSize: '5213',
        dataSetOrganization: 'PS',
        recordLength: '125',
        name: 'JCAIN.SPFLOG1.LIST',
        recordFormat: 'VA',
    },
    {
        blockSize: '6000',
        dataSetOrganization: 'PS-E',
        recordLength: '125',
        name: 'JCAIN.SPFLOG2.LIST',
        recordFormat: 'VB',
    },
] };

export const receivedDSChildrenTree = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({
        'JCAIN.SPF.ISPROF': 'PO',
        'JCAIN.SPFLOG1.LIST': 'PS',
        'JCAIN.SPFLOG2.LIST': 'PS-E',
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
