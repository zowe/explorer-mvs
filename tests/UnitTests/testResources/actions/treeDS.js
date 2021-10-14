/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

import * as treeTyes from '../../../../WebContent/js/actions/treeDS';

export const DatasetFetchChildrenData = { items: [{ name: 'JCAIN' },
    { name: 'JCAIN.SPF.ISPPROF', blockSize: '3120', recordLength: '80', recordFormat: 'FB', dataSetOrganization: 'PO' },
    { name: 'JCAIN.SPFLOG1.LIST', blockSize: '129', recordLength: '125', recordFormat: 'VA', dataSetOrganization: 'PS' },
    { name: 'JCAIN.SPFLOG2.LIST', blockSize: '6000', recordLength: '125', recordFormat: 'VB', dataSetOrganization: 'PS-E' }] };

export const receivedDatasetChildrenAction = {
    type: treeTyes.RECEIVE_DS_TREE_CHILDREN,
    DSPath: 'JCAIN',
    childData: DatasetFetchChildrenData,
};

export const DatasetFetchChildrenDataPlusOne = { items: [{ name: 'JCAIN' },
    { name: 'JCAIN.SPF.ISPPROF', blockSize: '3120', recordLength: '80', recordFormat: 'FB', dataSetOrganization: 'PO' },
    { name: 'JCAIN.SPFLOG1.LIST', blockSize: '129', recordLength: '125', recordFormat: 'VA', dataSetOrganization: 'PS' },
    { name: 'JCAIN.TEST.JCL2', blockSize: '129', recordLength: '125', recordFormat: 'VA', dataSetOrganization: 'PS' }] };

export const DatasetFetchChildrenLargeData = { items: [{ name: 'ATLAS' },
    { name: 'ATLAS.TEST.FAOPTS', blockSize: '27920', recordLength: '80', recordFormat: 'FB', dataSetOrganization: 'PO' },
    { name: 'ATLAS.TEST.HIST', blockSize: '32760', recordLength: '10000', recordFormat: 'VB', dataSetOrganization: 'PO' },
    { name: 'ATLAS.TEST.HISTORY', blockSize: '32760', recordLength: '10000', recordFormat: 'VB', dataSetOrganization: 'PO-E' },
    { name: 'ATLAS.TEST.JCL', blockSize: '27920', recordLength: '80', recordFormat: 'FB', dataSetOrganization: 'PO' },
    { name: 'ATLAS.TEST.LOAD', blockSize: '27998', recordLength: '0', recordFormat: 'U', dataSetOrganization: 'PO-E' }] };

export const DatasetFetchChildrenLargeDataPlusOne = { items: [{ name: 'ATLAS' },
    { name: 'ATLAS.DELETE', blockSize: '27920', recordLength: '80', recordFormat: 'FB', dataSetOrganization: 'PO' },
    { name: 'ATLAS.TEST.FAOPTS', blockSize: '27920', recordLength: '80', recordFormat: 'FB', dataSetOrganization: 'PO' },
    { name: 'ATLAS.TEST.HIST', blockSize: '32760', recordLength: '10000', recordFormat: 'VB', dataSetOrganization: 'PO' },
    { name: 'ATLAS.TEST.HISTORY', blockSize: '32760', recordLength: '10000', recordFormat: 'VB', dataSetOrganization: 'PO-E' },
    { name: 'ATLAS.TEST.JCL', blockSize: '27920', recordLength: '80', recordFormat: 'FB', dataSetOrganization: 'PO' },
    { name: 'ATLAS.TEST.LOAD', blockSize: '27998', recordLength: '0', recordFormat: 'U', dataSetOrganization: 'PO-E' }] };

export const receivedLargeDatasetChildrenAction = {
    type: treeTyes.RECEIVE_DS_TREE_CHILDREN,
    DSPath: 'ATLAS',
    childData: DatasetFetchChildrenLargeData,
};

export const DatasetFetchChildrenNoData = [];

export const receivedNoDatasetChildrenAction = {
    type: treeTyes.RECEIVE_DS_TREE_CHILDREN,
    DSPath: 'ATLAS',
    childData: DatasetFetchChildrenNoData,
};
