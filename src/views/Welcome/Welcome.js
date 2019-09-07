import React from "react"
import { Link } from "react-router-dom"
import './Welcome.css'

export default function Welcome() {
	return (
		<>
			<div className="welcome">Welcome to Sweet Bay Cakes</div>
			<Link to='/order'>Order</Link>
      <div className='wrapper'>
        <div className="box"><p>Wedding Cakes</p></div>
        <div className="box"><p>Birthday Cakes</p></div>
        <div className="box"><p>Special Occasion Cakes</p></div>
        <div className="box"><p>Cupcakes</p></div>
        <div className="box"><p>Other Treats</p></div>
      </div>
		</>
	)
}
