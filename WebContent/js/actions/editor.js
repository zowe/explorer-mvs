/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2018
 */

import { fetchDatasetTreeChildren } from './treeDS';
import { fetchDSMembers } from '../actions/treeDatasets';
import { atlasGet, atlasPut, atlasPost, encodeURLComponent } from '../utilities/urlUtils';
import { constructAndPushMessage } from './snackbarNotifications';

export const REQUEST_CONTENT = 'REQUEST_CONTENT';
export const RECEIVE_CONTENT = 'RECEIVE_CONTENT';
export const INVALIDATE_CONTENT = 'INVALIDATE_CONTENT';
export const UPDATE_EDITOR_CONTENT = 'UPDATE_EDITOR_CONTENT';
export const UPDATE_EDITOR_CHECKSUM = 'UPDATE_EDITOR_CHECKSUM';
export const INVALIDATE_CHECKSUM = 'INVALIDATE_CHECKSUM';
export const INVALIDATE_SAVE = 'INVALIDATE_SAVE';
export const INVALIDATE_SAVE_AS = 'INVALIDATE_SAVE_AS';
export const REQUEST_SAVE = 'REQUEST_SAVE';
export const REQUEST_SAVE_AS = 'REQUEST_SAVE_AS';
export const REQUEST_SAVE_AS_MEMBER = 'REQUEST_SAVE_AS_MEMBER';
export const RECEIVE_SAVE = 'RECEIVE_SAVE';
export const REQUEST_CHECKSUM = 'REQUEST_CHECKSUM';
export const RECEIVE_CHECKSUM = 'RECEIVE_CHECKSUM';
export const SET_FULLSCREEN = 'SET_FULLSCREEN';
export const SET_NOT_FULLSCREEN = 'SET_NOT_FULLSCREEN';
export const REQUEST_ATTRIBUTES = 'REQUEST_ATTRIBUTES';
export const RECEIVE_ATTRIBUTES = 'RECEIVE_ATTRIBUTES';

const SAVE_FAIL_MESSAGE = 'Save failed for';
const SAVE_SUCCESS_MESSAGE = 'Save success for';
const GET_CONTENT_FAIL_MESSAGE = 'Get content failed for';

function requestDSContent(file) {
    return {
        type: REQUEST_CONTENT,
        file,
    };
}

function receiveDSContent(file, content) { // , checksum) {
    return {
        type: RECEIVE_CONTENT,
        file,
        content,
        //        checksum,
    };
}

export function invalidateContent() {
    return {
        type: INVALIDATE_CONTENT,
    };
}

export function fetchDS(file) {
    return dispatch => {
        dispatch(requestDSContent(file));
        const endpoint = `datasets/${encodeURIComponent(file)}/content`;
        return atlasGet(endpoint, { })
            .then(response => { return response.json(); })
            .then(json => {
                return dispatch(receiveDSContent(file, json.records, json.checksum));
            })
            .catch(() => {
                dispatch(constructAndPushMessage(`${GET_CONTENT_FAIL_MESSAGE} ${file}`));
                return dispatch(invalidateContent());
            });
    };
}

export function updateEditorContent(content) {
    return {
        type: UPDATE_EDITOR_CONTENT,
        content,
    };
}

// function requestChecksum(file) {
//     return {
//         type: REQUEST_CHECKSUM,
//         file,
//     };
// }

// function receiveChecksum(file) {
//     return {
//         type: RECEIVE_CHECKSUM,
//         file,
//     };
// }

export function updateEditorChecksum(checksum) {
    return {
        type: UPDATE_EDITOR_CHECKSUM,
        checksum,
    };
}

// function invalidateChecksumChange() {
//     return {
//         type: INVALIDATE_CHECKSUM,
//     };
// }

// function getNewDatasetChecksum(file) {
//     return dispatch => {
//         dispatch(requestChecksum(file));
//         const endpoint = `datasets/${encodeURLComponent(file)}/content`;
//         const requestBody = { credentials: 'include' };
//         return atlasFetch(endpoint, requestBody).then(response => {
//             if (response.ok) {
//                 dispatch(receiveChecksum(file));
//                 return response.json();
//             }
//             throw Error(response.statusText);
//         }).then(json => {
//             dispatch(updateEditorChecksum(json.checksum));
//         }).catch(() => {
//             dispatch(invalidateChecksumChange());
//         });
//     };
// }

