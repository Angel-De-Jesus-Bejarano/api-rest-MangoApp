import { User } from "../models/User.js"
import jwt from "jsonwebtoken";

export const register = async (req, res) =>{//configuracion logica de las rutas, "solicitud base de datos"
    const {email, password} = req.body
    try {
        //alternativa buscando por email
        let user = await User.findOne({ email });
        if(user) throw { code: 11000 };

        user = new User({email, password})
        await user.save()

        //JWT

        return res.status(201).json({ok : true})
    } catch (error) {
        console.log(error)
        //alternativa por defecto moongose
        if(error.code === 11000){//11000 error key duplicada
            return res.status(400).json({error : 'Ya existe este usuario'})
        }
        return res.status(500).json({ error : 'Error de servidor'});
    }
}
export const login = async (req, res) =>{
    try {
        const {email, password} = req.body
        let user = await User.findOne({email});
        if(!user) return res.status(403).json({error : 'No existe el usuario'})

        const resPassword = await user.comparePassword(password)
        if(!resPassword){
            return res.status(403).json({error : 'La contraseña no es correcta'})
        }
        //Generamos el Token con JWT
        const token = jwt.sign({uid : user.id}, process.env.JWT_SECRET)

        return res.json({token});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : 'Error de servidor'});
    }
}
