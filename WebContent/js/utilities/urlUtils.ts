// @ts-nocheck
/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2020
 */

export function encodeURLComponent(URL: string) {
    return encodeURIComponent(URL);
}

export function atlasAction(endpoint: string, content) {
    return fetch(`https://${global.location.host}/ibmzosmf/api/v1/zosmf${endpoint}`, content);
}

export function atlasGet(endpoint: string) {
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

export function atlasDelete(endpoint: string) {
    const fetchParams = {
        method: 'DELETE',
        headers: { 'X-CSRF-ZOSMF-HEADER': '*' },
        credentials: 'include',
    };
    return atlasAction(endpoint, fetchParams);
}

export function atlasPost(endpoint: string, body) {
    const fetchParams = {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json', 'X-CSRF-ZOSMF-HEADER': '*' },
        credentials: 'include',
    };
    return atlasAction(endpoint, fetchParams);
}

export function atlasPut(endpoint: string, body: string, etag) {
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
