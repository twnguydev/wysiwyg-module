chrome.runtime.onInstalled.addListener((details) => {
    console.log('Extension installed:', details);
});

chrome.runtime.onStartup.addListener(() => {
    console.log('Extension started');
});