const pepm = require('../index.js');

function PepmRun (cmd="", args={}) {

    // command info
    let com = new this.PepmCommand(cmd, "", {}, args);


    // sync executor
    if (args.sync || !args.async) com.executor = this.exec(cmd);


    // async executor
    else if (args.async) {
        com.async = true;

        setImmediate( () => {
            try {
                com.executor = this.execAsync(cmd)
                
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
    "run"
];
aliases.forEach( a => pepm.newF(a, PepmRun));
