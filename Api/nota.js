const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notaSchema = new Schema({
    cliente: String,
    produtos: [{
        codigo:Number,
        codigo: Number,
        descricao: String,
        valorUnitario: Number,
        desconto: Number,

    }],
    valorNota: Number,
});

module.exports = mongoose.model("Nota", notaSchema);