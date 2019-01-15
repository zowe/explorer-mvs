/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import TreeDatasetMember from '../../WebContent/js/components/explorer/TreeDatasetMember';

function setUpPathAndMember(path, member) {
    const props = {
        parent: path,
        member,
        dispatch: () => {},
    };

    return shallow(<TreeDatasetMember {...props} />);
}

function testGetDataSetMemberName(path, member, expected) {
    const treeDataSetMember = setUpPathAndMember(path, member);
    it(`getDataSetAndMemberName should be ${expected}`, () => {
        expect(treeDataSetMember.instance().getDataSetAndMemberName()).toEqual(expected);
    });
}

describe('Component: TreeDatasetMember', () => {
    testGetDataSetMemberName('HLQ.ATLAS', 'MEMBER', 'HLQ.ATLAS(MEMBER)');
    testGetDataSetMemberName('HLQ.ATLAS.PATH.PDS', 'MEMBER', 'HLQ.ATLAS.PATH.PDS(MEMBER)');
    testGetDataSetMemberName('$.@.#.d', 'e', '$.@.#.d(e)');
    testGetDataSetMemberName('A-.d', 'e', 'A-.d(e)');
});
