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
import UpperCaseTextField from '../UpperCaseTextField';

export default class RenameDialog extends React.Component {
    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);

        this.state = {
            newName: props.oldName,
            disableSubmit: false,
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
        // check for the validity of Dataset Member Name
        if (this.props.title.includes('Rename Dataset Member')) {
            const newMemeberName = newValue.substring(newValue.indexOf('('), newValue.length);
            const regex = /^(\([A-Z#@$][A-Z0-9#@$-]{0,7}\))/g;
            const found = newMemeberName.match(regex);
            if (found != null && found[0] === newMemeberName) {
                this.state.disableSubmit = false;
            } else {
                this.state.disableSubmit = true;
            }
        /*
        * check for the validity of Dataset Name and
        * disable the Submit, when Dataset name length exceeds 44 characters or any level has more than 8 characters
        */
        } else {
            const regex = /^([A-Z#@$][A-Z0-9#@$-]{0,7}(\.[A-Z#@$][A-Z0-9#@$-]{0,7})*)/g;
            const found = newValue.match(regex);
            if (found != null && found[0] === newValue && newValue.length <= 44) {
                this.state.disableSubmit = false;
            } else {
                this.state.disableSubmit = true;
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
