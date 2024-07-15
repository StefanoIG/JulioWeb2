import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                admin: resolve(__dirname, 'src/components/Admin.jsx'),
                crear: resolve(__dirname, 'src/components/Crear.jsx'),
                editar: resolve(__dirname, 'src/components/Editar.jsx'),
                estudiante: resolve(__dirname, 'src/components/Estudiante.jsx'),
                header: resolve(__dirname, 'src/components/Header.jsx'),
                main: resolve(__dirname, 'src/components/Main.jsx'),
                MisTutorias: resolve(__dirname, 'src/components/Mis-Tutorias.jsx'),
                Tarea: resolve(__dirname, 'src/components/Tarea.jsx'),
                Tutorias: resolve(__dirname, 'src/components/Tutorias.jsx'),
            }
        }
    }
});
