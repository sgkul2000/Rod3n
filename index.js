const client = require('./client')


const express = require('express')
const BodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()


client.login(process.env.BOT_TOKEN)

const app = express()

// logger for incoming requests
const logger = morgan('dev')

app.use(logger)

app.use(cors())
app.use(BodyParser.json())

// setting static folder to "public"
app.use(express.static('public'))

// view route
app.get('/', () => {
  app.render('/index.html')
})

// setting port
// port = process.env.PORT || 8000;

// establishing server
// app.listen(port, () => {
//   console.log(`Listening at port ${port}`);
// });

module.exports = app
