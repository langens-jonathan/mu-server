var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

var identifier = {"image":"semtech/mu-identifier", "tag":"1.0.0"};
var dispatcher = {"image":"semtech/mu-dispatcher", "tag":"1.0.1"};
var resources = {"image":"semtech/mu-cl-resources", "tag":"1.12.1"};

app.use(cors());

app.use(bodyParser());

app.post('/', function (req, res) {
    // creating the docker compose file for our new installation
    var docker_compose_yml = "version: \"2\"\n" +
	"services:\n" +
	"  identifier:\n" +
	"    image: " + identifier.image + ":" + identifier.tag + "\n" +
	"    links:\n" +
	"      - dispatcher:disptacher\n" +
	"    ports:\n" +
	"      - \"" + req.body.muServerPort + ":80\"\n" +
	"  dispatcher:\n" +
	"    image: " + dispatcher.image + ":" + dispatcher.tag + "\n" +
	"    links:\n" +
	"      - managementResources:managementResources\n" +
	// "      - muManagement:muManagement\n" +
	// "      - muManagementFront:muManagementFront\n" +
	"    volumes:\n" +
	"      - ./config/dispatcher:/config\n" +
	"  db:\n" +
	"    image: tenforce/virtuoso:1.0.0-virtuoso7.2.4\n" + 
	"    environment:\n" +
	"      SPARQL_UPDATE: \"true\"\n" +
	"      DEFAULT_GRAPH: \"http://mu.semte.ch/application\"\n";
    if(req.body.database.exposed === "true")
    {
	docker_compose_yml +=
	"    ports:\n" +
	    "      - \"" + req.body.database.port + ":8890\"\n";
    }
    docker_compose_yml +=
	"    volumes:\n" +
	"      - ./data/db:/data\n" +
	"  managementResources:\n" +
	"    image: " + resources.image + ":" + resources.tag  + "\n" +
	"    links:\n" +
	"      - db:database\n" +
	"    volumes:\n" +
	"      - ./config/resources:/config\n";
        // "  muManagement:\n" +
	// "    image: semtech/mu-dispatcher:1.0.1\n" +
	// "  muManagementFront:\n" +
	// "    image: semtech/mu-dispatcher:1.0.1\n";

    // now we create the stores file
    var stores_yml =
	"stores:\n" +
	"  location: \"" + req.body.storeLocation + "\"\n";

    var admin_yml =
	"admin: " + req.body.managementUser + "\n" +
	"pwd: " + req.body.managementPwd + "\n";
    
    // now we write the docker compose file
    fs.writeFile("../docker-compose.yml", docker_compose_yml, function(err) {
    	if(err) {
            return console.log(err);
    	}});
    
    // now we write the admin.yml file
    fs.writeFile("../management-console/admin-front-end.port", req.body.managementFrontEndPort, function(err) {
    	if(err) {
            return console.log(err);
    	}});
    
    // now we write the admin.yml file
    fs.writeFile("../management-console/admin.yml", admin_yml, function(err) {
    	if(err) {
            return console.log(err);
    	}});

    // and then the stores.yml file
    fs.writeFile("../management-console/stores.yml", stores_yml, function(err) {
    	if(err) {
            return console.log(err);
    	}});

    exec("cd .. && ./start-mu-server.sh", puts);

    exec("cd .. && ./stop-installer.sh", puts);

    res.send('Installed');
});

app.listen(4002, function () {
  console.log('[*] Installation backend started on port 4002');
});
