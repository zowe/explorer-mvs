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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Editor from '../../components/editor/Editor';
import ConnectedDatasetTree from '../DatasetTree';
import ConnectedSnackbar from '../../components/Snackbar';
import { validateUser } from '../../actions/validation';

class HomeView extends React.Component {
    componentWillMount() {
        const { dispatch, validated } = this.props;
        if (!validated) {
            dispatch(validateUser());
        }
    }

    render() {
        const { validated, isValidating } = this.props;
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
        if (isValidating) {
            return (<CircularProgress className="vertical-horizontal-center-new" />);
        }
        return (<div className="vertical-horizontal-center">Unable to Authenticate</div>);
    }
}

HomeView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    validated: PropTypes.bool.isRequired,
    isValidating: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const validationRoot = state.get('validation');
    return {
        validated: validationRoot.get('validated'),
        isValidating: validationRoot.get('isValidating'),
    };
}

const ConnectedHome = connect(mapStateToProps)(HomeView);
export default ConnectedHome;
