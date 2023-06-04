const helper = require('../../../../helpers');
const express = helper.module.express;
const router = express.Router();
const jwt = helper.module.jwt
const config = require('../../../../config')
const JWT_GOOGLE_SECRET = config.JWT_GOOGLE_SECRET

const path = helper.module.path;
// const page = require('../../../../views/index.html')

router.get('/', (req, res) => {
  
  if(!req.oidc.isAuthenticated() && !req.session.googleDetails){
    return res.sendFile(path.join(__dirname,'../../../../views','/index.html'))
  }
  const token = req.oidc.idToken || req.session.googleDetails.profile && jwt.sign({userid:req.session.googleDetails.profile.id}, JWT_GOOGLE_SECRET);
  req.session.googleDetails=null
  res.send("Token : "+token)
  
});

module.exports = router;