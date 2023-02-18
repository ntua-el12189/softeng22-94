require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const mongoString =
	'mongodb+srv://emkoutsakis:F5pXo7InbZYCoThW@inteliq.4v1ti8s.mongodb.net/?retryWrites=true&w=majority'

const admin = require('./routes/admin')
const questionnaire = require('./routes/questionnaire')
const answers = require('./routes/answers')

mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
	console.log(error)
})

database.once('connected', () => {
	console.log('Database Connected')
})
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

const apiVersion = '/intelliq_api'

app.use(apiVersion + '/admin', admin)
app.use(apiVersion + '/questionnaire', questionnaire)
app.use(apiVersion, answers)

app.use(express.json())

app.listen(5000, () => {
	console.log(`Server Started at ${5000}`)
})
