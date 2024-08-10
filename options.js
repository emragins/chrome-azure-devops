// window.addEventListener('onload', function () {

let saveButton = document.getElementById('save');
let closeButton = document.getElementById('close');
let input_company = document.getElementById('company');
let input_project = document.getElementById('projectName');
let input_newTab = document.getElementById('newTab');
let input_customUrl = document.getElementById('customUrl');


// setup triggers

// when customUrl is selected intentionally, clear the other options and select custom
input_customUrl.onclick = function () {
    var urlOptions = document.getElementsByName("azure_url");
    if (urlOptions) {
        urlOptions[0].checked = false;
        urlOptions[1].checked = false;
        urlOptions[2].checked = true;
    }
}

saveButton.onclick = function () {

    var url = "";
    var urlOptions = document.getElementsByName("azure_url");
    if (urlOptions) {
        for (var i = 0; i < urlOptions.length; i++) {
            if (urlOptions[i].checked) {
                url = urlOptions[i].value;
            }
        }
    }

    // trim trailing / from customUrl
    if (url == 'custom') {
        input_customUrl.value = input_customUrl.value.replace(/\/$/, '');
    }

    let options = {
        company: input_company.value,
        projectName: input_project.value,
        newTab: input_newTab.checked,
        customUrl: input_customUrl.value,
        url: url,
    };
    // console.debug('options: ' + JSON.stringify(options));

    chrome.storage.sync.set(options);

    alert('Settings saved');
}


closeButton.onclick = function () {
    chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id);
    })
}


chrome.storage.sync.get({ company: '', projectName: '', newTab: true, url: 'azure', customUrl: '' },
    function ({ company, projectName, newTab, url, customUrl }) {
        // console.debug('newTab: ' + items.newTab);

        var urlOptions = document.getElementsByName("azure_url");
        if (urlOptions) {
            for (var i = 0; i < urlOptions.length; i++) {
                if (urlOptions[i].value == url) {
                    urlOptions[i].checked = true;
                }
            }
        }

        input_company.value = company;
        input_project.value = projectName;
        input_newTab.checked = newTab;
        input_customUrl.value = customUrl;
    });


// }());
