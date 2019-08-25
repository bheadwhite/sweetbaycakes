import React from "react"
import "./CakeChart.css"

const Chart = ({viewModal, toggleModal, bigImage}) => (
	<div className={viewModal} onClick={toggleModal}>
		<div className={`cakeChart ${bigImage}`} onClick={e=>e.stopPropagation()}>
			<img className='bigOne' src='./img/cakeSize.png' alt='cake Sizes' />
			{/* <img className={`close ${props.bigImage}`} src='./img/close.png' alt='close button' /> */}
		</div>
	</div>
)

export default Chart
