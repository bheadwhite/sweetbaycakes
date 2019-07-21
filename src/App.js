import React, { Component } from "react"
import "./App.css"
import axios from "axios"
// COMPONENTS
import CakeOrderForm from "./components/OrderForm/CakeOrderForm"
import Header from "./components/Header/Header"
import CustomerDetails from "./components/CustomerDetails/CustomerDetails"
import CakeChart from "./components/CakeChart/CakeChart"

class App extends Component {
	state = {
		order: {},
		viewModel: false
	}
	getHappy() {
		axios.get("/api/get").then(res => {
			console.log(res)
		})
	}
	sendEmail = () => {
		const { files } = this.state
		axios({
			method: "post",
			url: "/api/submitImages",
			data: files,
			config: { headers: { "Content-Type": "multipart/form-data" } }
		}).then(res => {
			alert("thank you for your order!")
			this.setState({
				order: {}
			})
		})
		// axios.post("/api/submitForm", this.state.order).then(res => {
		// 	alert("Thank you for your order!")
		// 	this.setState({
		// 		order: {}
		// 	})
		// })
	}
	toggleChart = () => {
		this.setState({
			bigImage: !this.state.bigImage
		})
	}
	handleFiles = e => {
		if (!e.target.files[0]) {
			return
		}
		const { order } = this.state
	
		let imageURLs = order.imageURLs || []
		let imagePostData = new FormData()
		if (e.target.files.length > 1) {
			let images = [...e.target.files]
			images.forEach((file,i) => {
				imageURLs.push(URL.createObjectURL(file))
				imagePostData.append(`image-${i}`, file)
			})
		} else {
			imageURLs.push(URL.createObjectURL(e.target.files[0]))
			imagePostData.append("image-1", e.target.files[0])
		}
		e.target.value = null
		
	
		axios({
			method: "post",
			url: "/api/submitImages",
			data: imagePostData,
			config: { headers: { "Content-Type": "multipart/form-data" } }
		}).then(res => {
			if (imageURLs)
				this.setState({
					order: {
						...this.state.order,
						imageURLs
					},
					files: imagePostData
				})
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
	toggleModel = () => {
		this.setState({
			viewModel: !this.state.viewModel
		})
	}
	removeThumb = key => {
		let imageURLs = this.state.order.imageURLs.slice()
		imageURLs.splice(key, 1)
		this.state.files.delete(`image-${key}`)
		this.setState({
			order: {
				...this.state.order,
				imageURLs
			}
			// files: images
		})
	}
	render() {
		console.log(this.state)
		let viewModel = this.state.viewModel ? "model" : "model hidden"
		return (
			<div className='SweetBay'>
				<Header />
				<CakeOrderForm
					handleFile={this.handleFiles}
					handleChange={this.handleChange}
					pics={this.state.order.imageURLs}
					removeThumb={this.removeThumb}
					toggleModel={this.toggleModel}
				/>
				<CustomerDetails handleChange={this.handleChange} sendEmail={this.sendEmail} />
				{this.state.file && <img src={this.state.file} alt='pic' onError={this.handleError} />}
				<CakeChart viewModel={viewModel} toggleModel={this.toggleModel} />
			</div>
		)
	}
}

export default App
