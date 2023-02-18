import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

function Stats({ questionnaireId, questionId }) {
	const [answers, setAnswers] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchQuestionAnswers(questionnaireId, questionId)
			.then((res) => {
				const allAnswers = res.data
				const hashTable = {}
				allAnswers.forEach(({ answerText }) => {
					if (answerText in hashTable) hashTable[answerText]++
					else hashTable[answerText] = 1
				})

				setAnswers(hashTable)
			})
			.catch((e) => alert(e.message))
			.finally(() => setIsLoading(false))
	}, [questionId, questionnaireId])

	if (isLoading) return <Loading />

	if (Object.keys(answers).length === 0)
		return (
			<h1 className='text-lg md:text-2xl text-gray-600 font-semibold text-center my-10'>
				Sorry. No previous data available for this question
			</h1>
		)
	return (
		<div>
			<h1 className='text-lg md:text-2xl text-gray-600 font-semibold text-center my-4'>
				Other answers for this question:
			</h1>
			<div className='border shadow-lg rounded-md p-4'>
				<div className='flex gap-3 my-2'>
					<h4 className='w-[150px] truncate font-semibold text-lg text-gray-700'>Answer</h4>
					<p className='w-[150px] truncate font-semibold text-lg text-gray-700'>Counter</p>
				</div>
				{Object.keys(answers).map((item, key) => (
					<div key={key} className='flex gap-3 text-gray-600'>
						<p className='w-[150px] truncate'> {item}</p>{' '}
						<h4 className='w-[150px] truncate'>{answers[item]}</h4>
					</div>
				))}
			</div>
			<div className='py-10 flex justify-center items-center '>
				<BarChart
					width={500}
					height={300}
					data={convertToGraphData(answers)}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey='counter' fill='#8884d8' />
					{/* <Bar dataKey='uv' fill='#82ca9d' /> */}
				</BarChart>
			</div>
		</div>
	)
}

function fetchQuestionAnswers(questionnaire, questionId) {
	const url = 'http://localhost:9103/intelliq_api/getquestionanswers/' + questionnaire + '/' + questionId
	return axios.get(url)
}

function convertToGraphData(hashTable) {
	const array = []
	Object.keys(hashTable).forEach((i) => array.push({ name: i, counter: hashTable[i] }))
	return array
}

export default Stats
