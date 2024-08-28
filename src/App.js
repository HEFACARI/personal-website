import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar.js';
import { Banner } from './components/Banner.js';
import { Skills } from './components/Skills.js';
import { Projects } from './components/Projects.js'
import { Contact } from './components/Contatc.js' 
import { Footer } from './components/Footer.js';
import { Toaster } from 'react-hot-toast';//Estiliza la pagina y crear ventanas emergentes 
//import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <NavBar/>
     <Banner/>
     <Skills/>
     <Projects/>
     <Contact/>
     <Footer/>
     <Toaster/>
    </div>
  );
}

export default App;