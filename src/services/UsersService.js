import { usersDAO as DAO } from "../DAO/usersDAO.js";

class UsersService {
    constructor(dao){
        this.dao = new dao();
    }

    async getUsers(){
        return await this.dao.get();
    }   

    async getUserById(id){
        return await this.dao.getBy(id);
    }

    
    async getUserByEmail(e_mail) {
        return await this.dao.getBy({e_mail:e_mail});
    }
    
    
    getUserEmail = async (filter = {}) => {
        return await this.dao.findOne(filter).lean();
    }
    

    createUser = async (user) => {
        return await this.dao.create({... user});
    }

    async updateRole(id, newRole){
        return await this.dao.updateRole({ _id: id }, newRole)
    }
    
}


export const usersService = new UsersService(DAO)
