import React from "react"
import { Link } from "react-router-dom"
import './Welcome.css'
import wedding from 'assets/cakes/wedding1.jpg'
// import girlBirthday from 'assets/cakes/girlBirthday1.jpg'
import boyBirthday from 'assets/cakes/boyBirthday2.jpg'
import cupcakes from 'assets/cakes/cupcakes1.jpg'
import spcOccasion from 'assets/cakes/specialOccasion2.jpg'
import otherTreats from 'assets/cakes/treats.jpg'


export default function Welcome() {
return (
		<>
			<div className="welcome">Welcome to Sweet Bay Cakes</div>
			<Link to='/order'>Order</Link>
      <div className='wrapper'>
        <Link to="gallery/wedding"><div><div className="box"><img src={wedding} alt="wedding cakes" /></div><p>Wedding Cakes</p></div></Link>
        <Link to="gallery/boyBirthday"><div><div className="box"><img src={boyBirthday} alt="Birthday cakes" /></div><p>Birthday Cakes</p></div></Link>
        <Link to="gallery/special"><div><div className="box"><img src={spcOccasion} alt="special Occasion cakes" /></div><p>Special Occasion Cakes</p></div></Link>
        <Link to="gallery/cupcakes"><div><div className="box"><img src={cupcakes} alt="cupcakes" /></div><p>Cupcakes</p></div></Link>
        <Link to="gallery/otherTreats"><div><div className="box"><img src={otherTreats} alt="Other Treats" /></div><p>Other Treats</p></div></Link>
      </div>
		</>
	)
}
