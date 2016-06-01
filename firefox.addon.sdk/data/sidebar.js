var preDocument = "a";
var preAppcontent;

/* end - injectCode */
var {
    Ci, Cu
} = require("chrome");
Cu.import('resource://gre/modules/Services.jsm');

const windows = require("sdk/windows");
const windowUtils = require("sdk/window/utils");
var { viewFor } = require("sdk/view/core");
for (let window of windows.browserWindows) {
    citexplore(viewFor(window));
}
windows.browserWindows.on("open", function(window) {
    citexplore(viewFor(window));
});

var initialized = false;
var hidden = true;

function citexplore(window) {
    var citeXplore = {
        init: function() {
            var appcontent = window.document.getElementById("appcontent");
            if (appcontent) {
                appcontent.addEventListener("DOMContentLoaded", citeXplore.onPageLoad, false);
            }
        },

        onPageLoad: function(aEvent) {
            var urls_reg = "^(https*:\/\/xueshu\.baidu\.com\/.*)";
            var doc = aEvent.originalTarget;
            var m = (new RegExp(urls_reg, 'i')).test(doc.location.href);
            if (!m) return;

            /*start - createSidebar*/
            createSideBar(aEvent);
showSidebar(aEvent);
            /*end - createSideBar*/
        }
    };

    citeXplore.init();
}

// Create side bar.

function createSideBar(aEvent) {
    var windowListener = {
        loadIntoWindow: function(aEvent) {
            ownerDocument = aEvent.currentTarget.ownerDocument;
            if (ownerDocument.getElementById('citeXploreSplitter')) {
                return;
            }
 
            var browser = ownerDocument.getElementById('browser');
            if (browser) {

                var splitter = ownerDocument.createElement('splitter');
                var propsToSet = {
                    id: 'citeXploreSplitter',
                    hidden: 'false',
                }
                for (var p in propsToSet) {
                    splitter.setAttribute(p, propsToSet[p]);
                }

                var createSideBar = ownerDocument.createElement('vbox');
                var propsToSet = {
                    id: 'citeXploreSidebar',
                    hidden: 'false',
                }
                for (var p in propsToSet) {
                    createSideBar.setAttribute(p, propsToSet[p]);
                }

                var sidebarBrowser = ownerDocument.createElement('browser');
                var propsToSet = {
                    id: 'citeXploreBrowser',
                    type: 'content',
                    context: 'contentAreaContextMenu',
                    disableglobalhistory: 'true',
                    tooltip: 'aHTMLTooltip',
                    clickthrough: 'never',
                    autoscrollpopup: 'autoscroller',
                    flex: '1',
                    style: 'min-width: 20em; width: 50em; max-width: 60em;',
                    src: 'http://www.citexplore.com'
                }
                for (var p in propsToSet) {
                    sidebarBrowser.setAttribute(p, propsToSet[p]);
                }

                var hbox = ownerDocument.createElement('hbox');
                var propsToSet = {
                    id: 'citeXploreHbox',
                }
                for (var p in propsToSet) {
                    hbox.setAttribute(p, propsToSet[p]);
                }

                var toolbar = ownerDocument.createElement('toolbar');
                var propsToSet = {
                    id: 'citeXploreToolbar',
                }
                for (var p in propsToSet) {
                    toolbar.setAttribute(p, propsToSet[p]);
                }

                var toolbarbutton = ownerDocument.createElement('toolbarbutton');
                var propsToSet = {
                    id: 'citeXploreToolbarButton',
                    label: 'Hide',

                }
                for (var p in propsToSet) {
                    toolbarbutton.setAttribute(p, propsToSet[p]);
                }

                toolbarbutton.addEventListener('command', function(event) {
                    event.currentTarget.ownerDocument.getElementById("citeXploreSidebar").hidden = true;
                    event.currentTarget.ownerDocument.getElementById("citeXploreSplitter").hidden = true;
                }, false);

                browser.appendChild(splitter);
                browser.appendChild(createSideBar);
                toolbar.appendChild(toolbarbutton);
                hbox.appendChild(toolbar);
                createSideBar.appendChild(hbox);
                createSideBar.appendChild(sidebarBrowser);

            }
        }
    };

    windowListener.loadIntoWindow(aEvent);
}

function showSidebar(aEvent) {
    if (aEvent.currentTarget.ownerDocument.getElementById("citeXploreSidebar").hidden ==  true
        && aEvent.currentTarget.ownerDocument.getElementById("citeXploreSplitter").hidden == true) {
        aEvent.currentTarget.ownerDocument.getElementById("citeXploreSidebar").hidden = false;
        aEvent.currentTarget.ownerDocument.getElementById("citeXploreSplitter").hidden = false;
    }
}

exports.citexplore = citexplore;
exports.showSidebar = showSidebar;