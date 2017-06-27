/**
 * User.js
 *
 * @description :: User model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'user',
  attributes: {
    name: {
      type: 'string',
      columnName: 'name'
    },
    password: {
      type: 'string',
      columnName: 'password'
    },
    email: {
      type: 'email',
      unique: true,
      columnName: 'email_address'
    }
  }
};

