const dotenv = require('dotenv')
const express = require('express')
const logger = require('morgan')
const chalk = require('chalk')

dotenv.config()

const app = express()

// Express configuration =====
app.set('port', process.env.PORT || 3000)
app.use(logger('dev'))

// routes ====================
app.get('/', (req, res) => {
  res.send('Hello from The Code Venture <b>fullstack Challenge</b>!')
})

// ===========================
app.listen(
  app.get('port'),
  console.log(
    '%s Server is running at http://localhost:%d',
    chalk.green('✓'),
    app.get('port'),
  ),
)
