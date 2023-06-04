const helper = require('../../../../helpers');
const express = helper.module.express;
const router = express.Router();
const moment = helper.module.moment;
const { safePromise } = require('../../../utilities');
const { verify } = require('../../../services');

router.post('/verify', async (req, res)=>{
  const payload = req.body;
  const headers = req.headers;

  const [error] = await safePromise(verify(payload));
  if(error){
    // eslint-disable-next-line no-console
    console.log(`Incomming request from service ${headers.module} but fail to authorized`)
    return res.status(401).json({
      message:error,
      res:{
        status:false
      }
    });
  }

  // eslint-disable-next-line no-console
  console.log(`Incomming request from service ${headers.module} at ${moment().utcOffset("+05:30").format('MMMM Do YYYY, h:mm:ss a')} IST`);

  res.json({
    message:"User is authorized",
    res:{
      status:true
    }
  });

})


module.exports = router;