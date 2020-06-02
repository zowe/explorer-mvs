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
import CircularProgressMui from '@material-ui/core/CircularProgress';
import RefreshIconMui from '@material-ui/icons/Refresh';

export default class RefreshIcon extends React.Component {
    handleSubmit = () => {
        const { submitAction } = this.props;
        submitAction();
    }

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    render() {
        const { isFetching } = this.props;
        const iconStyle = { float: 'right', padding: '10px' };
        const iconSize = 24;
        if (isFetching) {
            return (
                <CircularProgressMui
                    id="loading-icon"
                    size={iconSize}
                    style={iconStyle}
                />);
        }
        return (
            <RefreshIconMui
                id="refresh-icon"
                size={iconSize}
                style={iconStyle}
                onClick={this.handleSubmit}
                tabIndex="0"
                onKeyDown={this.handleKeyDown}
            />);
    }
}

RefreshIcon.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    submitAction: PropTypes.func.isRequired,
};
