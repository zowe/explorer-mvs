/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import HTTPStatusCodes from '../constants/HTTPStatusCodeConstants';
import { fetchDatasetTreeChildren, removeDataset } from './treeDS';
import { invalidateContent } from './editor';
import { atlasGet, atlasPost, atlasPut, atlasDelete } from '../utilities/urlUtils';
import { constructAndPushMessage } from './snackbarNotifications';

export const REQUEST_TREE_DS_CHILD_MEMBERS = 'REQUEST_TREE_DS_CHILD_MEMBERS';
export const RECEIVE_TREE_DS_CHILD_MEMBERS = 'RECEIVE_TREE_DS_CHILD_MEMBERS';
export const INVALIDATE_TREE_DS_CHILD_MEMBERS = 'INVALIDATE_TREE_DS_CHILD_MEMBERS';
export const TOGGLE_TREE_DS_NODE = 'TOGGLE_TREE_DS_NODE';
export const REQUEST_NEW_DATASET = 'REQUEST_NEW_DATASET';
export const RECEIVE_NEW_DATASET = 'RECEIVE_NEW_DATASET';
export const INVALIDATE_NEW_DATASET = 'INVALIDATE_NEW_DATASET';
export const REQUEST_NEW_MEMBER = 'REQUEST_NEW_MEMBER';
export const RECEIVE_NEW_MEMBER = 'RECEIVE_NEW_MEMBER';
export const INVALIDATE_NEW_MEMBER = 'INVALIDATE_NEW_MEMBER';
export const REQUEST_ALLOCATE_LIKE = 'REQUEST_ALLOCATE_LIKE';
export const RECEIVE_ALLOCATE_LIKE = 'RECEIVE_ALLOCATE_LIKE';
export const INVALIDATE_ALLOCATE_LIKE = 'INVALIDATE_ALLOCATE_LIKE';
export const REQUEST_DELETE_DATASET = 'REQUEST_DELETE_DATASET';
export const RECEIVE_DELETE_DATASET = 'RECEIVE_DELETE_DATASET';
export const INVALIDATE_DELETE_DATASET = 'INVALIDATE_DELETE_DATASET';

export const UNAUTHORIZED_MESSAGE = 'UNAUTHORIZED';

const DATASET_CREATE_SUCCESS_MESSAGE = 'Create successful for';
const DATASET_CREATE_FAIL_MESSAGE = 'Create failed for';
const DATASET_DELETE_SUCCESS_MESSAGE = 'Delete successful for';
const DATASET_DELETE_FAIL_MESSAGE = 'Delete failed for';

const DATASET_FETCH_MEMBERS_FAIL = 'Fetch members failed for';

function requestChildMembers(DSName) {
    return {
        type: REQUEST_TREE_DS_CHILD_MEMBERS,
        DSName,
    };
}

function receiveChildMembers(DSName, childData) {
    return {
        type: RECEIVE_TREE_DS_CHILD_MEMBERS,
        DSName,
        childData,
    };
}

function invalidateMembers() {
    return {
        type: INVALIDATE_TREE_DS_CHILD_MEMBERS,
    };
}

export function toggleDSNode(DSName, isToggled) {
    return {
        type: TOGGLE_TREE_DS_NODE,
        DSName,
        isToggled,
    };
}

function requestNewDataset(DSProperties) {
    return {
        type: REQUEST_NEW_DATASET,
        DSProperties,
    };
}

function receiveNewDataset(DSProperties) {
    return {
        type: RECEIVE_NEW_DATASET,
        DSProperties,
    };
}

function invalidateNewDataset(DSProperties) {
    return {
        type: INVALIDATE_NEW_DATASET,
        DSProperties,
    };
}

function requestNewMember(DSName, member) {
    return {
        type: REQUEST_NEW_MEMBER,
        DSName,
        member,
    };
}

function receiveNewMember(DSName, member) {
    return {
        type: RECEIVE_NEW_MEMBER,
        DSName,
        member,
    };
}

function invalidateCreateNewMember(DSName, member) {
    return {
        type: INVALIDATE_NEW_MEMBER,
        DSName,
        member,
    };
}

function requestDeleteDataset(DSName) {
    return {
        type: REQUEST_DELETE_DATASET,
        DSName,
    };
}

