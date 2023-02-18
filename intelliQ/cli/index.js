const { program } = require('commander')
const axios = require('axios')
const fs = require('fs')

program.version('1.0.0').description('You can add new questionaires to the database')

program
	.command('healthcheck')
	.alias('h')
	.description('Performs health check to the database / server')
	.action(() => {
		axios
			.get('http://localhost:5000/intelliq_api/admin/healthcheck')
			.then((r) => console.log(r.data))
			.catch((e) => console.log(e.message))
	})

program
	.command('getAll')
	.alias('ga')
	.description('Returns all questionnaires')
	.action(() => {
		axios
			.get('http://localhost:5000/intelliq_api/questionnaire/getAll')
			.then((r) => console.log(r.data))
			.catch((e) => console.log(e.message))
	})

program
	.command('resetAll')
	.alias('ra')
	.description('Resets everything')
	.action(() => {
		axios
			.post('http://localhost:5000/intelliq_api/admin/resetAll')
			.then((r) => console.log(r.data))
			.catch((e) => console.log(e.message))
	})

program
	.command('getQuestionnaire <Qid>')
	.alias('gq')
	.description('Returns one questionnaire')
	.action((Qid) => {
		axios
			.get(`http://localhost:5000/intelliq_api/questionnaire/${Qid}`)
			.then((r) => console.log(r.data))
			.catch((e) => console.log(e.message))
	})

program
	.command('upload <file>')
	.alias('u')
	.description('Takes as input a JSON file and it inserts it to the database')
	.action((file) => {
		const object = require(`./${file}`)
		axios
			.post('http://localhost:5000/intelliq_api/admin/questionnaire_upd', object)
			.then((r) => console.log(r.data))
			.catch((e) => console.log(e.message))
	})

program
	.command('getSessionAnswers <Qid> <sId>')
	.alias('gsa')
	.description('Returns all answers for one session')
	.action((Qid, sId) => {
		axios
			.get(`http://localhost:5000/intelliq_api/getsessionanswers/${Qid}/${sId}`)
			.then((r) => console.log(r.data))
			.catch((e) => console.log(e.message))
	})

program
	.command('getQuestionAnswers <Qid> <qId>')
	.alias('gqa')
	.description('Returns all answers for one question')
	.action((Qid, qId) => {
		axios
			.get(`http://localhost:5000/intelliq_api/getquestionanswers/${Qid}/${qId}`)
			.then((r) => console.log(r.data))
			.catch((e) => console.log(e.message))
	})

program
	.command('getAllAnswers')
	.alias('gaa')
	.description('Returns all answers')
	.action(() => {
		axios
			.get(`http://localhost:5000/intelliq_api/getAllAnswers/`)
			.then((r) => console.log(r.data))
			.catch((e) => console.log(e.message))
	})

program.parse(process.argv)
