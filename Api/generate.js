const mongoose = require('mongoose');
const Product = require('./product.js');
var Faker = require('faker');

mongoose.connect(
    'mongodb://localhost:27017/trabalho08',
    { useNewUrlParser: true });

async function generateProducts(){
    for(let i=0;i<10;i++){
        let p = new Product({
            codigo: i,
            descricao: Faker.commerce.productName(),
            valorUnitario: Faker.commerce.price(),
            desconto: i
        });
        try{
            await p.save();
        }
        catch(err){
            throw new Error("Error generating products");
        }
    }
}
generateProducts().then(() =>{
    mongoose.disconnect();
    console.log("Ok");
})