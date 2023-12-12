require('dotenv').config()
const PORT = process.env.PORT || 7000
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const helmet = require('helmet')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  const data = {
    name: 'Welcome to sekolahku',
    version: '1.0.0'
  }
  res.send(data)
})

const auth = require('./src/routes/auth')
const users = require('./src/routes/users')

app.use('/auth', auth)
app.use('/users', users)

app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})

app.listen(PORT, () => {
  console.log('Server running')
})

module.exports = app
