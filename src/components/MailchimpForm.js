/*
- Este archivo es responsable de integrar tu formulario con Mailchimp utilizando la librería react-mailchimp-subscribe. Aquí defines cómo se va a enviar la información del formulario a Mailchimp y cómo se manejarán los resultados (como el éxito o el error en el envío).

- MailchimpForm.js define la URL (postUrl) que se usará para enviar los datos a Mailchimp.
- Dentro del MailchimpSubscribe hay una prop llamada render, que es una función de renderizado personalizada.
- Esta función toma subscribe, status, y message como parámetros, los cuales son manejados por react-mailchimp-subscribe para indicar el estado actual del formulario (si se está enviando, si hubo un error, o si se envió con éxito).
- Luego, dentro de esta función de renderizado, MailchimpForm.js renderiza el componente Newsletter, pasando status, message, y onValidated como props.

*/
import MailchimpSubscribe from "react-mailchimp-subscribe"
import { Newsletter } from "./Newsletter";

export const MailchimpForm = () => {
    const postUrl = `${process.env.REACT_APP_MAILCHIMP_URL}?U=${process.env.REACT_APP_MAILCHIMP_U}$id=${process.env.REACT_APP_MAILCHIMP_ID}`;
                         
    return(
        <>
            {/*MailchimpSubscribe es un componente de la librería react-mailchimp-subscribe que maneja la suscripción a Mailchimp. El render prop es una función que renderiza el componente Newsletter, pasándole el estado actual de la suscripción (status), cualquier mensaje de error o éxito (message), y una función onValidated que se ejecuta cuando se valida el formulario. Esta función onValidated llama a subscribe con los datos del formulario, lo que envía la solicitud de suscripción a Mailchimp. */}
            <MailchimpSubscribe
                url={postUrl}
                render = {({subscrite, status, message}) => {
                    {/*Newsletter.js es el formulario que el usuario ve y usa para ingresar su correo electrónico */}
                    {/*El componente Newsletter se actualiza según el estado (status) proporcionado por MailchimpSubscribe, mostrando mensajes de éxito, error o envío según corresponda.*/}
                    <Newsletter
                        status={status}
                        message={message}
                        //Cuando el usuario envía su correo en Newsletter.js, la función onValidated se llama y, a través de MailchimpForm.js, se envía la solicitud de suscripción a Mailchimp
                        onValidated={formData => subscrite(formData)}
                    />
                }}
            />
        </>
    )
} 