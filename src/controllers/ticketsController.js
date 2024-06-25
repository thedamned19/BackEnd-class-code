import { ticketsService } from "../services/TicketsService.js"
    
async function getTickets (req,res) {
    let tickets = await ticketsService.getTickets();
    res.setHeader('Content-Type','application/json');
    res.status(200).json({tickets});
}

async function getTicketById(req,res){
    try {
        let ticket = await ticketsService.getTicketById(req.params.id)
        return res.status(200).json({ticket})
    } catch (error) {
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
    }
}

async function createTicket(req,res) {
    let {purchase_datetime, amount, purchaser} = req.body;
    if(!amount || !purchaser){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete al menos amount / purchaser`})
    }

    // validaciones a realizar:
    // verificar el stock del producto (no agregar al carrito si no hay suficiente stock).


    try {
        let newTicket = await ticketsService.createTicket({purchase_datetime, amount, purchasers});        
        res.setHeader('Content-Type','application/json')
        res.status(201).json({newTicket})
            
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
}

export default {getTickets, getTicketById, createTicket}
