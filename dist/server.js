var express = require('express');
var https = require('https');
var compression = require('compression');

var app = express();
app.use(compression());
var port = process.env.PORT || 5000;

app.use(express.static('dist'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port:" + port);
    }
});

setInterval(function() {
  https.get("https://arwl-noughts-and-crosses.herokuapp.com/");
}, 180000);