function receiveDeleteDataset(DSName) {
    return {
        type: RECEIVE_DELETE_DATASET,
        DSName,
    };
}

function invalidateDeleteDataset(DSName) {
    return {
        type: INVALIDATE_DELETE_DATASET,
        DSName,
    };
}

export function createDataset(DSProperties, path) {
    const name = DSProperties.get('name');
    return dispatch => {
        dispatch(requestNewDataset(DSProperties));
        return atlasPost('datasets', JSON.stringify(DSProperties)).then(response => {
            if (response.ok) {
                return response.text();
            }
            throw Error(response.statusText);
        }).then(() => {
            dispatch(constructAndPushMessage(`${DATASET_CREATE_SUCCESS_MESSAGE} ${name}`));
            dispatch(receiveNewDataset(DSProperties));
        }).then(() => {
            // Now refresh the dataset tree
            return dispatch(fetchDatasetTreeChildren(path));
        })
            .catch(() => {
                dispatch(constructAndPushMessage(`${DATASET_CREATE_FAIL_MESSAGE} ${name}`));
                dispatch(invalidateNewDataset(DSProperties));
            });
    };
}

export function fetchDSMembers(DSName) {
    return dispatch => {
        dispatch(requestChildMembers(DSName));
        return atlasGet(`datasets/${encodeURIComponent(DSName)}/members`).then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === HTTPStatusCodes.Forbidden) {
                throw Error(UNAUTHORIZED_MESSAGE);
            }
            throw Error(response.statusText);
        }).then(json => {
            dispatch(receiveChildMembers(DSName, json));
        }).catch(response => {
            if (response.message === UNAUTHORIZED_MESSAGE) {
                dispatch(receiveChildMembers(DSName, [UNAUTHORIZED_MESSAGE]));
            } else {
                dispatch(constructAndPushMessage(`${DATASET_FETCH_MEMBERS_FAIL} ${DSName}`));
                dispatch(invalidateMembers());
            }
        });
    };
}

export function createMember(DSName, member) {
    return dispatch => {
        dispatch(requestNewMember(DSName, member));
        return atlasPut(`datasets/${encodeURIComponent(DSName)}(${encodeURIComponent(member)})/content`, '')
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw Error(response.statusText);
            }).then(() => {
                dispatch(constructAndPushMessage(`${DATASET_CREATE_SUCCESS_MESSAGE} ${DSName}(${member})`));
                dispatch(receiveNewMember(DSName, member));
            }).then(() => {
            // Now refresh the datasets members
                return dispatch(fetchDSMembers(DSName));
            })
            .catch(() => {
                dispatch(constructAndPushMessage(`${DATASET_CREATE_FAIL_MESSAGE} ${DSName}(${member})`));
                dispatch(invalidateCreateNewMember(DSName, member));
            });
    };
}

function isDatasetMember(DSName) {
    return DSName.includes('(');
}

function cleanupStateAfterDelete(DSName, isOpenInViewer) {
    return dispatch => {
        // Now refresh the datasets members
        if (isDatasetMember(DSName)) {
            dispatch(fetchDSMembers(DSName.substring(0, DSName.indexOf('('))));
        }
        dispatch(removeDataset(DSName));
        // If we're deleting something that's open in the content viewer we need to close it
        if (isOpenInViewer) {
            dispatch(invalidateContent());
        }
    };
}

export function deleteDataset(DSName, isOpenInViewer) {
    return dispatch => {
        dispatch(requestDeleteDataset(DSName));
        return atlasDelete(`datasets/${encodeURIComponent(DSName)}`).then(response => {
            if (response.ok) {
                return response.text();
            }
            throw Error(response.statusText);
        }).then(() => {
            dispatch(constructAndPushMessage(`${DATASET_DELETE_SUCCESS_MESSAGE} ${DSName}`));
            dispatch(receiveDeleteDataset(DSName));
        }).then(() => {
            dispatch(cleanupStateAfterDelete(DSName, isOpenInViewer));
        })
            .catch(() => {
                dispatch(constructAndPushMessage(`${DATASET_DELETE_FAIL_MESSAGE} ${DSName}`));
                dispatch(invalidateDeleteDataset(DSName));
            });
    };
}
