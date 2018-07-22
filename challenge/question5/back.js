module.exports = {
    keyWord : 'one-song-glory',
    check : function(answer) {
        return answer.toString().toLowerCase() == 'rent' ? true : "Hmmm, try again";
    }
};
