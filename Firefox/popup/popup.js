function extractAudioLink(variable) {
    var regex = /(http[s]?:\/\/[^\s(["<,>]*\.(?:mp3|m4a))/gi;
    var matches = variable.match(regex);
    if (matches && matches.length > 0) {
        return matches[0];
    } else {
        return "Erreur";
    }
}

function extractSpecificLine() {
    browser.tabs.query({ active: true, currentWindow: true })
        .then((tabs) => {
            let activeTab = tabs[0];
            return browser.tabs.executeScript(activeTab.id, { code: 'document.documentElement.outerHTML' });
        })
        .then((results) => {
            let variable = results[0];
            browser.downloads.download({url: extractAudioLink(variable)})
        })
        .catch((error) => {
            console.error(error);
        });
}

document.getElementById("downloadBtn").addEventListener("click", extractSpecificLine); 