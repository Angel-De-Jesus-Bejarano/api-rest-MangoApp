import mongoose from "mongoose"//creamos el esquema con la informacion del usuario
import bcryptjs from "bcryptjs"


const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
        index : { unique : true}

    },
    password : {
        type : String,
        required : true,
    }

});

    userSchema.pre('save', async function(next){//hashea la contraseña antes de que se guarde
        const user = this

        if(!user.isModified('password')) return next()//no vuele a hashear la contraseña cuando se actualiza

        try {
            const salt = await bcryptjs.genSalt(10)
            user.password = await bcryptjs.hash(user.password, salt) 
            next()
        } catch (error) {
            console.log(error)
            throw new Error('fallo el hash de contraseña')
        }
    });

    userSchema.methods.comparePassword = async function(frontPassword){
        return await bcryptjs.compare(frontPassword, this.password)
    };

export const User = mongoose.model('User', userSchema);