function requestSave(file) {
    return {
        type: REQUEST_SAVE,
        file,
    };
}

function receiveSave(file) {
    return {
        type: RECEIVE_SAVE,
        file,
    };
}

function invalidateSave() {
    return {
        type: INVALIDATE_SAVE,
    };
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function encodeContentString(content) {
    let newContent = replaceAll(content, /\\/, '\\\\'); // Escape backslashes
    newContent = replaceAll(newContent, /"/, '\\"'); // Escape double quotes
    // The new server interface is unable to accept steings with hex values
    newContent = replaceAll(newContent, '\x0a', '\\n'); // Escape line feed
    newContent = replaceAll(newContent, '\x0d', '\\r'); // Escape return
    newContent = replaceAll(newContent, '\x09', '\\t'); // Escape tab
    return newContent;
}

export function saveDataset(file, content) {
    return dispatch => {
        dispatch(requestSave(file));
        const endpoint = `datasets/${encodeURLComponent(file)}/content`;
        return atlasPut(endpoint, `${encodeContentString(content)}`).then(response => {
        // return atlasPut(endpoint, encodeContentString(content), null).then(response => {
            if (response.ok) {
                dispatch(constructAndPushMessage(`${SAVE_SUCCESS_MESSAGE} ${file}`));
                return dispatch(receiveSave(file));
            }
            throw Error(response.statusText);
        // }).then(() => {
        //     dispatch(getNewDatasetChecksum(file));
        }).catch(response => {
            dispatch(constructAndPushMessage(`${SAVE_FAIL_MESSAGE} ${file}`));
            dispatch(invalidateSave(response));
        });
    };
}

function requestSaveAs(newName) {
    return {
        type: REQUEST_SAVE_AS,
        newName,
    };
}

function invalidateSaveAs() {
    return {
        type: INVALIDATE_SAVE_AS,
    };
}

export function saveAsDataset(file, newFile, newContent) {
    return dispatch => {
        dispatch(requestSaveAs(file, newFile));
        return atlasPost(`datasets/${newFile}`,
            `{"basedsn": "${file}", "records": "${encodeContentString(newContent)}"}`, null)
            .then(response => {
                if (response.ok) {
                    dispatch(constructAndPushMessage(`${SAVE_SUCCESS_MESSAGE} ${file}`));
                    return dispatch(receiveSave(newFile));
                }
                throw response;
            }).then(() => {
                dispatch(fetchDatasetTreeChildren(newFile));
                dispatch(fetchDS(newFile));
            })
            .catch(response => {
                return response.text().then(textResponse => {
                    dispatch(constructAndPushMessage(`${SAVE_FAIL_MESSAGE} ${file}`));
                    dispatch(invalidateSaveAs(textResponse));
                });
            });
    };
}

export function saveAsDatasetMember(DSName, newDSMember, newContent) {
    return dispatch => {
        const newDS = `${DSName}(${newDSMember})`;
        dispatch(requestSaveAs(newDS));
        return atlasPut(`datasets/${newDS}/content`, encodeContentString(newContent), null).then(response => {
            if (response.ok) {
                dispatch(constructAndPushMessage(`${SAVE_SUCCESS_MESSAGE} ${newDS}`));
                return dispatch(receiveSave(newDS));
            }
            throw response;
        }).then(() => {
            dispatch(fetchDSMembers(DSName));
            dispatch(fetchDS(newDS));
        })
            .catch(response => {
                return response.text().then(textResponse => {
                    dispatch(constructAndPushMessage(`${SAVE_FAIL_MESSAGE} ${newDS}`));
                    dispatch(invalidateSaveAs(textResponse));
                });
            });
    };
}

function requestDSAttributes(path) {
    return {
        type: REQUEST_ATTRIBUTES,
        DSPath: path,
    };
}

function receiveDSAttributes(path, data) {
    return {
        type: RECEIVE_ATTRIBUTES,
        DSPath: path,
        data,
    };
}

export function fetchDatasetAttributes(path) {
    return dispatch => {
        dispatch(requestDSAttributes(path));
        const contentURL = `datasets/${encodeURIComponent(path)}`;
        return atlasGet(contentURL).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw Error(response.statusText);
        }).then(data => {
            dispatch(receiveDSAttributes(path, data));
        });
    };
}
