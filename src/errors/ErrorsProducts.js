import os from "os";

export function argumentsProduct (product){

    let {title, ...others} = product;
    return `Se han detectado argumentos inválidos:
Argumentos obligatorios:
    - title: tipo String. Se recibió: ${title}
    - description: tipo String. Se recibió: ${others.description}
    - price: tipo Number. Se recibió: ${others.price}
    - code: tipo String. Se recibió: ${others.code}
    - stock: tipo Number. Se recibió: ${others.stock}
    - category: tipo String. Se recibió: ${others.category}
Argumentos opcionales:
    -status. Se recibió: ${JSON.stringify(others)}

Fecha: ${new Date().toUTCString()}
Usuario: ${os.userInfo().username}
Terminal: ${os.hostname()}`

}