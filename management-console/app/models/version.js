import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    tag: DS.attr('string'),
    description: DS.attr('string'),
});
