// jshint.unstable bigint: true
// jshint esversion: 6
var mongoose = require("mongoose");
require("mongoose-long")(mongoose);
var moment = require("moment-timezone");
var settings = require("../config/settings");
var councils = require("../data/councils");
var SchemaTypes = mongoose.Schema.Types;

RegistrationsSchema = new mongoose.Schema({
  memberID: {
    type: SchemaTypes.Long,
    required: true,
  },
  councilID: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: false,
  },
  instructor: {
    type: String,
    required: false,
  },
  physical: {
    type: String,
    required: false,
  },
  online: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    required: true,
    default: 1,
  },
});

/**
 * Provides a friendly name (councilName) for council
 */
RegistrationsSchema.virtual("councilName").get(function () {
  return councils[this.councilID];
});

/**
 * Provides a friendly date (dateMDY) representation of date
 */
RegistrationsSchema.virtual("dateMDY").get(function () {
  var m = moment(this.date);
  m.tz(settings.timezone);
  return m.format("L");
});

/**
 * Provides a friendly date/time (dateMDYHM) representation of date
 */
RegistrationsSchema.virtual("dateMDYHM").get(function () {
  var m = moment(this.date);
  m.tz(settings.timezone);
  return m.format("L LT");
});

/**
 * Provides a friendly date/time (dateYMDHM) representation of date
 */
RegistrationsSchema.virtual("dateYMDHM").get(function () {
  var m = moment(this.date);
  m.tz(settings.timezone);
  return m.format();
});

/**
 * Provides a friendly name (typeName) for type
 */
RegistrationsSchema.virtual("typeName").get(function () {
  switch (this.type) {
    case 0:
      return "Notation";
    case 1:
      return "Course";
    case 2:
      return "Degree";
    case 3:
      return "Activity";
  }
  return "Unknown";
});

/**
 * Provides a friendly name (statusName) for status
 */
RegistrationsSchema.virtual("statusName").get(function () {
  switch (this.status) {
    case 0:
      return "Hidden";
    case 1:
      return "Registered";
    case 2:
      return "Attended";
    case 3:
      return "Completed";
  }
  return "Unknown";
});

/**
 * export registrations data as an easy to use JS object
 *
 * This object is not a full model and is effectively read-only.  But it is
 * easier to serialize into something that can be stored into a session or
 * manipulated in EJS templates. 
 *  
 * @param {String} type  when 'strict' only return values that exist in the DB
 */
RegistrationsSchema.methods.exportObject = function (type='simple') {
  if(type == 'strict') {
    return {
      _id: this._id.toString(), //String (Hex number)
      memberID: this.memberID.toString(), //Long Number
      councilID: this.councilID,
      date: this.date.toISOString(), //Date Object
      type: this.type,
      title: this.title,
      credits: this.credits,
      instructor: this.instructor,
      physical: this.physical,
      online: this.online,
      status: this.status
    };
  }
  return {
    _id: this._id.toString(), //String (Hex number)
    memberID: this.memberID.toString(), //Long Number
    councilID: this.councilID,
    date: this.date.toISOString(), //Date Object
    dateMDY: this.dateMDY,
    dateMDYHM: this.dateMDYHM,
    dateYMDHM: this.dateYMDHM,
    type: this.type,
    typeName: this.typeName,
    title: this.title,
    credits: this.credits,
    instructor: this.instructor,
    physical: this.physical,
    online: this.online,
    status: this.status,
    statusName: this.statusName
  };
};

// adds index for memberID+councilID
RegistrationsSchema.index({ memberID: 1, councilID: 1 });

module.exports = mongoose.model("Registrations", RegistrationsSchema);
