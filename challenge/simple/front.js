define(
    ['challenge/simple/data'],
    function(data) {
        return {
            message : "Okay, now sort DevChallenge.data case insensitive and put it to DevChallenge.answer",
            onLoad : function() {
                DevChallenge.data = data.list;
                DevCli.params = data;
            }
        };
    }
);
