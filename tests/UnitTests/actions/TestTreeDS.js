/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import rewire from 'rewire';
import { Map } from 'immutable';
import * as tree from '../../../WebContent/js/actions/treeDS';
import * as treeData from '../testResources/actions/treeDS';
import * as snackbarActions from '../../../WebContent/js/actions/snackbarNotifications';
import { LOCAL_HOST_ENDPOINT as BASE_URL } from '../testResources/hostConstants';

describe('Action: treeDS', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    const rewiredTreeDs = rewire('../../../WebContent/js/actions/treeDS');
    const fatchFail = rewiredTreeDs.__get__('DATASET_FETCH_FAIL');

    describe('toggleTree', () => {
        it('Should create an action to toggle the tree open', () => {
            const isToggled = true;
            const expectedAction = {
                type: tree.TOGGLE_DS_TREE,
                isToggled,
            };
            expect(tree.toggleDSTree(isToggled)).toEqual(expectedAction);
        });

        it('Should create an action to toggle the tree closed', () => {
            const isToggled = false;
            const expectedAction = {
                type: tree.TOGGLE_DS_TREE,
                isToggled,
            };
            expect(tree.toggleDSTree(isToggled)).toEqual(expectedAction);
        });
    });

    describe('setPath', () => {
        it('Should create an action to set the path to an expected starting dataset', () => {
            const path = 'JCAIN';
            const expectedAction = {
                type: tree.SET_DS_TREE_PATH,
                DSPath: path,
            };
            expect(tree.setDSPath(path)).toEqual(expectedAction);
        });

        it('Should create an action to set the path to an expected dataset path', () => {
            const path = 'ATLAS.TEST.JCL';
            const expectedAction = {
                type: tree.SET_DS_TREE_PATH,
                DSPath: path,
            };
            expect(tree.setDSPath(path)).toEqual(expectedAction);
        });
    });

    describe('resetDSChildren', () => {
        it('Should create an action to reset the children', () => {
            const expectedAction = {
                type: tree.RESET_DS_TREE_CHILDREN,
            };

            expect(tree.resetDSChildren()).toEqual(expectedAction);
        });
    });

    describe('fetchDatasetTreeChildren', () => {
        it('Should create a request and receive action which returns some dummy data', () => {
            const path = 'JCAIN';
            const expectedActions = [
                {
                    type: tree.REQUEST_DS_TREE_CHILDREN,
                    DSPath: path,
                },
                treeData.receivedDatasetChildrenAction,
            ];

            nock(BASE_URL)
                .get(`/restfiles/ds?dslevel=${path}`)
                .reply(200, treeData.DatasetFetchChildrenData);

            const store = mockStore();

            return store.dispatch(tree.fetchDatasetTreeChildren(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create a request and receive action which returns some large dummy data', () => {
            const path = 'ATLAS';
            const expectedActions = [
                {
                    type: tree.REQUEST_DS_TREE_CHILDREN,
                    DSPath: path,
                },
                treeData.receivedLargeDatasetChildrenAction,
            ];

            nock(BASE_URL)
                .get(`/restfiles/ds?dslevel=${path}`)
                .reply(200, treeData.DatasetFetchChildrenLargeData);

            const store = mockStore();

            return store.dispatch(tree.fetchDatasetTreeChildren(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create a request and receive action which returns no data', () => {
            const path = 'ATLAS';
            const expectedActions = [
                {
                    type: tree.REQUEST_DS_TREE_CHILDREN,
                    DSPath: path,
                },
                treeData.receivedNoDatasetChildrenAction,
            ];

            nock(BASE_URL)
                .get(`/restfiles/ds?dslevel=${path}`)
                .reply(200, treeData.DatasetFetchChildrenNoData);

            const store = mockStore();

            return store.dispatch(tree.fetchDatasetTreeChildren(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create a request but not receive and therefore an invalidate action too', () => {
            const path = 'JCAIN';
            const expectedActions = [
                {
                    type: tree.REQUEST_DS_TREE_CHILDREN,
                    DSPath: path,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: Map({
                        message: `${fatchFail} ${path}`,
                    }),
                },
                {
                    type: tree.INVALIDATE_DS_TREE_CHILDREN,
                    DSPath: path,
                },
            ];

            nock(BASE_URL)
                .get(`/datasets/${path}/attributes`)
                .reply(500, '');

            const store = mockStore();

            return store.dispatch(tree.fetchDatasetTreeChildren(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });
});
