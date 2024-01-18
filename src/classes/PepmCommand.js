const pepm = require('../index.js');

pepm.newC("PepmCommand", class {
    constructor(string, pkg, argList, args) {
        this.str = string;
        this.pkg = pkg;
        this.argsList = argList;
        this.args = args;
        this.async = false;
        this.executor

        this.__listeners = {
            then: []
        };
    }

    then(f) {
        this.__listeners.then.push(f)
    }
});
