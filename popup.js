let span_searchWithin = document.getElementById('search-within');
let form_search = document.getElementById('search');
let form_newTab = document.getElementById('newTab');
let button_settings = document.getElementById('settings');
let input_query = document.getElementById('query');

let openUrl;
chrome.storage.sync.get({ company: '', projectName: '', url: 'azure', customUrl: '' }, function (
    { company, projectName, url, customUrl }) {
    openUrl = url == 'azure'
        ? `https://dev.azure.com/${company}/${projectName}`
        : url == 'vsts'
            ? `https://${company}.visualstudio.com/${projectName}`
            : customUrl;
});

// setup triggers 
button_settings.onclick = function () { chrome.runtime.openOptionsPage(); }



form_search.onsubmit = function () {
    let search = input_query.value;

    if (parseInt(search)) { // assume workitem
        openUrl += `/_workitems/edit/${search}`;
    }
    else {
        openUrl += `/_search?text=${search}&type=workitem`
    }


    console.log('url:' + openUrl);

    let tabProperties = {
        url: openUrl,
    };

    if (form_newTab.checked) {
        chrome.tabs.create(tabProperties);  // auto-focuses as of Chrome 33
    }
    else {
        chrome.tabs.getCurrent(tab => chrome.tabs.update(tabProperties));
    }
}


// load the page data
chrome.storage.sync.get({ company: '', projectName: '', newTab: true, url: 'azure', customUrl: '' }, function (
    { company, projectName, newTab, url, customUrl }
) {
    console.debug("items: " + JSON.stringify({ company, projectName, newTab, url, customUrl }));

    form_newTab.checked = newTab;

    if (url && url == 'custom') {
        if (customUrl.length == 0) {
            span_searchWithin.textContent = "[CUSTOM URL NOT SET]";
            return;
        }
        span_searchWithin.textContent = customUrl;
        return;
    }

    // make sure they're both present 
    if (!(company && company.length > 0)
        || !(projectName && projectName.length > 0)) {
        span_searchWithin.textContent = "[OPTIONS NOT SET]";
        return;
    }

    span_searchWithin.textContent = company + ", " + projectName;
})

