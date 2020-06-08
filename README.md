# explorer-mvs

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=zowe_explorer-mvs&metric=alert_status)](https://sonarcloud.io/dashboard?id=zowe_explorer-mvs)

The issues for the MVS explorer are tracked under the Zowe Zlux repository, https://github.com/zowe/zlux and tagged accordingly with the 'explorer-mvs' label. Open issues tagged with 'explorer-mvs' can be found [here](https://github.com/zowe/zlux/issues?q=is%3Aissue+is%3Aopen+label%3Aexplorer-mvs).


## App Development Workflow 

### Configure NPM Registry

This is required for explorer-ui-server, orion-editor-component and explorer-fvt-utilities. These modules are only published on Zowe Artifactory.

```
npm config set registry https://zowe.jfrog.io/zowe/api/npm/npm-release
```

### Install Dependencies

Configure your npm registry to pickup Zowe dependencies
```
npm config set registry https://zowe.jfrog.io/zowe/api/npm/npm-release/
npm install
```

### Build for Development

Modify the host variable in WebContent/js/utilities/urlUtils.js to a host and port that has the Zowe API Gateway and Jobs service.

```
npm run dev 
```

Then you can visit http://localhost:8080 to test.
When testing you may see errors with API calls do to CORS (Cross origin resource sharing), to work around this you may disable CORS checking in your browser for local development or setup a proxy.

### Run unit tests

```
npm run test
```

### Run fvt/selenium tests

See [README](/tests/FVTTests/README.md)


### Build for Production

```
npm run prod
```

### Prepare PAX Packaging Workspace

```
./.pax/prepare-workspace.sh
```

## Start With explorer-ui-server

After preparing PAX workspace, you can serve the explorer UI with explorer-ui-server:

```
node .pax/ascii/server/src/index.js --config .pax/ascii/server/configs/config.json
```

## Run SonarQube Code Analysis

Install [SonarQube Scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner).

If you are using Mac, try install with [HomeBrew sonar-scanner formula](https://formulae.brew.sh/formula/sonar-scanner), then update the configuration of SonarQube server at `/usr/local/Cellar/sonar-scanner/<version>/libexec/conf/sonar-scanner.properties`.

Example scanner configurations:

```
sonar.host.url=https://jayne.zowe.org:9000
sonar.login=<hash>
```

Then you can run `sonar-scanner` to start code analysis.

Build pipeline has embedded the SonarQube code analysis stage.


## Build and install as plugin in local zlux development environment

Modify `explorer-mvs/Webcontent/index.html`   
Change relative path for `iframe-adapter.js` & `logger.js` to absolute path.   
Append with your `API Gateway` `Hostname` and `Port`

For example:
```
  <script type="text/javascript" src="https://mymainframe.com:7554/ui/v1/zlux/lib/org.zowe.zlux.logger/0.9.0/logger.js"></script>
  <script type="text/javascript" src="https://mymainframe.com:7554/ui/v1/zlux/ZLUX/plugins/org.zowe.zlux.bootstrap/web/iframe-adapter.js"></script>
```

Build web folder
```
cd explorer-mvs
# root folder
npm install
# This will create web folder
npm run build
```

Install as ZLUX App/Plugin
```
# install in zlux locally
cd zlux/zlux-app-server/bin
./install-app.sh <path-to-explorer-mvs>
```
`explorer-mvs` root already have sample `pluginDefinition.json` & will have `web` folder after `build`.

## Enable Redux logs
Either use [Redux Dev Tool Browser Extension](https://github.com/reduxjs/redux-devtools) in your browser 
Or enable redux logs by setting `enableReduxLogger` variable `true` in your local storage.

### Add Redux Logger
While explore app is open in browser:
1. Run this in browser console 
```
window.localStorage.setItem('enableReduxLogger', true);
```

2. And refresh browser    
So as long as this value remains true in browser local storage,       
you will see redux logs in console.                  

### Remove Redux Logger          
While explore app is open in browser:      
1. Run either `window.localStorage.setItem('enableReduxLogger', false)`         
or `window.localStorage.removeItem('enableReduxLogger')`           
or clear storage manually in `browser dev tools` under `Application` tab 

2. And refresh browser to stop seeing redux console logs. 
