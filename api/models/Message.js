/**
 * Message.js
 *
 * @description :: Message model used in Chat appplication
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

