// 用户按下回车，发送text-entered消息给main.js。
// 消息主体是编辑框的内容。
var name;
var password;

var nameArea = document.getElementById("name");
nameArea.addEventListener('keyup', function onkeyup(event) {
  if (event.keyCode == 13) {
    // Remove the newline.
    name = nameArea.value.replace(/(\r\n|\n|\r)/gm,"");
    // self.port.emit("text-entered", name);
    nameArea.value = '';
  }
}, false);

var passwordArea = document.getElementById("password");
passwordArea.addEventListener('keyup', function onkeyup(event) {
  if (event.keyCode == 13) {
    // Remove the newline.
    password = passwordArea.value.replace(/(\r\n|\n|\r)/gm,"");
    var data = new Array();
    data[0] = name;
    data[1] = password; 
    self.port.emit("text-entered", data);
    passwordArea.value = '';
  }
}, false);

// 监听由插件主程序发送的show事件。表示面板将要显示。
//
// 焦点放在textarea上，这样用户可以直接开始输入。
self.port.on("show", function onShow() {
  nameArea.focus();
  passwordArea.focus();
});