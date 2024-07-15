import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './components/Main.jsx'
import Admin from './components/Admin.jsx'
import Tarea from './components/Tarea.jsx'
import Estudiante from './components/Estudiante.jsx'
import Tutorias from './components/Tutorias.jsx'
import Crear from './components/Crear.jsx'
import Editar from './components/Editar.jsx'
import MisTutorias from './components/Mis-Tutorias.jsx'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/Admin' element={<Admin />} />
      <Route path='/Crear' element={<Crear />} />
      <Route path='/Tarea' element={<Tarea />} />
      <Route path='/Estudiante' element={<Estudiante />} />
      <Route path='/Tutorias' element={<Tutorias />} />
      <Route path='/Editar/:id' element={<Editar />} />
      <Route path='/Mis-Tutorias' element={<MisTutorias />} />

    </Routes>
  </BrowserRouter>
  )
}

export default App
