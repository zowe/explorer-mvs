/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

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

import ConnectedHomeView from './containers/pages/Home';
import ConnectedFullScreenEditor from './containers/pages/FullScreenEditor';

// redux dev tool extension enabled
let appMiddleware;
if (window.localStorage.getItem('enableReduxLogger') === 'true') {
    appMiddleware = applyMiddleware(thunk, createLogger());
} else {
    appMiddleware = applyMiddleware(thunk);
}

const store = appMiddleware(createStore)(rootReducer, Map({}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route exact={true} path="/" component={ConnectedHomeView} />
            <Route path="/editor" component={ConnectedFullScreenEditor} />
        </HashRouter>
    </Provider>,
    document.getElementById('menuapp'),
);
