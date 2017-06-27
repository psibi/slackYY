/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'message',
  attributes: {
    msg: {
      type: 'string',
      columnName: 'msg'
    },
    userName: 'string',
    /* Adds a reference to channel */
    channel: {
      model: 'channel',
      columnName: 'channel_id'
    },
    toJSON: function() {
      var obj = this.toObject();
      return obj;
    }    
  }
};

