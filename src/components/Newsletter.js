/*Este archivo define el componente que se encarga de la parte visual del formulario de suscripción y la lógica que ocurre cuando un usuario intenta suscribirse. Aquí es donde los usuarios ingresan su correo electrónico y se gestiona el estado del formulario (como si el envío fue exitoso o fallido).

- Newsletter.js recibe status, message, y onValidated como props desde MailchimpForm.js.

- Cuando el usuario ingresa su email y envía el formulario, se llama a handleSubmit, que valida si el email tiene un "@" y luego llama a onValidated con el objeto { EMAIL: email }.

- onValidated es la función que se pasó desde MailchimpForm.js, que a su vez llama a subscribe(formData) para enviar los datos a Mailchimp
*/


import { Alert } from "bootstrap";
import { useState, useEffect } from "react";
import {Container, Row, Col} from "react-bootstrap"

export const Newsletter =  ({onValidated, status, message}) => {
    const [email, setEmail] = useState("");

    useEffect(() => {
        if(status === 'success') clearFields();
    }, [status])

    const handleSubmit = (e) => {
        e.preventDefault() //un evento que previene un valor determinado
        email && //verificamos si realmente se ha ingresado el correo
        email.indexOf("@") > -1 &&//Se coloca -1 para verificar si el archivo es falso, si tiene el @ sale 0 = verdadero, si no tiene el @ sale -1 = falso
        onValidated({//Valida los formularios que pasamos
            EMAIL: email //Es la clave que Mailchimp espera recibir para identificar la dirección de correo electrónico que se está registrando. Esta es una convención que Mailchimp utiliza para procesar suscripciones.
        })
    }

    //Esta funcion es para borrar los campos
    const clearFields = () => {
        setEmail('');
    }

    //La estructura JSX renderiza el formulario de suscripción y muestra mensajes de estado (sending, error, success).
    return(
        //lg es igual a larga
        <Col lg={12}>
            <div className="newletter-bx">
                <Row>
                    <Col lg={12} md={6} xl={5}>
                        <h3>Subscribe to our newletter</h3>
                        {status === 'sending' && <Alert>Sending...</Alert>}
                        {status === 'error' && <Alert variant="danger">{message}</Alert>}
                        {status === 'success' && <Alert variant="success">{message}</Alert>}
                    </Col>
                    <Col md={6} xl={7}>
                        <form onSubmit={handleSubmit}>
                            <div className="new-email-bx">
                                <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email Adress"/>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}