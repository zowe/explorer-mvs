/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import AtlasDialog from '../AtlasDialog';
import { renameDataset } from '../../../actions/treeDatasets';
import validateName from '../../../utilities/sharedUtils';
import UpperCaseTextField from '../UpperCaseTextField';

export default class RenameDialog extends React.Component {
    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);

        this.state = {
            newName: props.oldName,
            disableSubmit: false,
            warning: '',
        };
    }

    submitAction = () => {
        const { oldName, isOpenInViewer } = this.props;
        return renameDataset(oldName, this.state.newName, isOpenInViewer);
    }

    updateName(newValue) {
        this.setState({
            newName: newValue,
        });
        // disable the Submit, when DS name is invalid
        if (this.props.title.includes('Rename Dataset Member')) {
            const newMemberName = newValue.substring(newValue.indexOf('('), newValue.length);
            const found = validateName('renameDatasetMember', newMemberName);
            if (found != null && found[0] === newMemberName) {
                this.state.disableSubmit = false;
                this.state.warning = '';
            } else {
                this.state.disableSubmit = true;
                this.state.warning = ' (WARNING: Invalid Name)';
            }
        // disable the Submit, when Dataset name is invalid
        } else {
            const found = validateName('dataset', newValue);
            if (found != null && found[0] === newValue) {
                this.state.disableSubmit = false;
                this.state.warning = '';
            } else {
                this.state.disableSubmit = true;
                this.state.warning = ' (WARNING: Invalid Name)';
            }
        }
    }

    render() {
        const {
            title, dialogReturn, dispatch, oldName, isOpenInViewer,
        } = this.props;

        const dialogContent = (
            <UpperCaseTextField
                placeholder="New name"
                label={`New Name ${this.state.warning}`}
                fieldChangedCallback={this.updateName}
                value={this.state.newName}
                fullWidth={true}
                autoFocus={true}
            />
        );

        return (
            <div>
                <AtlasDialog
                    title={title}
                    submitAction={() => { return this.submitAction(); }}
                    dialogReturn={dialogReturn}
                    dispatch={dispatch}
                    dialogContent={dialogContent}
                    oldName={oldName}
                    isOpenInViewer={isOpenInViewer}
                    disableSubmit={this.state.disableSubmit}
                />
            </div>
        );
    }
}

RenameDialog.propTypes = {
    dialogReturn: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    oldName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isOpenInViewer: PropTypes.bool.isRequired,
};
