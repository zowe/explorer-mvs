# Change Log
All notable changes to the MVS-Explorer will be documented in this file.

## <1.0.2>

### New features and enhancements
<!--- - Format: Added support for <xx>. (Issue/PR number) [Doc link if any] [Thanks @contributor] --->
- Build enhancements moved copy static files inside webpack, and added local storage flag to enable redux logger - Nakul 
- Added accesibility improvements in the form of an announcer for notification to alert screen readers and page title updates on page loads. (https://github.com/zowe/explorer-mvs/pull/116), Thanks @jordanCain
### Bug fixes
<!--- - Format: Fixed <xx>. (Issue/PR number) [Doc link if any] [Thanks @contributor] --->
- Fixed bug where Datasets with special characters such as '$' could not be interacted with (https://github.com/zowe/zlux/issues/428), Thanks @jordanCain
- Fixed bug where user could end up in infinite authorization loop due to z/OSMF Ltps and APIML JWT not expiring at same time (https://github.com/zowe/api-layer/issues/615), Thanks @jordanCain

