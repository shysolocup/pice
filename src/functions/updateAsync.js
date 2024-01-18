function PiceUpdateAsync (pkg="", args={}) {
    args.async = true;
    return this.update(pkg, args);
}


// aliases
let aliases = [ 
    "updateAsync", "upAsync", 
    "upgradeAsync", "udpateAsync"
];
const pice = require('../index.js');
aliases.forEach( a => pice.newF(a, PiceUpdateAsync));
