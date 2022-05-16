/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
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
import OpenFolderIcon from '@material-ui/icons/FolderOpen';
import ClosedFolderIcon from '@material-ui/icons/Folder';
import ContentIcon from '@material-ui/icons/Description';
import UnsupportedIcon from '@material-ui/icons/Dns';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Map } from 'immutable';
import { fetchDSMembers, toggleDSNode } from '../../actions/treeDatasets';
import { fetchDS } from '../../actions/editor';
import { submitJob } from '../../actions/jobSubmitter';
import { download } from '../../actions/download';
import CreateMemberDialog from '../dialogs/datasets/CreateMemberDialog';
import CreateDatasetDialog from '../dialogs/datasets/CreateDatasetDialog';
import DeleteDatasetDialog from '../dialogs/datasets/DeleteDatasetDialog';
import RenameDatasetDialog from '../dialogs/datasets/RenameDatasetDialog';
import DatasetPartitionedMenu from '../contextMenus/DatasetPartitionedMenu';
import DatasetSequentialMenu from '../contextMenus/DatasetSequentialMenu';
import DatasetUnsupportedMenu from '../contextMenus/DatasetUnsupportedMenu';
import TreeDatasetMember from './TreeDatasetMember';
import { DATASET_ORG_PARTITIONED, DATASET_ORG_SEQUENTIAL, DATASET_ORG_VSAM } from '../../constants/DataSetConstants';
import { parseFileName } from '../../utilities/fileHelper';

const NO_DIALOG = 'NO_DIALOG';
const CREATE_MEMBER = 'CREATE_MEMBER';
const CREATE_DATASET = 'CREATE_DATASET';
const ALLOCATE_LIKE = 'ALLOCATE_LIKE';
const DELETE_DATASET = 'DELETE_DATASET';
const RENAME_DATASET = 'RENAME_DATASET';

export class TreeDataset extends React.Component {
    static isOpenInViewer = (childId, file) => {
        return childId === file || parseFileName(file).DSName === childId;
    }

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.dialogReturn = this.dialogReturn.bind(this);

