const nodemailer = require("nodemailer");

const sendEmail = (userIds) => {
  console.log(userIds);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "saravanan5101998@gmail.com",
      pass: "xehz bhmk nwnq pjvc",
    },
  });
  const mailOptions = {
    from: "saravanan5101998@gmail.com",
    to: "saravanan1998105@gmail.com",
    subject: "Test Email",
    text: "This is a test email from Nodemailer!",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendEmail;
