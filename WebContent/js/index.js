/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

/* global document */

import 'whatwg-fetch';

import { Map } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

import HomeView from './containers/pages/Home';
import FullScreenEditor from './containers/pages/FullScreenEditor';

const store = applyMiddleware(thunk, createLogger())(createStore)(rootReducer, Map({}));

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route path="/" component={HomeView} />
            <Route path="/editor" component={FullScreenEditor} />
        </HashRouter>
    </Provider>
    , document.getElementById('menuapp'));
