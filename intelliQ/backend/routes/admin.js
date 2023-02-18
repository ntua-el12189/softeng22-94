const express = require('express')
const Questionnaire = require('../models/Questionnaire')
const Answer = require('../models/Answer')
const router = express.Router()
const databaseURL ="mongodb+srv://emkoutsakis:F5pXo7InbZYCoThW>@inteliq.4v1ti8s.mongodb.net/?retryWrites=true&w=majority"

// {baseUrl}/intelliq_api/admin

router.get('/healthcheck', async (req, res) => {
	const questionnaires = await Questionnaire.find()
	if (questionnaires) res.status(200).json({ status: 'OK', dbconnection: databaseURL })
	else res.status(400).json({ status: 'failed', dbconnection: databaseURL })
})

// uploads single JSON
router.post('/questionnaire_upd', async (req, res) => {
	try {
		const newQuestionnaire = new Questionnaire(req.body)
		await newQuestionnaire.save()
		res.status(200).json(newQuestionnaire)
	} catch (e) {
		console.log(e.message)
		res.status(400).send(e.message)
	}
})

// Resets everything
router.post('/resetall', async (req, res) => {
	try {
		await Questionnaire.deleteMany({})
		await Answer.deleteMany({})
		res.status(200).json({ status: 'OK' })
	} catch (e) {
		console.log(e.message)
		res.status(400).json({ status: 'failed', reason: e.message })
	}
})

// Resets all answers
router.post('/resetallanswers', async (req, res) => {
	try {
		await Answer.deleteMany({})
		res.status(200).json({ status: 'OK' })
	} catch (e) {
		console.log(e.message)
		res.status(400).json({ status: 'failed', reason: e.message })
	}
})

// Resets everything
router.post('/resetq/:questionnaireId', async (req, res) => {
	try {
		const deletedQuestionnaire = await Questionnaire.deleteOne({ _id: req.params.questionnaireId })
		if (!deletedQuestionnaire)
			res.status(400).json({ status: 'failed', reason: 'There is no such questionnaire to delete' })
		res.status(200).json({ status: 'OK' })
	} catch (e) {
		console.log(e.message)
		res.status(400).json({ status: 'failed', reason: e.message })
	}
})

module.exports = router
