import React from "react"
import { Switch, Route } from "react-router-dom"
import Order from "./views/Order/Order"
import Welcome from "./views/Welcome/Welcome"
import './App.css'

export default function App() {
	return (
		<div>
			<Switch>
				<Route path='/order' component={Order} />
				<Route path='/' component={Welcome} />
			</Switch>
		</div>
	)
}
