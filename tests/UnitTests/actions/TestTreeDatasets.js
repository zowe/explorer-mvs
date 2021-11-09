/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2020
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import rewire from 'rewire';
import { Map } from 'immutable';
import * as treeDatasets from '../../../WebContent/js/actions/treeDatasets';
import * as tree from '../../../WebContent/js/actions/treeDS';
import * as treeDatasetsData from '../testResources/actions/treeDatasets';
import * as treeData from '../testResources/actions/treeDS';
import * as snackbarActions from '../../../WebContent/js/actions/snackbarNotifications';
import { LOCAL_HOST_ENDPOINT as BASE_URL } from '../testResources/hostConstants';

describe('Action: treeDatasets', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    const rewiredTreeDatasets = rewire('../../../WebContent/js/actions/treeDatasets');
    const createSuccess = rewiredTreeDatasets.__get__('DATASET_CREATE_SUCCESS_MESSAGE');
    const createFail = rewiredTreeDatasets.__get__('DATASET_CREATE_FAIL_MESSAGE');
    const deleteSuccess = rewiredTreeDatasets.__get__('DATASET_DELETE_SUCCESS_MESSAGE');
    const deleteFail = rewiredTreeDatasets.__get__('DATASET_DELETE_FAIL_MESSAGE');
    const fetchMembersFail = rewiredTreeDatasets.__get__('DATASET_FETCH_MEMBERS_FAIL');
    const renameSuccess = rewiredTreeDatasets.__get__('DATASET_RENAME_SUCCESS_MESSAGE');
    const renameFail = rewiredTreeDatasets.__get__('DATASET_RENAME_FAIL_MESSAGE');

    describe('toggleDSNode', () => {
        it('Should create an action to toggle a DSNode to true', () => {
            const DSName = 'Atlas.TEST.JCL';
            const isToggled = true;
            const expectedAction = {
                type: treeDatasets.TOGGLE_TREE_DS_NODE,
                DSName,
                isToggled,
            };
            expect(treeDatasets.toggleDSNode(DSName, isToggled)).toEqual(expectedAction);
        });

        it('Should create an action to toggle a DSNode to false', () => {
            const DSName = 'Atlas.TEST.JCL';
            const isToggled = false;
            const expectedAction = {
                type: treeDatasets.TOGGLE_TREE_DS_NODE,
                DSName,
                isToggled,
            };
            expect(treeDatasets.toggleDSNode(DSName, isToggled)).toEqual(expectedAction);
        });
    });

    describe('fetchDSMembers', () => {
        it('Should create an action to request and then receive children', () => {
            const DSName = 'ATLAS.TEST.JCL';
            let childData = treeDatasetsData.trimmedDSMemberData;
            const expectedActions = [{
                type: treeDatasets.REQUEST_TREE_DS_CHILD_MEMBERS,
                DSName,
            },
            {
                type: treeDatasets.RECEIVE_TREE_DS_CHILD_MEMBERS,
                DSName,
                childData,
            }];
            childData = treeDatasetsData.fetchDSMembersData;
            nock(BASE_URL)
                .get(`/restfiles/ds/${DSName}/member`)
                .reply(200, childData);

            const store = mockStore();

            return store.dispatch(treeDatasets.fetchDSMembers(DSName))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request and then receive a large set of children', () => {
            const DSName = 'ATLAS.TEST.JCL';
            let childData = treeDatasetsData.trimmedDSMemberData;
            const expectedActions = [{
                type: treeDatasets.REQUEST_TREE_DS_CHILD_MEMBERS,
                DSName,
            },
            {
                type: treeDatasets.RECEIVE_TREE_DS_CHILD_MEMBERS,
                DSName,
                childData,
            }];
            childData = treeDatasetsData.fetchDSMembersData;
            nock(BASE_URL)
                .get(`/restfiles/ds/${DSName}/member`)
                .reply(200, childData);

            const store = mockStore();

            return store.dispatch(treeDatasets.fetchDSMembers(DSName))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request but not receive and therefore an invalid action too', () => {
            const DSName = 'ATLAS.TEST.JCL';
            const expectedActions = [{
                type: treeDatasets.REQUEST_TREE_DS_CHILD_MEMBERS,
                DSName,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${fetchMembersFail} ${DSName}`,
                }),
            },
            {
                type: treeDatasets.INVALIDATE_TREE_DS_CHILD_MEMBERS,
            }];
            nock(BASE_URL)
                .get(`/datasets/${DSName}/members`)
                .reply(500, '');

            const store = mockStore();

            return store.dispatch(treeDatasets.fetchDSMembers(DSName))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('createDataset', () => {
        it('Should create an action to request and then receive a new dataset, then refresh the datasets via fetchDatasetTreeChildren', () => {
            const DSName = treeDatasetsData.DSProperties.get('name');
            const { DSProperties } = treeDatasetsData;
            const path = 'ATLAS';
            const newTreeData = treeData.DatasetFetchChildrenLargeDataPlusOne;
            const expectedActions = [{
                type: treeDatasets.REQUEST_NEW_DATASET,
                DSProperties,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${createSuccess} ${DSName}`,
                }),
            },
            {
                type: treeDatasets.RECEIVE_NEW_DATASET,
                DSProperties,
            },
            {
                type: tree.REQUEST_DS_TREE_CHILDREN,
                DSPath: path,
            },
            {
                type: tree.RECEIVE_DS_TREE_CHILDREN,
                DSPath: path,
                childData: newTreeData,
            }];

            nock(BASE_URL)
                .post(`/restfiles/ds/${DSName}`)
                .reply(201, '');
            nock(BASE_URL)
                .get(`/restfiles/ds?dslevel=${path}`)
                .reply(200, newTreeData);

            const store = mockStore();

            return store.dispatch(treeDatasets.createDataset(DSProperties, path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request and then invalidate', () => {
            const DSName = treeDatasetsData.DSProperties.get('name');
            const { DSProperties } = treeDatasetsData;
            const path = 'ATLAS';
            const expectedActions = [{
                type: treeDatasets.REQUEST_NEW_DATASET,
                DSProperties,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${createFail} ${DSName}`,
                }),
            },
            {
                type: treeDatasets.INVALIDATE_NEW_DATASET,
                DSProperties,
            }];

            nock(BASE_URL)
                .post('/datasets')
                .reply(500, '');

            const store = mockStore();

            return store.dispatch(treeDatasets.createDataset(DSProperties, path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('createMember', () => {
        it('Should create an action to request and then recieve a new member, then refresh members via fetchDSMembers', () => {
            const DSName = 'ATLAS.TEST.JCL';
            const memberName = 'NEWMEM';
            const childData = treeDatasetsData.processedDSNewMembersData;
            const responseData = treeDatasetsData.responseForFetchDSNewMembersData;
            const expectedActions = [{
                type: treeDatasets.REQUEST_NEW_MEMBER,
                DSName,
                member: memberName,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${createSuccess} ${DSName}(${memberName})`,
                }),
            },
            {
                type: treeDatasets.RECEIVE_NEW_MEMBER,
                DSName,
                member: memberName,
            },
            {
                type: treeDatasets.REQUEST_TREE_DS_CHILD_MEMBERS,
                DSName,
            },
            {
                type: treeDatasets.RECEIVE_TREE_DS_CHILD_MEMBERS,
                DSName,
                childData,
            }];

            nock(BASE_URL)
                .put(`/restfiles/ds/${DSName}(${memberName})`)
                .reply(201, '');
            nock(BASE_URL)
                .get(`/restfiles/ds/${DSName}/member`)
                .reply(200, responseData);

            const store = mockStore();

            return store.dispatch(treeDatasets.createMember(DSName, memberName))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request but not recieve a member and therefore an invalidate action', () => {
            const DSName = 'ATLAS.TEST.JCL';
            const memberName = 'NEWMEM';
            const expectedActions = [{
                type: treeDatasets.REQUEST_NEW_MEMBER,
                DSName,
                member: memberName,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${createFail} ${DSName}(${memberName})`,
                }),
            },
            {
                type: treeDatasets.INVALIDATE_NEW_MEMBER,
                DSName,
                member: memberName,
            }];

            nock(BASE_URL)
                .put(`/datasets/${DSName}(${memberName})/content`)
                .reply(500, '');

            const store = mockStore();

            return store.dispatch(treeDatasets.createMember(DSName, memberName))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('deleteDataset', () => {
        it('Should create an action to request and receive allocate like, then remove a dataset from the tree', () => {
            const DSName = 'ATLAS.TEST.JCL';
            const expectedActions = [{
                type: treeDatasets.REQUEST_DELETE_DATASET,
                DSName,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${deleteSuccess} ${DSName}`,
                }),
            },
            {
                type: treeDatasets.RECEIVE_DELETE_DATASET,
                DSName,
            },
            {
                type: tree.REMOVE_DATASET,
                DSName,
            }];

            nock(BASE_URL)
                .delete(`/restfiles/ds/${DSName}`)
                .reply(204, '');

            const store = mockStore();

            return store.dispatch(treeDatasets.deleteDataset(DSName))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request and invalidate delete dataset', () => {
            const DSName = 'ATLAS.TEST.JCL';
            const expectedActions = [{
                type: treeDatasets.REQUEST_DELETE_DATASET,
                DSName,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${deleteFail} ${DSName}`,
                }),
            },
            {
                type: treeDatasets.INVALIDATE_DELETE_DATASET,
                DSName,
            }];

            nock(BASE_URL)
                .delete(`/datasets/${DSName}`, {})
                .reply(404, '');

            const store = mockStore();

            return store.dispatch(treeDatasets.deleteDataset(DSName))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('renameDataset', () => {
        it('Should create an action to request and receive rename dataset, isOpenInViewer false', () => {
            const oldName = 'ATLAS.TEST.JCL';
            const newName = 'ATLAS.NEW.JCL';
            const isOpenInViewer = false;
            const body = `{
                "request": "rename",
                "from-dataset": {
                    "dsn": "${oldName}"
                }
            }`;
            const expectedActions = [{
                type: treeDatasets.REQUEST_RENAME_DATASET,
                oldName,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${renameSuccess} from '${oldName}' to '${newName}'`,
                }),
            },
            {
                type: treeDatasets.RECEIVE_RENAME_DATASET,
                oldName,
            },
            {
                type: tree.RENAME_DATASET,
                oldName,
                newName,
            },
            ];

            nock(BASE_URL)
                // .persist()
                // .log(console.log)
                .put(`/restfiles/ds/${newName}`, body)
                .reply(200, '');

            const store = mockStore();

            return store.dispatch(treeDatasets.renameDataset(oldName, newName, isOpenInViewer))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request, receive rename dataset and update filename in editor, isOpenInViewer true', () => {
            const oldName = 'ATLAS.TEST.JCL';
            const newName = 'ATLAS.NEW.JCL';
            const isOpenInViewer = true;
            const body = `{
                "request": "rename",
                "from-dataset": {
                    "dsn": "${oldName}"
                }
            }`;

            const expectedActions = [{
                type: treeDatasets.REQUEST_RENAME_DATASET,
                oldName,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${renameSuccess} from '${oldName}' to '${newName}'`,
                }),
            },
            {
                type: treeDatasets.RECEIVE_RENAME_DATASET,
                oldName,
            },
            {
                type: tree.RENAME_DATASET,
                oldName,
                newName,
            },
            {
                newName: 'ATLAS.NEW.JCL',
                type: 'UPDATE_EDITOR_FILE_NAME',
            },
            ];

            nock(BASE_URL)
                // .persist()
                // .log(console.log)
                .put(`/restfiles/ds/${newName}`, body)
                .reply(200, '');

            const store = mockStore();

            return store.dispatch(treeDatasets.renameDataset(oldName, newName, isOpenInViewer))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request and receive rename dataset member, isOpenInViewer false', () => {
            const oldName = 'ATLAS.TEST.DS(OLD)';
            const newName = 'ATLAS.TEST.DS(NEW)';
            const isOpenInViewer = false;
            const body = `{
                "request": "rename",
                "from-dataset": {
                  "dsn": "${oldName.substring(0, oldName.indexOf('('))}",
                  "member": "${oldName.substring(oldName.lastIndexOf('(') + 1, oldName.length - 1)}"
                }
              }`;

            const expectedActions = [{
                type: treeDatasets.REQUEST_RENAME_DATASET,
                oldName,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${renameSuccess} from '${oldName}' to '${newName}'`,
                }),
            },
            {
                type: treeDatasets.RECEIVE_RENAME_DATASET,
                oldName,
            },
            {
                DSName: 'ATLAS.TEST.DS',
                type: 'REQUEST_TREE_DS_CHILD_MEMBERS',
            },
            {
                type: tree.RENAME_DATASET,
                oldName,
                newName,
            },
            ];

            nock(BASE_URL)
                // .persist()
                // .log(console.log)
                .put(`/restfiles/ds/${newName}`, body)
                .reply(200, '');

            const store = mockStore();

            return store.dispatch(treeDatasets.renameDataset(oldName, newName, isOpenInViewer))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request and receive rename dataset member  and update filename in editor, isOpenInViewer true', () => {
            const oldName = 'ATLAS.TEST.TEST(OLD)';
            const newName = 'ATLAS.TEST.TEST(NEW)';
            const isOpenInViewer = true;
            const body = `{
                "request": "rename",
                "from-dataset": {
                  "dsn": "${oldName.substring(0, oldName.indexOf('('))}",
                  "member": "${oldName.substring(oldName.lastIndexOf('(') + 1, oldName.length - 1)}"
                }
              }`;

            const expectedActions = [{
                type: treeDatasets.REQUEST_RENAME_DATASET,
                oldName,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${renameSuccess} from '${oldName}' to '${newName}'`,
                }),
            },
            {
                type: treeDatasets.RECEIVE_RENAME_DATASET,
                oldName,
            },
            {
                DSName: 'ATLAS.TEST.TEST',
                type: 'REQUEST_TREE_DS_CHILD_MEMBERS',
            },
            {
                type: tree.RENAME_DATASET,
                oldName,
                newName,
            },
            {
                newName: 'ATLAS.TEST.TEST(NEW)',
                type: 'UPDATE_EDITOR_FILE_NAME',
            },
            ];

            nock(BASE_URL)
                // .persist()
                // .log(console.log)
                .put(`/restfiles/ds/${newName}`, body)
                .reply(200, '');

            const store = mockStore();

            return store.dispatch(treeDatasets.renameDataset(oldName, newName, isOpenInViewer))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request and invalidate rename dataset', () => {
            const oldName = 'ATLAS.TEST.JCL';
            const newName = 'ATLAS.NEW12345678.JCL';
            const isOpenInViewer = false;
            const body = `{"newName":"${newName}"}`;

            const expectedActions = [{
                type: treeDatasets.REQUEST_RENAME_DATASET,
                oldName,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: new Map({
                    message: `${renameFail} '${oldName}'`,
                }),
            },
            {
                type: treeDatasets.INVALIDATE_RENAME_DATASET,
                oldName,
            }];

            nock(BASE_URL)
                .put(`/datasets/${oldName}/rename`, body)
                .reply(400, JSON.stringify({
                    status: 'BAD_REQUEST',
                    message: 'EDC5051I An error occurred when renaming a file. (errno2=0xC013006A)',
                }));

            const store = mockStore();

            return store.dispatch(treeDatasets.renameDataset(oldName, newName, isOpenInViewer))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });
});
