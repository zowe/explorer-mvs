/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2018
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
        };
    }

    componentDidMount() {
        this.updateName('sr');
    }

    submitAction = () => {
        const { file, content, checksum } = this.props;
        return DatasetSaveAsDialog.isMember(file) ?
            saveAsDatasetMember(DatasetSaveAsDialog.getDatasetFromFile(file), this.state.newDSMember, content) :
            saveAsDataset(file, this.state.newDSName, content, checksum);
    }


    updateName(newValue) {
        this.setState({
            newDSName: newValue,
        });
    }

    updateMember(newValue) {
        this.setState({
            newDSMember: newValue,
        });
    }

    render() {
        const { dialogReturn, dispatch, file } = this.props;
        const dialogWidthStyle = { width: '584px' };
        const dialogContentMember = (
            <div>
                <DatasetMemberName updateMember={this.updateMember} />
            </div>);
        const dialogContentDataset = (
            <div>
                <DatasetName updateName={this.updateName} />
            </div>);

        return (
            <AtlasDialog
                title={DatasetSaveAsDialog.isMember(file) ? 'Save Member As' : 'Save Dataset As'}
                submitAction={() => { return this.submitAction(); }}
                dialogReturn={dialogReturn}
                dispatch={dispatch}
                dialogContent={DatasetSaveAsDialog.isMember(file) ? dialogContentMember : dialogContentDataset}
                contentStyle={dialogWidthStyle}
            />
        );
    }
}

DatasetSaveAsDialog.propTypes = {
    file: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    dialogReturn: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    checksum: PropTypes.string.isRequired,
};
