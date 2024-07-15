import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Importar uuidv4 de la librería uuid
import './Admin.css';

const Tarea = () => {
  const [titulo, setTitulo] = useState('');
  const [tutoria, setTutoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos obligatorios estén completos
    if (!titulo || !tutoria || !descripcion || !fechaEntrega) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Construir el objeto de tarea con un UUID único
    const nuevaTarea = {
      id: uuidv4(), // Generar UUID
      titulo,
      tutoria,
      descripcion,
      fechaEntrega,
    };

    // Obtener las tareas actuales desde localStorage o inicializar un arreglo vacío
    const tareasActuales = JSON.parse(localStorage.getItem('tareas')) || [];

    // Agregar la nueva tarea al arreglo
    tareasActuales.push(nuevaTarea);

    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem('tareas', JSON.stringify(tareasActuales));

    // Limpiar el formulario después de guardar
    setTitulo('');
    setTutoria('');
    setDescripcion('');
    setFechaEntrega('');
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    // Por ejemplo, limpiar localStorage y redirigir a la página principal
    window.location.href = '/'; // Redirigir a la página principal
  };

  // Obtener las tutorías disponibles desde localStorage
  const tutorias = JSON.parse(localStorage.getItem('tutorias')) || [];

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
        <h2>Agregar Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <label>
              Título:
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </label>
            <label>
              Tutoría:
              <select value={tutoria} onChange={(e) => setTutoria(e.target.value)}>
                <option value="">Selecciona una tutoría</option>
                {tutorias.map((tutoria, index) => (
                  <option key={index} value={tutoria.materia}>{tutoria.materia}</option>
                ))}
              </select>
            </label>
            <label>
              Descripción:
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </label>
            <label>
              Fecha de Entrega:
              <input type="date" value={fechaEntrega} onChange={(e) => setFechaEntrega(e.target.value)} />
            </label>
            <input type="submit" value="Guardar Tarea" disabled={!titulo || !tutoria || !descripcion || !fechaEntrega} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tarea;
