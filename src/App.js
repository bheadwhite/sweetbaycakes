import React, { Component } from "react"
import "./App.css"
import axios from "axios"
// COMPONENTS
import CakeBackground from "./components/CakeBackground/CakeBackground"
import Sidebar from "./components/SideBar/SideBar"
import Form from "./components/OrderForm/CakeOrderForm"
import Header from "./components/Header/Header"
import CustomerDetails from "./components/CustomerDetails/CustomerDetails"
import CakeChart from "./components/CakeChart/CakeChart"

class App extends Component {
	state = {
		cake: {
			servingSize: 0,
			size: "",
			orientation: "",
			style: "",
			flavor: "",
			fillings: "",
			comments: "",
			cstPic: ""
		},
		customer: {
			name: "",
			phoneNumber: ""
		},
		bigImage: false
	}
	getHappy() {
		axios.get("/api/get").then(res => {
			console.log(res)
		})
	}
	sendEmail() {
		axios.post("/api/submitForm", this.state)
	}
	toggleChart = () => {
		this.setState({
			bigImage: !this.state.bigImage
		})
	}
	render() {
		return (
			<div className='SweetBay'>
				<Header />
				<Form />
				<CustomerDetails />
				<Sidebar />
				<CakeBackground />
				<CakeChart bigImage={this.state.bigImage ? "bigImage" : "hidden"} toggleChart={this.toggleChart} />
			</div>
		)
	}
}

export default App
