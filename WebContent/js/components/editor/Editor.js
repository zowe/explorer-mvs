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
import { connect } from 'react-redux';
import OrionEditor from 'orion-editor-component';
import { Card, CardText } from 'material-ui/Card';
import EditorMenuBar from './EditorMenuBar';

import { saveDataset, fetchDS } from '../../actions/editor';
import DatasetSaveAsDialog from '../dialogs/datasets/DatasetSaveAsDialog';

const PLAIN_TEXT = 'text/plain';
const JCL_TEXT = 'text/jclcontext';

const NO_DIALOG = 'NO_DIALOG';
const SAVE_AS_DATASET = 'SAVE_AS_DATASET';

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentContent: props.content,
            currentChecksum: props.checksum,
            syntax: PLAIN_TEXT,
            dialog: NO_DIALOG,
        };
        this.getContent = this.getContent.bind(this);
        this.editorReady = this.editorReady.bind(this);
        this.handleChangeSyntax = this.handleChangeSyntax.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveAs = this.handleSaveAs.bind(this);
        this.dialogReturn = this.dialogReturn.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { checksum, location, content, file, isFetching } = this.props;
        if (checksum !== nextProps.checksum) {
            this.setState({ currentChecksum: nextProps.checksum });
        }
        if (location && nextProps.content !== null && nextProps.content !== content && !isFetching) {
            this.setState({ currentContent: nextProps.content });
        }
        if (file !== nextProps.file) {
            if (nextProps.file.includes('JCL')) {
                this.setState({ syntax: JCL_TEXT });
            }
        }
        if (location !== nextProps.location) {
            window.location.reload();
        }
    }

    getContent = content => {
        this.setState({ currentContent: content });
    }

    handleChangeSyntax(syntax) {
        this.setState({ syntax });
    }

    handleSave() {
        const { dispatch, file } = this.props;
        dispatch(saveDataset(file, this.state.currentContent, this.state.currentChecksum));
    }

    handleSaveAs() {
        this.setState({ dialog: SAVE_AS_DATASET });
    }

    dialogReturn = () => {
        this.setState({ dialog: NO_DIALOG });
    }

    editorReady = () => {
        const { location, dispatch } = this.props;
        if (location) {
            dispatch(fetchDS(location.query.dataset));
        }
    }

    renderDialog() {
        const { dispatch, file, checksum } = this.props;
        switch (this.state.dialog) {
            case SAVE_AS_DATASET:
                return (<DatasetSaveAsDialog
                    file={file}
                    content={this.state.currentContent}
                    checksum={checksum}
                    dispatch={dispatch}
                    dialogReturn={this.dialogReturn}
                />);
            default:
                return null;
        }
    }

    render() {
        const { content, file } = this.props;
        return (
            <div>
                <Card class="component-no-vertical-pad">
                    <CardText
                        class="component-no-vertical-pad"
                        style={{ paddingTop: '2px' }}
                    >
                        <EditorMenuBar
                            file={file}
                            updateEditorSyntax={this.handleChangeSyntax}
                            initialSyntax={this.state.syntax}
                            handleSave={this.handleSave}
                            handleSaveAs={this.handleSaveAs}
                        />
                        <OrionEditor
                            content={content}
                            syntax={this.state.syntax}
                            passContentToParent={this.getContent}
                            languageFilesHost={location.host}
                            fullscreen={!!location}
                            editorTopOffset={56}
                            editorReady={this.editorReady}
                        />
                    </CardText>
                </Card>
                {this.renderDialog()}
            </div>
        );
    }
}

Editor.propTypes = {
    content: PropTypes.string,
    checksum: PropTypes.string,
    file: PropTypes.string,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func,
    location: PropTypes.shape({
        query: PropTypes.shape({
            dataset: PropTypes.string,
        }),
    }),
};

function mapStateToProps(state) {
    const editorRoot = state.get('editor');
    return {
        content: editorRoot.get('content'),
        checksum: editorRoot.get('checksum'),
        file: editorRoot.get('file'),
        isFetching: editorRoot.get('isFetching'),
    };
}

const ConnectedEditor = connect(mapStateToProps)(Editor);
export default ConnectedEditor;
