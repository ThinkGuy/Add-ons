var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "citeXplore",
  label: "citeXploreS",
  icon: {
    "16": "./logo.png"
  },
  onClick: handleClick
});

// Show the panel when the user clicks the button.
function handleClick(state) {
  //connectToServer();
   sideBar();
}

//Client connect to server.
function connectToServer() {
    
  var Request = require("sdk/request").Request;
  var latestTweetRequest = Request({
  url: "http://localhost:8080/citexplore.web/print.jsp",
  onComplete: function (response) {
  
  var text = response.text;
  console.log("text: ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" + text);
  }
  });

  // Be a good consumer and check for rate limiting before doing more.
  Request({
    url: "http://localhost:8080/citexplore.web/print.jsp",
    onComplete: function (response) {
      if (response.text) {
        latestTweetRequest.get();
      } else {
        console.log("You have been rate limited!");
      }
    }
  }).get();
}

function sideBar() {
   
  var {Ci, Cu} = require("chrome");  
  Cu.import('resource://gre/modules/Services.jsm');
  
  /*start - windowlistener*/
  var windowListener = {
      //DO NOT EDIT HERE
      onOpenWindow: function (aXULWindow) {
          // Wait for the window to finish loading
          let aDOMWindow = aXULWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
          aDOMWindow.addEventListener("load", function () {
              aDOMWindow.removeEventListener("load", arguments.callee, false);
              windowListener.loadIntoWindow(aDOMWindow, aXULWindow);
          }, false);
      },
      onCloseWindow: function (aXULWindow) {},
      onWindowTitleChange: function (aXULWindow, aNewTitle) {},
      register: function () {
          // Load into any existing windows
          let XULWindows = Services.wm.getXULWindowEnumerator(null);
          while (XULWindows.hasMoreElements()) {
              let aXULWindow = XULWindows.getNext();
              let aDOMWindow = aXULWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
              windowListener.loadIntoWindow(aDOMWindow, aXULWindow);
          }
          // Listen to new windows
          Services.wm.addListener(windowListener);
      },
      unregister: function () {
          // Unload from any existing windows
          let XULWindows = Services.wm.getXULWindowEnumerator(null);
          while (XULWindows.hasMoreElements()) {
              let aXULWindow = XULWindows.getNext();
              let aDOMWindow = aXULWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
              windowListener.unloadFromWindow(aDOMWindow, aXULWindow);
          }
          //Stop listening so future added windows dont get this attached
          Services.wm.removeListener(windowListener);
      },
      //END - DO NOT EDIT HERE
      loadIntoWindow: function (aDOMWindow, aXULWindow) {
          if (!aDOMWindow) {
              return;
          }
          //START - EDIT BELOW HERE
          var browser = aDOMWindow.document.querySelector('#browser')
          if (browser) {

              var splitter = aDOMWindow.document.createElement('splitter');
              var propsToSet = {
                  id: 'CiteXplore_splitter',
                  // orient: 'horizontal',
                  hidden: 'false',
                  //class: 'sidebar-splitter' //im just copying what mozilla does for their social sidebar splitter //i left it out, but you can leave it in to see how you can style the splitter
              }
              for (var p in propsToSet) {
                  splitter.setAttribute(p, propsToSet[p]);
              }
              
              var sidebar = aDOMWindow.document.createElement('vbox');
              var propsToSet = {
                  id: 'CiteXplore_sidebar',
                  hidden: 'false',
                  //persist: 'width' //mozilla uses persist width here, i dont know what it does and cant see it how makes a difference so i left it out
              }
              for (var p in propsToSet) {
                  sidebar.setAttribute(p, propsToSet[p]);
              }
              
              var sidebarBrowser = aDOMWindow.document.createElement('browser');
              var propsToSet = {
                  id: 'CiteXplore_browser',
                  type: 'content',
                  context: 'contentAreaContextMenu',
                  disableglobalhistory: 'true',
                  tooltip: 'aHTMLTooltip',
                  clickthrough: 'never',
                  autoscrollpopup: 'autoscroller',
                  flex: '1', //do not remove this
                  style: 'min-width: 20em; width: 50em; max-width: 60em;', //you should change these widths to how you want
                  src: 'http://www.citexplore.com' //or just set this to some url like http://www.bing.com/
              }
              for (var p in propsToSet) {
                  sidebarBrowser.setAttribute(p, propsToSet[p]);
              }

              var hbox = aDOMWindow.document.createElement('hbox');
              var propsToSet = {
                id: 'CiteXplore_hbox',
              }
              for (var p in propsToSet) {
                  hbox.setAttribute(p, propsToSet[p]);
              }

              var toolbar = aDOMWindow.document.createElement('toolbar');
              var propsToSet = {
                id: 'CiteXplore_toolbar',
              }
              for (var p in propsToSet) {
                  toolbar.setAttribute(p, propsToSet[p]);
              }

              var toolbarbutton = aDOMWindow.document.createElement('toolbarbutton');
              var propsToSet = {
                id: 'CiteXplore_toolbarbutton',
                label: 'Hide',
                
              }
              for (var p in propsToSet) {
                  toolbarbutton.setAttribute(p, propsToSet[p]);
              }

              toolbarbutton.addEventListener('command',  function (event) {
                  aDOMWindow.document.getElementById("CiteXplore_sidebar").hidden = true;
                  aDOMWindow.document.getElementById("CiteXplore_splitter").hidden = true;
              }, false);
              
              browser.appendChild(splitter);
              browser.appendChild(sidebar);
              toolbar.appendChild(toolbarbutton);
              hbox.appendChild(toolbar);
              sidebar.appendChild(hbox);
              sidebar.appendChild(sidebarBrowser);

          }
          //END - EDIT BELOW HERE
      },
      unloadFromWindow: function (aDOMWindow, aXULWindow) {
          if (!aDOMWindow) {
              return;
          }
          //START - EDIT BELOW HERE
          var splitter = aDOMWindow.document.querySelector('#CiteXplore_splitter');
      
          if (splitter) {
              var sidebar = aDOMWindow.document.querySelector('#CiteXplore_sidebar');
              splitter.parentNode.removeChild(splitter);
              sidebar.parentNode.removeChild(sidebar);
          }
          //END - EDIT BELOW HERE
      }
  };
  /*end - windowlistener*/
  
  function startup(aData, aReason) {
      windowListener.register();
  }
  
  function shutdown(aData, aReason) {
      if (aReason == APP_SHUTDOWN) return;
      windowListener.unregister();
  }
  
  function install() {}
  
  windowListener.register();  
}

