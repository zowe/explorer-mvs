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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Editor from '../../components/editor/Editor';
import ConnectedDatasetTree from '../DatasetTree';
import LoginDialog from '../../components/dialogs/LoginDialog';
import ConnectedSnackbar from '../../components/Snackbar';

const HomeView = props => {
    const { validated } = props;
    if (validated) {
        return (
            <div className="row group">
                <div className="component col col-3">
                    <ConnectedDatasetTree id="datasetTree" title="Dataset Explorer" subtitle="Browse Datasets and members" type="datasets" />
                </div>
                <div className="component col col-9">
                    <Editor />
                </div>
                <ConnectedSnackbar />
            </div>
        );
    }
    return <LoginDialog />;
};

HomeView.propTypes = {
    validated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const validationRoot = state.get('validation');
    return {
        validated: validationRoot.get('validated'),
    };
}

const ConnectedHome = connect(mapStateToProps)(HomeView);
export default ConnectedHome;
