const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const {google} = require('googleapis');
//const { content } = require('googleapis/build/src/apis/content');
//const { auth } = require('google-auth-library');
//const { oauth2 } = require('googleapis/build/src/apis/oauth2');
//const { content } = require('googleapis/build/src/apis/content');

router.post('/send-email', (req, res) => {
    const {name, email, telefono, numeroPersonas, servicio, fecha, hora, indicionesEspeciales} = req.body;    
    const contentHtml = `
    <h1>Formulario de nodemailer</h1>
    <ul>
        <li>name: ${name}</li>
        <li>email: ${email}</li>
        <li>celular: ${telefono}</li>        
        <li>numerp personas: ${numeroPersonas}</li>
        <li>servicio: ${servicio}</li>
        <li>fecha: ${fecha}</li>
        <li>hora: ${hora}</li>
        <p>indicaciones especiales: ${indicionesEspeciales}</p>
    </ul>    
    `;

    

    const clientId = '345289126458-hij3a0duvc4ndgpp4soa0uj9mdnpvu8h.apps.googleusercontent.com';
    const clientSecret = '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';    
    const redirectURI = 'https://developers.google.com/oauthplayground';
    const refreshToken = '1//042WyB49HWzomCgYIARAAGAQSNwF-L9Ir6dUUj0D2gB8nDxtHm_miSQmzQvcs3seS_6T4TQi0i_rFajfQTKeokdddDmTqnDq_baU';

    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectURI);
    oAuth2Client.setCredentials({refresh_token: refreshToken});

    async function sendMail() {
        try {
            const accessToken = await oAuth2Client.getAccessToken();
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth : {
                    type: "OAuth2",
                    user : 'dilanespindola32@gmail.com',
                    clientId : clientId,
                    clientSecret : clientSecret,
                    refreshToken : refreshToken,
                    accessToken : accessToken
                }
            });

            let destinatarios = [email, 'dilanespindola32@gmail.com'];

            const mailOptions = {
                    from: "Informacion de la reserva <dilanespindola32@gmail.com",
                    to: destinatarios,
                    subject : "nodemailer prueba",
                    html : contentHtml  
                };          

            const result = await transporter.sendMail(mailOptions);
            return result;
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    sendMail()
        .then(result => res.status(200).send('Enviado'))
        .catch(error => console.log(error.message));
});

module.exports = router;