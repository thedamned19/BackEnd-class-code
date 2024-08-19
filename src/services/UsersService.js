import { usersDAO as DAO } from "../DAO/usersDAO.js";

class UsersService {
    constructor(dao){
        this.dao = new dao();
    }

    async getUsers(){
        return await this.dao.get();
    }   

    async getUserById(id){
        return await this.dao.getBy({_id:id});
    }

    getUserByEmail = async (filtro) => {
        console.log(filtro);
        return await this.dao.getBy(filtro);
    }

    async createUser(user){
        return await this.dao.create({... user});
    }

    async updateRole(id, newRole){
        return await this.dao.updateRole({ _id: id }, newRole)
    }
    
}


export const usersService=new UsersService(DAO)