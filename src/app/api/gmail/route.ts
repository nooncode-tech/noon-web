import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Variables sensibles, usa env variables
const CLIENT_ID = process.env.GMAIL_CLIENT_ID!;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN!;
const SENDER_EMAIL = process.env.GMAIL_SENDER_EMAIL!;

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        // Configura OAuth2 para Gmail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: SENDER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
            },
        });

        // Email options
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: SENDER_EMAIL, // destino, puedes poner tu correo
            subject: "Nuevo mensaje de contacto",
            text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
            html: `<p><b>Nombre:</b> ${name}</p>
                    <p><b>Email:</b> ${email}</p>
                    <p><b>Mensaje:</b><br/>${message}</p>`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ ok: false, error: "Error enviando email" }, { status: 500 });
    }
}