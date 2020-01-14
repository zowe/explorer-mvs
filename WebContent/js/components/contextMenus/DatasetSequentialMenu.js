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
import { ContextMenu, MenuItem } from 'react-contextmenu';

const DatasetSequentialMenu = props => {
    const {
        childId,
        handleCreateDataset,
        handleDeleteDataset,
        handleEdit,
        handleJobSubmit,
        handleRename } = props;
    return (
        <ContextMenu id={childId}>
            <MenuItem onClick={handleCreateDataset}>
                New Dataset...
            </MenuItem>
            <MenuItem onClick={handleEdit}>
                Open
            </MenuItem>
            <MenuItem onClick={handleDeleteDataset}>
                Delete
            </MenuItem>
            <MenuItem data={{ action: childId }} onClick={handleJobSubmit}>
                Submit as Job
            </MenuItem>
            <MenuItem data={{ action: childId }} onClick={handleRename}>
                Rename
            </MenuItem>
        </ContextMenu>
    );
};

export default DatasetSequentialMenu;

DatasetSequentialMenu.propTypes = {
    childId: PropTypes.string.isRequired,
    handleCreateDataset: PropTypes.func.isRequired,
    handleDeleteDataset: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleJobSubmit: PropTypes.func.isRequired,
    handleRename: PropTypes.func.isRequired,
};
