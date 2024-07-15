import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Editar.css'; // Importa el archivo CSS de estilos

const Editar = () => {
  const { id } = useParams(); // Obtener el ID de la tutoría desde los parámetros de la URL

  const [docente, setDocente] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [materia, setMateria] = useState('');
  const [dia, setDia] = useState('');
  const [hora, setHora] = useState('');

  useEffect(() => {
    // Obtener la tutoría específica del localStorage al cargar el componente
    const tutorias = JSON.parse(localStorage.getItem('tutorias')) || [];
    const tutoriaSeleccionada = tutorias.find(tutoria => tutoria.id === id);

    if (tutoriaSeleccionada) {
      setDocente(tutoriaSeleccionada.docente);
      setDescripcion(tutoriaSeleccionada.descripcion);
      setMateria(tutoriaSeleccionada.materia);
      setDia(tutoriaSeleccionada.dia);
      setHora(tutoriaSeleccionada.hora);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construir el objeto de tutoría actualizado
    const tutoriaActualizada = {
      id,
      docente,
      descripcion,
      materia,
      dia,
      hora,
    };

    // Obtener las tutorías actuales desde localStorage
    let tutoriasActuales = JSON.parse(localStorage.getItem('tutorias')) || [];

    // Actualizar la tutoría correspondiente en el arreglo
    tutoriasActuales = tutoriasActuales.map(tutoria => {
      if (tutoria.id === id) {
        return tutoriaActualizada;
      }
      return tutoria;
    });

    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem('tutorias', JSON.stringify(tutoriasActuales));

    // Redirigir a la página de Admin después de editar
    window.location.href = '/Admin';
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    // Por ejemplo, limpiar localStorage y redirigir a la página principal
    window.location.href = '/'; // Redirigir a la página principal
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="navigation-links">
          <h3>Opciones</h3>
          <Link to="/Admin">Inicio</Link>
          <Link to="/Crear">Crear Tutoría</Link>
          <Link to="/Tarea">Agregar Tarea</Link>
          <Link to="/Estudiante">Ver Estudiantes</Link>
          <Link to="/" onClick={handleLogout}>Cerrar Sesión</Link>
        </div>
      </div>
      <div className="main-content">
        <div className="editar-container">
          <h2>Editar Tutoría</h2>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Docente:
              <input type="text" value={docente} onChange={(e) => setDocente(e.target.value)} />
            </label>
            <label>
              Descripción:
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </label>
            <label>
              Materia:
              <select value={materia} onChange={(e) => setMateria(e.target.value)}>
                <option value="">Selecciona una materia</option>
                <option value="Matemáticas">Matemáticas</option>
                <option value="Ciencias">Ciencias</option>
                <option value="Historia">Historia</option>
                <option value="Literatura">Literatura</option>
                {/* Agrega más opciones según necesites */}
              </select>
            </label>
            <label>
              Día:
              <input type='date' value={dia} onChange={(e) => setDia(e.target.value)} />
            </label>
            <label>
              Hora:
              <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
            </label>
            <div className="tutoria-actions">
              <input type="submit" value="Guardar Cambios" className="edit-button" />
              <Link to="/Admin" ><input type="submit" value="Cancelar" className='edit-button' /></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editar;
