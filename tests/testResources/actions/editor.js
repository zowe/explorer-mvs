/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

export const content = '//TSTJCICS JOB (ADL),ATLAS,MSGCLASS=0,CLASS=A,TIME=1440\n//*        THIS JOB SIMULATES A CICS REGION FOR 60 SECONDS';

export const newContent = 'new content';

export const datasetNoMember = 'ATLAS.TEST.JCL';

export const dataset = 'ATLAS.TEST.JCL(TSTJCICS)';

export const datasetMemberNew = 'TSTJNEW';

export const datasetDiffMemeber = `ATLAS.TEST.JCL(${datasetMemberNew})`;

export const checksum = '1EAC8542504731CBDBC42BB95008EAA8';

export const newChecksum = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
