import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, from, name, subject, message, phone } = body;

    // Configuration de Nodemailer
    // Pour la production, utilisez vos propres identifiants SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // ou autre service comme 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER || to, // Utilisez des variables d'environnement
        pass: process.env.EMAIL_PASSWORD || 'votre-mot-de-passe-app', // Utilisez des variables d'environnement
      },
    });

    // Contenu du courriel
    const mailOptions = {
      from: process.env.EMAIL_USER || to,
      to,
      subject: `Nouveau message: ${subject}`,
      html: `
        <h1>Nouveau message du formulaire de contact</h1>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${from}</p>
        ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Envoi du courriel
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email envoyé avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur d\'envoi d\'email:', error);
    return NextResponse.json(
      { message: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}
