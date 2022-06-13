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
import { List } from 'immutable';
import { popMessage } from '../actions/snackbarNotifications';

class AtlasSnackbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeout: 0,
            open: false,
        };
        this.registerMessageWithSnackbar = this.registerMessageWithSnackbar.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { snackbarNotificationsMessages } = prevProps;
        if (this.props.snackbarNotificationsMessages.first()
            && snackbarNotificationsMessages.first() !== this.props.snackbarNotificationsMessages.first()) {
            const messageValue = this.props.snackbarNotificationsMessages.first();
            window.sendMvsNotificationsToZlux(messageValue.get('message'));
            this.registerMessageWithSnackbar();
        }
    }

    componentWillUnmount() {
        this.state.timeout = clearTimeout(this.state.timeout);
    }

    handleRequestClose = () => {
        const { dispatch } = this.props;
        this.state.timeout = clearTimeout(this.state.timeout);
        this.setState({ open: false });
        dispatch(popMessage());
    }

    registerMessageWithSnackbar() {
        const { dispatch } = this.props;
        this.setState({ open: true });
        this.state.timeout = setTimeout(() => {
            dispatch(popMessage());
            this.setState({ open: false });
        }, 4000);
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
