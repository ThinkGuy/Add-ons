var {Cc, Ci, Cu} = require("chrome");
const nsIScriptableInputStream = Ci.nsIScriptableInputStream;

var XMLHttpRequest = require('sdk/net/xhr').XMLHttpRequest;

var {
    nsHttpServer
} = require("./httpd");
let server = new nsHttpServer();
server.start(54345);
server.registerPathHandler("/", function (metadata, response) {
    response.setStatusLine(metadata.httpVersion, 200, "OK");
    response.write("Hello!");
    var sin = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(nsIScriptableInputStream);
    sin.init(metadata.bodyInputStream);

    var content = sin.read(sin.available());
    console.log("Server log: " +　content);

    if(content.indexOf("url") > 0) {
        console.log(666666);
        eq["isGet"] = true;
    }
});

var eq = {};

exports["test btoa"] = function(assert) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:54345/", false);
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    xhr.send("name=a");
    console.log(xhr.responseText);
    // assert.ok(eq["a"]);
};

var cts = require("../data/sendToServer");
exports["test sendToServer"] = function(assert) {
    var data = new Array();
    data[1] = "Java";
    cts.sendToServer("query", data);
  assert.ok(eq["isGet"], "sendToServerWork!");  
}

require("sdk/test").run(exports);