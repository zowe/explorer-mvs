/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2018
 */

import PropTypes from 'prop-types';
import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';

const DatasetPartitionedMenu = props => {
    const { childId, handleCreateDataset, handleCreateMember, handleDeleteDataset } = props;

    return (
        <ContextMenu id={childId}>
            <MenuItem onClick={handleCreateDataset}>
                New Dataset...
            </MenuItem>
            <MenuItem onClick={handleCreateMember}>
                New Dataset Member...
            </MenuItem>
            <MenuItem onClick={handleDeleteDataset}>
                Delete
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
};
