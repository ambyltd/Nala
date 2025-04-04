import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subscriberEmail } = body;

    // Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // ou autre service comme 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER || "amanjpaul@gmail.com",
        pass: process.env.EMAIL_PASSWORD ||"Admin#1985"
      },
    });

    // Contenu du courriel
    const mailOptions = {
      from: process.env.EMAIL_USER || to,
      to,
      subject: 'Nouvelle inscription à la newsletter',
      html: `
        <h1>Nouvelle inscription à la newsletter</h1>
        <p>Un nouvel utilisateur s'est inscrit à la newsletter avec l'adresse email: <strong>${subscriberEmail}</strong></p>
      `,
    };

    // Envoi du courriel
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Inscription enregistrée avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur d\'envoi d\'email:', error);
    return NextResponse.json(
      { message: 'Erreur lors de l\'enregistrement de l\'inscription' },
      { status: 500 }
    );
  }
}
