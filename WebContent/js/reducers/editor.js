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
import {
    UPDATE_EDITOR_ETAG,
    UPDATE_EDITOR_CONTENT,
    INVALIDATE_ETAG,
    INVALIDATE_SAVE,
    REQUEST_SAVE,
    REQUEST_ETAG,
    REQUEST_ATTRIBUTES,
    RECEIVE_ATTRIBUTES,
    INVALIDATE_CONTENT,
    REQUEST_CONTENT,
    RECEIVE_CONTENT,
    UPDATE_EDITOR_FILE_NAME } from '../actions/editor';

import { hasMember, parseFileName } from '../utilities/fileHelper';

const CONTENT_UNABLE_TO_RETRIEVE_MESSAGE = 'Unable to retrieve content';

const INITIAL_EDITOR_STATE = Map({
    content: null,
    etag: null,
    file: '',
    isFetching: false,
});

function updateDSName(file, newDSName) {
    return `${newDSName}(${parseFileName(file).DSMember})`;
}

export default function editor(state = INITIAL_EDITOR_STATE, action) {
    switch (action.type) {
        case REQUEST_CONTENT:
            return state.merge({
                isFetching: true,
            });
        case RECEIVE_CONTENT:
            return state.merge({
                file: action.file,
                content: action.content,
                isFetching: false,
                etag: action.etag,
            });
        // TODO:: Do we need two invalidates?
        case INVALIDATE_CONTENT:
            return state.merge({
                isFetching: false,
                file: CONTENT_UNABLE_TO_RETRIEVE_MESSAGE,
                content: CONTENT_UNABLE_TO_RETRIEVE_MESSAGE,
                etag: null,
            });
        case REQUEST_SAVE:
            return state.merge({
                file: action.file,
            });
        case REQUEST_ETAG:
            return state.merge({
                file: action.file,
            });
        case UPDATE_EDITOR_CONTENT:
            return state.merge({
                content: action.content,
            });
        case UPDATE_EDITOR_ETAG:
            return state.merge({
                etag: action.etag,
            });
        case UPDATE_EDITOR_FILE_NAME: {
            let newName = action.newName;
            const file = state.get('file');
            // Only DSName Updated
            if (hasMember(state.get('file')) && !hasMember(newName)) {
                newName = updateDSName(file, newName);
            }
            return state.merge({
                file: newName,
            });
        }
        case INVALIDATE_ETAG:
            return state.merge({
                etag: null,
            });
        case INVALIDATE_SAVE:
            return state.merge({
                etag: null,
            });
        case REQUEST_ATTRIBUTES:
            return state.set('isFetching', true);
        case RECEIVE_ATTRIBUTES: {
            return state.merge({
                attributes: action.data[0],
            });
        }
        default:
            return state;
    }
}
