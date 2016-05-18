/* start - injectCode */
var connect = require("./connectToServer");
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