import React from "react"
import "./CustomerDetails.css"

const Details = props => (
	<div className='customerDetails'>
		<div>
			<label>Name</label>
			<input type='text' name='name' required onChange={props.handleChange} />
		</div>
		<div>
			<label>Phone Number:</label>
			<input type='tel' name='phoneNumber' placeholder='(xxx) xxx-xxxx' required onChange={props.handleChange} />
			<div>
				<label>Is a text ok?</label>
				<input name='makeText' type='checkbox' onChange={props.handleChange} />
			</div>
		</div>
		<div>
			<label>additional contact details:</label>
		</div>
		<textarea name='contactDetails' onChange={props.handleChange} />
		<button onClick={props.sendEmail}>Submit Order</button>
	</div>
)

export default Details
