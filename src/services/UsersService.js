import { usersDAO as DAO } from "../DAO/usersDAO.js";

class UsersService {
    constructor(dao){
        this.dao = new dao();
    }

    async getUsers(){
        return await this.dao.get();
    }   

    async getUserById(id){
        return await this.dao.getBy({_id:id})
    }

    async getUserByEmail(email){
        return await this.dao.getBy({email})
    }

    async createUser(nombre, email){
        return await this.dao.create({nombre, email})
    }

    async updateRole(id, newRole){
        return await this.dao.updateRole({ _id: id }, newRole)
    }
    
}


export const usersService=new UsersService(DAO)