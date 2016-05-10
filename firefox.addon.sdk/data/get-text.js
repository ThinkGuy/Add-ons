var nameArea = document.getElementById("name");
var passwordArea = document.getElementById("password");

var logInButton = document.getElementById("logInButton");
logInButton.addEventListener('click', function(){
    // Remove the newline.
    var data = new Array();
    data[0] = nameArea.value.replace(/(\r\n|\n|\r)/gm,"");
    data[1] = passwordArea.value.replace(/(\r\n|\n|\r)/gm,"");
    self.port.emit("text-entered", data);
    nameArea.value = '';
    passwordArea.value = '';
}, false);

// 监听由插件主程序发送的show事件。表示面板将要显示。
// 焦点放在textarea上，这样用户可以直接开始输入。
self.port.on("show", function onShow() {
  nameArea.focus();
  passwordArea.focus();
});