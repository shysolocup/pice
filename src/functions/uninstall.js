const pepm = require('../index.js');


function PepmUninstall (pkg="", args={}) {

    // arguments
    let argList = {
        save: (args.save) ? `--save` : "",                  // save
        noSave: (args.noSave) ? `--no-save` : "",           // no save
    };

    let global = (args.global) ? `--global ` : "";           // global


    // command info
    let comStr = `npm uninstall ${global} ${pkg} ${Object.values(argList).join(" ")}`;
    let com = new this.PepmCommand(comStr, pkg, argList, args);


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
    "uninstall", "unlink", "remove", 
    "rm", "r", "un"
];
aliases.forEach( a => pepm.newF(a, PepmUninstall));
