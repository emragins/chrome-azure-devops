// window.addEventListener('onload', function () {

let saveButton = document.getElementById('save');
let closeButton = document.getElementById('close');
let input_company = document.getElementById('company');
let input_project = document.getElementById('projectName');
let input_newTab = document.getElementById('newTab');


// setup triggers

saveButton.onclick = function () {

    var url = "";
    var urlOptions = document.getElementsByName("azure_url");
    if (urlOptions) {
        for (var i = 0; i < urlOptions.length; i++) {
            if (urlOptions[i].checked){
                url = urlOptions[i].value;
            }
        }
    }

    let options = {
        company: input_company.value,
        projectName: input_project.value,
        newTab: input_newTab.checked,
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


chrome.storage.sync.get({ company: '', projectName: '', newTab: true, url: 'azure'},
    function (items) {
        // console.debug('newTab: ' + items.newTab);

        var urlOptions = document.getElementsByName("azure_url");
        if (urlOptions) {
            for (var i = 0; i < urlOptions.length; i++) {
                if (urlOptions[i].value == items.url){
                    urlOptions[i].checked = true;
                }
            }
        }

        input_company.value = items.company;
        input_project.value = items.projectName;
        input_newTab.checked = items.newTab;
    });


// }());
