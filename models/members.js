// jshint.unstable bigint: true
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
    default: 662,
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
 * export members data as an easy to use JS object
 * 
 * This object is not a full model and is effectively read-only.  But it is 
 * easier to serialize into something that can be stored into a session or 
 * manipulated in EJS templates.
 */
MembersSchema.methods.exportObject = function () {
  return {
    _id: this._id.toString(),
    memberID: this.memberID.toString(),
    councilID: this.councilID.toString(),
    firstName: this.firstName,
    lastName: this.lastName,
    access: this.access,
    fullNameFL: this.fullNameFL,
    fullNameLF: this.fullNameLF,
    councilName: this.councilName
  };
};

/**
 * adds index for memberID+councilID
 *
 * Records are typically looked up by memberID and councilID.
 */
MembersSchema.index({ memberID: 1, councilID: 1 });

module.exports = mongoose.model("Members", MembersSchema);
