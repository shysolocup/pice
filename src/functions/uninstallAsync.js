const pepm = require('../index.js');


function PepmUninstallAsync (pkg="", args={}) {
    args.async = true;
    return this.uninstall(pkg, args);
}


// aliases
let aliases = [ 
    "uninstallAsync", "unlinkAsync", "removeAsync", 
    "rmAsync", "rAsync", "unAsync"
];
aliases.forEach( a => pepm.newF(a, PepmUninstallAsync));
