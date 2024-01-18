function PiceUpdate(pkg="", args={}) {

    let global = (args.global) ? `-g` : "";           // global


    // command info
    let comStr = `npm update ${global} ${pkg}`.replace(/\s+/g,' ').replace(/^\s+|\s+$/,'');
    let com = new this.PiceCommand(comStr, pkg, {}, args);


    // sync executor
    if (args.sync || !args.async) com.__executor = this.exec(comStr);


    // async executor
    else if (args.async) {
        com.async = true;

        setImmediate( () => {
            try {
                com.__executor = this.execAsync(comStr)
                
                com.__executor.then( () => {
                    if (com.__listeners.then.length > 0) {
                        let req = require(pkg);
                        com.__listeners.then.forEach( f => f(req, com) );
                    }
                });

                com.__executor.finally( () => {
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
    "update", "up", 
    "upgrade", "udpate"
];
const pice = require('../index.js');
aliases.forEach( a => pice.newF(a, PiceUpdate));
