"use strict";

module.exports = {
    load : require,

    data : function(config, task, req, res) {
        let generator = this.load(`${config.taskRoot}/${task}/data`);
        let data = {};
        if(typeof generator == 'function') {
            data = generator(req, res);
        }
        req.session.data || (req.session.data = {});
        req.session.data[task] = data;
        res.send(this.jsWrapper(data));
    },

    check : function(config, req, res) {
        if(!req.body.answer) {
            return res.json({
                error: "no answer defined"
            });
        }

        req.session.data || (req.session.data = {});

        let task = req.body.task || config.tasks[0];
        let answer = req.body.answer;
        let nextIndex = config.tasks.indexOf(task) + 1;
        let taskManager = this.load(`${config.taskRoot}/${task}/back`);

        // check if data is present
        if(taskManager.dataRequired && typeof req.session.data[task] === 'undefined') {
            return res.json({
                error: "Lost session? Can't access data."
            });
        }

        let response = taskManager.check(req.body.answer, req.session.data[task], req, res);

        if(response === true) {
            config.onSuccess && config.onSuccess(task, answer, req, res);
            return res.json({
                next: config.tasks[nextIndex],
                keyWord : taskManager.keyWord
            });
        } else {
            config.onFailure && config.onFailure(task, answer, req, res);
            return res.json({
                error: response
            });
        }
    },

    jumpTo : function(config, req, res) {
        let keyword = req.query.keyword;
        let found, nextTask;

        if(!keyword) {
            return res.json({
                error: 'missing keyword!'
            });
        }
        for(let task of config.tasks) {
            let taskManager = this.load(`${config.taskRoot}/${task}/back`);

            if(found) {
                nextTask = task;
                break;
            } else if(taskManager.keyWord.toLowerCase() == keyword.toLowerCase()) {
                found = true;
            }
        }
        if(nextTask) {
            config.onJumpTo && config.onJumpTo(nextTask, req, res);
            return res.json({
                next: nextTask
            });
        }
        config.onWrongKeword && config.onWrongKeword(task, keyword, req, res);
        return res.json({
            error: 'unknown keyword!'
        });
    },

    jsWrapper : function(data) {
        let json = JSON.stringify(data);
        return `devDefine([], function() {return ${json}})`;
    }
};
