/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
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
        };
    }

    submitAction = () => {
        const { DSPath } = this.props;
        let properties = Map({
            name: this.state.dsname,
            dataSetOrganization: CreateDatasetDialog.getDsorgFromType(this.state.type),
            allocationUnit: this.state.allocationUnit,
            primary: parseInt(this.state.primary, 10),
            secondary: parseInt(this.state.secondary, 10),
            directoryBlocks: parseInt(this.state.directoryBlocks, 10),
            recordFormat: this.state.recordFormat,
            blockSize: parseInt(this.state.blockSize, 10),
            recordLength: parseInt(this.state.recordLength, 10),
        });
        if (properties.get('dataSetOrganization') === SEQUENTIAL.Dsorg) {
            properties = properties.delete('directoryBlocks');
        }
        properties.forEach((value, key) => {
            if (!value) {
                properties = properties.delete(key);
            }
        });
        return createDataset(properties, DSPath);
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

    handleTypeChange = (event, index, value) => {
        this.setState({ type: value });
    }

    updateName(newValue) {
        this.setState({
            dsname: newValue,
        });
    }

    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value });
    }

    handleAlcunitChange = (event, index, value) => {
        this.setState({ allocationUnit: value });
    }

    render() {
        const floatRightStyle = { float: 'Right', display: 'inline' };
        const rowAlignStyle = { lineHeight: '0px' };
        const dialogWidthStyle = { width: '584px' };

        const dialogContent = (
            <div>
                <div>
                    <FormControl>
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
                        label="Dataset Name"
                        updateName={this.updateName}
                    />
                </div>
                <div style={rowAlignStyle}>
                    <FormControl>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={this.state.type}
                            onChange={this.handleTypeChange}
                        >
                            <MenuItem id={PARTITIONED.Name} value={PARTITIONED.Name} key={PARTITIONED.Name}>{PARTITIONED.Name}</MenuItem>
                            <MenuItem id={SEQUENTIAL.Name} value={SEQUENTIAL.Name} key={SEQUENTIAL.Name}>{SEQUENTIAL.Name}</MenuItem>
                        </Select>
                    </FormControl>
                    <div style={floatRightStyle}>
                        <FormControl>
                            <InputLabel>Allocation Unit</InputLabel>
                            <Select
                                value={this.state.allocationUnit}
                                onChange={this.handleAlcunitChange}
                            >
                                <MenuItem
                                    id={ALLOCATION_UNITS.Tracks}
                                    value={ALLOCATION_UNITS.Tracks}
                                    key={ALLOCATION_UNITS.Tracks}
                                >{ALLOCATION_UNITS.Tracks}</MenuItem>
                                <MenuItem
                                    id={ALLOCATION_UNITS.Cylinders}
                                    value={ALLOCATION_UNITS.Cylinders}
                                    key={ALLOCATION_UNITS.Cylinders}
                                >{ALLOCATION_UNITS.Cylinders}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div style={rowAlignStyle}>
                    <TextField
                        name="primary"
                        floatingLabelText="Primary"
                        value={this.state.primary}
                        onChange={this.handleInputChange}
                    />
                    <div style={floatRightStyle}>
                        <TextField
                            floatingLabelText="Secondary"
                            name="secondary"
                            value={this.state.secondary}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </div>
                <div style={rowAlignStyle}>
                    <TextField
                        floatingLabelText="Blocks"
                        name="directoryBlocks"
                        disabled={this.state.type === SEQUENTIAL.Name}
                        value={this.state.type === SEQUENTIAL.Name ? '' : this.state.directoryBlocks}
                        onChange={this.handleInputChange}
                    />
                    <div style={floatRightStyle}>
                        <TextField
                            floatingLabelText="Record Format"
                            name="recordFormat"
                            value={this.state.recordFormat}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </div>
                <div style={rowAlignStyle}>

                    <TextField
                        floatingLabelText="Block Size"
                        name="blockSize"
                        hintText="blockSize"
                        value={this.state.blockSize}
                        onChange={this.handleInputChange}
                    />
                    <div style={floatRightStyle}>
                        <TextField
                            floatingLabelText="Record Length"
                            name="recordLength"
                            hintText="recordLength"
                            value={this.state.recordLength}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </div>
            </div>);


        return (
            <AtlasDialog
                title="New Dataset"
                submitAction={() => { return this.submitAction(); }}
                dialogReturn={this.props.dialogReturn}
                dispatch={this.props.dispatch}
                dialogContent={dialogContent}
                contentStyle={dialogWidthStyle}
                bodyStyle={{ overflowY: 'auto' }}
            />
        );
    }
}

CreateDatasetDialog.propTypes = {
    dialogReturn: PropTypes.func.isRequired,
    DSPath: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};
