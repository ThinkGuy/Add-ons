/**
 * @author Liu,xinwei;
 */
// System variables
var actionButton = require('sdk/ui/button/action');
var {
    Ci, Cu
} = require("chrome");
Cu.import('resource://gre/modules/Services.jsm');
var window = require("sdk/window/utils").getMostRecentBrowserWindow();

// Status variables.
var connect = require("./data/connectToServer");
var logInfo = require('./data/log');

var initialized = false;
var hidden = true;

/* login panel - needs revision */

// Toolbar button.
var button = actionButton.ActionButton({
    id: "citeXplore_button",
    label: "citeXplore",
    icon: {
        "16": "./logo.png"
    },
    onClick: handleClick
});

// Toolbar button click event handler.
function handleClick(state) {
    panel.show({
      position: button
    });
    // showSideBar();
    // text_entry.show();
}

/* text_entry */
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var data = require("sdk/self").data;

var panel = panels.Panel({
  contentURL: data.url("panel.html"),
  contentScriptFile: data.url("get-text.js"),
  onHide: handleHide
});

function handleHide() {
  button.state('window', {checked: false});
}

panel.on("show", function() {
    panel.port.emit("show");
});

panel.port.on("text-entered", function(data) {
    logInfo.log(1, data);
    // console.log(data);
    connect.connectToServer("login", data);
    // panel.hide();
});

/* start - injectCode */

var pageMods = require("sdk/page-mod");
var self = require("sdk/self");

var pageMod = pageMods.PageMod({
    include: ['*.baidu.com'], // TODO ??
    contentScriptFile: self.data.url("content-script.js"),
    contentScriptWhen: "ready",
    onAttach: startListening
});

function startListening(worker) {
    worker.port.on('click', function(data) {
        connect.connectToServer("click", data);
    });
    worker.port.on('detach', function(data) {
        connect.connectToServer("detach", data);
    });
}

/* end - injectCode */

function citexplore() {
    var citeXplore = {
        init: function() {
            window.removeEventListener("load", citeXplore.init, true);

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
            if (initialized) {
                if (hidden) {
                    showSideBar();
                }
                return;
            }
            createSideBar();
            initialized = true;
            /*end - createSideBar*/
        }
    };

    citeXplore.init();
}

// Create side bar.

function createSideBar() {
    var windowListener = {
        onOpenWindow: function(aXULWindow) {
            let aDOMWindow = aXULWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
            aDOMWindow.addEventListener("load", function() {
                aDOMWindow.removeEventListener("load", arguments.callee, false);
                windowListener.loadIntoWindow(aDOMWindow, aXULWindow);
            }, false);
        },

        register: function() {
            let XULWindows = Services.wm.getXULWindowEnumerator(null);
            while (XULWindows.hasMoreElements()) {
                let aXULWindow = XULWindows.getNext();
                let aDOMWindow = aXULWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
                windowListener.loadIntoWindow(aDOMWindow, aXULWindow);
            }
            Services.wm.addListener(windowListener);
        },

        unregister: function() {
            let XULWindows = Services.wm.getXULWindowEnumerator(null);
            while (XULWindows.hasMoreElements()) {
                let aXULWindow = XULWindows.getNext();
                let aDOMWindow = aXULWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
                windowListener.unloadFromWindow(aDOMWindow, aXULWindow);
            }
            Services.wm.removeListener(windowListener);
        },

        loadIntoWindow: function(aDOMWindow, aXULWindow) {
            if (!aDOMWindow) {
                return;
            }

            var browser = aDOMWindow.document.querySelector('#browser')
            if (browser) {

                var splitter = aDOMWindow.document.createElement('splitter');
                var propsToSet = {
                    id: 'citeXploreSplitter',
                    hidden: 'false',
                }
                for (var p in propsToSet) {
                    splitter.setAttribute(p, propsToSet[p]);
                }

                var createSideBar = aDOMWindow.document.createElement('vbox');
                var propsToSet = {
                    id: 'citeXploreSidebar',
                    hidden: 'false',
                }
                for (var p in propsToSet) {
                    createSideBar.setAttribute(p, propsToSet[p]);
                }

                var sidebarBrowser = aDOMWindow.document.createElement('browser');
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

                var hbox = aDOMWindow.document.createElement('hbox');
                var propsToSet = {
                    id: 'citeXploreHbox',
                }
                for (var p in propsToSet) {
                    hbox.setAttribute(p, propsToSet[p]);
                }

                var toolbar = aDOMWindow.document.createElement('toolbar');
                var propsToSet = {
                    id: 'citeXploreToolbar',
                }
                for (var p in propsToSet) {
                    toolbar.setAttribute(p, propsToSet[p]);
                }

                var toolbarbutton = aDOMWindow.document.createElement('toolbarbutton');
                var propsToSet = {
                    id: 'citeXploreToolbarButton',
                    label: 'Hide',

                }
                for (var p in propsToSet) {
                    toolbarbutton.setAttribute(p, propsToSet[p]);
                }

                toolbarbutton.addEventListener('command', function(event) {
                    aDOMWindow.document.getElementById("citeXploreSidebar").hidden = true;
                    aDOMWindow.document.getElementById("citeXploreSplitter").hidden = true;
                    hidden = true;
                }, false);

                browser.appendChild(splitter);
                browser.appendChild(createSideBar);
                toolbar.appendChild(toolbarbutton);
                hbox.appendChild(toolbar);
                createSideBar.appendChild(hbox);
                createSideBar.appendChild(sidebarBrowser);

            }
        },

        unloadFromWindow: function(aDOMWindow, aXULWindow) {
            if (!aDOMWindow) {
                return;
            }

            var splitter = aDOMWindow.document.querySelector('#citeXploreSplitter');

            if (splitter) {
                var createSideBar = aDOMWindow.document.querySelector('#citeXploreSidebar');
                splitter.parentNode.removeChild(splitter);
                createSideBar.parentNode.removeChild(createSideBar);
            }
        }
    };

    windowListener.register();
}

// Show sidebar.

function showSideBar() {
    if (initialized && hidden) {
        let XULWindows = Services.wm.getXULWindowEnumerator(null);
        let aXULWindow = XULWindows.getNext();
        let aDOMWindow = aXULWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
        aDOMWindow.document.getElementById("citeXploreSidebar").hidden = false;
        aDOMWindow.document.getElementById("citeXploreSplitter").hidden = false;
        hidden = fasle;
    }
}

window.addEventListener("load", citexplore(), true);

var tabs = require("sdk/tabs"); // for test
// for test
tabs.open("http://xueshu.baidu.com/s?wd=Java&rsv_bp=0&tn=SE_baiduxueshu_c1gjeupa&rsv_spt=3&ie=utf-8&f=8&rsv_sug2=0&sc_f_para=sc_tasktype%3D{firstSimpleSearch}");