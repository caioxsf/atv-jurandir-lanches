const express = require("express");
const pedidosRoute = require('./routes/pedidosRoute');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use('/', pedidosRoute);

app.listen(5000, function() {
    console.log("servidor web em funcionamento!")
})