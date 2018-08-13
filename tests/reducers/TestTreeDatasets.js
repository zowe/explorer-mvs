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
import treeDatasets from '../../WebContent/js/reducers/treeDatasets';
import * as treeDatasetsActions from '../../WebContent/js/actions/treeDatasets';
import * as treeDatasetsResources from '../testResources/reducers/treeDatasets';

describe('Reducer treeDatasets', () => {
    it('Should return the INITIAL_TREE_DS_NODE_STATE', () => {
        expect(treeDatasets(undefined, {})).toEqual(treeDatasetsResources.baseTreeDatasets);
    });

    it('Should handle REQUEST_TREE_DS_CHILD_MEMBERS and set isFetching to true', () => {
        const action = {
            type: treeDatasetsActions.REQUEST_TREE_DS_CHILD_MEMBERS,
        };
        expect(treeDatasets(treeDatasetsResources.baseTreeDatasets, action)).toEqual(treeDatasetsResources.requestedTreeDatasets);
    });

    it('Should handle RECEIVE_TREE_DS_CHILD_MEMBERS, set isFetching to false and handle child data', () => {
        const action = {
            type: treeDatasetsActions.RECEIVE_TREE_DS_CHILD_MEMBERS,
            childData: treeDatasetsResources.treeDatasetsChildData,
            DSName: treeDatasetsResources.treeDatasetsDSName,
        };
        expect(treeDatasets(treeDatasetsResources.requestedTreeDatasets, action)).toEqual(treeDatasetsResources.receivedTreeDatasets);
    });

    it('Should handle RECEIVE_TREE_DS_CHILD_MEMBERS, set isFetching to false and handle empty child data', () => {
        const action = {
            type: treeDatasetsActions.RECEIVE_TREE_DS_CHILD_MEMBERS,
            childData: [],
            DSName: treeDatasetsResources.treeDatasetsDSName,
        };
        expect(treeDatasets(treeDatasetsResources.requestedTreeDatasets, action)).toEqual(treeDatasetsResources.noChildrenReceivedTreeDatasets);
    });

    it('Should handle RECEIVE_TREE_DS_CHILD_MEMBERS, set isFetching to false and handle child data without interfering with other child data', () => {
        const action = {
            type: treeDatasetsActions.RECEIVE_TREE_DS_CHILD_MEMBERS,
            childData: treeDatasetsResources.treeDatasetsChildData2,
            DSName: treeDatasetsResources.treeDatasetsDSName2,
        };
        expect(treeDatasets(treeDatasetsResources.receivedTreeDatasets, action)).toEqual(treeDatasetsResources.received2TreeDatasets);
    });

    it('Should handle TOGGLE_TREE_DS_NODE and update the appropriate node to false', () => {
        const action = {
            type: treeDatasetsActions.TOGGLE_TREE_DS_NODE,
            isToggled: false,
            DSName: treeDatasetsResources.treeDatasetsDSName,
        };
        expect(treeDatasets(treeDatasetsResources.receivedTreeDatasets, action)).toEqual(treeDatasetsResources.untoggledReceivedTreeDatasets);
    });

    it('Should handle TOGGLE_TREE_DS_NODE and update the appropriate node to true', () => {
        const action = {
            type: treeDatasetsActions.TOGGLE_TREE_DS_NODE,
            isToggled: true,
            DSName: treeDatasetsResources.treeDatasetsDSName,
        };
        expect(treeDatasets(treeDatasetsResources.untoggledReceivedTreeDatasets, action)).toEqual(treeDatasetsResources.receivedTreeDatasets);
    });

    it('Should handle TOGGLE_TREE_DS_NODE and update the appropriate node to false with multiple children', () => {
        const action = {
            type: treeDatasetsActions.TOGGLE_TREE_DS_NODE,
            isToggled: false,
            DSName: treeDatasetsResources.treeDatasetsDSName,
        };
        expect(treeDatasets(treeDatasetsResources.received2TreeDatasets, action)).toEqual(treeDatasetsResources.toggledReceived2TreeDatasets);
    });

    it('Should handle INVALIDATE_TREE_DS_CHILD_MEMBERS', () => {
        const action = {
            type: treeDatasetsActions.INVALIDATE_TREE_DS_CHILD_MEMBERS,
        };
        expect(treeDatasets(treeDatasetsResources.requestedTreeDatasets, action)).toEqual(treeDatasetsResources.baseTreeDatasets);
    });
});
