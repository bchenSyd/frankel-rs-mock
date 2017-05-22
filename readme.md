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


# deploy to azure  **NOTE: iisnode completely ignore your package.json**

1. add `prepublish` script 
```
    "prepublish":"npm run compile",
```
so that when you run `git push azure master` , which cause `azure (kudu)` to do `npm install`, you code get compiled along the way


2. create site
```
azure site create --git frankel-rs
// https://bambora@frankel-rs.scm.azurewebsites.net/frankel-rs.git
```

3. deploy.cmd or PostDeploymentAction

    3.1 custom deployment script
    ```
    $ npm install kuduscript -g

    # this will generate deployment script for you to do further customization. not mandatory though...
    $ kuduscript -y --node
    Generating deployment script for node.js Web Site
    Generated deployment script files
    ```
    3.2 use PostDeploymentAction  
        go to https://frankel-rs.scm.azurewebsites.net/DebugConsole

        cd D:\home\site\deployments\tools 
        mkdir PostDeploymentAction && cd PostDeploymentAction
        touch post-deploy.cmd
        echo 'echo can you see me?' > post-deploy.cmd
        

4. do we have to provide a `web.config` for azure ?  
if you don't source-control web.config, azure **might** generate one for you (if you `npm start` is like `node start-file.js`)
`git push azure master`  , or `git push azure develop:master` (map local develop to azure:master)

```
remote: Copying file: 'src\style\base.scss'  
remote: Copying file: 'xxxxx'   
remote: Copying file: 'xxxxxx'
remote: Using start-up script devServer.js from package.json. 
**remote: Generated web.config.**  
remote: The package.json file does not specify node.js engine version constraints.  
remote: The node.js application will run with the default node.js version 4.4.7.    
remote: Selected npm version 2.15.8     
```


NOTE:   you may still need to run `npm run compile` on `kudu` console to get code compiled. becuase again, **NOTE: iisnode completely ignore your package.json**