        this.state = {
            dialog: NO_DIALOG,
        };
    }

    handleToggle() {
        const { childId, dispatch, dataSetOrganization } = this.props;
        if (!this.isDSToggled()) {
            if (dataSetOrganization.startsWith(DATASET_ORG_SEQUENTIAL)) {
                this.handleEdit();
            } else {
                dispatch(fetchDSMembers(childId));
            }
        } else {
            dispatch(toggleDSNode(childId, !this.isDSToggled()));
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.handleToggle();
        }
    }

    getToggleIcon() {
        return (
            this.isDSToggled() ? <OpenFolderIcon className="node-icon" /> : <ClosedFolderIcon className="node-icon" />
        );
    }

    dialogReturn = () => {
        this.setState({ dialog: NO_DIALOG });
    }

    handleCreateDataset = () => {
        this.setState({ dialog: CREATE_DATASET });
    }

    handleCreateMember = () => {
        this.setState({ dialog: CREATE_MEMBER });
    }

    handleAllocateLike = () => {
        this.setState({ dialog: ALLOCATE_LIKE });
    }

    handleEdit = () => {
        const { childId, dispatch, dataSetOrganization } = this.props;
        if (dataSetOrganization.startsWith(DATASET_ORG_SEQUENTIAL)) {
            dispatch(fetchDS(childId));
        }
    }

    handleDeleteDataset = () => {
        this.setState({ dialog: DELETE_DATASET });
    }

    handleJobSubmit = (e, data) => {
        const { dispatch } = this.props;
        dispatch(submitJob(data.action));
    }

    handleRename = () => {
        this.setState({ dialog: RENAME_DATASET });
    }

    handleDownload = (e, data) => {
        const { dispatch } = this.props;
        dispatch(download(data.action));
    }

    /**
     * If we have a dataset we want to know if it has any children(members)
     */
    hasChildren() {
        const { childId, datasets } = this.props;
        if (datasets.get(childId)) {
            if (datasets.get(childId).get('childData').length > 0) {
                return true;
            }
        }
        return false;
    }

    isDSToggled() {
        const { datasets, childId } = this.props;
        if (datasets.get(childId)) {
            return datasets.get(childId).get('isToggled');
        }
        return false;
    }

    renderDS() {
        const { dataSetOrganization } = this.props;
        if (dataSetOrganization.startsWith(DATASET_ORG_PARTITIONED)) {
            return this.renderPartitionedDS();
        } if (dataSetOrganization.startsWith(DATASET_ORG_SEQUENTIAL)) {
            return this.renderSequentialDS();
        } if (dataSetOrganization.startsWith(DATASET_ORG_VSAM)) {
            return this.renderUnsupportedDS();
        }
        return this.renderUnsupportedDS();
    }

    renderPartitionedDS() {
        const { childId, dataSetOrganization } = this.props;
        return (
            <div>
                <ContextMenuTrigger id={childId}>
                    <div onClick={this.handleToggle} tabIndex="0" onKeyDown={this.handleKeyDown}>
                        {this.getToggleIcon()}
                        <span className="node-label node-toggle">{childId}</span>
                    </div>
                </ContextMenuTrigger>
                <DatasetPartitionedMenu
                    dataSetOrganization={dataSetOrganization}
                    childId={childId}
                    handleAllocateLike={() => { this.handleAllocateLike(); }}
                    handleCreateDataset={() => { this.handleCreateDataset(); }}
                    handleCreateMember={() => { this.handleCreateMember(); }}
                    handleDeleteDataset={() => { this.handleDeleteDataset(); }}
                    handleRename={() => { this.handleRename(); }}
                    handleDownload={() => { this.handleDownload(); }}
                />
            </div>
        );
    }

    renderSequentialDS() {
        const { childId } = this.props;
        return (
            <div>
                <ContextMenuTrigger id={childId}>
                    <ContentIcon className="node-icon" />
                    <span className="node-label content-link" onClick={this.handleToggle} tabIndex="0" onKeyDown={this.handleKeyDown}>{childId}</span>
                </ContextMenuTrigger>
                <DatasetSequentialMenu
                    childId={childId}
                    handleAllocateLike={() => { this.handleAllocateLike(); }}
                    handleCreateDataset={() => { this.handleCreateDataset(); }}
                    handleDeleteDataset={() => { this.handleDeleteDataset(); }}
                    handleEdit={() => { this.handleEdit(); }}
                    handleJobSubmit={this.handleJobSubmit}
                    handleRename={this.handleRename}
                    handleDownload={this.handleDownload}
                />
            </div>
        );
    }

    renderUnsupportedDS() {
        const { childId } = this.props;
        return (
            <div>
                <ContextMenuTrigger id={childId}>
                    <UnsupportedIcon className="node-icon" />
                    <span className="node-label">{childId}</span>
                </ContextMenuTrigger>
                <DatasetUnsupportedMenu
                    childId={childId}
                    handleCreateDataset={() => { this.handleCreateDataset(); }}
                />
            </div>
        );
    }

    renderDSMembers() {
        const {
            childId, datasets, dispatch, dataSetOrganization, file,
        } = this.props;

        return (datasets.get(childId).get('childData').map(child => {
            return (
                <TreeDatasetMember
                    member={child}
                    key={child}
                    parent={childId}
                    dispatch={dispatch}
                    viewerFile={file}
                    dataSetOrganization={dataSetOrganization}
                />
            );
        }));
    }

    renderDialog() {
        const {
            childId, DSPath, file, dispatch,
        } = this.props;
        switch (this.state.dialog) {
            case CREATE_MEMBER:
                return <CreateMemberDialog DSName={childId} dispatch={dispatch} dialogReturn={this.dialogReturn} />;
            case CREATE_DATASET:
                return <CreateDatasetDialog DSPath={DSPath} dispatch={dispatch} dialogReturn={this.dialogReturn} />;
            case DELETE_DATASET:
                return (
                    <DeleteDatasetDialog
                        DSName={childId}
                        dispatch={dispatch}
                        DSPath={DSPath}
                        dialogReturn={this.dialogReturn}
                        isOpenInViewer={TreeDataset.isOpenInViewer(childId, file)}
                    />
                );
            case RENAME_DATASET:
                return (
                    <RenameDatasetDialog
                        oldName={childId}
                        dispatch={dispatch}
                        dialogReturn={this.dialogReturn}
                        isOpenInViewer={TreeDataset.isOpenInViewer(childId, file)}
                    />
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <div>
                <li>
                    <div className="node">
                        <div className="node-label">
                            {this.renderDS()}
                        </div>
                        <ul>
                            {this.isDSToggled() && this.hasChildren() ? this.renderDSMembers() : null}
                        </ul>
                    </div>
                </li>
                {this.renderDialog()}
            </div>
        );
    }
}

TreeDataset.propTypes = {
    childId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    dataSetOrganization: PropTypes.string.isRequired,
    DSPath: PropTypes.string,
    datasets: PropTypes.instanceOf(Map),
    file: PropTypes.string,
};

function mapStateToProps(state) {
    const treeDatasetsRoot = state.get('treeDatasets');
    const jobSubmitterRoot = state.get('jobSubmitter');
    const DSTreeRoot = state.get('treeDS');
    const editorRoot = state.get('editor');
    return {
        datasets: treeDatasetsRoot.get('datasets'),
        jobResponse: jobSubmitterRoot.get('response'),
        jobSuccess: jobSubmitterRoot.get('success'),
        DSPath: DSTreeRoot.get('DSPath'),
        file: editorRoot.get('file'),
    };
}

const ConnectedTreeDataset = connect(mapStateToProps)(TreeDataset);
export default ConnectedTreeDataset;
