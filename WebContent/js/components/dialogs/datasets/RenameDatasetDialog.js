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
import RenameDialog from './RenameDialog';
import { hasMember } from '../../../utilities/fileHelper';

function getTitle(name) {
    return `Rename Dataset ${hasMember(name) ? 'Member ' : ''}"${name}"?`;
}

const RenameDatasetDialog = props => {
    const { oldName, isOpenInViewer } = props;

    return (
        <RenameDialog
            title={getTitle(oldName)}
            oldName={oldName}
            isOpenInViewer={isOpenInViewer}
            {...props}
        />);
};

export default RenameDatasetDialog;

RenameDatasetDialog.propTypes = {
    oldName: PropTypes.string.isRequired,
    isOpenInViewer: PropTypes.bool.isRequired,
};
