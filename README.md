# redux-local-save [![NPM version](https://badge.fury.io/js/redux-local-save.svg)](https://npmjs.org/package/get-server-response-time)

> Module for store state saving

## Installation and use

```sh
$ npm install --save redux-local-save
```
```js
import { createStore, applyMiddleware } from 'redux'
import createLocalSaveMiddleware, { loadStorage } from 'redux-local-save'

//Create middleware for installation.
const localSaveMiddleware = createLocalSaveMiddleware({
        //We specify actions which will start saving
        saveActions: [
            TEST_SAVE,
            //Debounce: each call defers saving to 300ms
            { type: TEST_SAVE_WITH_DEBOUNCE, debounce: 300 },
            //Throttle: call no more than 200ms
            { type: TEST_SAVE_WITH_THROTTLE, throttle: 200 }
        ]
    })

const store = createStore(
        reducer,
        //Load the saved state
        loadStorage(),
        applyMiddleware(localSaveMiddleware)
    )
```

## If the store you have more than one?
### Specify the storage name in options for createLocalSaveMiddleware and loadStorage
```js
//userStore.js
...
const localSaveMiddleware = createLocalSaveMiddleware({
        //We specify actions which will start saving
        saveName: 'userStore'
    })
const store = createStore(
        reducer,
        loadStorage('userStore'),
        applyMiddleware(localSaveMiddleware)
    )
...
//animalStore.js
...
const localSaveMiddleware = createLocalSaveMiddleware({
        //We specify actions which will start saving
        saveName: 'animalStore'
    })
const store = createStore(
        reducer,
        loadStorage('animalStore'),
        applyMiddleware(localSaveMiddleware)
    )
...
```

## Features

### We specify what action will start saving
```js
const localSaveMiddleware = createLocalSaveMiddleware({
        //there are two types of "saveAction"
        //1. DUMB: [TEST_ACTION_1, TEST_ACTION_2] (just a CONST (:string) means type action)
        //2. SMART: [{type: TEST_ACTION_1}, {type: TEST_ACTION_2, debounce: 1000}] (for example, it is possible to pass additional parameters)
        saveActions: [
            SEND_CURRENT_WORD,
            {type: SEND_PREVIOUS_WORD},
        ]
    })
```

###//


## License

MIT © [jeckyhit](https://github.com/jeckyhit)