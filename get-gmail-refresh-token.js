const { google } = require("googleapis");
const readline = require("readline");

// Rellena con tus datos
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; // o el que pusiste en Google Console

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

// Solicita permisos para Gmail
const SCOPES = ["https://mail.google.com/"];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

console.log("Autoriza esta app visitando esta URL:");
console.log(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Pega aquí el código que recibiste de Google: ", async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log("Refresh token:", tokens.refresh_token);
    rl.close();
  } catch (err) {
    console.error("Error obteniendo el token", err);
    rl.close();
  }
});

