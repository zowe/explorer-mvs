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
import { ContextMenu, MenuItem } from 'react-contextmenu';

const DatasetMenuMember = props => {
    const { member, handleCreateMember, handleEdit, handleDeleteDataset, handleJobSubmit, handleRename } = props;
    return (
        <ContextMenu id={member}>
            <MenuItem onClick={handleCreateMember}>
            New Dataset Member...
            </MenuItem>
            <MenuItem onClick={handleEdit}>
            Open
            </MenuItem>
            <MenuItem onClick={handleDeleteDataset}>
            Delete Member
            </MenuItem>
            <MenuItem onClick={handleJobSubmit}>
            Submit as Job
            </MenuItem>
            <MenuItem onClick={handleRename}>
            Rename
            </MenuItem>
        </ContextMenu>
    );
};

export default DatasetMenuMember;

DatasetMenuMember.propTypes = {
    member: PropTypes.string.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleCreateMember: PropTypes.func.isRequired,
    handleDeleteDataset: PropTypes.func.isRequired,
    handleJobSubmit: PropTypes.func.isRequired,
    handleRename: PropTypes.func.isRequired,
};
