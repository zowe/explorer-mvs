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
import AtlasDialog from '../AtlasDialog';
import { deleteDataset } from '../../../actions/treeDatasets';

export default class DeleteDialog extends React.Component {
    submitAction = () => {
        const { resource, isOpenInViewer } = this.props;
        return deleteDataset(resource, isOpenInViewer);
    }

    render() {
        const { title, dialogReturn, dispatch } = this.props;

        return (
            <div>
                <AtlasDialog
                    title={title}
                    submitAction={() => { return this.submitAction(); }}
                    dialogReturn={dialogReturn}
                    dispatch={dispatch}
                />
            </div>
        );
    }
}

DeleteDialog.propTypes = {
    dialogReturn: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isOpenInViewer: PropTypes.bool.isRequired,
};
