/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */
// let host = 'winmvs3b.hursley.ibm.com:7288';
let host = 'localhost:22957';
if (typeof location !== 'undefined') {
    const hostname = location.hostname;
    if (hostname !== 'localhost') {
        host = location.host;
    }
}
export const LOCAL_DEV_SERVER = host;

export function encodeURLComponent(URL) {
    return encodeURIComponent(URL);
}

function whichServer() {
    let server = LOCAL_DEV_SERVER;
    if (location.hostname === 'tester.test.com') {
        server = 'tester.test.com:7443';
    }
    return `${server}/api/v1`;
}
function atlasAction(endpoint, fetchParams) {
    return fetch(`https://${whichServer()}/${endpoint}`, fetchParams);
}

export function atlasGet(endpoint) {
    const fetchParams = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
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

export function atlasPut(endpoint, content, checksum) {
    const header = { 'Content-Type': 'application/json' };
    if (checksum) {
        header['If-Match'] = checksum;
    }
    const fetchParams = {
        method: 'PUT',
        body: `{"records": "${content}"}`,
        headers: header,
        credentials: 'include' };
    return atlasAction(endpoint, fetchParams);
}
