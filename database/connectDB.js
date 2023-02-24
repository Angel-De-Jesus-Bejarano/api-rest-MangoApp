import mongoose from "mongoose";//conectamos la base de datos desde mongodb

mongoose.set('strictQuery', true)
try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log('connecion exitosa a la base de datos')
} catch (error) {
    console.log('error de conexion a mongodb : ' + error)
}