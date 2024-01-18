const pepm = require('../index.js');

function PepmInstall (pkg="", args={}) {

    // arguments
    let argList = {
        version: (args.version) ? `@${args.version}` : "",      // version
        tag: (args.tag) ? `@${args.tag}` : "",                  // tag
        dev: (args.dev) ? `--save-dev` : "",                    // save dev
        prod: (args.prod) ? `--save-prod` : "",                 // save prod
        optional: (args.optional) ? `--save-optional` : "",     // save optional
        noSave: (args.noSave) ? `--no-save` : "",               // no save
        exact: (args.exact) ? `--save-exact` : "",              // save exact
        bundle: (args.bundle) ? `---save-bundle` : "",          // save bundle
    };

    let global = (args.global) ? `-g` : "";                     // global


    // command info
    let comStr = `npm install ${global} ${pkg} ${ Object.values(argList).join(" ")}`;
    let com = new this.PepmCommand(comStr, pkg, argList, args);


    // sync executor
    if (args.sync || !args.async) com.executor = this.exec(comStr);


    // async executor
    else if (args.async) {
        com.async = true;

        setImmediate( () => {
            try {
                com.executor = this.execAsync(comStr)
                
                com.executor.then( () => {
                    if (com.__listeners.then.length > 0) {
                        let req = require(pkg);
                        com.__listeners.then.forEach( f => f(req, com) );
                    }
                });

                com.executor.finally( () => {
                    if (com.__listeners.finally.length > 0) {
                        let req = require(pkg);
                        com.__listeners.finally.forEach( f => f(req, com) );
                    } 
                });
            } catch(e) {
                if (com.__listeners.catch.length > 0) {
                    com.__listeners.catch.forEach( f => f(e) );
                }
                else throw e;
            }
        })
    }


    // then and finally
    if (!com.async) setImmediate( () => {
        if (com.__listeners.then.length > 0) {
            (async () => {
                let req = require(pkg);
                com.__listeners.then.forEach( f => f(req, com) );
            })()
        }

        if (com.__listeners.finally.length > 0) {
            (async () => {
                let req = require(pkg);
                com.__listeners.finally.forEach( f => f(req, com) );
            })()
        }
    });

    return com;
}


// aliases
let aliases = [ 
    "install", "add", "i", 
    "in", "ins", "inst", 
    "insta", "instal", "isnt", 
    "isnta", "isntal", "isntall" 
];
aliases.forEach( a => pepm.newF(a, PepmInstall));
