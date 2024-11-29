const express = require('express');
const app = express();
const database = require('./database')
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


const port = process.env.PORT || 3000;
let r = 0;
let b = 0;
let l = 0;
let d = 0;
let s = 0;


app.get('/', (req, res) => {
    res.render("index.ejs", {recipeTitle: null, recipeImg: null, recipeIngredients: null, recipeInstructions: null, isHidden: true})
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
                recipeTitle = returnedRecipe[0]
                recipeImg = returnedRecipe[1];
                recipeIngredients = returnedRecipe[2];
                recipeInstructions = returnedRecipe[3];
                res.render('index',{ recipeTitle, recipeImg, recipeIngredients, recipeInstructions, isHidden: false })
            });
            r++;

            break;
        
        case 'breakfast':

            database.getBreakfastRecipe(b).then(returnedRecipe => {
                recipeTitle = returnedRecipe[0]
                recipeImg = returnedRecipe[1];
                recipeIngredients = returnedRecipe[2];
                recipeInstructions = returnedRecipe[3];
                res.render('index',{ recipeTitle, recipeImg, recipeIngredients, recipeInstructions, isHidden: false })
            });
            b++;
            break;

        case 'lunch':

            database.getLunchRecipe(l).then(returnedRecipe => {
                recipeTitle = returnedRecipe[0]
                recipeImg = returnedRecipe[1];
                recipeIngredients = returnedRecipe[2];
                recipeInstructions = returnedRecipe[3];
                res.render('index',{ recipeTitle, recipeImg, recipeIngredients, recipeInstructions, isHidden: false })
            }); 

            l++; 

            break;

        case 'dinner':

            database.getDinnerRecipe(d).then(returnedRecipe => {
                recipeTitle = returnedRecipe[0]
                recipeImg = returnedRecipe[1];
                recipeIngredients = returnedRecipe[2];
                recipeInstructions = returnedRecipe[3];
                res.render('index',{ recipeTitle, recipeImg, recipeIngredients, recipeInstructions, isHidden: false })
            });
            d++;
            break;

        case 'side':

            database.getSideRecipe(s).then(returnedRecipe => {
                recipeTitle = returnedRecipe[0]
                recipeImg = returnedRecipe[1];
                recipeIngredients = returnedRecipe[2];
                recipeInstructions = returnedRecipe[3];
                res.render('index',{ recipeTitle, recipeImg, recipeIngredients, recipeInstructions, isHidden: false })
            }); 
            s++;          
            break;

        default:
            break;
    }
});


app.use(express.static("public"))


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
}) 