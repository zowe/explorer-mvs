/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import { Map } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import ConnectedHomeView from './containers/pages/Home';
import ConnectedFullScreenEditor from './containers/pages/FullScreenEditor';

const appMiddleware = applyMiddleware(thunk);

const devToolsEnhancer = process.env.NODE_ENV !== 'production' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function'
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;
const store = appMiddleware(createStore)(rootReducer, Map({}), devToolsEnhancer);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route exact={true} path="/" component={ConnectedHomeView} />
            <Route path="/editor" component={ConnectedFullScreenEditor} />
        </HashRouter>
    </Provider>,
    document.getElementById('menuapp'),
);
