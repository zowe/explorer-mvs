/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import { constructAndPushMessage } from './snackbarNotifications';
import { atlasPost } from '../utilities/urlUtils';

export const REQUEST_JOB_SUBMIT = 'REQUEST_JOB_SUBMIT';
export const RECEIVE_JOB_SUBMIT_RESPONSE = 'RECEIVE_JOB_SUBMIT_RESPONSE';
export const INVALIDATE_JOB_SUBMIT = 'INVALIDATE_JOB_SUBMIT';

export const JOB_MESSAGE_TYPE = 'JOB';

const JOB_SUBMIT_SUCCESS_MESSAGE = 'Submit successful';
const JOB_SUBMIT_FAIL_MESSAGE = 'Submit failed';

function requestSubmit() {
    return {
        type: REQUEST_JOB_SUBMIT,
    };
}

function receiveRC(response) {
    return {
        type: RECEIVE_JOB_SUBMIT_RESPONSE,
        success: true,
        response,
    };
}

function invalidateSubmit() {
    return {
        type: RECEIVE_JOB_SUBMIT_RESPONSE,
        success: false,
    };
}

export function resetResponse() {
    return {
        type: INVALIDATE_JOB_SUBMIT,
    };
}

export function sendAppRequest(jobId) {
    if (window && window.parent && window.parent.ZoweZLUX) {
        const ZoweZLUX = window.parent.ZoweZLUX;
        const dispatcher = ZoweZLUX.dispatcher;
        const pluginManager = ZoweZLUX.pluginManager;
        if (pluginManager.getPlugin('org.zowe.explorer-jes')) {
            const actionTitle = 'Send message to JES explorer';
            const actionID = 'org.zowe.explorer.mvs.message';
            const argumentFormatter = { data: { op: 'deref', source: 'event', path: ['data'] } };
            const action = dispatcher.makeAction(actionID, actionTitle, 2, 3, 'org.zowe.explorer.jes', argumentFormatter);
            const argumentData = { data: { owner: '*', jobId } };
            dispatcher.invokeAction(action, argumentData);
        }
    }
}

export function submitJob(job) {
    return dispatch => {
        dispatch(requestSubmit());
        return atlasPost('jobs/dataset', JSON.stringify({ file: `'${job}'` }))
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.statusText);
            })
            .then(response => {
                dispatch(constructAndPushMessage(`${response.jobName} ${JOB_SUBMIT_SUCCESS_MESSAGE}, id=${response.jobId}`,
                    window.self !== window.top ? () => { sendAppRequest(response.jobId); } : null));
                dispatch(receiveRC(response));
            })
            .catch(() => {
                dispatch(constructAndPushMessage(`${job} ${JOB_SUBMIT_FAIL_MESSAGE}`));
                dispatch(invalidateSubmit());
            });
    };
}
