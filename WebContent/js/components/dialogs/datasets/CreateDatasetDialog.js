/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Map } from 'immutable';
import { createDataset } from '../../../actions/treeDatasets';
import validateName from '../../../utilities/sharedUtils';
import PRESETS from './datasetPresets';
import AtlasDialog from '../AtlasDialog';
import DatasetName from './DatasetName';
import { DATASET_ORG_PARTITIONED, DATASET_ORG_SEQUENTIAL } from '../../../constants/DataSetConstants';

const PRESET_JCL = 'JCL';
const PRESET_COBOL = 'COBOL';
const PRESET_PLX = 'PLX';
const PRESET_XML = 'XML';

const ALLOCATION_UNITS = {
    Tracks: 'TRACK',
    Cylinders: 'CYLINDER',
};

const PARTITIONED = {
    Name: 'Partitioned',
    Dsorg: DATASET_ORG_PARTITIONED,
};
const SEQUENTIAL = {
    Name: 'Sequential',
    Dsorg: DATASET_ORG_SEQUENTIAL,
};
const DATA_SET_TYPES = [PARTITIONED, SEQUENTIAL];

export default class CreateDatasetDialog extends React.Component {
    static getTypeFromDsorg = dataSetOrganization => {
        const selectedType = DATA_SET_TYPES.find(type => {
            return type.Dsorg === dataSetOrganization;
        });
        return selectedType.Name;
    }

    static getDsorgFromType = typeName => {
        const selectedType = DATA_SET_TYPES.find(type => {
            return type.Name === typeName;
        });
        return selectedType.Dsorg;
    }

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateName = this.updateName.bind(this);

