/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import { saveAsDataset, saveAsDatasetMember } from '../../../actions/editor';
import DatasetName from './DatasetName';
import DatasetMemberName from './DatasetMemberName';
import AtlasDialog from '../AtlasDialog';

export default class DatasetSaveAsDialog extends React.Component {
    static isMember(file) {
        return file.includes('(') && file.includes(')');
    }

    static getDatasetFromFile(file) {
        return file.substring(0, file.indexOf('('));
    }

    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);
        this.updateMember = this.updateMember.bind(this);
        this.state = {
            newDSName: '',
            newDSMember: '',
            disableSubmit: false,
        };
    }

    componentDidMount() {
        this.updateName('sr');
    }

    submitAction = () => {
        const { file, content, etag } = this.props;
        return DatasetSaveAsDialog.isMember(file)
            ? saveAsDatasetMember(DatasetSaveAsDialog.getDatasetFromFile(file), this.state.newDSMember, content)
            : saveAsDataset(file, this.state.newDSName, content, etag);
    }

    updateName(newValue) {
        this.setState({
            newDSName: newValue,
        });
        // validate the DataSetName
        const regex = /^([A-Z#@$][A-Z0-9#@$-]{0,7}(\.[A-Z#@$][A-Z0-9#@$-]{0,7}){0,3})/g;
        const found = newValue.match(regex);
        if (found != null && found[0] === newValue) {
            this.state.disableSubmit = false;
        } else {
            this.state.disableSubmit = true;
        }
    }

    updateMember(newValue) {
        this.setState({
            newDSMember: newValue,
        });
        // disable the Submit, when PDS member name is invalid
        const regex = /^([A-Z#@$][A-Z0-9#@$-]{0,7})/g;
        const found = newValue.match(regex);
        if (found != null && found[0] === newValue) {
            this.state.disableSubmit = false;
        } else {
            this.state.disableSubmit = true;
        }
    }

    render() {
        const { dialogReturn, dispatch, file } = this.props;
        const dialogContentMember = (
            <div>
                <DatasetMemberName
                    label="New Member Name"
                    updateMember={this.updateMember}
                    fullWidth={true}
                    autoFocus={true}
                />
            </div>
        );
        const dialogContentDataset = (
            <div>
                <DatasetName
                    label="New Dataset Name"
                    updateName={this.updateName}
                    fullWidth={true}
                    autoFocus={true}
                />
            </div>
        );

        return (
            <AtlasDialog
                title={DatasetSaveAsDialog.isMember(file) ? 'Save Member As' : 'Save Dataset As'}
                submitAction={() => { return this.submitAction(); }}
                dialogReturn={dialogReturn}
                dispatch={dispatch}
                dialogContent={DatasetSaveAsDialog.isMember(file) ? dialogContentMember : dialogContentDataset}
                bodyStyle={{ overflowY: 'auto' }}
                disableSubmit={this.state.disableSubmit}
            />
        );
    }
}

DatasetSaveAsDialog.propTypes = {
    file: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    dialogReturn: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    etag: PropTypes.string,
};
