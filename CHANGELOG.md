# Change Log
All notable changes to the MVS-Explorer will be documented in this file.

## <1.0.10>

### New features and enhancements
- Refactor MVS packagaing & installation scripts, and folder renames, to accomodate new iframe capability in ZLUX. Thanks @NakulManchanda
- Added manifest for API ML & App Framework installation using new plugin installation process. Thanks @JadinLuong, @jackjia-ibm

## <1.0.9>

### New features and enhancements

- Added trap int signal for zowe launcher to stop the running process

## <1.0.7>

### New features and enhancements

- Added loading icon to editor menu bar when opening a datasets contents (https://github.com/zowe/zlux/issues/291), Thanks @jordanCain
- Changed packaging and lifecycle start.sh script to support explorer-ui-server keyring support (https://github.com/zowe/zowe-install-packaging/pull/1177), Thanks @stevenhorsman, @js665999, @nakulmanchanda, @jackjia-ibm
- Added .npmrc to specify npm registry as config. Thanks @nakulmanchanda 

## <1.0.6>

### New features and enhancements

- Changed packaging and lifecycle start.sh script to support explorer-ui-server keyring support (https://github.com/zowe/zowe-install-packaging/pull/1177), Thanks @stevenhorsman, @js665999, @nakulmanchanda, @jackjia-ibm
- Added ability to collapse and resize dataset tree (https://github.com/zowe/zlux/issues/259), Thanks @skurnevich

### Bug fixes

- Fix issue where dataset tree and content viewer were not aligned (https://github.com/zowe/zlux/issues/484), Tanks @jordanCain
- Add default value for ZOWE_EXPLORER_FRAME_ANCESTORS at lifecycle start script.           
  It resolves (https://github.com/zowe/explorer-ui-server/issues/44), thanks @nakulmanchanda

## <1.0.2>

### New features and enhancements
<!--- - Format: Added support for <xx>. (Issue/PR number) [Doc link if any] [Thanks @contributor] --->
- Build enhancements moved copy static files inside webpack, and added local storage flag to enable redux logger - Nakul

### Bug fixes
<!--- - Format: Fixed <xx>. (Issue/PR number) [Doc link if any] [Thanks @contributor] --->
- Fixed bug where user could end up in infinite authorization loop due to z/OSMF Ltps and APIML JWT not expiring at same time (https://github.com/zowe/api-layer/issues/615), Thanks @jordanCain
- Added accesibility improvements in the form of an announcer for notification to alert screen readers and
page title updates on page loads. (https://github.com/zowe/explorer-mvs/pull/116), Thanks @jordanCain
