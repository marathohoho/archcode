const express = require('express');
const graphqlHTTPS = require('express-graphql');
const Schema = require('./schema');
//configurations
const db = require('./config/database');
const app = express();
const PORT = process.env.PORT || 4000;

app.use('/graphql', graphqlHTTPS({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

//establish connection
app.listen(PORT, console.log(`server started on port ${PORT}`));


//connect and check connection to the database
db.authenticate()
    .then(function(){
        console.log("Connected! ");
    })
    .catch(function (err){
        console.log("Something went wrong! Could not establish connection with the database");
    })