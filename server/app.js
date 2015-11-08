var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));




// in the example (__dirname, "./public", file) why do both ways work?
app.get('/*', function(req, res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "/public", file));
});

app.set('port', process.env.PORT || 7000);
app.listen(app.get('port'), function(){
    console.log("listening on port ", app.get('port'));
});
