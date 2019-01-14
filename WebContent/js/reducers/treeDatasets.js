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
import * as treeDatasetsActions from '../actions/treeDatasets';

/**
 * datasets map
 *  datasetName:
 *      childData:[],
 *      isToggled:boolean,
 */

const INITIAL_TREE_DS_NODE_STATE = Map({
    datasets: Map({}),
    isFetching: false,
});

function getMembersFromJSON(childData, DSName) {
    const datasets = Map({});
    let member = Map({});
    member = member.set('childData', childData);
    member = member.set('isToggled', true);
    return datasets.set(DSName, member);
}

function updateNodeToggle(state, DSName, isToggled) {
    const dataset = Map({});
    return dataset.set(DSName, state.get('datasets').get(DSName).set('isToggled', isToggled));
}

export default function TreeDatasets(state = INITIAL_TREE_DS_NODE_STATE, action) {
    switch (action.type) {
        case treeDatasetsActions.REQUEST_TREE_DS_CHILD_MEMBERS:
            return state.set('isFetching', true);
        case treeDatasetsActions.RECEIVE_TREE_DS_CHILD_MEMBERS: {
            const newDatasets = getMembersFromJSON(action.childData, action.DSName);
            return state.mergeDeep({
                isFetching: false,
                datasets: newDatasets,
            });
        }
        case treeDatasetsActions.TOGGLE_TREE_DS_NODE: {
            const updatedDataset = updateNodeToggle(state, action.DSName, action.isToggled);
            return state.mergeDeep({
                datasets: updatedDataset,
            });
        }
        case treeDatasetsActions.INVALIDATE_TREE_DS_CHILD_MEMBERS:
            return state.set('isFetching', false);
        default:
            return state;
    }
}
