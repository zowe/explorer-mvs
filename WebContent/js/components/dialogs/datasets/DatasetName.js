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

const DatasetName = ({ updateName, ...props }) => {
    return (<UpperCaseTextField
        {...props}
        label="New Dataset Name"
        fieldChangedCallback={updateName}
    />);
};

export default DatasetName;

DatasetName.propTypes = {
    updateName: PropTypes.func.isRequired,
};
