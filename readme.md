# how did I get here

## 1. local development using `babel-node`
## 2. production using node.js
setup project structure
1. `npm run compile-index`  
    NOTE:   1. this is a one-off thing as you don't change index.js often (some people hardcode index.js )
            2. when compiling, bable doesn't check the existence of `./lib` folder
2.  replace all `./src` with  `./dist` 
    e.g. change `var _mockSchema = require('./src/mockSchema');` to `var _mockSchema = require('./dist/mockSchema');`
    becuase we want to call compiled result `dist`

4. `npm run compile`  
    NOTE: 
            this is the real stuff. expected to be run everytime during deployment


# deploy to azure

1. add `prepublish` script 
```
    "prepublish":"npm run compile",
```
so that when `azure (kudu)` do `npm install`, you code get compiled along the way

2. create site
```
azure site create --git frankel-rs
// https://bambora@frankel-rs.scm.azurewebsites.net/frankel-rs.git
```