/**
 * Channel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'channel',
  attributes: {
    name: {
      type: 'string',
      columnName: 'name'
    },
    toJSON: function() {
      var obj = this.toObject();
      return obj;
    }    
  }
};

