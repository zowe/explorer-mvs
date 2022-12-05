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
import * as MENU from './DatasetMenu';

const DatasetUnsupportedMenu = props => {
    const {
        childId, handleCreateDataset, onHide, onShow,
    } = props;
    return (
        <ContextMenu id={childId} onShow={onShow} onHide={onHide}>
            <MenuItem onClick={handleCreateDataset}>
                {MENU.NEW_DATASET}
            </MenuItem>
        </ContextMenu>
    );
};

export default DatasetUnsupportedMenu;

DatasetUnsupportedMenu.propTypes = {
    childId: PropTypes.string.isRequired,
    handleCreateDataset: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
};
