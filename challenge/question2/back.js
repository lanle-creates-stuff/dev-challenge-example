module.exports = {
    keyWord : 'Wyld Stallyns',
    check : function(answer) {
        return answer.toString().toLowerCase() == 'guitar' ? true : "Hmm, not quite. Try again";
    }
};
