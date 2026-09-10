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

export function whichServer() {
    let server = global.location.host;
    if (global.location.hostname === 'tester.test.com') {
        server = 'tester.test.com:7443';
    }
    return server;
}

export function atlasAction(endpoint: string, content) {
    return fetch(`https://${whichServer()}/ibmzosmf/api/v1/zosmf${endpoint}`, content);
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

// Raw dataset/member content write. Content-Type is fixed, never inferred from body, so a
// malicious buffer can't be relabelled as a z/OSMF utility request (see atlasPutJson).
export function atlasPutText(endpoint: string, body: string, etag) {
    const header = { 'Content-Type': 'text/plain', 'X-IBM-Data-Type': 'text', 'X-CSRF-ZOSMF-HEADER': '*' };
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

// z/OSMF "rename" utility request, see restfiles data set REST interface docs.
interface RenameDatasetRequest {
    request: 'rename';
    'from-dataset': {
        dsn: string;
        member?: string;
    };
}

// z/OSMF "Submit Job" utility request, see restjobs REST interface docs.
interface SubmitJobRequest {
    request: 'Submit Job';
    file: string;
}

type AtlasJsonRequestBody = RenameDatasetRequest | SubmitJobRequest;

// z/OSMF utility request (rename, submit job); body shape is restricted to known request types, never raw editor content.
export function atlasPutJson(endpoint: string, body: AtlasJsonRequestBody) {
    const fetchParams = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json', 'X-CSRF-ZOSMF-HEADER': '*' },
        credentials: 'include',
    };
    return atlasAction(endpoint, fetchParams);
}
