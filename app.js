const express = require('express');
const app = express();
const database = require('./database')
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;



app.get('/', (req, res) => {
    res.render("index.ejs", {

    })
})


app.use(express.static("public"))


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
}) 