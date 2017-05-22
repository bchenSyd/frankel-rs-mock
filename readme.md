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


# deploy to azure  **NOTE: kudu doesn't run npm script unless you explicitly tell it to do so**

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
        
    3.3 log  

            remote: about to run `npm run build`
            remote: .....
            remote: src\resolvers\race.js -> dist\resolvers\race.js
            remote: src\resolvers\utils.js -> dist\resolvers\utils.js
            remote: `npm run build` Finished successfully.
            remote: Finished successfully.
            remote: Running post deployment command(s)...
            remote: post-deploy
            remote:
            remote: D:\home\site\repository>echo can you see me?
            remote: can you see me?
            remote: Deployment successful.
            To https://frankel-rs.scm.azurewebsites.net/frankel-rs.git
            1cd258c..e7eab54  master -> master
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


# publish `graphql-tools-bchen`
# publish a npm package
## login to npm via `npm adduser`
>if username exists, login; otherwise signup
```
$ npm adduser --registry=https://registry.npmjs.org
Username: bochen2014
Password: Op*\*do\*0*
Email: (this IS public) bochen2014@yahoo.com
Logged in as bochen2014 on https://registry.npmjs.org/.
```
## make sure you have `prepublish` defined

 ```
 package.json
 {
    "prepublish": "tsc",
    "main": "dist/index.js",  // only this file ,along with its referenced file**S**, are uploaded
 }

tsconfig.json
{
  	"rootDir": "./src",
	"outDir": "./dist",
}
 ```

## run `npm publish --registry=https://registry.npmjs.org`
```
$ npm whoami --registry=https://registry.npmjs.org
bochen2014
$ npm publish --registry=https://registry.npmjs.org

> graphql-tools-bchen@0.11.0 prepublish D:\graphql-tools
> npm run compile


> graphql-tools-bchen@0.11.0 compile D:\graphql-tools
> tsc

+ graphql-tools-bchen@0.11.0
```
