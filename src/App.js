import React from "react"
import { Switch, Route } from "react-router-dom"
import Order from "./views/Order/Order"
import Welcome from "./views/Welcome/Welcome"
import Gallery from "./views/Gallery/Gallery.js"
import './App.css'

export default function App() {
	return (
		<div>
			<Switch>
				<Route path='/order' component={Order} />
				<Route path='/gallery/:id' component={Gallery} />
				<Route path='/' component={Welcome} />
			</Switch>
		</div>
	)
}
