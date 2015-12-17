define(
    [],
    function() {
        return {
            message : `
================================================================================================================================================================

Welcome to Example challenge.

Use the object 'DevChallenge' to communicate with me. Just set the DevChallenge.answer property to send in your answers.

For every task you solve you will get a keyword. You can use that keyword later to jump to the task skipping all the previous ones by calling
> DevChallenge.jumpTo(keyword);

First question: are you ready?
================================================================================================================================================================
`
        };
    }
);
