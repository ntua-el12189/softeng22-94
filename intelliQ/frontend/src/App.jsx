import Layout from './containers/Layout'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Question from './pages/Question'
import Header from './containers/Header'
import SessionAnswers from './pages/SessionAnswers'
import { useEffect } from 'react'

function App() {
	useEffect(() => {
		const session = sessionStorage.getItem('session')
		if (!session) {
			const sessionString = makeid(4)
			sessionStorage.setItem('session', sessionString)
		}
	}, [])
	return (
		<Header>
			<Layout>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/session_recap/:questionnaireId/:session' element={<SessionAnswers />} />
					<Route path='/question/:questionnaireId/:questionId' element={<Question />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</Layout>
		</Header>
	)
}

export default App

function makeid(length) {
	let result = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	let counter = 0
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
		counter += 1
	}
	return result
}
