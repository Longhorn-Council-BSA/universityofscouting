'use strict';
module.exports = (sequelize, DataTypes) => {
  const TranscriptEntries = sequelize.define('TranscriptEntries', {
    memberid: DataTypes.BIGINT,
    coursenumber: DataTypes.STRING,
    coursename: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {});
  TranscriptEntries.associate = function(models) {
    // associations can be defined here
  };
  return TranscriptEntries;
};