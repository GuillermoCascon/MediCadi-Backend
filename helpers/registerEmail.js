import nodemailer from 'nodemailer';

const registerEmail = async (datos) => {
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
      subject: 'Comprueba tu cuenta en MediCadi',
      body: 'Eh tú, que te has creado una pedazo cuenta',
      html:`<p>Hola: ${nombre}, comprueba tu cuenta en MediCadi.<p/>
          <p>Tu cuenta 
          <a href="${process.env.DEV_FRONTEND_URL_1}/confirm/${token}">Comprobar Cuenta</a></p>
  
          <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
      `
    });
    console.log("Mensaje enviado: %s", info.messageId)
  };
  
  export default registerEmail;