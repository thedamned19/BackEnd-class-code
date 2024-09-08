import { usersModel } from "./models/usersModel.js";

export class usersDAO {

    async create(user) {
        let newUser = await usersModel.create(user);
        return newUser.toJSON();
    }

    async getBy(filter = {}) {
        return await usersModel.findOne(filter).lean();
    }

    async getOneBy(email){
        return await usersModel.getOneBy({e_mail:email}).lean();
    }

    async get() {
        return await usersModel.find().lean();
    }

    async updateRole(id, newRole) {
        return await usersModel.findByIdAndUpdate(id, {role: newRole});
    }


}