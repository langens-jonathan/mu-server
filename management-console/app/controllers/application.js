import Ember from 'ember';

export default Ember.Controller.extend({
    
    session: Ember.inject.service('session'),

    actions:
    {
	login: function()
	{
	    return this.get('session').login(this.get('user'), this.get('pwd'));
	},

	logout: function()
	{
	    this.get('session').logout();
	}
    }
});
