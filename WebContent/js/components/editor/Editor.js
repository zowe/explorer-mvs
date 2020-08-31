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
import { connect } from 'react-redux';
import OrionEditor from 'orion-editor-component';
import queryString from 'query-string';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
            syntax: PLAIN_TEXT,
            dialog: NO_DIALOG,
            prevFile: null,
            prevContent: null,
            prevLocation: props.location,
        };
        this.getContent = this.getContent.bind(this);
        this.editorReady = this.editorReady.bind(this);
        this.handleChangeSyntax = this.handleChangeSyntax.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveAs = this.handleSaveAs.bind(this);
        this.dialogReturn = this.dialogReturn.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        const { prevContent, prevFile, prevLocation } = state;
        const newState = {};
        if (prevLocation && props.content !== null && props.content !== prevContent && !props.isFetching) {
            newState.prevContent = props.content;
            newState.currentContent = props.content;
        }
        if (props.file !== prevFile && props.file.includes('JCL')) {
            newState.prevFile = props.file;
            newState.syntax = JCL_TEXT;
        }
        if (props.location !== prevLocation) {
            window.location.reload();
        }
        return Object.keys(newState).length ? newState : null;
    }

    componentDidUpdate() {
        const { title } = this.props;
        document.title = title;
    }

    getContent = content => {
        this.setState({ currentContent: content });
    }

    handleChangeSyntax(syntax) {
        this.setState({ syntax });
    }

    handleSave() {
        const { dispatch, file, etag } = this.props;
        dispatch(saveDataset(file, this.state.currentContent, etag));
    }

    handleSaveAs() {
        this.setState({ dialog: SAVE_AS_DATASET });
    }

    dialogReturn = () => {
        this.setState({ dialog: NO_DIALOG });
    }

    editorReady = () => {
        const { location, dispatch } = this.props;
        if (location && location.search) {
            const urlQueryParams = queryString.parse(location.search);
            dispatch(fetchDS(urlQueryParams.dataset));
        }
    }

    renderDialog() {
        const { dispatch, file, etag } = this.props;
        switch (this.state.dialog) {
            case SAVE_AS_DATASET:
                return (<DatasetSaveAsDialog
                    file={file}
                    content={this.state.currentContent}
                    etag={etag}
                    dispatch={dispatch}
                    dialogReturn={this.dialogReturn}
                />);
            default:
                return null;
        }
    }

    render() {
        const { content, file, isFetching } = this.props;
        return (
            <div>
                <Card id="editor-card" class="component-no-vertical-pad">
                    <CardContent
                        class="component-no-vertical-pad"
                        style={{ paddingTop: '2px' }}
                    >
                        <EditorMenuBar
                            file={file}
                            isFetching={isFetching}
                            updateEditorSyntax={this.handleChangeSyntax}
                            initialSyntax={this.state.syntax}
                            handleSave={this.handleSave}
                            handleSaveAs={this.handleSaveAs}
                        />
                        <OrionEditor
                            file={file}
                            content={content}
                            syntax={this.state.syntax}
                            passContentToParent={this.getContent}
                            languageFilesHost={location.host}
                            fullscreen={!!location}
                            editorTopOffset={48}
                            editorReady={this.editorReady}
                        />
                    </CardContent>
                </Card>
                {this.renderDialog()}
            </div>
        );
    }
}

Editor.propTypes = {
    content: PropTypes.string,
    etag: PropTypes.string,
    file: PropTypes.string,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func,
    location: PropTypes.shape({
        search: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const editorRoot = state.get('editor');
    return {
        content: editorRoot.get('content'),
        etag: editorRoot.get('etag'),
        file: editorRoot.get('file'),
        isFetching: editorRoot.get('isFetching'),
        title: editorRoot.get('title'),
    };
}

const ConnectedEditor = connect(mapStateToProps)(Editor);
export default ConnectedEditor;
