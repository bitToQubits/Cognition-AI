import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import { windowManager } from 'node-window-manager';

const isProd = process.env.NODE_ENV === 'production'

require('dotenv').config();

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

var mainWindow = null;

;(async () => {
  await app.whenReady()

  mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jlbciriaco@gmail.com',
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

ipcMain.on('enviar-mensaje', async (event, cuerpo_data) => {

  let msg = `
  <body style='background-color: #e9eaec; '>
<center style="font-size: 1.5em; padding-bottom: 1rem; padding-top: 1rem;">COGN\\TION</center>

<table width='100%' border='0' cellspacing='0' cellpadding='0'>
<tr>
  <td align='center'>
  <div style='
  background-color: #ffffff;
  padding: 40px 55px 25px 55px;
  border-top: 3px solid #228be6;
  border-right: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  border-left: 1px solid #dddddd; width:350px;'>

  <table style='width: 100%;'>
      <tr>
          <td><h1 style='font-size: 1.7em; text-align:left; border-left: 5px solid #228be6; padding-left: 5px;'>${cuerpo_data.tema}</h1></td>
      </tr>
  </table>

  <table>
      <tr>
          <td><p style='text-align: justify;'>
          ${cuerpo_data.contenido}
      </p></td>
      </tr>
  </table>

      <h2 style='text-align:left;'>Detalles de contacto</h2>

      <table style='width:100%;'>
          <tr>
          <td><span style='border-left: 2px solid #228be6; padding-left: 5px;'><b>Nombre contacto:</b> ${cuerpo_data.nombre}</span></td>
          </tr>
          <tr>
          <td><span style='border-left: 2px solid #228be6; padding-left: 5px;'><b>Email:</b> ${cuerpo_data.email}</span></td>
          </tr>
          <tr>
          <td><span style='border-left: 2px solid #228be6; padding-left: 5px;'><b>Tema:</b> ${cuerpo_data.tema}</span></td>
          </tr>
      </table>

      `;

msg += `
  </div>
  </td>
</tr>
</table>
  <div style='padding:20px;'>
      <p style='text-align:center;'>Esto es un correo electrónico automático de Cognition AI</p>
  </div>
  </body>
`;

  var mailOptions = {
    from: 'cognition-ai@gmail.com',
    to: 'jlbciriaco@gmail.com',
    subject: 'Solicitud de contacto ('+cuerpo_data.email+')',
    html: msg
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      let respuesta = {
        "status": false,
        "content": "Error al enviar el mensaje"
      }
      event.reply('enviar-mensaje', respuesta);
    } else {
      let respuesta = {
        "status": true,
        "content": "Mensaje enviado con éxito"
      }
      event.reply('enviar-mensaje', respuesta);
    }
  });
})

const dgram = require('dgram');
const WebSocket = require('ws');
const { networkInterfaces } = require('os');
console.log(getIpAddress())
const serverInfo = {
  name: "Cognition",
  ip: getIpAddress(), // Replace with actual server IP
  port: 3222
};
 
const socket = dgram.createSocket('udp4');
socket.bind(12345);
 
socket.on('message', (msg, rinfo) => {
  if (rinfo.address !== getIpAddress()) {
    console.log(`Solicitud de descubrimiento recibida de ${rinfo.address}:${rinfo.port}`);
    const message = Buffer.from(JSON.stringify(serverInfo));
    socket.send(message,0, message.length, rinfo.port, rinfo.address);
  }
});
  
socket.on('listening', () => {
  socket.setBroadcast(true);
}); 

setInterval(() => { 
  const message = Buffer.from(JSON.stringify(serverInfo));
  socket.send(message, 0, message.length, 12345, '10.0.0.24', (err) => {
    if (err) console.error('Failed to send broadcast:', err);
  });
}, 5000); // Broadcast every 5 seconds

const server = new WebSocket.Server({
  port: 3222
});

server.on('connection', function(socket) {
  // When you receive a message, send that message to every socket.
  socket.on('message', function(msg) {
    var msg_ = msg.toString("utf-8");
    console.log(msg_);
    mainWindow.webContents.send('control-app-mobile', msg_)
    if(msg_ === "10"){
      // Listar ventanas abiertas
      const windows = windowManager.getWindows();

      // Encuentra la ventana que quieres (p.ej., una app con un título específico)
      const targetWindow = windows.find(w => w.getTitle().toLowerCase().includes('edge'));

      console.log(targetWindow);

      if (targetWindow) {
        // Activa la ventana
        targetWindow.bringToTop();
      }
    }
  });

  // When a socket closes, or disconnects, remove it from the array.
  socket.on('close', function() {
    console.log('disconnected');
  });
});
 
function getIpAddress(){ 

  const nets = networkInterfaces();

  for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
          const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
          if (net.family === familyV4Value && !net.internal) {
              return net.address;
          }
      }
  }
} 