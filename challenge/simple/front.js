devDefine(
    ['challenge/simple/data'],
    function(data) {
        return {
            message : "Okay, now sort DevChallenge.data case insensitive and put it to DevChallenge.answer",
            onLoad : function() {
                gtkmChallenge.data = data.list;
                DevCli.params = data;
            }
        };
    }
);
