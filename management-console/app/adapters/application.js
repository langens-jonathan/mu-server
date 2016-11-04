import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  session: Ember.inject.service('session'),
  headers: Ember.computed('session.authenticationHeader', function() {
    return {
      'authorization': this.get('session.authenticationHeader')
    };
  })
});
