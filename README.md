# redux-local-save [![NPM version](https://badge.fury.io/js/get-server-response-time.svg)](https://npmjs.org/package/get-server-response-time)

> Module for store state saving

## Installation

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


## License

MIT © [jeckyhit](https://github.com/jeckyhit)