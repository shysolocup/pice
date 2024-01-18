function PiceUninstallAsync (pkg="", args={}) {
    args.async = true;
    return this.uninstall(pkg, args);
}


// aliases
let aliases = [ 
    "uninstallAsync", "unlinkAsync", "removeAsync", 
    "rmAsync", "rAsync", "unAsync"
];
const pice = require('../index.js');
aliases.forEach( a => pice.newF(a, PiceUninstallAsync));
