
let carts = [
    {
        id: 1,
        products: [
            { id: 1, quantity: 2 }
        ]
    },
    {
        id: 2,
        products: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
            { id: 3, quantity: 4 }
        ]
    },
    {
        id: 3,
        products: [
            { id: 1, quantity: 2 },
            { id: 3, quantity: 1 },
            { id: 2, quantity: 8 },
        ]
    },
];

export class MemoryCartsDAO {
    getAll() {
        return carts;
    }
}