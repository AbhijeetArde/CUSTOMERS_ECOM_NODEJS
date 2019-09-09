var config = require('./config');
var customers = require('./customers')(config);
var express = require('express');
var multer = require('multer')
var session = require('cookie-session');

var app = express();
app.use(express.static('public'));
app.set('view engine', 'jade');
app.enable('trust proxy');
app.use(multer({ inMemory: true }));
app.use(session({ signed: true, secret: config.cookieSecret }));


app.get('/', function(req, res) {
  customers.getAllCustomer(function(customer, key) {
    var keycustomer = customers.map((customer) => Object.assign(customer, { id: customer.id || customer[key].id }));
    res.render('index', { customers: keycustomer });
  });
});

app.post('/addcustomer', function(req, res) {
  customers.addCustomer(req.body.customer, function() {
    res.redirect(req.get('Referer') || '/');
  })
});


app.listen(8080);

console.log('Running on http://localhost:8080/');
