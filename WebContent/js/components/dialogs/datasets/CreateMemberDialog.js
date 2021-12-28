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
            disableSubmit: false,
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
        // disable the Submit, when PDS member name has length more than 8
        const regex = /^([A-Z#@$][A-Z0-9#@$-]{0,7})/g;
        const found = newValue.match(regex);
        if (found != null && found[0] === newValue) {
            this.state.disableSubmit = false;
        } else {
            this.state.disableSubmit = true;
        }
    }

    render() {
        const dialogContent = (
            <UpperCaseTextField
                label="New Member Name"
                fieldChangedCallback={this.updateName}
                fullWidth={true}
                autoFocus={true}
            />
        );

        return (
            <AtlasDialog
                title="New Dataset Member"
                submitAction={() => { return this.submitAction(); }}
                dialogReturn={this.props.dialogReturn}
                dispatch={this.props.dispatch}
                dialogContent={dialogContent}
                disableSubmit={this.state.disableSubmit}
            />
        );
    }
}

CreateMemberDialog.propTypes = {
    dialogReturn: PropTypes.func.isRequired,
    DSName: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};
