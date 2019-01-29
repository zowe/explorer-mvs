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
    REQUEST_DS_TREE_CHILDREN,
    RECEIVE_DS_TREE_CHILDREN,
    SET_DS_TREE_PATH,
    RESET_DS_TREE_CHILDREN,
    REMOVE_DATASET,
    INVALIDATE_DS_TREE_CHILDREN } from '../actions/treeDS';

export const ROOT_TREE_ID = 'treeDS';
const INITIAL_TREE_STATE = Map({
    id: ROOT_TREE_ID,
    DSChildren: Map({}),
    isFetching: false,
    DSPath: '',
});

function getDSChildrenFromJSON(childData) {
    let children = Map({});
    childData.forEach(child => {
        // If dataSetOrganization is undefined we dont want to display as it's just the root qualifier
        if (child.dataSetOrganization) {
            children = children.set(child.name, child.dataSetOrganization);
        }
    });
    return children;
}

export default function treeDS(state = INITIAL_TREE_STATE, action) {
    switch (action.type) {
        case SET_DS_TREE_PATH:
            return state.set('DSPath', action.DSPath);
        case REQUEST_DS_TREE_CHILDREN:
            return state.set('isFetching', true);
        case RECEIVE_DS_TREE_CHILDREN: {
            const children = getDSChildrenFromJSON(action.childData);
            return state.mergeDeep({
                isFetching: false,
                DSChildren: children,
            });
        }
        case RESET_DS_TREE_CHILDREN:
            return state.set('DSChildren', Map({}));
        case REMOVE_DATASET: {
            const newChildren = state.get('DSChildren').remove(action.DSName);
            return state.set('DSChildren', newChildren);
        }
        case INVALIDATE_DS_TREE_CHILDREN: {
            return state.set('isFetching', false);
        }
        default: {
            return state;
        }
    }
}
