const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const app = express();
const port = 80;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', function(req, res) {
    res.send('没有页面');
});


let server = app.listen(port, function(error) {
    if(error) {
        console.log(error);
    } else {
    	console.log('start listening on port ' + port);
    }
});