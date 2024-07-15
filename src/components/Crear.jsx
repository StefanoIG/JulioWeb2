import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Importar uuidv4 de la librería uuid
import './Crear.css';

const Crear = () => {
  const [docente, setDocente] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [materia, setMateria] = useState('');
  const [dia, setDia] = useState('');
  const [hora, setHora] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica para asegurar que los campos obligatorios no estén vacíos
    if (!docente || !descripcion || !materia || !dia || !hora) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Construir el objeto de tutoría con un UUID único
    const nuevaTutoria = {
      id: uuidv4(), // Generar UUID
      docente,
      descripcion,
      materia,
      dia,
      hora,
    };

    // Obtener las tutorías actuales desde localStorage o inicializar un arreglo vacío
    const tutoriasActuales = JSON.parse(localStorage.getItem('tutorias')) || [];

    // Agregar la nueva tutoría al arreglo
    tutoriasActuales.push(nuevaTutoria);

    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem('tutorias', JSON.stringify(tutoriasActuales));

    // Limpiar el formulario después de guardar
    setDocente('');
    setDescripcion('');
    setMateria('');
    setDia('');
    setHora('');
    setError(''); // Limpiar el mensaje de error después de guardar correctamente
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
        <h2>Crear Tutoría</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form">
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
                {/* Añade más opciones según tus necesidades */}
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
            <input type="submit" value="Guardar Tutoría" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Crear;
