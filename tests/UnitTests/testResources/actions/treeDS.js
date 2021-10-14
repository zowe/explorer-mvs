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

/* eslint max-len: ["error", { "code": 400 }] */

export const DatasetFetchChildrenData =
    { items: [{ dsname: 'JCAIN.ISPF.ISPPROF', blksz: '3120', catnm: 'CATALOG.T50111', cdate: '2021/07/08', dev: '3390', dsntp: 'PDS', dsorg: 'PO', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '10', spacu: 'TRACKS', used: '20', vol: 'T50113', vols: 'T50113' },
        { dsname: 'JCAIN.SPFLOG1.LIST', blksz: '129', catnm: 'CATALOG.T50111', cdate: '2021/07/09', dev: '3390', dsorg: 'PS', edate: '***None***', extx: '1', lrecl: '125', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'VA', sizex: '9', spacu: 'BLOCKS', used: '11', vol: 'T50112', vols: 'T50112' },
        { dsname: 'JCAIN.TEST.JCL', blksz: '32720', catnm: 'CATALOG.T50111', cdate: '2021/08/17', dev: '3390', dsntp: 'LIBRARY', dsorg: 'PO-E', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '15', spacu: 'CYLINDERS', used: '3', vol: 'T50113', vols: 'T50113' },
        { dsname: 'JCAIN.TEST.TE', blksz: '80', catnm: 'CATALOG.T50111', cdate: '2021/08/16', dev: '3390', dsntp: 'PDS', dsorg: 'PO', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '300', spacu: 'TRACKS', used: '1', vol: 'T50112', vols: 'T50112' },
        { dsname: 'JCAIN.U.ZOWE.ZFS', catnm: 'CATALOG.T50111', dsorg: 'VS', migr: 'NO', mvol: 'N', vol: '*VSAM*' },
        { dsname: 'JCAIN.U.ZOWE.ZFS.DATA', blksz: '?', catnm: 'CATALOG.T50111', cdate: '2021/07/08', dev: '3390', dsorg: 'VS', edate: '***None***', extx: '1', lrecl: '?', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/16', recfm: '?', sizex: '45000', spacu: 'CYLINDERS', used: '?', vol: 'T50113', vols: 'T50113' },
        { dsname: 'JCAIN.ZWE.SZWEAUTH', blksz: '32760', catnm: 'CATALOG.T50111', cdate: '2021/07/09', dev: '3390', dsntp: 'LIBRARY', dsorg: 'PO-E', edate: '***None***', extx: '2', lrecl: '0', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'U', sizex: '45', spacu: 'TRACKS', used: '76', vol: 'T50112', vols: 'T50112' },
        { dsname: 'JCAIN.ZWE.SZWESAMP', blksz: '32720', catnm: 'CATALOG.T50111', cdate: '2021/07/09', dev: '3390', dsntp: 'LIBRARY', dsorg: 'PO-E', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '15', spacu: 'TRACKS', used: '39', vol: 'T50112', vols: 'T50112' }],
    returnedRows: 8,
    JSONversion: 1 };

export const receivedDatasetChildrenAction = {
    type: treeTyes.RECEIVE_DS_TREE_CHILDREN,
    DSPath: 'JCAIN',
    childData: DatasetFetchChildrenData,
};

export const DatasetFetchChildrenLargeData =
    { items: [
        { dsname: 'ATLAS.TEST.ISPPROF', blksz: '3120', catnm: 'CATALOG.T50111', cdate: '2021/07/08', dev: '3390', dsntp: 'PDS', dsorg: 'PO', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '10', spacu: 'TRACKS', used: '20', vol: 'T50113', vols: 'T50113' },
        { dsname: 'ATLAS.TEST.LIST', blksz: '129', catnm: 'CATALOG.T50111', cdate: '2021/07/09', dev: '3390', dsorg: 'PS', edate: '***None***', extx: '1', lrecl: '125', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'VA', sizex: '9', spacu: 'BLOCKS', used: '11', vol: 'T50112', vols: 'T50112' },
        { dsname: 'ATLAS.TEST.JCL', blksz: '32720', catnm: 'CATALOG.T50111', cdate: '2021/08/17', dev: '3390', dsntp: 'LIBRARY', dsorg: 'PO-E', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '15', spacu: 'CYLINDERS', used: '3', vol: 'T50113', vols: 'T50113' },
        { dsname: 'ATLAS.TEST.TE', blksz: '80', catnm: 'CATALOG.T50111', cdate: '2021/08/16', dev: '3390', dsntp: 'PDS', dsorg: 'PO', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '300', spacu: 'TRACKS', used: '1', vol: 'T50112', vols: 'T50112' },
        { dsname: 'ATLAS.TEST.ZFS', catnm: 'CATALOG.T50111', dsorg: 'VS', migr: 'NO', mvol: 'N', vol: '*VSAM*' },
        { dsname: 'ATLAS.TEST.DATA', blksz: '?', catnm: 'CATALOG.T50111', cdate: '2021/07/08', dev: '3390', dsorg: 'VS', edate: '***None***', extx: '1', lrecl: '?', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/16', recfm: '?', sizex: '45000', spacu: 'CYLINDERS', used: '?', vol: 'T50113', vols: 'T50113' },
        { dsname: 'ATLAS.TEST.SZWEAUTH', blksz: '32760', catnm: 'CATALOG.T50111', cdate: '2021/07/09', dev: '3390', dsntp: 'LIBRARY', dsorg: 'PO-E', edate: '***None***', extx: '2', lrecl: '0', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'U', sizex: '45', spacu: 'TRACKS', used: '76', vol: 'T50112', vols: 'T50112' },
        { dsname: 'ATLAS.TEST.SZWESAMP', blksz: '32720', catnm: 'CATALOG.T50111', cdate: '2021/07/09', dev: '3390', dsntp: 'LIBRARY', dsorg: 'PO-E', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '15', spacu: 'TRACKS', used: '39', vol: 'T50112', vols: 'T50112' }],
    returnedRows: 8,
    JSONversion: 1 };

export const DatasetFetchChildrenLargeDataPlusOne =
    { items: [
        { dsname: 'ATLAS.TEST.DELETE', blksz: '3120', catnm: 'CATALOG.T50111', cdate: '2021/07/08', dev: '3390', dsntp: 'PDS', dsorg: 'PO', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '10', spacu: 'TRACKS', used: '20', vol: 'T50113', vols: 'T50113' },
        { dsname: 'ATLAS.TEST.ISPPROF', blksz: '3120', catnm: 'CATALOG.T50111', cdate: '2021/07/08', dev: '3390', dsntp: 'PDS', dsorg: 'PO', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '10', spacu: 'TRACKS', used: '20', vol: 'T50113', vols: 'T50113' },
        { dsname: 'ATLAS.TEST.LIST', blksz: '129', catnm: 'CATALOG.T50111', cdate: '2021/07/09', dev: '3390', dsorg: 'PS', edate: '***None***', extx: '1', lrecl: '125', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'VA', sizex: '9', spacu: 'BLOCKS', used: '11', vol: 'T50112', vols: 'T50112' },
        { dsname: 'ATLAS.TEST.JCL', blksz: '32720', catnm: 'CATALOG.T50111', cdate: '2021/08/17', dev: '3390', dsntp: 'LIBRARY', dsorg: 'PO-E', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '15', spacu: 'CYLINDERS', used: '3', vol: 'T50113', vols: 'T50113' },
        { dsname: 'ATLAS.TEST.TE', blksz: '80', catnm: 'CATALOG.T50111', cdate: '2021/08/16', dev: '3390', dsntp: 'PDS', dsorg: 'PO', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '300', spacu: 'TRACKS', used: '1', vol: 'T50112', vols: 'T50112' },
        { dsname: 'ATLAS.TEST.ZFS', catnm: 'CATALOG.T50111', dsorg: 'VS', migr: 'NO', mvol: 'N', vol: '*VSAM*' },
        { dsname: 'ATLAS.TEST.DATA', blksz: '?', catnm: 'CATALOG.T50111', cdate: '2021/07/08', dev: '3390', dsorg: 'VS', edate: '***None***', extx: '1', lrecl: '?', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/16', recfm: '?', sizex: '45000', spacu: 'CYLINDERS', used: '?', vol: 'T50113', vols: 'T50113' },
        { dsname: 'ATLAS.TEST.SZWEAUTH', blksz: '32760', catnm: 'CATALOG.T50111', cdate: '2021/07/09', dev: '3390', dsntp: 'LIBRARY', dsorg: 'PO-E', edate: '***None***', extx: '2', lrecl: '0', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'U', sizex: '45', spacu: 'TRACKS', used: '76', vol: 'T50112', vols: 'T50112' },
        { dsname: 'ATLAS.TEST.SZWESAMP', blksz: '32720', catnm: 'CATALOG.T50111', cdate: '2021/07/09', dev: '3390', dsntp: 'LIBRARY', dsorg: 'PO-E', edate: '***None***', extx: '1', lrecl: '80', migr: 'NO', mvol: 'N', ovf: 'NO', rdate: '2021/08/17', recfm: 'FB', sizex: '15', spacu: 'TRACKS', used: '39', vol: 'T50112', vols: 'T50112' }],
    returnedRows: 8,
    JSONversion: 1 };

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
