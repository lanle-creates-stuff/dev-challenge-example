module.exports = {
    keyWord : 'my-type-on-paper',
    check : function(answer) {
        return answer.toString().toLowerCase() == 'yes' ? true : "say what?";
    }
};
