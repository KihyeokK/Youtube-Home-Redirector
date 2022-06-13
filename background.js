const youtubeUrl = "https://www.youtube.com";

// Making sure currentUrl is present in storage from the beginning
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({"urls": {"currentUrl": youtubeUrl, "redirectUrl": ""}})
    // redirectUrl is used to keep track of redirect URL even when user exits
    // extension page while toggle is off.
  });

// Updating URL for redirecting
chrome.storage.onChanged.addListener((changes, namespace) => {
    const newUrl = changes.urls.newValue.currentUrl;
    chrome.declarativeNetRequest.updateDynamicRules(
      {addRules:[{
        "id": 1,
        "priority": 1,
        "action": {
            "type": "redirect",
            "redirect": {
                "url": newUrl
            }
        },
        "condition": {
            "regexFilter": "^https://www\\.youtube\\.com/$",
            "resourceTypes": [
                "main_frame"
            ]
        }
    }
       ],
       removeRuleIds: [1]
     }
    );
})

