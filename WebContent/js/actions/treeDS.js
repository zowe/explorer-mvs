/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import { atlasGet } from '../utilities/urlUtils';
import { constructAndPushMessage } from './snackbarNotifications';

export const REQUEST_DS_TREE_CHILDREN = 'REQUEST_DS_TREE_CHILDREN';
export const RECEIVE_DS_TREE_CHILDREN = 'RECEIVE_DS_TREE_CHILDREN';
export const INVALIDATE_DS_TREE_CHILDREN = 'INVALIDATE_DS_TREE_CHILDREN';
export const SET_DS_TREE_PATH = 'SET_DS_TREE_PATH';
export const TOGGLE_DS_TREE = 'TOGGLE_DS_TREE';
export const RESET_DS_TREE_CHILDREN = 'RESET_DS_CHILDREN';
export const REMOVE_DATASET = 'REMOVE_DATASET';
export const RENAME_DATASET = 'RENAME_DATASET';

export const DATASET_FETCH_FAIL = 'Fetch Datasets failed for';

export function toggleDSTree(isToggled) {
    return {
        type: TOGGLE_DS_TREE,
        isToggled,
    };
}

function requestDSChildren(path) {
    return {
        type: REQUEST_DS_TREE_CHILDREN,
        DSPath: path,
    };
}

function receiveDSChildren(path, childData) {
    return {
        type: RECEIVE_DS_TREE_CHILDREN,
        DSPath: path,
        childData,
    };
}

function invalidateDSChildren(path) {
    return {
        type: INVALIDATE_DS_TREE_CHILDREN,
        DSPath: path,
    };
}

export function setDSPath(path) {
    return {
        type: SET_DS_TREE_PATH,
        DSPath: path,
    };
}

export function resetDSChildren() {
    return {
        type: RESET_DS_TREE_CHILDREN,
    };
}

export function removeDataset(DSName) {
    return {
        type: REMOVE_DATASET,
        DSName,
    };
}

export function renameDataset(oldName, newName, dataSetOrganization) {
    return {
        type: RENAME_DATASET,
        dataSetOrganization,
        oldName,
        newName,
    };
}

export function fetchDatasetTreeChildren(path) {
    return dispatch => {
        dispatch(requestDSChildren(path));
        const endpoint = `datasets/${path}`;
        return atlasGet(endpoint)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.statusText);
            }).then(json => {
                dispatch(receiveDSChildren(path, json));
            }).catch(() => {
                dispatch(constructAndPushMessage(`${DATASET_FETCH_FAIL} ${path}`));
                dispatch(invalidateDSChildren(path));
            });
    };
}
