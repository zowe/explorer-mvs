/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

import expect from 'expect';
import { Map } from 'immutable';
import editor from '../../WebContent/js/reducers/editor';
import * as editorActions from '../../WebContent/js/actions/editor';
import * as editorResources from '../testResources/reducers/editor';
import * as treeResources from '../testResources/reducers/treeDS';

describe('Reducer: editor', () => {
    it('Should return the initial state', () => {
        expect(editor(undefined, {})).toEqual(editorResources.baseEditor);
    });

    it('Should handle REQUEST_CONTENT', () => {
        const action = { type: editorActions.REQUEST_CONTENT };
        expect(editor(editorResources.baseContent, action)).toEqual(editorResources.requestedContent);
    });

    it('Should handle RECEIVE_CONTENT', () => {
        const action = {
            type: editorActions.RECEIVE_CONTENT,
            file: editorResources.receivedContent.get('file'),
            content: editorResources.receivedContent.get('content'),
            etag: editorResources.receivedContent.get('etag'),
        };
        expect(editor(editorResources.baseContent, action)).toEqual(editorResources.receivedContent);
    });

    it('Should handle INVALIDATE_CONTENT with baseContent', () => {
        const action = { type: editorActions.INVALIDATE_CONTENT };
        expect(editor(editorResources.baseContent, action)).toEqual(editorResources.invalidatedContent);
    });


    it('Should handle INVALIDATE_CONTENT with ReceivedContent', () => {
        const action = { type: editorActions.INVALIDATE_CONTENT };
        expect(editor(editorResources.receivedContent, action)).toEqual(editorResources.invalidatedContent);
    });

    it('Should handle UPDATE_EDITOR_CONTENT', () => {
        const action = {
            type: editorActions.UPDATE_EDITOR_CONTENT,
            content: editorResources.newContent,
        };
        expect(editor(editorResources.receivedContent, action)).toEqual(editorResources.newContentEditor);
    });

    it('Should handle UPDATE_EDITOR_ETAG', () => {
        const action = {
            type: editorActions.UPDATE_EDITOR_ETAG,
            etag: editorResources.newEtag,
        };
        expect(editor(editorResources.receivedContent, action)).toEqual(editorResources.newEtagEditor);
    });

    it('Should handle UPDATE_EDITOR_FILE_NAME DSMember', () => {
        const action = {
            type: editorActions.UPDATE_EDITOR_FILE_NAME,
            newName: editorResources.renameDSMember,
        };
        expect(editor(editorResources.receivedContent, action)).toEqual(editorResources.afterRenameDSMember);
    });

    it('Should handle UPDATE_EDITOR_FILE_NAME DSName Only', () => {
        const action = {
            type: editorActions.UPDATE_EDITOR_FILE_NAME,
            newName: editorResources.renameDS,
        };
        expect(editor(editorResources.receivedContent, action)).toEqual(editorResources.afterRenameDSName);
    });

    it('Should handle UPDATE_EDITOR_FILE_NAME DSName Seq', () => {
        const action = {
            type: editorActions.UPDATE_EDITOR_FILE_NAME,
            newName: editorResources.renameDSSeq,
        };
        expect(editor(editorResources.receivedSeqContent, action)).toEqual(editorResources.renameSeqContent);
    });

    it('Should handle INVALIDATE_ETAG', () => {
        const action = { type: editorActions.INVALIDATE_ETAG };
        expect(editor(editorResources.receivedContent, action)).toEqual(editorResources.invalidatedEtagEditor);
    });

    it('Should handle INVALIDATE_SAVE', () => {
        const action = {
            type: editorActions.INVALIDATE_SAVE,
            message: new Map({
                messageType: editorActions.EDITOR_MESSAGE_TYPE,
                message: `${editorActions.SAVE_FAILURE_MESSAGE}: Precondition failed`,
            }),
        };
        expect(editor(editorResources.receivedContent, action)).toEqual(editorResources.invalidatedSaveEditor);
    });

    it('Should handle REQUEST_ATTRIBUTES and set isFetching to true', () => {
        const action = {
            type: editorActions.REQUEST_ATTRIBUTES,
        };
        expect(editor(editorResources.requestDataset, action)).toEqual(editorResources.requestedDatasetAttributes);
    });

    it('Should handle RECEIVE_ATTRIBUTES, process child data isToggled to true and isFetching to false', () => {
        const action = {
            type: editorActions.RECEIVE_ATTRIBUTES,
            data: treeResources.DSChildData.items.slice(1),
        };
        expect(editor(editorResources.requestDataset, action)).toEqual(editorResources.recievedDatasetAttributes);
    });
});
