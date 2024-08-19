import { ticketsDAO as DAO } from "../DAO/ticketsDAO.js";

class TicketsService {
    constructor(dao){
        this.dao = new dao();
    }

    async getTickets(){
        return await this.dao.get();
    }   

    async getTicketById(id){
        return await this.dao.getBy({_id:id});
    }

    async createTicket(purchase_datetime, amount, purchaser){
        return await this.dao.create({purchase_datetime, amount, purchaser});
    }
}

export const ticketsService=new TicketsService(DAO)



