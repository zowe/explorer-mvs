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
    let server = global.location.host;
    if (global.location.hostname === 'tester.test.com') {
        server = 'tester.test.com:7443';
    }
    return server;
}


// zosmf/
const ZOSMF_PREFIX_LENGTH = 6;

export function atlasAction(endpoint, content) {
    // In v3, /ibmzosmf/api/v1 endpoint removes /zosmf part of a /zosmf URL, so string must be trimmed.
    endpoint = endpoint.substring(ZOSMF_PREFIX_LENGTH);

    return fetch(`https://${whichServer()}/ibmzosmf/api/v1/zosmf${endpoint}`, content);
}

export function atlasGet(endpoint) {
    const fetchParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Expose-Headers': 'ETag',
            'X-IBM-Attributes': 'base',
            'X-CSRF-ZOSMF-HEADER': '*',
            'X-IBM-Response-Timeout': 60,
        },
        credentials: 'include',
    };
    return atlasAction(endpoint, fetchParams);
}

export function atlasDelete(endpoint) {
    const fetchParams = {
        method: 'DELETE',
        headers: { 'X-CSRF-ZOSMF-HEADER': '*' },
        credentials: 'include',
    };
    return atlasAction(endpoint, fetchParams);
}

export function atlasPost(endpoint, body) {
    const fetchParams = {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json', 'X-CSRF-ZOSMF-HEADER': '*' },
        credentials: 'include',
    };
    return atlasAction(endpoint, fetchParams);
}

export function atlasPut(endpoint, body, etag) {
    let header;
    if (body.includes('"request": "rename"') || body.includes('"request":"Submit Job"')) {
        header = { 'Content-Type': 'application/json', 'X-CSRF-ZOSMF-HEADER': '*' };
    } else {
        header = { 'Content-Type': 'text/plain', 'X-IBM-Data-Type': 'text', 'X-CSRF-ZOSMF-HEADER': '*' };
    }
    if (etag) {
        header['If-Match'] = etag;
    }
    const fetchParams = {
        method: 'PUT',
        body,
        headers: header,
        credentials: 'include',
    };
    return atlasAction(endpoint, fetchParams);
}
