const pepm = require('../index.js');


function PepmUninstall (pkg="", args={}) {

    // arguments
    let argList = {
        save: (args.save) ? `--save` : "",                  // save
        noSave: (args.noSave) ? `--no-save` : "",           // no save
    };

    let global = (args.global) ? `-g` : "";                 // global


    // command info
    let comStr = `npm uninstall ${global} ${pkg} ${Object.values(argList).join(" ")}`.replace(/\s+/g,' ').replace(/^\s+|\s+$/,'');
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
                        com.__listeners.then.forEach( f => f(com) );
                    }
                });

                com.executor.finally( () => {
                    if (com.__listeners.finally.length > 0) {
                        com.__listeners.finally.forEach( f => f(com) );
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
                com.__listeners.then.forEach( f => f(com) );
            })()
        }

        if (com.__listeners.finally.length > 0) {
            (async () => {
                com.__listeners.finally.forEach( f => f(com) );
            })()
        }
    });

    return com;
}


// aliases
let aliases = [ 
    "uninstall", "unlink", "remove", 
    "rm", "r", "un"
];
aliases.forEach( a => pepm.newF(a, PepmUninstall));
