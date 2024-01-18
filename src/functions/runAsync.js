const pepm = require('../index.js');


function PepmRunAsync (cmd="", args={}) {
    args.async = true;
    return this.run(cmd, args);
}


// aliases
let aliases = [ 
    "runAsync"
];
aliases.forEach( a => pepm.newF(a, PepmRunAsync));
