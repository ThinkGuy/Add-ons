var main = require("../data/connectToServer");

exports["test connectToServer"] = function(assert, done) {
  main.connectToServer("foo", function(text) {
    assert.ok((text === "You have been rate limited!"),
     "Is the text actually 'You have been rate limited!'");
    done();
  });
};

require("sdk/test").run(exports);
