/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2018
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
    Tracks: 'TRK',
    Cylinders: 'CYL',
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
    static getTypeFromDsorg = dsorg => {
        const selectedType = DATA_SET_TYPES.find(type => {
            return type.Dsorg === dsorg;
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
            dsname: '',
            type: CreateDatasetDialog.getTypeFromDsorg(PRESETS.get('JCL').dsorg),
            alcunit: PRESETS.get('JCL').alcunit,
            primary: PRESETS.get('JCL').primary,
            secondary: PRESETS.get('JCL').secondary,
            dirblk: PRESETS.get('JCL').dirblk,
            recfm: PRESETS.get('JCL').recfm,
            blksize: PRESETS.get('JCL').blksize,
            lrecl: PRESETS.get('JCL').lrecl,
        };
    }

    submitAction = () => {
        const { DSPath } = this.props;
        let properties = Map({
            dsname: this.state.dsname,
            dsorg: CreateDatasetDialog.getDsorgFromType(this.state.type),
            alcunit: this.state.alcunit,
            primary: parseInt(this.state.primary, 10),
            secondary: parseInt(this.state.secondary, 10),
            dirblk: parseInt(this.state.dirblk, 10),
            recfm: this.state.recfm,
            blksize: parseInt(this.state.blksize, 10),
            lrecl: parseInt(this.state.lrecl, 10),
        });
        if (properties.get('dsorg') === SEQUENTIAL.Dsorg) {
            properties = properties.delete('dirblk');
        }
        return createDataset(properties, DSPath);
    }

    handlePresetChange = (event, index, value) => {
        this.setState({ preset: value });
        this.setState({ type: CreateDatasetDialog.getTypeFromDsorg(PRESETS.get(value).dsorg) });
        this.setState({ alcunit: PRESETS.get(value).alcunit });
        this.setState({ primary: PRESETS.get(value).primary });
        this.setState({ secondary: PRESETS.get(value).secondary });
        this.setState({ dirblk: PRESETS.get(value).dirblk });
        this.setState({ recfm: PRESETS.get(value).recfm });
        this.setState({ blksize: PRESETS.get(value).blksize });
        this.setState({ lrecl: PRESETS.get(value).lrecl });
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
        this.setState({ alcunit: value });
    }

    render() {
        const floatRightStyle = { float: 'Right', display: 'inline' };
        const rowAlignStyle = { lineHeight: '0px' };
        const dialogWidthStyle = { width: '584px' };

        const dialogContent = (
            <div>
                <div>
                    <SelectField
                        floatingLabelText="Preset"
                        value={this.state.preset}
                        onChange={this.handlePresetChange}
                    >
                        <MenuItem value={PRESET_JCL} primaryText={PRESET_JCL} />
                        <MenuItem value={PRESET_COBOL} primaryText={PRESET_COBOL} />
                        <MenuItem value={PRESET_PLX} primaryText={PRESET_PLX} />
                        <MenuItem value={PRESET_XML} primaryText={PRESET_XML} />
                    </SelectField>
                </div>
                <div>
                    <DatasetName
                        updateName={this.updateName}
                        floatingLabelText="Dataset Name"
                    />
                </div>
                <div style={rowAlignStyle}>
                    <SelectField
                        floatingLabelText="Type"
                        value={this.state.type}
                        onChange={this.handleTypeChange}
                    >
                        <MenuItem value={PARTITIONED.Name} primaryText={PARTITIONED.Name} />
                        <MenuItem value={SEQUENTIAL.Name} primaryText={SEQUENTIAL.Name} />
                    </SelectField>
                    <div style={floatRightStyle}>
                        <SelectField
                            floatingLabelText="Allocation Unit"
                            value={this.state.alcunit}
                            onChange={this.handleAlcunitChange}
                        >
                            <MenuItem value={ALLOCATION_UNITS.Tracks} primaryText={ALLOCATION_UNITS.Tracks} />
                            <MenuItem value={ALLOCATION_UNITS.Cylinders} primaryText={ALLOCATION_UNITS.Cylinders} />
                        </SelectField>
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
                        name="dirblk"
                        disabled={this.state.type === SEQUENTIAL.Name}
                        value={this.state.type === SEQUENTIAL.Name ? '' : this.state.dirblk}
                        onChange={this.handleInputChange}
                    />
                    <div style={floatRightStyle}>
                        <TextField
                            floatingLabelText="Record Format"
                            name="recfm"
                            value={this.state.recfm}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </div>
                <div style={rowAlignStyle}>

                    <TextField
                        floatingLabelText="Block Size"
                        name="blksize"
                        hintText="blksize"
                        value={this.state.blksize}
                        onChange={this.handleInputChange}
                    />
                    <div style={floatRightStyle}>
                        <TextField
                            floatingLabelText="Record Length"
                            name="lrecl"
                            hintText="lrecl"
                            value={this.state.lrecl}
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
            />
        );
    }
}

CreateDatasetDialog.propTypes = {
    dialogReturn: PropTypes.func.isRequired,
    DSPath: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};
