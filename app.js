const express = require('express');
const app = express();
const database = require('./database')
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 3000;



app.get('/', (req, res) => {
    res.render("index.ejs")
})

// -- Get button choice from form
app.post('/submit', (req, res) => {
    const recipe = req.body.recipe_btn;
    console.log('Action:', recipe); // Outputs value of button

    switch (recipe) {
        case 'random':
            database.getRandomRecipe();
            break;
    
        default:
            break;
    }

    res.redirect('/')
});


app.use(express.static("public"))


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
}) 