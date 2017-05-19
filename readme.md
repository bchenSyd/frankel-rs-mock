# how did I get here

## 1. local development using `babel-node`
## 2. production using node.js
setup project structure
1. `cp index.js dist/`
2. change `import schema from './src/mockSchema';` to `import schema from './lib/mockSchema';`
    becuase we want to call compiled result `lib`
3. `npm run compile-index`  
    NOTE:   1. this is a one-off thing as you don't change index.js often (some people hardcode index.js )
            2. when compiling, bable doesn't check the existence of `./lib` folder
4. `npm run compile`  
    NOTE: 
            this is the real stuff. expected to be run everytime during deployment


# deploy to azure
```
azure site create --git frankel-rs
// https://bambora@frankel-rs.scm.azurewebsites.net/frankel-rs.git
```