var utils = require('../utils');

module.exports = function() {
    var list = ["thegoonies"];
    for(var i=0; i< 10; i++) {
        list.push(utils.generateRandomString());
    }

    return { list: list };
};
