const { APP_URL } = process.env
const userCourseModel = require('../models/userCourse')
const pagination = require('../utils/pagination')

module.exports = {

  getAllUserCourse: async (req, res) => {
    const { page, limit, search, sort } = req.query
    const condition = {
      search,
      sort
    }

    const sliceStart = (pagination.getPage(page) * pagination.getPerPage(limit)) - pagination.getPerPage(limit)
    const sliceEnd = (pagination.getPage(page) * pagination.getPerPage(limit)) - sliceStart
    const totalData = await userCourseModel.getUserCourseCount(condition)
    const totalPage = Math.ceil(totalData / pagination.getPerPage(limit))
    const prevLink = pagination.getPrevLink(pagination.getPage(page), req.query)
    const nextLink = pagination.getNextLink(pagination.getPage(page), totalPage, req.query)

    const userCourseData = await userCourseModel.getAllUserCourse(sliceStart, sliceEnd, condition)
    const data = {
      success: true,
      message: 'List user Course',
      data: userCourseData,
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

  detailUserCourse: async (req, res) => {
    const { id } = req.body;
    try {

      const result = await userModel.getUserCourseByCondition({ id });

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

  createUserCourse: async (req, res) => {
    const { id_user, id_course } = req.body
    try {
    
      const userCourseData = { id_user, id_course };
      const results = await userCourseModel.createUserCourse(userCourseData);

      if (!results) throw new Error('Failed create user course');

      if (results) {
        const data = {
          success: true,
          message: 'Create user course has ben success'
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

}
