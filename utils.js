import { SAVE_NAME } from './constants'

//TODO: do a crushing facility for a larger state and fix multi SAVE_NAME
/**
 * Returns saved state from localStorage
 * @return {Object} - state
 */
export function loadStorage(saveName = '') {
    const localState = window.localStorage.getItem(getSaveName(saveName))
    //TODO: Make a check on the object, etc.
    return localState ? JSON.parse(localState) : undefined
}

export function saveInStorage(state, saveName = '') {
    console.log('saveInStorage', getSaveName(saveName))
    localStorage.setItem(getSaveName(saveName), JSON.stringify(state))
}

function getSaveName(name) {
    return `${SAVE_NAME}_${name}`
}