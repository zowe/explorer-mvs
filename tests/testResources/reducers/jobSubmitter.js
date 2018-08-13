/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018
 */

import { Map } from 'immutable';

export const baseJobSubmitter = Map({
    requested: false,
    success: false,
    response: undefined,
});

export const submittedJob = Map({
    requested: true,
    success: false,
    response: undefined,
});

export const receivedJob = Map({
    requested: false,
    success: true,
    response: Map({
        executionClass: 'A',
        jobId: 'JOB06464',
        jobName: 'ATLJ0001',
        owner: 'JCAIN',
        status: 'ACTIVE',
        type: 'JOB',
    }),
});

export const receivedJobFailure = Map({
    requested: false,
    success: false,
    response: 'Bad Request',
});
