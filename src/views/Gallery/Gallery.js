import React, { useMemo } from "react"
import _ from "lodash"
import { Link } from "react-router-dom"
import "./Gallery.css"

export default function Gallery({
	match: {
		params: { id }
	}
}) {
	function importAll(r) {
		return r.keys().map(r)
	}
	const cupcakes = useMemo(() => importAll(require.context(`assets/cakes/cupcakes`, false, /\.(png|jpe?g|svg)$/)), [])
	const special = useMemo(() => importAll(require.context(`assets/cakes/special`, false, /\.(png|jpe?g|svg)$/)), [])
	const wedding = useMemo(() => importAll(require.context(`assets/cakes/wedding`, false, /\.(png|jpe?g|svg)$/)), [])
	const boyBirthday = useMemo(() => importAll(require.context(`assets/cakes/boyBirthday`, false, /\.(png|jpe?g|svg)$/)), [])
	const girlBirthday = useMemo(() => importAll(require.context(`assets/cakes/girlBirthday`, false, /\.(png|jpe?g|svg)$/)), [])
	const otherTreats = useMemo(() => importAll(require.context(`assets/cakes/otherTreats`, false, /\.(png|jpe?g|svg)$/)), [])
	let render
	switch (id) {
		case "cupcakes":
			render = cupcakes
			break
		case "special":
			render = special
			break
		case "wedding":
			render = wedding
			break
		case "boyBirthday":
			render = boyBirthday
			break
		case "girlBirthday":
			render = girlBirthday
			break
		case "otherTreats":
			render = otherTreats
			break
		default:
			break
	}

	return (
		<>
			<Link to='/'>Back</Link>
			<div className='galleryImages'>{_.shuffle(render.map((image, i) => <img key={i} src={image} alt={image} />))}</div>
		</>
	)
}
