# Explorer MVS Image

[![Build ompzowe/explorer-mvs](https://github.com/zowe/explorer-mvs/actions/workflows/explorer-mvs-images.yml/badge.svg)](https://github.com/zowe/explorer-mvs/actions/workflows/explorer-mvs-images.yml)

## General Information

This image can be used to start MVS Explorer.

It includes 2 Linux Distro:

- Ubuntu
- Red Hat UBI

Each image supports both `amd64` and `s390x` CPU architectures.

## Usage

Image `zowe-docker-release.jfrog.io/ompzowe/explorer-mvs:latest` should be able to run with minimal environment variables:

- `KEYSTORE_KEY`: You can supply your own certificate private key, or use a development key located at `/component/explorer-ui-server/configs/server.key`.
- `KEYSTORE_CERTIFICATE`: You can supply your own certificate, or use a development certificate located at `/component/explorer-ui-server/configs/server.cert`.

Other environment variable(s) can be used:

- `MVS_EXPLORER_UI_PORT`: starting port, default is `8548`.
- `ZOWE_EXPLORER_HOST`: domain name to access the container, default is `localhost`.
- `ZOWE_IP_ADDRESS`: IP address to access the container, default is `127.0.0.1`.

Example commands:

```
# pull image
docker pull zowe-docker-release.jfrog.io/ompzowe/explorer-mvs:latest
# start container
docker run -it --rm \
    zowe-docker-release.jfrog.io/ompzowe/explorer-mvs:latest
```
