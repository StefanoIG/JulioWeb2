import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Estudiante.css';

const Estudiante = () => {
  const [tutorias, setTutorias] = useState([]);
  const [selectedTutoria, setSelectedTutoria] = useState('');
  const [estudiantesMatriculados, setEstudiantesMatriculados] = useState([]);

  useEffect(() => {
    // Obtener las tutorías desde localStorage
    const tutoriasFromStorage = JSON.parse(localStorage.getItem('tutorias')) || [];
    setTutorias(tutoriasFromStorage);
  }, []);

  useEffect(() => {
    // Obtener los estudiantes matriculados según la tutoría seleccionada
    if (selectedTutoria) {
      const matriculaFromStorage = JSON.parse(localStorage.getItem('matricula')) || [];
      const estudiantesIds = matriculaFromStorage
        .filter(item => item.tutoria === selectedTutoria)
        .map(item => item.usuario);

      const usuariosFromStorage = JSON.parse(localStorage.getItem('users')) || [];
      const estudiantesFiltrados = usuariosFromStorage.filter(usuario =>
        estudiantesIds.includes(usuario.id)
      );

      setEstudiantesMatriculados(estudiantesFiltrados);
    } else {
      setEstudiantesMatriculados([]);
    }
  }, [selectedTutoria]);

  const handleSelectChange = (e) => {
    setSelectedTutoria(e.target.value);
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
        <h2>Ver Estudiantes Matriculados</h2>
        <label htmlFor="selectTutoria">Selecciona una Tutoría:</label>
        <select id="selectTutoria" value={selectedTutoria} onChange={handleSelectChange}>
          <option value="">Selecciona una tutoría</option>
          {tutorias.map((tutoria, index) => (
            <option key={index} value={tutoria.id}>{tutoria.materia}  {tutoria.dia}  {tutoria.hora}</option>
          ))}
        </select>
        <div>
          {selectedTutoria && (
            <div>
              <h3>Estudiantes Matriculados en {tutorias.find(t => t.id === selectedTutoria)?.materia} {tutorias.find(t => t.id === selectedTutoria)?.dia} {tutorias.find(t => t.id === selectedTutoria)?.hora}</h3>
              {estudiantesMatriculados.length > 0 ? (
                <ul>
                  {estudiantesMatriculados.map((estudiante, index) => (
                    <li className='estudiante-li' key={index}>{estudiante.userName}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay estudiantes matriculados en esta tutoría.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Estudiante;
