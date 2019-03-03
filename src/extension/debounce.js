function debounce(saveAction, saveCurrState) {
    if (saveAction._timerId) clearTimeout(saveAction._timerId)
    saveAction._timerId = setTimeout(saveCurrState, saveAction.debounce)
}

export default debounce