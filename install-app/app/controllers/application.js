import Ember from 'ember';

export default Ember.Controller.extend({
    databasePort: 8890,
    databaseExposed: true,
    databaseType: "Virtuoso",
    databaseOptions: ["virtuoso"],

    storeLocation: "http://localhost:8888",

    managementFrontEndPort: 4001,

    managementUser: "ADMIN",
    managementPwd: "PWD",

    muServerPort: 80,

    redirecting: false,

    redirectFunction: function()
    {
	window.location.replace("http://localhost:" + this.get('managementFrontEndPort'));
    },
    
    actions: {
	configureServer: function()
	{
	    // call the configure service here
	    $.ajax({
		type: "POST",
		url: "http://localhost:4002/",
		data: { "database":
			{
			    "port":this.get('databasePort'),
			    "exposed":this.get('databaseExposed'),
			    "type":this.get('databaseType'),
			},
			"storeLocation":this.get('storeLocation'),
			"managementFrontEndPort":this.get('managementFrontEndPort'),
			"muServerPort":this.get('muServerPort'),
			"managementUser":this.get("managementUser"),
			"managementPwd":this.get("managementPwd")
		      }
	    });

	    this.set('redirecting', true);

	    // window.location.replace("http://localhost:" + this.get('managementFrontEndPort'));
	    Ember.run.later((function(_this) {
		return function() {
		    window.location.replace("http://localhost:" + _this.get('managementFrontEndPort'));
		};
	    })(this), 7500);
	}
    }
});
