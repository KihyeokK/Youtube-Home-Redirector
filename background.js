const youtubeUrl = "https://www.youtube.com";
const newUrl = "https://www.youtube.com/results?search_query=programming";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ youtubeUrl });
    console.log(youtubeUrl)
  });

// const filter = {urls: ["https://*/*"], types: ['main_frame', 'sub_frame']};
// chrome.webRequest.onBeforeRequest.addListener(redirect, filter, ["blocking"]);

// function redirect(details) {
//     console.log("yeah", details);
//     return { redirectUrl: newUrl };
// }


chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log(changes);
    console.log(namespace);
    const newUrl = changes.currentUrl.newValue;
    console.log(newUrl);
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
            "regexFilter": "https://www.youtube.com/",
            "resourceTypes": [
                "main_frame"
            ]
        }
    }
       ],
       removeRuleIds: [1]
     }
    )
})

