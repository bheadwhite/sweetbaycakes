import React from "react"

const Chart = props => (
	<div className={`bigCakeSize-image ${props.bigImage}`} onClick={props.toggleChart}>
		<img className='bigOne' src='./img/cakeSize.png' alt='cake Sizes' />
		<img className={`close ${props.bigImage}`} src='./img/close.png' alt='close button' />
	</div>
)

export default Chart
