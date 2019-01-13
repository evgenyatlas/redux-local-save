import { saveInStorage, loadStorage } from "./utils";
import { SAVE_NAME, SAVE_STORAGE } from './constants'

/**
 * Returns a middleware for redux store
 * @param  {Options} options.
 * @return {function} store => next => action 
 */
export function createLocalSaveMiddleware(options) {
    /*Default options*/
    options = options !== undefined ? options : {}
    options.saveActions = options.saveActions !== undefined ? options.saveActions : []


    return store => {

        function saveCurrState() {
            saveInStorage(store.getState())
        }

        return next => {
            return action => {
                next(action)
                if (options.saveActions.some(saveAction => {
                    //such a check, because we get two types of actions
                    //1. DUMB: [TEST_ACTION_1, TEST_ACTION_2] (just a string means type action)
                    //2 SMART: [{type: TEST_ACTION_1}, {type: TEST_ACTION_2, throttle: 1000}] (for example, it is possible to pass additional parameters)
                    if (!saveAction.type && saveAction !== action.type || saveAction.type && saveAction.type !== action.type)
                        return false

                    //throttle is an option that specifies how long the action should not come again for save
                    if (saveAction.throttle === undefined)
                        return true

                    if (saveAction._timerId) clearTimeout(saveAction._timerId)
                    saveAction._timerId = setTimeout(saveCurrState, saveAction.throttle)

                }) ||/* default action to save -> */action.type === SAVE_STORAGE)
                    saveInStorage(store.getState())
            }
        }
    }
}

export * from './AC'
export * from './constants'
export * from './utils'