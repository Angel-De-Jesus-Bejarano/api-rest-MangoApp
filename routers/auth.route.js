import {Router} from "express";//configuracion de las rutas
import { login, register } from "../controllers/auth.controller.js";
import {body} from 'express-validator'
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const router = Router();

router.post(
    '/register',
    [
        body('email', 'Formato de email incorrecto')//validamos el correo
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'Minimo 8 caracteres')//validamos la contraseña
            .trim()
            .isLength( {min: 8}),
        body('password', 'Formato de password incorrecto')
            .custom((value, {req}) =>{//value -> password //.custom puedes hacer una validacion personalizada
                if(value !== req.body.repassword){
                    throw new Error('No coinciden las contraseñas');
                }
                return value;
            })
    ],
    validationResultExpress,
    register
);
router.post(
    '/login',
    [
        body('email', 'Formato de email incorrecto')//validamos el correo
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'Minimo 8 caracteres')//validamos la contraseña
            .trim()
            .isLength( {min: 8})
    ],
    validationResultExpress,
    login 
);

export default router;
