var logger = require("./logger");
var preQueryText = null;

function sendToServer(type, data) {
    logger.log(1, "Trying to send data to server: " + data);
    var Request = require("sdk/request").Request;

    // TODO send only when logged in
    if (type == "query") {
        var latestTweetRequest = Request({
            url: "http://localhost:8080/citexplore.web/print.jsp",
            content: {
                preQueryText: preQueryText,
                queryText: data[0],
                url: data[1],
                queryRider: data[2],
            },
            onComplete: function(response) {
                logger.log(1, "Query sent to server: " + response.text + ": " + data);
            }
        });
    } else if (type == "click") {
        var latestTweetRequest = Request({
            url: "http://localhost:8080/citexplore.web/print.jsp",
            content: {
                queryText: data[0],
                queryUrl: data[1],
                title: data[2],
                urls: data[3],
            },
            onComplete: function(response) {
                logger.log(1, "Click sent to server: " + response.text + ": " + data);
            }
        });
    } else {
        name = data[0];
        password = data[1];

        //if login success then text_entry hide.
        if (true) {
            // panel.hide();
        }
    }

    preQueryText = data[0];
}

exports.sendToServer = sendToServer;