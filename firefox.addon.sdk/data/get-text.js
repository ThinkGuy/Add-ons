// 用户按下回车，发送text-entered消息给main.js。
// 消息主体是编辑框的内容。
// var name;
// var password;

var nameArea = document.getElementById("name");

var passwordArea = document.getElementById("password");
passwordArea.addEventListener('keyup', function onkeyup(event) {
  if (event.keyCode == 13) {
    // Remove the newline.
    var data = new Array();
    data[0] = nameArea.value.replace(/(\r\n|\n|\r)/gm,"");
    data[1] = passwordArea.value.replace(/(\r\n|\n|\r)/gm,"");
    self.port.emit("text-entered", data);
    nameArea.value = '';
    passwordArea.value = '';
  }
}, false);

// 监听由插件主程序发送的show事件。表示面板将要显示。
// 焦点放在textarea上，这样用户可以直接开始输入。
self.port.on("show", function onShow() {
  nameArea.focus();
  passwordArea.focus();
});

