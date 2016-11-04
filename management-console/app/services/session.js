import Ember from 'ember';

export default Ember.Service.extend({
    isAuthenticated: false,

    authenticationHeader: "",

    calculateAuthenticationHeader: function(user, pwd)
    {
	this.set('authenticationHeader',"Basic " + btoa(user + ":" + pwd));
    },

    login: function(user, pwd)
    {
	this.calculateAuthenticationHeader(user, pwd);
	var auth = this.get('authenticationHeader');
	var promise = $.ajax({
	    type: "GET",
	    url: "http://localhost:4004/login",
	    headers: {
		"Authorization":auth
	    }
	});

	promise.then((function(_this) {
	    return function(response) {
		return _this.set('isAuthenticated', true);
	    };
	})(this), (function(_this) {
	    return function(response) {
		_this.set('authenticationHeader', "");
		return _this.set('isAuthenticated', false);
	    };
	})(this));
    },

    logout: function()
    {
	this.set('isAuthenticated', false);
	this.set('authenticationHeader', "");
    }

});
