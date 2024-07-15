import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                admin: resolve(__dirname, 'src/components/admin.jsx'),
                crear: resolve(__dirname, 'src/components/crear.jsx'),
                editar: resolve(__dirname, 'src/components/editar.jsx'),
                estudiante: resolve(__dirname, 'src/components/estudiante.jsx'),
                header: resolve(__dirname, 'src/components/header.jsx'),
                main: resolve(__dirname, 'src/components/main.jsx'),
                MisTutorias: resolve(__dirname, 'src/components/Mis-Tutorias.jsx'),
                Tarea: resolve(__dirname, 'src/components/Tarea.jsx'),
                Tutorias: resolve(__dirname, 'src/components/Tutorias.jsx'),
            }
        }
    }
});