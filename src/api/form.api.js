//Este archivo esta relacionado con TaskList ya que de aqui ese archivo saca todos los datos
//Este archivo saca todos los datos de la base de datos de django
//Este archivo esta relacionado con TaskFormPage ya que este archivo guarda los datos que saca del componente TaskFormPage para despues guardalo en la base de datos

import axios from 'axios' //Permite realizar peticiones
 
const formApi = axios.create({
    baseURL: 'http://localhost:8000/',
}) 

export const getAllForm = () => formApi.get('/')
export const putForm = (form) => formApi.post('/', form)