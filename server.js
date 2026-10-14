import path from 'path'
import express from 'express'
import cors from 'cors'

import { loggerService } from './services/logger.service.js'

const app = express()
const corsOptions = {
    origin: [
        'http://127.0.0.1:5173',
        'http://localhost:5173',

        'http://127.0.0.1:5174',
        'http://localhost:5174',
    ],
    credentials: true,
}

// Express Config:
app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(express.json())

// Express Routing:


// Fallback route
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

const PORT = process.env.PORT || 3030
app.listen(PORT, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${PORT}/`)
)
