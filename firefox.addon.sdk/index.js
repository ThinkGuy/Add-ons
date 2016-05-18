/**
 * @author Liu,xinwei;
 */
// System variables
var actionButton = require('sdk/ui/button/action');

// Status variables.
var connect = require("./data/connectToServer");
var logInfo = require('./data/log');
var sidebar = require("./data/sidebar");

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
    sidebar.showSideBar();
}

/* panel */
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

var tabs = require("sdk/tabs"); // for test
// for test
