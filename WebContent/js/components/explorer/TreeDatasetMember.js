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
import ContentIcon from '@material-ui/icons/Description';
import ErrorIcon from '@material-ui/icons/Error';
import { ContextMenuTrigger } from 'react-contextmenu';
import { fetchDS } from '../../actions/editor';
import { submitJob } from '../../actions/jobSubmitter';
import { download } from '../../actions/download';
import CreateMemberDialog from '../dialogs/datasets/CreateMemberDialog';
import DeleteDatasetMemberDialog from '../dialogs/datasets/DeleteDatasetMemberDialog';
import DatasetMemberMenu from '../contextMenus/DatasetMemberMenu';
import { TreeDataset } from './TreeDataset';
import { UNAUTHORIZED_MESSAGE } from '../../actions/treeDatasets';
import RenameDatasetDialog from '../dialogs/datasets/RenameDatasetDialog';

const NO_DIALOG = 'NO_DIALOG';
const CREATE_MEMBER = 'CREATE_MEMBER';
const DELETE_MEMBER = 'DELETE_MEMBER';
const RENAME_MEMBER = 'RENAME_MEMBER';

export default class TreeDatasetMember extends React.Component {
    static renderUnauthorizedNode() {
        return (
            <li>
                <ErrorIcon />
                <span className="node-label">{UNAUTHORIZED_MESSAGE}</span>
            </li>
        );
    }

    constructor(props) {
        super(props);
        this.getDataSetAndMemberName = this.getDataSetAndMemberName.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.state = {
            dialog: NO_DIALOG,
        };
    }

    handleCreateMember = () => {
        this.setState({ dialog: CREATE_MEMBER });
    }

    handleEdit = () => {
        const { dispatch } = this.props;
        dispatch(fetchDS(this.getDataSetAndMemberName()));
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.handleEdit();
        }
    }

    dialogReturn = () => {
        this.setState({ dialog: NO_DIALOG });
    }

    getDataSetAndMemberName = () => {
        const { parent, member } = this.props;
        return `${parent}(${member})`;
    }

    handleDeleteDataset = () => {
        this.setState({ dialog: DELETE_MEMBER });
    }

    handleJobSubmit = () => {
        const { dispatch } = this.props;
        dispatch(submitJob(this.getDataSetAndMemberName()));
    }

    handleRename = () => {
        this.setState({ dialog: RENAME_MEMBER });
    }

    handleDownload = (e, data) => {
        const { dispatch } = this.props;
        dispatch(download(`${data.actionParent}(${data.action})`));
    }

    renderDialog() {
        const { parent, viewerFile, dispatch } = this.props;
        switch (this.state.dialog) {
            case CREATE_MEMBER:
                return <CreateMemberDialog DSName={parent} dispatch={dispatch} dialogReturn={this.dialogReturn} />;
            case DELETE_MEMBER: {
                return (
                    <DeleteDatasetMemberDialog
                        DSName={this.getDataSetAndMemberName()}
                        dispatch={dispatch}
                        DSPath={parent}
                        dialogReturn={this.dialogReturn}
                        isOpenInViewer={TreeDataset.isOpenInViewer(this.getDataSetAndMemberName(), viewerFile)}
                    />
                );
            }
            case RENAME_MEMBER: {
                return (
                    <RenameDatasetDialog
                        oldName={this.getDataSetAndMemberName()}
                        dispatch={dispatch}
                        DSPath={parent}
                        dialogReturn={this.dialogReturn}
                        isOpenInViewer={TreeDataset.isOpenInViewer(this.getDataSetAndMemberName(), viewerFile)}
                    />
                );
            }
            default:
                return null;
        }
    }

    render() {
        const { member, parent } = this.props;
        if (member !== UNAUTHORIZED_MESSAGE) {
            return (
                <div key={member}>
                    <ContextMenuTrigger id={member}>
                        <div
                            onClick={() => { this.handleEdit(); }}
                            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                            tabIndex="0"
                            onKeyDown={this.handleKeyDown}
                        >
                            <li>
                                <ContentIcon className="node-icon" />
                                <span className="node-label content-link">{member}</span>
                            </li>
                        </div>
                    </ContextMenuTrigger>
                    <DatasetMemberMenu
                        member={member}
                        parent={parent}
                        handleEdit={() => { this.handleEdit(); }}
                        handleJobSubmit={() => { this.handleJobSubmit(); }}
                        handleRename={() => { this.handleRename(); }}
                        handleDeleteDataset={() => { this.handleDeleteDataset(); }}
                        handleCreateMember={() => { this.handleCreateMember(); }}
                        handleDownload={this.handleDownload}
                    />
                    {this.renderDialog()}
                </div>
            );
        }
        return TreeDatasetMember.renderUnauthorizedNode();
    }
}

TreeDatasetMember.propTypes = {
    member: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    viewerFile: PropTypes.string,
};
