// Pice // Package Installer from Code Execution
// made by @paishee


const compile = require('./compile.js');
const aepl = require('aepl');
const util = require('util');


const pice = aepl.init("Pice", class {

    constructor() {
        let cpro = require('child_process');
        this.exec = cpro.execSync;
        this.execAsync = util.promisify(cpro.exec);
    }

});


module.exports = new pice;


let dirs = [ "classes", "functions" ];
dirs.forEach( d => compile(d) );
