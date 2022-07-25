const jwt = require('jsonwebtoken')
const secret = 'oauthpupu'

//create a function to generate an access token for user authentication
module.exports.createAccessToken = (user) => {
  //we will identify the props/keys of the user that we want to verify
  const data = {
    id: user._id,
    username: user.username
  }
  return jwt.sign(data, secret, {
    expiresIn: '30d',
  })
}

//lets us replicate the verify method to validate if the access token generated has been sent and received from the correct client
module.exports.verify = (req, res, next) => {
  let token = req.headers.authorization

  if(typeof token !== 'undefined') {
    token = token.slice(7, token.length)

    return jwt.verify(token, secret, (error, data) => {
      return (error) ? res.send({ auth: 'failed' }) : next() 
    })
  } else {
    res.send({auth: "failed"})
  }
}

//decode function which will allow us to verify the token generated
module.exports.decode = (token) => {
  if(typeof token !== 'undefined') {
    token = token.slice(7, token.length)

    return jwt.verify(token, secret, (error, data) => {
      return (error) ? null : jwt.decode(token, {
        complete: true
      }).payload 
    })
  } else {
    return null
  }
}