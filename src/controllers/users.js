const { APP_URL } = process.env
const userModel = require('../models/users')
const pagination = require('../utils/pagination')

module.exports = {

  getAllUser: async (req, res) => {
    const { page, limit, search, sort, sarjana } = req.query
    const condition = {
      search,
      sort,
      sarjana
    }

    const sliceStart = (pagination.getPage(page) * pagination.getPerPage(limit)) - pagination.getPerPage(limit)
    const sliceEnd = (pagination.getPage(page) * pagination.getPerPage(limit)) - sliceStart
    const totalData = await userModel.getUserCount(condition)
    const totalPage = Math.ceil(totalData / pagination.getPerPage(limit))
    const prevLink = pagination.getPrevLink(pagination.getPage(page), req.query)
    const nextLink = pagination.getNextLink(pagination.getPage(page), totalPage, req.query)

    const userData = await userModel.getAllUser(sliceStart, sliceEnd, condition)
    const data = {
      success: true,
      message: 'List user',
      data: userData,
      pageInfo: {
        page: pagination.getPage(page),
        totalPage,
        perPage: pagination.getPerPage(limit),
        totalData,
        prevLink: prevLink && `${APP_URL}user?${nextLink}`,
        nextLink: nextLink && `${APP_URL}user?${nextLink}`
      }
    }
    res.status(200).send(data)
  },

  detailUser: async (req, res) => {
    const { id } = req.body;
    try {

      const result = await userModel.getUserByCondition({ id });

      if (result) {
        const data = {
          success: true,
          data: result
        }
        res.status(201).send(data)
      }

      
    } catch (error) {
      const data = {
        success: false,
        message: error.message
      }
      res.status(500).send(data);
    }
  },

  createUser: async (req, res) => {
    const { username, password, email, id_level } = req.body
    try {
      
      const isExistUsername = await userModel.getUserByCondition({ username });

      if (isExistUsername.length > 0) throw new Error('Username already exists')

      const userData = { username, password, email, id_level };
      const results = await userModel.createUser(userData);

      if (!results) throw new Error('Failed create user');

      if (results) {
        const data = {
          success: true,
          message: 'Create user has ben success'
        }
        res.status(201).send(data)
      }

    } catch (error) {
       const data = {
        success: false,
        message: error.message
      }
      res.status(500).send(data);
    }
  },

  updateUser: async (req, res) => {

    let { id, username, email, password } = req.body

    try {

      const isExistuser = await userModel.getUserByCondition({ id : parseInt( id ) });

      if (isExistuser.length < 1) throw new Error("user not found");

      username = username || isExistuser[0].username
      password = password || isExistuser[0].password
      email = email || isExistuser[0].email

      const userData = [
        { username, password, email},
        { id }
      ]

      const results = await userModel.updateUser(userData)

      if (!results) throw new Error("Update user failed");

      delete userData[0].password

        const data = {
          success: true,
          message: 'user has been update',
          data: userData[0]
        }
        res.status(201).send(data)
      
    } catch (error) {
      const data = {
        success: false,
        message: error.message
      }
      res.status(500).send(data);
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.body;
    try {

      const deleted_at = new Date()
      const checkId = await userModel.getUserByCondition({ id: parseInt(id) })
      
      if (checkId.length < 1) throw new Error("user not found");

      const deleteData = [
        { deleted_at },
        { id }
      ]

      const results = await userModel.deleteUser(deleteData);

      if (!results) throw new Error("Failed delete user");

      const data = {
        success: true,
        message: 'user has been deleted successfully',
      }
      res.status(201).send(data)
      
    } catch (error) {
      const data = {
        success: false,
        message: error.message
      }
      res.status(500).send(data);
    }
  },

}
