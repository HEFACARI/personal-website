import { useState } from "react"
import contactImg from "../assets/img/contact-img.svg"
import { Container, Row, Col } from "react-bootstrap"
import { useForm } from 'react-hook-form'
import { putForm } from "../api/form.api" 
import { toast } from 'react-hot-toast'

export const Contact = () => {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '', 
        mesagge: ''
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    //const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({})

    const {register, handleSubmit} = useForm();

    /*
    formDetails tiene todos los campos de formInitialDetails
    category es el nombre del campo que se actualiza (Nombre)
    value es el campo que se actualiza(Hector)
    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    } */

    /*const handleSubmit = async (e) => {
        e.preventDefault();//Esta línea previene que se recargue el formulario en la página al enviarlo
        setButtonText('Sending...');//Esta línea actualiza el estado del texto del botón a "Sending..."
        let response = await fetch("http://localhost:5000/contact", { //Aquí se envía una solicitud HTTP POST a la URL determinada
            method: 'POST', //Especifica que se trata de una solicitud POST.
            headers: {
                "Content-Type": "Application/json;charset=utf-8",//Configura el encabezado de la solicitud para indicar que el cuerpo de la solicitud está en formato JSON
            },
            body: JSON.stringify(formDetails), //Convierte los datos del formulario (formDetails) en una cadena JSON y lo envía en el cuerpo de la solicitud.
        });
        setButtonText("Send");//Después de que se recibe la respuesta del servidor, el texto del botón se restablece a "Send"
        let result = await response.json(); //Aquí se convierte la respuesta del servidor a un objeto JSON. Aunque en este código no se está utilizando await para esperar la conversión, generalmente deberías hacerlo si response.json() devuelve una promesa.
        setFormDetails(formInitialDetails);//Restablece los detalles del formulario a su estado inicial, vaciando los campos del formulario
        if(result === 200){ //Verifica si la respuesta del servidor tiene un código de estado 200 (lo que indica éxito).
            setStatus({success: true, message: 'message send successfully'});
        }else {
            setStatus({status: false, message: 'something went wrong, please try again later.'})
        }
    }*/

    function estilosVEC(){
        return toast.success("Success o Guardado", {
            position:"top-center",
            style:{
                background: "green"
            }
        })
    }

    const onSubmit = handleSubmit(async data => {
        //console.log(data)
        await putForm(data);
        estilosVEC();
    })

    
    return(
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    {/*Esta es la columna de la izquierda */}
                    <Col md={6}>
                        <img src={contactImg} alt="Contact Us"></img>
                    </Col>
                    {/*Esta es la columna de la derecha */}
                    <Col md={6}>
                        <h2>Get in put</h2>

                        <form onSubmit={onSubmit}>{/* Envia los datos */}
                            <Row>
                                {/*px-1 es el relleno*/}
                                <Col sm={6} className="px-1">
                                    {/* e es un objeto que representa el evento que acaba de ocurrir
                                        e.target es el campo de entrada que el usuario esta interactuando
                                        e.target.value es el valor actual del campo de entrada
                                    */}
                                    <input type="text"  placeholder="First Name" {...register("firstName", {required:true})} />
                                </Col>

                                <Col>
                                    <input type="text" placeholder="Last Name" {...register("lastName", {required:true})} />
                                </Col>

                                <Col>
                                    <input type="email" placeholder="Email Adress" {...register("email", {required:true})} />
                                </Col>

                                <Col>
                                    <input type="tel"  placeholder="Number Phone" {...register("tel", {required:true})}/>
                                </Col>

                                <Col>
                                    <textarea type="text" row="6" placeholder="Message" {...register("message", {required:true})}/>
                                </Col>

                                <button><span>save</span></button>
                                
                                {
                                    /* Este es un operador lógico AND (&&) utilizado en React para renderizar condicionalmente. En este caso, se está comprobando si status.mesagge tiene un valor "truthy" 
                                    (es decir, no es null, undefined, false, 0, NaN, o una cadena vacía). Si status.mesagge tiene un valor "truthy" (es decir, no está vacío), entonces el código a la 
                                    derecha del && se renderiza. Si status.mesagge es "falsy", nada se renderiza.*/
                                    status.mesagge && 
                                    <Col>
                                    {/*Este es un elemento de párrafo (<p>) que muestra el mensaje de status.mesagge.
                                    La clase del elemento <p> se establece dinámicamente en función del valor de status.success</p>*/}
                                        <p className={status.success === false ? "danger" : "success"}>{status.mesagge}</p>
                                    </Col>
                                }
                            </Row>
                        </form>

                    </Col>
                </Row>
            </Container>
        </section>
    )
}