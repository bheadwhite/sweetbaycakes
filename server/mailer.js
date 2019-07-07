const nodemailer = require("nodemailer"),
	{ google } = require("googleapis"),
  OAuth2 = google.auth.OAuth2
  require('dotenv').config()
  
const oauth2Client = new OAuth2(
  process.env.clientId,
  process.env.clientSecret,
  process.env.redirect
)

oauth2Client.setCredentials({
  refresh_token: process.env.refreshToken
})
const sendMail = async (outgoing) => {
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
  });
  let makeMe = ''
  for(key in outgoing){
    if(key.startsWith('make') && key !== "makeText"){
      makeMe.push(`<li>${key.slice(4)}</li>`)
    }
  }

  let info = await transporter.sendMail({
      from: '"bwhitehe@gmail.com" <bwhitehe@gmail.com>', // sender address
      to: "bheadwhite@gmail.com", // list of receivers
      subject: `contact submission from ${outgoing.name}`, // Subject line
      generateTextFromHTML: true, // plain text body
      html: `
      <h3>Order for ${outgoing.name}</h3>
      <h5>phone number: ${outgoing.phoneNumber}</h5>
      <hr/>
      <p>Order:</p>
      <ul>
        ${makeMe}
      </ul>
      <p>size: ${outgoing.cakeSize}</p>
      <p>orientation: ${outgoing.cakeOrientation}</p>
      <p>flavor: ${outgoing.cakeFlavor}</p>
      <p>Icing/Cream: ${outgoing.cakeCream}</p>
      <p>Additional Requests: ${outgoing.cakeRequest}</p>
      <hr/>

      <div>
      <h3>Contact Details:</h3>
      <p>text ok? ${outgoing.makeText}</p>
      <p>${outgoing.contactDetails}</p>
      </div>
      ` // html body
    });

  console.log("message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

}

module.exports = sendMail