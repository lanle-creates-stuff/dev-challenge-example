module.exports = {
    keyWord : 'I-know-basics',
    dataRequired : true,
    check : function(answer, data) {
        var correctAnswer = data.list.sort(function(a,b) {return a.toLowerCase() > b.toLowerCase()});
        return answer.toString() == correctAnswer.toString()
            ? true : "not quite";
    }
};
