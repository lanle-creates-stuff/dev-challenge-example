module.exports = {
    keyWord : 'yes-men',
    check : function(answer) {
        return answer.toString().toLowerCase() == 'yes' ? true : "say what?";
    }
};
