const express = require("express"),
	bodyParser = require("body-parser"),
	massive = require("massive"),
	cors = require("cors"),
	app = express(),
	session = require("express-session"),
	helmet = require("helmet"),
	mailer = require("./mailer.js"),
	multer = require("multer"),
	path = require("path"),
	fs = require('fs')
require("dotenv").config()

app.use(cors(), bodyParser.json(), helmet(), express.static(`${__dirname}/../build`))

const upload = multer({ dest: "uploads/" })

const resetUploads = (req, res, next) => {
	try {
		fs.readdir(path.join(__dirname, '../uploads'), (err, files) => {
			if (err) throw err
			for (const file of files) {
				fs.unlink(path.join('uploads', file), err => {
					if (err) throw err;
				})
			}
		})
	}
	catch (err) {
		res.send({error: err})
	}
	next()
}

app.post("/api/submitImages", resetUploads, upload.any(), (req, res) => {
	res.send("ok")
})
app.post("/api/submitForm", express.static('uploads'), (req, res) => {
	console.log(req.body)
	mailer(req.body)
		.then(() => res.status(200).send(req.body))
		.catch(e => {
			console.log(e)
		})
		.finally(() => {
			resetUploads()
		})
})

app.use("/*", (req, res) => {
	res.sendFile("index.html", {
		root: `${__dirname}/..build`
	})
})
const port = process.env.PORT || 3001

app.listen(port, () => {
	console.log(`listening on ${port}`)
})
