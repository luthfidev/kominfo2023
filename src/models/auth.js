const db = require('../utils/db')

module.exports = {
  getAuthCondition: (data) => {
    const sql = `SELECT u.id as id_user, 
                            u.email,
                            u.username, 
                            u.password, 
                            l.nama_level, 
                            l.id as id_level,
                            l.name as name_level
                      FROM user u
                     JOIN level l ON l.id = u.id_level WHERE u.username = ?`
    return new Promise((resolve, reject) => {
      db.query(sql, data.username, (error, results) => {
        if (error) {
          console.log(error)
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },


  signUp: (data) => {
    const sql = 'INSERT INTO user SET ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(true)
      })
    })
  },

  signUpAdmin: (data) => {
    const sql = 'INSERT INTO user SET ?'
      return new Promise((resolve, reject) => {
        db.query(sql, data, (error, results) => {
          if (error) {
            reject(Error(error))
          }
          resolve(true)
        })
      })
  }
}
