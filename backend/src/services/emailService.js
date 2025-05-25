const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,     // Setează în .env
    pass: process.env.EMAIL_PASS
  }
});

const sendReservationEmail = async (to, reservationDetails) => {
  const { courtName, date, time, pin } = reservationDetails;

  const mailOptions = {
    from: `"Tennis Time" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Confirmare rezervare teren - Tennis Time",
    html: `
      <h2>Rezervarea ta a fost înregistrată!</h2>
      <p><strong>Teren:</strong> ${courtName}</p>
      <p><strong>Data:</strong> ${date}</p>
      <p><strong>Ora:</strong> ${time}</p>
      <p><strong>Cod PIN:</strong> <b>${pin}</b></p>
      <br/>
      <p>Dacă vrei să anulezi rezervarea, răspunde acestui email sau accesează linkul de mai jos:</p>
      <a href="${process.env.BASE_URL}/cancel?pin=${pin}">Anulează rezervarea</a>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendReservationEmail };
