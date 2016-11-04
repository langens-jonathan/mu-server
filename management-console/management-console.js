var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var YAML = require('yamljs');
var http = require('http');

app.use(cors());

app.use(bodyParser());

var proxy_http = function(client_req, client_res, endpoint, port)
{   
    // var options = {
    // 	port: port,
    // 	path: endpoint,
    // 	headers: {
    // 	    Host: endpoint
    // 	}
    // };

    // return http.get(options, function(res) {
    // 	res.pipe(process.stdout);
    // });

    var options = {
	hostname: endpoint,
	port: port,
	path: client_req.url,
	method: 'GET'
    };

    var proxy = http.request(options, function (res) {
	res.pipe(client_res, {
	    end: true
	});
    });
    
    client_req.pipe(proxy, {
	end: true
    });
};
    

var authenticationHeader = "";

var calculateAuthenticationHeader = function()
{
    var userInfo = YAML.load('admin.yml');
    var user = userInfo.admin;
    var pwd = userInfo.pwd;

    var encoded_part = new Buffer(user + ":" + pwd);

    authenticationHeader = "Basic " + encoded_part.toString('base64');
};

var checkAuthenticationHeader = function(authorizationHeader)
{
    if(authenticationHeader ==="")
    {
	calculateAuthenticationHeader();
    }

    if(authorizationHeader === authenticationHeader)
    {
	return true;
    }
    else
    {
	return false;
    }
}

app.get('/micro-services', function (req, res) {
    if(checkAuthenticationHeader(req.headers['authorization']) === true)
    {
	proxy_http(req, res, "localhost", 8888);
    }
    else
    {
	res.status(401);
	res.send("");
    }
})

app.get('/versions', function (req, res) {
    if(checkAuthenticationHeader(req.headers['authorization']) === true)
    {
	proxy_http(req, res, "localhost", 8888);
    }
    else
    {
	res.status(401);
	res.send("");
    }
})

app.get('/config-files', function (req, res) {
    if(checkAuthenticationHeader(req.headers['authorization']) === true)
    {
	proxy_http(req, res, "localhost", 8888);
    }
    else
    {
	res.status(401);
	res.send("");
    }
})

app.get('/endpoints', function (req, res) {
    if(checkAuthenticationHeader(req.headers['authorization']) === true)
    {
	proxy_http(req, res, "localhost", 8888);
    }
    else
    {
	res.status(401);
	res.send("");
    }
})

app.get('/login', function (req, res) {
    if(checkAuthenticationHeader(req.headers['authorization']) === true)
    {
	res.status(200);
	res.send('OK');
    }
    else
    {
	res.status(401);
	res.send("");
    }
})

app.listen(4004, function () {
  console.log('Example app listening on port 4004!')
})



