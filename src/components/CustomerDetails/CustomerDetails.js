import React from "react"
import "./CustomerDetails.css"

export default function Details({ handleUser }) {
	return (
		<div className='customerDetails'>
			<div>
				<label>Name</label>
				<input type='text' name='name' required onChange={handleUser} />
			</div>
			<div>
				<label>Phone Number:</label>
				<input type='tel' name='phoneNumber' placeholder='(xxx) xxx-xxxx' required onChange={handleUser} />
				<div>
					<label>Is a text ok?</label>
					<input name='makeText' type='checkbox' onChange={handleUser} />
				</div>
			</div>
			<div>
				<label>Additional contact details:</label>
			</div>
			<div>
				<textarea name='contactDetails' onChange={handleUser} />
			</div>
		</div>
	)
}
