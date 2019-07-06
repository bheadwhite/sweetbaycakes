import React from "react"
import './Header.css'
import logo from "./../../assets/SweetBayCakes_textOnly.svg"

const header = () => (
	<header className='header'>
		<div>
			<img src={logo} alt='sweet bay logo' />
		</div>
	</header>
)
export default header
