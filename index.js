import 'dotenv/config'//lee las variables de entorno
import './database/connectDB.js'
import express from "express";
import authRouter from './routers/auth.route.js'

const app = express();

app.use(express.json())//habilitamos para que express pueda leer las solicitudes de tipo Json
app.use('/api/v1', authRouter )

const PORT = process.env.PORT || 5000 //cuando se suba a algun servidor buscara el puerto mas adecuado y correr la app
app.listen(PORT, () => console.log('servidor corriendo http://localhost:' + PORT));