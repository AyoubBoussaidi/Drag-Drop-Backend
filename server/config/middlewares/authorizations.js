const jwt = require('jsonwebtoken')


exports.requiresLogin = function (req, res, next) {
    const token = req.headers['x-access-token'] || req.query.token
    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'not logged in'
        })
    }
  
    // create a promise that decodes the token
    const promise = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )
  
    const onError = (error) => {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
    promise.then((decoded)=>{
        console.log('decoded',decoded)
        req.decoded = decoded
        next()
    }).catch(onError)
  };