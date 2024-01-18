const pepm = require('../index.js');


function PepmUpdate(pkg="", args={}) {

    let global = (args.global) ? `-g` : "";           // global


    // command info
    let comStr = `npm update ${global} ${pkg}`;
    let com = new this.PepmCommand(comStr, pkg, {}, args);


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
    "update", "up", 
    "upgrade", "udpate"
];
aliases.forEach( a => pepm.newF(a, PepmUpdate));
