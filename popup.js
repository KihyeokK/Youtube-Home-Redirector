const checkBox = document.querySelector("#accept");
const form = document.getElementById("redirectUrl");
const currentUrlSpan = document.querySelector(".url");
const changeUrlDiv = document.querySelector(".changeUrl");

const youtubeUrl = "https://www.youtube.com";
let redirectUrl = "";

//Making sure current redirect URL is displayed
chrome.storage.sync.get(['urls'], (result) => {
    redirectUrl = result.urls.currentUrl;
    // if toggle off
    if (redirectUrl === youtubeUrl) {
        currentUrlSpan.innerText = "Default Youtube URL";
        checkBox.checked = false;
        changeUrlDiv.style.display = "none";
        chrome.storage.sync.get(['urls'], (res) => {
            // Update redirectUrl for later use.
            // This redirectUrl is the previous redirect URL entered by user.
            redirectUrl = res.urls.redirectUrl;
        })
    } else {
        currentUrlSpan.innerText = result.urls.currentUrl;
        checkBox.checked = true;
        changeUrlDiv.style.display = "flex";
    }
  });


checkBox.addEventListener("change", () => {
    isToggleOn(checkBox);
});


form.addEventListener("submit", (event) => {
    event.preventDefault();
    let newUrl = form.elements[0].value;
    if (isValidHttpUrl(newUrl)){
        redirectUrl = newUrl;
        chrome.storage.sync.set({"urls": {"currentUrl": redirectUrl, "redirectUrl": redirectUrl}});
        currentUrlSpan.innerText = redirectUrl;
    } else {
        alert("Please enter a valid URL.");
    }
});


function isToggleOn(checkBox) {
    if (checkBox.checked) {
        changeUrlDiv.style.display = "flex";
        if (redirectUrl) {
            chrome.storage.sync.set({"urls": {"currentUrl": redirectUrl, "redirectUrl": redirectUrl}});
            currentUrlSpan.innerText = redirectUrl;
        }
    } else {
        // When toggle off, redirect to default youtube URL
        changeUrlDiv.style.display = "none";
        chrome.storage.sync.set({"urls": {"currentUrl": youtubeUrl, "redirectUrl": redirectUrl}});
        currentUrlSpan.innerText = "Default Youtube URL";
    }
}


function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (err) {
      return false;  
    }

    return true;
  }


