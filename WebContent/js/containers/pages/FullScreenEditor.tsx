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
import OrionEditor from '../../components/editor/Editor';
import LoginDialog from '../../components/dialogs/LoginDialog';
import ConnectedSnackbar from '../../components/Snackbar';

const FullScreenEditor = props => {
    const { location, validated } = props;
    if (validated) {
        return (
            <div className="component full-screen-col">
                <OrionEditor location={location} />
                <ConnectedSnackbar />
            </div>
        );
    }
    return <LoginDialog />;
};

FullScreenEditor.propTypes = {
    validated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

function mapStateToProps(state) {
    const validationRoot = state.get('validation');
    return {
        validated: validationRoot.get('validated'),
    };
}
const ConnectedFullScreenEditor = connect(mapStateToProps)(FullScreenEditor);
export default ConnectedFullScreenEditor;
