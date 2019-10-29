# explorer-mvs

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=zowe_explorer-mvs&metric=alert_status)](https://sonarcloud.io/dashboard?id=zowe_explorer-mvs)

## Build

### Install Dependencies

```
npm install
```

Note: Requires access to npm registry with orion-editor-component
https://gizaartifactory.jfrog.io/gizaartifactory/webapp/#/artifacts/browse/tree/General/npm-release

Update npm.rc or run
```
npm config set registry https://gizaartifactory.jfrog.io/gizaartifactory/api/npm/npm-release/
npm login
```

### Build for Development

```
npm run dev
```

Then you can visit http://localhost:8080 to test.


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
