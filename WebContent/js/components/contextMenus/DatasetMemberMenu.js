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
import * as MENU from './DatasetMenu';

const DatasetMenuMember = props => {
    const {
        member, parent, handleCreateMember, handleEdit, handleDeleteDataset, handleJobSubmit, handleRename, handleDownload, onHide, onShow,
    } = props;
    return (
        <ContextMenu id={member} onShow={onShow} onHide={onHide}>
            <MenuItem onClick={handleCreateMember}>
                {MENU.NEW_MEMBER}
            </MenuItem>
            <MenuItem onClick={handleEdit}>
                {MENU.OPEN}
            </MenuItem>
            <MenuItem onClick={handleDeleteDataset}>
                {MENU.DELETE}
            </MenuItem>
            <MenuItem onClick={handleJobSubmit}>
                {MENU.SUBMIT}
            </MenuItem>
            <MenuItem onClick={handleRename}>
                {MENU.RENAME}
            </MenuItem>
            <MenuItem data={{ action: member, actionParent: parent }} onClick={handleDownload}>
                {MENU.DOWNLOAD}
            </MenuItem>
        </ContextMenu>
    );
};

export default DatasetMenuMember;

DatasetMenuMember.propTypes = {
    member: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleCreateMember: PropTypes.func.isRequired,
    handleDeleteDataset: PropTypes.func.isRequired,
    handleJobSubmit: PropTypes.func.isRequired,
    handleRename: PropTypes.func.isRequired,
    handleDownload: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
};
