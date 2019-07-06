import { createStore, compose } from "redux"



const initialState = {
	cake: {},
	customer: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers())
export default store
