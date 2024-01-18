const pepm = require('../index.js');


function PepmNpmAsync (cmd="", args={}) {
    args.async = true;
    return this.npm(cmd, args);
}


// aliases
let aliases = [ 
    "npmAsync"
];
aliases.forEach( a => pepm.newF(a, PepmNpmAsync));
