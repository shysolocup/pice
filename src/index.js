// pepm // Program-Encased Package Manager
// made by @paishee


const aepl = require('aepl');
const compile = require('./compile.js');


const pepm = aepl.init("Pepm", class {

    constructor() {
        this.exec = require('child_process').execSync;
    }

});


module.exports = new pepm;


let dirs = [ "classes", "functions" ];
dirs.forEach( d => compile(d) );
