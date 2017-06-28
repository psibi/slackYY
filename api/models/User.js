/**
 * User.js
 *
 * @description :: User model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {
  tableName: 'user',
  attributes: {
    password: {
      type: 'string',
      columnName: 'password'
    },
    email: {
      type: 'email',
      unique: true,
      columnName: 'email_address'
    },
    name: {
      type: 'string',
      columnName: 'user_name'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }    
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  }
};

