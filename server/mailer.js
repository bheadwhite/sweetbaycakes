const nodemailer = require("nodemailer"),
	fs = require("fs"),
	path = require("path")
require("dotenv").config()

const sendMail = async ({order, sessionID, user}, attachments) => {
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
	if(order){
		for (key in order) {
			if (key.startsWith("make") && key !== "makeText") {
				makeMe = makeMe.concat(`<li>${key.slice(4)}</li>`)
			}
		}
		if (!order.cakeFillings) {
			order.cakeFillings = "none"
		}
		if (order.makeText) {
			order.makeText = "yes"
		} else {
			order.makeText = "no"
		}		
	}

	transporter.sendMail(
		{
			from: '"sweetbaycakes29@gmail.com" <sweetbaycakes29@gmail.com>', // sender address
			to: process.env.SEND_TO, // list of receivers
			subject: `Cake Order for ${user.name}`, // Subject line
			generateTextFromHTML: true, // plain text body
			attachments: attachments,
			encoding: 'utf-8',
			html: `
				<h3><span style="color:green">Order for </span><span style="font-size:3rem">${user.name}</span>
				<br/>
				<span style="color:blue">Contact:</span><span style="color:orange"> ${user.phoneNumber}</span>
				</h3>
				<hr/>
				<p>Order:</p>
				<ul>
					${makeMe}
				</ul>
				<p>size: ${order.cakeSize} inches</p>
				<p>orientation: ${order.cakeOrientation}</p>
				<p>flavor: ${order.cakeFlavor}</p>
				<p>Icing/Cream: ${order.cakeCream}</p>
				<p>Extra Cake Fillings: ${order.cakeFillings}</p>
				<p>Additional Requests: ${order.cakeRequest}</p>
				<hr/>

				<div>
				<h3>Contact Details:</h3>
				<p>text ok? ${user.makeText}</p>
				<p>${user.contactDetails}</p>
				</div>
      ` // html body
		},
		() => {
			const regex = new RegExp(`${sessionID}`, "g")
			fs.readdirSync(path.join(__dirname, "./images")).forEach(file => {
				if (file.match(regex)) {
					fs.unlinkSync(path.join(__dirname, `./images/${file}`))
				}
			})
		}
	)
	return
}

module.exports = sendMail
