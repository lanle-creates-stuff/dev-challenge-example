module.exports = {
    keyWord : 'thundercats-ho',
    check : function(answer) {
        return answer.toString().toLowerCase() == 'tape' ? true : "say what?";
    }
};
