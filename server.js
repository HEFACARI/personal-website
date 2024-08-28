//Importa el módulo Express para manejar las solicitudes HTTP y crear el servidor
const express = require("express");

//Utiliza el router de Express para definir rutas en tu aplicación
const router = express.Router();

//Importa el módulo cors para permitir solicitudes entre orígenes cruzados (Cross-Origin Resource Sharing).
const cors = require("cors");

//Importa nodemailer, que se utiliza para enviar correos electrónicos desde tu servidor.
const nodemailer = require("nodemailer");

// server used to send emails
const app = express(); //Crea una instancia de Express.
app.use(cors()); //Se  habilita CORS para permitir que el servidor reciba solicitudes desde diferentes dominios.
app.use(express.json()); //Configura el servidor para que pueda interpretar solicitudes con cuerpos en formato JSON
app.use("/", router); // Usa el router definido para manejar las rutas del servidor.
app.listen(5000, () => console.log("Server Running")); //Inicia el servidor en el puerto 5000 y muestra un mensaje en la consola indicando que el servidor está en funcionamiento.
console.log(process.env.EMAIL_USER);/*Se imprimen en la consola para verificar que las variables de entorno EMAIL_USER y EMAIL_PASS estén configuradas. Estas variables se suelen utilizar para almacenar de manera segura las credenciales del correo electrónico. */
console.log(process.env.EMAIL_PASS);

const contactEmail = nodemailer.createTransport({ //Crea un transporte de correo utilizando el servicio de Gmail.
  service: 'gmail',
  auth: { //Aquí se configuran las credenciales del correo electrónico (usuario y contraseña) que se utilizarán para enviar los correos. Normalmente, estos valores se extraen de las variables de entorno para mayor seguridad, pero aquí se ha insertado directamente
    user: "********@gmail.com",
    pass: ""
  },
});

contactEmail.verify((error) => { //Verifica que la configuración de nodemailer es correcta y que se puede establecer una conexión con el servicio de correo
  if (error) {
    console.log(error); //Si ocurre un error en la verificación, se muestra en la consola
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => { //Define una ruta POST /contact para manejar solicitudes de envío de formularios
  //req.body: Extrae los datos enviados en la solicitud POST (nombre, correo electrónico, mensaje, teléfono).
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  
  //mail: Define el contenido del correo electrónico que se enviará, incluyendo el remitente, el destinatario, el asunto y el cuerpo del mensaje en formato HTML.
  const mail = {
    from: name,
    to: "********@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };

  //Envía el correo utilizando la configuración de nodemailer
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });//Si el correo se envía correctamente, se devuelve una respuesta JSON con un código 200 y un mensaje de éxito.(El código 200 es un código de estado HTTP que significa "OK")
    }
  });
});
