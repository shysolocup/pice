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

    let global = (args.global) ? `-g` : "";              // global


    // command info
    let comStr = `npm install ${global} ${pkg} ${ Object.values(argList).join(" ")}`;
    let com = new this.PepmCommand(comStr, pkg, argList, args);


    // executor
    if (args.sync || !args.async) com.executor = this.execSync(comStr);
    else if (args.async) { com.async = true; com.executor = this.execAsync(comStr); }


    // then
    setImmediate( () => {
        if (com.__listeners.then.length > 0) {
            let req = require(pkg);
            com.__listeners.then.forEach( f => f(req, com) );
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
