import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        open: true,
        port: 3000
    },
    build: {
        rollupOptions: {
            input: {
                index: './index.html',
                web3D: './web3D.html'
            }
        }
    }
})