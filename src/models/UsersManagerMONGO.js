import { usersModel } from "./users.js";

export class UsersManagerMongo{

    async create(user){
        let newUser = await usersModel.create(user)
        return newUser.toJSON()
    }

    async getBy(filter = {} ) {
        return await usersModel.findOne(filter).lean()
    }

    async getByPopulate(filter = {}) {
        return await usersModel.findOne(filter).populate("cart").lean()
    }

}