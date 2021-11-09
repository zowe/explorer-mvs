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
import DeleteDialog from './DeleteDialog';

const DeleteDatasetDialog = props => {
    const { DSName } = props;
    return (
        <DeleteDialog
            title={`Delete Dataset "${DSName}"?`}
            resource={DSName}
            {...props}
        />
    );
};

export default DeleteDatasetDialog;

DeleteDatasetDialog.propTypes = {
    DSName: PropTypes.string.isRequired,
};
