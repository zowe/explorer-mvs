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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

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
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    id="dialog"
                >
                    <DialogTitle id="dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent
                        style={{ ...this.props.bodyStyle, ...this.props.contentStyle, ...{ width: '550px' } }}
                        id="dialog-content"
                    >
                        <form onSubmit={this.handleSubmit}>
                            {this.props.dialogContent}
                        </form>
                    </DialogContent>
                    <DialogActions id="dialog-actions">
                        <Button
                            onClick={this.handleClose}
                        >
                            Cancel
                        </Button>
                        ,
                        <Button
                            onClick={this.handleSubmit}
                            disabled={this.props.disableSubmit}
                        >
                            Ok
                        </Button>
                        ,
                    </DialogActions>
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
    disableSubmit: PropTypes.bool,
};
