module.exports = {
    keyWord : 'adventure-time',
    check : function(answer) {
        return answer.toString().toLowerCase() == 'rent' ? true : "say what?";
    }
};
