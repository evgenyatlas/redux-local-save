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
    localStorage.setItem(getSaveName(saveName), JSON.stringify(state))
}

export function saveCurrState(saveInStorage, getState, saveName) {
    saveInStorage(getState(), saveName)
}

export function saveCurrStateDebug(saveInStorage, getState, saveName) {
    console.log('-----SAVE_STATE-----' + saveName)
    console.log(getState())
    saveInStorage(getState(), saveName)
    console.log('-------------------')
}

function getSaveName(name) {
    return `${SAVE_NAME}_${name}`
}