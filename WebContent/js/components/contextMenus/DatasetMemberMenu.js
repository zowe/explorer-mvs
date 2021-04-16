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
import { MENU_NEW_MEMBER, MENU_OPEN, MENU_DELETE_MEMBER, MENU_SUBMIT, MENU_RENAME } from './DatasetPartitionedMenu';

const DatasetMenuMember = props => {
    const { member, handleCreateMember, handleEdit, handleDeleteDataset, handleJobSubmit, handleRename, onHide, onShow } = props;
    return (
        <ContextMenu id={member} onShow={onShow} onHide={onHide}>
            <MenuItem onClick={handleCreateMember}>
                {MENU_NEW_MEMBER}
            </MenuItem>
            <MenuItem onClick={handleEdit}>
                {MENU_OPEN}
            </MenuItem>
            <MenuItem onClick={handleDeleteDataset}>
                {MENU_DELETE_MEMBER}
            </MenuItem>
            <MenuItem onClick={handleJobSubmit}>
                {MENU_SUBMIT}
            </MenuItem>
            <MenuItem onClick={handleRename}>
                {MENU_RENAME}
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
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
};
