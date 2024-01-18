const pepm = require('../index.js');


function PepmUpdate(pkg="", args={}) {

    let global = (args.global) ? `--global` : "";           // global


    // command info
    let comStr = `npm update ${global} ${pkg}`;
    let com = new this.PepmCommand(comStr, pkg, {}, args);


    // executor
    if (args.sync || !args.async) com.executor = this.execSync(comStr);
    else if (args.async) { com.async = true; com.executor = this.execAsync(comStr); }


    // then
    setImmediate( () => {
        if (com.__listeners.then.length > 0) {
            com.__listeners.then.forEach( f => f(com) );
        }
    });


    return com;
}


// aliases
let aliases = [ 
    "update", "up", 
    "upgrade", "udpate"
];
aliases.forEach( a => pepm.newF(a, PepmUpdate));
