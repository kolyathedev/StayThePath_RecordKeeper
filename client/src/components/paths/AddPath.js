import React, { useState } from 'react'

import { addPath, usePath } from '../../context/Paths/PathState'
const initialPath = {
	name: '',
	value: '',
}

const AddPath = () => {
	const [pathState, pathDispatch] = usePath()

	const { name, value } = pathState

	const [path, setPath] = useState(initialPath)

	const [hideState, setHide] = useState(false)

	const onChange = (e) =>
		setPath({
			...path,
			[e.target.name]: e.target.value,
		})

	const onSubmit = (e) => {
		e.preventDefault()
		addPath(pathDispatch, path)
		setPath({
			name: '',
			value: '',
		})
	}

	const onHide = () => {
		setHide(!hideState)
		console.log(hideState)
	}

	let form = (
		<form onSubmit={onSubmit}>
			<div className='row'>
				<div className='col 12'>
					<div className='row'>
						<input
							type='text'
							name='name'
							placeholder='name'
							value={name}
							onChange={onChange}
							className='black-text'
						/>
					</div>
					<div className='row'>
						<input
							type='text'
							name='value'
							value={value}
							placeholder='Set initial value if required'
							onChange={onChange}
							className='black-text'
						/>
					</div>
				</div>
				<div className='row'>
					<input
						type='submit'
						value='Add Path'
						className='waves-effect waves-light btn black white-text'
					/>
				</div>
			</div>
		</form>
	)

	return (
		<div>
			<button
				className='btn-floating btn-large waves-effect waves-light black'
				onClick={onHide}
			>
				<i className='material-icons'>add</i>
			</button>
			{hideState && form}
		</div>
	)
}

export default AddPath
