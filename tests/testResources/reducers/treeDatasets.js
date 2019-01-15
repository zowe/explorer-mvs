/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

import { Map } from 'immutable';

export const baseTreeDatasets = Map({
    datasets: Map({}),
    isFetching: false,
});

export const requestedTreeDatasets = Map({
    datasets: Map({}),
    isFetching: true,
});

export const treeDatasetsDSName = 'ATLAS.TEST.JCL';
export const treeDatasetsDSName2 = 'ATLAS.TEST.HIST';

export const treeDatasetsChildData = [
    'DEMOJOB',
    'TSTJCICS',
    'TSTJDB2',
    'TSTJIMS',
    'TSTJMQ',
    'TSTJ0001',
    'TSTJ0002',
    'TSTJ0003',
];

export const treeDatasetsChildData2 = [
    'DEMO',
    'TSTJD',
    'TSTJC',
    'TSTJB',
    'TSTJA',
    'TSTJ1',
    'TSTJ2',
    'TSTJ3',
];

export const receivedTreeDatasets = Map({
    datasets: Map({
        'ATLAS.TEST.JCL': Map({
            childData: treeDatasetsChildData,
            isToggled: true,
        }),
    }),
    isFetching: false,
});

export const received2TreeDatasets = Map({
    datasets: Map({
        'ATLAS.TEST.JCL': Map({
            childData: treeDatasetsChildData,
            isToggled: true,
        }),
        'ATLAS.TEST.HIST': Map({
            childData: treeDatasetsChildData2,
            isToggled: true,
        }),
    }),
    isFetching: false,
});

export const noChildrenReceivedTreeDatasets = Map({
    datasets: Map({
        'ATLAS.TEST.JCL': Map({
            childData: [],
            isToggled: true,
        }),
    }),
    isFetching: false,
});

export const untoggledReceivedTreeDatasets = Map({
    datasets: Map({
        'ATLAS.TEST.JCL': Map({
            childData: treeDatasetsChildData,
            isToggled: false,
        }),
    }),
    isFetching: false,
});

export const toggledReceived2TreeDatasets = Map({
    datasets: Map({
        'ATLAS.TEST.JCL': Map({
            childData: treeDatasetsChildData,
            isToggled: false,
        }),
        'ATLAS.TEST.HIST': Map({
            childData: treeDatasetsChildData2,
            isToggled: true,
        }),
    }),
    isFetching: false,
});
