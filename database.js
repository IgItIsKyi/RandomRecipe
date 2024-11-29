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
            

            // Get the instructions, title, image
            let data = {
                title: item.title,
                image: item.image,
                ingredients: item.ingredients,     
                instructions: item.instructions
                            
            }

            
            
            // --Check to see if recipe is already added
            Recipes.all.forEach(recipe => {
                console.log(`\nStored title: ${recipe.title}`)
                console.log(`Current looped title: ${data.title}`)
                if (recipe.title === data.title){
                    console.log("Recipe already added \n");
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
                        console.log(`Added data to breakfast`);
                        break;

                    case 'lunch':
                        Recipes.all.push(data);
                        Recipes.lunch.push(data);
                        console.log(`Added data to lunch`);
                        break;

                    case 'dinner':
                        Recipes.all.push(data);
                        Recipes.dinner.push(data);
                        console.log(`Added data to dinner`);
                        break;

                    case ('snack' || 'side dish'):
                        Recipes.all.push(data);
                        Recipes.side.push(data);
                        console.log(`Added data to sides`);
                        break;

                    default:
                        console.log("No meal Type received from API");
                        break;
                }
            }
            
            console.log(`Current dishType position: ${i} \n dishTypeLength: ${item.dishTypes.length - 1}`)
            
            // If on last dishType and still not added, push to all recipe sub
            if(added === false && i === item.dishTypes.length - 1) {
                console.log("No matching dish type, adding to random recipe...")
                Recipes.all.push(data);
            }
            // -- increment i after done sorting recipe
            i++;
        })
    });

    
    console.log(JSON.stringify(Recipes.all[0]))
    return Recipes;
}


function getRandomRecipe(i) {
    return getApiData(api_call, true).then(data => {
        return [
            data.all[i].title,
            data.all[i].image,
            data.all[i].ingredients,     
            data.all[i].instructions
        ]
     })
}

function getBreakfastRecipe() {
    getApiData(api_call, true).then(data => {
        
    }) 
}


// Example usage
getApiData(api_call, false)
    .then(apiResults => {

        console.log("Processed Recipes: ", apiResults.all.length)
 
    })
    .catch(err => {
        // Handle errors
        console.error("Error processing API results", err);
    });


module.exports = {
    getRandomRecipe,    
    getBreakfastRecipe
}
