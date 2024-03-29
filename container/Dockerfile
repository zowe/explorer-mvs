#######################################################################
# This program and the accompanying materials are made available
# under the terms of the Eclipse Public License v2.0 which
# accompanies this distribution, and is available at
# https://www.eclipse.org/legal/epl-v20.html
#
# SPDX-License-Identifier: EPL-2.0
#
# Copyright Contributors to the Zowe Project.
#######################################################################

# base image tag
ARG ZOWE_BASE_IMAGE=latest-ubuntu

FROM zowe-docker-release.jfrog.io/ompzowe/base-node:${ZOWE_BASE_IMAGE} AS builder

##################################
# labels
LABEL name="MVS Explorer" \
    maintainer="jack-tiefeng.jia@ibm.com" \
    vendor="Zowe" \
    version="0.0.0" \
    release="0" \
    summary="IBM z/OS Unix Datasets UI service" \
    description="This Zowe UI component can display MVS datasets on z/OS"

##################################
# switch context
USER zowe
WORKDIR /home/zowe

##################################
# copy files
COPY --chown=zowe:zowe component .

##################################
# build component
# upgrade npm to v7
# pretty same as .pax/prepare-workspace.sh. any way we can merge?
RUN mkdir -p ~/.npm-global \
    && npm config set prefix '~/.npm-global' \
    && npm install -g npm@7.24.2 \
    && ~/.npm-global/bin/npm install --no-audit --ignore-scripts --no-optional --legacy-peer-deps \
    && ~/.npm-global/bin/npm run prod \
    && mkdir -p final/web \
    && mkdir -p final/bin \
    && cp README.md final \
    && cp package.json final/web \
    && cp package-lock.json final/web \
    && cp -r dist/. final/web \
    && cp manifest.yaml final \
    && cp pluginDefinition.prod.json final/pluginDefinition.json

##################################
# second stage
FROM zowe-docker-release.jfrog.io/ompzowe/base-node:${ZOWE_BASE_IMAGE}

##################################
# switch context
USER zowe
WORKDIR /component

##################################
# copy files
COPY --from=builder --chown=zowe:zowe /home/zowe/final ./
COPY --chown=zowe:zowe component/LICENSE /licenses
