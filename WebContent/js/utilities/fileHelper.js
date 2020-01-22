/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */

export function parseFileName(file) {
    if (file === '') {
        return { DSName: '', DSMember: '' };
    }

    let end = file.indexOf('(');
    if (end === -1) {
        end = file.length;
    }
    return { DSName: file.substring(0, end),
        DSMember: file.substring(file.indexOf('(') + 1, file.indexOf(')')) };
}

export function hasMember(file) {
    return file !== undefined && file.indexOf('(') > 1;
}

