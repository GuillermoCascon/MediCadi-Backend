import nodemailer from "nodemailer";

const forgotPasswordEmail = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //Enviar email
  const {email, nombre, token}=datos;
  const info = await transporter.sendMail({
    from: 'MediCadi',
    to: email,
    subject: 'Restablece tu password en MediCadi',
    body: 'Retablece tu password',
    html:`<p>Hola: ${nombre}, comprueba tu cuenta en MediCadi.<p/>
        <p>Sigue el siguiente enlace para cambiar la contraseña 
        <a href="${process.env.DEV_FRONTEND_URL_1}/forgot-password/${token}">Restablecer cuetna</a></p>

        <p>Si tu no solicitaste un cambio de contraseña, puedes ignorar este mensaje</p>
    `
  });
  console.log("Mensaje enviado: %s", info.messageId)
};

export default forgotPasswordEmail;