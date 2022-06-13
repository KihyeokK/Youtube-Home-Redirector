const checkBox = document.querySelector("#accept");
const form = document.getElementById("redirecturl");
const currentUrlSpan = document.querySelector(".url");

console.log(form.elements[0].value);
console.log(currentUrlSpan);

//Making sure current redirect url is displayed
chrome.storage.sync.get(['currentUrl'], (result) => {
    currentUrlSpan.innerText = result.currentUrl;
  });

form.addEventListener("submit", (event) => {
    event.preventDefault();
    redirectUrl = form.elements[0].value
    if (isValidHttpUrl(redirectUrl)){
        chrome.storage.sync.set({"currentUrl": redirectUrl})
        currentUrlSpan.innerText = redirectUrl
    } else {
        event.preventDefault();
    }
})

function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (err) {
      return false;  
    }
  
    return true;
  }