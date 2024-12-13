const { getRandomValues } = require('crypto');

// -Imports
require('dotenv').config();

// -Global Variables
api_call = "https://api.spoonacular.com/recipes/random?apiKey=" + process.env.API_KEY + "&number=10";
let Recipes = {
    'breakfast':[],
    'lunch':[],
    'dinner':[],
    'side':[],
    'all':[]
};

// Get API information for website
async function fetchData(url) {
    if (Recipes.all.length !== 0) {
        console.log(`Using already called recipes.`);
        return Recipes;
    }
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`API call error ${res.status}`);
        }
        const data = await res.json();
        if (!data) {
            console.warn("Body is empty");
        } else {
            console.log(`Server response: Successful`);
            return data;  // Return data from this function
        }
    } catch (err) {
        console.error("Error fetching data: ", err);
    }
}

// Use an async function to handle the result of fetchData
async function getApiData(api_call, sorted) {
    const apiResults = await fetchData(api_call);  // Wait for fetchData to resolve

    if (!apiResults) {
        console.error("No results received from API");
        return;
    }
    
    if(sorted === true) {
        console.log("Sorted already.")
        return Recipes;
    }

    apiResults.recipes.forEach( item => {
        
        let i = 0;
    //  --check each dishType and add it to the appropriate json data subpart 
        item.dishTypes.forEach(choice => {
            let added = false;

            // -- Need to go through ingredients and add extenedIngredients.name and .amount to ingredients in data json var 11/29/24
            let allIngredients = '';

            item.extendedIngredients.forEach(ingredient => {

                allIngredients += ingredient.original + "\n";
                

            })

            // Get the instructions, title, image, ingredients
            let data = {
                title: item.title,
                image: item.image,
                ingredients: allIngredients,
                instructions: item.instructions
                            
            }

            
            
            // --Check to see if recipe is already added
            Recipes.all.forEach(recipe => {

                if (recipe.title === data.title){
                    added = true;
                    
                } else {
                    added = false;
                }
            })            

            // --If not added, sort to sub json section
            if(added === false){
                switch (choice) {
                    case 'breakfast':
                        Recipes.all.push(data);
                        Recipes.breakfast.push(data);
                        break;

                    case 'lunch':
                        Recipes.all.push(data);
                        Recipes.lunch.push(data);
                        break;

                    case 'dinner':
                        Recipes.all.push(data);
                        Recipes.dinner.push(data);
                        break;

                    case ('snack' || 'side dish'):
                        Recipes.all.push(data);
                        Recipes.side.push(data);
                        break;

                    default:
                        break;
                }
            }
            
            
            // If on last dishType and still not added, push to all recipe sub
            if(added === false && i === item.dishTypes.length - 1) {
                Recipes.all.push(data);
            }
            // -- increment i after done sorting recipe
            i++;
        })
    });
    return Recipes;
}


function getRandomRecipe(i) {
    return getApiData(api_call, true).then(data => {
        console.log(`Total recipes: ${data.all.length}`)
        if (i >= data.all.length){
            i = i % data.all.length;
        }

        return [
            data.all[i].title,
            data.all[i].image,
            data.all[i].ingredients,     
            data.all[i].instructions
        ]
     })
}

function getBreakfastRecipe(i) {
    return getApiData(api_call, true).then(data => {
        console.log(`Total recipes: ${data.breakfast.length}`)
        if (i >= data.breakfast.length){
            i = i % data.breakfast.length;
        }
        return [
            data.breakfast[i].title,
            data.breakfast[i].image,
            data.breakfast[i].ingredients,     
            data.breakfast[i].instructions
        ]
     })
}

function getLunchRecipe(i) {
    return getApiData(api_call, true).then(data => {
        console.log(`Total recipes: ${data.lunch.length}`)
        if (i >= data.lunch.length){
            i = i % data.lunch.length;
        }
        return [
            data.lunch[i].title,
            data.lunch[i].image,
            data.lunch[i].ingredients,     
            data.lunch[i].instructions
        ]
     })
}

function getDinnerRecipe(i) {
    return getApiData(api_call, true).then(data => {
        console.log(`Total recipes: ${data.dinner.length}`)
        if (i >= data.dinner.length){
            i = i % data.dinner.length;
        }
        return [
            data.dinner[i].title,
            data.dinner[i].image,
            data.dinner[i].ingredients,     
            data.dinner[i].instructions
        ]
     })
}

function getSideRecipe(i) {
    return getApiData(api_call, true).then(data => {
        console.log(`Total recipes: ${data.side.length}`)
        if (i >= data.side.length){
            i = i % data.side.length;
        }
        return [
            data.side[i].title,
            data.side[i].image,
            data.side[i].ingredients,     
            data.side[i].instructions
        ]
     })
}


getApiData(api_call, false)
    .then(apiResults => {

        // console.log("Look for ingredients: ", apiResults.all[0])
 
    })
    .catch(err => {
        // Handle errors
        console.error("Error processing API results", err);
    });

// getRandomRecipe(0, true)


module.exports = {
    getRandomRecipe,    
    getBreakfastRecipe,
    getLunchRecipe,
    getDinnerRecipe,
    getSideRecipe
}
