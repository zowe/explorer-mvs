/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018
 */

import expect from 'expect';
import tree from '../../WebContent/js/reducers/treeDS';
import * as treeActions from '../../WebContent/js/actions/treeDS';
import * as treeResources from '../testResources/reducers/treeDS';

describe('Reducer: treeDS', () => {
    it('Should return the INITIAL_TREE_STATE', () => {
        expect(tree(undefined, {})).toEqual(treeResources.baseTree);
    });

    it('Should handle SET_DS_TREE_PATH and update the path for DS', () => {
        const action = {
            type: treeActions.SET_DS_TREE_PATH,
            DSPath: treeResources.DSPathSetTree.get('DSPath'),
        };
        expect(tree(treeResources.baseTree, action)).toEqual(treeResources.DSPathSetTree);
    });

    it("Should handle SET_DS_TREE_PATH and update the path back to ''", () => {
        const action = {
            type: treeActions.SET_DS_TREE_PATH,
            DSPath: treeResources.baseTree.get('DSPath'),
        };
        expect(tree(treeResources.DSPathSetTree, action)).toEqual(treeResources.baseTree);
    });

    it('Should handle TOGGLE_DS_TREE and set isToggled to true', () => {
        const action = {
            type: treeActions.TOGGLE_DS_TREE,
            isToggled: true,
        };
        expect(tree(treeResources.baseTree, action)).toEqual(treeResources.toggledTree);
    });

    it('Should handle TOGGLE_DS_TREE and set isToggled to true', () => {
        const action = {
            type: treeActions.TOGGLE_DS_TREE,
            isToggled: false,
        };
        expect(tree(treeResources.toggledTree, action)).toEqual(treeResources.baseTree);
    });

    it('Should handle REQUEST_DS_TREE_CHILDREN and set isFetching to true', () => {
        const action = {
            type: treeActions.REQUEST_DS_TREE_CHILDREN,
        };
        expect(tree(treeResources.DSPathSetTree, action)).toEqual(treeResources.requestedChildrenTree);
    });

    it('Should handle RECEIVE_DS_TREE_CHILDREN, process child data isToggled to true and isFetching to false', () => {
        const action = {
            type: treeActions.RECEIVE_DS_TREE_CHILDREN,
            childData: treeResources.DSChildData,
        };
        expect(tree(treeResources.DSPathSetTree, action)).toEqual(treeResources.receivedDSChildrenTree);
    });

    it('Should handle RESET_DS_TREE_CHILDREN and return to the initial state from DS', () => {
        const action = {
            type: treeActions.RESET_DS_TREE_CHILDREN,
        };
        expect(tree(treeResources.receivedDSChildrenTree, action)).toEqual(treeResources.restDSChildren);
    });

    it('Should handle REMOVE_DATASET and remove the specified dataset', () => {
        const DSName = 'ATLAS.TEST.JCL';
        const action = {
            type: treeActions.REMOVE_DATASET,
            DSName,
        };
        expect(tree(treeResources.receivedDSChildrenForDelete, action)).toEqual(treeResources.receivedDSChildrenAfterDelete);
    });

    it('Should handle REMOVE_DATASET and not remove anything due to not found', () => {
        const DSName = 'ATLAS.TEST.PCL';
        const action = {
            type: treeActions.REMOVE_DATASET,
            DSName,
        };
        expect(tree(treeResources.receivedDSChildrenForDelete, action)).toEqual(treeResources.receivedDSChildrenForDelete);
    });
});
