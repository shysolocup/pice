function PiceRunAsync (cmd="", args={}) {
    args.async = true;
    return this.run(cmd, args);
}


// aliases
let aliases = [ 
    "runAsync"
];
const pice = require('../index.js');
aliases.forEach( a => pice.newF(a, PiceRunAsync));
