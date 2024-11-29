const express = require('express');
const app = express();
const database = require('./database')
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


const port = process.env.PORT || 3000;
let r = 0


app.get('/', (req, res) => {
    res.render("index.ejs", {recipeTitle: null, recipeImg: null, recipeIngredients: null, recipeInstructions: null})
})

// -- Get button choice from form
app.post('/submit', (req, res) => {

    const recipe_opt = req.body.recipe_btn;
    let recipeTitle;
    let recipeImg;
    let recipeIngredients;
    let recipeInstructions;

    console.log('Action:', recipe_opt); // Outputs value of button
    
    switch (recipe_opt) {
        case 'random':
            
            database.getRandomRecipe(r).then(returnedRecipe => {
                console.log(`Returned recipe ${returnedRecipe}`);
                recipeTitle = returnedRecipe[0]
                console.log(`Recipe title: ${recipeTitle}`);
                recipeImg = returnedRecipe[1];
                console.log(`Recipe Image: ${recipeImg}`);
                recipeIngredients = returnedRecipe[2];
                console.log(`Recipe Ingredients: ${recipeIngredients}`);
                recipeInstructions = returnedRecipe[3];
                console.log(`Recipe Instructions: ${recipeInstructions}`);
                res.render('index',{ recipeTitle, recipeImg, recipeIngredients, recipeInstructions })
            });
            r++;

            break;
    
        default:
            break;
    }
});


app.use(express.static("public"))


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
}) 