function listen() {
   
  var {Ci, Cu} = require("chrome");  
  Cu.import('resource://gre/modules/Services.jsm');

  var citeXplore = {
    
    init: function() {
      var window = require("sdk/window/utils").getMostRecentBrowserWindow();
        window.removeEventListener("load", citeXplore.init, true);
        
        var appcontent = window.document.getElementById("appcontent");
        if (appcontent) {
            appcontent.addEventListener("DOMContentLoaded", citeXplore.onPageLoad, false);
        }

    },

    onPageLoad: function(aEvent) {
        console.log("onPageLoad");
        var urls_reg = "^(https*:\/\/xueshu\.baidu\.com\/.*)";
        var doc = aEvent.originalTarget;
        var m = (new RegExp(urls_reg, 'i')).test(doc.location.href);
        
        var href = doc.location.href;
        var keyWord = href.substring(href.indexOf("wd=")+3, href.indexOf("&tn"));
        //alert(keyWord);
        
        if (!m) return;
        
        
        var data = doc.createElement("script");
            data.id = "citeXplore";
            data.innerHTML = "function getUrl(i){var data = document.getElementById(i);var allSourceUrl = new Array(); var source = data.getElementsByClassName(\"sc_allversion\")[0].getElementsByClassName(\"v_item_span\");for (var i=0; i<source.length; i++) {allSourceUrl[i] = source[i].getElementsByTagName('a')[0].innerHTML + \"**http://xueshu.baidu.com\" + source[i].getElementsByTagName('a')[0].getAttribute(\"href\");}; alert(allSourceUrl[0]);}"
            
            doc.getElementsByTagName('body')[0].appendChild(data);
            
            var list = doc.getElementsByClassName('result sc_default_result xpath-log');
            
            for (var i=0; i<list.length; i++) {
                var button = doc.createElement("span");
                button.innerHTML ="<input type=\"button\" value=\"getData\" onclick=\"getUrl(" + (i+1) + ")\">";
                button.id="getUrl" + (i+1);
                list[i].appendChild(button);
            } 

         sideBar();
        // citeXplorePanel.show();
    }
  };

citeXplore.init();
}