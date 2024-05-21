const nodemailer = require("nodemailer");
const User = require("../app/model/user-model");

const sendEmail = async (userIds) => {
  try {
    const users = await User.find();
    const mail = userIds.map((id) => {
      const user = users.find((user) => user._id.equals(id));
      return user ? user.email : null;
    });
    console.log(mail);

    // Create transporter and mailOptions
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "saravanan5101998@gmail.com",
        pass: "xehz bhmk nwnq pjvc",
      },
    });
    const mailOptions = {
      from: "saravanan5101998@gmail.com",
      to: mail.join(","), // Convert the array of email addresses to a comma-separated string
      subject: "Test Email",
      text: "This is a test email from Nodemailer!",
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return mail;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
