const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
	questionnaireId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	questionId: {
		type: String,
		required: true,
	},
	session: {
		type: String,
		required: true,
	},
	optionId: {
		type: String,
		required: true,
	},
	answerText: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('Answer', answerSchema)
