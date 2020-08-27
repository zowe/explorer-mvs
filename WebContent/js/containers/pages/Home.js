/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import Editor from '../../components/editor/Editor';
import ConnectedDatasetTree from '../DatasetTree';
import LoginDialog from '../../components/dialogs/LoginDialog';
import ConnectedSnackbar from '../../components/Snackbar';
import debounce from '../../utilities/debounce';

const HomeView = props => {
    const { validated } = props;
    const gridOfTwelveCol3 = 0.238;
    const widthForFullScreen = 600;
    const minContainerWidth = 260;

    const [moveMode, setMoveMode] = useState(false);
    const [collapsed, setCollapse] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [treeWidthPercent, setTreeWidth] = useState(gridOfTwelveCol3);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth * treeWidthPercent < minContainerWidth) {
                setTreeWidth(minContainerWidth / window.innerWidth);
            }
        };
        const debHandleResize = debounce(handleResize, 100);
        window.addEventListener('resize', debHandleResize);
        return () => {
            window.removeEventListener('resize', debHandleResize);
        };
    });

    const recalcTreeWidth = mouseX => {
        const maxTreeWidth = window.innerWidth - minContainerWidth;
        const halfBarWidthCorrection = window.innerWidth * 0.005;
        let newX = mouseX;
        if (mouseX < minContainerWidth || mouseX > maxTreeWidth) {
            newX = (minContainerWidth < mouseX) ? maxTreeWidth : minContainerWidth;
        }
        setTreeWidth((newX - halfBarWidthCorrection) / window.innerWidth);
    };
    const debRecalcTreeWidth = debounce(recalcTreeWidth, 10);

    const onDraggingStart = event => {
        if (!collapsed) {
            event.preventDefault();
            setMoveMode(true);
        }
    };
    const onDragging = event => {
        if (moveMode) {
            debRecalcTreeWidth(event.clientX);
        }
    };
    const onDraggingEnd = event => {
        if (moveMode) {
            debRecalcTreeWidth(event.clientX);
            setMoveMode(false);
        }
    };


    if (validated) {
        return (
            <div className="row group">
                <div
                    className={moveMode ? 'action-layer draggable' : 'action-layer'}
                    onMouseUp={onDraggingEnd}
                    onMouseMove={onDragging}
                >
                    <div
                        id="explorer-sidebar"
                        className={`component col col-3 ${collapsed ? 'hidden' : ''}`}
                        style={windowWidth <= widthForFullScreen ? {} : { width: `${treeWidthPercent * 100}%` }}
                    >
                        <ConnectedDatasetTree id="datasetTree" title="Dataset Explorer" subtitle="Browse Datasets and members" type="datasets" />
                    </div>
                    <div
                        id="resize-bar"
                        className={`component col col-0-1 collapse-col ${collapsed ? '' : 'draggable'} `}
                        onMouseDown={onDraggingStart}
                    >
                        <IconButton
                            id="collapse-button"
                            className="collapse-btn"
                            onClick={() => {
                                setCollapse(!collapsed);
                            }}
                            onMouseDown={e => {
                                e.stopPropagation();
                            }}
                        >
                            <KeyboardArrowLeftIcon className={collapsed ? 'rotate-180' : ''} />
                        </IconButton>
                    </div>
                    <div
                        className={`component col ${collapsed ? 'col-11-8' : 'col-9-2'}`}
                        style={(collapsed || windowWidth <= widthForFullScreen) ? {} : { width: `calc(100% - ${treeWidthPercent * 100}% - 2%)` }}
                    >
                        <Editor />
                    </div>
                    <ConnectedSnackbar />
                </div>
            </div>
        );
    }
    return <LoginDialog />;
};

HomeView.propTypes = {
    validated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const validationRoot = state.get('validation');
    return {
        validated: validationRoot.get('validated'),
    };
}

const ConnectedHome = connect(mapStateToProps)(HomeView);
export default ConnectedHome;
