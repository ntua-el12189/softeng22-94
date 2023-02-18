const express = require('express')
const Answer = require('../models/Answer')
const router = express.Router()

//Get all answers of one questionnaire, for one particular session
router.get('/getsessionanswers/:questionnaireId/:session', async (req, res) => {
	try {
		const { questionnaireId, session } = req.params
		const sessionAnswers = await Answer.where('questionnaireId')
			.equals(questionnaireId)
			.where('session')
			.equals(session)

		res.status(200).json(sessionAnswers)
	} catch (e) {
		console.log(console.log(e.message))
		res.status(400).send('Error')
	}
})

// Get all answers of one questionnaire, for one particular question
router.get('/getquestionanswers/:questionnaireId/:questionId', async (req, res) => {
	try {
		const { questionnaireId, questionId } = req.params
		const questionAnswers = await Answer.where('questionnaireId')
			.equals(questionnaireId)
			.where('questionId')
			.equals(questionId)

		res.status(200).json(questionAnswers)
	} catch (e) {
		console.log(console.log(e.message))
		res.status(400).send('Error')
	}
})

// Create new answer
router.post('/doanswer/:questionnaireId/:questionId/:session/:optionId', async (req, res) => {
	try {
		const unifiedRequestObject = { ...req.params, ...req.body }
		console.log(unifiedRequestObject)
		const newAnswer = new Answer(unifiedRequestObject)
		await newAnswer.save()

		res.status(200).json(newAnswer)
	} catch (e) {
		console.log(e.message)
		res.status(400).send('Error')
	}
})

// Create new answer
router.get('/getAllAnswers', async (req, res) => {
	try {
		const answers = await Answer.find({})
		res.status(200).json(answers)
	} catch (e) {
		console.log(e.message)
		res.status(400).send('Error')
	}
})

module.exports = router
