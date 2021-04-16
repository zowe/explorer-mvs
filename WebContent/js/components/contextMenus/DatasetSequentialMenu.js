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
import { MENU_NEW_DATASET, MENU_OPEN, MENU_DELETE, MENU_SUBMIT, MENU_RENAME } from './DatasetPartitionedMenu';

const DatasetSequentialMenu = props => {
    const {
        childId,
        handleCreateDataset,
        handleDeleteDataset,
        handleEdit,
        handleJobSubmit,
        handleRename,
        onHide,
        onShow } = props;
    return (
        <ContextMenu id={childId} onShow={onShow} onHide={onHide}>
            <MenuItem onClick={handleCreateDataset}>
                {MENU_NEW_DATASET}
            </MenuItem>
            <MenuItem onClick={handleEdit}>
                {MENU_OPEN}
            </MenuItem>
            <MenuItem onClick={handleDeleteDataset}>
                {MENU_DELETE}
            </MenuItem>
            <MenuItem data={{ action: childId }} onClick={handleJobSubmit}>
                {MENU_SUBMIT}
            </MenuItem>
            <MenuItem data={{ action: childId }} onClick={handleRename}>
                {MENU_RENAME}
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
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
};