        this.state = {
            preset: PRESET_JCL,
            name: '',
            type: CreateDatasetDialog.getTypeFromDsorg(PRESETS.get('JCL').dataSetOrganization),
            allocationUnit: PRESETS.get('JCL').allocationUnit,
            primary: PRESETS.get('JCL').primary,
            secondary: PRESETS.get('JCL').secondary,
            directoryBlocks: PRESETS.get('JCL').directoryBlocks,
            recordFormat: PRESETS.get('JCL').recordFormat,
            blockSize: PRESETS.get('JCL').blockSize,
            recordLength: PRESETS.get('JCL').recordLength,
            disableSubmit: true,
            warning: '',
        };
    }

    handlePresetChange = event => {
        this.setState({ preset: event.target.value });
        this.setState({ type: CreateDatasetDialog.getTypeFromDsorg(PRESETS.get(event.target.value).dataSetOrganization) });
        this.setState({ allocationUnit: PRESETS.get(event.target.value).allocationUnit });
        this.setState({ primary: PRESETS.get(event.target.value).primary });
        this.setState({ secondary: PRESETS.get(event.target.value).secondary });
        this.setState({ directoryBlocks: PRESETS.get(event.target.value).directoryBlocks });
        this.setState({ recordFormat: PRESETS.get(event.target.value).recordFormat });
        this.setState({ blockSize: PRESETS.get(event.target.value).blockSize });
        this.setState({ recordLength: PRESETS.get(event.target.value).recordLength });
    }

    handleTypeChange = event => {
        this.setState({ type: event.target.value });
    }

    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value });
    }

    submitAction = () => {
        const { DSPath } = this.props;
        let properties = Map({
            name: this.state.dsname,
            dsorg: CreateDatasetDialog.getDsorgFromType(this.state.type),
            alcunit: this.state.allocationUnit,
            primary: parseInt(this.state.primary, 10),
            secondary: parseInt(this.state.secondary, 10),
            dirblk: parseInt(this.state.directoryBlocks, 10),
            recfm: this.state.recordFormat,
            blksize: parseInt(this.state.blockSize, 10),
            lrecl: parseInt(this.state.recordLength, 10),
        });
        if (properties.get('dsorg') === SEQUENTIAL.Dsorg) {
            properties = properties.delete('dirblk');
        }
        properties.forEach((value, key) => {
            if (!value) {
                properties = properties.delete(key);
            }
        });
        return createDataset(properties, DSPath);
    }

    handleAlcunitChange = event => {
        this.setState({ allocationUnit: event.target.value });
    }

    updateName(newValue) {
        this.setState({
            dsname: newValue,
        });
        // disable the Submit, when DS name is invalid
        const found = validateName('dataset', newValue);
        if (found != null && found[0] === newValue) {
            this.state.disableSubmit = false;
            this.state.warning = '';
        } else {
            this.state.disableSubmit = true;
            this.state.warning = ' (WARNING: Invalid Name)';
        }
    }

    render() {
        const floatRightStyle = { float: 'Right' };
        const halfWidthStyle = { width: '48%' };

        const dialogContent = (
            <div>
                <div style={halfWidthStyle}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel>Preset</InputLabel>
                        <Select
                            label="Preset"
                            value={this.state.preset}
                            onChange={this.handlePresetChange}
                        >
                            <MenuItem id={PRESET_JCL} value={PRESET_JCL} key={PRESET_JCL}>{PRESET_JCL}</MenuItem>
                            <MenuItem id={PRESET_COBOL} value={PRESET_COBOL} key={PRESET_COBOL}>{PRESET_COBOL}</MenuItem>
                            <MenuItem id={PRESET_PLX} value={PRESET_PLX} key={PRESET_PLX}>{PRESET_PLX}</MenuItem>
                            <MenuItem id={PRESET_XML} value={PRESET_XML} key={PRESET_XML}>{PRESET_XML}</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <DatasetName
                        label={`New Dataset Name ${this.state.warning}`}
                        updateName={this.updateName}
                        fullWidth={true}
                        autoFocus={true}
                    />
                </div>
                <br />
                <div>
                    <div style={{ ...{ float: 'left' }, ...halfWidthStyle }}>
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={this.state.type}
                                onChange={this.handleTypeChange}
                            >
                                <MenuItem id={PARTITIONED.Name} value={PARTITIONED.Name} key={PARTITIONED.Name}>{PARTITIONED.Name}</MenuItem>
                                <MenuItem id={SEQUENTIAL.Name} value={SEQUENTIAL.Name} key={SEQUENTIAL.Name}>{SEQUENTIAL.Name}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ ...floatRightStyle, ...halfWidthStyle }}>
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel>Allocation Unit</InputLabel>
                            <Select
                                value={this.state.allocationUnit}
                                onChange={this.handleAlcunitChange}
                            >
                                <MenuItem
                                    id={ALLOCATION_UNITS.Tracks}
                                    value={ALLOCATION_UNITS.Tracks}
                                    key={ALLOCATION_UNITS.Tracks}
                                >
                                    {ALLOCATION_UNITS.Tracks}
                                </MenuItem>
                                <MenuItem
                                    id={ALLOCATION_UNITS.Cylinders}
                                    value={ALLOCATION_UNITS.Cylinders}
                                    key={ALLOCATION_UNITS.Cylinders}
                                >
                                    {ALLOCATION_UNITS.Cylinders}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div>
                    <TextField
                        label="Primary"
                        name="primary"
                        value={this.state.primary}
                        onChange={this.handleInputChange}
                        style={halfWidthStyle}
                    />
                    <TextField
                        label="Secondary"
                        name="secondary"
                        value={this.state.secondary}
                        onChange={this.handleInputChange}
                        style={{ ...floatRightStyle, ...halfWidthStyle }}
                    />
                </div>
                <div>
                    <TextField
                        label="Blocks"
                        name="directoryBlocks"
                        disabled={this.state.type === SEQUENTIAL.Name}
                        value={this.state.type === SEQUENTIAL.Name ? '' : this.state.directoryBlocks}
                        onChange={this.handleInputChange}
                        style={halfWidthStyle}
                    />
                    <TextField
                        label="Record Format"
                        name="recordFormat"
                        value={this.state.recordFormat}
                        onChange={this.handleInputChange}
                        style={{ ...floatRightStyle, ...halfWidthStyle }}
                    />
                </div>
                <div>
                    <TextField
                        label="Block Size"
                        name="blockSize"
                        value={this.state.blockSize}
                        onChange={this.handleInputChange}
                        style={halfWidthStyle}
                    />
                    <TextField
                        label="Record Length"
                        name="recordLength"
                        value={this.state.recordLength}
                        onChange={this.handleInputChange}
                        style={{ ...floatRightStyle, ...halfWidthStyle }}
                    />
                </div>
            </div>
        );

        return (
            <AtlasDialog
                title="New Dataset"
                submitAction={() => { return this.submitAction(); }}
                dialogReturn={this.props.dialogReturn}
                dispatch={this.props.dispatch}
                dialogContent={dialogContent}
                bodyStyle={{ overflowY: 'auto' }}
                disableSubmit={this.state.disableSubmit}
            />
        );
    }
}

CreateDatasetDialog.propTypes = {
    dialogReturn: PropTypes.func.isRequired,
    DSPath: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};
