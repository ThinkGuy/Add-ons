/** Client connect to server. */
var logInfo = require("./log");
var preQueryText = null;

function connectToServer(way, data) {
    var Request = require("sdk/request").Request;
    logInfo.log(1, data);
    console.log("***********" + data[2][date]);

    // TODO send only when logged in
    if (way == "detach") {
        var latestTweetRequest = Request({
            url: "http://localhost:8080/citexplore.web/print.jsp",
            content: {
                preQueryText: preQueryText,
                queryText: data[0],
                url: data[1],
                queryRider: data[2],
            },
            onComplete: function(response) {
                var text = response.text;
                // TODO revise log information with log level
logInfo.log(1, text);      
            }
        });
    } else if (way == "click") {
        var latestTweetRequest = Request({
            url: "http://localhost:8080/citexplore.web/print.jsp",
            content: {
                queryText: data[0],
                queryUrl: data[1],
                title: data[2],
                urls: data[3],
            },
            onComplete: function(response) {
                var text = response.text;
                logInfo.log(1, text);  
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

    // Be a good consumer and check for rate limiting before doing more.
    Request({
        url: "http://localhost:8080/citexplore.web/print.jsp",
        onComplete: function(response) {
            if (response.text) {
                latestTweetRequest.post();
            } else {
                console.log("You have been rate limited!");
            }
        }
    }).post();

    preQueryText = data[0];
}

exports.connectToServer = connectToServer;