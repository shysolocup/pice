const pepm = require('../index.js');


function PepmInstallAsync (pkg="", args={}) {
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
aliases.forEach( a => pepm.newF(a, PepmInstallAsync));
