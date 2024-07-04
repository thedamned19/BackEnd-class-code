import { ticketsModel } from "./models/ticketsModel.js";

export class ticketsDAO {

    async create(user) {
        let newTicket = await ticketsModel.create(newTicket);
        return newTicket.toJSON();
    }

    async getBy(filter = {}) {
        return await ticketsModel.findOne(filter).lean();
    }

    async get() {
        return await ticketsModel.find().lean();
    }

}