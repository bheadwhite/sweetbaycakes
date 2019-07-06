const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const cors = require("cors");
require("dotenv").config();
const app = express();
const session = require("express-session");
const nodemailer = require('nodemailer')
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bheadwhite@gmail.com',
        pass: process.env.PASS
    }
})

app.post("/api/submitForm", (req, res) => {
  console.log(req.body);
  let {cstName,
  cstNumber,
  cstCakeSize,
  cstOrientation,
  cstStyle,
  cstFlavor,
  cstCream,
  cstFillings,
  cstMessage,
  cstInstructions,
  cstPic} = req.body;
  let mailOptions = {
    from: "bheadwhite@gmail.com",
    to: 'lfletcher29@gmail.com',
    subject: `Cake order for ${cstName}`,
    html: `<div><h2>Hello Laurel, ${cstName} submitted an order.</h2>
    <ul>
    <li>Cake Size: ${cstCakeSize}</li>
    <li>Cake Style: ${cstStyle}</li>
    <li>Cake Orientation: ${cstOrientation}</li>
    <li>Cake Flavor: ${cstFlavor}</li>
    <li>Cake Cream: ${cstCream}</li>
    <li>Cake Fillings: ${cstFillings}</li>
    <li>Cake Special Message: ${cstMessage}</li>
    <li>Customer Special Instructions for cake: ${cstInstructions}</li>
    </ul>
    
    </div>`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`email sent` + info.response);
    }
  });
  res.status(200).send(`noice`);
});

app.get('/api/get', (req, res) => {
    res.send(happyDay)
})
app.use('/*', (req,res) => {
  res.sendFile('index.html', {
    root:(`${__dirname}/..build`)
  })
})
port = 3001;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
