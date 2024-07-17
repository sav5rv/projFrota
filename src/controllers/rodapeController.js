const nodemailer = require('nodemailer');

exports.faleConosco = (req, res) => {
    res.render('rodape_faleConosco');
  };

exports.enviarEmail = async function enviarEmailNodejs(nome, emailDestinatario, assunto, mensagem) {
    // Configure o servidor de email que irá enviar a msg
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email', // Substitua por seu servidor de email
      port: 587, // Porta do servidor de email
      secure: false,
      auth: {
        user: account.user, // Substitua por seu email
        pass: account.pass // Substitua por sua senha
      }
    });
  
    // Crie o email
    const email = {
      from: '"Seu Nome" <seuemail@seudominio.com>', // Substitua por seu email
      to: emailDestinatario,
      subject: assunto,
      text: `Olá ${nome},\n\n${mensagem}`,
      html: `<!DOCTYPE html>
              <html lang="pt-BR">
              <head>
                  <meta charset="UTF-8">
                  <title>Email de Contato</title>
              </head>
              <body>
                  <h1>Olá ${nome},</h1>
                  <p>${mensagem}</p>
                  <br>
                  Atenciosamente,<br>
                  Equipe do Site
              </body>
              </html>`
    };
  
    // Envie o email
    await transporter.sendMail(email);
  
    console.log('Email enviado com sucesso!');
};


  exports.credito = (req, res) => {
    res.render('rodape_credito');
  };  


  exports.mapaSite = (req, res) => {
    res.render('rodape_mapaSite');
  };
  
  
  exports.sobre = (req, res) => {
    res.render('rodape_sobre');
  };  