const dotenv = require('dotenv')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const chalk = require('chalk')
const session = require('express-session')
const passport = require('passport')

dotenv.config()

require('./config/passport')

const userController = require('./controllers/user')

const app = express()

// MongoDB configuration =====
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI_TEST || process.env.MONGODB_URI)
mongoose.connection.on('error', err => {
  console.error(err)
  console.log(
    '%s MongoDB connection error. Please make sure MongoDB is running.',
    chalk.red('✗'),
  )
  process.exit()
})

// Express configuration =====
app.set('port', 4000)
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
)
app.use(passport.initialize())
app.use(passport.session())

// routes ====================
app.get('/login', userController.getLogin)

app.get('/auth/github', passport.authenticate('github'))
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(req.session.redirectTo)
  },
)

// ===========================
app.listen(
  app.get('port'),
  console.log(
    '%s Server is running at http://localhost:%d',
    chalk.green('✓'),
    app.get('port'),
  ),
)
