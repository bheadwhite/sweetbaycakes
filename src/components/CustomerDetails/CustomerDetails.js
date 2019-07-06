import React from "react"
import "./CustomerDetails.css"

const Details = () => (
	<div className='customerDetails'>
		<label htmlFor='name'>Name</label>
		<input type='text' id='name' required onChange={e => this.setState({ cstName: e.target.value })} />
		<label>Phone Number:</label>
		<input type='tel' placeholder='(xxx)-xxx-xxxx' required onChange={e => this.setState({ cstNumber: e.target.value })} />
		<label>Is a text ok?</label>
		<input type='checkbox' />
		<label>additional contact details:</label>
		<textarea name='' id='' cols='30' rows='10' />
		<button onClick={() => this.sendEmail()}>Submit Order</button>
	</div>
)

export default Details
