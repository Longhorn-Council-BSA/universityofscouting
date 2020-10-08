// jshint.unstable bigint: true
// jshint esversion: 6
var mongoose = require("mongoose");
require("mongoose-long")(mongoose);
var councils = require("../data/councils");
var SchemaTypes = mongoose.Schema.Types;

MembersSchema = new mongoose.Schema({
  memberID: {
    type: SchemaTypes.Long,
    required: true,
  },
  councilID: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  access: {
    type: Number,
    default: 1,
    required: true,
  },
});

/**
 * Synthesize name into "Firstname Lastname" for ease of access
 */
MembersSchema.virtual("fullNameFL").get(function () {
  return this.firstName + " " + this.lastName;
});

/**
 * Synthesize name into "Lastname, Firstname" for ease of access
 */
MembersSchema.virtual("fullNameFL").get(function () {
  return this.lastName + ", " + this.firstName;
});

/**
 * Synthesize council into a string representing council name for ease
 * of access
 */
MembersSchema.virtual("councilName").get(function () {
  return councils[this.councilID];
});

/**
 * Provides a friendly name (accessName) for access
 */
MembersSchema.virtual("accessName").get(function () {
  switch (this.access) {
    case 0:
      return "Expelled";
    case 1:
      return "Student";
    case 10:
      return "Faculty";
    case 100:
      return "Administration";
    case 1000:
      return "Developer";
  }
  return "Unknown";
});

/**
 * export members data as an easy to use JS object
 *
 * This object is not a full model and is effectively read-only.  But it is
 * easier to serialize into something that can be stored into a session or
 * manipulated in EJS templates.
 * 
 * @param {String} type  when 'strict' only return values that exist in the DB
 */
MembersSchema.methods.exportObject = function (type='simple') {
  if(type == 'strict') {
    return {
      _id: this._id.toString(), //Long Number
      memberID: this.memberID.toString(), //Long Number
      councilID: this.councilID,
      firstName: this.firstName,
      lastName: this.lastName,
      access: this.access,
    };
  }
  return {
    _id: this._id.toString(), //Long Number
    memberID: this.memberID.toString(), //Long Number
    councilID: this.councilID,
    firstName: this.firstName,
    lastName: this.lastName,
    access: this.access,
    accessName: this.accessName,
    fullNameFL: this.fullNameFL,
    fullNameLF: this.fullNameLF,
    councilName: this.councilName,
  };
};

// adds index for memberID+councilID
MembersSchema.index({ memberID: 1, councilID: 1 });

module.exports = mongoose.model("Members", MembersSchema);
