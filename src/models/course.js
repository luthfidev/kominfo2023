const db = require('../utils/db')

module.exports = {
  createCourse: (data) => {
    const sql = 'INSERT INTO courses SET ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },

  getCourseCount: (data) => {
    const sql = `SELECT COUNT(*) as total FROM courses
                     WHERE mentor LIKE '%${data.search || ''}%' 
                     ORDER BY mentor ${parseInt(data.sort) ? 'DESC' : 'ASC'}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, results) => {
        if (error) {
          reject(Error(error).total)
        }
        resolve(results[0].total)
      })
    })
  },

  getCourseByCondition: (data) => {
    const sql = 'SELECT * FROM courses WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },

  getAllCourses: (start, end, data) => {
    const sql = `SELECT * FROM courses
                     WHERE mentor LIKE '%${data.search || ''}%' 
                     ORDER BY mentor ${parseInt(data.sort) ? 'DESC' : 'ASC'} LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },


  updateCourse: (data) => {
    console.log(data)
    const sql = 'UPDATE courses SET ? WHERE ?'
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
    const sql = 'UPDATE FROM courses SET ? WHERE ?'
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
