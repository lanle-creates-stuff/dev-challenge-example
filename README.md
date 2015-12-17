# dev-challenge-example
An example challenge using our [dev-challenge-server](https://github.com/transferwise/dev-challenge-server) module. And a glimpse for you to see under the hood of our dev challenge on [transferwise.com](https://transferwise.com).

## Get started
Just clone the repo locally, go to the folder and run 
```
npm install
node app.js
```
It spins up an https server on port 3000 so all you need is to go to [https://localhost:3000/test.html](https://localhost:3000/test.html) and play with the console.

I'd recommend to have the latest node version (4.1.0) to be able to run the app.

## Adding challenges

To add new tests to the challenge just create a folder for it in the *challenge* directory and create these files:
* **front.js** - goes to the browser, make sure you don't have too many hints in there
* **back.js** - your backend code to validate the answer, needs a check method which returns true if passed, a string to be passed otherwise
* **data.js** (optional) - generates the data to be used in the task. This way original data cannot be manipulated from frontend as it is stored on the backend as well.

**Make sure you included the new task in the config.js in the task list!**

## Important objects in the frontend
* **DevChallenge** - the main object for communication with the user. There is a listener on the answer property which will send it to the backend. Also all data should be in the data property for the user to play with
* **DevCli** - this is the behind the scenes object wich takes care of the communication itself. Contains the current task, params and all necessary info to be passed between the server and the browser.

## Communication between backend and frontend
If you want your data to be immutable from the frontend, create a data.js file to generate it and your data will be stored automatically in the session. You can find examples for it in the simple challenge.
