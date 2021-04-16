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

export const MENU_NEW_DATASET = <span>New <u>D</u>ataset</span>;
export const MENU_NEW_MEMBER = <span><u>N</u>ew Dataset Member</span>;
export const MENU_OPEN = <span><u>O</u>pen</span>;
export const MENU_SUBMIT = <span><u>S</u>ubmit as Job</span>;
export const MENU_RENAME = <div>Rename <span className="react-contextmenu-right">F2</span></div>;
export const MENU_DELETE = <div><u>Del</u>ete</div>;
export const MENU_DELETE_MEMBER = <div><u>Del</u>ete Member</div>;

const DatasetPartitionedMenu = props => {
    const { childId, handleCreateDataset, handleCreateMember, handleDeleteDataset, handleRename, onHide, onShow } = props;

    return (
        <ContextMenu id={childId} onShow={onShow} onHide={onHide}>
            <MenuItem onClick={handleCreateDataset}>
                {MENU_NEW_DATASET}
            </MenuItem>
            <MenuItem onClick={handleCreateMember}>
                {MENU_NEW_MEMBER}
            </MenuItem>
            <MenuItem onClick={handleDeleteDataset}>
                {MENU_DELETE}
            </MenuItem>
            <MenuItem onClick={handleRename}>
                {MENU_RENAME}
            </MenuItem>
        </ContextMenu>
    );
};

export default DatasetPartitionedMenu;

DatasetPartitionedMenu.propTypes = {
    childId: PropTypes.string.isRequired,
    handleCreateDataset: PropTypes.func.isRequired,
    handleCreateMember: PropTypes.func.isRequired,
    handleDeleteDataset: PropTypes.func.isRequired,
    handleRename: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
};
