module.exports = {
    getRandomInt : getRandomInt,
    generateRandomString : generateRandomString
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomString() {
    var min = arguments.length ? arguments[0] : 0;
    var max = arguments.length ? arguments[arguments.length-1] : 10;
    max = getRandomInt(min || 1, max || 1);

    var string = '';
    for(var i=0; i < max; i++) {
        if((max-i)%2) {
            string += String.fromCharCode(getRandomInt('a'.charCodeAt(0),'z'.charCodeAt(0)));
        } else {
            string += String.fromCharCode(getRandomInt('A'.charCodeAt(0),'Z'.charCodeAt(0)));
        }
    }

    return string;
}
