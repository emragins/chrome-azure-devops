// window.addEventListener('onload', function () {

let saveButton = document.getElementById('save');
let closeButton = document.getElementById('close');
let input_company = document.getElementById('company');
let input_project = document.getElementById('projectName');


// setup triggers

saveButton.onclick = function () {
    console.debug('company: ' + input_company.value);
    console.debug('projectName: ' + input_project.value);
    chrome.storage.sync.set({
        company: input_company.value,
        projectName: input_project.value
    });
    alert('Settings saved');
}


closeButton.onclick = function () {
    chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id);
    })
}


chrome.storage.sync.get({ company: '', projectName: '' },
    function (items) {
        input_company.value = items.company;
        input_project.value = items.projectName;
    });


// }());
