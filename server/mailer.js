const nodemailer = require("nodemailer"),
	fs = require("fs"),
	path = require("path")
require("dotenv").config()

const sendMail = async (outgoing, attachments) => {

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			type: "OAuth2",
			user: process.env.EMAIL,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
			accessToken: process.env.ACCESS_TOKEN
		}
	})
	let makeMe = ""
	for (key in outgoing) {
		if (key.startsWith("make") && key !== "makeText") {
			makeMe = makeMe.concat(`<li>${key.slice(4)}</li>`)
		}
	}
	if (!outgoing.cakeFillings) {
		outgoing.cakeFillings = "none"
	}
	if (outgoing.makeText) {
		outgoing.makeText = "yes"
	} else {
		outgoing.makeText = "no"
	}

	transporter.sendMail({
		from: '"sweetbaycakes29@gmail.com" <sweetbaycakes29@gmail.com>', // sender address
		to: process.env.SEND_TO, // list of receivers
		subject: `Cake Order for ${outgoing.name}`, // Subject line
		generateTextFromHTML: true, // plain text body
		attachments: attachments,
		html: `
      <h3><span style="color:green">Order for </span><span style="font-size:3rem">${outgoing.name}</span>
      <br/>
      <span style="color:blue">Contact:</span><span style="color:orange"> ${outgoing.phoneNumber}</span>
      </h3>
      <hr/>
      <p>Order:</p>
      <ul>
        ${makeMe}
      </ul>
      <p>size: ${outgoing.cakeSize} inches</p>
      <p>orientation: ${outgoing.cakeOrientation}</p>
      <p>flavor: ${outgoing.cakeFlavor}</p>
      <p>Icing/Cream: ${outgoing.cakeCream}</p>
      <p>Extra Cake Fillings: ${outgoing.cakeFillings}</p>
      <p>Additional Requests: ${outgoing.cakeRequest}</p>
      <hr/>

      <div>
      <h3>Contact Details:</h3>
      <p>text ok? ${outgoing.makeText}</p>
      <p>${outgoing.contactDetails}</p>
      </div>
      ` // html body
	}, ()=> {
		fs.readdirSync(path.join(__dirname, "uploads")).forEach(file => {
			fs.unlinkSync(path.join(__dirname, `uploads/${file}`))
		})
	})
	return
}

module.exports = sendMail
