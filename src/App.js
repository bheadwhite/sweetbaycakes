import React, { Component } from "react"
import "./App.css"
import axios from "axios"
// COMPONENTS
import CakeBackground from "./components/CakeBackground/CakeBackground"
// import Sidebar from "./components/SideBar/SideBar"
import CakeOrderForm from "./components/OrderForm/CakeOrderForm"
import Header from "./components/Header/Header"
import CustomerDetails from "./components/CustomerDetails/CustomerDetails"
// import CakeChart from "./components/CakeChart/CakeChart"

class App extends Component {
	state = {
		order: {},
		bigImage: false
	}
	getHappy() {
		axios.get("/api/get").then(res => {
			console.log(res)
		})
	}
	sendEmail = () => {
		console.log("sending the order:", this.state.order)
		// axios.post("/api/submitForm", this.state.order)
	}
	toggleChart = () => {
		this.setState({
			bigImage: !this.state.bigImage
		})
	}
	handleFile = e => {
		if (!e.target.files[0]) {
			return
		}
		const { order } = this.state
		let files = order.files || []
		if (e.target.files.length > 1) {
			let fileSet = [...e.target.files]
			fileSet.forEach(file => files.push(URL.createObjectURL(file)))
		} else {
			files.push(URL.createObjectURL(e.target.files[0]))
		}
		e.target.value = null
		if (files)
			this.setState({
				order: {
					...this.state.order,
					files: files
				}
			})
	}
	handleChange = e => {
		//handle checkboxes
		if (e.target.name.startsWith("make") || e.target.value.startsWith("Choose")) {
			if (!this.state.order[e.target.name]) {
				this.setState({
					order: {
						...this.state.order,
						[e.target.name]: true
					}
				})
			} else {
				delete this.state.order[e.target.name]
			}
		} else {
			this.setState({
				order: {
					...this.state.order,
					[e.target.name]: e.target.value
				}
			})
		}
	}
	handleError = e => {
		e.target.src = "https://png.pngtree.com/svg/20170514/4a5e89db9c.png"
	}
	removeThumb = key => {
		let files = this.state.order.files.slice()
		files.splice(key, 1)
		this.setState({
			order: {
				...this.state.order,
				files: files
			}
		})
	}
	render() {
		console.log(this.state.order)
		return (
			<div className='SweetBay'>
				<Header />
				<CakeOrderForm
					handleFile={this.handleFile}
					handleChange={this.handleChange}
					pics={this.state.order.files}
					removeThumb={this.removeThumb}
				/>
				<CustomerDetails handleChange={this.handleChange} sendEmail={this.sendEmail} />
				{this.state.file && <img src={this.state.file} alt='pic' onError={this.handleError} />}
				{/* <Sidebar /> */}
				<CakeBackground />
				{/* <CakeChart bigImage={this.state.bigImage ? "bigImage" : "hidden"} toggleChart={this.toggleChart} /> */}
			</div>
		)
	}
}

export default App
