import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    dockerName: DS.attr('string'),
    imageLocation: DS.attr('string'),
    documentation: DS.attr('string'),
    configureCommand: DS.attr('string'),
    configFiles: DS.hasMany('configFile'),
    endpoints: DS.hasMany('endpoint'),
    versions: DS.hasMany('version')
});
