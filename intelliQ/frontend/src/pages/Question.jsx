import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import Stats from '../components/Stats'

function Question() {
	const { questionId, questionnaireId } = useParams()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)
	const [questionData, setQuestionData] = useState([])
	const [answer, setAnswer] = useState('')
	const [showStats, setShowStats] = useState(false)
	const [selectedOption, setSelectedOption] = useState()

	useEffect(() => {
		fetchQuestionnaires(questionnaireId, questionId)
			.then((r) => {
				setQuestionData(r.data[0])
				setSelectedOption(r.data[0].options[0])
			})
			.finally(() => setIsLoading(false))
	}, [questionId])

	const handleSelectChange = (e) => {
		const option = questionData.options.filter((i) => i.text === e.target.value)
		setSelectedOption(option[0])
	}

	const handleNext = () => {
		if (answer.trim() === '' && questionData.required && questionData.answerType === 'input')
			alert('This answer is required')
		else {
			setIsLoading(true)
			let answerText = ''
			if (questionData.answerType === 'input') answerText = answer
			else {
				answerText = selectedOption.text
			}
			const session = sessionStorage.getItem('session')
			axios
				.post(
					`http://localhost:5000/intelliq_api/doanswer/${questionnaireId}/${questionId}/${session}/${selectedOption.optionId}`,
					{ answerText }
				)
				.then(() => {
					// if the post request isSuccessfull then redirect to the next page
					if (selectedOption.nextquestionId === 'final')
						navigate(`/session_recap/${questionnaireId}/${session}`)
					else navigate(`/question/${questionnaireId}/${selectedOption.nextquestionId}`)
				})
				.catch((e) => {
					alert(e.message)
					setIsLoading(false)
				})
		}
	}

	if (isLoading)
		return (
			<>
				<Loading />
			</>
		)
	return (
		<div className='w-2/3'>
			<div className='text-xl md:text-2xl text-gray-700 border  p-2 px-6 mb-6 shadow-md  rounded-md text-center '>
				{questionData.text}
			</div>
			<h1 className='text-xl md:text-2xl font-semibold text-gray-600'>
				Απάντηση <span>{questionData.required && '*'}</span>:
			</h1>
			{questionData.answerType === 'input' ? (
				<div className=''>
					<input
						type='text'
						placeholder='Answer here'
						onChange={(e) => setAnswer(e.target.value)}
						className='outline outline-1 outline-gray-200 border-none p-4 rounded-md my-4 w-full cursor-pointer focus:ring-none focus:shadow-lg focus:cursor-text'
					/>
				</div>
			) : (
				<select
					onChange={handleSelectChange}
					className='bg-white my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
				>
					{questionData.options.map((item, index) => (
						<option key={index}>{item.text}</option>
					))}
				</select>
			)}
			<div className='flex items-center gap-2'>
				<button
					onClick={handleNext}
					className='border text-sm md:text-base px-6 py-2 rounded-md shadow-sm cursor-pointer bg-green-600 text-white hover:bg-green-400 hover:shadow-lg transition'
				>
					Next
				</button>
				<button
					onClick={() => setShowStats((prev) => !prev)}
					className='border text-sm md:text-base px-6 py-2 rounded-md shadow-sm cursor-pointer bg-blue-600 text-white hover:bg-blue-400 hover:shadow-lg transition'
				>
					Stats
				</button>
			</div>
			{showStats && <Stats questionnaireId={questionnaireId} questionId={questionId} />}
		</div>
	)
}

function fetchQuestionnaires(questionnaire, question) {
	const url = 'http://localhost:5000/intelliq_api/questionnaire/' + questionnaire + '/' + question
	return axios.get(url)
}

export default Question
