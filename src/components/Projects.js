import { Col, Row, Nav, Tab, Container } from "react-bootstrap";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import { ProjectCard } from "./ProjectCard";
import { Key } from "react-bootstrap-icons";
import colorSharp2 from "../assets/img/color-sharp2.png"
import TrackVisibility from "react-on-screen";

export const Projects = () => {

  const projects = [
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg1,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg2,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg3,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg1,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg2,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg3,
    },
  ];

    return(
      <section className="project" id="project">
        <Container>
          <Row>
            <Col>
              <TrackVisibility>
                {({isVisible}) =>
                  <div className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <h2>Projects</h2>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                }  
              </TrackVisibility>
              <Tab.Container id="projects-tabs" defaultActiveKey="first">
                <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Tab 3</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Row>
                      {
                        //En cada iteracion se retorna un componente projectCard
                        projects.map((project, index) => {
                          return(
                            /*<p>{Project.title}</p>*/
                            <ProjectCard
                              Key={index} //se utiliza para proporcionar una clave unica a cada elemento renderizado por el metodo map
                              {...project} //Esta es una sintaxis spread pasa todas las propiedades del objeto "project" como props del componente "projectCard" es equivalente a escribir "title={project.title}", "description={project.description}", "imgUrl={imgUrl}"
                            />
                          )
                        })
                      }
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">lorem ipsum</Tab.Pane>
                  <Tab.Pane eventKey="third">lorem ipsum</Tab.Pane>
                </Tab.Content>
              </Tab.Container>          
            </Col>
          </Row>
        </Container>
        <img className="background-image-right" src={colorSharp2}/>
      </section>
    )
}