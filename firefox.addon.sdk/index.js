/**
 * @author Liu,xinwei;
 */

// System variables
var actionButton = require('sdk/ui/button/action');
var tabs = require("sdk/tabs"); // for test
var {
    Ci, Cu
} = require("chrome");
Cu.import('resource://gre/modules/Services.jsm');
var window = require("sdk/window/utils").getMostRecentBrowserWindow();

// Status variables.
var initialized = false;
var hidden = true;

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
    showSideBar();
}

// for test
tabs.open("http://xueshu.baidu.com/s?wd=Java&rsv_bp=0&tn=SE_baiduxueshu_c1gjeupa&rsv_spt=3&ie=utf-8&f=8&rsv_sug2=0&sc_f_para=sc_tasktype%3D{firstSimpleSearch}");

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

            var href = doc.location.href;

            if (href.indexOf("&rsv_bp") < href.indexOf("&tn")) {
                var keyWord = href.substring(href.indexOf("wd=") + 3, href.indexOf("&rsv_bp"));
            } else {
                var keyWord = href.substring(href.indexOf("wd=") + 3, href.indexOf("&tn"));
            }

            console.log(keyWord);

            if (!m) return;

            /*start - injectCode*/
            var data = doc.createElement("script");
            data.id = "citeXplore";
            data.innerHTML = "function getUrl(i) {" +
                "var data = document.getElementById(i);" +
                "var titleData = data.getElementsByClassName('t c_font')[0].getElementsByTagName('a')[0];" +
                "var titleUrl = 'http://xueshu.baidu.com' + titleData.getAttribute('href');" +
                "var title = titleData.innerHTML;var content = data.getElementsByClassName('c_abstract')[0].innerHTML;" +
                "content = content.substring(0, content.indexOf('<'));" +
                "var allSourceUrl = new Array();" +
                "var source = data.getElementsByClassName('sc_allversion')[0].getElementsByClassName('v_item_span');" +
                "for (var i=0; i<source.length; i++) {" +
                "allSourceUrl[i] = source[i].getElementsByTagName('a')[0].innerHTML + '**http://xueshu.baidu.com' + source[i].getElementsByTagName('a')[0].getAttribute('href');" +
                "}; " +
                "console.log(title);" +
                "console.log(titleUrl);" +
                "console.log(content); " +
                "console.log(allSourceUrl[0]);" +
                "}";

            doc.getElementsByTagName('body')[0].appendChild(data);

            var list = doc.getElementsByClassName('result sc_default_result xpath-log');

            for (var i = 0; i < list.length; i++) {
                var button = doc.createElement("span");
                button.innerHTML = "<input type='button' value='getData' onclick='getUrl(" + (i + 1) + ")'>";
                button.id = "getUrl" + (i + 1);
                list[i].appendChild(button);
            }
            /*end - injectCode*/

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

/** Client connect to server. */

function connectToServer() {

    var Request = require("sdk/request").Request;
    var latestTweetRequest = Request({
        url: "http://localhost:8080/citexplore.web/print.jsp",
        onComplete: function(response) {

            var text = response.text;
            console.log("text: ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" + text);
        }
    });

    // Be a good consumer and check for rate limiting before doing more.
    Request({
        url: "http://localhost:8080/citexplore.web/print.jsp",
        onComplete: function(response) {
            if (response.text) {
                latestTweetRequest.get();
            } else {
                console.log("You have been rate limited!");
            }
        }
    }).get();
}

window.addEventListener("load", citexplore(), true);