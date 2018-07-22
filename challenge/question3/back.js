module.exports = {
    keyWord : 'flux capacitor',
    check : function(answer) {
        return answer.toString().toLowerCase() == 'the goonies' ? true : "say what? - try again!";
    }
};
