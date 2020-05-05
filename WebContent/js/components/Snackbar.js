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
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { List } from 'immutable';
import { popMessage } from '../actions/snackbarNotifications';

class AtlasSnackbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.registerMessageWithSnackbar = this.registerMessageWithSnackbar.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { snackbarNotificationsMessages } = this.props;
        if (nextProps.snackbarNotificationsMessages.first() &&
            snackbarNotificationsMessages.first() !== nextProps.snackbarNotificationsMessages.first()) {
            const messageValue = nextProps.snackbarNotificationsMessages.first();
            window.sendMvsNotificationsToZlux(messageValue.get('message'));
            this.registerMessageWithSnackbar();
        }
    }

    registerMessageWithSnackbar() {
        this.setState({ open: true });
    }

    handleRequestClose = (event, reason) => {
        // Don't close notification if user clicks elsewhere on screen
        if (reason !== 'clickaway') {
            const { dispatch } = this.props;
            this.setState({ open: false });
            dispatch(popMessage());
        }
    }

    render() {
        const { snackbarNotificationsMessages } = this.props;
        if (snackbarNotificationsMessages.size > 0) {
            const messageValue = snackbarNotificationsMessages.first();
            return (
                <Snackbar
                    message={messageValue.get('message')}
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                    role="alert"
                    action={
                        <IconButton
                            key="close"
                            aria-label="Close"
                            onClick={this.handleRequestClose}
                            style={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>}
                />
            );
        }
        return null;
    }
}

AtlasSnackbar.propTypes = {
    snackbarNotificationsMessages: PropTypes.instanceOf(List).isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        snackbarNotificationsMessages: state.get('snackbarNotifications').get('messages'),
    };
}

const ConnectedSnackbar = connect(mapStateToProps)(AtlasSnackbar);
export default ConnectedSnackbar;
