const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./product.js');
const Nota = require('./nota.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
    'mongodb://localhost:27017/trabalho08',
    { useNewUrlParser: true });
var myLogger = function (req, res, next) {
    console.log(req.body);
    next();
}
app.use(myLogger);

app.get('/products', function (req, res) {
    Product.find().lean().exec(
        (err, prods) => {
            if (err) {
                res.status(500).send(err);
            }
            else { res.status(200).send(prods); 
            }
        }
    )
});

app.post('/notas', function (req, res) {
    console.log(req);
    n = new Nota({
        cliente: req.body.cliente,
        produtos: req.body.produtos,
        valorNota: req.body.valorNota
    });
    n.save((err, nota) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(nota);
        }
    });
});

app.get('/notas', function (req, res) {
    Nota.find().lean().exec(
        (err, nota) => {
            if (err) {
                res.status(500).send(err);
            }
            else { res.status(200).send(nota); 
            }
        }
    )
});

app.listen(3000);