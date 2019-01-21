/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NewTabIcon from 'material-ui/svg-icons/action/tab';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class EditorMenuBar extends React.Component {
    static renderTypesDropdown() {
        const result = [];
        if (window.codeEdit) {
            const types = window.codeEdit.serviceRegistry.getServiceReferences('orion.core.contenttype');
            if (types) {
                types.forEach(type => {
                    if (type.getProperty('contentTypes')) {
                        type.getProperty('contentTypes').forEach(typeElement => {
                            result.push(<MenuItem value={typeElement.id} primaryText={typeElement.name} key={typeElement.id} />);
                        });
                    }
                });
            }
        }
        return result.length > 0 ? result : null;
    }

    static getFullScreenLink(file) {
        return `/editor?dataset=${encodeURIComponent(file)}`;
    }

    static renderFullScreenButton(file) {
        return (
            <Link
                to={EditorMenuBar.getFullScreenLink(file)}
                target="_blank"
            >
                <IconButton style={{ float: 'right' }}>
                    <NewTabIcon />
                </IconButton>
            </Link>
        );
    }

    constructor(props) {
        super(props);

        // TODO:: Is initial syntax necessary?
        this.state = {
            syntax: props.initialSyntax,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { initialSyntax } = this.props;
        if (initialSyntax !== nextProps.initialSyntax) {
            this.setState({ syntax: nextProps.initialSyntax });
        }
    }

    handleSyntaxChange = (event, index, syntax) => {
        const { updateEditorSyntax } = this.props;
        this.setState({ syntax });
        updateEditorSyntax(syntax);
    };

    render() {
        const { file, handleSave, handleSaveAs } = this.props;
        return (
            <div>
                <RaisedButton
                    label="Save"
                    secondary={true}
                    style={{ margin: '5px' }}
                    disabled={!file}
                    onClick={handleSave}
                />
                <RaisedButton
                    label="Save as.."
                    secondary={true}
                    style={{ margin: '5px' }}
                    disabled={!file || !file.includes('(')}
                    onClick={handleSaveAs}
                />
                {file}
                {file ? EditorMenuBar.renderFullScreenButton(file) : null}
                <SelectField
                    style={{ float: 'right' }}
                    value={this.state.syntax}
                    onChange={this.handleSyntaxChange}
                >
                    {EditorMenuBar.renderTypesDropdown()}
                </SelectField>
            </div>
        );
    }
}

EditorMenuBar.propTypes = {
    file: PropTypes.string,
    updateEditorSyntax: PropTypes.func,
    initialSyntax: PropTypes.string,
    handleSave: PropTypes.func,
    handleSaveAs: PropTypes.func,
};
