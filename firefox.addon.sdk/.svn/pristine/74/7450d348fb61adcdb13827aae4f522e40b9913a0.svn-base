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
  // useXUL();
  sidebar();
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


//sidebar
function sidebar() {
  
  var sidebar = require("sdk/ui").Sidebar({
    id: 'citeXplore',
    title: 'citeXplore',
    url: require("sdk/self").data.url("sidebar.html")
  });
  
  sidebar.show();
  
}

function useXUL() {
  // const {interfaces: Ci,	utils: Cu} = Components;
  var {Cu, Ci} = require("chrome");
  Cu.import('resource://gre/modules/Services.jsm');
  
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
                  id: 'demo-sidebar-with-html_splitter',
                  //class: 'sidebar-splitter' //im just copying what mozilla does for their social sidebar splitter //i left it out, but you can leave it in to see how you can style the splitter
              }
              for (var p in propsToSet) {
                  splitter.setAttribute(p, propsToSet[p]);
              }
              
              var sidebar = aDOMWindow.document.createElement('vbox');
              var propsToSet = {
                  id: 'demo-sidebar-with-html_sidebar',
                  //persist: 'width' //mozilla uses persist width here, i dont know what it does and cant see it how makes a difference so i left it out
              }
              for (var p in propsToSet) {
                  sidebar.setAttribute(p, propsToSet[p]);
              }
              
              var sidebarBrowser = aDOMWindow.document.createElement('browser');
              var propsToSet = {
                  id: 'demo-sidebar-with-html_browser',
                  type: 'content',
                  context: 'contentAreaContextMenu',
                  disableglobalhistory: 'true',
                  tooltip: 'aHTMLTooltip',
                  clickthrough: 'never',
                  autoscrollpopup: 'autoscroller',
                  flex: '1', //do not remove this
                  style: 'min-width: 14em; width: 18em; max-width: 36em;', //you should change these widths to how you want
                  src: 'https://www.baidu.com/' //or just set this to some url like http://www.bing.com/
              }
              for (var p in propsToSet) {
                  sidebarBrowser.setAttribute(p, propsToSet[p]);
              }
              
              browser.appendChild(splitter);
              
              sidebar.appendChild(sidebarBrowser);
              browser.appendChild(sidebar);
          }
          //END - EDIT BELOW HERE
      },
      unloadFromWindow: function (aDOMWindow, aXULWindow) {
          if (!aDOMWindow) {
              return;
          }
          //START - EDIT BELOW HERE
          var splitter = aDOMWindow.document.querySelector('#demo-sidebar-with-html_splitter');
      
          if (splitter) {
              var sidebar = aDOMWindow.document.querySelector('#demo-sidebar-with-html_sidebar');
              splitter.parentNode.removeChild(splitter);
              sidebar.parentNode.removeChild(sidebar);
          }
          //END - EDIT BELOW HERE
      }
  };
  
  function startup(aData, aReason) {
      windowListener.register();
  }
  
  function shutdown(aData, aReason) {
      if (aReason == APP_SHUTDOWN) return;
      windowListener.unregister();
  }
  
  function install() {}
  
  function uninstall() {}  

}
