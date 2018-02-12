// keys.js - figure out what set of credentials to return

if (process.env.NODE_ENV === 'production') {
    // return production keys
    module.exports = require('./prod');
} else {
    // return dev keys
    // I am exporting and requiring in the dev file at the same time
    module.exports = require('./dev');
}
