import swal from 'sweetalert';


export const alertRegistro = () =>{
    swal({
        title:"Registro OK 👍",
        text: "Revise su casilla de mail",
        icon : "info",
        timer:3000,
        buttons:"Aceptar"
    })
    return swal;
};
export const verifyok = () =>{
    swal ({
        title:"Cuenta Activada 👍",
        icon:"success",
        button: true,
    })
};
export const verifyNo = () =>{
    swal ({
        title:"Email ya registrado 🚫",
        icon:"error",
        button: true,
    })
};
export const loginNot = () =>{
    swal ({
        title:"Usuario o contraseña incorrectos 🚫",
        icon:"error",
        button: true,
    })
};
export const noMail = () =>{
    swal ({
        title:"Email no registrado",
        icon:"error",
        button: true,
    })
}
export const mailOk = () =>{
    swal ({
        text:"Revisa tu casilla para recuperar tu password",
        icon:"success",
        button: true,
    })
}
export const recoveryOk = () =>{
    swal ({
        text: `Password Generado 🆗`,
        icon:"success",
        button: true,
    })
}
export const noRecovery = () =>{
    swal ({
        title: `Contraseñas diferentes`,
        text:`Las contraseñas deben ser iguales`,
        icon:"error",
        button: true,
    })
}
export const tokenError = () =>{
    swal ({
        title : `Session Expirada`,
        text:  `Para volver a generar el password lo redirigremos al Login`,
        icon:"info",
        button: true,
    })
}
export const accesNot = () =>{
    swal ({
        title : `Prohibido el ingreso sin autenticacion`,
        text:  `🚫`,
        icon:"error",
        button: true,
    })
}