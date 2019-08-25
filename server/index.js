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
	fs = require("fs")
require("dotenv").config()

app.use(cors(), bodyParser.json(), helmet(), express.static(`${__dirname}/../build`), express.static(`${__dirname}/uploads`))
//image upload
const uploads = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "server/uploads/")
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname)
	}
})
const imageUpload = multer({ storage: uploads })

app.post("/api/submitForm", (req, res) => {
	let attachments = fs.readdirSync(path.join(__dirname, "uploads")).map(file => {
		return {
			filename: file,
			path: path.join(__dirname, `uploads/${file}`)
		}
	})
	mailer(req.body, attachments)
		.then(() => {
			res.status(200).send(req.body)
		})
		.catch(e => {
			console.log(e)
		})
})
app.post("/api/uploadImages", imageUpload.any(), (req, res) => {
	res.send("ok")
})
app.post("/api/removeImage", ({ body: { key } }, res) => {
	const regex = new RegExp(`${key}`, "g")
	fs.readdir(path.join(__dirname, "uploads/"), (err, files) => {
		files.forEach(file => {
			if (file.match(regex)) {
				fs.unlinkSync(path.join(__dirname, `uploads/${file}`))
			}
		})
	})
	res.send("ok")
})

app.use("/*", (req, res) => {
	res.sendFile("index.html", {
		root: `${__dirname}/../build`
	})
})
const port = process.env.PORT || 3001

app.listen(port, () => {
	console.log(`listening on ${port}`)
})
