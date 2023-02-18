import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ children }) => {
	return (
		<>
			<header className='text-center p-4 pt-8'>
				<Link to='/'>
					<h1 className='text-3xl font-extrabold text-gray-800 md:text-5xl cursor-pointer hover:scale-125 transition'>
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 '>
							intelliQ
						</span>{' '}
					</h1>
				</Link>
				<p className='text-base md:text-2xl font-normal text-gray-500'>
					A platform where you can answer published questionnaires
				</p>
			</header>
			{children}
		</>
	)
}

export default Header
