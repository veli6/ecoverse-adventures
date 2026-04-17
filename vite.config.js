import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or your specific framework plugin

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: [
            'ecoverse-adventures.onrender.com'
        ]
    }
})