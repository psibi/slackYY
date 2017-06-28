/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  currentUser: function(req, res) {
    console.log('user', req.user);
    res.json({user: req.user});
  }
};

