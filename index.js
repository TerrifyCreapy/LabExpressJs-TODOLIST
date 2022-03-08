const express = require("express");
const db = require('./db');
const expresshbs = require('express-handlebars');
const path = require('path')
const todoRouter = require('./routes/routes');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = expresshbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs',hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(todoRouter);

async function start() {
    try{
        app.listen(PORT , () => {
            console.log(`Server has started on the port ${PORT} !`);
        });
    }
    catch(err) {
        console.error(err.message);
    }
}
start();
