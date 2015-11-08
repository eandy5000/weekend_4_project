var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var pg = require('pg');
var connectionString = process.env.DATABASE_url || 'postgres://localhost:5432/weekend_4';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.post('/data', function(req, res){
    var newMessage = {
        "name": req.body.nameAdd,
        "message": req.body.msg
    };

    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO messages (name, message) VALUES ($1, $2) RETURNING id"),
            [newMessage.name, newMessage.message],
            function(err, result) {
                if (err) {
                    console.log('error inserting data: ', err);
                    res.send(false);
                }

                res.send(true);
            }
    })
});


// in the example (__dirname, "./public", file) why do both ways work?
app.get('/*', function(req, res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "/public", file));
});

app.set('port', process.env.PORT || 7000);
app.listen(app.get('port'), function(){
    console.log("listening on port ", app.get('port'));
});
