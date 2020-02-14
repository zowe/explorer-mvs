/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

import expect from 'expect';
import { Map } from 'immutable';
import jobSubmitter from '../../../WebContent/js/reducers/jobSubmitter';
import * as jobSubmitterActions from '../../../WebContent/js/actions/jobSubmitter';
import * as jobSubmitterResources from '../testResources/reducers/jobSubmitter';

describe('Reducer: jobSubmitter', () => {
    it('Should return the INITIAL_SUBMIT_STATE', () => {
        expect(jobSubmitter(undefined, {})).toEqual(jobSubmitterResources.baseJobSubmitter);
    });

    it('Should handle REQUEST_JOB_SUBMIT and set requested to true', () => {
        const action = { type: jobSubmitterActions.REQUEST_JOB_SUBMIT };
        expect(jobSubmitter(jobSubmitterResources.baseJobSubmitter, action)).toEqual(jobSubmitterResources.submittedJob);
    });

    it('Should handle RECEIVE_JOB_SUBMIT_RESPONSE, set requested to false, success to true and update response', () => {
        const action = {
            type: jobSubmitterActions.RECEIVE_JOB_SUBMIT_RESPONSE,
            success: true,
            response: jobSubmitterResources.receivedJob.get('response'),
            message: new Map({
                message: `${jobSubmitterResources.receivedJob.get('response').get('jobName')} Submitted, id=${jobSubmitterResources.receivedJob.get('response').get('jobId')}`,
                messageType: jobSubmitterActions.JOB_MESSAGE_TYPE,
                messageLink: `/#/filterJobs?owner=${jobSubmitterResources.receivedJob.get('response').get('owner')}` +
                                `&jobName=${jobSubmitterResources.receivedJob.get('response').get('jobName')}`,
            }),
        };
        expect(jobSubmitter(jobSubmitterResources.submittedJob, action)).toEqual(jobSubmitterResources.receivedJob);
    });

    it('Should handle RECEIVE_JOB_SUBMIT_RESPONSE, set requested and success to false and update response with bad request', () => {
        const action = {
            type: jobSubmitterActions.RECEIVE_JOB_SUBMIT_RESPONSE,
            success: false,
            response: jobSubmitterResources.receivedJobFailure.get('response'),
            message: new Map({
                message: 'Bad Request',
                messageType: jobSubmitterActions.JOB_MESSAGE_TYPE,
            }),
        };
        expect(jobSubmitter(jobSubmitterResources.submittedJob, action)).toEqual(jobSubmitterResources.receivedJobFailure);
    });

    it('Should handle INVALIDATE_JOB_SUBMIT and set state back to the initial state', () => {
        const action = { type: jobSubmitterActions.INVALIDATE_JOB_SUBMIT };
        expect(jobSubmitter(jobSubmitterResources.submittedJob, action)).toEqual(jobSubmitterResources.baseJobSubmitter);
    });
});
