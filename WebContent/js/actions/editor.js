/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import { fetchDatasetTreeChildren } from './treeDS';
import { fetchDSMembers } from '../actions/treeDatasets';
import { atlasGet, atlasPut, atlasPost, encodeURLComponent } from '../utilities/urlUtils';
import { constructAndPushMessage } from './snackbarNotifications';
import { checkForValidationFailure } from './validation';

export const REQUEST_CONTENT = 'REQUEST_CONTENT';
export const RECEIVE_CONTENT = 'RECEIVE_CONTENT';
export const INVALIDATE_CONTENT = 'INVALIDATE_CONTENT';
export const UPDATE_EDITOR_CONTENT = 'UPDATE_EDITOR_CONTENT';
export const UPDATE_EDITOR_FILE_NAME = 'UPDATE_EDITOR_FILE_NAME';
export const UPDATE_EDITOR_ETAG = 'UPDATE_EDITOR_ETAG';
export const INVALIDATE_ETAG = 'INVALIDATE_ETAG';
export const INVALIDATE_SAVE = 'INVALIDATE_SAVE';
export const INVALIDATE_SAVE_AS = 'INVALIDATE_SAVE_AS';
export const REQUEST_SAVE = 'REQUEST_SAVE';
export const REQUEST_SAVE_AS = 'REQUEST_SAVE_AS';
export const REQUEST_SAVE_AS_MEMBER = 'REQUEST_SAVE_AS_MEMBER';
export const RECEIVE_SAVE = 'RECEIVE_SAVE';
export const REQUEST_ETAG = 'REQUEST_ETAG';
export const RECEIVE_ETAG = 'RECEIVE_ETAG';
export const SET_FULLSCREEN = 'SET_FULLSCREEN';
export const SET_NOT_FULLSCREEN = 'SET_NOT_FULLSCREEN';
export const REQUEST_ATTRIBUTES = 'REQUEST_ATTRIBUTES';
export const RECEIVE_ATTRIBUTES = 'RECEIVE_ATTRIBUTES';

const SAVE_FAIL_MESSAGE = 'Save failed for';
const SAVE_SUCCESS_MESSAGE = 'Save success for';
const GET_CONTENT_FAIL_MESSAGE = 'Get content failed for';

export function makeRecordsFromContent(content) {
    return `${content}`;
}

function requestDSContent(file) {
    return {
        type: REQUEST_CONTENT,
        file,
    };
}

function receiveDSContent(file, content, etag) {
    return {
        type: RECEIVE_CONTENT,
        file,
        content,
        etag,
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
        const endpoint = `/restfiles/ds/${encodeURIComponent(file)}`;
        let etag;
        return atlasGet(endpoint, {})
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(resp => {
                        throw Error(resp.message);
                    });
                }

                etag = response.headers.get('etag');
                return response;
            })
            .then(response => {
                return response.text();
            })
            .then(text => {
                return dispatch(receiveDSContent(file, text, etag));
            })
            .catch(err => {
                let { message } = err;
                if (!message || message === '') {
                    message = GET_CONTENT_FAIL_MESSAGE;
                }

                dispatch(constructAndPushMessage(`${message} ${file}`));
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

function requestEtag(file) {
    return {
        type: REQUEST_ETAG,
        file,
    };
}

function receiveEtag(file) {
    return {
        type: RECEIVE_ETAG,
        file,
    };
}

export function updateEditorEtag(etag) {
    return {
        type: UPDATE_EDITOR_ETAG,
        etag,
    };
}

export function updateEditorFileName(newName) {
    return {
        type: UPDATE_EDITOR_FILE_NAME,
        newName,
    };
}

function invalidateEtagChange() {
    return {
        type: INVALIDATE_ETAG,
    };
}

function getNewDatasetEtag(file) {
    return dispatch => {
        dispatch(requestEtag(file));
        const endpoint = `/restfiles/ds/${encodeURLComponent(file)}`;
        return atlasGet(endpoint)
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                if (response.ok) {
                    dispatch(receiveEtag(file));
                    return response.headers.get('etag');
                }
                throw Error(response.statusText);
            }).then(etag => {
                dispatch(updateEditorEtag(etag));
            })
            .catch(() => {
                dispatch(invalidateEtagChange());
            });
    };
}

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

export function saveDataset(file, content, etag) {
    return dispatch => {
        dispatch(requestSave(file));
        const endpoint = `/restfiles/ds/${encodeURLComponent(file)}`;
        return atlasPut(endpoint, makeRecordsFromContent(content), etag)
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                if (response.ok) {
                    dispatch(constructAndPushMessage(`${SAVE_SUCCESS_MESSAGE} ${file}`));
                    return dispatch(receiveSave(file));
                }
                if (response.status !== 412) { // Precondition failed (usually etag invalid) so don't enable save
                    dispatch(invalidateSave(response));
                }
                throw Error(response.statusText);
            }).then(() => {
                dispatch(getNewDatasetEtag(file));
            })
            .catch(() => {
                dispatch(constructAndPushMessage(`${SAVE_FAIL_MESSAGE} ${file}`));
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

/* Disabling this code as we do not support Saving As DataSet functionality in MVS explorer
export function saveAsDataset(file, newFile, newContent) {
    return dispatch => {
        dispatch(requestSaveAs(file, newFile));
        return atlasPost(`/restfiles/ds/${newFile}`,
            `{"basedsn": "${file}", "records": "${newContent}"}`)
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
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
*/

export function saveAsDatasetMember(DSName, newDSMember, newContent) {
    return dispatch => {
        const newDS = `${DSName}(${newDSMember})`;
        dispatch(requestSaveAs(newDS));
        return atlasPut(`/restfiles/ds/${newDS}`, makeRecordsFromContent(newContent), null)
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
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
        const contentURL = `/restfiles/ds/${encodeURIComponent(path)}`;
        return atlasGet(contentURL)
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.statusText);
            }).then(data => {
                dispatch(receiveDSAttributes(path, data));
            });
    };
}
