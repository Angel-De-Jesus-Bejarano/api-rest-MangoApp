export const register = (req, res) =>{//configuracion logica de las rutas, "solicitud base de datos"
    console.log(req.body);
    res.json({ ok: 'register'})
}
export const login = (req, res) =>{
    console.log(req.body)
    res.json({ ok: 'login'})
}
