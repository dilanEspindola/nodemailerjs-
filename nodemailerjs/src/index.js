const express = require('express');
const app = express();
const path = require('path')

app.use(express.urlencoded({extended:false})); //entiende datos de formulario simples
app.use(express.json());

app.use(require('./routes'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3500, () => console.log('Server on port 3500'));