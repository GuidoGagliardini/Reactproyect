const knex =  require ('./../utils/bd');

const createUser = async (obj) =>{
        try {
            return consulta = await knex(process.env.T_USUARIOS)
                            .insert(obj).where(obj.email != 'email');
        // Averiguar como hacer que me retorne un false si el nombre ya existe o es igual
            
        } catch (error) {
                throw error;
        }
}
const verifyExistentUser =  async (email)=>{
    try {
        return consulta = await knex(process.env.T_USUARIOS)
                            .where(`${process.env.T_USUARIOS}.email`,email)
                            .select(`${process.env.T_USUARIOS}.email`);
    } catch (error) {
        throw error;
    }
}
const getusers = async () =>{
    try {
        return consulta = await knex(process.env.T_USUARIOS)
                                .select("*");
    } catch (error) {
            throw error;
    }
}
const activateuser = async (email)=>{
    try{    
        return consulta =  knex (process.env.T_USUARIOS)
                                .where(`${process.env.T_USUARIOS}.email`, email)
                                .update(`${process.env.T_USUARIOS}.activado`,1)

    }catch(error){
        throw error;
    }
}
const verifyCodeUser = async (verify_code)=>{
    try {
        return consulta  = knex(process.env.T_USUARIOS)
                            .where(`${process.env.T_USUARIOS}.verify_code`,verify_code)
                            .select(`${process.env.T_USUARIOS}.activado`)
    } catch (error) {
        throw error;
    }
}
const updatePassbyEmail = async (email,password)=>{
    try {
        return consulta = knex(process.env.T_USUARIOS)
                            .where(`${process.env.T_USUARIOS}.email`, email)
                            .update(`${process.env.T_USUARIOS}.password`, password)
    } catch (error) {
            throw error;
    }
}

module.exports={
    createUser,
    getusers,
    activateuser,
    verifyCodeUser,
    verifyExistentUser,
    updatePassbyEmail
}