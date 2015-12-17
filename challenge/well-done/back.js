module.exports = {
    keyWord : 'a-true-wiser',
    check : function(answer, data, req) {

        if(data && data.saved) {
            return `Yes, yes, ${data.saved}, I remember!`;
        } else {
            req.session.data || (req.session.data = {});
            req.session.data['well-done'] = {saved: answer};
        }

        return `Really? ${answer}? Ah well...`;
    }
};
