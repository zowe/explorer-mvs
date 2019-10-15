#!/bin/sh

################################################################################
# This program and the accompanying materials are made available under the terms of the
# Eclipse Public License v2.0 which accompanies this distribution, and is available at
# https://www.eclipse.org/legal/epl-v20.html
#
# SPDX-License-Identifier: EPL-2.0
#
# Copyright IBM Corporation 2019
################################################################################

################################################################################
# Variables required on shell:
# - STATIC_DEF_CONFIG_DIR
# - ROOT_DIR
# - NODE_HOME


if [ ! -z "$NODE_HOME" ]; then
  NODE_BIN=${NODE_HOME}/bin/node
else
  echo "Error: cannot find node bin, MVS Explorer UI is not configured."
  exit 1
fi

# Remove any old config
if [[ -f ${STATIC_DEF_CONFIG_DIR}/datasets_ui.yml ]]; then
    rm ${STATIC_DEF_CONFIG_DIR}/datasets_ui.yml 
fi

EXPLORER_CONFIG="$ROOT_DIR/components/mvs-explorer/bin/package.json"
EXPLORER_PLUGIN_BASEURI=$($NODE_BIN -e "process.stdout.write(require('${EXPLORER_CONFIG}').config.baseuri)")

# Add static definition for mvs explorer ui
cat <<EOF >$STATIC_DEF_CONFIG_DIR/datasets_ui.ebcdic.yml
#
services:
  - serviceId: explorer-mvs
    title: IBM z/OS Datasets UI
    description: IBM z/OS Datasets UI service
    catalogUiTileId:
    instanceBaseUrls:
      - https://$ZOWE_EXPLORER_HOST:$MVS_EXPLORER_UI_PORT/
    homePageRelativeUrl:
    routedServices:
      - gatewayUrl: ui/v1
        serviceRelativeUrl: $EXPLORER_PLUGIN_BASEURI
EOF


iconv -f IBM-1047 -t IBM-850 ${STATIC_DEF_CONFIG_DIR}/datasets_ui.ebcdic.yml > $STATIC_DEF_CONFIG_DIR/datasets_ui.yml	
rm ${STATIC_DEF_CONFIG_DIR}/datasets_ui.ebcdic.yml
chmod 770 $STATIC_DEF_CONFIG_DIR/datasets_ui.yml

