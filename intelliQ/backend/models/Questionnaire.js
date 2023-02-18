const mongoose = require('mongoose')

const options = new mongoose.Schema({
	optionId: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	nextquestionId: {
		type: String,
		required: true,
	},
})

const question = new mongoose.Schema({
	questionId: {
		type: String,
		required: true,
	},
	title: String,
	text: {
		type: String,
		required: true,
	},
	// Input | Select
	answerType: {
		type: String,
		required: true,
	},
	required: Boolean,
	// profile | question
	type: String,
	options: {
		type: [options],
		required: true,
	},
})

const questionnaireSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	keywords: {
		type: [String],
		required: true,
	},
	questions: {
		type: [question],
		required: true,
	},
})

module.exports = mongoose.model('Questionnaire', questionnaireSchema)
