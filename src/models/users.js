const db = require('../utils/db')

module.exports = {
  createUser: (data) => {
    const sql = 'INSERT INTO users SET ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },

  getUserCount: (data) => {

    let queryCondition;
    if (data.sarjana) {
      queryCondition = `LIKE '${data.search || 'S'}%'`
    } else {
      queryCondition = `NOT LIKE '${data.search || 'S'}%'`
    }
    const sql = `
    SELECT COUNT(u.id) as total
    from userCourse uc
    JOIN users u ON u.id = uc.id_user
    JOIN courses c ON c.id = uc.id_course 
    WHERE c.title ${queryCondition}
    ORDER BY username ${parseInt(data.sort) ? 'DESC' : 'ASC'}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, results) => {
        if (error) {
          reject(Error(error).total)
        }
        resolve(results[0].total)
      })
    })
  },

  getUserByCondition: (data) => {
    const sql = 'SELECT * FROM users WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },

  getAllUser: (start, end, data) => {
    let queryCondition;
    if (data.sarjana) {
      queryCondition =`LIKE '${data.search || 'S'}%'`
    } else {
      queryCondition = `NOT LIKE '${data.search || 'S'}%'`
    }
    const sql = `
    SELECT u.username, c.course, c.mentor, c.title 
    from userCourse uc
    JOIN users u  ON u.id = uc.id_user
    JOIN courses c ON c.id = uc.id_course 
    WHERE c.title ${queryCondition} 
    ORDER BY username ${parseInt(data.sort) ? 'DESC' : 'ASC'} LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },


  updateUser: (data) => {
    console.log(data)
    const sql = 'UPDATE users SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results.affectedRows)
      })
    })
  },

  deleteUser: (data) => {
    const sql = 'UPDATE FROM users SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results.affectedRows)
      })
    })
  },
}
