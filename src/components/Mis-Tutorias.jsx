import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MisTutorias.css';
import Header from './Header';

const MisTutorias = () => {
  const [userData, setUserData] = useState('');
  const [tutoriasInscrito, setTutoriasInscrito] = useState([]);

  useEffect(() => {
    // Obtener el ID de usuario (loginid) desde localStorage
    const loginId = JSON.parse(localStorage.getItem('loginid')).id;

    // Obtener los datos del usuario desde localStorage (suponiendo que se ha guardado previamente)
    const userDataFromStorage = JSON.parse(localStorage.getItem('users'));
    setUserData(userDataFromStorage.userName);

    // Obtener la matrícula desde localStorage (suponiendo que se ha guardado previamente)
    const matriculaFromStorage = JSON.parse(localStorage.getItem('matricula')) || [];

    // Filtrar las tutorías en las que el usuario está inscrito (comparando con el loginId)
    const tutoriasInscritoFromStorage = matriculaFromStorage.filter(item => item.usuario === loginId).map(item => item.tutoria);
    setTutoriasInscrito(tutoriasInscritoFromStorage);
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    // Limpiar localStorage y redirigir a la página principal
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div>
      <Header />
    <div className="mis-tutorias">
      <div className="tutorias-content">
        <h2>Mis Tutorías Inscritas</h2>
        <div className="mis-tutorias-grid">
          {tutoriasInscrito.length === 0 ? (
            <p>No estás inscrito en ninguna tutoría.</p>
          ) : (
            tutoriasInscrito.map((tutoriaId, index) => {
              // Obtener la información de la tutoría desde localStorage
              const tutoria = JSON.parse(localStorage.getItem('tutorias')).find(tutoria => tutoria.id === tutoriaId);
              return (
                <div key={index} className="tutoria-tarjeta">
                  <h3>{tutoria.nombre}</h3>
                  <p><strong>Docente:</strong> {tutoria.docente}</p>
                  <p><strong>Materia:</strong> {tutoria.materia}</p>
                  <p><strong>Fecha:</strong> {tutoria.dia}</p>
                  <p><strong>Descripción:</strong> {tutoria.descripcion}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MisTutorias;
