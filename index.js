import { saveInStorage, loadStorage, saveCurrStateDebug, saveCurrState } from "./utils";
import { SAVE_NAME, SAVE_STORAGE } from './constants'
//extensions
import debounce from "./extension/debounce";
import throttle from './extension/throttle';

/**
 * Returns a middleware for redux store
 * @param {{saveActions: Array, saveName: String, isDebug: Boolean}} options - Extra options
 * @return {function} store => next => action 
 */
export default function createLocalSaveMiddleware(options) {
    /*Default options*/
    options = options !== undefined ? options : {}
    //there are two types of "saveAction"
    //1. DUMB: [TEST_ACTION_1, TEST_ACTION_2] (just a string means type action)
    //2 SMART: [{type: TEST_ACTION_1}, {type: TEST_ACTION_2, debounce: 1000}] (for example, it is possible to pass additional parameters)
    options.saveActions = options.saveActions !== undefined ? options.saveActions : []
    options.saveName = options.saveName ? options.saveName : ''
    options.isDebug = !!options.isDebug
    /****/

    return store => {

        const _saveCurrState = options.isDebug ?
            saveCurrStateDebug.bind(null, saveInStorage, store.getState, options.saveName)
            :
            saveCurrState.bind(null, saveInStorage, store.getState, options.saveName)

        return next => {
            return action => {
                const result = next(action)
                if (options.saveActions.some(saveAction => {
                    //such a check, because we get two types of actions
                    //1. DUMB: [TEST_ACTION_1, TEST_ACTION_2] (just a string means type action)
                    //2 SMART: [{type: TEST_ACTION_1, throttle: 500}, {type: TEST_ACTION_2, debounce: 1000}] (for example, it is possible to pass additional parameters)
                    if (!saveAction.type && saveAction !== action.type || saveAction.type && saveAction.type !== action.type)
                        return false

                    //debounce is an option that specifies how long the action should not come again for save
                    //throttle is an options that 
                    if (saveAction.debounce === undefined && saveAction.throttle === undefined)
                        return true

                    if (saveAction.debounce)
                        debounce(saveAction, _saveCurrState)
                    else
                        throttle(saveAction, _saveCurrState)

                    return false
                }) ||/* default action to save -> */action.type === SAVE_STORAGE)
                    _saveCurrState()
                return result
            }
        }
    }
}

export * from './AC'
export * from './constants'
export * from './utils'