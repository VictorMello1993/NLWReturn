import { IMailAdapter, SendMailData } from "../IMailAdapter";
import nodemailer from 'nodemailer'

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({subject, body}: SendMailData) {

    //Configuração de envio de e-mail para Nodemailer utilizando Mailtrap.io (Ambiente de desenvolvimento)
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "29ae1e84997e2d",
        pass: "91dc4a27ecc604"
      }
    });

    await transport.sendMail({
      from: 'Equipe Feedget <user@feedget.com>',
      to: 'Victor Mello <teste@gmail.com>',
      subject,
      html: body
    })
  }
}