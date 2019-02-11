# Azure DevOps Search

This is a chrome extension that's designed for all those times when a coworker references a workitem by its number leaving you to look it up yourself.

## Current Functionality

### Settings
Settings are based off the URL following the format of `https://company.visualstudio.com/Project/`

### Searching
If you type in a number, it will attempt to open the work item directly.

Other searches will start a search.

In both cases a new tab will be opened.


`ALT`+`SHIFT`+`D`:  Quick open popup window for mouse-free use

## Roadmap / Future Functionality

* Support for searching (by default) non-work items
* Support for multiple Projects (tentatively planned)
* Support for multiple Companies (unplanned)
* A real icon (unplanned)

## Development

To run this extension locally in development mode: 

1. Download into a directory
2. In chrome, go to menu (...) -> More Tools -> Extensions
3. In the top-right hand corner, enable "Developer mode"
4. Click "Load unpacked"
5. Navigate to the root folder where you downloaded the files and click "ok"

The extension should now be loaded into chrome and a new icon should appoar near the URL bar.
