import { validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {//comprobacion de errores en los datos
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    next();//lo utilizamos para validar que todo este bien con los datos ingresados y continuar
};