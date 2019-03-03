function throttle(saveAction, saveCurrState) {
    if (!saveAction._lastCallTime || saveAction._lastCallTime + saveAction.throttle <= Date.now()) {
        saveAction._lastCallTime = Date.now()
        saveCurrState()
    }
}

export default throttle