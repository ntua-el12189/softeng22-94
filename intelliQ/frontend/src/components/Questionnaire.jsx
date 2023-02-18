import React from 'react'
import Badge from './Badge'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Questionnaire({ questionnaires }) {
	if (questionnaires.length === 0)
		return <p className='text-xl font-semibold text-gray-600'>No questionnaires found</p>

	return (
		<>
			{questionnaires.map((item, index) => (
				<div key={index} className='border border-zinc-300 min-w-[400px] p-4 shadow-md rounded-md'>
					<h3 className='font-semibold text-base md:text-lg truncate'>{item.title}</h3>
					<p className='text-gray-500 text-xs md:text-sm'>{item.questions.length} questions</p>
					<div className='flex items-center w-full pt-4'>
						<Badge badges={item.keywords} />
						<Link to={`/question/${item._id}/${item.questions[0].questionId}`} className='ml-auto'>
							<button className='border text-xs md:text-sm px-2 py-2 rounded-full shadow-sm cursor-pointer bg-green-600 text-white hover:bg-green-400 hover:shadow-lg transition'>
								<div className='flex gap-2 justify-center items-center'>
									<span>
										<AiOutlineArrowRight size={20} />
									</span>
								</div>
							</button>
						</Link>
					</div>
				</div>
			))}
		</>
	)
}

export default Questionnaire
