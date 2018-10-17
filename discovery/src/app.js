let express = require('express');
let reverseProxy = require('./routes/reverse-proxy');
let discovery = require('./discovery');
const port = 8080;
const app = express();

// define the home page route
app.get('/', function(req, res) {
    res.send('This is a Service Gateway')
});

// define proxy route
app.get('/services', reverseProxy);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


let server = app.listen(port, async function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log('start listening on port ' + port);
        await discovery();
    }
});