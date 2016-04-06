// 这里是简单的附加组件将消息发送到内容的脚本使用端口 ︰

var tabs = require("sdk/tabs");
var self = require("sdk/self");

tabs.on("ready", function(tab) {
  var worker = tab.attach({
    contentScriptFile: self.data.url("content-script.js")
  });
  worker.port.emit("alert", "Message from the add-on");
});

tabs.open("www.baidu.com");