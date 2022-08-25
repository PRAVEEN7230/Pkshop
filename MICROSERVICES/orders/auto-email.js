const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});


const emailAlert = (lessStockProducts)=>{

  let html = `<html>
  <table align="center" cellpadding="10%" width="80%" style="border:1px solid #333">
      <thead>
          <th align="center">STOCK INFORMATION</th>
      </thead>
      <tbody>

      </tbody>
      <tr>
          <td align="center">
          <table align="center" id="main-table" width="80%" border="1" cellspacing="3%" cellpadding="5%" style="border:1px solid #ccc;">
              <thead>
                  <th width="80%">Product Name</th><th>Stock </th>
              </thead>
              <tbody>
`
                  
lessStockProducts.forEach(r => {
  html += `                      <tr><td>${r[0]}</td><td>${r[1]}</td></tr>\n`
})
html += `                      
              </tbody>
          </table>
          </td>
      </tr>
  </table>
</html>`

  transporter.sendMail({
    from: process.env.EMAIL,
    to: "praveensuthar7230@gmail.com, harshchoudhary437@gmail.com, navedshamsi.calories@gmail.com, chandrakiranb27@gmail.com, om29287@gmail.com",
    subject: "Stock Alert",
    html: html,
  }, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
    
}

const emailOtp = (userDetails)=>{
  let html = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Pkshop</a>
    </div>
    <p style="font-size:1.1em">Hi, ${userDetails.name}</p>
    <p>Thank you for choosing Pkshop. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${userDetails.otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Pkshop</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Pkshop</p>
      <p>Rajasthan India</p>
    </div>
  </div>
</div>`

  transporter.sendMail({
    from: process.env.EMAIL,
    to: userDetails.email,
    subject: "OTP verification",
    html: html,
  }, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
    
}
module.exports = { emailAlert, emailOtp }