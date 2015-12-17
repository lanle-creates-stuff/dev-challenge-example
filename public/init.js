var apiUrl = 'http://localhost:3000';

require.config({
    baseUrl: apiUrl
});

require(
    [],
    function() {
        window.DevChallenge = {
            jumpTo : function(keyword) {
                $.get(apiUrl + '/jumpTo', { keyword: keyword })
                    .done(loadTask);
            }
        };
        window.DevCli = {
            currentTask : 'welcome',
            taskRoot : 'challenge/',
            checkAnswer: function(answer) {
                $.ajax(apiUrl + '/check', {
                    type: "POST",
                    xhrFields: { withCredentials: true },
                    data: { task: DevCli.currentTask , answer : answer },
                    crossDomain: true
                }).done(loadTask);
            },
            nextTask : function(task) {
                DevCli.showMessage(task.message);

                this.reset();
                task.onLoad && task.onLoad();

                return task;
            },
            reset : function() {
                DevChallenge.data = null;
            },
            showMessage : function(msg) {
                console.log('%c' + msg, 'color: #002866');
            },
            showError : function(msg) {
                console.log('%c' + msg, 'color: red');
            }
        };

        var showTask = function(task) {
            this.nextTask(task);
        }.bind(DevCli);


        require([DevCli.taskRoot + 'welcome'], showTask);

        Object.defineProperty(DevChallenge, "answer", {
          get: function() {return 'set your answer here'; },
          set: function(v) { DevCli.checkAnswer(v); }
        });


        function loadTask(response) {
            if(response.error) {
                DevCli.showError(response.error);
            } else if(response.next) {
                DevCli.currentTask = response.next;
                if(response.keyWord) {
                    DevChallenge.keyWord = response.keyWord;
                    DevCli.showMessage(sayHallelujah() + '! Your keyword is: ' + response.keyWord);
                }
                console.log(separator());
                require([DevCli.taskRoot + response.next], showTask);
            } else {
                DevCli.showError('Hmm, something went wrong..?');
            }
        }
    }
);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sayHallelujah() {
    return [
        "Sweet", "Awesome", "Nice", "Hallelujah"
    ][getRandomInt(0, 3)];
}

function separator() {
    return '--------------------------------------------------------------';
}
