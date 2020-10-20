const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    codigo: Number,
    descricao: String,
    valorUnitario: Number,
    desconto: Number,
});

module.exports = mongoose.model("Product", productSchema);