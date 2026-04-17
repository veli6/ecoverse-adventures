import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    // Use the 'preview' block for the 'vite preview' command
    preview: {
        allowedHosts: true
    },
    // Keep the 'server' block if you also want it to work in 'vite dev'
    server: {
        allowedHosts: true
    }
})