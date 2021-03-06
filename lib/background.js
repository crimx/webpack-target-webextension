/** Add this to background scripts */

const hasBrowser = typeof browser !== 'undefined'

;(hasBrowser ? browser : chrome).runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === 'WTW_INJECT' && sender && sender.tab && sender.tab.id != null) {
    let file = message.file
    try {
      file = new URL(file).pathname
    } catch {}
    if (file) {
      const details = {
        frameId: sender.frameId,
        file,
      }
      const callback = () => sendResponse()
      if (hasBrowser) {
        browser.tabs.executeScript(sender.tab.id, details).then(callback)
      } else {
        chrome.tabs.executeScript(sender.tab.id, details, callback)
      }
      return true
    }
  }
})
