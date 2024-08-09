import {fakerES_MX as faker} from "@faker-js/faker"

export class generateProductsMocks {
    generateProducts = () => {
        let title; 
        let description;
        let price;
        let stock;
        let category;
        let code;
        const product = [];
        const products = [];
    
        for (let i = 0; i < 5; i++) {
            title = faker.music.title();
            description = faker.music.description();
            price = faker.music.price();
            stock = faker.music.stock();
            category = faker.music.category();
            //code = faker.database.mongodbObjectId();
            product.push(title, description, price, stock, category);
            products.push(product);
        }
        return "hola";
        //return {products};
    }    
}


/*
const generaCliente=()=>{
    let nombre=faker.person.firstName("female")
    let apellido=faker.person.lastName()
    let email=faker.internet.email({firstName:nombre, lastName:apellido})
    let codigo=faker.database.mongodbObjectId()
    return {
        codigo,
        nombre, 
        apellido, 
        email
    }
}

*/