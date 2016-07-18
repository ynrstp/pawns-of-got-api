require('dotenv').config();

var express = require('express');
var app = express();

var morgan = require('morgan')
app.use(morgan('combined'))

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONN);

var jwt = require('jsonwebtoken');

var authRoutes = require('./routes/authroutes.js')(app);
var houseRoutes = require('./routes/houseroutes.js')(app);
var locationRoutes = require('./routes/locationroutes.js')(app);
var pawnRoutes = require('./routes/pawnroutes.js')(app);

var server = app.listen(process.env.PORT, function() {
    console.log('Server running at port ' + process.env.PORT);
});
