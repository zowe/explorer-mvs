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
import { DATASET_ORG_EXTENDED } from '../../constants/DataSetConstants';

const DatasetPartitionedMenu = props => {
    const { dsorg, childId, handleAllocateLike, handleCreateDataset, handleCreateMember, handleDeleteDataset } = props;
    let allocateLikeMenutItem;
    // Don't show Allocate Like for Enhanced datasets, API does not support it
    if (!dsorg.includes(DATASET_ORG_EXTENDED)) {
        allocateLikeMenutItem = (<MenuItem onClick={handleAllocateLike}>
                Allocate Like
        </MenuItem>);
    }
    return (
        <ContextMenu id={childId}>
            <MenuItem onClick={handleCreateDataset}>
                New Dataset...
            </MenuItem>
            <MenuItem onClick={handleCreateMember}>
                New Dataset Member...
            </MenuItem>
            {allocateLikeMenutItem}
            <MenuItem onClick={handleDeleteDataset}>
                Delete
            </MenuItem>
        </ContextMenu>
    );
};

export default DatasetPartitionedMenu;

DatasetPartitionedMenu.propTypes = {
    dsorg: PropTypes.string.isRequired,
    childId: PropTypes.string.isRequired,
    handleAllocateLike: PropTypes.func.isRequired,
    handleCreateDataset: PropTypes.func.isRequired,
    handleCreateMember: PropTypes.func.isRequired,
    handleDeleteDataset: PropTypes.func.isRequired,
};
