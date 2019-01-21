/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import { Map } from 'immutable';
import { REQUEST_JOB_SUBMIT, RECEIVE_JOB_SUBMIT_RESPONSE, INVALIDATE_JOB_SUBMIT } from '../actions/jobSubmitter';

const INITIAL_SUBMIT_STATE = Map({
    requested: false,
    success: false,
    response: undefined,
});

export default function content(state = INITIAL_SUBMIT_STATE, action) {
    switch (action.type) {
        case REQUEST_JOB_SUBMIT:
            return state.set('requested', true);
        case RECEIVE_JOB_SUBMIT_RESPONSE:
            return state.merge({
                requested: false,
                response: action.response,
                success: action.success,
            });
        case INVALIDATE_JOB_SUBMIT:
            return INITIAL_SUBMIT_STATE;
        default:
            return state;
    }
}
