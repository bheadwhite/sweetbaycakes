const nodemailer = require("nodemailer"),
	{ google } = require("googleapis"),
	OAuth2 = google.auth.OAuth2
require("dotenv").config()

const oauth2Client = new OAuth2(process.env.clientId, process.env.clientSecret, process.env.redirect)

oauth2Client.setCredentials({
	refresh_token: process.env.refreshToken
})

const sendMail = async outgoing => {
	const tokens = await oauth2Client.refreshAccessToken()
	const accessToken = tokens.credentials.access_token

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: process.env.nodeEmail,
			clientId: process.env.clientId,
			clientSecret: process.env.refreshToken,
			accessToken: accessToken
		}
	})
	let makeMe = ""
	for (key in outgoing) {
		if (key.startsWith("make") && key !== "makeText") {
			makeMe = makeMe.concat(`<li>${key.slice(4)}</li>`)
		}
  }
  if (!outgoing.cakeFillings){
    outgoing.cakeFillings = 'none'
  }
	if (outgoing.makeText) {
		outgoing.makeText = "yes"
	} else {
		outgoing.makeText = "no"
	}
	// let attachments = outgoing.images.map(image => image)
	// if (outgoing.files) {
	// 	outgoing.files.forEach(file => {
	// 		attachments.push({ cid: file })
	// 	})
	// }
	let info = await transporter.sendMail({
		from: '"sweetbaycakes29@gmail.com" <sweetbaycakes29@gmail.com>', // sender address
		to: process.env.sendingTo, // list of receivers
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
	})

	console.log("message sent: %s", info.messageId)

	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}

module.exports = sendMail
