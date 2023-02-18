const express = require('express')
const router = express.Router()
const Questionnaire = require('../models/Questionnaire')

// {baseUrl}/intelliq_api/questionnaire

// Get All Questionnaires

router.get('/getAll', async (req, res) => {
	try {
		const questionnaires = await Questionnaire.find()
		if (questionnaires.length === 0) res.status(404).send(questionnaires)
		else res.status(200).send(questionnaires)
	} catch (error) {
		console.log(error.message)
		res.status(400).send('Error')
	}
})

// Get One Questionnaire by ID

router.get('/:questionnaireId', async (req, res) => {
	try {
		const questionnaire = await Questionnaire.find({ _id: req.params.questionnaireId })
		if (questionnaire.length === 0) res.status(404).send('There is no questionnaire with the ID you asked for')
		else res.status(200).send(questionnaire)
	} catch (error) {
		console.log(error.message)
		res.status(400).send('Error')
	}
})

// Get One Question from a particular Questionnaire

router.get('/:questionnaireId/:questionId', async (req, res) => {
	try {
		const questionnaire = await Questionnaire.where('_id').equals(req.params.questionnaireId)
		if (questionnaire.length === 0) res.status(404).send('There is no questionnaire with the ID you asked for')
		else {
			const { questions } = questionnaire[0]
			const questionResult = questions.filter((q) => q.questionId == req.params.questionId)
			if (questionResult.length === 0) {
				res.status(404).send('There is no question with the ID you asked for')
			} else {
				res.status(200).send(questionResult)
			}
		}
	} catch (error) {
		console.log(error.message)
		res.status(400).send('Error')
	}
})

// Create a new Questionnare

router.post('/create', async (req, res) => {
	try {
		const newQuestionnaire = new Questionnaire(req.body)
		await newQuestionnaire.save()
		res.status(200).json(newQuestionnaire)
	} catch (error) {
		console.log(error.message)
		res.status(400).send('Error')
	}
})

// Update a Questionnaire by ID

router.patch('/:questionnaireId', async (req, res) => {
	try {
		const questionnaire = await Questionnaire.findOne({ _id: req.params.questionnaireId })
		if (!questionnaire) res.status(500).send("You can't update a questionnaire that doesn't exist")
		else {
			const { questions } = req.body
			if (questions === undefined) res.status(500).send('Please provide the new questionnaire in req.body')
			else {
				questionnaire.questions = [...questions]
				await questionnaire.save()
				res.status(200).json(questionnaire)
			}
		}
	} catch (error) {
		console.log(error.message)
		res.status(400).send('Error')
	}
})

// Delete a Questionnaire by ID

router.delete('/:questionnaireId', async (req, res) => {
	try {
		const deletedQuestionnaire = await Questionnaire.deleteOne({ _id: req.params.questionnaireId })
		res.status(200).json(deletedQuestionnaire)
	} catch (error) {
		console.log(error.message)
		res.status(400).send('Error')
	}
})

module.exports = router
