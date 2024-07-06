function handleActionClick(tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.browserAction.setPopup({ popup: 'popup.html' });

    const activeTab = tabs[0];
    const link = activeTab.url;

    chrome.tabs.create({
      url: `https://freedium.cfd/${link}`
    });
  });
}

function handleMessage(request) {
    if (request.action === 'toggleExtension') {
      const { url, isEnabled } = request;
      localStorage.setItem(`enabled-${url}`, isEnabled);
      console.log(`Extension is ${isEnabled ? 'enabled' : 'disabled'} for ${url}`);
    }
}

chrome.action.onClicked.addListener(handleActionClick);
chrome.runtime.onMessage.addListener(handleMessage);