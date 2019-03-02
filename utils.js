import { SAVE_NAME } from './constants'

//TODO: do a crushing facility for a larger state and fix multi SAVE_NAME
/**
 * Returns saved state from localStorage
 * @return {object}
 *         state
 */
export function loadStorage() {
    const localState = window.localStorage.getItem(SAVE_NAME)
    //TODO: Make a check on the object, etc.
    return localState ? JSON.parse(localState) : undefined
}

export function saveInStorage(state, saveName = SAVE_NAME) {
    localStorage.setItem(saveName, JSON.stringify(state))
}