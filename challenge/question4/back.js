module.exports = {
    keyWord : 'traceuse',
    check : function(answer) {
        return answer.toString().toLowerCase() == 'parkour' ? true : "say what?";
    }
};
