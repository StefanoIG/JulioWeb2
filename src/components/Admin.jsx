import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [tutorias, setTutorias] = useState([]);

  useEffect(() => {
    // Obtener las tutorías guardadas del localStorage al cargar el componente
    const storedTutorias = JSON.parse(localStorage.getItem('tutorias')) || [];
    setTutorias(storedTutorias);
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    // Por ejemplo, limpiar localStorage y redirigir a la página principal
    window.location.href = '/'; // Redirigir a la página principal
  };

  const handleDeleteTutoria = (id) => {
    // Eliminar la tutoría del estado local y actualizar localStorage
    const updatedTutorias = tutorias.filter(tutoria => tutoria.id !== id);
    setTutorias(updatedTutorias);
    localStorage.setItem('tutorias', JSON.stringify(updatedTutorias));
  };

  // Función para manejar la navegación hacia la página de edición de tutoría
  const handleEditTutoria = (id) => {
    // Redirigir a la página de edición de tutoría con el ID correspondiente
    // Por ejemplo, podrías usar React Router para manejar la navegación
    // Aquí utilizamos <Link> de react-router-dom para la navegación
    return <Link to={`/Editar/${id}`}></Link>;
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
        <h2>Tutorías Disponibles</h2>
        <div className="tutorias-container">
          {tutorias.length > 0 ? (
            tutorias.map((tutoria, index) => (
              <div className="tutoria-card" key={index}>
                <h3>{tutoria.docente}</h3>
                <p>{tutoria.descripcion}</p>
                <p><strong>Materia:</strong> {tutoria.materia}</p>
                <p><strong>Día:</strong> {tutoria.dia}</p>
                <p><strong>Hora:</strong> {tutoria.hora}</p>
                <div className="tutoria-actions">
                  <Link to={`/Editar/${tutoria.id}`} className="edit-button"><button className='boton'>Editar</button></Link>
                  <button onClick={() => handleDeleteTutoria(tutoria.id)} className='boton'>Eliminar</button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay tutorías disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
