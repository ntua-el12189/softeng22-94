import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Questionnaire from '../components/Questionnaire'
import Loading from '../components/Loading'

function Home() {
	const [questionnaires, setQuestionnaires] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchQuestionnaires()
			.then((r) => setQuestionnaires(r.data))
			.finally(() => setIsLoading(false))
	}, [])

	if (isLoading)
		return (
			<>
				<Loading />
			</>
		)

	return (
		<div className='flex flex-wrap gap-2 justify-center'>
			<Questionnaire questionnaires={questionnaires} />
		</div>
	)
}

function fetchQuestionnaires() {
	const url = 'http://localhost:5000/intelliq_api/questionnaire/getAll'
	return axios.get(url)
}

export default Home
