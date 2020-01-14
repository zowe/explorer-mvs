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
import RenameDialog from './RenameDialog';

const RenameDatasetDialog = props => {
    const { DSName, isOpenInViewer, dataSetOrganization } = props;
    return (
        <RenameDialog
            title={`Rename Dataset "${DSName}"?`}
            oldName={DSName}
            dataSetOrganization={dataSetOrganization}
            isOpenInViewer={isOpenInViewer}
            {...props}
        />);
};

export default RenameDatasetDialog;

RenameDatasetDialog.propTypes = {
    DSName: PropTypes.string.isRequired,
    isOpenInViewer: PropTypes.bool.isRequired,
    dataSetOrganization: PropTypes.string.isRequired,
};
