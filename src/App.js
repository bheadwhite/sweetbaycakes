import React, { useState, useReducer } from "react"
import "./App.css"
import axios from "axios"
// COMPONENTS
import CakeOrderForm from "./components/OrderForm/CakeOrderForm"
import Header from "./components/Header/Header"
import CustomerDetails from "./components/CustomerDetails/CustomerDetails"
import CakeChart from "./components/CakeChart/CakeChart"

export default function App() {
	const [modal, setModal] = useState(false)
	const [user, setUser] = useReducer(userReducer, {})
	const [order, setOrder] = useReducer(orderReducer, {})
	const [sessionID] = useState(
		Math.random()
			.toString(36)
			.substr(2, 3)
	)
	const handleOrder = ({ target }) => {
		if ((target.name.match(/make/g) && order[target.name]) || target.value.match(/choose/gi) || target.value === "None") {
			setOrder({
				type: REMOVE_ITEM,
				payload: target.name
			})
			return
		}
		setOrder({
			type: ADD_ITEM,
			payload: { [target.name]: target.value }
		})
	}
	const handleUser = ({ target }) => {
		setUser({
			type: UPDATE_USER,
			payload: { [target.name]: target.value }
		})
	}

	const addFiles = ({ target: { files } }) => {
		if (!files[0]) {
			return
		}
		const formData_Images = new FormData()
		const fileList = [...files]
		let totalImages = order.totalImages || 0
		let URLimages = order.URLimages || []
		fileList.forEach((file, i) => {
			//front end images
			let blob = URL.createObjectURL(file)
			URLimages.push({ name: `${totalImages}_${sessionID}_${file.name}`, blob })
			//actual files to be sent to backend
			formData_Images.append(`${totalImages}_${sessionID}_${file.name}`, file)
			totalImages++
		})
		axios({
			method: "post",
			url: "/api/uploadImages",
			data: formData_Images,
			config: { headers: { "Content-Type": "multipart/form-data" } }
		})
			.then(res => {
				setOrder({
					type: ADD_ITEM,
					payload: { URLimages, totalImages }
				})
			})
			.catch(e => console.log(e))
	}
	const removeFiles = filename => {
		let URLimages = order.URLimages.slice()
		let index = URLimages.findIndex(x => x.name === filename)
		URLimages.splice(index, 1)
		axios({
			method: "post",
			url: "/api/removeImage",
			data: { key: filename }
		}).then(res => {
			setOrder({
				type: ADD_ITEM,
				payload: { URLimages }
			})
		}).catch(e => console.log(e))
	}
	const sendEmail = () => {
		axios.post("/api/submitForm", { order, user, sessionID }).then(res => {
			alert('Thank you for your order. We\'ll be in contact with you soon!')
			setOrder({
				type: RESET_ORDER
			})
			setUser({
				type: RESET_USER
			})
		}).catch(e => {
			console.log(e)
		})
	}

	return (
		<div className='SweetBay'>
			<Header />
			<CakeOrderForm
				URLimages={order.URLimages}
				removeFiles={removeFiles}
				addFiles={addFiles}
				handleOrder={handleOrder}
				toggleModal={() => setModal(m => !m)}
			/>
			<CustomerDetails handleUser={handleUser} />
			<button onClick={sendEmail}>Submit Order</button>
			<CakeChart viewModal={modal ? "model" : "model hidden"} toggleModal={() => setModal(m => !m)} />
		</div>
	)
}

const userReducer = (state, action) => {
	switch (action.type) {
		case UPDATE_USER:
			return { ...state, ...action.payload }
		case RESET_USER:
			return {}
		default:
			return state
	}
}
const orderReducer = (state, action) => {
	switch (action.type) {
		case ADD_ITEM:
			return { ...state, ...action.payload }
		case REMOVE_ITEM:
			delete state[action.payload]
			return { ...state }
		case RESET_ORDER:
			return {}
		default:
			return state
	}
}
const ADD_ITEM = "ADD_ITEM"
const REMOVE_ITEM = "REMOVE_ITEM"
const UPDATE_USER = "UPDATE_USER"
const RESET_USER = "RESET_USER"
const RESET_ORDER = "RESET_ORDER"
