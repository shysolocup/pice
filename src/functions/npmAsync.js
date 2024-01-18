function PiceNpmAsync (cmd="", args={}) {
    args.async = true;
    return this.npm(cmd, args);
}


// aliases
let aliases = [ 
    "npmAsync"
];
const pice = require('../index.js');
aliases.forEach( a => pice.newF(a, PiceNpmAsync));
