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
import * as jobSubmitter from '../../../WebContent/js/actions/jobSubmitter';
import * as jobSubmitterData from '../testResources/actions/jobSubmitter';
import * as snackbarActions from '../../../WebContent/js/actions/snackbarNotifications';
import { LOCAL_HOST_ENDPOINT as BASE_URL } from '../testResources/hostConstants';

describe('Action: jobSubmitter', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const rewiredJobSubmitter = rewire('../../../WebContent/js/actions/jobSubmitter');

    describe('resetResponse', () => {
        it('Should create an action to reset the response and requested', () => {
            const expectedAction = { type: jobSubmitter.INVALIDATE_JOB_SUBMIT };
            expect(jobSubmitter.resetResponse()).toEqual(expectedAction);
        });
    });

    describe('submitJob', () => {
        it('Should create an action to request and receive a job submit', () => {
            const rewiredSuccessMessage = rewiredJobSubmitter.__get__('JOB_SUBMIT_SUCCESS_MESSAGE');
            const job = 'ATLAS.TEST.JCL(TSTJ0001)';
            nock(BASE_URL)
                .post('/jobs/dataset', {
                    file: "'ATLAS.TEST.JCL(TSTJ0001)'",
                })
                .reply(200, jobSubmitterData.jobSubmitResponse);
            const expectedActions = [
                {
                    type: jobSubmitter.REQUEST_JOB_SUBMIT,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: new Map({
                        message: `${jobSubmitterData.jobSubmitResponse.jobName} ${rewiredSuccessMessage}, id=${jobSubmitterData.jobSubmitResponse.jobId}`,
                    }),
                },
                {
                    type: jobSubmitter.RECEIVE_JOB_SUBMIT_RESPONSE,
                    success: true,
                    response: jobSubmitterData.jobSubmitResponse,
                },
            ];

            const store = mockStore();

            return store.dispatch(jobSubmitter.submitJob(job))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request and invalidate a job submit', () => {
            const rewiredFailureMessage = rewiredJobSubmitter.__get__('JOB_SUBMIT_FAIL_MESSAGE');
            const job = 'SPDIF';
            nock(BASE_URL)
                .post('/jobs', {
                    file: "'SPDIF'",
                })
                .reply(400, jobSubmitterData.jobSubmitFailResponse);
            const expectedActions = [
                {
                    type: jobSubmitter.REQUEST_JOB_SUBMIT,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: new Map({
                        message: `${job} ${rewiredFailureMessage}`,
                    }),
                },
                {
                    type: jobSubmitter.RECEIVE_JOB_SUBMIT_RESPONSE,
                    success: false,
                },
            ];

            const store = mockStore();

            return store.dispatch(jobSubmitter.submitJob(job))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });
});
