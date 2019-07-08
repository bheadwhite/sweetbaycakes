const express = require("express"),
	bodyParser = require("body-parser"),
	massive = require("massive"),
	cors = require("cors"),
	app = express(),
	session = require("express-session"),
	helmet = require("helmet"),
	mailer= require("./mailer.js")
require("dotenv").config()

app.use(cors(), bodyParser.json(), helmet(), express.static(`${__dirname}/../build`))

app.post("/api/submitForm", (req, res) => {
	console.log(req.body)
	mailer(req.body)
	.then(() => res.status(200).send(req.body))
	.catch(e => {
		console.log(e)
	})
})
app.use("/*", (req, res) => {
	res.sendFile("index.html", {
		root: `${__dirname}/..build`
	})
})

const port = process.env.port || 3001
app.listen(port, ()=>{
	console.log(`listening on ${port}`)
})