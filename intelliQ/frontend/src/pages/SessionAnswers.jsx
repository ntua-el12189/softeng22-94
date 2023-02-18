import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import axios from 'axios'

function SessionAnswers() {
	const { questionnaireId, session } = useParams()
	const [answers, setAnswers] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchSessionAnswers(questionnaireId, session)
			.then((res) => setAnswers(res.data))
			.catch((e) => alert(e.message))
			.finally(() => setIsLoading(false))
	}, [questionnaireId, session])

	if (isLoading) return <Loading />

	return (
		<div className='flex flex-col justify-center items-center'>
			<h1 className='text-lg md:text-2xl text-gray-600 font-semibold text-center'>
				Thanks a lot for your time! 😇
			</h1>
			<p className='text-gray-600'>Below you can see your answers:</p>
			<h3 className='text-base md:text-lg text-gray-600 font-bold my-2 text-center'>Session Id: {session}</h3>
			<div className='border shadow-lg rounded-md p-4'>
				<div className='flex gap-3 my-2'>
					<h4 className='w-[170px] truncate font-semibold text-lg text-gray-700 text-center'>Questionnaire</h4>

					<h4 className='w-[150px] truncate font-semibold text-lg text-gray-700 text-center'>Question</h4>
					<p className='w-[150px] truncate font-semibold text-lg text-gray-700 text-center'>Answer</p>
				</div>
				{answers.map((item, key) => (
					<div key={key} className='flex gap-3 text-gray-600'>
						<h4 className='w-[170] truncate text-center'>{item.questionnaireId}</h4>
						<h4 className='w-[150px] truncate text-center'>{item.questionId}</h4>
						<p className='w-[150px] truncate text-center'> {item.answerText}</p>
					</div>
				))}
			</div>
			<Link to='/'>
				<button className='border text-sm md:text-base px-6 py-2 m-4 rounded-md shadow-sm cursor-pointer bg-blue-500 text-white hover:bg-blue-400 hover:shadow-lg transition'>
					Home
				</button>
			</Link>
		</div>
	)
}

function fetchSessionAnswers(questionnaire, session) {
	const url = 'http://localhost:9103/intelliq_api/getsessionanswers/' + questionnaire + '/' + session
	return axios.get(url)
}

export default SessionAnswers
