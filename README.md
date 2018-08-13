# explorer-mvs

Requires access to npm registry with orion-editor-component
https://gizaartifactory.jfrog.io/gizaartifactory/webapp/#/artifacts/browse/tree/General/npm-local-release

**Pre reqs**
```
npm install
```
Update npm.rc or run 
```
npm config set registry https://gizaartifactory.jfrog.io/gizaartifactory/api/npm/npm-local-release/
npm login
```

**Development:**
```
npm run dev 
GOTO: localhost:8080
```
**Production:**
```
npm run prod
```