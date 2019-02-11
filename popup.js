let span_company = document.getElementById('company');
let span_projectName = document.getElementById('projectName');
let form_search = document.getElementById('search');
let button_settings = document.getElementById('settings');
let input_query = document.getElementById('query');

let openUrl;
chrome.storage.sync.get({ company: '', projectName: '' }, function (items) {
    openUrl = `https://${items.company}.visualstudio.com/${items.projectName}`
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

    let createProperties = {
        url: openUrl,
    };

    chrome.tabs.create(createProperties);  // auto-focuses as of Chrome 33
}


// load the page data
chrome.storage.sync.get({ company: '', projectName: '' }, function (items) {
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
})

