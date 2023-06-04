const helper = require('../../../helpers');
const { safePromise } = require('../../utilities');
const fs = helper.module.fs;
const jwt = helper.module.jwt;
const { JWT_GOOGLE_SECRET } = require('../../../config')
let publicKey;
try{
  publicKey = fs.readFileSync('public.cer');
}catch(e){
  throw new Error(e);
}

async function tokenVerify(payload, SECRET_KEY){
  const { authorization } = payload;
  jwt.verify(authorization, SECRET_KEY, function(err, decoded){
    if(err){
      throw err.message;
    }
    return decoded;
  });
}

async function verify(payload){
  const [error, result] = await safePromise(
    Promise.allSettled([
      tokenVerify(payload, JWT_GOOGLE_SECRET),
      tokenVerify(payload, publicKey)
    ])
  )
  if(error){
    throw error;
  }
  let flag = false;
  result.forEach((obj)=>{
    if(obj.status === 'fulfilled'){
      flag=true
    }
  })
  
  if(!flag){
    throw "User is not authorized";
  }
  return;
}

module.exports = verify;