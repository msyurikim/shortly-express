const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (!req.cookies.shortlyid) {
    return models.Sessions.create()
    .then((data) => {
      models.Sessions.get({id: data.insertId})
      .then(( session ) => {
        req.session = session;
        return session;
      })
      .then( (session) => {
        res.cookies = { shortlyid: { value: session.hash } };
        next(req, res);
      });
    });
  } else {
    var hash = req.cookies.shortlyid;
    return models.Sessions.get({hash})
    .then((session) => {
      var id = session.userId;
      req.session = session;
      return models.Users.get({id})
      .then((user) => {
        req.session.user = user;
        next(req, res);
      });
    })
    .catch((err) => {
      req.cookies = {};
      return module.exports.createSession(req, res, next);
    });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

