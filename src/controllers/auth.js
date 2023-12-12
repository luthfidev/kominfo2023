const jwt = require('jsonwebtoken')
const authModel = require('../models/auth')
const { TOKEN_SECRET, TOKEN_ALGORITMA } = process.env
module.exports = {

  signIn: async (req, res) => {
    const { username, password, } = req.body
    
    try {
      const userData = await authModel.getAuthCondition({ username });

      if (userData.length < 1) throw new Error('Failed to authenticate');

      if (userData.length > 0) {
        const userDataPassword = userData[0].password
        if (userDataPassword !== password) throw new Error('Password mismatch')
    
            const payload = {
              id_user: userData[0].id_user ? userData[0].id_user : userData[0].id_pelanggan,
              username: userData[0].username,
              nama_level: userData[0].nama_level,
              id_level: userData[0].id_level,
            }

            const token = jwt.sign(payload, TOKEN_SECRET,
              {
                expiresIn: '24h',
                algorithm: TOKEN_ALGORITMA
              })

            if (userData[0].id_level === 1) {
              const data = {
                success: true,
                message: 'Welcome Administrator',
                userData: { ...payload },
                token: token
              }
              res.status(200).header('Authorization', token).send(data)
            } else {
              const data = {
                success: true,
                message: 'Welcome User',
                userData: { ...payload },
                token: token
              }
              res.status(200).header('Authorization', token).send(data)
            }
       
  
      }
    } catch (error) {
      const data = {
        success: false,
        message: error.message
      }
      res.status(500).send(data);
    }
  },
}
