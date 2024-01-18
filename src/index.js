// pepm // Program-Encased Package Manager
// made by @paishee


const compile = require('./compile.js');
const aepl = require('aepl');
const util = require('util');


const pepm = aepl.init("Pepm", class {

    constructor() {
        let cpro = require('child_process');
        this.exec = cpro.execSync;
        this.execAsync = util.promisify(cpro.exec);
    }

});


module.exports = new pepm;


let dirs = [ "classes", "functions" ];
dirs.forEach( d => compile(d) );
