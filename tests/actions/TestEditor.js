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
import nock from 'nock';
import thunk from 'redux-thunk';
import expect from 'expect';
import rewire from 'rewire';
import sinon from 'sinon';
import { fromJS, Map } from 'immutable';
import { LOCAL_HOST_ENDPOINT as BASE_URL } from '../testResources/hostConstants';
import * as editorActions from '../../WebContent/js/actions/editor';
import * as editorResources from '../testResources/actions/editor';
import * as treeData from '../testResources/actions/treeDS';
import * as treeDatasetActions from '../../WebContent/js/actions/treeDatasets';
import * as snackbarActions from '../../WebContent/js/actions/snackbarNotifications';


describe('Action: editor', () => {
    let sandbox;

    afterEach(() => {
        nock.cleanAll();
        sandbox.restore();
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    function mockVoidFunction(object, method) {
        sandbox.stub(object, method).callsFake(() => {
            return (() => { });
        });
    }

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    const rewiredEditor = rewire('../../WebContent/js/actions/editor');
    const rewiredSaveMessage = rewiredEditor.__get__('SAVE_SUCCESS_MESSAGE');
    const rewiredSaveFailMessage = rewiredEditor.__get__('SAVE_FAIL_MESSAGE');

    describe('fetchDS', () => {
        const rewiredGetContentFail = rewiredEditor.__get__('GET_CONTENT_FAIL_MESSAGE');
        it('Should create actions to request and receive DS content', () => {
            const dataset = 'DUMMY.DATASET';
            const expectedActions = [
                {
                    type: editorActions.REQUEST_CONTENT,
                    file: dataset,
                },
                {
                    type: editorActions.RECEIVE_CONTENT,
                    file: dataset,
                    content: editorResources.content,
                    etag: null,
                },
            ];
            nock(BASE_URL)
                .get(`/datasets/${dataset}/content`)
                .reply(200, { records: editorResources.content });

            const store = mockStore();

            return store.dispatch(editorActions.fetchDS(dataset))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create actions to request and receive with a patitioned dataset', () => {
            const dataset = 'ATLAS.TEST.JCL(MEMBER)';

            const expectedActions = [{
                type: editorActions.REQUEST_CONTENT,
                file: dataset,
            },
            {
                type: editorActions.RECEIVE_CONTENT,
                file: dataset,
                content: editorResources.content,
                etag: null,
            }];

            nock(BASE_URL)
                .get(`/datasets/${dataset}/content`)
                .reply(200, { records: editorResources.content });

            const store = mockStore();

            store.dispatch(editorActions.fetchDS(dataset))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create actions to request and invalidate content due to null file name', () => {
            const expectedActions = [
                {
                    type: editorActions.REQUEST_CONTENT,
                    file: null,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: Map({
                        message: `${rewiredGetContentFail} ${null}`,
                    }),
                },
                {
                    type: editorActions.INVALIDATE_CONTENT,
                },
            ];

            const store = mockStore();

            store.dispatch(editorActions.fetchDS(null))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                })
                // console.log('null file name throw error');
                .catch(() => { });
        });

        it('Should create actions to request and invalidate content due to 500 internal server error', () => {
            const dataset = 'NOT.A.DATASET';
            const internalServerErrorMsg = 'internal server error';
            const expectedActions = [{
                type: editorActions.REQUEST_CONTENT,
                file: dataset,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: Map({
                    message: `${internalServerErrorMsg} ${dataset}`,
                }),
            },
            {
                type: editorActions.INVALIDATE_CONTENT,
            }];

            nock(BASE_URL)
                .get(`/datasets/${dataset}/content`)
                .reply(500, { message: internalServerErrorMsg });

            const store = mockStore();

            return store.dispatch(editorActions.fetchDS(dataset))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create actions to request and invalidate content due to 404 not found response', () => {
            const dataset = 'NOT.A.DATASET';

            const expectedActions = [{
                type: editorActions.REQUEST_CONTENT,
                file: dataset,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: Map({
                    message: `${rewiredGetContentFail} ${dataset}`,
                }),
            },
            {
                type: editorActions.INVALIDATE_CONTENT,
            }];

            nock(BASE_URL)
                .get(`/datasets/${dataset}/content`)
                .reply(404, {});

            const store = mockStore();

            return store.dispatch(editorActions.fetchDS(dataset))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('updateEditorContent', () => {
        it('Should create an action to update the editor content', () => {
            const expectedAction = {
                type: editorActions.UPDATE_EDITOR_CONTENT,
                content: editorResources.content,
            };
            expect(editorActions.updateEditorContent(editorResources.content)).toEqual(expectedAction);
        });
    });

    describe('updateEditorEtag', () => {
        it('Should create an action to update the editor etag', () => {
            const expectedAction = {
                type: editorActions.UPDATE_EDITOR_ETAG,
                etag: editorResources.etag,
            };
            expect(editorActions.updateEditorEtag(editorResources.etag)).toEqual(expectedAction);
        });
    });

    describe('getNewDatasetEtag', () => {
        it('Should create an action to request a etag then update editor etag', () => {
            const rewiredGetNewDatasetEtag = rewiredEditor.__get__('getNewDatasetEtag');

            const expectedActions = [
                {
                    type: editorActions.REQUEST_ETAG,
                    file: editorResources.dataset,
                },
                {
                    type: editorActions.RECEIVE_ETAG,
                    file: editorResources.dataset,
                },
                {
                    type: editorActions.UPDATE_EDITOR_ETAG,
                    etag: editorResources.newEtag,
                },
            ];


            nock(BASE_URL)
                .get(`/datasets/${editorResources.dataset}/content`)
                .reply(200, { records: editorResources.content }, { etag: editorResources.newEtag });

            const store = mockStore(fromJS({
                editor: {
                    content: editorResources.content,
                    etag: editorResources.newEtag,
                    dataset: editorResources.dataset,
                },
            }));

            return store.dispatch(rewiredGetNewDatasetEtag(editorResources.dataset))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request a etag and then invalide due to api error', () => {
            const rewiredGetNewDatasetEtag = rewiredEditor.__get__('getNewDatasetEtag');

            const expectedActions = [
                {
                    type: editorActions.REQUEST_ETAG,
                    file: editorResources.dataset,
                },
                {
                    type: editorActions.INVALIDATE_ETAG,
                },
            ];


            nock(BASE_URL)
                .get(`/datasets/${editorResources.dataset}/content`)
                .reply(404);

            const store = mockStore(fromJS({
                editor: {
                    content: editorResources.content,
                    // etag: editorResources.etag,
                    dataset: editorResources.dataset,
                },
            }));

            return store.dispatch(rewiredGetNewDatasetEtag(editorResources.dataset))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('saveDataset', () => {
        it('Should create an action to request a save and call getNewEtag causing a etag request', () => {
            const expectedActions = [
                {
                    type: editorActions.REQUEST_SAVE,
                    file: editorResources.dataset,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: Map({
                        message: `${rewiredSaveMessage} ${editorResources.dataset}`,
                    }),
                },
                {
                    type: editorActions.RECEIVE_SAVE,
                    file: editorResources.dataset,
                },
                {
                    type: editorActions.REQUEST_ETAG,
                    file: editorResources.dataset,
                },
            ];

            nock(BASE_URL)
                .put(`/datasets/${editorResources.dataset}/content`)
                .reply(200);
            nock(BASE_URL)
                .get(`/datasets/${editorResources.dataset}/content`)
                .reply(200, { records: editorResources.content, etag: editorResources.newEtag });

            const store = mockStore(fromJS({
                editor: {
                    content: editorResources.content,
                    etag: editorResources.etag,
                    dataset: editorResources.dataset,
                },
            }));

            return store.dispatch(editorActions.saveDataset(editorResources.dataset, editorResources.content, editorResources.etag))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request a save but fail and cause invalidate save action', () => {
            const expectedActions = [
                {
                    type: editorActions.REQUEST_SAVE,
                    file: editorResources.dataset,
                },
                {
                    type: editorActions.INVALIDATE_SAVE,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: Map({
                        message: `${rewiredSaveFailMessage} ${editorResources.dataset}`,
                    }),
                },
            ];

            nock(BASE_URL)
                .put(`/datasets/${editorResources.dataset}/content`)
                .reply(404);
            // TODO:: Nock does not offer the ability to add statusText yet,
            // So we can't test the response status text gets added to a message (see "Not Found" above)
            // https://github.com/node-nock/nock/issues/587

            const store = mockStore(fromJS({
                editor: {
                    content: editorResources.content,
                    etag: editorResources.etag,
                    dataset: editorResources.dataset,
                },
            }));

            return store.dispatch(editorActions.saveDataset(editorResources.dataset, editorResources.content, editorResources.etag))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request a save but fail with a 412. But no invalidate save action in this case', () => {
            const expectedActions = [
                {
                    type: editorActions.REQUEST_SAVE,
                    file: editorResources.dataset,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: Map({
                        message: `${rewiredSaveFailMessage} ${editorResources.dataset}`,
                    }),
                },
            ];

            nock(BASE_URL)
                .put(`/datasets/${editorResources.dataset}/content`)
                .reply(412);
            // TODO:: Nock does not offer the ability to add statusText yet,
            // So we can't test the response status text gets added to a message (see "Not Found" above)
            // https://github.com/node-nock/nock/issues/587

            const store = mockStore(fromJS({
                editor: {
                    content: editorResources.content,
                    etag: editorResources.etag,
                    dataset: editorResources.dataset,
                },
            }));

            return store.dispatch(editorActions.saveDataset(editorResources.dataset, editorResources.content, editorResources.etag))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('saveAsDatasets', () => {
        //     describe('saveAsDataset', () => {
        //         it('Should create an action to request a saveAs, receiveSave', () => {
        //             const expectedActions = [
        //                 {
        //                     type: editorActions.REQUEST_SAVE_AS,
        //                     newName: editorResources.sequentialDatasetNew,
        //                 },
        //                 {
        //                     type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
        //                     message: Map({
        //                         message: `${rewiredSaveMessage} ${editorResources.sequentialDatasetNew}`,
        //                     }),
        //                 },
        //                 {
        //                     type: editorActions.RECEIVE_SAVE,
        //                     file: editorResources.sequentialDatasetNew,
        //                 },
        //                 {
        //                     type: editorActions.REQUEST_CONTENT,
        //                     file: editorResources.sequentialDatasetNew,
        //                 },
        //             ];

        //             nock(BASE_URL)
        //                 .put(`/datasets/${editorResources.sequentialDatasetNew}`)
        //                 .reply(204);

        //             const store = mockStore();

        //             mockVoidFunction(treeDSActions, 'fetchDatasetTreeChildren');

        //             return store.dispatch(
        //                 editorActions.saveAsDataset(
        //                     editorResources.sequentialDataset,
        //                     editorResources.sequentialDatasetNew,
        //                     editorResources.newContent,
        //                     editorResources.etag))
        //                 .then(() => {
        //                     expect(store.getActions()).toEqual(expectedActions);
        //                     expect(treeDSActions.fetchDatasetTreeChildren.calledOnce).toEqual(true, 'fetchDatasetTreeChildren called once');
        //                 });
        //         });

        //         it('Should create an action to request a saveAs and invalidate', () => {
        //             const expectedActions = [
        //                 {
        //                     type: editorActions.REQUEST_SAVE_AS,
        //                     newName: editorResources.sequentialDatasetNew,
        //                 },
        //                 {
        //                     type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
        //                     message: Map({
        //                         message: `${rewiredSaveFailMessage} ${editorResources.sequentialDatasetNew}`,
        //                     }),
        //                 },
        //                 {
        //                     type: editorActions.INVALIDATE_SAVE_AS,
        //                 },
        //             ];

        //             nock(BASE_URL)
        //                 .post(`/datasets/${editorResources.sequentialDatasetNew}`)
        //                 .reply(500);

        //             const store = mockStore();

        //             return store.dispatch(
        //                 editorActions.saveAsDataset(
        //                     editorResources.sequentialDataset,
        //                     editorResources.sequentialDatasetNew,
        //                     editorResources.newContent,
        //                     editorResources.etag))
        //                 .then(() => {
        //                     expect(store.getActions()).toEqual(expectedActions);
        //                 });
        //         });
        //     });

        describe('saveAsMember', () => {
            it('Should create actions to requestSaveAsMember and receiveSave', () => {
                const expectedActions = [
                    {
                        type: editorActions.REQUEST_SAVE_AS,
                        newName: editorResources.datasetDiffMemeber,
                    },
                    {
                        type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                        message: Map({
                            message: `${rewiredSaveMessage} ${editorResources.datasetDiffMemeber}`,
                        }),
                    },
                    {
                        type: editorActions.RECEIVE_SAVE,
                        file: editorResources.datasetDiffMemeber,
                    },
                    {
                        type: editorActions.REQUEST_CONTENT,
                        file: editorResources.datasetDiffMemeber,
                    },
                ];

                mockVoidFunction(treeDatasetActions, 'fetchDSMembers');

                nock(BASE_URL)
                    .put(`/datasets/${editorResources.datasetNoMember}(${editorResources.datasetMemberNew})/content`)
                    .reply(201);

                const store = mockStore();

                return store.dispatch(
                    editorActions.saveAsDatasetMember(
                        editorResources.datasetNoMember,
                        editorResources.datasetMemberNew,
                        editorResources.newContent))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('Should create actions to requestSaveAsMember and invalidate save', () => {
                const expectedActions = [
                    {
                        type: editorActions.REQUEST_SAVE_AS,
                        newName: editorResources.datasetDiffMemeber,
                    },
                    {
                        type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                        message: Map({
                            message: `${rewiredSaveFailMessage} ${editorResources.datasetDiffMemeber}`,
                        }),
                    },
                    {
                        type: editorActions.INVALIDATE_SAVE_AS,
                    },
                ];

                nock(BASE_URL)
                    .put(`/datasets/${editorResources.datasetNoMember}(${editorResources.datasetMemberNew})/content`)
                    .reply(500);

                const store = mockStore();

                return store.dispatch(
                    editorActions.saveAsDatasetMember(
                        editorResources.datasetNoMember,
                        editorResources.datasetMemberNew,
                        editorResources.newContent))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
        });
    });

    describe('fetchDatasetAttributes', () => {
        it('Should create actions to requestDSAttributes, receiveDSAttributes, before getting new attributes', () => {
            const path = editorResources.dataset;
            const attributes = treeData.DatasetFetchChildrenData.items[1];
            const expectedActions = [
                {
                    type: editorActions.REQUEST_ATTRIBUTES,
                    DSPath: path,
                },
                {
                    type: editorActions.RECEIVE_ATTRIBUTES,
                    DSPath: path,
                    data: attributes,
                },
            ];

            nock(BASE_URL)
                .get(`/datasets/${path}`)
                .reply(200, attributes);

            const store = mockStore();

            return store.dispatch(editorActions.fetchDatasetAttributes(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });
});
