
const config = require('../config');
const AUTHURL_ENDPOINT = config.AUTHURL_ENDPOINT
const helpers = require('../helpers')
const passport = helpers.module.passport

function passportAuth(app){
  app.get(AUTHURL_ENDPOINT,
    passport.authenticate('google', { 
      scope: [
        'profile','https://www.googleapis.com/auth/userinfo.email'
      ],
      accessType: 'offline',
      prompt: 'consent',
    })
  );

  app.get(`${AUTHURL_ENDPOINT}/callback`,
    passport.authenticate('google', { failureRedirect: config.REDIRECT_URL }),
    function(req, res) {
      // Successful authentication, redirect home.
      // req.googleLogin = true;
      res.redirect(config.REDIRECT_URL);
    }
  );
}

module.exports = passportAuth;