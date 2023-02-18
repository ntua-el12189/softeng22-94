import React from 'react'

const baseTailwindClass = 'text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full '
const colorClass = [
	'bg-red-100 text-red-800',
	'bg-green-100 text-green-800',
	'bg-yellow-100 text-yellow-800',
	'bg-blue-100 text-blue-800',
	'bg-gray-100 text-gray-800',
]
function Badge({ badges }) {
	if (badges.length === 0) return <p className='text-sm text-gray-500'>No keywords provided</p>
	return (
		<>
			{badges.map((item, index) => (
				<span key={index} className={baseTailwindClass + colorClass[index]}>
					{item}
				</span>
			))}
		</>
	)
}

export default Badge
