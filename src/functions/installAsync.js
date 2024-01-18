function PiceInstallAsync (pkg="", args={}) {
    args.async = true;
    return this.install(pkg, args);
}


// aliases
let aliases = [ 
    "installAsync", "addAsync", "iAsync", 
    "inAsync", "insAsync", "instAsync", 
    "instaAsync", "instalAsync", "isntAsync", 
    "isntaAsync", "isntalAsync", "isntallAsync" 
];
const pice = require('../index.js');
aliases.forEach( a => pice.newF(a, PiceInstallAsync));
