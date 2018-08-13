/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018
 */

import * as treeTyes from '../../../WebContent/js/actions/treeDS';

export const DatasetFetchChildrenData = [{ name: 'JCAIN' },
    { name: 'JCAIN.SPF.ISPPROF', blksize: '3120', lrecl: '80', recfm: 'FB', dsorg: 'PO' },
    { name: 'JCAIN.SPFLOG1.LIST', blksize: '129', lrecl: '125', recfm: 'VA', dsorg: 'PS' }];

export const receivedDatasetChildrenAction = {
    type: treeTyes.RECEIVE_DS_TREE_CHILDREN,
    DSPath: 'JCAIN',
    childData: DatasetFetchChildrenData,
};

export const DatasetFetchChildrenDataPlusOne = [{ name: 'JCAIN' },
    { name: 'JCAIN.SPF.ISPPROF', blksize: '3120', lrecl: '80', recfm: 'FB', dsorg: 'PO' },
    { name: 'JCAIN.SPFLOG1.LIST', blksize: '129', lrecl: '125', recfm: 'VA', dsorg: 'PS' },
    { name: 'JCAIN.TEST.JCL2', blksize: '129', lrecl: '125', recfm: 'VA', dsorg: 'PS' }];

export const DatasetFetchChildrenLargeData = [{ name: 'ATLAS' },
    { name: 'ATLAS.TEST.FAOPTS', blksize: '27920', lrecl: '80', recfm: 'FB', dsorg: 'PO' },
    { name: 'ATLAS.TEST.HIST', blksize: '32760', lrecl: '10000', recfm: 'VB', dsorg: 'PO' },
    { name: 'ATLAS.TEST.HISTORY', blksize: '32760', lrecl: '10000', recfm: 'VB', dsorg: 'PO-E' },
    { name: 'ATLAS.TEST.JCL', blksize: '27920', lrecl: '80', recfm: 'FB', dsorg: 'PO' },
    { name: 'ATLAS.TEST.LOAD', blksize: '27998', lrecl: '0', recfm: 'U', dsorg: 'PO-E' }];

export const DatasetFetchChildrenLargeDataPlusOne = [{ name: 'ATLAS' },
    { name: 'ATLAS.DELETE', blksize: '27920', lrecl: '80', recfm: 'FB', dsorg: 'PO' },
    { name: 'ATLAS.TEST.FAOPTS', blksize: '27920', lrecl: '80', recfm: 'FB', dsorg: 'PO' },
    { name: 'ATLAS.TEST.HIST', blksize: '32760', lrecl: '10000', recfm: 'VB', dsorg: 'PO' },
    { name: 'ATLAS.TEST.HISTORY', blksize: '32760', lrecl: '10000', recfm: 'VB', dsorg: 'PO-E' },
    { name: 'ATLAS.TEST.JCL', blksize: '27920', lrecl: '80', recfm: 'FB', dsorg: 'PO' },
    { name: 'ATLAS.TEST.LOAD', blksize: '27998', lrecl: '0', recfm: 'U', dsorg: 'PO-E' }];

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
