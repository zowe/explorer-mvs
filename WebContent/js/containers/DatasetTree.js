/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { Card, CardText } from 'material-ui/Card';
import ConnectedTreeDataset from '../components/explorer/TreeDataset';
import RefreshIcon from '../components/explorer/RefreshIcon';
import { setDSPath, fetchDatasetTreeChildren, resetDSChildren } from '../actions/treeDS';
import { fetchDSMembers } from '../actions/treeDatasets';
import FullHeightTree from './FullHeightTree';
import UpperCaseTextField from '../components/dialogs/UpperCaseTextField';

export class DSTree extends React.Component {
    constructor(props) {
        super(props);
        this.handlePathChange = this.handlePathChange.bind(this);
        this.renderDSChild = this.renderDSChild.bind(this);
        this.refreshDSTree = this.refreshDSTree.bind(this);
        this.isDSToggled = this.isDSToggled.bind(this);

        this.state = {
            timeout: 0,
        };
    }

    componentWillMount() {
        const { dispatch, username, DSChildren } = this.props;
        if (DSChildren.isEmpty()) {
            dispatch(setDSPath(username));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, validated, DSPath } = this.props;
        // Once we receive validation update the path with username
        if (!validated) {
            dispatch(setDSPath(nextProps.username));
        } else if (DSPath !== nextProps.DSPath) {
            clearTimeout(this.state.timeout);
            this.state.timeout = setTimeout(() => {
                dispatch(resetDSChildren());
                dispatch(fetchDatasetTreeChildren(nextProps.DSPath));
            }, 1500);
        }
    }

    isDSToggled(childId) {
        const { datasets } = this.props;
        if (datasets.get(childId)) {
            return datasets.get(childId).get('isToggled');
        }
        return false;
    }

    handlePathChange(value) {
        const { dispatch } = this.props;
        dispatch(resetDSChildren());
        dispatch(setDSPath(value));
    }

    refreshDSTree() {
        const { DSPath, DSChildren, dispatch } = this.props;
        dispatch(resetDSChildren());
        dispatch(fetchDatasetTreeChildren(DSPath));
        DSChildren.keySeq().toArray().filter(childId => {
            return this.isDSToggled(childId);
        }).map(childId => {
            return dispatch(fetchDSMembers(childId));
        });
    }

    renderDSChild(childId) {
        const { DSChildren } = this.props;
        return (<ConnectedTreeDataset childId={childId} key={childId} dsorg={DSChildren.get(childId)} />);
    }

    render() {
        const { isToggled, isFetching, DSChildren, DSPath, dispatch } = this.props;
        return (this.props.validated ?
            <Card class="tree-card" containerStyle={{ paddingBottom: 0 }}>
                <CardText>
                    <div className="component-header">
                        <UpperCaseTextField
                            className="component-text-field-fill"
                            id="path"
                            value={DSPath}
                            fullWidth={false}
                            fieldChangedCallback={this.handlePathChange}
                        />
                        <RefreshIcon
                            isFetching={isFetching}
                            submitAction={this.refreshDSTree}
                            dispatch={dispatch}
                        />
                    </div>
                    <FullHeightTree offset={16}>
                        <ul>
                            {isToggled ? DSChildren.keySeq().toArray().map(this.renderDSChild) : null}
                        </ul>
                    </FullHeightTree>
                </CardText>
            </Card>
            : null
        );
    }
}

DSTree.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isToggled: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    DSPath: PropTypes.string.isRequired,
    DSChildren: PropTypes.instanceOf(Map),
    datasets: PropTypes.instanceOf(Map),
    validated: PropTypes.bool.isRequired,
    username: PropTypes.string,
};

function mapStateToProps(state) {
    const stateRoot = state.get('treeDS');
    const validationRoot = state.get('validation');
    const stateRootDatasets = state.get('treeDatasets');
    return {
        datasets: stateRootDatasets.get('datasets'),
        DSChildren: stateRoot.get('DSChildren'),
        isToggled: stateRoot.get('isToggled'),
        DSPath: stateRoot.get('DSPath'),
        isFetching: stateRoot.get('isFetching'),
        validated: validationRoot.get('validated'),
        username: validationRoot.get('username'),
    };
}
const ConnectedTree = connect(mapStateToProps)(DSTree);
export default ConnectedTree;
