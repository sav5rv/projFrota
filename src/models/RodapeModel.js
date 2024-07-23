const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

  
exports.enviarEmail = (nome, emailDestinatario, assunto, mensagem, callback) =>  {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_MAIL_USER,
                pass: process.env.SMTP.MAIL_PASS
            }
        });
    
        let mailOptions = {
            from: process.env.SMTP_MAIL_USER,
            to: process.env.SMTP_MAIL_USER,
            subject: `Mensagem de ${nome}`,
            text: mensagem
        };
    
        transporter.sendMail(mailOptions, callback);

};


exports.saveData = (nome, emailDestinatario, assunto, mensagem, callback) => {
    const filePath = path.join(__dirname, '..', 'data', 'messages.txt');
    const data = `Nome: ${nome}\nMensagem: ${mensagem}\n\n`;

    fs.appendFile(filePath, data, (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};



// const x = res.status(200).send('Fetch recebido no servidor');

    // // Configure o servidor de email que irá enviar a msg
    // const transporter = nodemailer.createTransport({
    //   // host: 'smtp.ethereal.email', // Substitua por seu servidor de email
    //   // port: 587, // Porta do servidor de email
    //   // secure: false,
    //   // auth: {
    //   //   user: account.user, // Substitua por seu email
    //   //   pass: account.pass // Substitua por sua senha
    //   // }
    //   host: SMTP_MAIL,
    //   port: SMTP_MAIL_PORT,
    //   auth: {
    //     user: SMTP_MAIL_USER,
    //     pass: SMTP_MAIL_PASS,
    //   }
    // });
  
    // // Crie o email
    // const x = req.body;
    // console.log(x);
    // const email = {
    //   from: '"Seu Nome" <seuemail@seudominio.com>', // Substitua por seu email
    //   to: emailDestinatario,
    //   subject: assunto,
    //   text: `Olá ${nome},\n\n${mensagem}`,
    //   html: `<!DOCTYPE html>
    //           <html lang="pt-BR">
    //           <head>
    //               <meta charset="UTF-8">
    //               <title>Email de Contato</title>
    //           </head>
    //           <body>
    //               <h1>Olá ${nome},</h1>
    //               <p>${mensagem}</p>
    //               <br>
    //               Atenciosamente,<br>
    //               Equipe do Site
    //           </body>
    //           </html>`
              
    //};
  
    // Envie o email
    //const respConfirmaEnvio = await transporter.sendMail(email);
  
    //console.log('rodapeController - Email enviado com sucesso!');
    //console.log(email);
    //console.log(transporter);