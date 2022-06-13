const checkBox = document.querySelector("#accept");
const form = document.getElementById("redirectUrl");
const currentUrlSpan = document.querySelector(".url");
const changeUrlDiv = document.querySelector(".changeUrl");

const youtubeUrl = "https://www.youtube.com";
let redirectUrl = "";

console.log(form.elements[0].value);
console.log(currentUrlSpan);
console.log(checkBox.checked);




//Making sure current redirect URL is displayed
chrome.storage.sync.get(['urls'], (result) => {
    redirectUrl = result.urls.currentUrl;
    // if toggle off
    if (redirectUrl === youtubeUrl) {
        currentUrlSpan.innerText = "Default Youtube URL";
        checkBox.checked = false;
        changeUrlDiv.style.display = "none";
        chrome.storage.sync.get(['urls'], (res) => {
            // update redirectUrl for later use 
            redirectUrl = res.urls.redirectUrl;
            console.log(redirectUrl, "inside")
        })
    } else {
        currentUrlSpan.innerText = result.urls.currentUrl;
        checkBox.checked = true;
        changeUrlDiv.style.display = "flex";
    }
  });


checkBox.addEventListener("change", () => {
    isToggleOn(checkBox);
})


form.addEventListener("submit", (event) => {
    event.preventDefault();
    redirectUrl = form.elements[0].value
    if (isValidHttpUrl(redirectUrl)){
        chrome.storage.sync.set({"urls": {"currentUrl": redirectUrl, "redirectUrl": redirectUrl}})
        currentUrlSpan.innerText = redirectUrl
    } else {
        event.preventDefault();
        // alert?
    }
})


function isToggleOn(checkBox) {
    if (checkBox.checked) {
        changeUrlDiv.style.display = "flex";
        if (redirectUrl) {
            chrome.storage.sync.set({"urls": {"currentUrl": redirectUrl, "redirectUrl": redirectUrl}})
            currentUrlSpan.innerText = redirectUrl
        }
    } else {
        // When toggle off, redirect to default youtube URL
        changeUrlDiv.style.display = "none";
        chrome.storage.sync.set({"urls": {"currentUrl": youtubeUrl, "redirectUrl": redirectUrl}})
        currentUrlSpan.innerText = "Default Youtube URL"
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


