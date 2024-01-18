const pepm = require('../index.js');


function PepmUpdateAsync (pkg="", args={}) {
    args.async = true;
    return this.update(pkg, args);
}


// aliases
let aliases = [ 
    "updateAsync", "upAsync", 
    "upgradeAsync", "udpateAsync"
];
aliases.forEach( a => pepm.newF(a, PepmUpdateAsync));
