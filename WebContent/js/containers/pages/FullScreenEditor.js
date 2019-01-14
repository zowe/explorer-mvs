/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import PropTypes from 'prop-types';
import React from 'react';
import OrionEditor from '../../components/editor/Editor';
import ConnectedSnackbar from '../../components/Snackbar';

const FullScreenEditor = props => {
    const { location } = props;
    return (
        <div className="component full-screen-col">
            <OrionEditor location={location} />
            <ConnectedSnackbar />
        </div>
    );
};

FullScreenEditor.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export default FullScreenEditor;

