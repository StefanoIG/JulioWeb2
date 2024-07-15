import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './Main.css';
import 'boxicons/css/boxicons.min.css';

const Main = () => {
  const [showRegister, setShowRegister] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });
  const [loginData, setLoginData] = useState({
    userEmail: '',
    userPassword: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (isLoginSuccessful && userId) {
      setTimeout(() => {
        window.location.href = '/Tutorias';
      }, 500);
    }
  }, [isLoginSuccessful, userId]);

  const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegex = /^.{4,12}$/;

  const toggleForms = () => {
    setShowRegister(!showRegister);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showRegister) {
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      setLoginData({
        ...loginData,
        [name]: value
      });
    }
  };

  const validateField = (regex, fieldValue) => {
    return regex.test(fieldValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (showRegister) {
      const { userName, userEmail, userPassword } = formData;

      if (
        validateField(userNameRegex, userName) &&
        validateField(emailRegex, userEmail) &&
        validateField(passwordRegex, userPassword)
      ) {
        const userId = uuidv4();
        const newUser = { id: userId, userName, userEmail, userPassword, isLoggedIn: true };

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = [...existingUsers, newUser];

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('loginid', JSON.stringify({ id: userId })); // Guarda solo el ID

        setAlertMessage('Registro Exitoso');
        setFormData({ userName: '', userEmail: '', userPassword: '' });
        setIsLoginSuccessful(true);
        setUserId(userId);
      } else {
        setAlertMessage('Todos los Campos son Obligatorios');
      }
    } else {
      const { userEmail, userPassword } = loginData;
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

      if (userEmail === 'julio@admin.com' && userPassword === 'admin') {
        window.location.href = '/Admin';
        return;
      }

      const user = storedUsers.find(user => user.userEmail === userEmail);

      if (user && user.userPassword === userPassword) {
        try {
          localStorage.setItem('loginid', JSON.stringify({ id: user.id })); // Guarda solo el ID
          setAlertMessage('Iniciaste Sesión Correctamente');
          setIsLoginSuccessful(true);
          setUserId(user.id);
        } catch (error) {
          console.error('Error setting loginid in localStorage:', error);
          setAlertMessage('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
      } else {
        setAlertMessage('Credenciales Incorrectas');
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://accounts.google.com/signin';
  };

  return (
    <div className='body'>
      <div className={`container-form ${showRegister ? 'register' : 'login'}`}>
        <div className="information">
          <div className="info-childs">
            <h2>{showRegister ? 'Bienvenido' : 'Bienvenido Nuevamente'}</h2>
            <p>
              {showRegister
                ? 'Para unirte a nuestras tutorías por favor Registrarse'
                : 'Para unirte a nuestras tutorías por favor Inicia Sesión'}
            </p>
            <input
              type="button"
              value={showRegister ? 'Iniciar Sesión' : 'Registrarse'}
              onClick={toggleForms}
            />
          </div>
        </div>
        <div className="form-information">
          <div className="form-information-childs">
            <h2>{showRegister ? 'Crear una Cuenta' : 'Iniciar Sesión'}</h2>
            <div className="icons">
              <i className="bx bxl-google" onClick={handleGoogleLogin}></i>
              <i className="bx bxl-microsoft"></i>
            </div>
            <p>{showRegister ? 'O usa tu email para registrarte' : 'O Inicia Sesión con una cuenta'}</p>
            <form
              className={`form ${showRegister ? 'form-register' : 'form-login'}`}
              onSubmit={handleSubmit}
            >
              {showRegister && (
                <div>
                  <label>
                    <i className="bx bx-user"></i>
                    <input
                      type="text"
                      placeholder="Usuario"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              )}
              <div>
                <label>
                  <i className="bx bx-envelope"></i>
                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    name="userEmail"
                    value={showRegister ? formData.userEmail : loginData.userEmail}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  <i className="bx bx-lock-alt"></i>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    name="userPassword"
                    value={showRegister ? formData.userPassword : loginData.userPassword}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <input type="submit" value={showRegister ? 'Registrarse' : 'Iniciar Sesión'} />
              <div className={`alerta ${alertMessage ? 'alerta-show' : ''}`}>
                {alertMessage}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
