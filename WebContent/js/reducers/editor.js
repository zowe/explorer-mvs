/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2018
 */

import { Map } from 'immutable';
import {
    UPDATE_EDITOR_CHECKSUM,
    UPDATE_EDITOR_CONTENT,
    INVALIDATE_CHECKSUM,
    INVALIDATE_SAVE,
    REQUEST_SAVE,
    REQUEST_CHECKSUM,
    REQUEST_ATTRIBUTES,
    RECEIVE_ATTRIBUTES,
    INVALIDATE_CONTENT,
    REQUEST_CONTENT,
    RECEIVE_CONTENT } from '../actions/editor';

const CONTENT_UNABLE_TO_RETRIEVE_MESSAGE = 'Unable to retrieve content';

const INITIAL_EDITOR_STATE = Map({
    content: null,
    checksum: null,
    file: '',
    isFetching: false,
});


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
                checksum: action.checksum,
            });
        // TODO:: Do we need two invalidates?
        case INVALIDATE_CONTENT:
            return state.merge({
                isFetching: false,
                file: CONTENT_UNABLE_TO_RETRIEVE_MESSAGE,
                content: CONTENT_UNABLE_TO_RETRIEVE_MESSAGE,
                checksum: null,
            });
        case REQUEST_SAVE:
            return state.merge({
                file: action.file,
            });
        case REQUEST_CHECKSUM:
            return state.merge({
                file: action.file,
            });
        case UPDATE_EDITOR_CONTENT:
            return state.merge({
                content: action.content,
            });
        case UPDATE_EDITOR_CHECKSUM:
            return state.merge({
                checksum: action.checksum,
            });
        case INVALIDATE_CHECKSUM:
            return state.merge({
                checksum: null,
            });
        case INVALIDATE_SAVE:
            return state.merge({
                checksum: null,
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
