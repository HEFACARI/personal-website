import {useState, useEffect} from "react"
import { Container, Row, Col } from "react-bootstrap"
import {ArrowRightCircle} from "react-bootstrap-icons" /* Un icono importado de react-bootstrap-icons*/
import headerImage from "../assets/img/header-img.svg"
import 'animate.css' //Da animaciones
import TrackVisibility from "react-on-screen"//Ayuda a que se activen las animaciones solo cuando el usuario las vea
import { isVisible } from "@testing-library/user-event/dist/utils"

//import 'animate.css';
//import TrackVisibility from 'react-on-screen';

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0); //Esta linea muestra el indice en el cual se encuentran las palabras que deseo mostrar en const toRotate(chatgpt: LLeva la cuenta de cuantas veces se han rotado las palabras)
    const [isDeleting, setIsDeleting] = useState(false); // Aqui tenemos el estado principal(palabra que se escribe o se elimina)(falso porque se empieza escribiendo la palabra)(chatgpt: indica si esta eliminando texto en el banner)
    const toRotate = ["Desarrollador Web", "Frontend", "Backend"]; //Estas son las palabras que me gustaria mostrar
    const [text, setText] = useState("");//Indica la parte de la palabra que se esta mostrando
    const period = 2000; //Indica cuanto se demora en hacer la transicion entre cada palabra
    const [delta, setDelta] = useState(300 - Math.random() * 100); //Delta ayuda a determina que tan rapido viene una letra despues de escribir la primera
    const [index, setIndex] = useState('');

    /*Esta funcion es la que escribe o elimina las palabras o las letras de las palabras, 
    chatpgt: configura un efecto que se ejecuta cuando 'text' cambia
    setInterval: Esta función establece un intervalo de tiempo en milisegundos (delta) después del cual se ejecuta una función repetidamente. En este caso, la función tick se llama repetidamente.
    tick(): Es la función que actualiza el estado text en función del proceso de escritura y eliminación de texto.
    delta: Es el intervalo en milisegundos que determina con qué frecuencia se llama a la función tick. El valor de delta se ajusta dinámicamente para crear efectos de velocidad variables en la animación de texto (más rápido al eliminar, más lento al escribir).*/
    useEffect(() =>{
        let ticker = setInterval(() =>{ //chatgpt: setInterval llama a la funcion 'tick' despues de cada periodo determinado por 'delta'
            tick()
        }, delta)

        return () => {clearInterval(ticker)};//chatgpt: Limpia el intervalo cuando el efecto se desmonta o antes de configurarlo de nuevo

    }, [text])

    //Esta función es la que actualiza el texto mostrado en la pantalla letra por letra
    const tick = () => {
        let i = loopNum % toRotate.length; //Hace rotar las palabras hasta la longitud de toRotate, (chatgpt: calcula el indice de la palabra actual)
        let fullText = toRotate[i] //Hace un seguimiento a las palabras  
        let updateText  = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1); //El texto que se actualizara (ademas de que hace un seguiento cuando se esta eliminado o escribiendo una palabra)
        setText(updateText)

        //Hace que cuando pasa al proceso de eliminacion este lo haga mas rapido
        if(isDeleting){
            setDelta(prevDelta => prevDelta/2)//chatpt: si se esta eliminado la velocidad 'delta' se reduce a la mitad para que el texto se elimine mas rapido
        }

        if(!isDeleting && updateText === fullText){
            setIsDeleting(true);//Indica que el texto debe comenzar a eliminarse 
            setDelta(period);
        }else if(isDeleting && updateText === ''){
            setIsDeleting(false);//Indica que el texto debe comenzar a escribirse
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }
    return(
        <section className="banner " id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                        {({isVisible}) =>
                            <div className={isVisible ? "animate__animated animate__bounce" : ""}>
                                <span className="tagline">Bienvenidos a mi Portafolio</span>
                                <h1>{`Hola yo soy `}<span className="wrap">{text}</span></h1>
                                <p>Buenos dias, buenas tardes, buenas noches, dependiendo de la hora en la que estes revisando este portafolio, me presento, mi nombre es Hector Caez, Actualmente me encuentro en ultimo semestre en la Tecnologia Sistemas de Informacion en la Universida del Valle, soy un hombre apasionado por el DESARROLLO WEB al cual le encanta realizar diferentes tipos de proyectos como este que involucren el Backend y Frontend, te invito a que puedas explorar mas en este portafolio donde te estare mostrando mis proyectos a lo largo de esta carrera como desarrollador y como puedeS contactarme a travez de mis redes sociales. Ademas de todo esto pueden dejarme un mensaje y tus datos en la seccion de contacto, yo con gusto los leere. Que tengas un excelente dia hasta pronto😍🧑‍💻</p>
                                <button onClick={() => console.log('connect')}>Vamos, Conectate<ArrowRightCircle size={25}/></button>
                            </div>
                        }
                        </TrackVisibility>
                        <Col xs={12} md={6} xl={5}>
                            <img src={headerImage} alt="Header Img" />
                        </Col>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}