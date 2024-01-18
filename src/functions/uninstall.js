const pepm = require('../index.js');


function PepmUninstall (pkg="", args={}) {

    // arguments
    let argList = {
        save: (args.save) ? `--save` : "",                  // save
        noSave: (args.noSave) ? `--no-save` : "",           // no save
    };

    let global = (args.global) ? `-g` : "";                 // global


    // command info
    let comStr = `npm uninstall ${global} ${pkg} ${Object.values(argList).join(" ")}`;
    let com = new this.PepmCommand(comStr, pkg, argList, args);


    // sync executor
    if (args.sync || !args.async) com.executor = this.exec(comStr);


    // async executor
    else if (args.async) {
        com.async = true;

        setImmediate( () => {
            try {
                com.executor = this.exec(comStr);
            } catch(e) {
                if (com.__listeners.catch.length > 0) {
                    com.__listeners.catch.forEach( f => f(e) );
                }
                else throw e;
            }
        })
    }


    // then
    setImmediate( () => {
        if (com.__listeners.then.length > 0) {
            let req = require(pkg);
            com.__listeners.then.forEach( f => f(req, com) );
        }
    });

    let ret = undefined

    if (com.async) setImmediate( () => { ret = com });
    else ret = com;

    return ret;
}


// aliases
let aliases = [ 
    "uninstall", "unlink", "remove", 
    "rm", "r", "un"
];
aliases.forEach( a => pepm.newF(a, PepmUninstall));
