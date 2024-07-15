import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                admin : resolve(__dirname, './components/admin.jsx'),
                crear : resolve(__dirname, './components/crear.jsx'),
                editar: resolve(__dirname, './components/editar.jsx'),
                estudiante: resolve(__dirname, './components/estudiante.jsx'),
                header: resolve(__dirname, './components/header.jsx'),
                main: resolve(__dirname, './components/main.jsx'),
                MisTutorias: resolve(__dirname, './components/Mis-Tutorias.jsx'),
                Tarea: resolve(__dirname, './components/Tarea.jsx'),
                Tutorias: resolve(__dirname, './components/Tutorias.jsx'),
              }

        }
    },
});