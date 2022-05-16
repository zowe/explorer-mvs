/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

 import { constructAndPushMessage } from './snackbarNotifications';
 import { atlasGet } from '../utilities/urlUtils';
 import { checkForValidationFailure } from './validation';
 
 export const REQUEST_DOWNLOAD_RESOURCE = 'REQUEST_DOWNLOAD_RESOURCE';
 export const RECEIVE_DOWNLOAD_RESOURCE = 'RECEIVE_DOWNLOAD_RESOURCE';
 export const INVALIDATE_DOWNLOAD_RESOURCE = 'INVALIDATE_DOWNLOAD_RESOURCE';
 const DOWNLOAD_FAIL_MESSAGE = 'Download failed for';
 
 function requestDownload(path) {
    return {
        type: REQUEST_DOWNLOAD_RESOURCE,
        path,
    };
}

function receiveDownload(path) {
    return {
        type: RECEIVE_DOWNLOAD_RESOURCE,
        path,
    };
}

function invalidateDownload(path) {
    return {
        type: INVALIDATE_DOWNLOAD_RESOURCE,
        path,
    };
}
 
 export function createAndDownloadElement(blob, fileName) {
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = fileName;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

 export function download(job) {
     return dispatch => {
         dispatch(requestDownload(job));
         return atlasGet(`/restfiles/ds/${encodeURIComponent(job)}`)
             .then(response => {
                 return dispatch(checkForValidationFailure(response));
             })
             .then(response => {
                 if (response.ok) {
                     return response.text()
                 }
                 throw Error(response.statusText);
             })
             .then(text => {
                const blob = new Blob([text], { type: 'text/plain' });
                createAndDownloadElement(blob, job);
                dispatch(receiveDownload(job));
             })
             .catch(() => {
                 dispatch(constructAndPushMessage(`${DOWNLOAD_FAIL_MESSAGE} ${job}`));
                 dispatch(invalidateDownload(job));
             });
     };
 }
 