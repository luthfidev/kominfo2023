const router = require('express').Router()
const usersController = require('../controllers/users')
// const verify = require('../utils/verifyToken')
// const checkRole = require('../utils/roles')

router
  .get('/list', usersController.getAllUser)
  .post('/',
    usersController.createUser)
  .post('/update',
    usersController.updateUser)
  .post('/delete',
    usersController.deleteUser)
  .post('/detail',
    usersController.detailUser)

module.exports = router
