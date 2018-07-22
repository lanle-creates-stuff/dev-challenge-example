module.exports = {
    keyWord : 'adventure-time',
    check : function(answer) {
        return answer.toString().toLowerCase() == 'dookie' ? true : "Nope! Try again.";
    }
};
