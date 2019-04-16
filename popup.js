let span_company = document.getElementById('company');
let span_projectName = document.getElementById('projectName');
let form_search = document.getElementById('search');
let form_newTab = document.getElementById('newTab');
let button_settings = document.getElementById('settings');
let input_query = document.getElementById('query');

let openUrl;
chrome.storage.sync.get({ company: '', projectName: '', url: 'azure' }, function (items) {
    openUrl = items.url == 'vsts' 
        ? `https://${items.company}.visualstudio.com/${items.projectName}`
        : `https://dev.azure.com/${items.company}/${items.projectName}`;
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
chrome.storage.sync.get({ company: '', projectName: '', newTab: true }, function (items) {
    console.debug("items: " + JSON.stringify(items));

    let company = items.company;
    let projectName = items.projectName;
    // make sure they're both present 
    if (!(company && company.length > 0)
        || !(projectName && projectName.length > 0)) {
        span_company.textContent = "[OPTIONS NOT SET]";
        return;
    }

    span_company.textContent = company;
    span_projectName.textContent = projectName;
    form_newTab.checked = items.newTab;
})

