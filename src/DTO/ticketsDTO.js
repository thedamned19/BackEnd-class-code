export class TicketsDTO {
    constructor(ticket) {
        this.purchase_datetime = ticket.purchase_datetime.toDateString();
        //this.amount = ticket.amount;
        this.amount = valorFormateado;
        this.purchaser = ticket.purchaser.toUpperCase();
    }

}

// no llegué a probarlo
const valorFormateado = new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 3,
}).format(this.amount)

