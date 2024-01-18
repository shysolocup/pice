const pepm = require('../index.js');

pepm.newC("PiceCommand", class {
    constructor(string, pkg, argList, args) {
        this.str = string;
        this.pkg = pkg;
        this.argsList = argList;
        this.args = args;
        this.async = false;
        this.executor

        this.__listeners = {
            then: [],
            catch: [],
            finally: []
        };
    }

    then(f) {
        this.__listeners.then.push(f);
        return this;
    }

    catch(f) {
        this.__listeners.catch.push(f);
        return this;
    }

    finally(f) {
        this.__listeners.finally.push(f);
        return this;
    }
});
