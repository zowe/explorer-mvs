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
import { createMember } from '../../../actions/treeDatasets';
import UpperCaseTextField from '../UpperCaseTextField';
import AtlasDialog from '../AtlasDialog';

export default class CreateMemberDialog extends React.Component {
    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);

        this.state = {
            memberName: '',
        };
    }

    submitAction = () => {
        const { DSName } = this.props;
        return createMember(DSName, this.state.memberName);
    }

    updateName(newValue) {
        this.setState({
            memberName: newValue,
        });
    }

    render() {
        const dialogContent = (<UpperCaseTextField
            label="New Member Name"
            fieldChangedCallback={this.updateName}
            fullWidth={true}
        />);

        return (
            <AtlasDialog
                title="New Dataset Member"
                submitAction={() => { return this.submitAction(); }}
                dialogReturn={this.props.dialogReturn}
                dispatch={this.props.dispatch}
                dialogContent={dialogContent}
            />
        );
    }
}

CreateMemberDialog.propTypes = {
    dialogReturn: PropTypes.func.isRequired,
    DSName: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};
