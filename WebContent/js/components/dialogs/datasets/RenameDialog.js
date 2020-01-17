/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
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
    }

    render() {
        const { title, dialogReturn, dispatch, oldName, isOpenInViewer } = this.props;

        const dialogContent = (<UpperCaseTextField
            placeholder={"New name"}
            fieldChangedCallback={this.updateName}
            value={this.state.newName}
        />);

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
