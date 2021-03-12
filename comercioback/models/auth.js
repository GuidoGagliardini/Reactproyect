
const knex = require ('./../utils/bd');

const auth = async (email,password)=>{
    try {
        return consulta = await knex (process.env.T_USUARIOS)
                                        .where(`${process.env.T_USUARIOS}.email`,email).andWhere(`${process.env.T_USUARIOS}.password`, password)
                                        .select(`${process.env.T_USUARIOS}.usuario`,
                                                `${process.env.T_USUARIOS}.estado`,
                                                `${process.env.T_USUARIOS}.id`,
                                                `${process.env.T_USUARIOS}.activado`,
                                                `${process.env.T_USUARIOS}.email`,
                                                );
               
        
    } catch (error) {
        throw error;
       
    }
}
module.exports={
    auth
}