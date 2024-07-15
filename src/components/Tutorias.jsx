import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid para generar IDs únicos
import './Tutorias.css';
import Header from './Header';

const Tutorias = () => {
  const [tutorias, setTutorias] = useState([]);
  const [userData, setUserData] = useState('');
  const [matricula, setMatricula] = useState([]);

  useEffect(() => {
    // Obtener las tutorías desde localStorage
    const tutoriasFromStorage = JSON.parse(localStorage.getItem('tutorias')) || [];
    setTutorias(tutoriasFromStorage);

    // Obtener los datos del usuario desde localStorage (suponiendo que se ha guardado previamente)
    const userDataFromStorage = JSON.parse(localStorage.getItem('users'));
    setUserData(userDataFromStorage.userName);

    // Obtener la matrícula desde localStorage (suponiendo que se ha guardado previamente)
    const matriculaFromStorage = JSON.parse(localStorage.getItem('matricula')) || [];
    setMatricula(matriculaFromStorage);
  }, []);

  const isUsuarioInscrito = (tutoriaId) => {
    const loginId = JSON.parse(localStorage.getItem('loginid')).id;
    return matricula.some(item => item.usuario === loginId && item.tutoria === tutoriaId);
  };

  const handleInscribirse = (tutoriaId) => {
    const loginId = JSON.parse(localStorage.getItem('loginid')).id; // Obtener el ID de loginid

    // Verificar si el estudiante ya está registrado en la tutoría
    const yaInscrito = isUsuarioInscrito(tutoriaId);

    if (yaInscrito) {
      // Si ya está inscrito, eliminar el registro de matrícula
      const nuevaMatricula = matricula.filter(item => !(item.usuario === loginId && item.tutoria === tutoriaId));
      localStorage.setItem('matricula', JSON.stringify(nuevaMatricula));
      setMatricula(nuevaMatricula);
      alert('Te has desinscrito de esta tutoría.');
    } else {
      // Si no está inscrito, inscribir al usuario en la tutoría
      const nuevaMatricula = [...matricula, { id: uuidv4(), usuario: loginId, tutoria: tutoriaId }];
      localStorage.setItem('matricula', JSON.stringify(nuevaMatricula));
      setMatricula(nuevaMatricula);
      alert('Inscripción exitosa.');
    }
  };

  const handleLogout = () => {
    // Eliminar solo el loginid del localStorage
    localStorage.removeItem('loginid');
    // Redirigir al usuario al inicio de sesión u otra página según tu aplicación
    window.location.href = '/';
  };

  return (
    <div>
      <Header handleLogout={handleLogout} />
    <div className="tutorias">
      
      <div className="tutorias-content">
        <h2 className="tutorias-heading">Todas las Tutorías Disponibles</h2>
        <div className="tutorias-grid">
          {tutorias.map((tutoria, index) => {
            const yaInscrito = isUsuarioInscrito(tutoria.id);
            return (
              <div key={index} className="tutoria-tarjeta">
                <h3 className="tutoria-name">{tutoria.nombre}</h3>
                <p><strong>Docente:</strong> {tutoria.docente}</p>
                <p><strong>Materia:</strong> {tutoria.materia}</p>
                <p><strong>Fecha:</strong> {tutoria.dia}</p>
                <p><strong>Descripción:</strong> {tutoria.descripcion}</p>
                <button className="tutoria-button" onClick={() => handleInscribirse(tutoria.id)}>
                  {yaInscrito ? 'Salir' : 'Inscribirse'}
                </button>
                {yaInscrito && (
                  <p className="already-subscribed"><em>Ya estás inscrito en esta tutoría.</em></p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Tutorias;
