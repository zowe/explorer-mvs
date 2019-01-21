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
import { allocateLike } from '../../../actions/treeDatasets';
import DatasetName from './DatasetName';
import AtlasDialog from '../AtlasDialog';

export default class AllocateLikeDialog extends React.Component {
    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);

        this.state = {
            newDSName: '',
        };
    }

    submitAction = () => {
        const { DSName, DSPath } = this.props;
        return allocateLike(DSName, this.state.newDSName, DSPath);
    }

    updateName(newValue) {
        this.setState({
            newDSName: newValue,
        });
    }

    render() {
        const { dialogReturn, dispatch } = this.props;
        const dialogContent = (<DatasetName
            updateName={this.updateName}
        />);

        return (
            <AtlasDialog
                title="Allocate Like"
                submitAction={() => { return this.submitAction(); }}
                dialogReturn={dialogReturn}
                dispatch={dispatch}
                dialogContent={dialogContent}
            />
        );
    }
}

AllocateLikeDialog.propTypes = {
    dialogReturn: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    DSName: PropTypes.string.isRequired,
    DSPath: PropTypes.string.isRequired,
};
