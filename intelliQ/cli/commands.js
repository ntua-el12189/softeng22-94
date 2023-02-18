const { program } = require('commander')
const axios = require('axios')
const fs = require('fs')

program.version('1.0.0').description('You can add new questionaires to the database')

program
	.command('add <file>')
	.alias('a')
	.description('Takes as input a JSON file and it inserts it to the database')
	.action((file) => {
		console.log('File is: ', file)
		const object = require('./input.json')
		console.log({ object })
		axios.get('http://localhost:5000/intelliq_api/admin/healthcheck').then((r) => console.log(r.data))
	})

program.parse(process.argv)
