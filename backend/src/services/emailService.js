const nodemailer = require("nodemailer");
// Looking to send emails in production? Check out our Email API/SMTP product!

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,     // Setează în .env
//     pass: process.env.EMAIL_PASS
//   }
// });

// Folosesc mailtrap pt a trimite email, comenteaza asta si decomenteaza cealalta
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const sendReservationEmail = async (to, reservationDetails) => {
  const { sportsComplex, courtName, date, time, pin, confirmation_token} = reservationDetails;

  const mailOptions = {
    from: `"Tennis Time" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Confirmare rezervare teren - Tennis Time",
    html: `
      <h2>Rezervarea ta a fost înregistrată!</h2>
      <p><strong>Baza sportiva:</strong> ${sportsComplex}</p>
      <p><strong>Teren:</strong> ${courtName}</p>
      <p><strong>Data:</strong> ${date}</p>
      <p><strong>Ora:</strong> ${time}</p>
      <p><strong>Cod PIN:</strong> <b>${pin}</b></p>
      <br/>
      <p>Dacă vrei să anulezi rezervarea, accesează linkul de mai jos:</p>
      <a href="${process.env.BASE_URL}/cancel?token=${confirmation_token}">Anulează rezervarea</a>
    `
  };

  await transporter.sendMail(mailOptions);
};

const sendConfirmationEmail = async (to, { user_name, start_time, end_time, confirmation_token}) => {
  const formattedStart = new Date(start_time).toLocaleString();
  const formattedEnd = new Date(end_time).toLocaleString();

  // const confirmationLink = `${process.env.BASE_URL}/api/reservations/confirm/${confirmation_token}`;
  const confirmationLink = `${process.env.BACKEND_URL}/api/reservations/confirm?token=${confirmation_token}`;

  const mailOptions = {
    from: `"Tennis Time" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Confirmă rezervarea ta - Tennis Time",
    html: `
      <h2>Salut, ${user_name}!</h2>
      <p>Ai solicitat o rezervare:</p>
      <ul>
        <li><strong>De la:</strong> ${formattedStart}</li>
        <li><strong>Până la:</strong> ${formattedEnd}</li>
      </ul>
      <p>Te rugăm să confirmi rezervarea apăsând pe linkul de mai jos:</p>
      <a href="${confirmationLink}">Confirmă rezervarea</a>
      <br/><br/>
      <p>Dacă nu ai solicitat această rezervare, poți ignora acest mesaj.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendReservationEmail,
  sendConfirmationEmail
};
