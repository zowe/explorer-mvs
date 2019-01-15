/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import { combineReducers } from 'redux-immutable';
import validation from './validation';
import treeDS from './treeDS';
import treeDatasets from './treeDatasets';
import jobSubmitter from './jobSubmitter';
import editor from './editor';
import snackbarNotifications from './snackbarNotifications';

const REDUCERS = {
    validation,
    treeDS,
    treeDatasets,
    jobSubmitter,
    editor,
    snackbarNotifications };
export default combineReducers(REDUCERS);
