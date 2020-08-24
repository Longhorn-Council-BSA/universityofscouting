// jshint.unstable bigint: true
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var moment = require('moment-timezone');
var settings = require('../config/settings');
var councils = require('../data/councils');
var SchemaTypes = mongoose.Schema.Types;

RegistrationsSchema = new mongoose.Schema({
    memberID: {
        type: SchemaTypes.Long,
        required: true
    },
    councilID: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: false
    },
    instructor: {
        type: String,
        required: true
    },
    physical: {
        type: String,
        required: true
    },
    online: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 1
    }
});

RegistrationsSchema.virtual('councilName').get(function() {
    return councils[this.councilID];
});

RegistrationsSchema.virtual('dateMDY').get(function() {
    var m = moment(this.date);
    m.tz(settings.timezone);
    return m.format('L');
});

RegistrationsSchema.virtual('dateMDYHM').get(function() {
    var m = moment(this.date);
    m.tz(settings.timezone);
    return m.format('L LT');
});

/**
 * export registrations data as an easy to use JS object
 * 
 * This object is not a full model and is effectively read-only.  But it is 
 * easier to serialize into something that can be stored into a session or 
 * manipulated in EJS templates.
 */
RegistrationsSchema.methods.exportObject = function () {
    return {
      _id: this._id.toString(), //Long Number
      memberID: this.memberID.toString(), //Long Number
      councilID: this.councilID,
      date: this.date.toISOString(), //Date Object
      dateMDY: this.dateMDY,
      dateMDYHM: this.dateMDYHM,
      type: this.type,
      title: this.title,
      credits: this.credits,
      instructor: this.instructor,
      physical: this.physical,
      online: this.online,
      status: this.status
    };
  };

RegistrationsSchema.index({ memberID: 1, councilID: 1 });

module.exports = mongoose.model('Registrations', RegistrationsSchema);
