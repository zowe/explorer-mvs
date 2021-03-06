/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2020
 */

export function encodeURLComponent(URL) {
    return encodeURIComponent(URL);
}

export function whichServer() {
    let server = location.host;
    if (location.hostname === 'tester.test.com') {
        server = 'tester.test.com:7443';
    }
    return server;
}

export function atlasAction(endpoint, content) {
    return fetch(`https://${whichServer()}/api/v2/${endpoint}`, content);
}

export function atlasGet(endpoint) {
    const fetchParams = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Expose-Headers': 'ETag' },
        credentials: 'include' };
    return atlasAction(endpoint, fetchParams);
}

export function atlasDelete(endpoint) {
    const fetchParams = {
        method: 'DELETE',
        headers: { },
        credentials: 'include' };
    return atlasAction(endpoint, fetchParams);
}

export function atlasPost(endpoint, body) {
    const fetchParams = {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' };
    return atlasAction(endpoint, fetchParams);
}

export function atlasPut(endpoint, body, etag) {
    const header = { 'Content-Type': 'application/json' };
    if (etag) {
        header['If-Match'] = etag;
    }
    const fetchParams = {
        method: 'PUT',
        body,
        headers: header,
        credentials: 'include' };
    return atlasAction(endpoint, fetchParams);
}
