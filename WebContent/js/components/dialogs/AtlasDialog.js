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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class AtlasDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
        };
    }

    handleClose = () => {
        const { dialogReturn } = this.props;
        this.setState({ open: false });
        dialogReturn();
    };

    handleSubmit = () => {
        const { dispatch, submitAction } = this.props;
        dispatch(submitAction());
        this.handleClose();
    }

    handleNameChange({ target }) {
        this.setState({ [target.name]: target.value });
    }

    render() {
        const actions = [
            <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose} />,
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={!this.props.dialogContent}
                onTouchTap={this.handleSubmit}
            />,
        ];

        return (
            <div>
                <Dialog
                    title={this.props.title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={this.props.contentStyle}
                    bodyStyle={this.props.bodyStyle}
                >
                    <div>
                        <form onSubmit={this.handleSubmit} >
                            {this.props.dialogContent}
                        </form>
                    </div>
                </Dialog>
            </div>
        );
    }
}

AtlasDialog.propTypes = {
    contentStyle: PropTypes.shape({
        width: PropTypes.string,
    }),
    bodyStyle: PropTypes.shape({
        overflowY: PropTypes.string,
    }),
    dialogContent: PropTypes.element,
    dialogReturn: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    submitAction: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
