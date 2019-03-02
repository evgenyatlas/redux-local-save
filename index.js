import { saveInStorage, loadStorage } from "./utils";
import { SAVE_NAME, SAVE_STORAGE } from './constants'

/**
 * Returns a middleware for redux store
 * @param {{saveActions: Array, saveName: String, isDebug: Boolean}} options - Extra options
 * @return {function} store => next => action 
 */
export default function createLocalSaveMiddleware(options) {
    /*Default options*/
    options = options !== undefined ? options : {}
    options.saveActions = options.saveActions !== undefined ? options.saveActions : []
    options.saveName = options.saveName ? options.saveName : ''
    options.isDebug = !!options.isDebug
    /****/

    return store => {

        const saveCurrState = options.isDebug ?
            () => {
                console.log('-----SAVE_STATE-----' + options.saveName)
                console.log(store.getState())
                saveInStorage(store.getState(), options.saveName)
                console.log('-------------------')
            }
            :
            () => saveInStorage(store.getState(), options.saveName)


        return next => {
            return action => {
                const result = next(action)
                if (options.saveActions.some(saveAction => {
                    //such a check, because we get two types of actions
                    //1. DUMB: [TEST_ACTION_1, TEST_ACTION_2] (just a string means type action)
                    //2 SMART: [{type: TEST_ACTION_1}, {type: TEST_ACTION_2, debounce: 1000}] (for example, it is possible to pass additional parameters)
                    if (!saveAction.type && saveAction !== action.type || saveAction.type && saveAction.type !== action.type)
                        return false

                    //debounce is an option that specifies how long the action should not come again for save
                    if (saveAction.debounce === undefined)
                        return true

                    if (saveAction._timerId) clearTimeout(saveAction._timerId)
                    saveAction._timerId = setTimeout(saveCurrState, saveAction.debounce)

                    return false
                }) ||/* default action to save -> */action.type === SAVE_STORAGE)
                    saveCurrState()
                return result
            }
        }
    }
}

export * from './AC'
export * from './constants'
export * from './utils'