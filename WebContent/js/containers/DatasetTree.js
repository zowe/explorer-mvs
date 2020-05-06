/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ErrorIcon from '@material-ui/icons/Error';
import ConnectedTreeDataset from '../components/explorer/TreeDataset';
import RefreshIcon from '../components/explorer/RefreshIcon';
import { setDSPath, fetchDatasetTreeChildren, resetDSChildren } from '../actions/treeDS';
import { fetchDSMembers } from '../actions/treeDatasets';
import FullHeightTree from './FullHeightTree';
import UpperCaseTextField from '../components/dialogs/UpperCaseTextField';

const NO_DATASETS_FOUND_MESSAGE = 'No Datasets found';

class DatasetTree extends React.Component {
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
            dispatch(fetchDatasetTreeChildren(username));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, DSPath, username } = this.props;
        // When qualifier is changed but not in the case of first page load
        if (DSPath !== nextProps.DSPath && !(DSPath === '' && username === nextProps.DSPath)) {
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

    handleQualifierUpdate = e => {
        const { dispatch, DSPath } = this.props;
        e.preventDefault();
        clearTimeout(this.state.timeout);
        dispatch(resetDSChildren());
        dispatch(fetchDatasetTreeChildren(DSPath));
    }

    renderDSChild(childId) {
        const { DSChildren } = this.props;
        return (<ConnectedTreeDataset childId={childId} key={childId} dataSetOrganization={DSChildren.get(childId)} />);
    }

    renderNotFound() {
        const { isFetching } = this.props;
        return !isFetching ?
            <li>
                <ErrorIcon />
                <span className="node-label">{NO_DATASETS_FOUND_MESSAGE}</span>
            </li> :
            null;
    }

    render() {
        const { isFetching, DSChildren, DSPath, dispatch, validated } = this.props;
        return (validated ?
            <Card
                id="dataset-tree-card"
                class="tree-card"
                style={{ paddingBottom: '0px' }}
            >
                <CardContent>
                    <form onSubmit={this.handleQualifierUpdate}>
                        <div className="component-header">
                            <UpperCaseTextField
                                id="datasets-qualifier-field"
                                style={{ flexGrow: 1, paddingLeft: '8px' }}
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
                    </form>
                    <FullHeightTree offset={26}>
                        <ul>
                            {!DSChildren.isEmpty() ?
                                DSChildren.keySeq().toArray().sort().map(this.renderDSChild) :
                                this.renderNotFound()
                            }
                        </ul>
                    </FullHeightTree>
                </CardContent>
            </Card>
            : null
        );
    }
}

DatasetTree.propTypes = {
    dispatch: PropTypes.func.isRequired,
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
        DSPath: stateRoot.get('DSPath'),
        isFetching: stateRoot.get('isFetching') || stateRootDatasets.get('isFetching'),
        validated: validationRoot.get('validated'),
        username: validationRoot.get('username'),
    };
}
const ConnectedDatasetTree = connect(mapStateToProps)(DatasetTree);
export default ConnectedDatasetTree;
