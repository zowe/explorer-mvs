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
import UpperCaseTextField from '../UpperCaseTextField';

const DatasetMemberName = props => {
    const {
        updateMember, fullWidth, label, autoFocus,
    } = props;
    return (
        <UpperCaseTextField
            fieldChangedCallback={updateMember}
            fullWidth={fullWidth}
            label={label}
            autoFocus={autoFocus}
        />
    );
};

export default DatasetMemberName;

DatasetMemberName.propTypes = {
    updateMember: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    autoFocus: PropTypes.bool,
};
