const urlMap = {
  'cmsOption': 'https://www.author-p57957-e460617.adobeaemcloud.com/ui#/aem/editor.html/content/nfo/en',
  'liveOption': 'https://www.navyfederal.org',
  'previewOption': 'https://www.author-p57957-e460617.adobeaemcloud.com/ui#/aem/content/nfo/en'
};

document.getElementsByName('modifyButton').
  forEach(button => button.addEventListener('click', () => {
    const openOption = document.querySelector('input[name="openOption"]:checked');
    const modifyOption = button.id;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = new URL(tabs[0].url);
      const searchParams = new URLSearchParams(currentUrl.search);
      let modifiedUrl;
      let origin = urlMap[modifyOption];
      if (modifyOption === 'previewOption') {
        currentUrl.search = addOrRemoveParameter(searchParams, 'wcmmode', 'disabled');
      } else {
        currentUrl.search = addOrRemoveParameter(searchParams, 'wcmmode');
      }
      modifiedUrl = `${origin}${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
      alert(modifiedUrl);

      if (openOption) {
        chrome.tabs.create({ url: "https://www.google.com" });
        // chrome.tabs.create({ url: modifiedUrl });
      } else {
        chrome.tabs.update(tabs[0].id, { url: "https://www.google.com" });
        //chrome.tabs.update(tabId, { url: modifiedUrl });
      }
    });
  }));

function addOrRemoveParameter(searchParams, parameterName, parameterValue) {
  if (parameterValue) {
    searchParams.set(parameterName, parameterValue);
  } else {
    searchParams.delete(parameterName);
  }
  return searchParams.toString();
}
